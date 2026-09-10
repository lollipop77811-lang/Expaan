import { useEffect, useRef, useState } from 'react'
import { gsap, isFinePointer, prefersReducedMotion } from '../../lib/gsap'

/**
 * CustomCursor
 *  12px bronze dot + 36px hairline ring, blend-difference over dark sections.
 *  Ring scales 2.5x with "VIEW" text over `[data-cursor="view"]` elements.
 *  Dot hides on touch devices.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null)
  const ringRef = useRef<HTMLDivElement | null>(null)
  const labelRef = useRef<HTMLDivElement | null>(null)
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    if (!isFinePointer() || prefersReducedMotion()) return
    setEnabled(true)
    document.documentElement.classList.add('cursor-custom-active')
    return () => {
      document.documentElement.classList.remove('cursor-custom-active')
    }
  }, [])

  useEffect(() => {
    if (!enabled) return
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let rx = mx
    let ry = my
    let raf = 0
    let visible = false

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      if (!visible) {
        visible = true
        gsap.set([dot, ring], { autoAlpha: 1 })
      }
      gsap.to(dot, { x: mx, y: my, duration: 0.12, ease: 'power2.out' })

      // detect data-cursor on element or ancestor
      const target = (e.target as HTMLElement | null)?.closest('[data-cursor]')
      const mode = target?.getAttribute('data-cursor')
      setHovering(mode === 'view')
    }

    const onLeave = () => {
      visible = false
      gsap.set([dot, ring], { autoAlpha: 0 })
    }

    const loop = () => {
      rx += (mx - rx) * 0.18
      ry += (my - ry) * 0.18
      gsap.set(ring, { x: rx, y: ry })
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [enabled])

  useEffect(() => {
    const ring = ringRef.current
    const label = labelRef.current
    if (!ring) return
    if (hovering) {
      gsap.to(ring, { scale: 2.5, duration: 0.4, ease: 'expo.out', borderColor: 'rgba(174,151,81,1)' })
      if (label) gsap.to(label, { autoAlpha: 1, duration: 0.3 })
    } else {
      gsap.to(ring, { scale: 1, duration: 0.4, ease: 'expo.out', borderColor: 'rgba(124,114,98,0.6)' })
      if (label) gsap.to(label, { autoAlpha: 0, duration: 0.2 })
    }
  }, [hovering])

  if (!enabled) return null

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 'var(--cursor-dot)',
          height: 'var(--cursor-dot)',
          marginLeft: '-6px',
          marginTop: '-6px',
          borderRadius: '50%',
          background: 'var(--color-gold)',
          pointerEvents: 'none',
          zIndex: 999,
          mixBlendMode: 'difference',
          opacity: 0,
        }}
      />
      <div
        ref={ringRef}
        aria-hidden
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 'var(--cursor-ring)',
          height: 'var(--cursor-ring)',
          marginLeft: '-18px',
          marginTop: '-18px',
          borderRadius: '50%',
          border: '1px solid rgba(124,114,98,0.6)',
          pointerEvents: 'none',
          zIndex: 999,
          mixBlendMode: 'difference',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0,
        }}
      >
        <div
          ref={labelRef}
          className="text-micro"
          style={{ opacity: 0, color: 'var(--color-bone)', letterSpacing: '0.16em' }}
        >
          VIEW
        </div>
      </div>
    </>
  )
}
