import { Helmet } from 'react-helmet-async'
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
    body: `A planted, walk-through arrival sequence from NW 28th Street sets the building apart from the Wynwood streetscape and establishes a quiet transition into the gallery lobby — a hospitality-driven lobby with digital access control.`,
    image: portrait('amen-1', 900, 1200),
    seed: 'amen-1',
    alt: 'Landscaped paseo arrival and gallery lobby',
    cta: 'Speak with the gallery',
  },
  {
    label: 'Lobby',
    headline: 'A gallery lounge with a coffee bar.',
    body: `A gallery lobby lounge with a dedicated coffee bar, curated by AvroKO as the social heart of the building. Residents and guests check in, settle in, and work from the lounge. Building-wide high-speed Wi-Fi and dedicated printing facilities available.`,
    image: portrait('amen-2', 900, 1200),
    seed: 'amen-2',
    alt: 'Gallery lobby lounge and coffee bar',
    cta: 'Tour the lobby',
    soft: true,
  },
  {
    label: 'The Grotto',
    headline: 'A private wellness club.',
    body: `A members-only wellness club featuring a mineral pool, cold plunge, steam room, and sauna. The signature amenity of the property, available to residents and hotel guests — the design move that sets DUOS Wynwood apart from other Wynwood buildings.`,
    image: portrait('amen-3', 900, 1200),
    seed: 'amen-3',
    alt: 'The Grotto — mineral pool, cold plunge, steam, sauna',
    cta: 'Tour the grotto',
    dark: true,
  },
  {
    label: 'Work',
    headline: 'A gallery for work.',
    body: `A residents-only meeting gallery, private Zoom rooms, and a conference room with teleconferencing capabilities. Designed for short-term-stay professionals and remote work — no need to leave the building for a call or a meeting.`,
    image: portrait('amen-4', 900, 1200),
    seed: 'amen-4',
    alt: 'Meeting gallery and private Zoom rooms',
    cta: 'See the work spaces',
  },
  {
    label: 'Fitness',
    headline: 'A windowed fitness center.',
    body: `A natural-light fitness center with cardio and strength-training equipment, operated as a residents-only facility with extended hours. Open to natural light and views across the Wynwood streetscape.`,
    image: portrait('amen-5', 900, 1200),
    seed: 'amen-5',
    alt: 'Windowed fitness center with cardio and strength equipment',
    cta: 'Tour the fitness center',
    soft: true,
  },
  {
    label: 'Rooftop',
    headline: 'A rooftop amenities terrace.',
    body: `A rooftop terrace with planted surfaces, lounge seating, and views across Wynwood and the Miami skyline. Bookable for resident events and operated as an extension of the gallery lobby and The Grotto.`,
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
      <Helmet>
        <title>DUOS Wynwood — Amenities: The Grotto, gallery lobby, fitness, rooftop</title>
        <meta name="description" content="Landscaped paseo arrival, gallery lobby with coffee bar, meeting gallery and Zoom rooms, windowed fitness center, The Grotto wellness club (mineral pool, cold plunge, steam, sauna), and a rooftop amenities terrace." />
        <link rel="canonical" href="https://duoswynwood.com/amenities" />
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
