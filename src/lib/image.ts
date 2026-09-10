/**
 * Image URL helper.
 * Picsum serves real placeholder imagery. We use seed-based URLs so the same
 * image renders on every reload — no layout shift, no flicker.
 *
 * Picsum honours `Accept: image/webp` and serves webp automatically. We do not
 * over-engineer AVIF for placeholders.
 */

export interface ImageSpec {
  seed: string
  width: number
  height: number
}

export const portrait = (seed: string, w = 900, h = 1200): string =>
  `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`

export const landscape = (seed: string, w = 1920, h = 1080): string =>
  `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`

export const og = (seed: string): string =>
  `https://picsum.photos/seed/${encodeURIComponent(seed)}/1200/630`
