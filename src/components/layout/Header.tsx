import { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useUI } from '../../lib/store'

/**
 * Header
 *  Fixed, solid #293A4A navy background; wordmark + nav links in
 *  #BCD1D4 seafoam (period accent in white), #FFFFFF hover on links.
 *  Wordmark left, INQUIRE right, hamburger (two 24px lines that morph to X)
 *  center-right. Always visible (no hide-on-scroll behaviour).
 */
export default function Header() {
  const ref = useRef<HTMLElement | null>(null)
  const menuOpen = useUI((s) => s.menuOpen)
  const setMenuOpen = useUI((s) => s.setMenuOpen)
  const setInquiryOpen = useUI((s) => s.setInquiryOpen)
  const location = useLocation()

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname, setMenuOpen])

  return (
    <header
      ref={ref}
      className="fixed inset-x-0 top-0 z-[100] bg-ink"
      style={{
        borderBottom: '1px solid rgba(188, 209, 212, 0.18)',
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
