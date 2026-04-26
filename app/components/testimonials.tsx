import { TESTIMONIALS } from '../data/testimonials'
import { FadeIn, SectionHeader, Surface } from './ui'

export default function Testimonials() {
  if (TESTIMONIALS.length === 0) return null

  return (
    <section className="px-6 md:px-12 py-[var(--space-section)]">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          num="06"
          eyebrow="What people say"
          title={
            <>
              Words from{' '}
              <span className="italic text-accent">collaborators</span>
            </>
          }
        />

        <div className="mt-16 grid md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <FadeIn
              key={`${t.author}-${idx}`}
              delay={(idx * 100) as 0 | 100 | 200 | 300}
            >
              <Surface className="p-8 md:p-10 h-full">
                <p className="font-display text-2xl md:text-3xl text-paper leading-snug">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="mt-6 flex items-center gap-3">
                  <span className="h-px w-6 bg-accent" aria-hidden="true" />
                  <span>
                    <span className="text-paper">{t.author}</span>
                    <span className="text-paper-mute">
                      {' · '}
                      {t.role}
                      {t.company ? ` · ${t.company}` : ''}
                    </span>
                  </span>
                </footer>
              </Surface>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
