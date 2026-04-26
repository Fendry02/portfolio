import { AnimatedTitle, FadeIn } from './ui'

export default function Presentation() {
  return (
    <section className="bg-primary text-white px-16 pt-32 pb-40 max-sm:px-8 max-sm:pt-16 max-sm:pb-20 text-center">
      <AnimatedTitle level={1}>Nice to meet you</AnimatedTitle>
      <FadeIn as="p" delay={200} className="text-xl py-8 mx-auto max-w-4xl">
        I am a passionate developer crafting functional and efficient web
        solutions with modern JavaScript and scalable backend technologies. My
        philosophy centers on clean, maintainable code and functional
        programming principles. I believe in the power of well-architected
        systems that grow with your business needs, combining technical
        excellence with strategic thinking to deliver solutions that truly make
        a difference.
      </FadeIn>
    </section>
  )
}
