import Image from 'next/image'
import Link from 'next/link'

import JsonLd from '@/app/components/json-ld'
import { caseStudies } from '@/app/lib/case-studies'
import {
  absoluteUrl,
  buildPageMetadata,
  createBreadcrumbJsonLd,
  createJsonLdGraph,
  siteConfig,
} from '@/app/lib/seo'

const pagePath = '/realisations'
const pageTitle = 'Réalisations web et applications'
const pageDescription =
  'Études de cas de Benoit Bruynbroeck : sites web, applications et expériences numériques conçus pour clarifier une offre et aider une activité à avancer.'

export const metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
})

const pageJsonLd = createJsonLdGraph([
  {
    '@type': 'CollectionPage',
    '@id': `${absoluteUrl(pagePath)}#collection-page`,
    url: absoluteUrl(pagePath),
    name: pageTitle,
    description: pageDescription,
    inLanguage: siteConfig.language,
  },
  {
    '@type': 'ItemList',
    name: 'Études de cas',
    itemListElement: caseStudies.map((caseStudy, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: caseStudy.title,
      url: absoluteUrl(`/realisations/${caseStudy.slug}`),
    })),
  },
  createBreadcrumbJsonLd([
    { name: 'Accueil', path: '/' },
    { name: 'Réalisations', path: pagePath },
  ]),
])

const sectionTitle =
  'font-display text-[clamp(2.25rem,3.6vw,3.5rem)] font-semibold leading-[1.08] tracking-tight'

export default function CaseStudiesPage() {
  return (
    <main className="bg-base-100 text-base-content">
      <JsonLd data={pageJsonLd} />

      <section className="qclay-hero px-6 pb-16 pt-16 lg:px-10 lg:pb-24 lg:pt-24">
        <div className="mx-auto max-w-6xl">
          <h1 className="max-w-4xl text-[clamp(2.6rem,6vw,5.25rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
            Des réalisations qui partent d’un problème concret.
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-7 text-base-content/70 md:text-lg md:leading-8">
            Chaque étude de cas montre le contexte, le blocage et la réponse
            apportée — sans prétendre transformer un projet en recette
            universelle.
          </p>
        </div>
      </section>

      <section className="qclay-section qclay-scroll-reveal cv-auto border-t border-base-300 px-6 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((caseStudy) => (
            <article
              key={caseStudy.slug}
              className="qclay-subtle-card group overflow-hidden rounded-xl border border-base-300 bg-base-100"
            >
              <div className="relative aspect-[16/10] bg-base-200">
                <Image
                  src={caseStudy.image}
                  alt={caseStudy.imageAlt}
                  fill
                  sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                  className="object-cover object-top transition duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <div className="p-6">
                <p className="text-sm font-medium text-[color:var(--brand-blue)]">
                  {caseStudy.sector} · {caseStudy.city}
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                  {caseStudy.client}
                </h2>
                <p className="mt-4 text-sm leading-6 text-base-content/65">
                  {caseStudy.challenge}
                </p>
                <Link
                  href={`/realisations/${caseStudy.slug}`}
                  className="interactive mt-6 inline-flex text-sm font-medium text-[color:var(--brand-blue)] hover:underline"
                >
                  Lire l’étude de cas →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="qclay-section qclay-scroll-reveal cv-auto border-t border-base-300 px-6 py-20 text-center lg:px-10 lg:py-24">
        <div className="qclay-reveal-stack mx-auto max-w-2xl">
          <h2 className={sectionTitle}>
            Un projet à clarifier ou à construire&nbsp;?
          </h2>
          <p className="mt-5 text-base leading-7 text-base-content/65">
            Décrivez le point qui bloque aujourd’hui. Nous verrons ensemble si
            un site, une application ou une automatisation peut vraiment le
            faire avancer.
          </p>
          <Link
            href="/#contact"
            className="interactive qclay-button mt-8 inline-flex items-center gap-2 rounded-lg bg-[color:var(--brand-blue)] px-5 py-3 text-sm font-medium text-white hover:bg-[color:var(--brand-blue-strong)]"
          >
            Discuter de mon projet
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  )
}
