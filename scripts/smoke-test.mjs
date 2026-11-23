import assert from 'node:assert/strict'
import { readdir, readFile } from 'node:fs/promises'
import { performance } from 'node:perf_hooks'
import matter from 'gray-matter'

const base = new URL(process.argv[2] || 'http://localhost:3000')
const workDirectory = new URL('../app/work/', import.meta.url)
const slugs = (await readdir(workDirectory, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
const checkedImages = new Set()

function decodeHtml(value) {
  return value
    .replaceAll('&quot;', '"')
    .replaceAll('&#x27;', "'")
    .replaceAll('&#39;', "'")
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&amp;', '&')
}

function checkLinks(html, path) {
  for (const [anchor, href] of html.matchAll(
    /<a\b[^>]*\bhref="([^"]*)"[^>]*>/g,
  )) {
    const url = new URL(decodeHtml(href), 'https://caseyanderson.com')
    const external =
      /^https?:$/.test(url.protocol) &&
      url.origin !== 'https://caseyanderson.com'
    if (external) {
      assert.match(
        anchor,
        /\btarget="_blank"/,
        `${path}: external link needs a new tab`,
      )
      const rel = anchor.match(/\brel="([^"]*)"/)?.[1].split(/\s+/) || []
      assert.ok(rel.includes('noopener') && rel.includes('noreferrer'))
    } else {
      assert.doesNotMatch(
        anchor,
        /\btarget="_blank"/,
        `${path}: internal/email/anchor link should not open a new tab`,
      )
    }
  }
}

async function get(path) {
  const start = performance.now()
  const response = await fetch(new URL(path, base))
  const text = await response.text()
  assert.equal(response.status, 200, `${path}: expected HTTP 200`)
  console.log(`${path}: ${Math.round(performance.now() - start)} ms`)
  return text
}

const home = await get('/')
checkLinks(home, '/')
assert.ok(home.includes('Casey Anderson'), 'Homepage title is missing')
assert.ok(
  !home.includes('filter:blur(8px)'),
  'Homepage content is hidden by an entrance animation',
)

