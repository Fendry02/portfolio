import Image from 'next/image'
import Link from 'next/link'

import citizenplane from '@/public/works/citizenplane.webp'
import businessDecision from '@/public/works/business-decision.webp'
import openclassrooms from '@/public/works/openclassrooms.webp'
import electreau from '@/public/works/electreau.png'
import petitnid from '@/public/works/petitnid.png'
import viko from '@/public/works/viko.jpg'
import OffersAccordion from './components/offers-accordion'
import ContactForm from './components/contact-form'
import CaseStudies from './components/case-studies'
import Testimonials from './components/testimonials'
import RevealWords from './components/reveal-words'
import ScrollStory from './components/scroll-story'
import type { WordSegment } from './components/reveal-words'
import JsonLd from './components/json-ld'
import {
  buildPageMetadata,
  createBreadcrumbJsonLd,
  createJsonLdGraph,
  createWebPageJsonLd,
  personJsonLd,
  professionalServiceJsonLd,
  serviceRoutes,
  siteConfig,
  websiteJsonLd,
} from './lib/seo'

type Offer = {
  accent: string
  icon: 'website' | 'app' | 'automation' | 'training'
  title: string
  desc: string
  detail: string
  bullets: string[]
  examples: string[]
}

const offers: Offer[] = [
  {
    accent: 'var(--brand-blue)',
    icon: 'website',
    title: 'Site web vitrine',
    desc: 'Une présence en ligne claire et rapide qui inspire confiance et déclenche la prise de contact.',
    detail:
      'Un site clair et rapide, pensé pour convertir vos visiteurs en prospects. Je m’occupe de tout, du design à la mise en ligne, pour une présence professionnelle qui vous ressemble.',
    bullets: [
      'Design responsive sur mesure',
      'Optimisation SEO & performance',
      'Formulaire de contact & analytics',
      'Hébergement & mise en ligne',
    ],
    examples: [
      'Le site d’un cabinet (kiné, avocat, architecte) avec prise de rendez-vous',
      'La vitrine d’un artisan ou restaurant avec galerie, menu et formulaire de contact',
    ],
  },
  {
    accent: 'var(--brand-mint)',
    icon: 'app',
    title: 'Application web et mobile',
    desc: 'Un outil sur mesure, web et mobile, conçu pour répondre à un besoin métier spécifique et s’intégrer à votre activité.',
    detail:
      'Une application taillée pour votre métier, accessible sur le web comme sur mobile, qui s’intègre à vos outils existants et évolue avec votre activité.',
    bullets: [
      'Cadrage du besoin & des parcours',
      'Espace utilisateur & back-office',
      'Intégrations & API tierces',
      'Déploiement web et mobile',
    ],
    examples: [
      'Un outil de gestion de plannings pour une équipe terrain',
      'Une application de mise en devis rapide pour un menuisier',
    ],
  },
  {
    accent: 'var(--brand-violet)',
    icon: 'automation',
    title: 'Automatisation n8n et IA',
    desc: 'Je connecte vos outils avec n8n et automatise les tâches répétitives qui freinent votre activité.',
    detail:
      'J’analyse vos processus, puis je conçois des workflows n8n fiables pour faire circuler les données, déclencher les bonnes actions et intégrer l’IA quand elle apporte une valeur réelle.',
    bullets: [
      'Audit des processus & gains attendus',
      'Workflows n8n & intégrations API',
      'Gestion des erreurs & supervision',
      'Documentation & maintenance',
    ],
    examples: [
      'Synchroniser un formulaire, le CRM et les relances commerciales',
      'Trier les demandes entrantes et alerter automatiquement la bonne équipe',
    ],
  },
  {
    accent: 'var(--brand-amber)',
    icon: 'training',
    title: 'Formation IA',
    desc: 'Je forme vos équipes à utiliser l’IA au quotidien, concrètement et sans jargon.',
    detail:
      'Des sessions pratiques pour rendre vos équipes autonomes avec l’IA, adaptées à votre secteur et à vos cas d’usage réels, du débutant au plus avancé.',
    bullets: [
      'Ateliers adaptés à vos métiers',
      'Cas d’usage concrets & prompts',
      'Bonnes pratiques & limites',
      'Support & suivi post-formation',
    ],
    examples: [
      'Former une équipe marketing à rédiger plus vite avec l’IA',
      'Atelier « prompts » pour automatiser les réponses du support client',
    ],
  },
]

