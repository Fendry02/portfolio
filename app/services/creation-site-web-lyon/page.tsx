import Image from 'next/image'
import Link from 'next/link'

import electreauCapture from '@/public/works/electreau-capture.webp'
import petitNidCapture from '@/public/works/petitnid-capture.webp'
import vikoCapture from '@/public/works/chezviko-capture.webp'
import JsonLd from '@/app/components/json-ld'
import QClayMotion from '@/app/components/qclay-motion'
import {
  buildPageMetadata,
  createBreadcrumbJsonLd,
  createFaqPageJsonLd,
  createJsonLdGraph,
  createServiceJsonLd,
  createWebPageJsonLd,
  serviceRoutes,
} from '@/app/lib/seo'

const pagePath = serviceRoutes.websiteCreationLyon
const pageTitle = 'Création de site web à Lyon'
const pageDescription =
  'Création de site web professionnel à Lyon pour indépendants, artisans, cabinets et PME : stratégie, design, développement Next.js, SEO local, performance et mise en ligne.'

const faqItems = [
  {
    question: 'Combien de temps faut-il pour créer un site web professionnel ?',
    answer:
      'Pour un site vitrine clair avec quelques pages, le délai dépend surtout de la préparation des contenus et des validations. Je travaille généralement par étapes courtes : cadrage, structure, design, développement, mise en ligne et ajustements.',
  },
  {
    question:
      'Est-ce qu’un site sur mesure est utile pour une petite activité ?',
    answer:
      'Oui quand le site doit inspirer confiance, expliquer une offre et convertir des visiteurs en prises de contact. L’objectif n’est pas d’ajouter de la complexité, mais de construire une base rapide, lisible, durable et adaptée à l’activité.',
  },
  {
    question: 'Le référencement local est-il inclus ?',
    answer:
      'La base SEO est intégrée dès la conception : structure de page, titres, contenus, performance, données structurées, sitemap et balises sociales. Pour le référencement local, le contenu doit aussi utiliser les mots et contextes que vos clients recherchent réellement.',
  },
  {
    question: 'Peut-on faire évoluer le site après la mise en ligne ?',
    answer:
      'Oui. Je privilégie une base technique qui peut évoluer : ajout de pages services, cas clients, formulaire plus avancé, espace admin ou connexion à des outils métier.',
  },
] as const

const deliverables = [
  'Arborescence et messages clés',
  'Design responsive adapté à votre activité',
  'Développement Next.js rapide et maintenable',
  'Optimisation SEO technique et locale',
  'Formulaire de contact et tracking',
  'Mise en ligne, domaine et suivi post-lancement',
]

const processSteps = [
  {
    title: 'Clarifier l’objectif',
    text: 'On commence par le rôle réel du site : générer des demandes, présenter une activité, rassurer avant un rendez-vous ou soutenir une offre déjà vendue ailleurs.',
  },
  {
    title: 'Structurer le contenu',
    text: 'Je transforme les informations importantes en pages lisibles : offre, preuves, zone d’intervention, questions fréquentes, contact et éléments de confiance.',
  },
  {
    title: 'Construire une base fiable',
    text: 'Le site est développé avec une attention particulière à la performance, à l’accessibilité, au responsive et à la facilité d’évolution.',
  },
  {
    title: 'Publier et mesurer',
    text: 'La mise en ligne inclut les balises SEO, le sitemap, les données structurées et les outils de mesure pour suivre les contacts générés.',
  },
]

const examples = [
  {
    name: 'Chez Viko',
    type: 'Site vitrine pour restaurant',
    text: 'Un site public qui rend l’adresse plus crédible, facilite la découverte et donne rapidement les informations utiles.',
    image: vikoCapture,
    href: 'https://chezviko.fr',
  },
  {
    name: 'Electreau Lyon',
    type: 'Présence web locale',
    text: 'Un site pensé pour présenter une activité locale avec des informations claires et faciles à parcourir.',
    image: electreauCapture,
    href: 'https://www.electreau-lyon.fr/',
  },
  {
    name: 'Petit Nid',
    type: 'Produit web',
    text: 'Une expérience web plus orientée produit, avec une logique de confiance, de parcours et d’explication.',
    image: petitNidCapture,
    href: 'https://petitnid.app',
  },
]

