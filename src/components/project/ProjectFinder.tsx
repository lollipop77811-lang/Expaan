import { useState } from 'react'
import { Link } from 'react-router-dom'
import { projects } from '../../data/projects'
import Button from '../ui/Button'

/**
 * ProjectFinder
 *  Single-property DUOS Wynwood finder. The original multi-property cascade
 *  (City → Project → Config) collapses to a single Configuration selector with
 *  three buttons (Studio / 1-BR / 2-BR), each linking to the detail page with
 *  a config query param.
 *
 *  Navy panel, seafoam text, seafoam hairlines. Direct Sobha-style conversion
 *  widget restyled for DUOS Wynwood.
 */
const DUOS = projects[0]

const CONFIGS = DUOS.config.map((label, i) => ({
  label,
  area: DUOS.floorPlans[i]?.area ?? '',
  priceFrom: i === 0 ? 'From $495,000' : i === 1 ? 'From $565,000' : 'From $795,000',
}))

export default function ProjectFinder() {
  const [selected, setSelected] = useState<string>('')

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="bg-night text-bone p-[var(--container-pad)] sm:p-16 rounded-none"
      data-lenis-prevent
    >
      <div className="mb-10">
        <span className="text-micro text-bone/60">Choose your configuration</span>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {CONFIGS.map((c) => {
          const active = selected === c.label
          return (
            <button
              key={c.label}
              type="button"
              onClick={() => setSelected(c.label)}
              className={`group text-left border-b py-6 transition-colors duration-300 ${
                active
                  ? 'border-canvas-soft text-canvas-soft'
                  : 'border-bone/30 text-bone hover:border-bone/60'
              }`}
              aria-pressed={active}
            >
              <div className="text-micro text-bone/60 mb-3 uppercase tracking-[0.14em]">
                {c.priceFrom}
              </div>
              <div className="font-display text-display-s leading-tight mb-2">{c.label}</div>
              <div className="text-body text-bone/80">{c.area}</div>
            </button>
          )
        })}
      </div>
      <div className="mt-10 flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
        <p className="text-micro text-bone/60 max-w-md">
          49 residences. Studio, one-bedroom, and two-bedroom. Pre-construction.
        </p>
        <Link
          to={`/projects/${DUOS.slug}${selected ? `?config=${encodeURIComponent(selected)}` : ''}`}
          className="inline-flex"
        >
          <Button type="button" variant="gold">
            {selected ? `Find a ${selected} residence` : 'View all residences'}
          </Button>
        </Link>
      </div>
    </form>
  )
}
