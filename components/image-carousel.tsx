'use client'

import Image, { type StaticImageData } from 'next/image'
import { useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'

type CarouselSlide = {
  image: StaticImageData
  alt: string
}

export function ImageCarousel({
  slides,
  label,
  credit,
}: {
  slides: CarouselSlide[]
  label: string
  credit?: string
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)

  function goTo(next: number) {
    const track = trackRef.current
    if (!track || next < 0 || next >= slides.length) return
    track.scrollTo({ left: next * track.clientWidth, behavior: 'instant' })
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    // Buttons retain their normal keyboard behavior.
    if (event.target !== event.currentTarget) return
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault()
      goTo(index + (event.key === 'ArrowRight' ? 1 : -1))
    }
  }

  return (
    <figure style={{ margin: 0 }}>
      <div role="region" aria-roledescription="carousel" aria-label={label}>
        <div
          ref={trackRef}
          tabIndex={0}
          aria-label="Photos; use left and right arrow keys to browse"
          className="flex snap-x snap-mandatory overflow-x-auto rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-500"
          onKeyDown={onKeyDown}
          onScroll={() => {
            const track = trackRef.current
            if (track?.clientWidth) {
              setIndex(Math.round(track.scrollLeft / track.clientWidth))
            }
          }}
        >
          {slides.map((slide, slideIndex) => (
            <div
              key={slide.image.src}
              role="group"
              aria-roledescription="slide"
              aria-label={`${slideIndex + 1} of ${slides.length}`}
              className="aspect-[3/2] w-full shrink-0 snap-center"
            >
              <Image
                src={slide.image}
                alt={slide.alt}
                loading="lazy"
                sizes="(max-width: 640px) calc(100vw - 32px), 608px"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  display: 'block',
                  margin: 0,
                }}
              />
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between gap-4 text-sm">
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            disabled={index === 0}
            aria-label="Previous photo"
            className="min-h-11 cursor-pointer px-2 text-zinc-700 disabled:cursor-default disabled:opacity-35 dark:text-zinc-300"
          >
            ← Previous
          </button>
          <span aria-live="polite" aria-atomic="true" className="text-zinc-500 dark:text-zinc-400">
            Photo {index + 1} of {slides.length}
          </span>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            disabled={index === slides.length - 1}
            aria-label="Next photo"
            className="min-h-11 cursor-pointer px-2 text-zinc-700 disabled:cursor-default disabled:opacity-35 dark:text-zinc-300"
          >
            Next →
          </button>
        </div>
      </div>
      {credit && (
        <figcaption className="mt-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
          {credit}
        </figcaption>
      )}
    </figure>
  )
}
