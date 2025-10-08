'use client'

import Image from 'next/image'

import technical from '@/public/benefits/technical.webp'
import methodology from '@/public/benefits/methodology.webp'
import communication from '@/public/benefits/communication.webp'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { AnimatedTitle } from './ui'

export default function Benefits() {
  const { ref: technicalRef, isVisible: technicalVisible } =
    useScrollAnimation<HTMLDivElement>()
  const { ref: methodologyRef, isVisible: methodologyVisible } =
    useScrollAnimation<HTMLDivElement>()
  const { ref: communicationRef, isVisible: communicationVisible } =
    useScrollAnimation<HTMLDivElement>()

  return (
    <section className="text-center p-16 pt-0 max-sm:p-8 max-sm:pt-0">
      <AnimatedTitle level={1} delay={0}>
        Benefits of working with me
      </AnimatedTitle>
      <div className="flex flex-wrap mx-auto justify-center	gap-8 pt-8">
        <div className="flex w-full flex-col lg:flex-row">
          <div
            ref={technicalRef}
            className={`card rounded-box flex-grow place-items-center p-8 shadow-lg transition-all duration-700 ${
              technicalVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="relative w-full aspect-square max-w-[200px] max-h-[200px]">
              <Image
                src={technical}
                alt="Technical expertise illustration"
                fill
                sizes="(max-width: 768px) 100vw, 300px"
                className="rounded-2xl object-contain"
              />
            </div>
            <AnimatedTitle level={3} delay={0} className="py-4 text-secondary">
              Technical Expertise
            </AnimatedTitle>
            <p>
              Mastery of modern JavaScript, PostgreSQL, and clean coding
              practices. I deliver robust, scalable solutions tailored to your
              needs.
            </p>
          </div>
          <div className="divider lg:divider-horizontal divider-primary max-lg:hidden"></div>
          <div
            ref={methodologyRef}
            className={`card rounded-box flex-grow place-items-center p-8 shadow-lg transition-all duration-700 delay-200 ${
              methodologyVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="relative w-full aspect-square max-w-[200px] max-h-[200px]">
              <Image
                src={methodology}
                alt="methodology illustration"
                fill
                sizes="(max-width: 768px) 100vw, 300px"
                className="rounded-2xl object-contain"
              />
            </div>
            <AnimatedTitle level={3} delay={0} className="py-4 text-secondary">
              Efficient Methodology
            </AnimatedTitle>
            <p>
              I follow a structured, functional approach that ensures your
              project is completed on time and within scope, without
              compromising on quality.
            </p>
          </div>
          <div className="divider lg:divider-horizontal divider-primary max-lg:hidden"></div>
          <div
            ref={communicationRef}
            className={`card rounded-box flex-grow place-items-center p-8 shadow-lg transition-all duration-700 delay-400 ${
              communicationVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="relative w-full aspect-square max-w-[200px] max-h-[200px]">
              <Image
                src={communication}
                alt="communication illustration"
                fill
                sizes="(max-width: 768px) 100vw, 300px"
                className="rounded-2xl object-contain"
              />
            </div>
            <AnimatedTitle level={3} delay={0} className="py-4 text-secondary">
              Clear Communication
            </AnimatedTitle>
            <p>
              I am committed to keeping you informed and involved every step of
              the way. Transparent, timely, and effective communication is key.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
