import RevealText from '../components/motion/RevealText'
import ParallaxImage from '../components/motion/ParallaxImage'
import SectionLabel from '../components/ui/SectionLabel'
import Button from '../components/ui/Button'
import Marquee from '../components/ui/Marquee'
import CounterStat from '../components/motion/CounterStat'
import ChapterDivider from '../components/motion/ChapterDivider'
import ProjectFinder from '../components/project/ProjectFinder'
import ProjectCard from '../components/project/ProjectCard'
import { projects } from '../data/projects'
import { portrait, landscape } from '../lib/image'

/**
 * Home — Expann Reality cinematic narrative.
 * Single-property microsite, structured after the original 11-section arc.
 * Demo mode: all slow expo-out motion stripped; sections render statically.
 */
export default function Home() {
  const expann = projects[0]

  return (
    <>
{/* 1. HERO */}
      <section
        className="relative h-screen w-full overflow-hidden bg-night"
        aria-label="Expann Reality — hero"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={expann.heroImage}
          aria-hidden
          data-hero-image
          className="absolute inset-0 h-full w-full object-cover will-change-transform"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        <div
          className="absolute inset-0"
          data-hero-tint
          style={{ background: 'linear-gradient(180deg, rgba(41,58,74,0.85) 0%, rgba(41,58,74,0.55) 60%, rgba(41,58,74,0.30) 100%)' }}
        />
        <div className="site-max site-grid relative z-10 h-full items-end pb-[calc(var(--container-pad)*2)]">
          <div className="col-span-12 flex h-full flex-col justify-end gap-12">
            <div className="flex items-end justify-end">
              <button
                type="button"
                className="flex items-center gap-3 text-micro text-bone hover:text-canvas transition-colors duration-300"
                aria-label="Watch the film"
              >
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-bone/50">▶</span>
                Watch the film
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THESIS */}
      <section className="site-max site-grid section-pad" aria-label="Thesis">
        <div className="col-span-12 md:col-span-8">
          <SectionLabel>Expann Reality</SectionLabel>
          <RevealText
            as="p"
            className="mt-10 font-display text-display text-ink leading-[1.05]"
            text={'Forty-nine furnished\nresidences in the\nheart of Expann Reality.'}
            stagger={0.09}
          />
        </div>
        <div className="col-span-12 md:col-span-4 md:col-start-9 mt-12 md:mt-16">
          <p className="text-body-l text-bronze font-light">
            Designed by MKDA. Interiors by AvroKO.
            Studio, one-, and two-bedroom residences from 400 sq ft.
          </p>
        </div>
      </section>

      <ChapterDivider index="I" label="Press" />

      {/* 3. PRESS PULL-QUOTE */}
      <section className="site-max site-grid section-pad bg-canvas-soft" aria-label="Press">
        <div className="col-span-12 md:col-span-10 md:col-start-2">
          <hr className="hairline mb-10" />
          <blockquote className="font-display text-quote text-ink leading-tight">
            <RevealText
              text={'“A boutique condo built around residential living —\nExpann brings residential-grade design\nand a private wellness club to one of\nMiami’s most walkable neighbourhoods.”'}
            />
          </blockquote>
          <div className="mt-10 text-label text-bronze uppercase tracking-[0.12em]">
            Florida YIMBY, April 2026
          </div>
        </div>
      </section>

      <ChapterDivider index="II" label="Residences" />

      {/* 4. RESIDENCES — asymmetric ParallaxImage spread */}
      <section className="site-max site-grid section-pad" aria-label="Residences">
        <div className="col-span-12 mb-10">
          <SectionLabel>Residences</SectionLabel>
        </div>
        <div className="col-span-12 md:col-span-5">
          <ParallaxImage
            src={portrait('expann-studio', 900, 1200)}
            alt="Studio residence, 478 sq ft"
            seed="expann-3"
            speed={0.9}
            ratio="3 / 4"
          />
        </div>
        <div className="col-span-12 md:col-span-3 md:col-start-7 flex flex-col justify-center">
          <RevealText
            as="h2"
            className="font-display text-display-s text-ink leading-tight"
            text={'Furnished\nresidences.'}
          />
          <p className="mt-6 text-body text-bronze">
            Studio, one-, and two-bedroom.
            9-foot ceilings throughout.
          </p>
          <div className="mt-8">
            <Button variant="ghost" to="/projects/expann">See the residences</Button>
          </div>
        </div>
        <div className="col-span-12 md:col-span-4 md:col-start-10 mt-12 md:mt-0 md:translate-y-24">
          <ParallaxImage
            src={portrait('expann-2br', 900, 1200)}
            alt="Two-bedroom residence, 844 sq ft"
            seed="expann-5"
            speed={1.1}
            ratio="3 / 4"
          />
        </div>
      </section>

      {/* 5. DESIGN — full-bleed 16:9 */}
      <section
        className="relative w-full overflow-hidden bg-night"
        aria-label="Design"
        style={{ aspectRatio: '16 / 9', minHeight: '70vh' }}
      >
        <img
          src={landscape('expann-wide', 1920, 1080)}
          alt="Expann Reality design — full-bleed interlude"
          loading="lazy"
          data-design-image
          className="absolute inset-0 h-full w-full object-cover will-change-transform"
        />
        <div className="absolute inset-0 flex items-end" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(41,58,74,0.70) 100%)' }}>
          <div className="site-max site-grid w-full pb-[var(--container-pad)]">
            <div className="col-span-12 flex items-end justify-between">
              <SectionLabel className="text-bone/80">Design</SectionLabel>
              <RevealText
                as="h2"
                className="font-display text-display-s text-bone leading-tight text-right"
                text={'MKDA + AvroKO.'}
              />
            </div>
          </div>
        </div>
      </section>

      <ChapterDivider index="III" label="Featured" className="bg-canvas-soft" />

      {/* 6. FEATURED PROJECT */}
      <section className="site-max site-grid section-pad bg-canvas-soft" aria-label="Featured project">
        <div className="col-span-12 mb-10">
          <SectionLabel>Featured</SectionLabel>
        </div>
        <div className="col-span-12 md:col-span-7">
          <ProjectCard project={expann} index={0} />
        </div>
        <div className="col-span-12 md:col-span-4 md:col-start-9 mt-12 md:mt-32 flex flex-col gap-8">
          <h2 className="font-display text-display text-ink leading-tight">
            One property. Forty-nine residences.
          </h2>
          <p className="text-body-l text-bronze">
            Pre-construction. From $495,000.
            Possession Q1 2027.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button variant="gold" to="/projects/expann">Discover the residences</Button>
            <Button variant="ghost" to="/projects/expann">View availability</Button>
          </div>
        </div>
      </section>

      <ChapterDivider index="IV" label="Find your home" className="bg-canvas-soft" />

      {/* 7. PROJECTFINDER (navy form panel on seafoam wash) */}
      <section className="bg-canvas-soft section-pad" aria-label="Project finder">
        <div className="site-max">
          <div className="mb-10">
            <SectionLabel>Find your home</SectionLabel>
          </div>
          <ProjectFinder />
        </div>
      </section>

      <ChapterDivider index="V" label="Amenities" />

      {/* 8. AMENITIES TRIPTYCH */}
      <section className="site-max site-grid section-pad" aria-label="Amenities triptych">
        <div className="col-span-12 mb-16">
          <SectionLabel>Amenities</SectionLabel>
        </div>
        {AMENITY_CHAPTERS.map((ch, i) => (
          <div key={ch.label} className={`col-span-12 grid grid-cols-12 gap-6 ${i > 0 ? 'mt-32' : ''}`}>
            <div className={`col-span-12 md:col-span-5 ${i % 2 ? 'md:col-start-8 md:order-2' : 'md:order-1'}`}>
              <ParallaxImage
                src={ch.image}
                alt={ch.alt}
                seed={ch.seed}
                speed={1}
                ratio="3 / 4"
              />
            </div>
            <div className={`col-span-12 md:col-span-5 ${i % 2 ? 'md:col-start-2 md:order-1' : 'md:col-start-8 md:order-2'} flex flex-col justify-center gap-6`}>
              <SectionLabel>{ch.label}</SectionLabel>
              <h3 className="font-display text-display-s text-ink leading-tight">{ch.headline}</h3>
              <p className="text-body text-bronze max-w-md">{ch.body}</p>
              <Button variant="ghost" to="/amenities">{ch.cta}</Button>
            </div>
          </div>
        ))}
      </section>

      <ChapterDivider index="VI" label="Numbers" className="bg-canvas-soft" />

      {/* 9. STATS BAR */}
      <section className="site-max site-grid section-pad bg-canvas-soft" aria-label="Stats">
        <div className="col-span-12 mb-12">
          <SectionLabel>By the numbers</SectionLabel>
        </div>
        <div className="col-span-12 grid grid-cols-2 md:grid-cols-4 divide-x divide-line border-y border-line">
          <div className="px-6 py-12">
            <CounterStat value={8} label="Storeys" />
          </div>
          <div className="px-6 py-12">
            <CounterStat value={49} label="Residences" />
          </div>
          <div className="px-6 py-12">
            <CounterStat value={3} label="Configurations" />
          </div>
          <div className="px-6 py-12">
            <CounterStat value={94} suffix="" label="Walk score" />
          </div>
        </div>
      </section>

      <ChapterDivider index="VII" label="Neighbourhood" />

      {/* 10. NEIGHBORHOOD TEASER + MARQUEE */}
      <section className="site-max site-grid section-pad" aria-label="Neighbourhood teaser">
        <div className="col-span-12 mb-8">
          <SectionLabel>Neighbourhood</SectionLabel>
        </div>
        <div className="col-span-12 md:col-span-10">
          <RevealText
            as="h2"
            className="font-display text-display text-ink leading-tight"
            text={'In the heart\nof Expann Reality.'}
          />
        </div>
        <div className="col-span-12 mt-16">
          <Marquee items={['Expann Reality Walls', 'Design District', 'Midtown Miami', 'Brickell', 'Miami Beach', 'Brightline MiamiCentral', 'Expann Reality 2nd Ave', 'Miami International']} />
        </div>
      </section>

      {/* 11. FINAL CTA */}
      <section className="relative w-full overflow-hidden" aria-label="Begin" style={{ aspectRatio: '16 / 9', minHeight: '70vh' }}>
        <img
          src={landscape('expann-wide', 1920, 1080)}
          alt="Expann Reality at dusk"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center" style={{ background: 'linear-gradient(180deg, rgba(41,58,74,0.50) 0%, rgba(41,58,74,0.75) 100%)' }}>
          <div className="site-max site-grid w-full">
            <div className="col-span-12 flex flex-col items-start gap-10">
              <RevealText
                as="h2"
                className="font-display text-display text-bone leading-[1.05]"
                text={'Begin the\nconversation.'}
              />
              <Button variant="gold" to="/inquire" size="lg">Begin</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

const AMENITY_CHAPTERS = [
  {
    label: 'Arrival',
    headline: 'A landscaped paseo.',
    body: 'A planted arrival sequence from NW 28th Street.',
    cta: 'See the residences',
    image: portrait('expann-1', 900, 1200),
    seed: 'expann-1',
    alt: 'Landscaped paseo arrival',
  },
  {
    label: 'The Grotto',
    headline: 'A private wellness club.',
    body: 'Mineral pool, cold plunge, steam, and sauna.',
    cta: 'Tour the grotto',
    image: portrait('expann-6', 900, 1200),
    seed: 'expann-6',
    alt: 'The Grotto wellness club',
  },
  {
    label: 'Work',
    headline: 'A gallery for work.',
    body: 'Private Zoom rooms, conference room, building-wide Wi-Fi.',
    cta: 'See the amenities',
    image: portrait('expann-2', 900, 1200),
    seed: 'expann-2',
    alt: 'Gallery lobby and meeting gallery',
  },
]