type TrustEntry = {
  name: string
  href: string
  src: typeof citizenplane
  proof: string
}

const trustLogos: TrustEntry[] = [
  {
    name: 'CitizenPlane',
    src: citizenplane,
    href: 'https://citizenplane.com',
    proof: 'Plateforme B2B et flux produit à fort trafic',
  },
  {
    name: 'OpenClassrooms',
    src: openclassrooms,
    href: 'https://openclassrooms.com',
    proof: 'Mentorat et revues de projets JavaScript',
  },
  {
    name: 'Business & Decision',
    src: businessDecision,
    href: 'https://www.businessdecision.com/',
    proof: 'CRM, data et intégrations grands comptes',
  },
  {
    name: 'Electreau Lyon',
    src: electreau,
    href: 'https://www.electreau-lyon.fr/',
    proof: 'Site local pensé pour les demandes qualifiées',
  },
  {
    name: 'Petit Nid',
    src: petitnid,
    href: 'https://petitnid.app',
    proof: 'Produit mobile et expérience d’inscription',
  },
  {
    name: 'Chez Viko',
    src: viko,
    href: 'https://chezviko.fr',
    proof: 'Vitrine restaurant, infos pratiques immédiates',
  },
]

const homeTitle = siteConfig.defaultTitle
const homeDescription = siteConfig.description

export const metadata = buildPageMetadata({
  title: homeTitle,
  description: homeDescription,
  path: '/',
  keywords: [
    'création site internet',
    'création site web professionnel',
    'application web sur mesure',
    'automatisation n8n',
    'expert n8n Lyon',
    'workflow n8n',
    'développeur web freelance',
    'développeur web freelance Lyon',
    'freelance dev Lyon',
    'développeur full stack',
    'portfolio développeur web',
    'Next.js',
    'React',
    'Node.js',
    'PostgreSQL',
  ],
})

const homeJsonLd = createJsonLdGraph([
  personJsonLd,
  websiteJsonLd,
  professionalServiceJsonLd,
  createWebPageJsonLd({
    path: '/',
    name: homeTitle,
    description: homeDescription,
  }),
  createBreadcrumbJsonLd([{ name: 'Accueil', path: '/' }]),
])

/* ─── Shared typography tokens (kept consistent across sections) ───────── */
const sectionTitle =
  'font-display text-[clamp(2.25rem,3.6vw,3.5rem)] font-semibold leading-[1.08] tracking-tight'
const contactHeading: readonly WordSegment[] = [
  { text: 'Parlons' },
  { text: 'de' },
  { text: 'votre' },
  { text: 'projet.', accent: true },
]

