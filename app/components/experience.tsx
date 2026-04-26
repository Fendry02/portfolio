import { AnimatedTitle, FadeIn } from './ui'

export default function Experience() {
  return (
    <section className="bg-primary text-white p-16 max-sm:p-8 text-center">
      <AnimatedTitle level={1}>Experience</AnimatedTitle>
      <FadeIn as="p" delay={200} className="text-xl py-8 mx-auto max-w-4xl">
        With 9+ years of professional experience, I have honed deep expertise in
        web development. Thriving in startup environments has fostered my
        autonomy and adaptability, enabling me to identify pain points, craft
        effective design plans, and deliver high-quality features with a focus
        on maintainable and performant code. In my role as tech lead at
        CitizenPlane, I led a team of 4+ developers, improved system performance
        by 40%, and reduced deployment time by 60%. I developed strong
        leadership skills, effectively organizing and empowering my team to
        achieve peak performance and seamless collaboration while managing
        projects worth over €500K.
      </FadeIn>
    </section>
  )
}
