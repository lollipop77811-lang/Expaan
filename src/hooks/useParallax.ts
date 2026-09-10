import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/gsap'

interface ParallaxOpts {
  speed?: number        // 0.5–1.5
  start?: string
  end?: string
}

/**
 * useParallax — attaches a scrubbed translateY to `ref` based on the parent's
 * scroll position. Returns the ref to attach.
 *
 *   const innerRef = useParallax<HTMLImageElement>({ speed: 1.1 })
 */
export function useParallax<T extends HTMLElement>(opts: ParallaxOpts = {}) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const el = ref.current
    if (!el) return

    const amount = (opts.speed ?? 1) * 0.15 * 100 // ±% of inner height
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: -amount },
        {
          yPercent: amount,
          ease: 'none',
          scrollTrigger: {
            trigger: el.parentElement ?? el,
            start: opts.start ?? 'top bottom',
            end: opts.end ?? 'bottom top',
            scrub: true,
          },
        },
      )
    }, el)
    return () => ctx.revert()
  }, [opts.speed, opts.start, opts.end])

  return ref
}
