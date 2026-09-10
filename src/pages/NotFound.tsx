import { useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { gsap, prefersReducedMotion } from '../lib/gsap'

/**
 * NotFound — night background, giant serif "0 4 0 4" numerals with parallax,
 * ghost link home.
 */
export default function NotFound() {
  const numeralsRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const el = numeralsRef.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: 0 },
        {
          y: -120,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        },
      )
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <>
      <Helmet>
        <title>DUOS Wynwood — Page not found</title>
        <meta name="description" content="The page you are looking for could not be found. Return to the home page." />
        <link rel="canonical" href="https://duoswynwood.com/404" />
      </Helmet>

      <section className="relative h-screen w-full overflow-hidden bg-night text-bone flex items-center justify-center" aria-label="404">
        <div
          ref={numeralsRef}
          className="font-display leading-none text-bone select-none"
          style={{ fontSize: 'clamp(8rem, 28vw, 22rem)' }}
          aria-hidden
        >
          0&nbsp;4&nbsp;0&nbsp;4
        </div>
        <div className="absolute inset-x-0 bottom-[calc(var(--container-pad)*2)] text-center flex flex-col gap-6 items-center">
          <p className="text-body-l text-bone/70 font-light max-w-md">
            The page you are looking for is not here. Return to the home page,
            or visit one of our residences.
          </p>
          <Link to="/" className="text-label uppercase tracking-[0.12em] text-canvas-soft border-b border-canvas-soft pb-1 hover:text-canvas hover:border-canvas transition-colors">
            Return home
          </Link>
        </div>
      </section>
    </>
  )
}
