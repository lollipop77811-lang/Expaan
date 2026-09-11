import { type ReactNode } from 'react'

interface ChapterDividerProps {
  index?: string
  label: string
  children?: ReactNode
  className?: string
}

/**
 * ChapterDivider — STATIC RENDER (demo mode).
 *
 * Originally this component grew its hairline 0→100% on scroll-enter
 * (0.8s expo.out, from left center). For the demo build, all slow expo-out
 * motion has been stripped — the hairline now renders full-width on mount.
 *
 * Still a 12-col grid row with the section label on the left and an
 * oversized chapter index numeral on the right.
 */
export default function ChapterDivider({ index, label, children, className = '' }: ChapterDividerProps) {
  return (
    <div className={`site-max site-grid section-pad-tight ${className}`}>
      <div className="col-span-12 flex items-baseline justify-between">
        <span className="text-micro text-bronze">{label}</span>
        {index && (
          <span className="font-display text-display-s text-ink/30 tnum" aria-hidden>
            {index}
          </span>
        )}
      </div>
      <div className="col-span-12 mt-6">
        <div className="hairline" />
      </div>
      {children && <div className="col-span-12 mt-8">{children}</div>}
    </div>
  )
}
