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
 * RevealText — STATIC RENDER (demo mode).
 *
 * Originally this component split text into line masks and animated each
 * line up from y:110% with a 0.09s stagger on scroll-enter (the only text
 * reveal on the site). For the demo build, all slow expo-out motion has
 * been stripped — this component now renders the same line-split JSX
 * statically, preserving the same DOM shape and props so all page imports
 * keep working without changes.
 *
 * Lines are split on "\n" and each is wrapped in a block span (preserving
 * the line breaks visually). The `as` prop lets pages render as h1, h2,
 * p, blockquote, etc.
 */
export default function RevealText({
  text,
  as: Tag = 'div',
  className = '',
  lines,
  ...rest
}: RevealTextProps) {
  const ariaLabel = rest['aria-label']
  const split = lines ?? text.split('\n')
  const Component = Tag as unknown as React.ElementType

  return (
    <Component className={className} aria-label={ariaLabel}>
      {split.map((line, i) => (
        <span key={i} className="block" aria-hidden={ariaLabel ? true : undefined}>
          {line || '\u00A0'}
        </span>
      ))}
    </Component>
  )
}
