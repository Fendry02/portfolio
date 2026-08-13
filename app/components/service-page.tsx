import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'

import type { CaseStudy } from '@/app/lib/case-studies'
import type { ServicePath } from '@/app/lib/service-navigation'
import JsonLd from './json-ld'
import QClayMotion from './qclay-motion'
import {
  RelatedServiceLinks,
  ServiceResources,
} from './service-navigation'
import {
  createBreadcrumbJsonLd,
  createFaqPageJsonLd,
  createJsonLdGraph,
  createServiceJsonLd,
  createWebPageJsonLd,
} from '@/app/lib/seo'

type ServicePageProps = {
  path: ServicePath
  title: string
  description: string
  hero: string
  intro: string
  problemTitle: string
  problem: string[]
  deliverables: readonly string[]
  processSteps: ReadonlyArray<{ title: string; text: string }>
  audiences: ReadonlyArray<{ title: string; text: string }>
  faqItems: ReadonlyArray<{ question: string; answer: string }>
  visual: ReactNode
  relatedCaseStudies: readonly CaseStudy[]
}

const sectionTitle =
  'font-display text-[clamp(2.25rem,3.6vw,3.5rem)] font-semibold leading-[1.08] tracking-tight'
const bodyText = 'text-base leading-7 text-base-content/65'
const btnBlue =
  'interactive qclay-button inline-flex items-center justify-center gap-2 rounded-lg bg-[color:var(--brand-blue)] px-5 py-3 text-sm font-medium text-white hover:bg-[color:var(--brand-blue-strong)]'
const btnGhost =
  'interactive qclay-button inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-medium text-base-content/70 hover:bg-base-200 hover:text-base-content'

