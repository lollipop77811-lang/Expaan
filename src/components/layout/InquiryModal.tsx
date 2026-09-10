import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useUI } from '../../lib/store'
import { useLockScroll } from '../../hooks/useLockScroll'
import InquiryForm from '../forms/InquiryForm'

/**
 * InquiryModal
 *  Triggered by Header's INQUIRE button and the ProjectDetail sticky rail.
 *  AnimatePresence fade + slide; Escape closes; focus trap; Lenis-prevent.
 *  Renders the InquiryForm with a tailored headline and a close button.
 */
export default function InquiryModal() {
  const open = useUI((s) => s.inquiryOpen)
  const setOpen = useUI((s) => s.setInquiryOpen)
  const containerRef = useRef<HTMLDivElement | null>(null)
  useLockScroll(open)

  // Escape + click outside + focus trap
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        return
      }
      if (e.key === 'Tab') {
        const focusable = containerRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])',
        )
        if (!focusable || focusable.length === 0) return
        e.preventDefault()
        const active = document.activeElement
        const i = Array.from(focusable).indexOf(active as HTMLElement)
        const next = (i + (e.shiftKey ? -1 : 1) + focusable.length) % focusable.length
        focusable[next].focus()
      }
    }
    window.addEventListener('keydown', onKey)
    // focus the close button on mount
    setTimeout(() => {
      const first = containerRef.current?.querySelector<HTMLElement>('button[data-close]')
      first?.focus()
    }, 200)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, setOpen])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[180] flex items-start justify-end p-[var(--container-pad)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false)
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Enquiry"
        >
          <motion.div
            ref={containerRef}
            data-lenis-prevent
            className="relative mt-[calc(var(--container-pad)*2)] w-full max-w-xl bg-canvas border border-line shadow-sm max-h-[calc(100vh-8rem)] overflow-y-auto"
            initial={{ y: 32, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 32, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between bg-canvas px-[var(--container-pad)] py-6 border-b border-line">
              <h2 className="font-display text-display-s text-ink leading-tight">
                Enquire
              </h2>
              <button
                type="button"
                data-close
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="text-micro text-bronze hover:text-gold transition-colors"
              >
                Close ✕
              </button>
            </div>
            <div className="p-[var(--container-pad)]" data-lenis-prevent>
              <p className="text-body text-bronze mb-8 max-w-md">
                A member of the sales gallery will respond within one working day.
              </p>
              <InquiryForm />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
