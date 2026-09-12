import { useEffect, useState } from 'react'

/**
 * FloatingContacts — fixed bottom-right contact icons.
 *
 * Two circular navy buttons stacked vertically:
 *   1. WhatsApp (top)  — https://wa.me/13055550148
 *   2. Email (bottom)  — mailto:sales@expann.com
 *
 * Each button: solid navy bg (#293A4A) with seafoam icon (#BCD1D4).
 * On hover: INVERTS to seafoam bg + navy icon (matching the Button
 * hover-invert pattern). Subtle label tooltip slides in from the right
 * on hover (hidden on touch devices to keep the layout clean).
 *
 * Icons are custom inline SVG (1.5px stroke, 24px viewBox, round caps,
 * single consistent set — no icon library soup per the brief).
 *
 * Hidden until the user scrolls past the hero (scrollY > 200) so the
 * hero video stays unobstructed on initial load. Fades in smoothly.
 * Always hidden when the FullscreenMenu or InquiryModal is open.
 */
export default function FloatingContacts() {
  const [visible, setVisible] = useState(false)
  const [menuOrModalOpen, setMenuOrModalOpen] = useState(false)

  // Show after user scrolls past 200px
  useEffect(() => {
    let idleTimer: ReturnType<typeof setTimeout> | null = null

    const onScroll = () => {
      if (window.scrollY > 200) {
        setVisible(true)
      } else {
        setVisible(false)
      }
      if (idleTimer) clearTimeout(idleTimer)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (idleTimer) clearTimeout(idleTimer)
    }
  }, [])

  // Hide when FullscreenMenu or InquiryModal is open (so they don't overlap)
  useEffect(() => {
    const check = () => {
      const menuOpen = document.body.style.overflow === 'hidden'
      setMenuOrModalOpen(menuOpen)
    }
    // Poll briefly — body overflow is set by useLockScroll when menu/modal opens
    const interval = setInterval(check, 200)
    return () => clearInterval(interval)
  }, [])

  if (menuOrModalOpen) return null

  return (
    <div
      className={`fixed bottom-6 right-6 z-[90] flex flex-col gap-3 transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      aria-label="Quick contact"
    >
      {/* WhatsApp */}
      <a
        href="https://wa.me/13055550148"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-ink text-bone shadow-md transition-colors duration-300 hover:bg-canvas-soft hover:text-ink"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden
          className="relative z-10"
        >
          {/* Official WhatsApp logo: phone in a speech bubble */}
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        <span
          className="pointer-events-none absolute right-full mr-3 whitespace-nowrap bg-ink text-bone text-micro px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          aria-hidden
        >
          WhatsApp
        </span>
      </a>

      {/* Email */}
      <a
        href="mailto:sales@expann.com"
        aria-label="Email sales@expann.com"
        className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-ink text-bone shadow-md transition-colors duration-300 hover:bg-canvas-soft hover:text-ink"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
          className="relative z-10"
        >
          {/* Envelope icon */}
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <path d="M3 7l9 6 9-6" />
        </svg>
        <span
          className="pointer-events-none absolute right-full mr-3 whitespace-nowrap bg-ink text-bone text-micro px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          aria-hidden
        >
          Email us
        </span>
      </a>
    </div>
  )
}
