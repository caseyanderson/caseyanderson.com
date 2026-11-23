import type { MDXComponents } from 'mdx/types'
import type { CSSProperties } from 'react'
import Image from 'next/image'
import { SiteLink } from '@/components/site-link'
import { WORK_IMAGES } from '@/lib/work-images'
import { ImageCarousel } from '@/components/image-carousel'

function Carousel({
  sources,
  label,
  credit,
}: {
  sources: string[]
  label: string
  credit?: string
}) {
  if (!sources.length || !label.trim()) {
    throw new Error('Add images and a descriptive label to Carousel.')
  }
  const slides = sources.map((src) => {
    const image = WORK_IMAGES[src]
    if (!image) {
      throw new Error(`Register "${src}" in lib/work-images.ts before using Carousel.`)
    }
    return image
  })
  return <ImageCarousel slides={slides} label={label} credit={credit} />
}

function Cover({
  src,
  alt,
  caption,
}: {
  src: string
  alt?: string
  caption?: string
}) {
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
      {caption && (
        <figcaption className="mt-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
          {caption}
        </figcaption>
      )}
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
  a: SiteLink,
  Cover,
  Carousel,
  YouTube,
  Vimeo,
  Bandcamp,
} satisfies MDXComponents

export function useMDXComponents(): MDXComponents {
  return components
}
