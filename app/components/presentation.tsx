import { FadeIn, SectionHeader } from './ui'

export default function Presentation() {
  return (
    <section className="px-6 md:px-12 py-[var(--space-section)]">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <SectionHeader
            num="01"
            eyebrow="About"
            title={
              <>
                Nice to <span className="italic text-accent">meet</span> you
              </>
            }
          />
        </div>

        <FadeIn delay={200} className="lg:col-span-8">
          <p className="font-display text-[length:var(--text-display-md)] leading-[1.1] text-paper">
            I craft <span className="italic text-accent">functional</span>,
            efficient web solutions with modern JavaScript and scalable backend
            technologies.
          </p>
          <p className="mt-8 text-lg text-paper-dim leading-relaxed max-w-3xl">
            My philosophy centers on clean, maintainable code and functional
            programming principles. I believe in well-architected systems that
            grow with your business — combining technical excellence with
            strategic thinking to deliver solutions that actually make a
            difference.
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
