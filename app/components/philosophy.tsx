import { PILLARS } from '../data/philosophy'
import { FadeIn, SectionHeader } from './ui'

export default function Philosophy() {
  return (
    <section className="px-6 md:px-12 py-[var(--space-section)] bg-ink-2/40 border-y border-line">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          num="06"
          eyebrow="How I work"
          title={
            <>
              A <span className="italic text-accent">deliberate</span> craft
            </>
          }
        />

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-line border border-line rounded-2xl overflow-hidden">
          {PILLARS.map((pillar, idx) => (
            <FadeIn
              key={pillar.title}
              delay={(idx * 100) as 0 | 100 | 200 | 300}
              className="bg-ink-2 p-8 md:p-10 hover:bg-ink-3 transition-colors"
            >
              <p className="font-mono text-xs text-paper-mute tracking-widest uppercase">
                Principle · 0{idx + 1}
              </p>
              <h3 className="mt-3 font-display text-3xl text-paper">
                {pillar.title}
              </h3>
              <p className="mt-4 text-paper-dim leading-relaxed">
                {pillar.description}
              </p>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={300} className="mt-12 max-w-3xl">
          <p className="font-display text-2xl md:text-3xl text-paper leading-snug">
            <span className="italic text-accent">Every line of code</span>{' '}
            should serve a purpose. Every architecture decision should be
            justified. Every solution should be built to last.
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
