import RevealText from '../components/motion/RevealText'
import SectionLabel from '../components/ui/SectionLabel'
import InquiryForm from '../components/forms/InquiryForm'

/**
 * Inquire — Expaan sales gallery.
 * Left column: pitch + Expaan sales gallery address + Miami phone.
 * Right column: InquiryForm with RHF + Zod + designed success state.
 */
export default function Inquire() {
  return (
    <>
<section className="site-max site-grid pt-32 section-pad">
        <div className="col-span-12 mb-16">
          <SectionLabel>Inquire</SectionLabel>
        </div>
      </section>

      <section className="site-max site-grid section-pad-tight" aria-label="Inquiry form">
        <div className="col-span-12 md:col-span-5 md:col-start-1 flex flex-col gap-12">
          <RevealText
            as="h1"
            className="font-display text-display text-ink leading-[1.05]"
            text={'Begin the\nconversation.'}
          />
          <p className="text-body-l text-bronze font-light max-w-md">
            A member of the sales gallery will respond within one working day.
            By appointment, seven days a week, in Expaan.
          </p>

          <div className="flex flex-col gap-6 border-t border-line pt-8">
            <Contact label="Sales Gallery" lines={['335 NW 28th Street, Miami, FL 33127', 'By appointment, Mon — Sun']} />
            <Contact label="Telephone" lines={['+1 305 555 0148']} href="tel:+13055550148" />
            <Contact label="Email" lines={['sales@expaan.com']} href="mailto:sales@expaan.com" />
            <Contact label="Press" lines={['press@expaan.com']} href="mailto:press@expaan.com" />
          </div>
        </div>

        <div className="col-span-12 md:col-span-5 md:col-start-8 mt-12 md:mt-0">
          <div className="border border-line bg-canvas-soft p-[var(--container-pad)] sm:p-12" data-lenis-prevent>
            <h2 className="font-display text-display-s text-ink leading-tight mb-10">
              Enquiry form
            </h2>
            <InquiryForm />
          </div>
        </div>
      </section>
    </>
  )
}

function Contact({ label, lines, href }: { label: string; lines: string[]; href?: string }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-micro text-bronze uppercase">{label}</span>
      {lines.map((l) =>
        href ? (
          <a key={l} href={href} className="text-body text-ink hover:text-bronze-deep transition-colors">
            {l}
          </a>
        ) : (
          <span key={l} className="text-body text-ink">{l}</span>
        ),
      )}
    </div>
  )
}
