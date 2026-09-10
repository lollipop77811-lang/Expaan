import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/gsap'

/**
 * useMagnetic — pulls an element toward the cursor while hovering, releases
 * back to origin on leave. ±8px max, spring lerp 0.15 (we fake "spring" with
 * a quick gsap.to on release).
 *
 *   const ref = useMagnetic<HTMLButtonElement>()
 */
export function useMagnetic<T extends HTMLElement>(strength = 8) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      const x = ((e.clientX - (r.left + r.width / 2)) / r.width) * strength
      const y = ((e.clientY - (r.top + r.height / 2)) / r.height) * strength
      gsap.to(el, { x, y, duration: 0.4, ease: 'power3.out' })
    }
    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' })
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [strength])

  return ref
}
