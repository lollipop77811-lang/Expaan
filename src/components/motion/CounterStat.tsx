interface CounterStatProps {
  value: number
  suffix?: string
  prefix?: string
  label: string
  duration?: number    // ignored in static mode
  className?: string
}

/**
 * CounterStat — STATIC RENDER (demo mode).
 *
 * Originally this component animated numerals 0→N over 1.6s with expo.out
 * on first scroll-enter, with the suffix in gold. For the demo build, all
 * slow expo-out motion has been stripped — this component now renders the
 * final value immediately, still with tnum (tabular figures), suffix in
 * gold, and the same DOM shape.
 */
export default function CounterStat({
  value,
  suffix = '',
  prefix = '',
  label,
  className = '',
}: CounterStatProps) {
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <div className="font-display text-display text-ink tnum leading-none">
        {prefix}
        {value.toLocaleString('en-GB')}
        {suffix && <span className="text-gold">{suffix}</span>}
      </div>
      <div className="text-micro text-bronze">{label}</div>
    </div>
  )
}
