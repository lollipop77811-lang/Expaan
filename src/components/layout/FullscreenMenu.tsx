import { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useUI } from '../../lib/store'
import { useLockScroll } from '../../hooks/useLockScroll'

const NAV = [
  { index: '01', label: 'Home', to: '/' },
  { index: '02', label: 'About', to: '/story' },
  { index: '03', label: 'Residences', to: '/projects' },
  { index: '04', label: 'Amenities', to: '/amenities' },
  { index: '05', label: 'Neighbourhood', to: '/neighborhood' },
  { index: '06', label: 'Inquire', to: '/inquire' },
]

/**
 * FullscreenMenu — DEMO MODE (no framer-motion).
 *
 * Originally this menu revealed via a clip-path circle animation (1s expo)
 * with framer-motion AnimatePresence + motion.div. For the demo build, all
 * slow expo-out motion has been stripped — the menu now renders instantly
 * via plain conditional `{open && <div>...}` when open.
 *
 * Preserves: flex-column layout (top spacer → nav zone flex-1 → footer at
 * bottom), Escape close, route-change close, focus trap, scroll lock via
 * useLockScroll, hover gold on indices + 12px right shift on labels.
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
    // focus first link on open
    setTimeout(() => {
      const links = itemsRef.current?.querySelectorAll<HTMLAnchorElement>('a[href]')
      links?.[0]?.focus()
      focusIndex.current = 0
    }, 50)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, setOpen])

  if (!open) return null

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[150] bg-canvas flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-label="Main navigation"
    >
      {/* Top spacer — clears the fixed header */}
      <div style={{ height: 'calc(var(--container-pad) * 2.5)' }} />

      {/* Nav zone — flex-1 fills available space, items vertically centered */}
      <div className="flex-1 min-h-0 flex items-center site-max w-full">
        <nav
          ref={itemsRef}
          className="col-span-12 w-full flex flex-col gap-1 sm:gap-2"
          aria-label="Primary"
        >
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              data-menu-item
              className="group relative flex items-baseline gap-4 sm:gap-6 overflow-hidden"
              onClick={() => setOpen(false)}
            >
              <span className="text-micro text-bronze transition-colors duration-300 group-hover:text-gold tnum">
                {item.index}
              </span>
              <span className="font-display text-display-s text-ink leading-none transition-transform duration-500 group-hover:translate-x-3">
                {item.label}
              </span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Footer — natural sibling at bottom of the flex column */}
      <div className="site-max w-full border-t border-line pt-6 pb-[var(--container-pad)]">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-6 text-micro text-bronze">
          <div className="col-span-2 md:col-span-6">
            <div className="block mb-2">Sales Gallery</div>
            <div>335 NW 28th Street, Miami, FL 33127</div>
            <div>By appointment, Mon — Sun</div>
          </div>
          <div className="col-span-1 md:col-span-3">
            <div className="block mb-2">Enquiries</div>
            <a href="tel:+13055550148" className="block hover:text-gold transition-colors">+1 305 555 0148</a>
            <a href="mailto:sales@expann.com" className="block hover:text-gold transition-colors">sales@expann.com</a>
          </div>
          <div className="col-span-1 md:col-span-3 md:text-right">
            <a href="https://instagram.com" className="hover:text-gold transition-colors" rel="noreferrer" target="_blank">Instagram</a>
          </div>
        </div>
      </div>
    </div>
  )
}
