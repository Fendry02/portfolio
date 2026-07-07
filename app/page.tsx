import Image from 'next/image'
import Link from 'next/link'
import { MapPinIcon } from '@phosphor-icons/react/dist/ssr'

import profile from '@/public/profile.jpg'
import citizenplane from '@/public/works/citizenplane.webp'
import businessDecision from '@/public/works/business-decision.webp'
import openclassrooms from '@/public/works/openclassrooms.webp'
import electreau from '@/public/works/electreau.png'
import petitnid from '@/public/works/petitnid.png'
import viko from '@/public/works/viko.jpg'
import QClayMotion from './components/qclay-motion'
import OffersAccordion from './components/offers-accordion'
import ContactForm from './components/contact-form'
import CaseStudies from './components/case-studies'
import RevealWords from './components/reveal-words'
import type { WordSegment } from './components/reveal-words'
import JsonLd from './components/json-ld'
import {
  buildPageMetadata,
  createBreadcrumbJsonLd,
  createJsonLdGraph,
  createWebPageJsonLd,
  serviceRoutes,
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
    accent: '#2563eb',
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
    accent: '#2563eb',
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
    accent: '#2563eb',
    icon: 'automation',
    title: 'Audit et automatisation IA',
    desc: 'J’identifie où l’IA crée de la valeur concrète dans vos process, puis j’automatise vos tâches répétitives pour vous faire gagner du temps.',
    detail:
      'J’examine vos process pour repérer les tâches à fort potentiel, puis je mets en place des automatisations concrètes et mesurables, sans gadget ni usine à gaz.',
    bullets: [
      'Audit des process & opportunités',
      'Sélection des outils IA adaptés',
      'Mise en place des automatisations',
      'Mesure du temps & des gains',
    ],
    examples: [
      'Relance automatique des devis non signés par email',
      'Tri et résumé automatique des demandes entrantes (mails, formulaires)',
    ],
  },
  {
    accent: '#2563eb',
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
}

const trustLogos: TrustEntry[] = [
  {
    name: 'CitizenPlane',
    src: citizenplane,
    href: 'https://citizenplane.com',
  },
  {
    name: 'OpenClassrooms',
    src: openclassrooms,
    href: 'https://openclassrooms.com',
  },
  {
    name: 'Business & Decision',
    src: businessDecision,
    href: 'https://www.businessdecision.com/',
  },
  {
    name: 'Electreau Lyon',
    src: electreau,
    href: 'https://www.electreau-lyon.fr/',
  },
  {
    name: 'Petit Nid',
    src: petitnid,
    href: 'https://petitnid.app',
  },
  {
    name: 'Chez Viko',
    src: viko,
    href: 'https://chezviko.fr',
  },
]

const homeTitle =
  'Création de sites web et applications sur mesure | Benoit Bruynbroeck'
const homeDescription =
  'Développeur web full stack à Lyon pour créer un site professionnel, une application métier ou une plateforme web sur mesure, avec Next.js, React, Vue.js, Node.js et PostgreSQL.'

export const metadata = buildPageMetadata({
  title: homeTitle,
  description: homeDescription,
  path: '/',
  keywords: [
    'création site internet',
    'création site web professionnel',
    'application web sur mesure',
    'développeur web freelance',
    'développeur full stack',
    'Next.js',
    'React',
    'Node.js',
    'PostgreSQL',
  ],
})

const homeJsonLd = createJsonLdGraph([
  createWebPageJsonLd({
    path: '/',
    name: homeTitle,
    description: homeDescription,
  }),
  createBreadcrumbJsonLd([{ name: 'Accueil', path: '/' }]),
])

/* ─── Shared typography tokens (kept consistent across sections) ───────── */
const eyebrow =
  'text-xs font-semibold uppercase tracking-[0.18em] text-base-content/55'
const sectionTitle =
  'font-display text-[clamp(2.25rem,3.6vw,3.5rem)] font-semibold leading-[1.08] tracking-tight'
const bodyText = 'text-base leading-7 text-base-content/65'
const accent = '#2563eb'
const btnBlue =
  'interactive qclay-button inline-flex items-center justify-center gap-2 rounded-lg bg-[#2563eb] px-5 py-3 text-sm font-medium text-white hover:bg-[#1d4ed8]'

const heroHeadline: readonly WordSegment[] = [
  { text: 'Des' },
  { text: 'sites' },
  { text: 'web' },
  { text: 'et' },
  { text: 'apps' },
  { text: 'qui' },
  { text: 'vendent.', accent: true },
]

const contactHeading: readonly WordSegment[] = [
  { text: 'Parlons' },
  { text: 'de' },
  { text: 'votre' },
  { text: 'projet.', accent: true },
]

