'use client'

import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { AnimatedTitle } from './ui'

export default function Presentation() {
  const { ref: descriptionRef, isVisible: descriptionVisible } =
    useScrollAnimation<HTMLParagraphElement>()

  return (
    <section className="bg-primary text-white px-16 pt-32 pb-40 max-sm:px-8 max-sm:pt-16 max-sm:pb-20 text-center">
      <AnimatedTitle level={1} delay={0}>
        Nice to meet you
      </AnimatedTitle>
      <p
        ref={descriptionRef}
        className={`text-xl py-8 mx-auto max-w-4xl transition-all duration-700 delay-200 ${
          descriptionVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8'
        }`}
      >
        I am a passionate developer crafting functional and efficient web
        solutions with modern JavaScript and scalable backend technologies. My
        philosophy centers on clean, maintainable code and functional
        programming principles. I believe in the power of well-architected
        systems that grow with your business needs, combining technical
        excellence with strategic thinking to deliver solutions that truly make
        a difference.
      </p>
    </section>
  )
}
