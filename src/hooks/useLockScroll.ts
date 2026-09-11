import { useEffect } from 'react'

/**
 * useLockScroll — locks body scroll while `locked` is true. Used by the
 * FullscreenMenu and InquiryModal.
 *
 * Demo mode: the Lenis stop()/start() integration has been removed (no
 * smooth-scroll library in the demo build). Lock is a simple
 * `body.style.overflow = 'hidden'` toggle, restored on cleanup.
 */
export function useLockScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) return

    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = prev
    }
  }, [locked])
}