export default function Home() {
  return (
    <main className="qclay-home relative isolate bg-base-100 text-base-content">
      <JsonLd data={homeJsonLd} />
      <div className="qclay-scroll-scene" aria-hidden="true">
        <span className="qclay-scene-shape qclay-scene-shape--blue" />
        <span className="qclay-scene-shape qclay-scene-shape--mint" />
        <span className="qclay-scene-shape qclay-scene-shape--violet" />
      </div>
      <ScrollStory />

      {/* ──────────────────── TRUST STRIP / CLIENTS ──────────────────── */}
      <section
        aria-labelledby="trust-heading"
        className="qclay-trust qclay-flow-section qclay-flow-trust py-20 lg:py-28"
      >
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <h2
            id="trust-heading"
            className="font-display max-w-3xl text-[clamp(2.4rem,5vw,5.25rem)] font-semibold leading-[0.96] tracking-[-0.04em]"
          >
            Des produits et des équipes qui ne peuvent pas se contenter de
            l’à-peu-près.
          </h2>
          <div className="qclay-logo-row mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {trustLogos.map((entry) => (
              <a
                key={entry.name}
                href={entry.href}
                target="_blank"
                rel="noreferrer"
                className="qclay-flow-trust-entry interactive group flex items-center gap-3 p-3"
              >
                <Image
                  src={entry.src}
                  alt=""
                  width={44}
                  height={44}
                  className="h-11 w-11 shrink-0 rounded-lg object-cover transition group-hover:scale-[1.03]"
                />
                <span>
                  <span className="block text-sm font-semibold tracking-tight text-base-content">
                    {entry.name}
                  </span>
                  <span className="mt-0.5 block text-xs leading-5 text-base-content/55">
                    {entry.proof}
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────── OFFRES / PROPOSITIONS ──────────────────── */}
      <section
        id="offres"
        aria-labelledby="offers-heading"
        className="qclay-section qclay-flow-section qclay-flow-offers qclay-scroll-reveal cv-auto py-24 lg:py-36"
      >
        <div className="qclay-reveal-grid mx-auto max-w-6xl px-6 lg:px-10">
          <div className="max-w-3xl">
            <h2
              id="offers-heading"
              className="font-display text-[clamp(2.6rem,5.5vw,5.75rem)] font-semibold leading-[0.95] tracking-[-0.04em]"
            >
              Les bonnes décisions rendent tout le reste plus simple.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-7 text-base-content/70 md:text-lg md:leading-8">
              Du premier échange à la mise en ligne, je donne une forme utile à
              ce qui doit faire avancer votre activité.
            </p>
          </div>

          <OffersAccordion offers={offers} />

          <div className="qclay-flow-routes mt-12 grid gap-4 md:grid-cols-2">
            <article className="qclay-flow-route p-6 sm:p-8">
              <h2 className="font-display text-lg font-semibold tracking-tight">
                Création de site web à Lyon
              </h2>
              <p className="mt-1.5 text-sm leading-6 text-base-content/60">
                Ma façon de cadrer, développer et référencer un site
                professionnel local.
              </p>
              <Link
                href={serviceRoutes.websiteCreationLyon}
                className="interactive mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[color:var(--brand-blue)] hover:underline"
              >
                Découvrir la création de site web à Lyon
                <span aria-hidden="true">→</span>
              </Link>
            </article>

            <article className="qclay-flow-route p-6 sm:p-8">
              <h2 className="font-display text-lg font-semibold tracking-tight">
                Automatisation n8n à Lyon
              </h2>
              <p className="mt-1.5 text-sm leading-6 text-base-content/60">
                Des workflows fiables pour connecter vos outils et supprimer les
                tâches répétitives.
              </p>
              <Link
                href={serviceRoutes.automationN8nLyon}
                className="interactive mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[color:var(--brand-blue)] hover:underline"
              >
                Découvrir l’automatisation n8n à Lyon
                <span aria-hidden="true">→</span>
              </Link>
            </article>
          </div>
        </div>
      </section>

      <CaseStudies />

      <Testimonials />

      {/* ──────────────────── SIMPLE CONTACT CTA ──────────────────── */}
      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="qclay-section qclay-flow-section qclay-flow-contact qclay-scroll-reveal cv-auto px-6 py-24 lg:px-10 lg:py-36"
      >
        <div className="qclay-reveal-stack mx-auto flex max-w-2xl flex-col items-center text-center">
          <div className="qclay-contact-status inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium uppercase tracking-wider">
            Réponse sous 24h ouvrées
          </div>

          <h2 id="contact-heading" className={`mt-5 ${sectionTitle}`}>
            <RevealWords segments={contactHeading} />
          </h2>

          <p className="qclay-contact-intro mt-4 max-w-xl text-base leading-7 md:text-lg md:leading-8">
            Quelques lignes sur votre activité, votre objectif et vos
            contraintes, je vous réponds avec une première lecture, sans
            engagement.
          </p>

          <div className="mt-8 w-full max-w-xl">
            <ContactForm />

            <p className="qclay-contact-links mt-6 text-center text-sm">
              Vous préférez l’email&nbsp;?{' '}
              <a
                href="mailto:bruy.benoit@gmail.com"
                className="font-medium text-[color:var(--brand-blue)] hover:underline"
              >
                bruy.benoit@gmail.com
              </a>{' '}
              ·{' '}
              <a
                href="https://www.linkedin.com/in/benoit-bruynbroeck-a21214b4/"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-[color:var(--brand-blue)] hover:underline"
              >
                LinkedIn
              </a>
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
