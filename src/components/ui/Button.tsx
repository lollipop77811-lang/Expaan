import { type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useMagnetic } from '../../hooks/useMagnetic'

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
 * Button — variants `gold` (filled, bone text, 999px radius, 56px height,
 *   0.6s hover darkening + 8px magnetic drift) and `ghost` (hairline border,
 *   bronze text, border sweeps to gold).
 *
 * Magnetic via useMagnetic (±8px).
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
  const magRef = useMagnetic<HTMLElement>(8)

  const base = `relative inline-flex items-center justify-center rounded-[var(--radius-pill)] transition-colors duration-300 outline-offset-4 select-none ${
    size === 'lg' ? 'h-[64px] px-10 text-body-l' : 'h-[var(--button-h)] px-8 text-label'
  } ${disabled ? 'opacity-50 pointer-events-none' : ''} ${className}`

  const variantCls =
    variant === 'gold'
      ? 'bg-gold text-bone hover:bg-gold-deep'
      : 'border border-line text-bronze hover:border-gold hover:text-gold-deep'

  const inner = <span className="relative z-10 inline-flex items-center gap-2">{children}</span>

  if (to) {
    return (
      <Link ref={magRef as unknown as React.Ref<HTMLAnchorElement>} to={to} className={`${base} ${variantCls}`} aria-label={ariaLabel} onClick={onClick}>
        {inner}
      </Link>
    )
  }
  if (href) {
    return (
      <a ref={magRef as unknown as React.Ref<HTMLAnchorElement>} href={href} className={`${base} ${variantCls}`} aria-label={ariaLabel} onClick={onClick}>
        {inner}
      </a>
    )
  }
  return (
    <button ref={magRef as unknown as React.Ref<HTMLButtonElement>} type={type} className={`${base} ${variantCls}`} aria-label={ariaLabel} onClick={onClick} disabled={disabled}>
      {inner}
    </button>
  )
}
