import type { Project } from '../../data/projects'

interface SpecTableProps {
  project: Project
  className?: string
}

/**
 * SpecTable — hairline rows for Configuration / Sizes / Status / Possession / Price.
 */
export default function SpecTable({ project, className = '' }: SpecTableProps) {
  const rows: { label: string; value: string }[] = [
    { label: 'Configuration', value: project.config.join(', ') },
    { label: 'Sizes', value: project.sizes },
    { label: 'Status', value: project.status },
    { label: 'Possession', value: project.possession },
    { label: 'Price from', value: project.priceFrom },
  ]
  return (
    <dl className={`w-full ${className}`}>
      {rows.map((r) => (
        <div key={r.label} className="grid grid-cols-2 border-b border-line py-4">
          <dt className="text-micro text-bronze uppercase">{r.label}</dt>
          <dd className="text-body text-ink text-right tnum">{r.value}</dd>
        </div>
      ))}
    </dl>
  )
}
