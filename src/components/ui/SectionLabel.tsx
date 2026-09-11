import { type ReactNode } from 'react'

interface SectionLabelProps {
  children: ReactNode
  className?: string
  /** Demo mode: width.from is ignored; the hairline renders at width.to. */
  width?: { from: number; to: number }
}

/**
 * SectionLabel — STATIC RENDER (demo mode).
 *
 * Originally this component animated its hairline 32→56px on scroll-enter
 * (0.8s expo.out, the 111w57 signature). For the demo build, all slow
 * expo-out motion has been stripped — the hairline now renders at the
 * `to` width on mount.
 *
 * Still: uppercase micro sans label + hairline, left-aligned, color
 * inherited from the wrapper (callers can pass `className="text-bone/80"`
 * to recolour for dark sections).
 */
export default function SectionLabel({
  children,
  className = '',
  width = { from: 32, to: 56 },
}: SectionLabelProps) {
  return (
    <div className={`flex items-center gap-4 text-bronze ${className}`}>
      <span className="block h-px bg-bronze-deep" style={{ width: `${width.to}px` }} />
      <span className="text-label uppercase">{children}</span>
    </div>
  )
}
