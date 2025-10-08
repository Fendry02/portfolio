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
          className={`relative rounded-t-xl border-0 lg:rounded-xl bg-base-100 shadow-lg -top-16 transition-all duration-700 hover:scale-105 ${
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
            <p className="text-secondary">Experience I have</p>
            <ul className="list-none">
              <li>VueJS</li>
              <li>NextJS</li>
              <li>Tailwind</li>
              <li>daisyUI</li>
              <li>Figma</li>
            </ul>
          </div>
        </div>
        <div
          ref={backendRef}
          className={`relative overflow-auto border-t lg:border-0 lg:rounded-xl bg-base-100 shadow-lg -top-16 transition-all duration-700 delay-200 hover:scale-105 ${
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
            <p className="text-secondary">Experience I have</p>
            <ul className="list-none">
              <li>NodeJS</li>
              <li>Typescript</li>
              <li>AWS</li>
              <li>RabbitMQ</li>
              <li>Datadog</li>
            </ul>
          </div>
        </div>
        <div
          ref={databaseRef}
          className={`relative overflow-auto border-t lg:border-0 rounded-b-xl lg:rounded-xl bg-base-100 shadow-lg -top-16 transition-all duration-700 delay-400 hover:scale-105 ${
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
            <p className="text-secondary">Experience I have</p>
            <ul className="list-none">
              <li>Postgres</li>
              <li>Oracle</li>
              <li>Mongo</li>
              <li>Redis</li>
              <li>Objection</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
