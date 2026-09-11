import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useUI } from '../../lib/store'

/**
 * Header
 *  Fixed, solid #293A4A navy background; wordmark + nav links in
 *  #BCD1D4 seafoam (period accent in white), #FFFFFF hover on links.
 *  Wordmark left, INQUIRE right, hamburger (two 24px lines that morph to X)
 *  center-right.
 *
 *  Visibility rule: HIDDEN by default. Becomes VISIBLE while the user is
 *  scrolling, then HIDES again after ~1.5s of scroll inactivity. Always
 *  visible while the FullscreenMenu is open.
 *
 * Demo mode: prefers-reduced-motion auto-visible a11y fallback removed
 * (no more motion library to disable).
 */
export default function Header() {
  const [visible, setVisible] = useState(false)
  const menuOpen = useUI((s) => s.menuOpen)
  const setMenuOpen = useUI((s) => s.setMenuOpen)
  const setInquiryOpen = useUI((s) => s.setInquiryOpen)
  const location = useLocation()

  // Show navbar while scrolling; hide after 1.5s of scroll inactivity.
  // Always hidden at the top of the page (scrollY < 10).
  useEffect(() => {
    if (menuOpen) return // menu-open effect handles visibility

    let idleTimer: ReturnType<typeof setTimeout> | null = null

    const onScroll = () => {
      if (window.scrollY < 10) {
        // At top of page: hide immediately
        if (idleTimer) clearTimeout(idleTimer)
        setVisible(false)
        return
      }
      setVisible(true)
      if (idleTimer) clearTimeout(idleTimer)
      idleTimer = setTimeout(() => setVisible(false), 1500)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll() // initial check


    return () => {
      window.removeEventListener('scroll', onScroll)
      if (idleTimer) clearTimeout(idleTimer)
    }
  }, [menuOpen])

  // Force visible while the FullscreenMenu is open
  useEffect(() => {
    if (menuOpen) setVisible(true)
  }, [menuOpen])

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname, setMenuOpen])

  return (
    <header
      className="fixed inset-x-0 top-0 z-[100] transition-transform duration-500"
      style={{
        transform: visible ? 'translateY(0)' : 'translateY(-100%)',
        backgroundColor: 'rgba(41, 58, 74, 0.55)',
        backdropFilter: 'blur(15px)',
        WebkitBackdropFilter: 'blur(15px)',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
      }}
    >
      <div
        className="site-max flex items-center justify-between"
        style={{ paddingTop: 'clamp(18px, 2.5vw, 28px)', paddingBottom: 'clamp(18px, 2.5vw, 28px)' }}
      >
        <Link to="/" className="font-display text-label text-bone leading-none hover:text-canvas transition-colors duration-300" aria-label="Expaan — Home">
          Expaan<span className="text-canvas">.</span>
        </Link>

        <button
          type="button"
          className="group flex items-center gap-4 text-bone hover:text-canvas transition-colors duration-300"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="text-micro">MENU</span>
          <span className="relative inline-block h-4 w-6" aria-hidden>
            <span
              className="absolute left-0 top-1 h-px w-6 bg-bone transition-all duration-300"
              style={{ transform: menuOpen ? 'translateY(3px) rotate(45deg)' : 'translateY(0)' }}
            />
            <span
              className="absolute left-0 top-3 h-px w-6 bg-bone transition-all duration-300"
              style={{ transform: menuOpen ? 'translateY(-3px) rotate(-45deg)' : 'translateY(0)' }}
            />
          </span>
        </button>

        <button
          type="button"
          onClick={() => setInquiryOpen(true)}
          className="text-micro text-bone hover:text-canvas transition-colors duration-300"
        >
          Inquire
        </button>
      </div>
    </header>
  )
}