for (const slug of slugs) {
  assert.ok(home.includes(`/work/${slug}`), `Homepage link missing: ${slug}`)
  const path = `/work/${slug}`
  const html = await get(path)
  checkLinks(html, path)
  const mdx = await readFile(new URL(`${slug}/page.mdx`, workDirectory), 'utf8')
  const { data } = matter(mdx)
  assert.ok(html.includes('<main'), `${path}: missing main content`)
  assert.ok(
    !html.includes('Bandcamp iframe src:'),
    `${path}: debug logging in output`,
  )
  assert.ok(
    !html.includes('---\ntitle:'),
    `${path}: frontmatter leaked into content`,
  )
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1]
  const description = html.match(
    /<meta name="description" content="([^"]*)"/,
  )?.[1]
  assert.ok(title, `${path}: missing page title`)
  assert.ok(description, `${path}: missing page description`)
  assert.equal(decodeHtml(title), `${data.title} — Casey Anderson`)
  assert.equal(decodeHtml(description), data.description)

  const headings = [...html.matchAll(/<h([1-6])(?:\s[^>]*)?>/g)].map((match) =>
    Number(match[1]),
  )
  assert.equal(headings[0], 1, `${path}: project title must be h1`)
  assert.equal(headings.filter((level) => level === 1).length, 1)
  headings.forEach((level, index) => {
    if (index > 0) {
      assert.ok(
        level <= headings[index - 1] + 1,
        `${path}: skipped heading level`,
      )
    }
  })

  const expectedCovers = [...mdx.matchAll(/<Cover\b/g)].length
  const carouselImages = [...mdx.matchAll(/<Carousel\b[\s\S]*?\/>/g)].flatMap(
    ([carousel]) => {
      const sources = carousel.match(/sources=\{\[([\s\S]*?)\]\}/)?.[1]
      assert.ok(sources, `${path}: carousel needs an explicit sources array`)
      return [...sources.matchAll(/'([^']+)'/g)].map((match) => match[1])
    },
  )
  const images = [...html.matchAll(/<img\b[^>]*>/g)].map((match) => match[0])
  assert.equal(
    images.length,
    expectedCovers + carouselImages.length,
    `${path}: unexpected image count`,
  )
  for (const source of carouselImages) {
    // Every slide should render on the server, including before JavaScript loads.
    assert.ok(
      images.some((image) => image.includes(source.split('/').pop().replace('.jpg', ''))),
      `${path}: carousel image missing: ${source}`,
    )
  }
  if (carouselImages.length) {
    assert.match(html, /aria-roledescription="carousel"/)
    assert.match(html, /aria-label="Previous photo"/)
    assert.match(html, /aria-label="Next photo"/)
  }
  for (const image of images) {
    assert.match(
      image,
      /\balt="[^"]*"/,
      `${path}: image missing alternative text`,
    )
    assert.match(image, /\bwidth="\d+"/, `${path}: image missing width`)
    assert.match(image, /\bheight="\d+"/, `${path}: image missing height`)
    const src = image.match(/\bsrc="([^"]+)"/)?.[1].replaceAll('&amp;', '&')
    assert.ok(src, `${path}: image missing src`)
    if (!checkedImages.has(src)) {
      const response = await fetch(new URL(src, base), {
        headers: { Accept: 'image/webp' },
      })
      assert.equal(response.status, 200, `Image failed: ${src}`)
      assert.match(response.headers.get('content-type') || '', /^image\//)
      const bytes = (await response.arrayBuffer()).byteLength
      console.log(`  image: ${Math.round(bytes / 1024)} KB`)
      checkedImages.add(src)
    }
  }

  const expectedEmbeds = [...mdx.matchAll(/<(?:YouTube|Vimeo|Bandcamp)\b/g)]
    .length
  const frames = [...html.matchAll(/<iframe\b[^>]*>/g)]
  assert.equal(frames.length, expectedEmbeds, `${path}: unexpected embed count`)
  for (const [frame] of frames) {
    assert.match(frame, /\bloading="lazy"/, `${path}: embed is not lazy-loaded`)
    assert.match(frame, /\btitle="[^"]+"/, `${path}: embed missing title`)
    assert.doesNotMatch(
      frame,
      /\btitle="(?:Embedded content|Vimeo Video|Bandcamp (?:Album|Track): Bandcamp Player)"/,
      `${path}: generic embed title`,
    )
    for (const [, attribute, value] of frame.matchAll(
      /\b(width|height)="([^"]*)"/g,
    )) {
      assert.match(value, /^\d+$/, `${path}: invalid iframe ${attribute}`)
    }
  }
}

const sitemap = await get('/sitemap.xml')
assert.ok(
  sitemap.includes('https://caseyanderson.com'),
  'Sitemap has wrong domain',
)
assert.ok(!sitemap.includes('nim-fawn'), 'Sitemap references template')
for (const slug of slugs) {
  assert.ok(
    sitemap.includes(`/work/${slug}</loc>`),
    `Sitemap entry missing: ${slug}`,
  )
}
const robots = await get('/robots.txt')
assert.ok(robots.includes('Sitemap: https://caseyanderson.com/sitemap.xml'))
const redirect = await fetch(new URL('/blog/kaos-kids', base), {
  redirect: 'manual',
})
assert.equal(redirect.status, 308)
assert.equal(
  new URL(redirect.headers.get('location'), base).pathname,
  '/work/kaos-kids',
)
const missing = await fetch(new URL('/work/this-page-does-not-exist', base))
assert.equal(missing.status, 404)
console.log(
  `Passed: homepage, ${slugs.length} projects, frontmatter metadata, heading hierarchy, ${checkedImages.size} images, descriptive embeds with valid dimensions, sitemap, robots, redirect, and 404.`,
)
