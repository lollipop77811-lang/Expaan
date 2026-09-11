import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { projects } from '../../data/projects'
import Field from './Field'

const schema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  email: z.string().email('A valid email is required'),
  phone: z.string().min(7, 'Phone number is too short'),
  interest: z.string().min(1, 'Please select a residence'),
  message: z.string().min(10, 'Tell us a little more').max(1200, 'Please keep under 1200 characters'),
  consent: z.literal(true, { errorMap: () => ({ message: 'Please accept to continue' }) }),
})

type FormData = z.infer<typeof schema>

interface InquiryFormProps {
  projectSlug?: string
}

/**
 * InquiryForm — RHF + Zod with designed success state.
 *
 * On submit: form replaces itself with a serif thank-you line.
 * No browser alerts. Errors in micro bronze-deep under fields, gold focus ring.
 *
 * Demo mode: the 1.2s gold fill sweep animation has been stripped.
 */
export default function InquiryForm({ projectSlug }: InquiryFormProps) {
  const [success, setSuccess] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      interest: projectSlug ?? '',
    },
  })

  const onSubmit = async (data: FormData) => {
    setSubmitting(true)
    // Brief async delay so the 'Sending…' state shows, then success.
    await new Promise((res) => setTimeout(res, 400))
    console.info('Inquiry submitted', data)
    setSubmitting(false)
    setSuccess(true)
    reset()
  }

  if (success) {
    return (
      <div className="py-12" aria-live="polite">
        <h3 className="font-display text-display-s text-ink leading-tight">Thank you for writing.</h3>
        <p className="mt-4 max-w-md text-body-l text-bronze">
          A member of the Expaan sales gallery will be in touch within one
          working day. We look forward to showing you the residence in person
          at 335 NW 28th Street, Miami.
        </p>
        <button
          type="button"
          onClick={() => setSuccess(false)}
          className="mt-8 text-label uppercase tracking-[0.12em] text-ink border-b border-ink pb-1 hover:text-bronze-deep hover:border-bronze-deep transition-colors"
        >
          Send another enquiry
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-8">
      <Field label="Full name" required error={errors.name?.message}>
        <input
          type="text"
          autoComplete="name"
          aria-invalid={!!errors.name || undefined}
          {...register('name')}
          className="w-full border-b border-line bg-transparent py-3 text-body-l text-ink focus:outline-none focus:border-gold transition-colors"
        />
      </Field>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Field label="Email" required error={errors.email?.message}>
          <input
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email || undefined}
            {...register('email')}
            className="w-full border-b border-line bg-transparent py-3 text-body-l text-ink focus:outline-none focus:border-gold transition-colors"
          />
        </Field>
        <Field label="Telephone" required error={errors.phone?.message}>
          <input
            type="tel"
            autoComplete="tel"
            aria-invalid={!!errors.phone || undefined}
            {...register('phone')}
            className="w-full border-b border-line bg-transparent py-3 text-body-l text-ink focus:outline-none focus:border-gold transition-colors"
          />
        </Field>
      </div>

      <Field label="Residence of interest" required error={errors.interest?.message}>
        <select
          aria-invalid={!!errors.interest || undefined}
          {...register('interest')}
          className="w-full appearance-none border-b border-line bg-transparent py-3 pr-6 text-body-l text-ink focus:outline-none focus:border-gold transition-colors"
        >
          <option value="" disabled style={{ color: '#293A4A' }}>Select a residence</option>
          {projects.map((p) => (
            <option key={p.slug} value={p.slug} style={{ color: '#293A4A' }}>
              {p.name} — {p.city}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Configuration" error={errors.interest?.message}>
        <select
          aria-label="Configuration"
          className="w-full appearance-none border-b border-line bg-transparent py-3 pr-6 text-body-l text-ink focus:outline-none focus:border-gold transition-colors"
          defaultValue=""
        >
          <option value="" disabled style={{ color: '#293A4A' }}>Studio / 1-BR / 2-BR</option>
          <option value="Studio" style={{ color: '#293A4A' }}>Studio — 478 sq ft</option>
          <option value="1-Bedroom" style={{ color: '#293A4A' }}>One-bedroom — 612 sq ft</option>
          <option value="2-Bedroom" style={{ color: '#293A4A' }}>Two-bedroom — 844 sq ft</option>
        </select>
      </Field>

      <Field label="Message" required error={errors.message?.message}>
        <textarea
          rows={4}
          aria-invalid={!!errors.message || undefined}
          {...register('message')}
          className="w-full border-b border-line bg-transparent py-3 text-body-l text-ink focus:outline-none focus:border-gold transition-colors resize-none"
          placeholder="Tell us about your interest, timeline, and what would make this home."
        />
      </Field>

      <label className="flex items-start gap-3 text-body text-bronze">
        <input
          type="checkbox"
          aria-invalid={!!errors.consent || undefined}
          {...register('consent')}
          className="mt-1.5 h-4 w-4 accent-gold border-line"
        />
        <span>
          I consent to be contacted by Expaan regarding this enquiry and accept the privacy policy.
        </span>
      </label>
      {errors.consent && (
        <p className="text-micro text-bronze-deep -mt-4" role="alert" aria-live="assertive">
          {errors.consent.message}
        </p>
      )}

      <div className="mt-2">
        <button
          type="submit"
          disabled={submitting}
          className="relative inline-flex h-[var(--button-h)] items-center justify-center rounded-[var(--radius-pill)] px-8 text-label text-bone bg-gold transition-colors duration-300 hover:bg-canvas-soft hover:text-ink disabled:opacity-90 disabled:cursor-wait"
        >
          <span className="relative z-10">{submitting ? 'Sending…' : 'Begin the conversation'}</span>
        </button>
      </div>
    </form>
  )
}
