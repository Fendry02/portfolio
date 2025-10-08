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
    <section className="text-center p-16 max-sm:p-8 max-sm:pt-0">
      <AnimatedTitle level={1} delay={0}>
        Benefits of working with me
      </AnimatedTitle>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8 max-w-6xl mx-auto">
        <div
          ref={technicalRef}
          className={`card rounded-box place-items-center p-8 shadow-lg transition-all duration-700 flex flex-col ${
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
          <p className="flex-grow">
            Mastery of modern JavaScript, PostgreSQL, and clean coding
            practices. I deliver robust, scalable solutions that improve
            performance.
          </p>
        </div>

        <div
          ref={methodologyRef}
          className={`card rounded-box place-items-center p-8 shadow-lg transition-all duration-700 delay-200 flex flex-col ${
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
          <p className="flex-grow">
            I follow a structured, functional approach that ensures your project
            is completed on time and within scope, without compromising on
            quality. My agile methodology includes daily standups, sprint
            planning, and continuous integration.
          </p>
        </div>

        <div
          ref={communicationRef}
          className={`card rounded-box place-items-center p-8 shadow-lg transition-all duration-700 delay-400 flex flex-col ${
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
          <p className="flex-grow">
            I am committed to keeping you informed and involved every step of
            the way. With 24-hour response time guarantee, weekly progress
            reports, and transparent project tracking, I ensure 100% visibility
            into your project's development process.
          </p>
        </div>
      </div>
    </section>
  )
}
