import { type ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Variant = 'gold' | 'ghost'
type Size = 'md' | 'lg'

interface ButtonProps {
  children: ReactNode
  variant?: Variant
  size?: Size
  to?: string         // internal link via react-router
  href?: string       // external link
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  className?: string
  disabled?: boolean
  ariaLabel?: string
}

/**
 * Button — two-tone brand palette.
 *   `gold` (primary): solid #293A4A navy background with #BCD1D4 seafoam text.
 *     On hover, INVERTS: #BCD1D4 seafoam background with #293A4A navy text.
 *     999px pill radius, 56px height.
 *   `ghost` (secondary): hairline navy border + navy text on light sections.
 *     On hover, fills to solid navy with seafoam text.
 *
 * Demo mode: the ±8px magnetic drift on hover has been stripped.
 */
export default function Button({
  children,
  variant = 'gold',
  size = 'md',
  to,
  href,
  onClick,
  type = 'button',
  className = '',
  disabled = false,
  ariaLabel,
}: ButtonProps) {
  const base = `relative inline-flex items-center justify-center rounded-[var(--radius-pill)] transition-colors duration-300 outline-offset-4 select-none ${
    size === 'lg' ? 'h-[64px] px-10 text-body-l' : 'h-[var(--button-h)] px-8 text-label'
  } ${disabled ? 'opacity-50 pointer-events-none' : ''} ${className}`

  // Two-tone brand palette: navy ↔ seafoam inversion on hover.
  // - Primary (gold): default navy bg + seafoam text → hover seafoam bg + navy text.
  // - Ghost: default hairline navy border + navy text → hover solid navy bg + seafoam text.
  const variantCls =
    variant === 'gold'
      ? 'bg-gold text-bone hover:bg-canvas-soft hover:text-ink'
      : 'border border-line text-ink hover:bg-ink hover:text-bone hover:border-ink'

  const inner = <span className="relative z-10 inline-flex items-center gap-2">{children}</span>

  if (to) {
    return (
      <Link to={to} className={`${base} ${variantCls}`} aria-label={ariaLabel} onClick={onClick}>
        {inner}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={`${base} ${variantCls}`} aria-label={ariaLabel} onClick={onClick}>
        {inner}
      </a>
    )
  }
  return (
    <button type={type} className={`${base} ${variantCls}`} aria-label={ariaLabel} onClick={onClick} disabled={disabled}>
      {inner}
    </button>
  )
}
