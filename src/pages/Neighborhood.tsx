import { Helmet } from 'react-helmet-async'
import RevealText from '../components/motion/RevealText'
import SectionLabel from '../components/ui/SectionLabel'
import ChapterDivider from '../components/motion/ChapterDivider'
import Button from '../components/ui/Button'
import Marquee from '../components/ui/Marquee'
import { landscape } from '../lib/image'

const DISTRICTS = [
  {
    label: 'Midtown West',
    city: 'New York',
    body: `Central Park to the north, the cultural corridor to the south, and Times Square to the west. The Meridian sits on the seam between the city's two great public spaces.`,
    image: landscape('district-midtown', 1920, 1080),
  },
  {
    label: 'Tribeca',
    city: 'New York',
    body: `Cast-iron blocks and the Hudson to the west. Ashford House occupies one of the few remaining 1908 warehouses on a quiet block.`,
    image: landscape('district-tribeca', 1920, 1080),
  },
  {
    label: 'Brickell',
    city: 'Miami',
    body: `A narrow avenue between the bay and the financial district. Marlowe is set back from Brickell Avenue, with a private motor court and direct access to the bay.`,
    image: landscape('district-brickell', 1920, 1080),
  },
  {
    label: 'Coconut Grove',
    city: 'Miami',
    body: `Miami's oldest neighbourhood, on the bay. Verdant sits among canopy trees and 1920s estates, two blocks from Peacock Park.`,
    image: landscape('district-grove', 1920, 1080),
  },
  {
    label: 'Pacific Palisades',
    city: 'Los Angeles',
    body: `A coastal neighbourhood west of Santa Monica. Pacific Hollow faces the ocean with a 12-mile view along the coast.`,
    image: landscape('district-palisades', 1920, 1080),
  },
  {
    label: 'Silver Lake',
    city: 'Los Angeles',
    body: `East of Hollywood, around the reservoir. Fairbanks occupies a 1962 concrete-frame office building, two blocks from the Silver Lake Reservoir loop.`,
    image: landscape('district-silverlake', 1920, 1080),
  },
]

const POI = [
  { name: 'Central Park', distance: '0.2 mi', category: 'Park' },
  { name: 'Carnegie Hall', distance: '0.4 mi', category: 'Concert hall' },
  { name: 'MoMA', distance: '0.5 mi', category: 'Museum' },
  { name: 'Hudson River Park', distance: '0.3 mi', category: 'Park' },
  { name: 'Pérez Art Museum', distance: '0.8 mi', category: 'Museum' },
  { name: 'Brookfield Place', distance: '0.4 mi', category: 'Retail' },
  { name: 'Silver Lake Reservoir', distance: '0.2 mi', category: 'Park' },
  { name: 'Will Rogers Beach', distance: '0.7 mi', category: 'Beach' },
]

/**
 * Neighborhood — cinematic full-bleed opener, map/skyline interlude,
 * POI distance table, city districts as chapters.
 */
export default function Neighborhood() {
  return (
    <>
      <Helmet>
        <title>The Meridian — Neighbourhood</title>
        <meta name="description" content="Six neighbourhoods across three American cities. The Meridian is positioned at the centre of each — close to parks, cultural institutions, and the water." />
        <link rel="canonical" href="https://meridian.example.com/neighborhood" />
      </Helmet>

      {/* OPENING */}
      <section className="relative w-full overflow-hidden" style={{ minHeight: '90vh', aspectRatio: '16 / 9' }}>
        <img
          src={landscape('neighborhood-hero', 1920, 1080)}
          alt="Aerial of Midtown Manhattan at dusk"
          // @ts-ignore
          fetchpriority="high"
          className="absolute inset-0 h-full w-full object-cover img-treat"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(26,25,24,0.3) 0%, rgba(26,25,24,0.65) 100%)' }} />
        <div className="site-max site-grid relative z-10 h-full items-end pb-[calc(var(--container-pad)*3)]">
          <div className="col-span-12 flex flex-col gap-6">
            <SectionLabel className="text-bone/80">Neighbourhood</SectionLabel>
            <RevealText
              as="h1"
              className="font-display text-display-xl text-bone leading-[1.02]"
              text={'Addressed to\nthe city it\nbelongs to.'}
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
            text={'Six towers across\nthree American cities.\nEach one close to the water,\nthe park, or the cultural corridor.'}
          />
        </div>
        <div className="col-span-12 md:col-span-3 md:col-start-10 mt-12 md:mt-0 flex flex-col justify-end">
          <p className="text-body text-bronze">
            Distances are measured by foot, not by car. We build where the
            city works.
          </p>
        </div>
      </section>

      {/* POI TABLE */}
      <section className="site-max site-grid section-pad" aria-label="Points of interest">
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

      {/* MARQUEE */}
      <section className="site-max section-pad-tight" aria-label="Districts marquee">
        <Marquee items={DISTRICTS.map((d) => `${d.label} · ${d.city}`)} />
      </section>

      {/* DISTRICT CHAPTERS */}
      {DISTRICTS.map((d, i) => (
        <div key={d.label}>
          <ChapterDivider index={`0${i + 1}`} label={d.label} />
          <section className="site-max site-grid section-pad" aria-label={`${d.label} chapter`}>
            <div className="col-span-12 mb-10">
              <SectionLabel>{d.city}</SectionLabel>
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
                  alt={`${d.label}, ${d.city}`}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover img-treat"
                />
              </div>
            </div>
            <div className="col-span-12 md:col-span-4 md:col-start-9 mt-12 md:mt-0 flex flex-col justify-center gap-6">
              <p className="text-body-l text-bronze font-light">{d.body}</p>
              <Button variant="ghost" to="/projects">View residences</Button>
            </div>
          </section>
        </div>
      ))}
    </>
  )
}
