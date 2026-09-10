import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../../lib/gsap'

interface RevealTextProps {
  text: string
  as?: keyof JSX.IntrinsicElements
  className?: string
  lines?: string[]          // explicit line splits override auto-split
  stagger?: number
  duration?: number
  delay?: number
  start?: string
  once?: boolean
  'aria-label'?: string
}

/**
 * RevealText
 *  Splits the text into line masks. Each line is wrapped in an overflow-hidden
 *  span, with the inner span translating from y:110% to 0, stagger 0.09s,
 *  triggers at 70% viewport. THE only text reveal on the site.
 *
 *  If `lines` is provided, we use them verbatim. Otherwise we split on "\n".
 *  The brief warns against per-letter jitter — we never split characters.
 *
 *  Accessibility: the visible spans are aria-hidden; an aria-label on the
 *  wrapper provides the full text to assistive tech. If no aria-label is
 *  passed, the inner spans remain readable (we don't hide them).
 */
export default function RevealText({
  text,
  as: Tag = 'div',
  className = '',
  lines,
  stagger = 0.09,
  duration = 1.2,
  delay = 0,
  start = 'top 70%',
  once = true,
  ...rest
}: RevealTextProps) {
  const ref = useRef<HTMLElement | null>(null)
  const ariaLabel = rest['aria-label']
  const split = lines ?? text.split('\n')

  useEffect(() => {
    if (prefersReducedMotion()) {
      const inner = ref.current?.querySelectorAll('.reveal-line__inner')
      inner?.forEach((n) => gsap.set(n, { yPercent: 0 }))
      return
    }
    const el = ref.current
    if (!el) return
    const ctx = gsap.context(() => {
      const inners = el.querySelectorAll('.reveal-line__inner')
      gsap.set(inners, { yPercent: 110 })
      ScrollTrigger.create({
        trigger: el,
        start,
        once,
        onEnter: () => {
          gsap.to(inners, {
            yPercent: 0,
            duration,
            stagger,
            delay,
            ease: 'expo.out',
          })
        },
      })
    }, el)
    return () => ctx.revert()
  }, [stagger, duration, delay, start, once])

  const Component = Tag as unknown as React.ElementType

  return (
    <Component ref={ref as unknown as React.Ref<HTMLElement>} className={className} aria-label={ariaLabel}>
      {split.map((line, i) => (
        <span key={i} className="block overflow-hidden" aria-hidden={ariaLabel ? true : undefined}>
          <span className="reveal-line__inner block will-change-transform">{line || '\u00A0'}</span>
        </span>
      ))}
    </Component>
  )
}
