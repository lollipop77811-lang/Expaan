import { Link } from 'react-router-dom'

/**
 * NotFound — night background, giant serif "0 4 0 4" numerals, ghost link home.
 *
 * Originally the numerals had a scrub-driven y:-120 parallax on scroll. For
 * the demo build the parallax has been stripped — the numerals now render
 * statically centered in the viewport.
 */
export default function NotFound() {
  return (
    <>
      <section className="relative h-screen w-full overflow-hidden bg-night text-bone flex items-center justify-center" aria-label="404">
        <div
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
