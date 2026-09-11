import { Helmet } from 'react-helmet-async'
import RevealText from '../components/motion/RevealText'
import SectionLabel from '../components/ui/SectionLabel'
import ParallaxImage from '../components/motion/ParallaxImage'
import ChapterDivider from '../components/motion/ChapterDivider'
import { portrait } from '../lib/image'

interface Leader {
  name: string
  role: string
  seed: string
  image: string
}

const LEADERSHIP: Leader[] = [
  { name: 'Wave Group Development', role: 'Developer', seed: 'leader-1', image: portrait('leader-1', 900, 1200) },
  { name: 'Vitrium Capital', role: 'Capital partner', seed: 'leader-2', image: portrait('leader-2', 900, 1200) },
  { name: 'Zambala Luxury Apartments', role: 'Operator', seed: 'leader-3', image: portrait('leader-3', 900, 1200) },
  { name: 'MKDA', role: 'Architect', seed: 'leader-4', image: portrait('leader-4', 900, 1200) },
]

const DESIGN_TEAM = [
  { firm: 'MKDA', role: 'Architecture', note: 'Internationally recognized architecture firm leading the building design and floor plans.' },
  { firm: 'AvroKO', role: 'Interiors & curated amenities', note: 'The interior design team behind 1 Hotel Central Park in New York — responsible for the gallery lobby, The Grotto, and resident lounges.' },
]

const AWARDS = [
  { year: '2026', title: 'Pre-construction launch', body: 'Expaan — Miami' },
  { year: '2026', title: 'AvroKO appointed for interiors', body: 'Gallery lobby + The Grotto wellness club' },
  { year: '2026', title: 'MKDA appointed as architect', body: '8-story boutique condominium' },
  { year: '2025', title: 'Site assembled at 335 NW 28th Street', body: 'Expaan, Miami' },
  { year: '2025', title: 'Wave Group + Vitrium + Zambala partnership', body: 'Joint development agreement' },
]

const TIMELINE = [
  { year: '2025', body: 'Wave Group Development, Vitrium Capital, and Zambala Luxury Apartments assemble the site at 335 NW 28th Street in the heart of Expaan.' },
  { year: '2026', body: 'MKDA engaged as architect. AvroKO — the team behind 1 Hotel Central Park — appointed to lead interiors and curated amenities.' },
  { year: '2026', body: 'Pre-construction sales open. Studio, one-bedroom, and two-bedroom residences from $495,000.' },
  { year: '2027', body: 'Expaan opens — 49 fully furnished residential residences, The Grotto wellness club, and a rooftop amenities terrace.' },
]

/**
 * About — the developer team, designers, philosophy, and milestones.
 */
export default function Story() {
  return (
    <>
      <Helmet>
        <title>Expaan — About the developers, architect, and interiors team</title>
        <meta name="description" content="Expaan is developed by Wave Group Development, Vitrium Capital, and Zambala Luxury Apartments. Architecture by MKDA. Interiors and curated amenities by AvroKO, the team behind 1 Hotel Central Park." />
        <link rel="canonical" href="https://expaan.com/story" />
      </Helmet>

      {/* HERO */}
      <section className="site-max site-grid section-pad pt-32">
        <div className="col-span-12 mb-12">
          <SectionLabel>About</SectionLabel>
        </div>
        <div className="col-span-12 md:col-span-10">
          <RevealText
            as="h1"
            className="font-display text-display-xl text-ink leading-[1.02]"
            text={'A measured\nresponse to a\nwalkable city.'}
          />
        </div>
      </section>

      <ChapterDivider index="I" label="Team" />

      {/* DEVELOPER TEAM */}
      <section className="site-max site-grid section-pad" aria-label="Developer team">
        <div className="col-span-12 mb-12">
          <SectionLabel>Developer team</SectionLabel>
        </div>
        <div className="col-span-12 grid grid-cols-1 gap-10 md:grid-cols-4">
          {LEADERSHIP.map((m, i) => (
            <div key={m.seed} className="opacity-0 translate-y-8" style={{ animation: `fadeUp 1s var(--ease-primary) ${i * 0.08}s forwards` }}>
              <ParallaxImage
                src={m.image}
                alt={`${m.name}, ${m.role}`}
                seed={m.seed}
                speed={0.7}
              />
              <div className="mt-5">
                <div className="text-label text-ink uppercase tracking-[0.12em]">{m.name}</div>
                <div className="text-micro text-bronze mt-1">{m.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <ChapterDivider index="II" label="Philosophy" className="bg-canvas-soft" />

      {/* PHILOSOPHY */}
      <section className="site-max site-grid section-pad bg-canvas-soft" aria-label="Philosophy">
        <div className="col-span-12 md:col-span-10 md:col-start-2">
          <RevealText
            as="p"
            className="font-display text-display text-ink leading-[1.1]"
            text={'We believe in 400 to 844 square feet,\ndrawn once and built once.\nWe believe in 9-foot ceilings,\nfurnished residences, and a building\nthat operates as a hotel.\nWe believe in materials drawn from\nthe city they sit in. We believe in\nfinishes that age well, not finishes\nthat photograph well.'}
            stagger={0.09}
          />
        </div>
      </section>

      <ChapterDivider index="III" label="Designers" />

      {/* DESIGN TEAM */}
      <section className="site-max site-grid section-pad" aria-label="Design team">
        <div className="col-span-12 mb-12">
          <SectionLabel>Designers</SectionLabel>
        </div>
        <div className="col-span-12">
          {DESIGN_TEAM.map((d, i) => (
            <div
              key={d.firm}
              className="grid grid-cols-12 gap-4 border-b border-line py-6"
            >
              <span className="col-span-2 text-micro text-bronze tnum">{String(i + 1).padStart(2, '0')}</span>
              <span className="col-span-3 font-display text-display-s text-ink leading-tight">{d.firm}</span>
              <span className="col-span-2 text-body text-bronze uppercase tracking-[0.12em] text-micro self-end">{d.role}</span>
              <span className="col-span-5 text-body text-bronze self-end">{d.note}</span>
            </div>
          ))}
        </div>
      </section>

      <ChapterDivider index="IV" label="Honours" className="bg-canvas-soft" />

      {/* AWARDS / MILESTONES */}
      <section className="site-max site-grid section-pad bg-canvas-soft" aria-label="Awards & honours">
        <div className="col-span-12 mb-12">
          <SectionLabel>Milestones</SectionLabel>
        </div>
        <div className="col-span-12">
          {AWARDS.map((a, i) => (
            <div
              key={i}
              className="grid grid-cols-12 gap-4 border-b border-line py-6"
            >
              <span className="col-span-2 text-micro text-bronze tnum">{a.year}</span>
              <span className="col-span-5 font-display text-display-s text-ink leading-tight">{a.title}</span>
              <span className="col-span-5 text-body text-bronze self-end">{a.body}</span>
            </div>
          ))}
        </div>
      </section>

      <ChapterDivider index="V" label="Timeline" />

      {/* TIMELINE */}
      <section className="site-max site-grid section-pad" aria-label="Timeline">
        <div className="col-span-12 mb-12">
          <SectionLabel>Timeline</SectionLabel>
        </div>
        <div className="col-span-12 md:col-span-10">
          {TIMELINE.map((t, i) => (
            <div key={i} className="grid grid-cols-12 gap-4 border-b border-line py-8">
              <span className="col-span-2 font-display text-display-s text-ink tnum">{t.year}</span>
              <span className="col-span-10 text-body-l text-bronze font-light">{t.body}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
