import type { MDXComponents } from 'mdx/types'
import type { ComponentProps, CSSProperties } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { WEBSITE_URL } from '@/lib/constants'
import { WORK_IMAGES } from '@/lib/work-images'

const siteOrigin = new URL(WEBSITE_URL).origin

function MdxLink({ href, target, rel, ...props }: ComponentProps<'a'>) {
  const url = href ? new URL(href, WEBSITE_URL) : null
  const isInternal =
    !!href && !href.startsWith('#') && url?.origin === siteOrigin
  const isExternal = !!href && /^(https?:)?\/\//i.test(href) && !isInternal
  const linkTarget = target ?? (isExternal ? '_blank' : undefined)
  const linkRel =
    linkTarget === '_blank'
      ? [rel, 'noopener', 'noreferrer'].filter(Boolean).join(' ')
      : rel

  if (isInternal && href) {
    return <Link href={href} target={linkTarget} rel={linkRel} {...props} />
  }
  return <a href={href} target={linkTarget} rel={linkRel} {...props} />
}

function Cover({ src, alt }: { src: string; alt?: string }) {
  const cover = WORK_IMAGES[src]
  if (!cover) {
    throw new Error(
      `Register "${src}" in lib/work-images.ts before using Cover.`,
    )
  }
  return (
    <figure style={{ margin: 0 }}>
      <Image
        src={cover.image}
        alt={alt ?? cover.alt}
        sizes="(max-width: 640px) calc(100vw - 32px), 608px"
        style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
      />
    </figure>
  )
}

type VideoProps = {
  src: string
  title: string
  width?: CSSProperties['width']
  height?: CSSProperties['height']
}

function VideoEmbed({
  src,
  title,
  width = '100%',
  height = 'auto',
  allow = 'fullscreen',
}: VideoProps & { allow?: string }) {
  if (!title?.trim())
    throw new Error(`Add a descriptive title to video "${src}".`)
  return (
    <iframe
      src={src}
      title={title}
      loading="lazy"
      style={{
        width,
        height,
        maxWidth: '100%',
        border: 0,
        aspectRatio: '16 / 9',
        display: 'block',
      }}
      allow={allow}
    />
  )
}

function YouTube(props: VideoProps) {
  return <VideoEmbed {...props} />
}

function Vimeo(props: VideoProps) {
  return (
    <VideoEmbed {...props} allow="autoplay; fullscreen; picture-in-picture" />
  )
}

function Bandcamp({
  album,
  track,
  width = '100%',
  height = 120,
  title,
  artwork = 'none',
}: {
  album?: string | number
  track?: string | number
  width?: CSSProperties['width']
  height?: number
  title: string
  artwork?: 'none' | 'small' | 'large'
}) {
  if (!title?.trim()) throw new Error('Add a descriptive title to Bandcamp.')
  if (!album && !track) {
    return <div>Error: Please provide either an album or a track ID.</div>
  }
  const recording = album ? `album=${album}` : `track=${track}`
  const src = `https://bandcamp.com/EmbeddedPlayer/${recording}/size=large/bgcol=ffffff/linkcol=333333/tracklist=false/artwork=${artwork}/transparent=true/`

  return (
    <iframe
      src={src}
      height={height}
      title={`Bandcamp ${album ? 'Album' : 'Track'}: ${title}`}
      loading="lazy"
      style={{ width, maxWidth: '100%', border: 0, display: 'block' }}
      allowFullScreen
    />
  )
}

const components = {
  a: MdxLink,
  Cover,
  YouTube,
  Vimeo,
  Bandcamp,
} satisfies MDXComponents

export function useMDXComponents(): MDXComponents {
  return components
}
