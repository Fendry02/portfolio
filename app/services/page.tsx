import Link from 'next/link'

import JsonLd from '@/app/components/json-ld'
import {
  absoluteUrl,
  buildPageMetadata,
  createBreadcrumbJsonLd,
  createJsonLdGraph,
  serviceOffers,
  serviceRoutes,
  siteConfig,
} from '@/app/lib/seo'

const pageTitle = 'Services web et automatisation à Lyon'
const pageDescription =
  'Développeur freelance à Lyon : création de site web, application métier sur mesure, automatisation n8n et formation IA. Choisissez selon votre besoin.'

export const metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: '/services',
})

const situations: Record<string, string> = {
  [serviceRoutes.websiteCreationLyon]:
    'Votre activité manque de visibilité ou votre site explique mal ce que vous proposez. Vous voulez présenter vos services et faciliter la prise de contact.',
  [serviceRoutes.customAppLyon]:
    'Vos fichiers et logiciels ne suffisent plus pour suivre votre activité. Vous avez besoin d’un espace de travail adapté à vos utilisateurs et à vos règles métier.',
  [serviceRoutes.automationN8nLyon]:
    'Votre équipe recopie des informations entre plusieurs outils, relance manuellement les demandes ou prépare toujours les mêmes rapports.',
  [serviceRoutes.aiTrainingLyon]:
    'Votre équipe veut utiliser l’IA dans son travail. Vous cherchez des ateliers pratiques, des cas d’usage adaptés et une méthode pour vérifier les résultats.',
}

const pageJsonLd = createJsonLdGraph([
  {
    '@type': 'CollectionPage',
    '@id': `${absoluteUrl('/services')}#collection-page`,
    url: absoluteUrl('/services'),
    name: pageTitle,
    description: pageDescription,
    inLanguage: siteConfig.language,
    isPartOf: { '@id': absoluteUrl('/#website') },
  },
  {
    '@type': 'ItemList',
    name: pageTitle,
    itemListElement: serviceOffers.map((offer, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: offer.name,
      url: absoluteUrl(offer.url),
    })),
  },
  createBreadcrumbJsonLd([
    { name: 'Accueil', path: '/' },
    { name: 'Services', path: '/services' },
  ]),
])

export default function ServicesPage() {
  return (
    <main className="bg-base-100 text-base-content">
      <JsonLd data={pageJsonLd} />
      <section className="qclay-hero px-6 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <h1 className="max-w-4xl text-[clamp(2.6rem,6vw,5.25rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
            Services web et automatisation à Lyon.
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-7 text-base-content/70 md:text-lg md:leading-8">
            Je suis Benoit Bruynbroeck, développeur web freelance à Lyon.
            J’accompagne les PME, artisans et indépendants pour créer leur
            présence en ligne, développer un outil métier ou connecter leurs
            logiciels. Voici les quatre façons de travailler ensemble.
          </p>
        </div>
      </section>
      <section className="border-y border-base-300 px-6 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl font-semibold tracking-tight">
            Quel problème voulez-vous résoudre ?
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {serviceOffers.map((offer) => (
              <article
                key={offer.url}
                className="rounded-xl border border-base-300 p-6 sm:p-8"
              >
                <h3 className="text-2xl font-semibold tracking-tight">
                  <Link
                    href={offer.url}
                    className="interactive hover:text-[color:var(--brand-blue)]"
                  >
                    {offer.name}
                  </Link>
                </h3>
                <p className="mt-4 text-base leading-7 text-base-content/70">
                  {situations[offer.url]}
                </p>
                <p className="mt-4 text-sm leading-6 text-base-content/60">
                  {offer.description}
                </p>
                <Link
                  href={offer.url}
                  className="interactive mt-6 inline-flex text-sm font-medium text-[color:var(--brand-blue)] hover:underline"
                >
                  {offer.name} à Lyon →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="px-6 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-tight">
              Un projet qui touche plusieurs services ?
            </h2>
            <p className="mt-5 text-base leading-7 text-base-content/70">
              Un site peut alimenter votre CRM, une application peut déclencher
              un workflow n8n et une formation peut préparer l’adoption de ces
              outils. On commence par votre priorité, puis on délimite une
              première étape réalisable. Je travaille depuis Lyon, avec des
              échanges à distance selon le projet.
            </p>
            <Link
              href="/#contact"
              className="interactive mt-6 inline-flex rounded-lg bg-[color:var(--brand-blue)] px-5 py-3 text-sm font-medium text-white"
            >
              Discuter de mon projet
            </Link>
          </div>
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-tight">
              Préparer votre décision
            </h2>
            <p className="mt-5 text-base leading-7 text-base-content/70">
              Les réalisations montrent les projets livrés. Les guides
              détaillent les questions à poser avant de choisir une solution ou
              de demander un devis.
            </p>
            <div className="mt-6 flex flex-wrap gap-6 text-sm font-medium text-[color:var(--brand-blue)]">
              <Link
                href="/realisations"
                className="interactive hover:underline"
              >
                Voir les réalisations web et applications →
              </Link>
              <Link href="/blog" className="interactive hover:underline">
                Lire les guides web et n8n →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
