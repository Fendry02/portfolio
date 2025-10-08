'use client'

import { useScrollAnimation } from '../hooks/useScrollAnimation'

export default function Presentation() {
  const { ref: titleRef, isVisible: titleVisible } =
    useScrollAnimation<HTMLHeadingElement>()
  const { ref: descriptionRef, isVisible: descriptionVisible } =
    useScrollAnimation<HTMLParagraphElement>()

  return (
    <section className="bg-primary text-white px-16 pt-32 pb-40 max-sm:px-8 max-sm:pt-16 max-sm:pb-20 text-center">
      <h1
        ref={titleRef}
        className={`text-5xl font-bold transition-all duration-700 ${
          titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        Nice to meet you
      </h1>
      <p
        ref={descriptionRef}
        className={`text-xl py-8 mx-auto max-w-4xl transition-all duration-700 delay-200 ${
          descriptionVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8'
        }`}
      >
        I am a passionate developer crafting functional and efficient web
        solutions with modern JavaScript and scalable backend technologies
      </p>
    </section>
  )
}
