'use client'
import Image from 'next/image'

import citizenplane from '@/public/works/citizenplane.webp'
import businessDecision from '@/public/works/business-decision.webp'
import openclassrooms from '@/public/works/openclassrooms.webp'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { AnimatedTitle } from './ui'

export default function Works() {
  const handleClick = (elementId: string) => {
    ;(document.getElementById(elementId) as HTMLDialogElement)?.showModal()
  }

  const { ref: subtitleRef, isVisible: subtitleVisible } =
    useScrollAnimation<HTMLParagraphElement>()
  const { ref: citizenplaneRef, isVisible: citizenplaneVisible } =
    useScrollAnimation<HTMLDivElement>()
  const { ref: businessRef, isVisible: businessVisible } =
    useScrollAnimation<HTMLDivElement>()
  const { ref: openclassroomsRef, isVisible: openclassroomsVisible } =
    useScrollAnimation<HTMLDivElement>()

  return (
    <section id="works" className="text-center pb-16 px-16 max-sm:px-8">
      <AnimatedTitle level={1} delay={0}>
        Works
      </AnimatedTitle>
      <p
        ref={subtitleRef}
        className={`text-xl p-8 transition-all duration-700 delay-200 ${
          subtitleVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8'
        }`}
      >
        Here are projects I have worked on. Want to see more?{' '}
        <a
          className="text-secondary cursor-pointer hover:underline hover:underline-offset-4"
          href="mailto:bruy.benoit@gmail.com"
        >
          Email me.
        </a>
      </p>
      <div className="flex w-full flex-col lg:flex-row justify-center lg:gap-32 gap-4 items-center ">
        <div
          ref={citizenplaneRef}
          className={`flex-1 cursor-pointer group/caption shadow-lg hover:bg-slate-900 ease-in-out duration-300 rounded-2xl max-w-[300px] max-h-[300px] transition-all duration-700 hover:scale-105 ${
            citizenplaneVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
          onClick={(e) => handleClick('citizenplaneModal')}
        >
          <figure className="relative">
            <Image
              src={citizenplane}
              alt="CitizenPlane project - Tech Lead role showcasing scalable web application development"
              className="rounded-2xl group-hover/caption:opacity-0 transition-opacity duration-300 ease-in-out w-[300px] h-[300px]"
            />
            <figcaption className="transition-opacity duration-300 ease-in-out flex flex-col justify-center absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2  opacity-0 group-hover/caption:opacity-100 text-white">
              <AnimatedTitle
                level={1}
                delay={0}
                className="text-xl md:text-4xl"
              >
                CitizenPlane
              </AnimatedTitle>
              <p className="text-base	md:text-2xl pt-2">Tech lead</p>
            </figcaption>
          </figure>
          <dialog
            id="citizenplaneModal"
            className="modal modal-bottom sm:modal-middle cursor-default"
          >
            <div className="modal-box">
              <div className="flex items-center gap-4">
                <Image
                  src={citizenplane}
                  alt="CitizenPlane project logo"
                  className="rounded-2xl w-[50px] h-[50px]"
                />
                <AnimatedTitle
                  level={3}
                  delay={0}
                  className="font-bold text-lg"
                >
                  CitizenPlane
                </AnimatedTitle>
              </div>
              <p className="py-4 text-start">
                As a Tech Lead at CitizenPlane, I led the development of a
                scalable travel management platform. I architected a
                microservices architecture using Docker and Kubernetes,
                resulting in 40% improved system performance and 60% faster
                deployment cycles. I mentored a team of 4+ developers,
                implemented CI/CD pipelines, and established code review
                processes that reduced production bugs. The platform handles
                complex travel workflows with real-time data processing and
                integrates with multiple third-party APIs.
              </p>
              <p className="text-start">
                <b>Key Achievements:</b> Led team of 4+ developers
              </p>
              <p className="text-start">
                <b>Stack:</b> VueJs, Node.js, TypeScript, PostgreSQL, Docker,
                Kubernetes, AWS (ECS, RDS, S3), RabbitMQ, Datadog
              </p>
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
        <div
          ref={businessRef}
          className={`flex-1 cursor-pointer group/caption shadow-lg hover:bg-slate-900 ease-in-out duration-300 rounded-2xl max-w-[300px] max-h-[300px] transition-all duration-700 delay-200 hover:scale-105 ${
            businessVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
          onClick={(e) => handleClick('businessDecisionModal')}
        >
          <figure className="relative">
            <Image
              src={businessDecision}
              alt="Business & Decision project - CRM Consultant role for Accor Hotels and other enterprise clients"
              className="rounded-2xl group-hover/caption:opacity-0 transition-opacity duration-300 ease-in-out w-[300px] h-[300px]"
            />
            <figcaption className="transition-opacity duration-300 ease-in-out flex flex-col justify-center absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 opacity-0 group-hover/caption:opacity-100 text-white">
              <AnimatedTitle
                level={1}
                delay={0}
                className="text-xl md:text-4xl"
              >
                Business & Decision
              </AnimatedTitle>
              <p className="hidden sm:block sm:text-base	md:text-2xl pt-2">
                Consultant for Accor Hotels
              </p>
            </figcaption>
          </figure>
          <dialog
            id="businessDecisionModal"
            className="modal modal-bottom sm:modal-middle cursor-default"
          >
            <div className="modal-box">
              <div className="flex items-center gap-4">
                <Image
                  src={businessDecision}
                  alt="Business & Decision project logo"
                  className="rounded-2xl w-[50px] h-[50px]"
                />
                <AnimatedTitle
                  level={3}
                  delay={0}
                  className="font-bold text-lg"
                >
                  Business & Decision
                </AnimatedTitle>
              </div>
              <p className="py-4 text-start">
                At Business & Decision, I worked as a CRM Consultant managing
                high-profile accounts including Accor Hotels and Norauto. I
                designed and implemented data management solutions that
                processed millions of customer records, resulting in 30%
                improved customer engagement rates. I led the migration of
                legacy systems to modern CRM platforms, reducing data processing
                time by 45%. My role involved creating ETL pipelines, optimizing
                database performance, and training client teams on new systems.
                I successfully delivered projects worth over €200K while
                maintaining 99.9% system uptime.
              </p>
              <p className="text-start">
                <b>Key Achievements:</b> 30% improved engagement • 45% faster
                processing • €200K+ projects delivered • 99.9% uptime
              </p>
              <p className="text-start">
                <b>Stack:</b> Adobe Campaign, Talend, Oracle SQL, PL/SQL, Data
                Modeling, ETL Processes
              </p>
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
        <div
          ref={openclassroomsRef}
          className={`flex-1 cursor-pointer group/caption shadow-lg hover:bg-slate-900 ease-in-out duration-300 rounded-2xl max-w-[300px] max-h-[300px] transition-all duration-700 delay-400 hover:scale-105 ${
            openclassroomsVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
          onClick={(e) => handleClick('openclassroomsModal')}
        >
          <figure className="relative">
            <Image
              src={openclassrooms}
              alt="OpenClassrooms project - Web Development Mentor role helping students learn React and modern JavaScript"
              className="rounded-2xl group-hover/caption:opacity-0 transition-opacity duration-300 ease-in-out w-[300px] h-[300px]"
            />
            <figcaption className="transition-opacity duration-300 ease-in-out flex flex-col justify-center absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 opacity-0 group-hover/caption:opacity-100 text-white">
              <AnimatedTitle
                level={1}
                delay={0}
                className="text-xl md:text-4xl"
              >
                Openclassrooms
              </AnimatedTitle>
              <p className="hidden sm:block sm:text-base	md:text-2xl pt-2">
                Mentor for Web Development
              </p>
            </figcaption>
          </figure>
          <dialog
            id="openclassroomsModal"
            className="modal modal-bottom sm:modal-middle cursor-default"
          >
            <div className="modal-box">
              <div className="flex items-center gap-4">
                <Image
                  src={openclassrooms}
                  alt="OpenClassrooms project logo"
                  className="rounded-2xl w-[50px] h-[50px]"
                />
                <AnimatedTitle
                  level={3}
                  delay={0}
                  className="font-bold text-lg"
                >
                  Openclassrooms
                </AnimatedTitle>
              </div>
              <p className="py-4 text-start">
                At OpenClassrooms, I mentor 50+ students in web development
                programs, with a 95% success rate in helping them complete their
                courses and land their first developer jobs. I provide
                personalized guidance on React, JavaScript, and modern web
                development practices. My mentoring approach includes code
                reviews, project feedback, and career guidance. I've helped
                students build portfolio projects that showcase real-world
                applications, with several mentees securing positions at tech
                companies including startups and established firms. I also
                contribute to curriculum development and best practices
                documentation.
              </p>
              <p className="text-start">
                <b>Key Achievements:</b> 95% student success rate • 50+ students
                mentored • Career placement support • Curriculum contributions
              </p>
              <p className="text-start">
                <b>Stack:</b> React, JavaScript (ES6+), HTML5, CSS3, Git,
                Node.js, Modern Development Tools
              </p>
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>
    </section>
  )
}
