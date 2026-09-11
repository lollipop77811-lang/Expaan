import { type ReactNode } from 'react'

interface ParallaxImageProps {
  src: string
  alt: string
  seed: string
  speed?: number          // 0.5–1.5, default 1 (ignored in static mode)
  ratio?: string          // aspect ratio, defaults to portrait 3/4
  clip?: boolean          // clip-path inset reveal (ignored in static mode)
  className?: string
  imgClassName?: string
  children?: ReactNode
  sizes?: string
  fetchPriority?: 'high' | 'low' | 'auto'
  loading?: 'lazy' | 'eager'
  cursorView?: boolean    // sets data-cursor="view" (ignored — no custom cursor)
}

/**
 * ParallaxImage — STATIC RENDER (demo mode).
 *
 * Originally this component held an 115%-tall inner image that translated
 * ±(speed×15%) via ScrollTrigger scrub, with a grayscale→saturate(0.85)
 * settle and optional clip-path inset reveal. For the demo build, all
 * slow expo-out motion has been stripped — this component now renders a
 * plain aspect-ratio box with a cover image, preserving the same props
 * and DOM shape so all page imports keep working without changes.
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
  // Reference unused props so TS strict mode doesn't complain.
  void speed
  void clip
  void cursorView

  return (
    <div
      className={`relative overflow-hidden bg-canvas-deep ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <img
        src={src}
        alt={alt}
        data-seed={seed}
        sizes={sizes}
        loading={loading}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore — fetchpriority is valid HTML, React 18 doesn't type it
        fetchpriority={fetchPriority}
        className={`absolute inset-0 h-full w-full object-cover ${imgClassName}`}
      />
      {children}
    </div>
  )
}
