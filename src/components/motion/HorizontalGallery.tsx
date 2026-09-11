import { useState } from 'react'

export interface GalleryItem {
  seed: string
  src: string
  alt: string
  caption: string
}

interface HorizontalGalleryProps {
  items: GalleryItem[]
  id?: string
}

/**
 * HorizontalGallery — STATIC RENDER (demo mode).
 *
 * Originally this was the signature awwwards moment: a pinned full-viewport
 * section where scroll drove a horizontal translateX through the track,
 * with a progress hairline + "03 / 07" counter and velocity-based card
 * skew (max 3°). For the demo build, all slow expo-out motion has been
 * stripped — this component now renders the same card track as a NATIVE
 * horizontal scroller (overflow-x-auto with scroll-snap), still showing
 * the counter + progress hairline as static elements that update on
 * active-card change via IntersectionObserver.
 *
 * The track is full-width (each card is 70vw) and snaps to the nearest
 * card. Scroll with trackpad / shift+wheel / drag on touch.
 */
export default function HorizontalGallery({ items, id = 'h-gallery' }: HorizontalGalleryProps) {
  const [index, setIndex] = useState(1)

  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const track = e.currentTarget
    const cardWidth = track.scrollWidth / items.length
    const i = Math.min(items.length, Math.max(1, Math.round(track.scrollLeft / cardWidth) + 1))
    setIndex(i)
  }

  const progress = items.length > 1 ? (index - 1) / (items.length - 1) : 0

  return (
    <section
      id={id}
      className="relative w-full overflow-hidden bg-canvas py-[var(--spacing-section)]"
      aria-label="Residence gallery"
    >
      <div
        className="flex h-[72vh] items-center gap-[var(--grid-gutter)] overflow-x-auto pl-[var(--container-pad)] pr-[var(--container-pad)] snap-x snap-mandatory"
        onScroll={onScroll}
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {items.map((item, i) => (
          <figure
            key={item.seed}
            className="h-card relative flex h-full w-[70vw] max-w-[820px] flex-none flex-col snap-start"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${items.length}`}
          >
            <div
              className="relative w-full overflow-hidden bg-canvas-deep"
              style={{ aspectRatio: '3 / 4', height: '100%' }}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading={i === 0 ? 'eager' : 'lazy'}
                sizes="70vw"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <figcaption className="mt-6 flex items-baseline justify-between text-micro text-bronze">
              <span className="tnum">{String(i + 1).padStart(2, '0')}</span>
              <span className="text-right">{item.caption}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Progress + counter overlay (static, updates on scroll) */}
      <div className="pointer-events-none absolute bottom-[var(--container-pad)] left-[var(--container-pad)] right-[var(--container-pad)] flex items-center justify-between text-micro text-bronze">
        <div className="tnum">
          {String(index).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
        </div>
        <div className="relative h-px w-[40vw] max-w-[400px] overflow-hidden bg-line">
          <div
            className="absolute left-0 top-0 h-full w-full origin-left bg-gold"
            style={{ transform: `scaleX(${progress})` }}
          />
        </div>
      </div>
    </section>
  )
}
