import { type ReactNode } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import LenisProvider from '../hooks/useLenis'
import CustomCursor from '../components/motion/CustomCursor'
import Preloader from '../components/motion/Preloader'
import { useUI } from '../lib/store'

interface ProvidersProps {
  children: ReactNode
}

/**
 * providers.tsx — single tree:
 *   HelmetProvider (SEO per route)
 *     LenisProvider (smooth scroll + ScrollTrigger sync)
 *       Preloader (mounts once, locks scroll while visible)
 *         CustomCursor (overlay)
 *         children (router + pages)
 */
export default function Providers({ children }: ProvidersProps) {
  const preloaded = useUI((s) => s.preloaded)
  return (
    <HelmetProvider>
      <LenisProvider>
        {!preloaded && <Preloader />}
        <CustomCursor />
        {children}
      </LenisProvider>
    </HelmetProvider>
  )
}
