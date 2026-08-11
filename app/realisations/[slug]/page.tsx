import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import JsonLd from '@/app/components/json-ld'
import { caseStudies, getCaseStudyBySlug } from '@/app/lib/case-studies'
import {
  absoluteUrl,
  buildPageMetadata,
  createBreadcrumbJsonLd,
  createJsonLdGraph,
  siteConfig,
} from '@/app/lib/seo'

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return caseStudies.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const caseStudy = getCaseStudyBySlug(slug)

  if (!caseStudy) {
    return {}
  }

  return buildPageMetadata({
    title: `${caseStudy.client} — ${caseStudy.sector}`,
    description: `${caseStudy.client} : ${caseStudy.challenge}`,
    path: `/realisations/${caseStudy.slug}`,
  })
}

const sectionTitle =
  'font-display text-[clamp(2.1rem,3.6vw,3.25rem)] font-semibold leading-[1.08] tracking-tight'
const bodyText = 'text-base leading-7 text-base-content/65'

export default async function CaseStudyDetailPage({ params }: PageProps) {
  const { slug } = await params
  const caseStudy = getCaseStudyBySlug(slug)

  if (!caseStudy) {
    notFound()
  }

  const pagePath = `/realisations/${caseStudy.slug}`
  const pageUrl = absoluteUrl(pagePath)
  const imageId = `${pageUrl}#image`
  const pageJsonLd = createJsonLdGraph([
    {
      '@type': 'Article',
      '@id': `${pageUrl}#article`,
      mainEntityOfPage: pageUrl,
      headline: `${caseStudy.client} — ${caseStudy.sector}`,
      description: caseStudy.challenge,
      datePublished: caseStudy.publishedAt,
      dateModified: caseStudy.publishedAt,
      image: { '@id': imageId },
      author: { '@id': absoluteUrl('/#person') },
      publisher: { '@id': absoluteUrl('/#person') },
      inLanguage: siteConfig.language,
    },
    {
      '@type': 'ImageObject',
      '@id': imageId,
      contentUrl: absoluteUrl(caseStudy.image),
      caption: caseStudy.imageAlt,
    },
    createBreadcrumbJsonLd([
      { name: 'Accueil', path: '/' },
      { name: 'Réalisations', path: '/realisations' },
      { name: caseStudy.client, path: pagePath },
    ]),
  ])

  return (
    <main className="bg-base-100 text-base-content">
      <JsonLd data={pageJsonLd} />

      <section className="qclay-hero px-6 pb-16 pt-16 lg:px-10 lg:pb-24 lg:pt-24">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-sm font-medium text-[color:var(--brand-blue)]">
              {caseStudy.sector} · {caseStudy.city}
            </p>
            <h1 className="mt-4 text-[clamp(2.6rem,5vw,4.75rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
              {caseStudy.client}, {caseStudy.sector.toLocaleLowerCase('fr')}
            </h1>
            <p className={`mt-7 ${bodyText} md:text-lg md:leading-8`}>
              {caseStudy.scope}
            </p>
          </div>
          <figure className="relative aspect-[16/10] overflow-hidden rounded-xl border border-base-300 bg-base-200">
            <Image
              src={caseStudy.image}
              alt={caseStudy.imageAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover object-top"
            />
          </figure>
        </div>
      </section>

      <section className="qclay-section qclay-scroll-reveal cv-auto border-t border-base-300 px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.38fr_0.62fr]">
          <h2 className={sectionTitle}>Le contexte</h2>
          <p className={bodyText}>
            {caseStudy.client} avait besoin d’une présence numérique qui serve
            d’abord les personnes concernées par son activité, avec une lecture
            claire dès les premières secondes.
          </p>
        </div>
      </section>

      <section className="qclay-section qclay-scroll-reveal cv-auto border-t border-base-300 px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.38fr_0.62fr]">
          <h2 className={sectionTitle}>Le blocage</h2>
          <p className={bodyText}>{caseStudy.challenge}</p>
        </div>
      </section>

      <section className="qclay-section qclay-scroll-reveal cv-auto border-y border-base-300 bg-base-200/50 px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.38fr_0.62fr]">
          <h2 className={sectionTitle}>La réponse</h2>
          <p className={bodyText}>{caseStudy.solution}</p>
        </div>
      </section>

      <section className="qclay-section qclay-scroll-reveal cv-auto border-b border-base-300 px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.38fr_0.62fr]">
          <h2 className={sectionTitle}>Ce que cela change</h2>
          <p className={bodyText}>{caseStudy.impact}</p>
        </div>
      </section>

      <section className="qclay-section qclay-scroll-reveal cv-auto px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.38fr_0.62fr]">
          <h2 className={sectionTitle}>Le socle</h2>
          <div>
            <ul className="flex flex-wrap gap-2">
              {caseStudy.stack.map((item) => (
                <li
                  key={item}
                  className="rounded-lg border border-base-300 px-3 py-2 text-sm font-medium text-base-content/70"
                >
                  {item}
                </li>
              ))}
            </ul>
            <a
              href={caseStudy.href}
              target="_blank"
              rel="noreferrer"
              className="interactive mt-8 inline-flex text-sm font-medium text-[color:var(--brand-blue)] hover:underline"
            >
              Voir le site en ligne ↗
            </a>
          </div>
        </div>
      </section>

      <section className="qclay-section qclay-scroll-reveal cv-auto border-t border-base-300 px-6 py-20 text-center lg:px-10 lg:py-24">
        <div className="qclay-reveal-stack mx-auto max-w-2xl">
          <h2 className={sectionTitle}>Un besoin comparable&nbsp;?</h2>
          <p className={`mt-5 ${bodyText}`}>
            Découvrez l’accompagnement qui correspond à ce type de projet, ou
            partagez directement le contexte du vôtre.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-2.5 sm:flex-row">
            <Link
              href={caseStudy.relatedService}
              className="interactive qclay-button inline-flex items-center justify-center gap-2 rounded-lg bg-[color:var(--brand-blue)] px-5 py-3 text-sm font-medium text-white hover:bg-[color:var(--brand-blue-strong)]"
            >
              Découvrir le service associé
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/realisations"
              className="interactive qclay-button inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-medium text-base-content/70 hover:bg-base-200 hover:text-base-content"
            >
              Voir les autres réalisations
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
