import { useEffect, useRef, useState } from 'react'
import { gsap, prefersReducedMotion } from '../../lib/gsap'
import { useUI } from '../../lib/store'
import { useLockScroll } from '../../hooks/useLockScroll'

interface PreloaderProps {
  onComplete?: () => void
}

/**
 * Preloader
 *  Ivory screen, monogram in serif, % counter in tabular micro.
 *  Counts 0→100 over asset load (min 1.8s), then curtain lifts via clip-path.
 *  Scroll locked while visible.
 */
export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0)
  const curtainRef = useRef<HTMLDivElement | null>(null)
  const monogramRef = useRef<HTMLDivElement | null>(null)
  const counterRef = useRef<HTMLSpanElement | null>(null)
  const setPreloaded = useUI((s) => s.setPreloaded)
  useLockScroll(true)

  useEffect(() => {
    const reduced = prefersReducedMotion()
    const minTime = reduced ? 400 : 1800

    let raf = 0
    let done = false
    const start = performance.now()

    const finish = () => {
      if (done) return
      done = true
      cancelAnimationFrame(raf)
      setProgress(100)
      requestAnimationFrame(() => setTimeout(liftCurtain, 120))
    }

    const liftCurtain = () => {
      const el = curtainRef.current
      const mono = monogramRef.current
      if (mono) {
        gsap.to(mono, { autoAlpha: 0, duration: 0.4, ease: 'power2.out' })
      }
      if (!el) return
      gsap.to(el, {
        clipPath: 'inset(0% 0% 100% 0%)',
        duration: 0.9,
        ease: 'expo.out',
        onComplete: () => {
          setPreloaded(true)
          onComplete?.()
        },
      })
    }

    if (reduced) {
      finish()
      return
    }

    const tick = (now: number) => {
      const elapsed = now - start
      const load = Math.min(elapsed / minTime, 1)
      const eased = 1 - Math.pow(2, -10 * load)
      setProgress(Math.min(99, Math.round(eased * 100)))
      if (elapsed < minTime) raf = requestAnimationFrame(tick)
      else finish()
    }
    raf = requestAnimationFrame(tick)

    if (document.readyState === 'complete') {
      setTimeout(finish, minTime)
    } else {
      window.addEventListener('load', () => {
        const remaining = Math.max(0, minTime - (performance.now() - start))
        setTimeout(finish, remaining)
      })
    }
    // Safety net: always finish after minTime + buffer.
    const net = setTimeout(finish, minTime + 800)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(net)
      window.removeEventListener('load', finish)
    }
  }, [onComplete, setPreloaded])

  return (
    <div
      ref={curtainRef}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-canvas"
      style={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      aria-hidden={progress >= 100}
    >
      <div ref={monogramRef} className="flex flex-col items-center gap-6">
        <div className="font-display text-display leading-none text-ink" aria-label="DUOS Wynwood">
          D<span className="text-gold">.</span>
        </div>
        <span ref={counterRef} className="text-micro text-bronze tnum" aria-live="polite">
          {String(progress).padStart(3, '0')}
        </span>
      </div>
    </div>
  )
}
