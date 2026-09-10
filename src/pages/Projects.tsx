import { Helmet } from 'react-helmet-async'
import RevealText from '../components/motion/RevealText'
import SectionLabel from '../components/ui/SectionLabel'
import Button from '../components/ui/Button'
import { projects } from '../data/projects'
import { portrait } from '../lib/image'

/**
 * Residences — DUOS Wynwood configuration overview.
 *
 * Single-property site: this page shows the 3 unit types (Studio / 1-BR /
 * 2-BR) as cards that link to the detail page with a config query param.
 */
const CONFIGS = [
  {
    label: 'Studio',
    area: '478 sq ft',
    priceFrom: '$495,000',
    image: portrait('duos-studio', 900, 1200),
    seed: 'duos-studio',
    blurb: 'A fully furnished studio with 9-foot ceilings, kitchenette, and a single live-work zone. Operated as a short-term-rental residence.',
  },
  {
    label: 'One-bedroom',
    area: '612 sq ft',
    priceFrom: '$565,000',
    image: portrait('duos-1br', 900, 1200),
    seed: 'duos-1br',
    blurb: 'A one-bedroom residence with a separate sleeping room, full kitchen, and a 9-foot ceiling throughout. Furnished for short-term rental.',
  },
  {
    label: 'Two-bedroom',
    area: '844 sq ft',
    priceFrom: '$795,000',
    image: portrait('duos-2br', 900, 1200),
    seed: 'duos-2br',
    blurb: 'A two-bedroom residence with two private sleeping rooms, full kitchen, and a corner exposure over Wynwood. The largest configuration.',
  },
]

export default function Projects() {
  const duos = projects[0]

  return (
    <>
      <Helmet>
        <title>DUOS Wynwood — Residences: Studio, One-bedroom, Two-bedroom</title>
        <meta name="description" content="Three configurations at DUOS Wynwood — studio (478 sq ft), one-bedroom (612 sq ft), and two-bedroom (844 sq ft). Fully furnished, 9-foot ceilings, from $495,000. Pre-construction." />
        <link rel="canonical" href="https://duoswynwood.com/projects" />
      </Helmet>

      <section className="site-max site-grid pt-32 section-pad">
        <div className="col-span-12 mb-12">
          <SectionLabel>Residences</SectionLabel>
        </div>
        <div className="col-span-12 md:col-span-10">
          <RevealText
            as="h1"
            className="font-display text-display-xl text-ink leading-[1.02]"
            text={'Three configurations.\nForty-nine residences.'}
          />
        </div>
        <div className="col-span-12 md:col-span-4 md:col-start-9 mt-12 md:mt-0 flex flex-col justify-end gap-6">
          <p className="text-body text-bronze">
            Studio, one-bedroom, and two-bedroom — 478 to 844 square feet, fully
            furnished, 9-foot ceilings. Operated as a hotel-condominium for
            short-term rental. Pre-construction, from $495,000.
          </p>
          <Button variant="ghost" to={`/projects/${duos.slug}`}>View floor plans & availability</Button>
        </div>
      </section>

      <section className="bg-canvas-soft">
        <div className="site-max section-pad">
          <div className="mt-6 grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-3">
            {CONFIGS.map((c, i) => (
              <div
                key={c.label}
                className="opacity-0 translate-y-8"
                style={{ animation: `fadeUp 1s var(--ease-primary) ${i * 0.08}s forwards` }}
              >
                <a
                  href={`/projects/${duos.slug}?config=${encodeURIComponent(c.label)}`}
                  className="group block"
                  data-cursor="view"
                  aria-label={`${c.label} residence — ${c.area}, from ${c.priceFrom}`}
                >
                  <div className="relative overflow-hidden bg-canvas-deep" style={{ aspectRatio: '3 / 4' }}>
                    <img
                      src={c.image}
                      alt={`${c.label} residence, ${c.area}`}
                      loading="lazy"
                      sizes="(min-width: 900px) 720px, 100vw"
                      className="absolute inset-0 h-full w-full object-cover img-treat transition-transform duration-[800ms] ease-out group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-6 flex flex-col gap-1 transition-transform duration-500 ease-out group-hover:-translate-y-2">
                    <span className="text-micro text-bronze tnum mb-1">{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="font-display text-display-s text-ink leading-tight">{c.label}</h3>
                    <p className="text-body text-bronze">{c.area}</p>
                    <p className="text-label text-bronze-deep mt-2">{c.priceFrom}</p>
                    <p className="text-body text-bronze mt-4 max-w-sm">{c.blurb}</p>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
