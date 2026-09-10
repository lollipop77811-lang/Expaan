import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { projects } from '../../data/projects'
import Button from '../ui/Button'

const CITIES = Array.from(new Set(projects.map((p) => p.city)))

/**
 * ProjectFinder
 *  Three styled selects (City → Project → Config cascade), gold submit;
 *  navigates to /projects?city=…&config=…. Dark night panel, bone text,
 *  sage hairlines.
 *
 *  Direct Sobha-style conversion widget, restyled in The Meridian tokens.
 */
export default function ProjectFinder() {
  const [city, setCity] = useState('')
  const [projectSlug, setProjectSlug] = useState('')
  const [config, setConfig] = useState('')
  const navigate = useNavigate()

  const cityProjects = useMemo(() => {
    if (!city) return []
    return projects.filter((p) => p.city === city)
  }, [city])

  const selectedProject = useMemo(
    () => projects.find((p) => p.slug === projectSlug),
    [projectSlug],
  )

  const configs = selectedProject?.config ?? []

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (city) params.set('city', city)
    if (config) params.set('config', config)
    if (projectSlug) params.set('project', projectSlug)
    navigate(`/projects?${params.toString()}`)
  }

  return (
    <form
      onSubmit={submit}
      className="bg-night text-bone p-[var(--container-pad)] sm:p-16 rounded-none"
      data-lenis-prevent
    >
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <Field label="City">
          <Select
            value={city}
            onChange={(v) => {
              setCity(v)
              setProjectSlug('')
              setConfig('')
            }}
            options={CITIES.map((c) => ({ value: c, label: c }))}
            placeholder="Select city"
          />
        </Field>
        <Field label="Project">
          <Select
            value={projectSlug}
            onChange={(v) => {
              setProjectSlug(v)
              setConfig('')
            }}
            options={cityProjects.map((p) => ({ value: p.slug, label: p.name }))}
            placeholder={city ? 'Select project' : 'Select city first'}
            disabled={!city}
          />
        </Field>
        <Field label="Configuration">
          <Select
            value={config}
            onChange={setConfig}
            options={configs.map((c) => ({ value: c, label: c }))}
            placeholder={projectSlug ? 'Select configuration' : 'Select project first'}
            disabled={!projectSlug}
          />
        </Field>
      </div>
      <div className="mt-10 flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
        <p className="text-micro text-bone/60 max-w-md">
          Six residences across three cities. A curated portfolio for considered buyers.
        </p>
        <Button type="submit" variant="gold">
          Find your home
        </Button>
      </div>
    </form>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-3">
      <span className="text-micro text-bone/60">{label}</span>
      {children}
    </label>
  )
}

interface SelectProps {
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
  placeholder?: string
  disabled?: boolean
}

function Select({ value, onChange, options, placeholder, disabled }: SelectProps) {
  return (
    <div className="relative">
      <select
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none border-b border-bone/30 bg-transparent py-3 pr-8 text-body-l text-bone focus:outline-none focus:border-canvas-soft disabled:opacity-40"
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
      <span
        aria-hidden
        className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-bone/60 text-micro"
      >
        ↓
      </span>
    </div>
  )
}