export const metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  keywords: [
    'création site web Lyon',
    'création site internet Lyon',
    'développeur web Lyon',
    'site vitrine Lyon',
    'site web artisan Lyon',
    'site web PME Lyon',
    'référencement local Lyon',
  ],
})

const pageJsonLd = createJsonLdGraph([
  createWebPageJsonLd({
    path: pagePath,
    name: pageTitle,
    description: pageDescription,
  }),
  createServiceJsonLd({
    path: pagePath,
    name: pageTitle,
    description: pageDescription,
  }),
  createFaqPageJsonLd([...faqItems]),
  createBreadcrumbJsonLd([
    { name: 'Accueil', path: '/' },
    { name: 'Services', path: '/#offres' },
    { name: 'Création de site web à Lyon', path: pagePath },
  ]),
])

const eyebrow =
  'text-xs font-semibold uppercase tracking-[0.18em] text-base-content/65'
const sectionTitle =
  'text-[clamp(2.25rem,3.6vw,3.5rem)] font-semibold leading-[1.08] tracking-tight'
const bodyText = 'text-base leading-7 text-base-content/65'
const accent = 'var(--brand-blue)'
const btnBlue =
  'interactive qclay-button inline-flex items-center justify-center gap-2 rounded-lg bg-[color:var(--brand-blue)] px-5 py-3 text-sm font-medium text-white hover:bg-[color:var(--brand-blue-strong)]'
const btnGhost =
  'interactive qclay-button inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-medium text-base-content/70 hover:bg-base-200 hover:text-base-content'

