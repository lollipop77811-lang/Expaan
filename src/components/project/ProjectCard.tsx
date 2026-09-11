import { Link } from 'react-router-dom'
import type { Project } from '../../data/projects'

interface ProjectCardProps {
  project: Project
  className?: string
  index?: number
}

/**
 * ProjectCard
 *  Portrait 3:4, hover scale 1.05 over 0.8s, label slides up 8px, ring cursor
 *  state; entire card is one <Link>.
 */
export default function ProjectCard({ project, className = '', index }: ProjectCardProps) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className={`group block ${className}`}
      data-cursor="view"
      aria-label={`${project.name} — ${project.city}. ${project.config.join(', ')}. Price from ${project.priceFrom}.`}
    >
      <div className="relative overflow-hidden bg-canvas-deep" style={{ aspectRatio: '3 / 4' }}>
        <img
          src={project.heroImage}
          alt={`${project.name}, ${project.city}`}
          loading="lazy"
          sizes="(min-width: 900px) 720px, 100vw"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-105"
        />
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(41,58,74,0.40) 100%)' }}
        />
      </div>
      <div className="mt-6 flex flex-col gap-1 transition-transform duration-500 ease-out group-hover:-translate-y-2">
        {typeof index === 'number' && (
          <span className="text-micro text-bronze tnum mb-1">{String(index + 1).padStart(2, '0')}</span>
        )}
        <h3 className="font-display text-display-s text-ink leading-tight">{project.name}</h3>
        <p className="text-body text-bronze">
          {project.config.join(' · ')} · {project.city}
        </p>
        <p className="text-label text-bronze-deep mt-2">
          From {project.priceFrom}
        </p>
      </div>
    </Link>
  )
}
