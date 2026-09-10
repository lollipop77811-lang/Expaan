import type { Project } from '../../data/projects'

interface AvailabilityTableProps {
  project: Project
}

/**
 * AvailabilityTable — per-configuration availability with status badges.
 */
export default function AvailabilityTable({ project }: AvailabilityTableProps) {
  const rows = project.availability ?? []
  return (
    <div className="w-full">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-line">
            <th className="text-micro text-bronze uppercase text-left py-4 pr-4">Unit</th>
            <th className="text-micro text-bronze uppercase text-left py-4 pr-4 hidden md:table-cell">Floor</th>
            <th className="text-micro text-bronze uppercase text-left py-4 pr-4 hidden md:table-cell">Area</th>
            <th className="text-micro text-bronze uppercase text-left py-4 pr-4">Price</th>
            <th className="text-micro text-bronze uppercase text-right py-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.unit} className="border-b border-line">
              <td className="py-4 pr-4 text-body text-ink tnum">{r.unit}</td>
              <td className="py-4 pr-4 text-body text-bronze tnum hidden md:table-cell">{r.floor}</td>
              <td className="py-4 pr-4 text-body text-bronze tnum hidden md:table-cell">{r.area}</td>
              <td className="py-4 pr-4 text-body text-ink tnum">{r.price}</td>
              <td className="py-4 text-right">
                <span className={`text-micro uppercase ${
                  r.status === 'Available' ? 'text-gold-deep' : r.status === 'Hold' ? 'text-bronze-deep' : 'text-bronze/50'
                }`}>
                  {r.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
