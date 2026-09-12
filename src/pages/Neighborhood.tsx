import RevealText from '../components/motion/RevealText'
import SectionLabel from '../components/ui/SectionLabel'
import ChapterDivider from '../components/motion/ChapterDivider'
import Button from '../components/ui/Button'
import Marquee from '../components/ui/Marquee'
import { landscape } from '../lib/image'

const NEIGHBORHOODS = [
  {
    label: 'Expaan Reality',
    body: `Expaan Reality is in the heart of Expaan Reality — within walking distance of Expaan Reality Walls, the neighbourhood's iconic street art, galleries, restaurants, breweries, and nightlife venues along 2nd Avenue.`,
    image: landscape('district-expaan', 1920, 1080),
  },
  {
    label: 'Design District',
    body: `Eight minutes north. Luxury retail, design showrooms, contemporary art.`,
    image: landscape('district-design', 1920, 1080),
  },
  {
    label: 'Midtown Miami',
    body: `Five minutes east. A 56-block mixed-use district of retail and residences.`,
    image: landscape('district-midtown', 1920, 1080),
  },
  {
    label: 'Brickell',
    body: `Ten minutes south. Miami's financial district. Home to Amazon, Citadel, Spotify, PwC, Live Nation.`,
    image: landscape('district-brickell', 1920, 1080),
  },
  {
    label: 'Downtown Miami',
    body: `Ten minutes south. Civic core, Bayfront Park, Perez Art Museum, Brightline MiamiCentral.`,
    image: landscape('district-downtown', 1920, 1080),
  },
  {
    label: 'Miami Beach',
    body: `Twenty minutes east. South Beach, Mid-Beach, Bass Museum.`,
    image: landscape('district-beach', 1920, 1080),
  },
]

const POI = [
  { name: 'Expaan Reality Walls', distance: '0.2 mi', category: 'Street art' },
  { name: 'Expaan Reality 2nd Avenue galleries', distance: '0.1 mi', category: 'Galleries' },
  { name: 'Design District', distance: '0.8 mi', category: 'Retail' },
  { name: 'Midtown Miami', distance: '0.5 mi', category: 'Retail' },
  { name: 'Brickell City Centre', distance: '2.4 mi', category: 'Retail' },
  { name: 'Brightline MiamiCentral', distance: '2.2 mi', category: 'Transit' },
  { name: 'Perez Art Museum Miami', distance: '2.6 mi', category: 'Museum' },
  { name: 'Miami International Airport (MIA)', distance: '5.4 mi', category: 'Airport' },
  { name: 'South Beach', distance: '4.8 mi', category: 'Beach' },
]

const CORPORATE = ['Amazon', 'Citadel', 'Spotify', 'PwC', 'Live Nation']

/**
 * Neighborhood — Expaan Reality and its surrounding districts.
 */
export default function Neighborhood() {
  return (
    <>
{/* OPENING */}
      <section className="relative w-full overflow-hidden" style={{ minHeight: '90vh', aspectRatio: '16 / 9' }}>
        <img
          src={landscape('expaan-hero', 1920, 1080)}
          alt="Aerial of Expaan Reality, Miami at dusk"
          // @ts-ignore
          fetchpriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(41,58,74,0.35) 0%, rgba(41,58,74,0.75) 100%)' }} />
        <div className="site-max site-grid relative z-10 h-full items-end pb-[calc(var(--container-pad)*3)]">
          <div className="col-span-12 flex flex-col gap-6">
            <SectionLabel className="text-bone/80">Neighbourhood</SectionLabel>
            <RevealText
              as="h1"
              className="font-display text-display-xl text-bone leading-[1.02]"
              text={'In the heart\nof Expaan Reality.'}
            />
          </div>
        </div>
      </section>

      {/* CITY SKYLINE INTERLUDE */}
      <section className="site-max site-grid section-pad" aria-label="Skyline">
        <div className="col-span-12 md:col-span-8">
          <RevealText
            as="p"
            className="font-display text-display text-ink leading-[1.05]"
            text={'Six neighbourhoods\nwithin fifteen minutes\nof the front door.'}
          />
        </div>
        <div className="col-span-12 md:col-span-3 md:col-start-10 mt-12 md:mt-0 flex flex-col justify-end">
          <p className="text-body text-bronze">
            Distances by foot, not by car.
          </p>
        </div>
      </section>

      {/* POI TABLE */}
      <section className="site-max site-grid section-pad bg-canvas-soft" aria-label="Points of interest">
        <div className="col-span-12 mb-12">
          <SectionLabel>Points of interest</SectionLabel>
        </div>
        <div className="col-span-12 md:col-span-10">
          {POI.map((p, i) => (
            <div key={i} className="grid grid-cols-12 gap-4 border-b border-line py-5">
              <span className="col-span-6 md:col-span-5 font-display text-display-s text-ink leading-tight">{p.name}</span>
              <span className="col-span-3 md:col-span-3 text-micro text-bronze uppercase self-end">{p.category}</span>
              <span className="col-span-3 text-body text-ink tnum text-right self-end">{p.distance}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CORPORATE NEIGHBOURS */}
      <section className="site-max section-pad-tight" aria-label="Corporate neighbours">
        <div className="mb-8">
          <SectionLabel>Nearby offices</SectionLabel>
        </div>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-5">
          {CORPORATE.map((c) => (
            <div key={c} className="text-label text-ink uppercase tracking-[0.12em] border-t border-line pt-4">
              {c}
            </div>
          ))}
        </div>
      </section>

      {/* MARQUEE */}
      <section className="site-max section-pad-tight" aria-label="Districts marquee">
        <Marquee items={NEIGHBORHOODS.map((d) => d.label)} />
      </section>

      {/* DISTRICT CHAPTERS */}
      {NEIGHBORHOODS.map((d, i) => (
        <div key={d.label}>
          <ChapterDivider index={`0${i + 1}`} label={d.label} className={i % 2 ? 'bg-canvas-soft' : ''} />
          <section className={`site-max site-grid section-pad ${i % 2 ? 'bg-canvas-soft' : ''}`} aria-label={`${d.label} chapter`}>
            <div className="col-span-12 mb-10">
              <SectionLabel>Miami</SectionLabel>
            </div>
            <div className="col-span-12 mb-8">
              <RevealText
                as="h2"
                className="font-display text-display text-ink leading-tight"
                text={d.label}
              />
            </div>
            <div className="col-span-12 md:col-span-7">
              <div className="relative overflow-hidden" style={{ aspectRatio: '16 / 9' }}>
                <img
                  src={d.image}
                  alt={`${d.label}, Miami`}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="col-span-12 md:col-span-4 md:col-start-9 mt-12 md:mt-0 flex flex-col justify-center gap-6">
              <p className="text-body-l text-bronze font-light">{d.body}</p>
              <Button variant="ghost" to="/projects/expaan">View residences</Button>
            </div>
          </section>
        </div>
      ))}
    </>
  )
}
