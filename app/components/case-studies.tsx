'use client'

import Image, { type StaticImageData } from 'next/image'
import { useEffect, useRef, useState } from 'react'

import {
  getActiveProjectIndex,
  type ProjectVisibility,
} from '@/app/lib/project-gallery'
import electreauCapture from '@/public/works/electreau-capture.webp'
import petitNidCapture from '@/public/works/petitnid-capture.webp'
import vikoCapture from '@/public/works/chezviko-capture.webp'

type CaseStudy = {
  title: string
  scope: string
  image: StaticImageData
  imageAlt: string
  challenge: string
  solution: string
  impact: string
  href: string
}

const caseStudies: CaseStudy[] = [
  {
    title: 'Petit Nid',
    scope: 'Projet fondateur, application mobile de suivi bébé',
    image: petitNidCapture,
    imageAlt:
      'Capture du site Petit Nid présentant une application mobile de suivi bébé',
    challenge:
      'Expliquer un produit sensible en quelques secondes, sans noyer de jeunes parents dans une logique de tableau de bord.',
    solution:
      'Une page produit rassurante, mobile-first, qui met le bénéfice avant les fonctionnalités et guide vers l’inscription.',
    impact:
      'Une proposition lisible dès la première visite, un parcours clair et une base prête à évoluer.',
    href: 'https://petitnid.app',
  },
  {
    title: 'Electreau Lyon',
    scope: "Site vitrine d'électricien",
    image: electreauCapture,
    imageAlt:
      "Capture du site Electreau Lyon présentant les services d'un artisan local",
    challenge:
      "Un artisan lyonnais avait besoin d'une vitrine directe, rassurante et efficace sur mobile.",
    solution:
      'Services, avis, zones d’intervention et contact sont ramenés dans un parcours court.',
    impact:
      'Les demandes importantes sont plus faciles à qualifier dès le premier échange.',
    href: 'https://www.electreau-lyon.fr/',
  },
  {
    title: 'Chez Viko',
    scope: 'Site vitrine de pizzeria',
    image: vikoCapture,
    imageAlt: 'Capture du site Chez Viko, pizzeria au feu de bois à Lyon',
    challenge:
      'Donner envie avant la visite, tout en rendant les infos pratiques impossibles à rater.',
    solution:
      'La carte, les horaires, l’adresse et l’ambiance sont placés avant les détails secondaires.',
    impact:
      'Une adresse plus crédible en ligne et un parcours simple avant de réserver ou venir sur place.',
    href: 'https://chezviko.fr',
  },
]

const titleClass =
  'font-display text-[clamp(2.7rem,5.5vw,5.75rem)] font-semibold leading-[0.95] tracking-[-0.04em]'

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

  const activeCaseStudy = caseStudies[activeIndex]

  return (
    <section
      id="portfolio"
      aria-labelledby="realisations-heading"
      className="qclay-section qclay-flow-section qclay-flow-projects cv-auto py-24 lg:py-36"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[color:var(--brand-blue)]">
            Études de cas
          </p>
          <h2 id="realisations-heading" className={`${titleClass} mt-4`}>
            Des projets qui prouvent le raisonnement
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-base-content/65">
            Chaque projet part d’un blocage concret: inspirer confiance,
            clarifier une offre, ou rendre une action évidente sur mobile.
          </p>
        </div>

        <div className="qclay-project-gallery mt-14 lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(19rem,0.9fr)] lg:items-start lg:gap-12">
          <div className="qclay-project-stage lg:sticky lg:top-24">
            <div className="qclay-project-stage-topline">
              <span>La scène projet</span>
              <span aria-hidden="true">
                {String(activeIndex + 1).padStart(2, '0')} /{' '}
                {String(caseStudies.length).padStart(2, '0')}
              </span>
            </div>
            <div className="qclay-project-stage-screen" aria-hidden="true">
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
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 620px"
                    className="object-contain object-top"
                  />
                </figure>
              ))}
            </div>
            <div className="qclay-project-stage-caption">
              <p>{activeCaseStudy.scope}</p>
              <p className="font-display text-2xl font-semibold tracking-tight">
                {activeCaseStudy.title}
              </p>
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
                  <p className="qclay-project-number" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <p className="text-sm font-medium text-[color:var(--brand-blue)]">
                    {caseStudy.scope}
                  </p>
                  <h3 className="font-display mt-3 text-4xl font-semibold leading-none tracking-[-0.035em] text-base-content sm:text-5xl">
                    {caseStudy.title}
                  </h3>
                  <dl className="mt-8 grid gap-5">
                    {[
                      ['Le blocage', caseStudy.challenge],
                      ['La réponse', caseStudy.solution],
                      ['Ce que ça change', caseStudy.impact],
                    ].map(([label, text]) => (
                      <div key={label}>
                        <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-base-content/50">
                          {label}
                        </dt>
                        <dd className="mt-1.5 text-sm leading-6 text-base-content/72">
                          {text}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <a
                    href={caseStudy.href}
                    target="_blank"
                    rel="noreferrer"
                    className="interactive qclay-project-link mt-8 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-[color:var(--brand-blue)]"
                  >
                    Voir le site
                    <span aria-hidden="true">↗</span>
                  </a>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
