import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { projects } from '../../data/projects'
import ProjectCard from './ProjectCard'
import { useFilters } from '../../lib/store'

const CITIES = Array.from(new Set(projects.map((p) => p.city)))
const CONFIGS = Array.from(new Set(projects.flatMap((p) => p.config)))
const STATUSES = Array.from(new Set(projects.map((p) => p.status)))

/**
 * ProjectGrid
 *  Two-column grid of ProjectCards with staggered reveals (0.08s).
 *  Filters as text-link rows in label style with gold active state.
 *  Driven by URL query params.
 */
export default function ProjectGrid() {
  const navigate = useNavigate()
  const location = useLocation()
  const filters = useFilters()

  // Hydrate filter state from URL on mount.
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    useFilters.setState({
      city: params.get('city') ?? '',
      config: params.get('config') ?? '',
      status: params.get('status') ?? '',
    })
  }, [location.search])

  const set = (key: 'city' | 'config' | 'status', value: string) => {
    const next = { ...filters, [key]: value === filters[key] ? '' : value }
    useFilters.setState(next)
    const params = new URLSearchParams()
    if (next.city) params.set('city', next.city)
    if (next.config) params.set('config', next.config)
    if (next.status) params.set('status', next.status)
    const qs = params.toString()
    navigate(qs ? `/projects?${qs}` : '/projects', { replace: true })
  }

  const filtered = projects.filter((p) => {
    if (filters.city && p.city !== filters.city) return false
    if (filters.config && !p.config.includes(filters.config)) return false
    if (filters.status && p.status !== filters.status) return false
    return true
  })

  return (
    <div className="site-max section-pad">
      <FilterRow label="City" options={CITIES} active={filters.city} onPick={(v) => set('city', v)} />
      <FilterRow label="Config" options={CONFIGS} active={filters.config} onPick={(v) => set('config', v)} />
      <FilterRow label="Status" options={STATUSES} active={filters.status} onPick={(v) => set('status', v)} />

      <div className="mt-12 flex items-baseline justify-between border-t border-line pt-6">
        <span className="text-micro text-bronze">
          Showing {filtered.length} of {projects.length} residences
        </span>
      </div>

      {filtered.length === 0 ? (
        <EmptyState onReset={() => {
          useFilters.getState().reset()
          navigate('/projects', { replace: true })
        }} />
      ) : (
        <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-20 md:grid-cols-2">
          {filtered.map((p, i) => (
            <div
              key={p.slug}
              className="opacity-0 translate-y-8 transition-all duration-1000 ease-out"
              style={{ animation: `fadeUp 1s var(--ease-primary) ${i * 0.08}s forwards` }}
            >
              <ProjectCard project={p} index={i} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function FilterRow({
  label,
  options,
  active,
  onPick,
}: {
  label: string
  options: string[]
  active: string
  onPick: (v: string) => void
}) {
  return (
    <div className="mt-6 flex flex-wrap items-baseline gap-x-6 gap-y-2">
      <span className="text-micro text-bronze/60">{label}</span>
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => onPick(o)}
          className={`text-label uppercase tracking-[0.12em] transition-colors duration-300 ${
            active === o ? 'text-gold-deep' : 'text-bronze hover:text-bronze-deep'
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  )
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="mt-32 flex flex-col items-center gap-8 text-center">
      <h3 className="font-display text-display-s text-ink">No residences match this filter.</h3>
      <p className="max-w-md text-body text-bronze">
        Try fewer constraints, or browse our full inventory.
      </p>
      <button type="button" onClick={onReset} className="text-label uppercase tracking-[0.12em] text-gold-deep border-b border-gold-deep pb-1 hover:text-gold">
        View all residences
      </button>
    </div>
  )
}
