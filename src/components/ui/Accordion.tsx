import { useState, type ReactNode } from 'react'

interface AccordionItem {
  q: string
  a: ReactNode
}

interface AccordionProps {
  items: AccordionItem[]
  className?: string
}

/**
 * Accordion — DEMO MODE (no framer-motion).
 *
 * Originally this used framer-motion's AnimatePresence + motion.div with
 * height: auto animation (0.5s expo) for the expand/collapse. For the
 * demo build, all slow expo-out motion has been stripped — the answer
 * now shows/hides via plain conditional render (instant).
 *
 * Preserves: hairline rows, plus-rotates-to-X icon (CSS transition),
 * serif question text, aria-expanded state.
 */
export default function Accordion({ items, className = '' }: AccordionProps) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className={`w-full ${className}`}>
      {items.map((it, i) => {
        const isOpen = open === i
        return (
          <div key={i} className="border-b border-line">
            <button
              type="button"
              className="flex w-full items-center justify-between gap-6 py-6 text-left"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <span className="font-display text-display-s text-ink leading-tight">{it.q}</span>
              <span
                aria-hidden
                className="relative inline-flex h-5 w-5 shrink-0"
                style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease-out' }}
              >
                <span className="absolute left-1/2 top-1/2 h-px w-5 -translate-x-1/2 -translate-y-1/2 bg-bronze-deep" />
                <span className="absolute left-1/2 top-1/2 h-5 w-px -translate-x-1/2 -translate-y-1/2 bg-bronze-deep" />
              </span>
            </button>
            {isOpen && (
              <div className="overflow-hidden">
                <div className="pb-8 pr-12 text-body text-bronze max-w-xl">{it.a}</div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
