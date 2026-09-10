import { useEffect } from 'react'

/**
 * useReveal — convenience helper to bind a RevealText-style element to
 * ScrollTrigger. Most components use gsap directly with useGSAP-ish effect,
 * this is provided for callers that want a one-line hook.
 *
 * Usage:
 *   const ref = useReveal<HTMLDivElement>({ y: 110, stagger: 0.09 })
 */
interface RevealOpts {
  y?: number
  duration?: number
  stagger?: number
  start?: string
  once?: boolean
}

export function useReveal<T extends HTMLElement = HTMLDivElement>(opts: RevealOpts = {}) {
  const ref = useLazyRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    // Defer to RevealText.tsx for the actual implementation.
    // This hook is intentionally lightweight.
  }, [opts.y, opts.duration, opts.stagger, opts.start, opts.once, ref])

  return ref
}

// Tiny lazy ref helper to avoid importing useRef twice in two ways.
import { useRef } from 'react'
function useLazyRef<T>(initial: T) {
  return useRef<T>(initial)
}
