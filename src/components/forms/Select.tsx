import { type ReactNode } from 'react'

interface SelectProps {
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
  placeholder?: string
  invalid?: boolean
  children?: ReactNode
  name?: string
  id?: string
}

export default function Select({ value, onChange, options, placeholder, invalid, name, id }: SelectProps) {
  return (
    <select
      id={id}
      name={name}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-invalid={invalid || undefined}
      className={`w-full appearance-none border-b bg-transparent py-3 pr-6 text-body-l text-ink focus:outline-none transition-colors ${
        invalid ? 'border-bronze-deep' : 'border-line focus:border-gold'
      }`}
    >
      <option value="" disabled style={{ color: '#293A4A' }}>
        {placeholder ?? 'Select'}
      </option>
      {options.map((o) => (
        <option key={o.value} value={o.value} style={{ color: '#293A4A' }}>
          {o.label}
        </option>
      ))}
    </select>
  )
}
