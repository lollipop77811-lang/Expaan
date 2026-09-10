import { useState } from 'react'
import type { Project } from '../../data/projects'
import Button from '../ui/Button'

interface FloorPlanGalleryProps {
  project: Project
}

/**
 * FloorPlanGallery
 *  Tabbed by configuration, plans in bordered sage frames, download ghost link.
 */
export default function FloorPlanGallery({ project }: FloorPlanGalleryProps) {
  const [tab, setTab] = useState(project.floorPlans[0]?.config ?? '')

  const plans = project.floorPlans.filter((fp) => fp.config === tab)
  const configs = Array.from(new Set(project.floorPlans.map((fp) => fp.config)))

  return (
    <div>
      <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2 border-b border-line pb-6">
        {configs.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setTab(c)}
            className={`text-label uppercase tracking-[0.12em] transition-colors duration-300 ${
              tab === c ? 'text-gold-deep' : 'text-bronze hover:text-bronze-deep'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2">
        {plans.map((fp, i) => (
          <figure key={i} className="flex flex-col gap-4">
            <div className="border border-sage bg-canvas-soft p-6" style={{ aspectRatio: '4 / 3' }}>
              <img
                src={fp.image}
                alt={`${project.name} — ${fp.config} floor plan, ${fp.label}`}
                loading="lazy"
                className="h-full w-full object-contain"
              />
            </div>
            <figcaption className="flex items-baseline justify-between">
              <span className="text-micro text-bronze uppercase">{fp.label}</span>
              <span className="text-micro text-bronze/60 tnum">{fp.area}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-10">
        <Button variant="ghost" href={`mailto:sales@meridian.com?subject=Floor plans — ${project.name}`}>
          Request full set
        </Button>
      </div>
    </div>
  )
}
