'use client'

import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { AnimatedTitle } from './ui'

export default function Philosophy() {
  const { ref: sectionRef, isVisible: sectionVisible } =
    useScrollAnimation<HTMLDivElement>()
  const { ref: functionalRef, isVisible: functionalVisible } =
    useScrollAnimation<HTMLDivElement>()
  const { ref: cleanRef, isVisible: cleanVisible } =
    useScrollAnimation<HTMLDivElement>()
  const { ref: scalableRef, isVisible: scalableVisible } =
    useScrollAnimation<HTMLDivElement>()
  const { ref: approachRef, isVisible: approachVisible } =
    useScrollAnimation<HTMLDivElement>()

  return (
    <section className="bg-primary text-white p-16 max-sm:p-8">
      <AnimatedTitle level={1} delay={0} className="text-center mb-16">
        My Development Philosophy
      </AnimatedTitle>

      <div
        ref={sectionRef}
        className={`grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto transition-all duration-700 delay-200 ${
          sectionVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8'
        }`}
      >
        <div
          ref={functionalRef}
          className={`card bg-base-100 rounded-xl shadow-lg p-6 transition-all duration-700 delay-300 ${
            functionalVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="card-body text-center">
            <div className="text-4xl mb-4">⚡</div>
            <AnimatedTitle level={3} delay={0} className="text-secondary mb-4">
              Functional Programming
            </AnimatedTitle>
            <p className="text-sm text-black">
              I embrace functional programming principles: immutability, pure
              functions, and composition over inheritance. This approach leads
              to more predictable, testable, and maintainable code that scales
              beautifully with your business.
            </p>
          </div>
        </div>

        <div
          ref={cleanRef}
          className={`card bg-base-100 rounded-xl shadow-lg p-6 transition-all duration-700 delay-400 ${
            cleanVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="card-body text-center">
            <div className="text-4xl mb-4">🧹</div>
            <AnimatedTitle level={3} delay={0} className="text-secondary mb-4">
              Clean Code
            </AnimatedTitle>
            <p className="text-sm text-black">
              Code is read more often than it's written. I prioritize clean,
              self-documenting code with meaningful names, small functions, and
              clear structure. This reduces technical debt and makes future
              maintenance a breeze.
            </p>
          </div>
        </div>

        <div
          ref={scalableRef}
          className={`card bg-base-100 rounded-xl shadow-lg p-6 transition-all duration-700 delay-500 ${
            scalableVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="card-body text-center">
            <div className="text-4xl mb-4">📈</div>
            <AnimatedTitle level={3} delay={0} className="text-secondary mb-4">
              Scalable Architecture
            </AnimatedTitle>
            <p className="text-sm text-black">
              I design systems that grow with your business. From microservices
              to database optimization, I ensure your architecture can handle
              increased load, new features, and team growth without breaking a
              sweat.
            </p>
          </div>
        </div>
      </div>

      <div
        ref={approachRef}
        className={`text-center mt-12 transition-all duration-700 delay-600 ${
          approachVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8'
        }`}
      >
        <p className="text-lg max-w-4xl mx-auto">
          <strong>My approach:</strong> Every line of code should serve a
          purpose, every architecture decision should be justified, and every
          solution should be built to last. I believe in the power of
          well-crafted software to transform businesses and create lasting
          value.
        </p>
      </div>
    </section>
  )
}
