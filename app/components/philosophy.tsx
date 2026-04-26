import { PILLARS } from '../data/philosophy'
import { AnimatedTitle, FadeIn } from './ui'

const DELAYS = [300, 400, 500] as const

export default function Philosophy() {
  return (
    <section className="bg-primary text-white p-16 max-sm:p-8">
      <AnimatedTitle level={1} className="text-center mb-16">
        My Development Philosophy
      </AnimatedTitle>

      <FadeIn
        delay={200}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
      >
        {PILLARS.map((pillar, idx) => (
          <FadeIn
            key={pillar.title}
            delay={DELAYS[idx]}
            className="card bg-base-100 rounded-xl shadow-lg p-6"
          >
            <div className="card-body text-center">
              <div aria-hidden="true" className="text-4xl mb-4">
                {pillar.emoji}
              </div>
              <AnimatedTitle level={3} className="text-secondary mb-4">
                {pillar.title}
              </AnimatedTitle>
              <p className="text-sm text-black">{pillar.description}</p>
            </div>
          </FadeIn>
        ))}
      </FadeIn>

      <FadeIn delay={600} className="text-center mt-12">
        <p className="text-lg max-w-4xl mx-auto">
          <strong>My approach:</strong> Every line of code should serve a
          purpose, every architecture decision should be justified, and every
          solution should be built to last. I believe in the power of
          well-crafted software to transform businesses and create lasting
          value.
        </p>
      </FadeIn>
    </section>
  )
}
