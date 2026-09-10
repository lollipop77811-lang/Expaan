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
  { name: 'Hugo Lindqvist', role: 'Founder & Creative Director', seed: 'leader-1', image: portrait('leader-1', 900, 1200) },
  { name: 'Marisol Reyes', role: 'Principal Architect', seed: 'leader-2', image: portrait('leader-2', 900, 1200) },
  { name: 'Daichi Mori', role: 'Head of Interiors', seed: 'leader-3', image: portrait('leader-3', 900, 1200) },
  { name: 'Ada Whitfield', role: 'Director of Sales', seed: 'leader-4', image: portrait('leader-4', 900, 1200) },
]

const AWARDS = [
  { year: '2025', title: 'Architectural Record, Record Houses', body: 'The Meridian, New York' },
  { year: '2024', title: 'Urban Land Institute, Award for Excellence', body: 'Marlowe, Miami' },
  { year: '2024', title: 'AIA NY Chapter, Honor Award', body: 'Ashford House restoration' },
  { year: '2023', title: 'Wallpaper Design Awards, Best New Tower', body: 'The Meridian concept' },
  { year: '2022', title: 'MIPIM, Best Residential Development', body: 'Verdant, Coconut Grove' },
  { year: '2021', title: 'AD100, Studio inclusion', body: 'Hugo Lindqvist Studio' },
]

const TIMELINE = [
  { year: '1998', body: 'Hugo Lindqvist opens a small studio in Stockholm, focused on residential restoration.' },
  { year: '2007', body: 'First commission in New York — the renovation of a 1928 Beaux-Arts townhouse on the Upper East Side.' },
  { year: '2014', body: 'The studio incorporates as The Meridian, with offices in New York and Miami.' },
  { year: '2018', body: 'First ground-up tower announced: The Meridian at 111 West 57th Street.' },
  { year: '2026', body: 'Six residences across three American cities under the Meridian name.' },
]

/**
 * Story — the founder narrative and trust layer.
 */
export default function Story() {
  return (
    <>
      <Helmet>
        <title>The Meridian — Story</title>
        <meta name="description" content="A measured response to the cities we admire — built once, for a small number of owners. The Meridian story, leadership, and honours." />
        <link rel="canonical" href="https://meridian.example.com/story" />
      </Helmet>

      {/* HERO */}
      <section className="site-max site-grid section-pad pt-32">
        <div className="col-span-12 mb-12">
          <SectionLabel>Story</SectionLabel>
        </div>
        <div className="col-span-12 md:col-span-10">
          <RevealText
            as="h1"
            className="font-display text-display-xl text-ink leading-[1.02]"
            text={'A measured\nresponse to\ncities we admire.'}
          />
        </div>
      </section>

      <ChapterDivider index="I" label="Founder" />

      {/* FOUNDER */}
      <section className="site-max site-grid section-pad" aria-label="Founder narrative">
        <div className="col-span-12 md:col-span-5">
          <ParallaxImage
            src={portrait('founder', 900, 1200)}
            alt="Hugo Lindqvist, founder"
            seed="founder"
            speed={0.9}
          />
        </div>
        <div className="col-span-12 md:col-span-5 md:col-start-8 flex flex-col justify-center gap-6">
          <p className="text-body-l text-bronze font-light">
            Hugo Lindqvist began as a restorer of older buildings — townhouses,
            warehouses, the patient kind of architecture that asks the same
            questions decade after decade.
          </p>
          <p className="text-body text-bronze">
            The Meridian carries that patience forward. Each residence is drawn
            once, built once, and addressed to a small number of owners. There
            are six, today, across three American cities.
          </p>
          <p className="text-body text-bronze">
            “We design for the people who will live in these buildings in
            fifty years,” says Hugo. “Not for the press release in three
            months.”
          </p>
        </div>
      </section>

      <ChapterDivider index="II" label="Philosophy" />

      {/* PHILOSOPHY */}
      <section className="site-max site-grid section-pad" aria-label="Philosophy">
        <div className="col-span-12 md:col-span-10 md:col-start-2">
          <RevealText
            as="p"
            className="font-display text-display text-ink leading-[1.1]"
            text={'We believe in full-floor residences,\nprivate elevator entry, three exposures,\nand ceilings that clear eleven feet.\nWe believe in materials drawn from\nthe city they sit in. We believe in\nfinishes that age well, not finishes\nthat photograph well.'}
            stagger={0.09}
          />
        </div>
      </section>

      <ChapterDivider index="III" label="Leadership" />

      {/* LEADERSHIP */}
      <section className="site-max site-grid section-pad" aria-label="Leadership">
        <div className="col-span-12 mb-12">
          <SectionLabel>Leadership</SectionLabel>
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

      <ChapterDivider index="IV" label="Honours" />

      {/* AWARDS */}
      <section className="site-max site-grid section-pad" aria-label="Awards & honours">
        <div className="col-span-12 mb-12">
          <SectionLabel>Awards & honours</SectionLabel>
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
