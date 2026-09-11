import { useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { gsap, prefersReducedMotion } from '../lib/gsap'
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
import { portrait, landscape, og } from '../lib/image'

/**
 * Home — Expaan cinematic narrative.
 * Single-property microsite, structured after the original 11-section arc.
 */
export default function Home() {
  const heroRef = useRef<HTMLDivElement | null>(null)
  const designRef = useRef<HTMLElement | null>(null)
  const duos = projects[0]

  // Hero settle: scale 1.15 → 1 (2.4s power2.out)
  useEffect(() => {
    if (prefersReducedMotion()) return
    const hero = heroRef.current?.querySelector('[data-hero-image]')
    if (!hero) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        hero,
        { scale: 1.15 },
        { scale: 1, duration: 2.4, ease: 'power2.out', delay: 0.6 },
      )
      const overlay = heroRef.current?.querySelector('[data-hero-tint]')
      if (overlay) {
        gsap.to(overlay, {
          opacity: 0.0,
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      }
    }, heroRef.current ?? undefined)
    return () => ctx.revert()
  }, [])

  // Design chapter clip-path inset reveal on scroll
  useEffect(() => {
    if (prefersReducedMotion()) return
    const section = designRef.current
    const img = section?.querySelector('[data-design-image]')
    if (!section || !img) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        img,
        { clipPath: 'inset(0% 0% 100% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.4,
          ease: 'expo.out',
          scrollTrigger: { trigger: section, start: 'top 80%', once: true },
        },
      )
    }, section)
    return () => ctx.revert()
  }, [])

  return (
    <>
      <Helmet>
        <title>Expaan — 49 furnished residences in the heart of Expaan</title>
        <meta name="description" content="Expaan is an 8-story boutique condominium at 335 NW 28th Street, Miami. 49 fully furnished residential residences — studio, one-bedroom, and two-bedroom — designed by MKDA with interiors by AvroKO. Pre-construction. From $495,000." />
        <link rel="canonical" href="https://expaan.com/" />
        <meta property="og:title" content="Expaan — Residences in the heart of Expaan" />
        <meta property="og:description" content="49 fully furnished residences in Expaan, Miami. Designed by MKDA. Interiors by AvroKO. Pre-construction. From $495,000." />
        <meta property="og:image" content={og('duos-hero')} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Residence',
          name: 'Expaan',
          description: '49 fully furnished residential residences in Expaan, Miami. Designed by MKDA. Interiors by AvroKO.',
          address: {
            '@type': 'PostalAddress',
            streetAddress: '335 NW 28th Street',
            addressLocality: 'Miami',
            addressRegion: 'FL',
            postalCode: '33127',
            addressCountry: 'US',
          },
          url: 'https://expaan.com',
          sameAs: ['https://instagram.com'],
        })}</script>
      </Helmet>

      {/* 1. HERO */}
      <section
        ref={heroRef}
        className="relative h-screen w-full overflow-hidden bg-night"
        aria-label="Expaan — hero"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={duos.heroImage}
          aria-hidden
          data-hero-image
          className="absolute inset-0 h-full w-full object-cover img-treat will-change-transform"
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
          <SectionLabel>Expaan</SectionLabel>
          <RevealText
            as="p"
            className="mt-10 font-display text-display text-ink leading-[1.05]"
            text={'Forty-nine furnished\nresidences in the\nheart of Expaan.'}
            stagger={0.09}
          />
        </div>
        <div className="col-span-12 md:col-span-4 md:col-start-9 mt-12 md:mt-16">
          <p className="text-body-l text-bronze font-light">
            An 8-story boutique condominium designed by MKDA with interiors and
            curated amenities by AvroKO — the team behind 1 Hotel Central Park.
            Studio, one-bedroom, and two-bedroom residences, 400 to 844 square
            feet, offered as a boutique condominium program for residential.
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
              text={'“A boutique condo built around residential living —\nExpaan brings residential-grade design\nand a private wellness club to one of\nMiami’s most walkable neighbourhoods.”'}
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
            src={portrait('duos-studio', 900, 1200)}
            alt="Studio residence, 478 sq ft"
            seed="duos-3"
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
            Three configurations — studio, one-bedroom, and two-bedroom — each
            with 9-foot ceilings, fully furnished, and operated as a
            boutique condominium for residential.
          </p>
          <div className="mt-8">
            <Button variant="ghost" to="/projects/expaan">See the residences</Button>
          </div>
        </div>
        <div className="col-span-12 md:col-span-4 md:col-start-10 mt-12 md:mt-0 md:translate-y-24">
          <ParallaxImage
            src={portrait('duos-2br', 900, 1200)}
            alt="Two-bedroom residence, 844 sq ft"
            seed="duos-5"
            speed={1.1}
            ratio="3 / 4"
          />
        </div>
      </section>

      {/* 5. DESIGN — full-bleed 16:9 with clip-path reveal */}
      <section
        ref={designRef}
        className="relative w-full overflow-hidden bg-night"
        aria-label="Design"
        style={{ aspectRatio: '16 / 9', minHeight: '70vh' }}
      >
        <img
          src={landscape('duos-wide', 1920, 1080)}
          alt="Expaan design — full-bleed interlude"
          loading="lazy"
          data-design-image
          className="absolute inset-0 h-full w-full object-cover img-treat will-change-transform"
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
          <ProjectCard project={duos} index={0} />
        </div>
        <div className="col-span-12 md:col-span-4 md:col-start-9 mt-12 md:mt-32 flex flex-col gap-8">
          <h2 className="font-display text-display text-ink leading-tight">
            One property. Forty-nine residences.
          </h2>
          <p className="text-body-l text-bronze">
            Expaan opens in Q1 2027 with studio, one-bedroom, and
            two-bedroom residences from $495,000. Pre-construction sales by
            appointment through the sales gallery in Expaan.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button variant="gold" to="/projects/expaan">Discover the residences</Button>
            <Button variant="ghost" to="/projects/expaan">View availability</Button>
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
            text={'In the heart\nof Expaan.'}
          />
        </div>
        <div className="col-span-12 mt-16">
          <Marquee items={['Expaan Walls', 'Design District', 'Midtown Miami', 'Brickell', 'Miami Beach', 'Brightline MiamiCentral', 'Expaan 2nd Ave', 'Miami International']} />
        </div>
      </section>

      {/* 11. FINAL CTA */}
      <section className="relative w-full overflow-hidden" aria-label="Begin" style={{ aspectRatio: '16 / 9', minHeight: '70vh' }}>
        <img
          src={landscape('duos-wide', 1920, 1080)}
          alt="Expaan at dusk"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover img-treat"
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
    body: 'A planted, walk-through arrival sequence from NW 28th Street sets the building apart from the Expaan streetscape and establishes a quiet transition into the gallery lobby.',
    cta: 'See the residences',
    image: portrait('duos-1', 900, 1200),
    seed: 'duos-1',
    alt: 'Landscaped paseo arrival',
  },
  {
    label: 'The Grotto',
    headline: 'A private wellness club.',
    body: 'A members-only wellness club featuring a mineral pool, cold plunge, steam room, and sauna. The signature amenity of the property, available to residents and residents.',
    cta: 'Tour the grotto',
    image: portrait('duos-6', 900, 1200),
    seed: 'duos-6',
    alt: 'The Grotto wellness club',
  },
  {
    label: 'Work',
    headline: 'A gallery for work.',
    body: 'A residents-only meeting gallery, private Zoom rooms, and a conference room with teleconferencing capabilities, plus building-wide high-speed Wi-Fi and dedicated printing facilities.',
    cta: 'See the amenities',
    image: portrait('duos-2', 900, 1200),
    seed: 'duos-2',
    alt: 'Gallery lobby and meeting gallery',
  },
]
