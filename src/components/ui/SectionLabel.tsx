import { useEffect, useRef, type ReactNode } from 'react'
import { gsap, prefersReducedMotion } from '../../lib/gsap'

interface SectionLabelProps {
  children: ReactNode
  className?: string
  /** By default the hairline grows 32→56px on enter. */
  width?: { from: number; to: number }
}

/**
 * SectionLabel
 *  Uppercase label + hairline that grows 32→56px on enter (0.8s expo).
 *  The 111w57 signature. Always left-aligned at the grid's first column.
 *
 *  The wrapper inherits color, so callers can pass `className="text-bone/80"`
 *  to recolour for dark sections.
 */
export default function SectionLabel({
  children,
  className = '',
  width = { from: 32, to: 56 },
}: SectionLabelProps) {
  const lineRef = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    if (prefersReducedMotion()) {
      if (lineRef.current) {
        lineRef.current.style.width = `${width.to}px`
      }
      return
    }
    const el = lineRef.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { width: `${width.from}px` },
        {
          width: `${width.to}px`,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        },
      )
    }, el)
    return () => ctx.revert()
  }, [width.from, width.to])

  return (
    <div className={`flex items-center gap-4 text-bronze ${className}`}>
      <span ref={lineRef} className="block h-px bg-bronze-deep" style={{ width: `${width.from}px` }} />
      <span className="text-label uppercase">{children}</span>
    </div>
  )
}
