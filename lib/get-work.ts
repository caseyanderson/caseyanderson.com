import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Metadata } from 'next'

export type WorkPost = {
  title: string
  description: string
  link: string
  uid: string
  order: number
}

function getWorkPost(slug: string): WorkPost {
  const fullPath = path.join(process.cwd(), 'app/work', slug, 'page.mdx')
  const { data } = matter(fs.readFileSync(fullPath, 'utf8'))

  return {
    title: data.title || slug,
    description: data.description || '',
    link: `/work/${slug}`,
    uid: slug,
    order: data.order ?? 999,
  }
}

// MDX pages export this result as Next.js metadata. Frontmatter stays the
// single source for both the homepage listing and each page's head tags.
export function getWorkMetadata(slug: string): Metadata {
  const post = getWorkPost(slug)
  return {
    title: `${post.title} — Casey Anderson`,
    description: post.description,
  }
}

export function getWorkPosts(): WorkPost[] {
  const workDirectory = path.join(process.cwd(), 'app/work')

  const folders = fs
    .readdirSync(workDirectory, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)

  const posts = folders.map(getWorkPost)

  return posts.sort((a, b) => a.order - b.order)
}
