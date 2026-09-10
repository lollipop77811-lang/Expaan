import { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useUI } from '../../lib/store'
import { useLockScroll } from '../../hooks/useLockScroll'
import { gsap, prefersReducedMotion } from '../../lib/gsap'

const NAV = [
  { index: '01', label: 'Home', to: '/' },
  { index: '02', label: 'Story', to: '/story' },
  { index: '03', label: 'Projects', to: '/projects' },
  { index: '04', label: 'Amenities', to: '/amenities' },
  { index: '05', label: 'Neighbourhood', to: '/neighborhood' },
  { index: '06', label: 'Inquire', to: '/inquire' },
]

/**
 * FullscreenMenu
 *  Ivory full-screen, clip-path circle reveal from hamburger (1s expo).
 *  Nav items in display serif with `01–07` index numerals, stagger 0.07s;
 *  hover = 12px right shift + gold index. Footer strip with contact micro.
 *  Escape + route change closes. Focus trap.
 */
export default function FullscreenMenu() {
  const open = useUI((s) => s.menuOpen)
  const setOpen = useUI((s) => s.setMenuOpen)
  const location = useLocation()
  const containerRef = useRef<HTMLDivElement | null>(null)
  const itemsRef = useRef<HTMLDivElement | null>(null)
  const focusIndex = useRef(0)
  useLockScroll(open)

  // Close on route change
  useEffect(() => {
    setOpen(false)
  }, [location.pathname, setOpen])

  // Escape + focus trap
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
      if (e.key === 'Tab') {
        const links = itemsRef.current?.querySelectorAll<HTMLAnchorElement>('a[href]')
        if (!links || links.length === 0) return
        e.preventDefault()
        focusIndex.current = (focusIndex.current + (e.shiftKey ? -1 : 1) + links.length) % links.length
        links[focusIndex.current].focus()
      }
    }
    window.addEventListener('keydown', onKey)
    // focus first link on mount
    setTimeout(() => {
      const links = itemsRef.current?.querySelectorAll<HTMLAnchorElement>('a[href]')
      links?.[0]?.focus()
      focusIndex.current = 0
    }, 200)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, setOpen])

  // Reveal animation
  useEffect(() => {
    if (!open) return
    if (prefersReducedMotion()) return
    const links = itemsRef.current?.querySelectorAll('[data-menu-item]')
    if (!links) return
    gsap.fromTo(
      links,
      { yPercent: 100, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 1, ease: 'expo.out', stagger: 0.07, delay: 0.2 },
    )
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={containerRef}
          className="fixed inset-0 z-[150] bg-canvas"
          initial={{ clipPath: 'circle(0% at calc(100% - var(--container-pad)) 32px)' }}
          animate={{ clipPath: 'circle(150% at calc(100% - var(--container-pad)) 32px)' }}
          exit={{ clipPath: 'circle(0% at calc(100% - var(--container-pad)) 32px)' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          role="dialog"
          aria-modal="true"
          aria-label="Main navigation"
        >
          <div className="site-max site-grid h-full" style={{ paddingTop: 'calc(var(--container-pad) * 2)' }}>
            <nav ref={itemsRef} className="col-span-12 md:col-span-10 flex flex-col justify-center gap-2" aria-label="Primary">
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  data-menu-item
                  className="group relative flex items-baseline gap-6 overflow-hidden"
                  onClick={() => setOpen(false)}
                >
                  <span className="text-micro text-bronze transition-colors duration-300 group-hover:text-gold tnum">
                    {item.index}
                  </span>
                  <span className="font-display text-display text-ink leading-none transition-transform duration-500 group-hover:translate-x-3">
                    {item.label}
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          <div className="absolute inset-x-0 bottom-0 site-max border-t border-line pt-6 pb-[var(--container-pad)]">
            <div className="grid grid-cols-12 gap-6 text-micro text-bronze">
              <div className="col-span-6">
                <div className="block mb-2">Sales Gallery</div>
                <div>111 West 57th Street, New York</div>
                <div>By appointment, Mon — Sun</div>
              </div>
              <div className="col-span-3">
                <div className="block mb-2">Enquiries</div>
                <a href="tel:+12125550148" className="block hover:text-gold transition-colors">+1 212 555 0148</a>
                <a href="mailto:sales@meridian.com" className="block hover:text-gold transition-colors">sales@meridian.com</a>
              </div>
              <div className="col-span-3 text-right">
                <a href="https://instagram.com" className="hover:text-gold transition-colors" rel="noreferrer" target="_blank">Instagram</a>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
