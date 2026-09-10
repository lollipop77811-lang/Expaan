import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '../../lib/gsap'

interface MarqueeProps {
  items: string[]
  className?: string
  duration?: number
  separator?: string
}

/**
 * Marquee
 *  Infinite translateX loop, 60s linear (the ONLY linear animation), pauses
 *  on hover, aria-hidden duplicate track.
 */
export default function Marquee({ items, className = '', duration = 60, separator = '·' }: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement | null>(null)
  const [paused, setPaused] = useState(false)

  const reduced = prefersReducedMotion()

  useEffect(() => {
    if (reduced) return
    let raf = 0
    let x = 0
    let last = performance.now()
    const speed = 100 / duration // px per frame approx, scaled by track width
    const tick = (now: number) => {
      const dt = (now - last) / 1000
      last = now
      if (!paused && trackRef.current) {
        const w = trackRef.current.scrollWidth / 2
        x -= speed * w * dt
        if (-x >= w) x += w
        trackRef.current.style.transform = `translate3d(${x}px, 0, 0)`
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [paused, reduced, duration])

  const buildTrack = () => (
    <div className="flex items-baseline gap-12 whitespace-nowrap">
      {items.map((it, i) => (
        <span key={i} className="font-display text-display-s text-ink/80 inline-flex items-baseline gap-12">
          {it}
          <span className="text-gold text-micro align-baseline">{separator}</span>
        </span>
      ))}
    </div>
  )

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="District marquee"
    >
      <div ref={trackRef} className="inline-flex will-change-transform" aria-hidden={reduced ? undefined : true}>
        {buildTrack()}
        {buildTrack()}
      </div>
    </div>
  )
}
