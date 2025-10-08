'use client'

import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { AnimatedTitle } from './ui'

export default function Timeline() {
  const { ref: timelineRef, isVisible: timelineVisible } =
    useScrollAnimation<HTMLUListElement>()

  return (
    <section className="p-16 max-sm:p-8">
      <AnimatedTitle level={1} delay={0} className="text-center">
        Timeline
      </AnimatedTitle>
      <ul
        ref={timelineRef}
        className={`timeline timeline-snap-icon max-md:timeline-compact timeline-vertical pt-8 transition-all duration-700 delay-200 ${
          timelineVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8'
        }`}
      >
        <li>
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="timeline-start mb-10 md:text-end">
            <time className="font-mono italic">2011-2016</time>
            <div className="text-lg font-black">ESIEE Amiens</div>
            Engineering degree in computer science
            <br />
            <span className="text-sm text-secondary">
              Specialized in software engineering and database systems
            </span>
          </div>
          <hr />
        </li>
        <li>
          <hr />
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="timeline-end md:mb-10">
            <time className="font-mono italic">2016-2017</time>
            <div className="text-lg font-black">PrixLibre</div>
            Junior Developer at PrixLibre <br />
            Built e-commerce platform features using PHP and AngularJS
            <br />
            <span className="text-sm text-secondary">
              First professional experience in startup environment
            </span>
          </div>
          <hr />
        </li>
        <li>
          <hr />
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="timeline-start mb-10 md:text-end">
            <time className="font-mono italic">2017-2019</time>
            <div className="text-lg font-black">Business & Decisions</div>
            CRM Consultant at Business & Decisions <br />
            Managed high-profile accounts (Accor Hotels, Norauto)
            <br />
            <span className="text-sm text-secondary">
              Delivered €200K+ projects • 30% improved customer engagement
            </span>
          </div>
          <hr />
        </li>
        <li>
          <hr />
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="timeline-end md:mb-10">
            <time className="font-mono italic">2019-now</time>
            <div className="text-lg font-black">CitizenPlane</div>
            Tech Lead at CitizenPlane <br />
            Leading team of 4+ developers
            <br />
            <span className="text-sm text-secondary">
              Scalable travel platform
            </span>
          </div>
          <hr />
        </li>
      </ul>
    </section>
  )
}
