import { Helmet } from 'react-helmet-async'
import RevealText from '../components/motion/RevealText'
import SectionLabel from '../components/ui/SectionLabel'
import ChapterDivider from '../components/motion/ChapterDivider'
import Button from '../components/ui/Button'
import ParallaxImage from '../components/motion/ParallaxImage'
import { portrait } from '../lib/image'

const CHAPTERS = [
  {
    label: 'Concierge',
    headline: 'Twenty-four-hour, white-glove.',
    body: `A full-service concierge operates around the clock. Parcel room, cold storage for deliveries, and a private doorman for every arrival. Bookings for spa, dining, and travel are made in person, by the front-of-house team.`,
    image: portrait('amen-1', 900, 1200),
    seed: 'amen-1',
    alt: 'Attended lobby and concierge desk',
    cta: 'Speak with the concierge',
  },
  {
    label: 'Wellness',
    headline: 'A private wellness floor.',
    body: `An 82-foot lap pool, paired steam and sauna rooms, two treatment suites, and a private gym. Operated by an in-house wellness director. Bookable through the concierge, six days a week.`,
    image: portrait('amen-2', 900, 1200),
    seed: 'amen-2',
    alt: 'Resident spa, lap pool',
    cta: 'Tour the spa',
    dark: true,
  },
  {
    label: 'Dining',
    headline: 'A 24-seat dining room.',
    body: `A private dining room and chef's kitchen for residents and their guests. Bookable through the concierge, with menus prepared by the in-house chef or a guest of the resident's choosing.`,
    image: portrait('amen-3', 900, 1200),
    seed: 'amen-3',
    alt: `Private dining room and chef's kitchen`,
    cta: 'Reserve the dining room',
    soft: true,
  },
  {
    label: 'Cellar',
    headline: 'A 600-bottle cellar.',
    body: `A climate-controlled wine cellar with private lockers assigned to each residence. Stocked by the in-house sommelier, with quarterly tasting events in the dining room.`,
    image: portrait('amen-4', 900, 1200),
    seed: 'amen-4',
    alt: 'Wine cellar, climate-controlled',
    cta: 'Speak with the sommelier',
  },
  {
    label: 'Outdoor',
    headline: 'A 4,200 sq ft terrace.',
    body: `A planted roof terrace with kitchen, lounge, and Hudson River views. Available for resident bookings, including private events.`,
    image: portrait('amen-5', 900, 1200),
    seed: 'amen-5',
    alt: 'Roof terrace, planted',
    cta: 'Tour the terrace',
    soft: true,
  },
]

/**
 * Amenities — chapter per amenity, alternating image/text, one dark interlude.
 */
export default function Amenities() {
  return (
    <>
      <Helmet>
        <title>The Meridian — Amenities</title>
        <meta name="description" content="Concierge, spa, private dining, wine cellar, and a 4,200 sq ft roof terrace. Each amenity operates as a private club for residents." />
        <link rel="canonical" href="https://meridian.example.com/amenities" />
      </Helmet>

      <section className="site-max site-grid pt-32 section-pad">
        <div className="col-span-12 mb-12">
          <SectionLabel>Amenities</SectionLabel>
        </div>
        <div className="col-span-12 md:col-span-10">
          <RevealText
            as="h1"
            className="font-display text-display-xl text-ink leading-[1.02]"
            text={'A private club\nfor residents.'}
          />
        </div>
      </section>

      {CHAPTERS.map((ch, i) => (
        <section
          key={ch.seed}
          className={ch.dark ? 'bg-night text-bone' : ch.soft ? 'bg-canvas-soft' : ''}
          aria-label={ch.label}
        >
          <div className="site-max site-grid section-pad">
            <div className="col-span-12 mb-12">
              <SectionLabel className={ch.dark ? 'text-bone/80' : ''}>{ch.label}</SectionLabel>
            </div>
            <div className={`col-span-12 grid grid-cols-12 gap-6 ${i % 2 ? '' : ''}`}>
              <div className={`col-span-12 md:col-span-6 ${i % 2 ? 'md:order-2 md:col-start-7' : 'md:order-1'}`}>
                <ParallaxImage
                  src={ch.image}
                  alt={ch.alt}
                  seed={ch.seed}
                  speed={1}
                  ratio="3 / 4"
                />
              </div>
              <div
                className={`col-span-12 md:col-span-5 ${i % 2 ? 'md:order-1 md:col-start-1' : 'md:order-2 md:col-start-8'} flex flex-col justify-center gap-6`}
              >
                <h2 className={`font-display text-display leading-tight ${ch.dark ? 'text-bone' : 'text-ink'}`}>
                  {ch.headline}
                </h2>
                <p className={`text-body-l ${ch.dark ? 'text-bone/70' : 'text-bronze'} max-w-md font-light`}>
                  {ch.body}
                </p>
                <div>
                  <Button variant={ch.dark ? 'gold' : 'ghost'} to="/inquire">
                    {ch.cta}
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {i < CHAPTERS.length - 1 && (
            <div className={`site-max ${ch.soft ? 'bg-canvas-soft' : ''}`}>
              <ChapterDivider index={`0${i + 1}`} label={ch.label} className={ch.soft ? 'bg-canvas-soft' : ''} />
            </div>
          )}
        </section>
      ))}
    </>
  )
}