export default function Home() {
  return (
    <main className="bg-base-100 text-base-content">
      <JsonLd data={homeJsonLd} />
      <QClayMotion />

      {/* ─────────────────────────── HERO ─────────────────────────── */}
      <section
        id="home"
        aria-labelledby="hero-heading"
        className="qclay-hero relative overflow-hidden"
      >
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 pb-16 pt-8 sm:gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20 lg:px-10 lg:pb-28 lg:pt-16">
          <div className="qclay-reveal-stack qclay-reveal-stack--hero flex flex-col justify-center">
            <h1
              id="hero-heading"
              className="font-display text-[clamp(2.25rem,6vw,4.25rem)] font-semibold leading-[1.05] tracking-tight"
            >
              <RevealWords segments={heroHeadline} />
            </h1>

            <p className={`mt-6 max-w-xl ${bodyText} md:text-lg md:leading-8`}>
              Site professionnel, application métier ou plateforme complète. Je
              vous accompagne du cadrage à la mise en ligne, avec une base
              technique fiable et un objectif clair&nbsp;: générer des clients,
              des revenus ou du temps gagné.
            </p>

            <div className="mt-8 flex flex-col gap-2.5 sm:flex-row sm:items-center">
              <a href="#contact" className={btnBlue}>
                Discuter de mon projet
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          {/* Right-hand portrait, clean and restrained */}
          <div className="qclay-portrait-wrap relative mx-auto flex w-full max-w-xs flex-col items-center sm:max-w-md lg:max-w-none lg:self-start">
            <div className="qclay-orbit hidden lg:block" aria-hidden="true" />
            <div
              className="qclay-orbit qclay-orbit-secondary hidden lg:block"
              aria-hidden="true"
            />
            <div className="qclay-portrait relative aspect-square w-full max-w-[240px] sm:max-w-[400px]">
              <Image
                src={profile}
                alt="Portrait de Benoit Bruynbroeck, développeur full stack JavaScript"
                fill
                priority
                sizes="(max-width: 640px) 320px, 400px"
                className="rounded-full object-cover object-[center_32%]"
              />

              <div className="qclay-float-badge absolute right-0 top-4 inline-flex items-center gap-1.5 rounded-md border border-base-300 bg-base-100 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-base-content/65">
                <MapPinIcon
                  aria-hidden="true"
                  size={12}
                  weight="regular"
                  strokeWidth={1.5}
                  color={accent}
                />
                Lyon · France
              </div>
            </div>

            <dl className="mt-7 flex items-center gap-3.5 rounded-2xl border border-base-300 bg-base-100 px-5 py-3.5 shadow-[0_10px_30px_oklch(20.8%_0.042_265.755/0.06)]">
              <dd
                className="text-3xl font-bold leading-none tracking-tight"
                style={{ color: accent }}
              >
                10
                <span className="align-top text-xl">+</span>
              </dd>
              <dt className="text-left text-[11px] font-semibold uppercase leading-snug tracking-[0.16em] text-base-content/55">
                ans
                <br />
                d&apos;expérience
              </dt>
            </dl>
          </div>
        </div>
      </section>

      {/* ──────────────────── TRUST STRIP / CLIENTS ──────────────────── */}
      <section
        aria-label="Ils m'ont fait confiance"
        className="qclay-trust border-y border-base-300 py-8"
      >
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <p className={`${eyebrow} text-center md:text-left`}>
            Ils m’ont fait confiance
          </p>
          <div className="qclay-marquee relative mt-6 overflow-hidden">
            <div className="qclay-marquee-track flex w-max items-center">
              {Array.from({ length: 6 }, () => trustLogos)
                .flat()
                .map((entry, index) => {
                  const isClone = index >= trustLogos.length
                  return (
                    <a
                      key={`${entry.name}-${index}`}
                      href={entry.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-hidden={isClone || undefined}
                      tabIndex={isClone ? -1 : undefined}
                      className="interactive group mr-12 inline-flex shrink-0 items-center gap-3 whitespace-nowrap lg:mr-20"
                    >
                      <Image
                        src={entry.src}
                        alt={isClone ? '' : entry.name}
                        width={44}
                        height={44}
                        className="h-11 w-11 rounded-lg object-cover transition group-hover:scale-105"
                      />
                      <span className="text-base font-medium tracking-tight text-base-content/70 transition group-hover:text-base-content">
                        {entry.name}
                      </span>
                    </a>
                  )
                })}
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────── OFFRES / PROPOSITIONS ──────────────────── */}
      <section
        id="offres"
        aria-label="Mes offres"
        className="qclay-section qclay-scroll-reveal cv-auto py-20 lg:py-28"
      >
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <p className={eyebrow}>Mes offres</p>

          <OffersAccordion offers={offers} />

          <div className="mt-8 rounded-xl border border-base-300 bg-base-100 p-5 sm:flex sm:items-center sm:justify-between sm:gap-6">
            <div>
              <h2 className="font-display text-lg font-semibold tracking-tight">
                Création de site web à Lyon
              </h2>
              <p className="mt-1.5 text-sm leading-6 text-base-content/60">
                Une page détaillée sur ma façon de cadrer, développer et
                référencer un site professionnel local.
              </p>
            </div>
            <Link
              href={serviceRoutes.websiteCreationLyon}
              className="interactive mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#2563eb] hover:underline sm:mt-0"
            >
              Lire la page service
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <CaseStudies />

      {/* ──────────────────── SIMPLE CONTACT CTA ──────────────────── */}
      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="qclay-section qclay-scroll-reveal cv-auto border-t border-base-300 px-6 py-20 lg:px-10 lg:py-24"
      >
        <div className="qclay-reveal-stack mx-auto flex max-w-2xl flex-col items-center text-center">
          <div className="qclay-pill inline-flex items-center gap-2 rounded-full border border-base-300 px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-base-content/65">
            Réponse sous 24h ouvrées
          </div>

          <h2 id="contact-heading" className={`mt-5 ${sectionTitle}`}>
            <RevealWords segments={contactHeading} />
          </h2>

          <p className={`mt-4 max-w-xl ${bodyText}`}>
            Quelques lignes sur votre activité, votre objectif et vos
            contraintes, je vous réponds avec une première lecture, sans
            engagement.
          </p>

          <div className="mt-8 w-full max-w-xl">
            <ContactForm />

            <p className="mt-6 text-center text-sm text-base-content/55">
              Vous préférez l’email&nbsp;?{' '}
              <a
                href="mailto:bruy.benoit@gmail.com"
                className="font-medium text-[#2563eb] hover:underline"
              >
                bruy.benoit@gmail.com
              </a>{' '}
              ·{' '}
              <a
                href="https://www.linkedin.com/in/benoit-bruynbroeck-a21214b4/"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-[#2563eb] hover:underline"
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
