import { useEffect, useRef, useState } from 'react'
import { gsap, prefersReducedMotion } from '../../lib/gsap'

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
 * HorizontalGallery
 *  Pinned container, track width = n×70vw, scrub translateX, progress hairline
 *  bottom, counter "03 / 07" tabular. Cards skew on velocity (max 3°).
 *
 *  THE signature awwwards moment of the site.
 */
export default function HorizontalGallery({ items, id = 'h-gallery' }: HorizontalGalleryProps) {
  const sectionRef = useRef<HTMLElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const barRef = useRef<HTMLDivElement | null>(null)
  const counterRef = useRef<HTMLDivElement | null>(null)
  const [index, setIndex] = useState(1)

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    if (prefersReducedMotion()) {
      // Native horizontal scroll fallback.
      section.style.height = 'auto'
      track.style.transform = 'none'
      track.style.overflowX = 'auto'
      return
    }

    const ctx = gsap.context(() => {
      const totalScroll = () => track.scrollWidth - window.innerWidth
      const tween = gsap.to(track, {
        x: () => -totalScroll(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${totalScroll()}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const i = Math.min(items.length, Math.max(1, Math.round(self.progress * items.length) || 1))
            setIndex(i)
            if (barRef.current) {
              gsap.set(barRef.current, { scaleX: self.progress })
            }
            // velocity-based skew on cards
            const v = self.getVelocity() / -2500
            const skew = gsap.utils.clamp(-3, 3, v)
            gsap.to(track.querySelectorAll('.h-card'), {
              skewX: skew,
              duration: 0.2,
              overwrite: 'auto',
              ease: 'power2.out',
            })
          },
        },
      })
      return tween
    }, section)
    return () => ctx.revert()
  }, [items.length])

  return (
    <section
      ref={sectionRef}
      id={id}
      className="relative h-screen w-full overflow-hidden bg-canvas"
      aria-label="Residence gallery"
    >
      <div
        ref={trackRef}
        className="flex h-full items-center gap-[var(--grid-gutter)] pl-[var(--container-pad)] pr-[var(--container-pad)] will-change-transform"
        style={{ width: `calc(${items.length} * 70vw)` }}
      >
        {items.map((item, i) => (
          <figure
            key={item.seed}
            className="h-card relative flex h-[72vh] w-[70vw] flex-col"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${items.length}`}
          >
            <div
              className="relative w-full overflow-hidden bg-canvas-deep"
              style={{ aspectRatio: '3 / 4' }}
              data-cursor="view"
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                sizes="70vw"
                className="absolute inset-x-0 top-0 h-full w-full object-cover img-treat"
              />
            </div>
            <figcaption className="mt-6 flex items-baseline justify-between text-micro text-bronze">
              <span className="tnum">{String(i + 1).padStart(2, '0')}</span>
              <span className="text-right">{item.caption}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Progress + counter overlay */}
      <div className="pointer-events-none absolute bottom-[var(--container-pad)] left-[var(--container-pad)] right-[var(--container-pad)] flex items-center justify-between text-micro text-bronze">
        <div ref={counterRef} className="tnum">
          {String(index).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
        </div>
        <div className="relative h-px w-[40vw] max-w-[400px] overflow-hidden bg-line">
          <div
            ref={barRef}
            className="absolute left-0 top-0 h-full w-full origin-left bg-gold"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>
      </div>
    </section>
  )
}
