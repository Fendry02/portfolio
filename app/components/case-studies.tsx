'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import {
  getActiveProjectIndex,
  type ProjectVisibility,
} from '@/app/lib/project-gallery'
import { caseStudies } from '@/app/lib/case-studies'

const titleClass =
  'font-display text-[clamp(2.4rem,5vw,4.75rem)] font-semibold leading-[0.98] tracking-[-0.035em]'

export default function CaseStudies() {
  const [activeIndex, setActiveIndex] = useState(0)
  const projectRefs = useRef<(HTMLElement | null)[]>([])
  const visibilityRef = useRef(new Map<number, ProjectVisibility>())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const index = Number(
            (entry.target as HTMLElement).dataset.projectIndex,
          )

          if (!Number.isInteger(index)) {
            continue
          }

          visibilityRef.current.set(index, {
            index,
            isIntersecting: entry.isIntersecting,
            intersectionRatio: entry.intersectionRatio,
          })
        }

        setActiveIndex((currentIndex) =>
          getActiveProjectIndex(
            Array.from(visibilityRef.current.values()),
            currentIndex,
          ),
        )
      },
      {
        rootMargin: '-24% 0px -34% 0px',
        threshold: [0, 0.2, 0.45, 0.7],
      },
    )

    for (const project of projectRefs.current) {
      if (project) {
        observer.observe(project)
      }
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="portfolio"
      aria-labelledby="realisations-heading"
      className="qclay-section qclay-flow-section qclay-flow-projects cv-auto py-24 lg:py-36"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="max-w-3xl">
          <h2 id="realisations-heading" className={titleClass}>
            Quatre projets, vus de près.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-7 text-base-content/70 md:text-lg md:leading-8">
            Chaque projet part d’un blocage concret : inspirer confiance,
            clarifier une offre ou rendre une action évidente sur mobile.
          </p>
        </div>

        <div className="qclay-project-gallery mt-14 lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(19rem,0.9fr)] lg:items-start lg:gap-12">
          <div className="qclay-project-stage lg:sticky lg:top-24">
            <div
              className="qclay-project-stage-screen"
              aria-hidden="true"
              data-motion="picture"
            >
              {caseStudies.map((caseStudy, index) => (
                <figure
                  key={caseStudy.title}
                  className={
                    index === activeIndex
                      ? 'qclay-project-stage-image is-active'
                      : 'qclay-project-stage-image'
                  }
                >
                  <Image
                    src={caseStudy.image}
                    alt={caseStudy.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 620px"
                    className="object-contain object-top"
                  />
                </figure>
              ))}
            </div>
          </div>

          <div className="qclay-project-list">
            {caseStudies.map((caseStudy, index) => {
              const isActive = index === activeIndex

              return (
                <article
                  key={caseStudy.title}
                  ref={(element) => {
                    projectRefs.current[index] = element
                  }}
                  data-project-index={index}
                  data-active={isActive ? 'true' : 'false'}
                  className="qclay-project-narrative"
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocusCapture={() => setActiveIndex(index)}
                >
                  <h3 className="font-display text-4xl font-semibold leading-none tracking-[-0.035em] text-base-content sm:text-5xl">
                    {caseStudy.title}
                  </h3>
                  <p className="mt-3 text-base font-medium text-[color:var(--brand-blue)]">
                    {caseStudy.scope}
                  </p>
                  <dl className="mt-8 grid gap-5">
                    {[
                      ['Le blocage', caseStudy.challenge],
                      ['La réponse', caseStudy.solution],
                      ['Ce que ça change', caseStudy.impact],
                    ].map(([label, text]) => (
                      <div key={label}>
                        <dt className="text-sm font-semibold text-base-content/60">
                          {label}
                        </dt>
                        <dd className="mt-1 text-base leading-7 text-base-content/75">
                          {text}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                    <Link
                      href={
                        'productPage' in caseStudy
                          ? caseStudy.productPage
                          : `/realisations/${caseStudy.slug}`
                      }
                      className="interactive qclay-project-link inline-flex w-fit items-center gap-1.5 text-sm font-medium text-[color:var(--brand-blue)]"
                    >
                      {'productPage' in caseStudy
                        ? `Découvrir ${caseStudy.title}`
                        : 'Lire l’étude de cas'}
                      <span aria-hidden="true">→</span>
                    </Link>
                    <a
                      href={caseStudy.href}
                      target="_blank"
                      rel="noreferrer"
                      className="interactive qclay-project-link inline-flex w-fit items-center gap-1.5 text-sm font-medium text-base-content/70"
                    >
                      Voir le site
                      <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
