import { Helmet } from 'react-helmet-async'
import RevealText from '../components/motion/RevealText'
import SectionLabel from '../components/ui/SectionLabel'
import ProjectGrid from '../components/project/ProjectGrid'

/**
 * Projects — the inventory.
 */
export default function Projects() {
  return (
    <>
      <Helmet>
        <title>The Meridian — Residences</title>
        <meta name="description" content="Six residences across three American cities — New York, Miami, and Los Angeles. Filter by city, configuration, or status." />
        <link rel="canonical" href="https://meridian.example.com/projects" />
      </Helmet>

      <section className="site-max site-grid pt-32 section-pad">
        <div className="col-span-12 mb-12">
          <SectionLabel>Residences</SectionLabel>
        </div>
        <div className="col-span-12 md:col-span-10">
          <RevealText
            as="h1"
            className="font-display text-display-xl text-ink leading-[1.02]"
            text={'Six residences.\nThree cities.'}
          />
        </div>
        <div className="col-span-12 md:col-span-4 md:col-start-9 mt-12 md:mt-0 flex flex-col justify-end">
          <p className="text-body text-bronze">
            Filter by city, configuration, or status. Each residence is offered
            by private appointment.
          </p>
        </div>
      </section>

      <ProjectGrid />
    </>
  )
}
