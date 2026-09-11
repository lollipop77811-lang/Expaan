import { type ReactNode } from 'react'

interface ProvidersProps {
  children: ReactNode
}

/**
 * providers.tsx — demo mode tree (all motion + SEO stripped):
 *   children (router + pages)
 *
 * Originally wrapped children in HelmetProvider (per-route SEO),
 * LenisProvider (smooth scroll + ScrollTrigger sync), Preloader
 * (loading curtain), and CustomCursor (12px dot + 36px ring). All
 * removed for the demo build.
 */
export default function Providers({ children }: ProvidersProps) {
  return <>{children}</>
}
