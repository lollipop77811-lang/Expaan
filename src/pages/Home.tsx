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
 * Home — the cinematic narrative.
 * 11-section arc per PROJECT_BRIEF.md §3 HOME.
 */
export default function Home() {
  const heroRef = useRef<HTMLDivElement | null>(null)
  const designRef = useRef<HTMLElement | null>(null)
  const featured = projects[0]

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
      // Night → canvas tint on scroll
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
        <title>The Meridian — A new landmark rises</title>
        <meta name="description" content="A rarefied collection of full-floor residences across New York, Miami, and Los Angeles. The Meridian — a new landmark rises." />
        <link rel="canonical" href="https://meridian.example.com/" />
        <meta property="og:title" content="The Meridian — A new landmark rises" />
        <meta property="og:description" content="A rarefied collection of full-floor residences across New York, Miami, and Los Angeles." />
        <meta property="og:image" content={og('meridian-hero')} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'The Meridian',
          url: 'https://meridian.example.com',
          logo: 'https://meridian.example.com/favicon.svg',
          sameAs: ['https://instagram.com', 'https://linkedin.com'],
        })}</script>
      </Helmet>

      {/* 1. HERO */}
      <section
        ref={heroRef}
        className="relative h-screen w-full overflow-hidden bg-night"
        aria-label="The Meridian — hero"
      >
        <div
          className="absolute inset-0"
          data-hero-tint
          style={{ background: 'linear-gradient(180deg, rgba(26,25,24,0.7) 0%, rgba(26,25,24,0.4) 60%, rgba(240,238,234,0.2) 100%)' }}
        />
        <img
          src={featured.heroImage}
          alt={`${featured.name}, ${featured.city}`}
          data-hero-image
          // @ts-ignore — fetchpriority is valid HTML
          fetchpriority="high"
          className="absolute inset-0 h-full w-full object-cover img-treat will-change-transform"
        />
        <div className="site-max site-grid relative z-10 h-full items-end pb-[calc(var(--container-pad)*2)]">
          <div className="col-span-12 flex h-full flex-col justify-end gap-12">
            <RevealText
              as="h1"
              className="font-display text-display-xl text-bone leading-[1.02]"
              text={'A new\nlandmark\nrises.'}
              stagger={0.09}
              duration={1.2}
              delay={0.6}
              aria-label="A new landmark rises."
            />
            <div className="flex items-end justify-between border-t border-bone/20 pt-4">
              <span className="text-micro text-bone/80">111 West 57th Street, New York</span>
              <button
                type="button"
                className="flex items-center gap-3 text-micro text-bone hover:text-gold transition-colors duration-300"
                aria-label="Watch the film"
              >
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-bone/40">▶</span>
                Watch the film
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THESIS */}
      <section className="site-max site-grid section-pad" aria-label="Thesis">
        <div className="col-span-12 md:col-span-8">
          <SectionLabel>The Meridian</SectionLabel>
          <RevealText
            as="p"
            className="mt-10 font-display text-display text-ink leading-[1.05]"
            text={'A rarefied collection\nof full-floor residences\nfor considered buyers.'}
            stagger={0.09}
          />
        </div>
        <div className="col-span-12 md:col-span-4 md:col-start-9 mt-12 md:mt-16">
          <p className="text-body-l text-bronze font-light">
            Six towers across three American cities, each addressed to a single
            residence per floor. A measured response to the cities we admire,
            built once, for a small number of owners.
          </p>
        </div>
      </section>

      <ChapterDivider index="I" label="Press" />

      {/* 3. PRESS PULL-QUOTE */}
      <section className="site-max site-grid section-pad" aria-label="Press">
        <div className="col-span-12 md:col-span-10 md:col-start-2">
          <hr className="hairline mb-10" />
          <blockquote className="font-display text-quote text-ink leading-tight">
            <RevealText
              text={'“Restrained, considered, and almost stubbornly quiet —\nThe Meridian argues for an architecture\nthat values permanence over novelty.”'}
            />
          </blockquote>
          <div className="mt-10 text-label text-bronze uppercase tracking-[0.12em]">
            Architectural Record, 2026
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
            src={portrait('meridian-3', 900, 1200)}
            alt="Full-floor residence, level 32"
            seed="meridian-3"
            speed={0.9}
            ratio="3 / 4"
          />
        </div>
        <div className="col-span-12 md:col-span-3 md:col-start-7 flex flex-col justify-center">
          <RevealText
            as="h2"
            className="font-display text-display-s text-ink leading-tight"
            text={'Full-floor\nresidences.'}
          />
          <p className="mt-6 text-body text-bronze">
            Each floor is occupied by a single residence. Three exposures, private elevator entry, and an 11-foot ceiling throughout the principal rooms.
          </p>
          <div className="mt-8">
            <Button variant="ghost" to="/projects">See the portfolio</Button>
          </div>
        </div>
        <div className="col-span-12 md:col-span-4 md:col-start-10 mt-12 md:mt-0 md:translate-y-24">
          <ParallaxImage
            src={portrait('meridian-5', 900, 1200)}
            alt="Primary suite, southwest corner"
            seed="meridian-5"
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
          src={landscape('meridian-wide', 1920, 1080)}
          alt="The Meridian design — full-bleed interlude"
          loading="lazy"
          data-design-image
          className="absolute inset-0 h-full w-full object-cover img-treat will-change-transform"
        />
        <div className="absolute inset-0 flex items-end" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(26,25,24,0.6) 100%)' }}>
          <div className="site-max site-grid w-full pb-[var(--container-pad)]">
            <div className="col-span-12 flex items-end justify-between">
              <SectionLabel className="text-bone/80">Design</SectionLabel>
              <RevealText
                as="h2"
                className="font-display text-display-s text-bone leading-tight text-right"
                text={'Drawn\nonce. Built once.'}
              />
            </div>
          </div>
        </div>
      </section>

      <ChapterDivider index="III" label="Featured" />

      {/* 6. FEATURED PROJECT */}
      <section className="site-max site-grid section-pad" aria-label="Featured project">
        <div className="col-span-12 mb-10">
          <SectionLabel>Featured</SectionLabel>
        </div>
        <div className="col-span-12 md:col-span-7">
          <ProjectCard project={featured} index={0} />
        </div>
        <div className="col-span-12 md:col-span-4 md:col-start-9 mt-12 md:mt-32 flex flex-col gap-8">
          <h2 className="font-display text-display text-ink leading-tight">
            The first of six.
          </h2>
          <p className="text-body-l text-bronze">
            The Meridian, on Billionaires' Row, opens with two full-floor residences per floor and a four-bedroom penthouse. Possession Q3 2026.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button variant="gold" to={`/projects/${featured.slug}`}>Discover the residences</Button>
            <Button variant="ghost" to="/projects">View availability</Button>
          </div>
        </div>
      </section>

      <ChapterDivider index="IV" label="Find your home" />

      {/* 7. PROJECTFINDER (dark interlude) */}
      <section className="site-max section-pad" aria-label="Project finder">
        <div className="mb-10">
          <SectionLabel className="text-bone">Find your home</SectionLabel>
        </div>
        <ProjectFinder />
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

      <ChapterDivider index="VI" label="Numbers" />

      {/* 9. STATS BAR */}
      <section className="site-max site-grid section-pad" aria-label="Stats">
        <div className="col-span-12 mb-12">
          <SectionLabel>By the numbers</SectionLabel>
        </div>
        <div className="col-span-12 grid grid-cols-2 md:grid-cols-4 divide-x divide-line border-y border-line">
          <div className="px-6 py-12">
            <CounterStat value={84} label="Storeys" />
          </div>
          <div className="px-6 py-12">
            <CounterStat value={6} label="Residences" />
          </div>
          <div className="px-6 py-12">
            <CounterStat value={3} label="Cities" />
          </div>
          <div className="px-6 py-12">
            <CounterStat value={82} suffix="ft" label="Lap pool" />
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
            text={'Addressed to the city\nit belongs to.'}
          />
        </div>
        <div className="col-span-12 mt-16">
          <Marquee items={['Midtown West', 'Tribeca', 'Brickell', 'Coconut Grove', 'Pacific Palisades', 'Silver Lake']} />
        </div>
      </section>

      {/* 11. FINAL CTA */}
      <section className="relative w-full overflow-hidden" aria-label="Begin" style={{ aspectRatio: '16 / 9', minHeight: '70vh' }}>
        <img
          src={landscape('meridian-wide', 1920, 1080)}
          alt="A full-floor residence at dusk"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover img-treat"
        />
        <div className="absolute inset-0 flex items-center" style={{ background: 'linear-gradient(180deg, rgba(26,25,24,0.45) 0%, rgba(26,25,24,0.65) 100%)' }}>
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
    label: 'Concierge',
    headline: 'World-class services.',
    body: 'Twenty-four-hour concierge, attended lobby, white-glove arrivals, and a private doorman. The Meridian operates as a full-service building with attention to every request.',
    cta: 'See the amenities',
    image: portrait('meridian-1', 900, 1200),
    seed: 'meridian-1',
    alt: 'Concierge and arrival lobby',
  },
  {
    label: 'Wellness',
    headline: 'Redefining wellness.',
    body: 'An 82-foot lap pool, paired steam and sauna rooms, and two treatment suites operated by an in-house wellness director. Private spa bookings through the concierge.',
    cta: 'Tour the spa',
    image: portrait('meridian-6', 900, 1200),
    seed: 'meridian-6',
    alt: 'Resident spa and pool',
  },
  {
    label: 'Location',
    headline: 'Heart of the city.',
    body: `Steps from Central Park, Carnegie Hall, and MoMA. The Meridian is positioned at the centre of Manhattan's cultural and commercial life.`,
    cta: 'Explore the area',
    image: portrait('meridian-2', 900, 1200),
    seed: 'meridian-2',
    alt: 'Midtown West neighbourhood',
  },
]
