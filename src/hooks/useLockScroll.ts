import { useEffect } from 'react'

/**
 * useLockScroll — locks body scroll while `locked` is true. Used for the
 * Preloader and FullscreenMenu. Respects Lenis (calls stop()/start() if
 * available on window.lenis).
 */
export function useLockScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) return

    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const lenis = (window as any).lenis
    if (lenis && typeof lenis.stop === 'function') lenis.stop()

    return () => {
      document.body.style.overflow = prev
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const l = (window as any).lenis
      if (l && typeof l.start === 'function') l.start()
    }
  }, [locked])
}
