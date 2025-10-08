'use client'

import { useScrollAnimation } from '../hooks/useScrollAnimation'

export default function Experience() {
  const { ref: titleRef, isVisible: titleVisible } =
    useScrollAnimation<HTMLHeadingElement>()
  const { ref: descriptionRef, isVisible: descriptionVisible } =
    useScrollAnimation<HTMLParagraphElement>()

  return (
    <section className="bg-primary text-white p-16 max-sm:p-8 text-center">
      <h1
        ref={titleRef}
        className={`text-5xl font-bold transition-all duration-700 ${
          titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        Experience
      </h1>
      <p
        ref={descriptionRef}
        className={`text-xl py-8 mx-auto max-w-4xl transition-all duration-700 delay-200 ${
          descriptionVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8'
        }`}
      >
        With extensive professional experience, I have honed deep expertise in
        web development. Thriving in startup environments has fostered my
        autonomy and adaptability, enabling me to identify pain points, craft
        effective design plans, and deliver high-quality features with a focus
        on maintainable and performant code. In my role as tech lead at
        CitizenPlane, I developed strong leadership skills, effectively
        organizing and empowering my team to achieve peak performance and
        seamless collaboration.
      </p>
    </section>
  )
}
