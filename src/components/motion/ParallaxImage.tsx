import { useEffect, useRef, type ReactNode } from 'react'
import { gsap, prefersReducedMotion } from '../../lib/gsap'

interface ParallaxImageProps {
  src: string
  alt: string
  seed: string
  speed?: number          // 0.5–1.5, default 1
  ratio?: string          // aspect ratio, defaults to portrait 3/4
  clip?: boolean          // clip-path inset reveal
  className?: string
  imgClassName?: string
  children?: ReactNode
  sizes?: string
  fetchPriority?: 'high' | 'low' | 'auto'
  loading?: 'lazy' | 'eager'
  cursorView?: boolean    // sets data-cursor="view" for the CustomCursor ring
}

/**
 * ParallaxImage
 *  Aspect-ratio box. Inner img is 115% height, translateY ±(speed×15%) via
 *  ScrollTrigger scrub. Grayscale→saturate(0.85) settle. Optional clip-path
 *  inset reveal.
 */
export default function ParallaxImage({
  src,
  alt,
  seed,
  speed = 1,
  ratio = '3 / 4',
  clip = false,
  className = '',
  imgClassName = '',
  children,
  sizes = '(min-width: 1200px) 720px, 100vw',
  fetchPriority,
  loading = 'lazy',
  cursorView = true,
}: ParallaxImageProps) {
  const boxRef = useRef<HTMLDivElement | null>(null)
  const imgRef = useRef<HTMLImageElement | null>(null)

  // Parallax scrub
  useEffect(() => {
    if (prefersReducedMotion()) return
    const box = boxRef.current
    const img = imgRef.current
    if (!box || !img) return
    const amount = speed * 0.15 * 100
    const ctx = gsap.context(() => {
      gsap.fromTo(
        img,
        { yPercent: -amount, filter: 'grayscale(40%) saturate(0.7) contrast(1)' },
        {
          yPercent: amount,
          filter: 'grayscale(0%) saturate(0.85) contrast(1.02)',
          ease: 'none',
          scrollTrigger: {
            trigger: box,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      )
    }, box)
    return () => ctx.revert()
  }, [speed])

  // Clip-path inset reveal on enter
  useEffect(() => {
    if (!clip || prefersReducedMotion()) return
    const box = boxRef.current
    if (!box) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        box,
        { clipPath: 'inset(0% 0% 100% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.4,
          ease: 'expo.out',
          scrollTrigger: { trigger: box, start: 'top 80%', once: true },
        },
      )
    }, box)
    return () => ctx.revert()
  }, [clip])

  return (
    <div
      ref={boxRef}
      className={`relative overflow-hidden bg-canvas-deep ${className}`}
      style={{ aspectRatio: ratio }}
      data-cursor={cursorView ? 'view' : undefined}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        data-seed={seed}
        sizes={sizes}
        loading={loading}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore — fetchpriority is valid HTML, React 18 doesn't type it
        fetchpriority={fetchPriority}
        className={`absolute inset-x-0 top-0 h-[115%] w-full object-cover img-treat will-change-transform ${imgClassName}`}
      />
      {children}
    </div>
  )
}