export default function ServicePage({
  path,
  title,
  description,
  hero,
  intro,
  problemTitle,
  problem,
  deliverables,
  processSteps,
  audiences,
  faqItems,
  visual,
  relatedCaseStudies,
}: ServicePageProps) {
  const pageJsonLd = createJsonLdGraph([
    createWebPageJsonLd({ path, name: title, description }),
    createServiceJsonLd({
      path,
      name: title,
      description,
      serviceType: title,
    }),
    createFaqPageJsonLd([...faqItems]),
    createBreadcrumbJsonLd([
      { name: 'Accueil', path: '/' },
      { name: 'Services', path: '/#offres' },
      { name: title, path },
    ]),
  ])

  return (
    <main className="bg-base-100 text-base-content">
      <JsonLd data={pageJsonLd} />
      <QClayMotion />

      <section className="qclay-hero relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 pb-16 pt-8 sm:gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:px-10 lg:pb-28 lg:pt-16">
          <div className="qclay-reveal-stack qclay-reveal-stack--hero flex flex-col justify-center">
            <h1 className="text-[clamp(2.25rem,6vw,4.25rem)] font-semibold leading-[1.05] tracking-tight">
              {hero}
            </h1>
            <p className={`mt-6 max-w-2xl ${bodyText} md:text-lg md:leading-8`}>
              {intro}
            </p>
            <div className="mt-8 flex flex-col gap-2.5 sm:flex-row">
              <Link href="/#contact" className={btnBlue}>
                Discuter de mon projet
                <span aria-hidden="true">→</span>
              </Link>
              <Link href="/#offres" className={btnGhost}>
                Voir les offres
              </Link>
            </div>
          </div>

          <div className="qclay-reveal-stack flex min-h-72 items-center justify-center rounded-2xl border border-base-300 bg-base-200/50 p-8 text-[color:var(--brand-blue)] sm:min-h-80 lg:min-h-96">
            {visual}
          </div>
        </div>
      </section>

      <section className="qclay-section qclay-scroll-reveal cv-auto px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.38fr_0.62fr]">
          <h2 className={sectionTitle}>{problemTitle}</h2>
          <div className="space-y-6">
            {problem.map((paragraph) => (
              <p key={paragraph} className={bodyText}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="qclay-section qclay-scroll-reveal cv-auto border-y border-base-300 bg-base-200/50 px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <h2 className={`max-w-2xl ${sectionTitle}`}>
            Ce qui est inclus pour avancer sans ajouter de complexité.
          </h2>
          <ul className="qclay-reveal-grid mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {deliverables.map((item) => (
              <li
                key={item}
                className="qclay-subtle-card rounded-xl border border-base-300 bg-base-100 p-5 text-sm font-medium leading-6 text-base-content/75"
              >
                <span
                  aria-hidden="true"
                  className="mb-4 block h-1.5 w-8 rounded-full bg-[color:var(--brand-blue)]"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="qclay-section qclay-scroll-reveal cv-auto px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <h2 className={`max-w-2xl ${sectionTitle}`}>
            Une méthode qui rend les décisions visibles.
          </h2>
          <ol className="qclay-reveal-grid mt-10 grid gap-4 sm:grid-cols-2">
            {processSteps.map((step, index) => (
              <li
                key={step.title}
                className="qclay-subtle-card rounded-xl border border-base-300 bg-base-100 p-5"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--brand-blue)]">
                  Étape {index + 1}
                </p>
                <h3 className="mt-2 text-lg font-semibold tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-base-content/65">
                  {step.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="qclay-section qclay-scroll-reveal cv-auto border-y border-base-300 px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.42fr_0.58fr]">
          <h2 className={sectionTitle}>Pour les équipes qui veulent agir.</h2>
          <div className="qclay-reveal-grid grid gap-4 sm:grid-cols-2">
            {audiences.map((audience) => (
              <article
                key={audience.title}
                className="qclay-subtle-card rounded-xl border border-base-300 bg-base-100 p-5"
              >
                <h3 className="text-base font-semibold tracking-tight">
                  {audience.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-base-content/60">
                  {audience.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <RelatedServiceLinks servicePath={path} />
      <ServiceResources servicePath={path} />

      {relatedCaseStudies.length > 0 && (
        <section className="qclay-section qclay-scroll-reveal cv-auto px-6 py-20 lg:px-10 lg:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <h2 className={`max-w-2xl ${sectionTitle}`}>
                Une réalisation qui montre cette approche en situation.
              </h2>
              <Link
                href="/realisations"
                className="interactive text-sm font-medium text-[color:var(--brand-blue)] hover:underline"
              >
                Voir toutes les réalisations
              </Link>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedCaseStudies.map((caseStudy) => (
                <Link
                  key={caseStudy.slug}
                  href={`/realisations/${caseStudy.slug}`}
                  className="interactive qclay-subtle-card group overflow-hidden rounded-xl border border-base-300 bg-base-100"
                >
                  <div className="relative aspect-[16/9] bg-base-200">
                    <Image
                      src={caseStudy.image}
                      alt={caseStudy.imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover object-top transition duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-sm text-base-content/60">
                      {caseStudy.sector}
                    </p>
                    <h3 className="mt-1 text-xl font-semibold tracking-tight">
                      {caseStudy.client}
                    </h3>
                    <span className="mt-4 inline-flex text-sm font-medium text-[color:var(--brand-blue)]">
                      Lire l’étude de cas →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="qclay-section qclay-scroll-reveal cv-auto px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.38fr_0.62fr]">
          <h2 className={sectionTitle}>
            Les questions à clarifier avant de démarrer.
          </h2>
          <div className="qclay-reveal-grid divide-y divide-base-300 border-y border-base-300">
            {faqItems.map((item) => (
              <article key={item.question} className="py-6">
                <h3 className="text-lg font-semibold tracking-tight">
                  {item.question}
                </h3>
                <p className="mt-3 text-sm leading-6 text-base-content/65">
                  {item.answer}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="qclay-section qclay-scroll-reveal cv-auto border-t border-base-300 px-6 py-20 text-center lg:px-10 lg:py-24">
        <div className="qclay-reveal-stack mx-auto max-w-2xl">
          <h2 className={sectionTitle}>Parlons du problème à résoudre.</h2>
          <p className={`mt-5 ${bodyText}`}>
            Quelques lignes sur le contexte, les personnes concernées et le
            résultat attendu suffisent pour démarrer une première lecture.
          </p>
          <div className="mt-8 flex justify-center">
            <Link href="/#contact" className={btnBlue}>
              Discuter de mon projet
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
