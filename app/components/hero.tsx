import Image from 'next/image'

import profile from '@/public/profile.webp'
import tech from '@/public/tech.svg'
import { AnimatedTitle, FadeIn } from './ui'

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-content text-center flex flex-col pb-0">
        <div className="hero-body pt-16">
          <AnimatedTitle level={1} className="mb-5">
            Hi, I am Benoit Bruynbroeck
          </AnimatedTitle>
          <AnimatedTitle level={3} delay={200}>
            I am a JavaScript Tech Lead who transforms complex ideas into
            scalable web solutions
          </AnimatedTitle>
          <FadeIn
            delay={400}
            className="avatar max-w-[250px] max-sm:max-w-[200px] max-sm:pt-8"
          >
            <Image
              src={profile}
              alt="Benoit Bruynbroeck - JavaScript Tech Lead and Full Stack Developer"
              priority
              className="pt-12"
            />
          </FadeIn>
        </div>
        <FadeIn delay={600} className="hero-footer container">
          <Image
            src={tech}
            alt="Technology stack illustration showing JavaScript, Vue.js, Next.js, Node.js, PostgreSQL, TypeScript, React, and other modern web development technologies"
            className="mx-auto pt-12 max-w-3xl max-sm:max-w-full"
          />
        </FadeIn>
      </div>
    </section>
  )
}
