import RevealText from '../components/motion/RevealText'
import SectionLabel from '../components/ui/SectionLabel'
import ChapterDivider from '../components/motion/ChapterDivider'
import Button from '../components/ui/Button'
import ParallaxImage from '../components/motion/ParallaxImage'
import { portrait } from '../lib/image'

interface Chapter {
  label: string
  headline: string
  body: string
  image: string
  seed: string
  alt: string
  cta: string
  dark?: boolean
  soft?: boolean
}

const CHAPTERS: Chapter[] = [
  {
    label: 'Arrival',
    headline: 'A landscaped paseo.',
    body: `A planted arrival sequence into a hospitality-driven lobby with digital access control.`,
    image: portrait('amen-1', 900, 1200),
    seed: 'amen-1',
    alt: 'Landscaped paseo arrival and gallery lobby',
    cta: 'Speak with the gallery',
  },
  {
    label: 'Lobby',
    headline: 'A gallery lounge with a coffee bar.',
    body: `A coffee bar and lounge, curated by AvroKO. The social heart of the building.`,
    image: portrait('amen-2', 900, 1200),
    seed: 'amen-2',
    alt: 'Gallery lobby lounge and coffee bar',
    cta: 'Tour the lobby',
    soft: true,
  },
  {
    label: 'The Grotto',
    headline: 'A private wellness club.',
    body: `Mineral pool, cold plunge, steam, and sauna. The signature amenity.`,
    image: portrait('amen-3', 900, 1200),
    seed: 'amen-3',
    alt: 'The Grotto — mineral pool, cold plunge, steam, sauna',
    cta: 'Tour the grotto',
    dark: true,
  },
  {
    label: 'Work',
    headline: 'A gallery for work.',
    body: `Private Zoom rooms and a conference room. Work without leaving the building.`,
    image: portrait('amen-4', 900, 1200),
    seed: 'amen-4',
    alt: 'Meeting gallery and private Zoom rooms',
    cta: 'See the work spaces',
  },
  {
    label: 'Fitness',
    headline: 'A windowed fitness center.',
    body: `Cardio and strength equipment. Natural light and Expann Reality views.`,
    image: portrait('amen-5', 900, 1200),
    seed: 'amen-5',
    alt: 'Windowed fitness center with cardio and strength equipment',
    cta: 'Tour the fitness center',
    soft: true,
  },
  {
    label: 'Rooftop',
    headline: 'A rooftop amenities terrace.',
    body: `Planted surfaces, lounge seating, Miami skyline views. Bookable for events.`,
    image: portrait('amen-6', 900, 1200),
    seed: 'amen-6',
    alt: 'Rooftop amenities terrace with planted surfaces',
    cta: 'See the rooftop',
  },
]

/**
 * Amenities — chapter per amenity, alternating image/text, one dark interlude (The Grotto).
 */
export default function Amenities() {
  return (
    <>
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
