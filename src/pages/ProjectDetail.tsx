import { useParams, Link } from 'react-router-dom'
import { useUI } from '../lib/store'
import RevealText from '../components/motion/RevealText'
import SectionLabel from '../components/ui/SectionLabel'
import Accordion from '../components/ui/Accordion'
import HorizontalGallery from '../components/motion/HorizontalGallery'
import SpecTable from '../components/project/SpecTable'
import FloorPlanGallery from '../components/project/FloorPlanGallery'
import AvailabilityTable from '../components/project/AvailabilityTable'
import { getProject, getNextProject } from '../data/projects'
import NotFound from './NotFound'
import { landscape } from '../lib/image'

/**
 * ProjectDetail — Expaan detail page. 8 blocks per the brief:
 * 1. Hero — full-bleed render + name + breadcrumb.
 * 2. Overview — text column + spec table + meta grid.
 * 3. HorizontalGallery — pinned, 7 portrait renders (signature moment).
 * 4. Amenities accordion.
 * 5. Floor plans — tabbed by configuration.
 * 6. Location — Expaan map + POI hairline table with distances.
 * 7. Availability table.
 * 8. Sticky inquiry rail (desktop).
 */
export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const project = slug ? getProject(slug) : undefined

  if (!project) return <NotFound />

  const next = getNextProject(project.slug)

  return (
    <>
{/* 1. HERO */}
      <section className="relative w-full overflow-hidden" style={{ aspectRatio: '16 / 9', minHeight: '90vh' }}>
        <img
          src={project.heroImageLandscape}
          alt={`${project.name}, ${project.district}, ${project.city}`}
          // @ts-ignore
          fetchpriority="high"
          className="absolute inset-0 h-full w-full object-cover will-change-transform"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(41,58,74,0.35) 0%, rgba(41,58,74,0.70) 100%)' }} />
        <div className="site-max site-grid relative z-10 h-full items-end pb-[calc(var(--container-pad)*3)]">
          <div className="col-span-12 flex flex-col gap-8">
            <nav aria-label="Breadcrumb" className="text-micro text-bone/80">
              <Link to="/" className="hover:text-canvas transition-colors">Home</Link>
              <span className="px-2">/</span>
              <Link to="/projects" className="hover:text-canvas transition-colors">Residences</Link>
              <span className="px-2">/</span>
              <span>{project.name}</span>
            </nav>
            <RevealText
              as="h1"
              className="font-display text-display-xl text-bone leading-[1.02]"
              text={project.name}
            />
          </div>
        </div>
      </section>

      {/* 2. OVERVIEW */}
      <section className="site-max site-grid section-pad" aria-label="Overview">
        <div className="col-span-12 mb-12">
          <SectionLabel>Overview</SectionLabel>
        </div>
        <div className="col-span-12 md:col-span-6 md:col-start-1">
          <p className="font-display text-display-s text-ink leading-tight">{project.overview}</p>
        </div>
        <div className="col-span-12 md:col-span-4 md:col-start-9 mt-12 md:mt-0">
          <SpecTable project={project} />
        </div>
        <div className="col-span-12 grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 border-t border-line pt-8">
          <Meta label="Architect" value={project.architect} />
          <Meta label="Interiors" value={project.interiors} />
          <Meta label="Location" value={`${project.district}, ${project.city}`} />
          <Meta label="Coordinates" value={`${project.coordinates.lat.toFixed(3)}, ${project.coordinates.lng.toFixed(3)}`} />
        </div>
      </section>

      {/* 3. HORIZONTAL GALLERY — the signature moment */}
      <HorizontalGallery items={project.gallery} id={`${project.slug}-gallery`} />

      {/* 4. AMENITIES ACCORDION */}
      <section className="site-max site-grid section-pad bg-canvas-soft" aria-label="Amenities">
        <div className="col-span-12 mb-12">
          <SectionLabel>Amenities</SectionLabel>
        </div>
        <div className="col-span-12 md:col-span-10">
          <Accordion items={project.amenities.map((a) => ({ q: a.title, a: a.body }))} />
        </div>
      </section>

      {/* 5. FLOOR PLANS */}
      <section className="site-max site-grid section-pad" aria-label="Floor plans">
        <div className="col-span-12 mb-12">
          <SectionLabel>Floor plans</SectionLabel>
        </div>
        <div className="col-span-12 md:col-span-12">
          <FloorPlanGallery project={project} />
        </div>
      </section>

      {/* 6. LOCATION */}
      <section className="site-max site-grid section-pad bg-canvas-soft" aria-label="Location">
        <div className="col-span-12 mb-12">
          <SectionLabel>Location</SectionLabel>
        </div>
        <div className="col-span-12 md:col-span-7">
          <div className="relative overflow-hidden" style={{ aspectRatio: '4 / 3' }}>
            <img
              src={landscape(`${project.slug}-map`, 1600, 1200)}
              alt={`${project.district}, ${project.city} — aerial`}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
        <div className="col-span-12 md:col-span-4 md:col-start-9 mt-12 md:mt-0 flex flex-col gap-6">
          <h3 className="font-display text-display-s text-ink leading-tight">
            {project.district}, {project.city}
          </h3>
          <p className="text-body text-bronze">
            The neighbourhood, by foot. Distances are door-to-door from
            335 NW 28th Street.
          </p>
          <div className="border-t border-line pt-4">
            {project.nearby.map((n, i) => (
              <div key={i} className="grid grid-cols-12 border-b border-line py-4">
                <span className="col-span-8 text-body text-bronze">{n.name}</span>
                <span className="col-span-2 text-micro text-bronze/60 uppercase">{n.category}</span>
                <span className="col-span-2 text-body text-ink tnum text-right">{n.distance}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. AVAILABILITY */}
      {project.availability && project.availability.length > 0 && (
        <section className="site-max site-grid section-pad" aria-label="Availability">
          <div className="col-span-12 mb-12">
            <SectionLabel>Availability</SectionLabel>
          </div>
          <div className="col-span-12">
            <AvailabilityTable project={project} />
          </div>
        </section>
      )}

      {/* 8. STICKY INQUIRY RAIL */}
      <div
        className="hidden md:block fixed bottom-8 right-[var(--container-pad)] z-[80] bg-canvas border border-line p-6 shadow-sm"
        aria-label="Inquiry rail"
      >
        <p className="text-micro text-bronze mb-3">Residence enquiry</p>
        <StickyInquire projectSlug={project.slug} />
        <div className="mt-4 flex flex-col gap-1 text-micro text-bronze">
          <a href="tel:+13055550148" className="hover:text-ink transition-colors">+1 305 555 0148</a>
          <a href="mailto:sales@expaan.com" className="hover:text-ink transition-colors">sales@expaan.com</a>
        </div>
      </div>

      {/* NEXT PROJECT FOOTER LINK (single-property wraps to itself) */}
      <section className="relative w-full overflow-hidden" aria-label="Begin" style={{ aspectRatio: '16 / 9', minHeight: '60vh' }}>
        <img
          src={next.heroImageLandscape}
          alt={`Expaan, Expaan, Miami`}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(41,58,74,0.45) 0%, rgba(41,58,74,0.80) 100%)' }} />
        <Link to="/inquire" className="absolute inset-0 flex items-end p-[var(--container-pad)] group">
          <div className="flex w-full items-end justify-between">
            <div>
              <span className="text-micro text-bone/70 block mb-4">Begin the conversation</span>
              <h2 className="font-display text-display text-bone leading-[1.05] group-hover:translate-x-3 transition-transform duration-500">
                Inquire
              </h2>
              <span className="text-micro text-bone/70 block mt-3">335 NW 28th Street, Miami, FL</span>
            </div>
            <span className="text-display text-bone">→</span>
          </div>
        </Link>
      </section>
    </>
  )
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-micro text-bronze uppercase mb-2">{label}</div>
      <div className="text-body text-ink">{value}</div>
    </div>
  )
}

function StickyInquire({ projectSlug }: { projectSlug: string }) {
  const setInquiryOpen = useUI((s) => s.setInquiryOpen)
  return (
    <button
      type="button"
      onClick={() => setInquiryOpen(true)}
      data-project-slug={projectSlug}
      className="relative inline-flex h-[var(--button-h)] items-center justify-center rounded-[var(--radius-pill)] px-8 text-label text-bone bg-gold hover:bg-canvas-soft hover:text-ink transition-colors duration-300"
    >
      Inquire
    </button>
  )
}
