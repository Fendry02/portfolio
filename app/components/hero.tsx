'use client'

import Image from 'next/image'

import profile from '@/public/profile.webp'
import tech from '@/public/tech.svg'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { AnimatedTitle } from './ui'

export default function Hero() {
  const { ref: avatarRef, isVisible: avatarVisible } =
    useScrollAnimation<HTMLDivElement>()
  const { ref: techRef, isVisible: techVisible } =
    useScrollAnimation<HTMLDivElement>()

  return (
    <section id="home" className="hero">
      <div className="hero-content text-center flex flex-col pb-0">
        <div className="hero-body pt-16">
          <AnimatedTitle
            level={1}
            delay={0}
            className="mb-5 transition-opacity duration-1000"
          >
            Hi, I am Benoit Bruynbroeck
          </AnimatedTitle>
          <AnimatedTitle
            level={3}
            delay={200}
            className="transition-opacity duration-1000"
          >
            I am a javascript tech lead full stack developer
          </AnimatedTitle>
          <div
            ref={avatarRef}
            className={`avatar max-w-[250px] max-sm:max-w-[200px] max-sm:pt-8 transition-opacity duration-1000 delay-400 ${
              avatarVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={profile}
              alt="Benoit Bruynbroeck - JavaScript Tech Lead and Full Stack Developer"
              priority={true}
              className="pt-12"
            />
          </div>
        </div>
        <div
          ref={techRef}
          className={`hero-footer container transition-opacity duration-1000 delay-600 ${
            techVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={tech}
            alt="Technology stack illustration showing JavaScript, Vue.js, Next.js, Node.js, PostgreSQL, TypeScript, React, and other modern web development technologies"
            className="mx-auto pt-12 max-w-3xl max-sm:max-w-full"
          />
        </div>
      </div>
    </section>
  )
}
