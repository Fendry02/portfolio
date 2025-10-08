'use client'

import Image from 'next/image'

import frontend from '@/public/front-end.webp'
import portable from '@/public/portable.webp'
import server from '@/public/server.webp'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { AnimatedTitle } from './ui'

export default function Skills() {
  const imageSize = 72
  const { ref: sectionRef, isVisible: sectionVisible } =
    useScrollAnimation<HTMLDivElement>()
  const { ref: frontendRef, isVisible: frontendVisible } =
    useScrollAnimation<HTMLDivElement>()
  const { ref: backendRef, isVisible: backendVisible } =
    useScrollAnimation<HTMLDivElement>()
  const { ref: databaseRef, isVisible: databaseVisible } =
    useScrollAnimation<HTMLDivElement>()

  return (
    <section id="skills" className="text-center px-16 max-sm:px-8">
      <div ref={sectionRef} className="mx-auto columns-1 lg:columns-3 gap-x-8">
        <div
          ref={frontendRef}
          className={`relative rounded-t-xl border-0 lg:rounded-xl bg-base-100 shadow-lg -top-16 transition-all duration-700 ${
            frontendVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <figure>
            <Image
              src={frontend}
              alt="Frontend development icon"
              height={imageSize}
              width={imageSize}
              className="mx-auto pt-8"
            />
          </figure>
          <div className="card-body overflow-auto	text-center">
            <AnimatedTitle level={2} delay={0} className="card-title mx-auto">
              Frontend
            </AnimatedTitle>
            <p className="sm:h-24">
              I like to code things from scratch, and enjoy bringing ideas to
              life in the browser
            </p>
            <p className="text-secondary">Technologies & Experience</p>
            <ul className="list-none space-y-2">
              <li className="flex justify-between items-center">
                <span>VueJS</span>
                <span className="text-sm text-secondary">2+ years</span>
              </li>
              <li className="flex justify-between items-center">
                <span>NextJS</span>
                <span className="text-sm text-secondary">1+ years</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Tailwind</span>
                <span className="text-sm text-secondary">2+ years</span>
              </li>
              <li className="flex justify-between items-center">
                <span>daisyUI</span>
                <span className="text-sm text-secondary">2+ years</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Figma</span>
                <span className="text-sm text-secondary">3+ years</span>
              </li>
            </ul>
          </div>
        </div>
        <div
          ref={backendRef}
          className={`relative overflow-auto border-t lg:border-0 lg:rounded-xl bg-base-100 shadow-lg -top-16 transition-all duration-700 delay-200 ${
            backendVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <figure>
            <Image
              src={portable}
              alt="Backend development icon"
              height={imageSize}
              width={imageSize}
              className="mx-auto pt-8"
            />
          </figure>
          <div className="card-body text-center">
            <AnimatedTitle level={2} delay={0} className="card-title mx-auto">
              Backend
            </AnimatedTitle>
            <p className="sm:h-24">
              I enjoy develop clean and efficient RESTful API
            </p>
            <p className="text-secondary">Technologies & Experience</p>
            <ul className="list-none space-y-2">
              <li className="flex justify-between items-center">
                <span>NodeJS</span>
                <span className="text-sm text-secondary">6+ years</span>
              </li>
              <li className="flex justify-between items-center">
                <span>TypeScript</span>
                <span className="text-sm text-secondary">5+ years</span>
              </li>
              <li className="flex justify-between items-center">
                <span>AWS</span>
                <span className="text-sm text-secondary">4+ years</span>
              </li>
              <li className="flex justify-between items-center">
                <span>RabbitMQ</span>
                <span className="text-sm text-secondary">4+ years</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Datadog</span>
                <span className="text-sm text-secondary">3+ years</span>
              </li>
            </ul>
          </div>
        </div>
        <div
          ref={databaseRef}
          className={`relative overflow-auto border-t lg:border-0 rounded-b-xl lg:rounded-xl bg-base-100 shadow-lg -top-16 transition-all duration-700 delay-400 ${
            databaseVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <figure>
            <Image
              src={server}
              alt="Database development icon"
              height={imageSize}
              width={imageSize}
              className="mx-auto pt-8"
            />
          </figure>
          <div className="card-body text-center">
            <AnimatedTitle level={2} delay={0} className="card-title mx-auto">
              Database
            </AnimatedTitle>
            <p className="sm:h-24">
              I genuinely care about building efficient database, and love
              helping beginners to learn it
            </p>
            <p className="text-secondary">Technologies & Experience</p>
            <ul className="list-none space-y-2">
              <li className="flex justify-between items-center">
                <span>PostgreSQL</span>
                <span className="text-sm text-secondary">6+ years</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Oracle</span>
                <span className="text-sm text-secondary">3+ years</span>
              </li>
              <li className="flex justify-between items-center">
                <span>MongoDB</span>
                <span className="text-sm text-secondary">3+ years</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Redis</span>
                <span className="text-sm text-secondary">3+ years</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Objection.js</span>
                <span className="text-sm text-secondary">6+ years</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
