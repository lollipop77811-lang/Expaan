import { useEffect, useRef, type ReactNode } from 'react'
import { gsap, prefersReducedMotion } from '../../lib/gsap'

interface ChapterDividerProps {
  index?: string
  label: string
  children?: ReactNode
  className?: string
}

/**
 * ChapterDivider
 *  A 12-col grid row with the section label on the left and an oversized
 *  chapter index numeral on the right. Hairline grows on enter.
 *
 *  Used between major chapters to mark the cinematic arc.
 */
export default function ChapterDivider({ index, label, children, className = '' }: ChapterDividerProps) {
  const lineRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (prefersReducedMotion()) {
      if (lineRef.current) gsap.set(lineRef.current, { scaleX: 1 })
      return
    }
    const el = lineRef.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        },
      )
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <div className={`site-max site-grid section-pad-tight ${className}`}>
      <div className="col-span-12 flex items-baseline justify-between">
        <span className="text-micro text-bronze">{label}</span>
        {index && (
          <span className="font-display text-display-s text-ink/30 tnum" aria-hidden>
            {index}
          </span>
        )}
      </div>
      <div className="col-span-12 mt-6">
        <div ref={lineRef} className="hairline" />
      </div>
      {children && <div className="col-span-12 mt-8">{children}</div>}
    </div>
  )
}
