import { TIMELINE } from '../data/timeline'
import { Eyebrow, FadeIn, SectionHeader } from './ui'

export default function Timeline() {
  return (
    <section className="px-6 md:px-12 py-[var(--space-section)]">
      <div className="max-w-7xl mx-auto">
        <SectionHeader num="05" eyebrow="Trajectory" title="Where I've been" />

        <ol className="mt-16 relative">
          <span
            aria-hidden="true"
            className="absolute left-[7.25rem] top-2 bottom-2 w-px bg-line hidden md:block"
          />
          {TIMELINE.map((entry, idx) => (
            <FadeIn
              as="li"
              key={entry.period}
              delay={((idx * 100) as 0 | 100 | 200 | 300) || 0}
              className="relative grid md:grid-cols-[8rem_1.5rem_1fr] items-start gap-4 md:gap-6 py-6 border-b border-line/60 last:border-b-0"
            >
              <Eyebrow as="div" className="pt-1.5">
                {entry.period}
              </Eyebrow>
              <span
                aria-hidden="true"
                className="hidden md:flex justify-center pt-2"
              >
                <span className="size-2 rounded-full bg-accent" />
              </span>
              <div>
                <h3 className="font-display text-3xl md:text-4xl text-paper">
                  {entry.title}
                </h3>
                <p className="mt-2 text-paper-dim">{entry.role}</p>
                {entry.detail && (
                  <p className="mt-2 font-mono text-xs text-paper-mute leading-relaxed">
                    {entry.detail}
                  </p>
                )}
              </div>
            </FadeIn>
          ))}
        </ol>
      </div>
    </section>
  )
}
