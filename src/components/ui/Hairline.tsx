interface HairlineProps {
  className?: string
  variant?: 'line' | 'sage'
}

export default function Hairline({ className = '', variant = 'line' }: HairlineProps) {
  return <hr className={`hairline ${variant === 'sage' ? 'hairline-strong' : ''} ${className}`} />
}