export default function WebsiteCreationLyonPage() {
  return (
    <main className="bg-base-100 text-base-content">
      <JsonLd data={pageJsonLd} />
      <QClayMotion />

      <section className="qclay-hero relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 pb-16 pt-8 sm:gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:px-10 lg:pb-28 lg:pt-16">
          <div className="qclay-reveal-stack qclay-reveal-stack--hero flex flex-col justify-center">
            <p className={eyebrow}>Service web local</p>
            <h1 className="mt-4 text-[clamp(2.25rem,6vw,4.25rem)] font-semibold leading-[1.05] tracking-tight">
              Création de site web à Lyon pour une activité plus visible.
            </h1>
            <p className={`mt-6 max-w-2xl ${bodyText} md:text-lg md:leading-8`}>
              Je conçois et développe des sites web professionnels pour les
              indépendants, artisans, cabinets et PME qui veulent une présence
              en ligne claire, rapide et orientée prise de contact.
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

          <div className="qclay-reveal-stack grid gap-3 sm:grid-cols-2">
            {examples.map((example, index) => (
              <a
                key={example.name}
                href={example.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Visiter le site ${example.name}`}
                className={`interactive qclay-card qclay-tilt group cursor-pointer overflow-hidden rounded-xl border border-base-300 bg-base-100 focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-blue)] ${
                  index === 0 ? 'sm:col-span-2' : ''
                }`}
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-base-200">
                  <Image
                    src={example.image}
                    alt={`${example.name} - exemple de projet web`}
                    fill
                    sizes={
                      index === 0
                        ? '(max-width: 1024px) 100vw, 560px'
                        : '(max-width: 1024px) 50vw, 280px'
                    }
                    className="object-cover object-top transition duration-500 group-hover:scale-[1.02]"
                    priority={index === 0}
                  />
                </div>
                <div className="p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--brand-blue)]">
                    {example.type}
                  </p>
                  <h2 className="mt-1 text-lg font-semibold tracking-tight">
                    {example.name}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-base-content/65">
                    {example.text}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[color:var(--brand-blue)]">
                    Visiter le site
                    <span aria-hidden="true">→</span>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="qclay-section qclay-scroll-reveal cv-auto px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.38fr_0.62fr]">
          <div>
            <h2 className={sectionTitle}>
              Un site web ne sert pas seulement à exister en ligne.
            </h2>
          </div>

          <div className="space-y-6">
            <p className={bodyText}>
              Beaucoup de sites vitrines donnent une impression correcte, mais
              ne répondent pas aux questions qui bloquent une prise de contact :
              est-ce que cette personne comprend mon besoin, est-ce que son
              offre est claire, est-ce que je peux lui faire confiance, et
              quelle est la prochaine étape&nbsp;?
            </p>
            <p className={bodyText}>
              Mon travail consiste à relier le fond et la technique. Le contenu
              doit parler à vos clients, la navigation doit être évidente, et le
              socle technique doit aider le référencement au lieu de le
              freiner&nbsp;: pages rapides, structure propre, balises
              cohérentes, responsive et données structurées.
            </p>
            <p className={bodyText}>
              Pour une activité lyonnaise, le référencement local commence par
              une page qui explique précisément ce que vous proposez, à qui vous
              vous adressez et pourquoi vous êtes un choix crédible. Le site
              devient alors un support commercial, pas seulement une carte de
              visite.
            </p>
          </div>
        </div>
      </section>

      <section className="qclay-section qclay-scroll-reveal cv-auto border-y border-base-300 bg-base-200/50 px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className={eyebrow}>Ce qui est inclus</p>
            <h2 className={`mt-3 ${sectionTitle}`}>
              Une base complète pour lancer, mesurer et faire évoluer.
            </h2>
          </div>

          <ul className="qclay-reveal-grid mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {deliverables.map((item) => (
              <li
                key={item}
                className="qclay-subtle-card rounded-xl border border-base-300 bg-base-100 p-5 text-sm font-medium leading-6 text-base-content/75"
              >
                <span
                  aria-hidden="true"
                  className="mb-4 block h-1.5 w-8 rounded-full"
                  style={{ backgroundColor: accent }}
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="qclay-section qclay-scroll-reveal cv-auto px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <h2 className={sectionTitle}>
              Un accompagnement simple, du cadrage à la mise en ligne.
            </h2>
          </div>

          <ol className="qclay-reveal-grid mt-10 grid gap-4 sm:grid-cols-2">
            {processSteps.map((step) => (
              <li
                key={step.title}
                className="qclay-subtle-card rounded-xl border border-base-300 bg-base-100 p-5"
              >
                <h3 className="text-lg font-semibold tracking-tight">
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
          <div>
            <h2 className={sectionTitle}>
              Une approche utile pour les activités qui doivent inspirer
              confiance vite.
            </h2>
          </div>

          <div className="qclay-reveal-grid grid gap-4 sm:grid-cols-2">
            {[
              {
                title: 'Cabinets, professions libérales et indépendants',
                text: 'Rassurer avant un premier rendez-vous, avec une offre claire, des preuves visibles et un contact simple.',
              },
              {
                title: 'Artisans et entreprises locales',
                text: 'Être trouvé sur votre zone d’intervention et déclencher des demandes de devis plus qualifiées.',
              },
              {
                title: 'Restaurants, lieux et activités de proximité',
                text: 'Donner envie dès les premières secondes et rendre les infos pratiques immédiates.',
              },
              {
                title: 'PME qui veulent clarifier une offre ou un service',
                text: 'Clarifier votre proposition pour appuyer la prospection et faciliter les premiers échanges commerciaux.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="qclay-subtle-card rounded-xl border border-base-300 bg-base-100 p-5"
              >
                <p className="text-base font-semibold tracking-tight">
                  {item.title}
                </p>
                <p className="mt-2 text-sm leading-6 text-base-content/60">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="qclay-section qclay-scroll-reveal cv-auto px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.38fr_0.62fr]">
          <div>
            <h2 className={sectionTitle}>
              Les points à clarifier avant de lancer un site.
            </h2>
          </div>

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
          <div className="qclay-pill inline-flex items-center gap-2 rounded-full border border-base-300 px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-base-content/65">
            Réponse sous 24h ouvrées
          </div>
          <h2 className={`mt-5 ${sectionTitle}`}>
            Vous voulez un site plus clair, plus rapide, plus utile&nbsp;?
          </h2>
          <p className={`mt-5 ${bodyText}`}>
            Envoyez-moi quelques lignes sur votre activité, vos clients et ce
            que le site doit changer pour vous. Je vous réponds avec une
            première lecture concrète.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-2.5 sm:flex-row">
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
