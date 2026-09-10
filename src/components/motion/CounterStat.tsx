import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../../lib/gsap'

interface CounterStatProps {
  value: number
  suffix?: string
  prefix?: string
  label: string
  duration?: number
  className?: string
}

/**
 * CounterStat
 *  Numerals count 0→N over 1.6s expo on first enter, tnum, suffix in gold.
 */
export default function CounterStat({
  value,
  suffix = '',
  prefix = '',
  label,
  duration = 1.6,
  className = '',
}: CounterStatProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (prefersReducedMotion()) {
      setDisplay(value)
      return
    }
    const el = ref.current
    if (!el) return
    const obj = { v: 0 }
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(obj, {
            v: value,
            duration,
            ease: 'expo.out',
            onUpdate: () => setDisplay(Math.round(obj.v)),
          })
        },
      })
    }, el)
    return () => ctx.revert()
  }, [value, duration])

  return (
    <div ref={ref} className={`flex flex-col gap-3 ${className}`}>
      <div className="font-display text-display text-ink tnum leading-none">
        {prefix}
        {display.toLocaleString('en-GB')}
        {suffix && <span className="text-gold">{suffix}</span>}
      </div>
      <div className="text-micro text-bronze">{label}</div>
    </div>
  )
}
