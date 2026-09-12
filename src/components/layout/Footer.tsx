import { Link } from 'react-router-dom'

interface FooterColumn {
  heading: string
  links: { label: string; to: string }[]
}

const COLUMNS: FooterColumn[] = [
  {
    heading: 'Navigate',
    links: [
      { label: 'Home', to: '/' },
      { label: 'About', to: '/story' },
      { label: 'Residences', to: '/projects' },
      { label: 'Amenities', to: '/amenities' },
    ],
  },
  {
    heading: 'Discover',
    links: [
      { label: 'Neighbourhood', to: '/neighborhood' },
      { label: 'Inquire', to: '/inquire' },
      { label: 'Availability', to: '/projects/expaan' },
    ],
  },
  {
    heading: 'Contact',
    links: [
      { label: 'Sales Gallery', to: '/inquire' },
      { label: 'Book a viewing', to: '/inquire' },
    ],
  },
]

function scrollTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

/**
 * Footer
 *  night background; wordmark serif display, nav columns micro uppercase,
 *  contact row, social hairline links, legal line, "Back to top" ghost
 *  button triggering Lenis scrollTo(0).
 */
export default function Footer() {
  return (
    <footer className="bg-night text-bone">
      <div className="site-max site-grid section-pad">
        <div className="col-span-12 md:col-span-7">
          <Link to="/" className="font-display text-display text-bone leading-[0.9] hover:text-canvas transition-colors duration-300" aria-label="Expaan — Home">
            Expaan<span className="text-canvas">.</span>
          </Link>
          <p className="mt-8 max-w-md text-body-l text-bone/80 font-light">
            49 finished residences in the heart of Expaan, Miami.
          </p>
        </div>

        <div className="col-span-12 md:col-span-5 grid grid-cols-3 gap-6">
          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <div className="text-micro text-bone/70 mb-4">{col.heading}</div>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-micro text-bone hover:text-canvas transition-colors duration-300">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="col-span-12 mt-16 flex flex-col gap-6 border-t border-bone/20 pt-6 md:flex-row md:items-center md:justify-between">
          <div className="text-micro text-bone/60">
            © {new Date().getFullYear()} Expaan. All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-micro text-bone/80">
            <a href="https://instagram.com" className="border-b border-bone/30 hover:text-canvas hover:border-canvas transition-colors" rel="noreferrer" target="_blank">Instagram</a>
            <a href="https://linkedin.com" className="border-b border-bone/30 hover:text-canvas hover:border-canvas transition-colors" rel="noreferrer" target="_blank">LinkedIn</a>
            <button
              type="button"
              onClick={scrollTop}
              className="text-micro text-bone hover:text-canvas border-b border-bone/30 hover:border-canvas transition-colors"
            >
              Back to top ↑
            </button>
          </div>
        </div>
        <div className="col-span-12 text-micro text-bone/50 mt-4">
          Equal Housing Opportunity. Pre-construction. Funds held in escrow.
        </div>
      </div>
    </footer>
  )
}
