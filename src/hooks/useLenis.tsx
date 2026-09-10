import { useEffect, useRef, type ReactNode } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/gsap'

/**
 * LenisProvider
 *  - Mounts a single Lenis instance.
 *  - rAF-syncs with the GSAP ticker so ScrollTrigger stays in lock-step.
 *  - Disables itself under prefers-reduced-motion (native scroll + reduced Lenis).
 *  - Exposes the instance on window for components like Footer (scrollTo top).
 */
let lenisSingleton: Lenis | null = null

export function getLenis(): Lenis | null {
  return lenisSingleton
}

interface LenisProviderProps {
  children: ReactNode
}

export default function LenisProvider({ children }: LenisProviderProps) {
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const reduced = prefersReducedMotion()
    if (reduced) {
      // Do not initialise Lenis — rely on native scroll.
      lenisSingleton = null
      return
    }

    const lenis = new Lenis({
      duration: 1.2,
      lerp: 0.09,
      wheelMultiplier: 1,
      smoothWheel: true,
      touchMultiplier: 1.5,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })
    lenisSingleton = lenis
    // Expose globally for Footer / Button scrollTo.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(window as any).lenis = lenis

    lenis.on('scroll', ScrollTrigger.update)

    const raf = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    rafRef.current = 1

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
      lenisSingleton = null
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(window as any).lenis = null
    }
  }, [])

  return <>{children}</>
}
