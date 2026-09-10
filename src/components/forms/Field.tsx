import { type ReactNode } from 'react'

interface FieldProps {
  label: string
  error?: string
  children: ReactNode
  required?: boolean
}

/**
 * Field — accessible label wrapper for form controls.
 */
export default function Field({ label, error, children, required }: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-micro text-bronze uppercase flex items-baseline justify-between">
        <span>{label}</span>
        {required && <span className="text-gold-deep" aria-hidden>*</span>}
      </label>
      {children}
      {error && (
        <p className="text-micro text-bronze-deep" role="alert" aria-live="assertive">
          {error}
        </p>
      )}
    </div>
  )
}
