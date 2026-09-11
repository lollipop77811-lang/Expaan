interface ImageProps {
  src: string
  alt: string
  seed: string
  ratio?: string
  sizes?: string
  className?: string
  imgClassName?: string
  loading?: 'lazy' | 'eager'
  fetchPriority?: 'high' | 'low' | 'auto'
  cursorView?: boolean
}

/**
 * Image
 *  `<picture>` wrapper with WebP source + fallback to JPEG. Aspect-ratio
 *  wrapper for zero layout shift. Picsum auto-serves WebP via Accept header,
 *  so we ask explicitly via the source's type. The image is loaded in an
 *  aspect-ratio box; hero gets fetchpriority="high", everything else lazy.
 *
 *  Treatment filter saturate(0.85) contrast(1.02) applied via the ``
 *  utility class.
 */
export default function Image({
  src,
  alt,
  seed,
  ratio = '3 / 4',
  sizes = '(min-width: 1200px) 720px, 100vw',
  className = '',
  imgClassName = '',
  loading = 'lazy',
  fetchPriority,
  cursorView = false,
}: ImageProps) {
  // Picsum supports WebP via the `Accept: image/webp` header. We just request
  // the regular URL; the browser negotiates the best format. We still emit
  // a <picture> + <source type="image/webp"> so the request is explicit.
  const webpSrc = src.includes('.webp') ? src : src
  return (
    <div
      className={`relative overflow-hidden bg-canvas-deep ${className}`}
      style={{ aspectRatio: ratio }}
      data-cursor={cursorView ? 'view' : undefined}
    >
      <picture>
        <source srcSet={webpSrc} type="image/webp" sizes={sizes} />
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
      </picture>
    </div>
  )
}
