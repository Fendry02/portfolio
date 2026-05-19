import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'

import profile from '@/public/profile.webp'
import citizenplane from '@/public/works/citizenplane.webp'
import businessDecision from '@/public/works/business-decision.webp'
import openclassrooms from '@/public/works/openclassrooms.webp'

type Service = {
  eyebrow: string
  title: string
  pitch: string
  outcomes: string[]
}

const services: Service[] = [
  {
    eyebrow: '01 — Plateforme web',
    title: 'Le produit complet, prêt à scaler.',
    pitch:
      'Espace client, paiements, API, intégrations, base de données. Un produit web fiable, mesurable, conçu pour durer.',
    outcomes: [
      'Architecture & base de données',
      'Authentification & espace utilisateur',
      'Intégrations tierces & paiements',
      'Mise en production, monitoring, suivi',
    ],
  },
  {
    eyebrow: '02 — Site professionnel',
    title: 'Vitrine qui convertit.',
    pitch:
      'Un site clair, rapide, structuré pour le SEO. Construit pour rassurer et déclencher la prise de contact.',
    outcomes: [
      'Design responsive sur mesure',
      'SEO local & structure technique',
      'Formulaires & analytics',
    ],
  },
  {
    eyebrow: '03 — Application métier',
    title: 'Outil interne taillé à votre process.',
    pitch:
      'Tableau de bord, workflow, automatisation. On supprime les tâches répétitives et on centralise vos données.',
    outcomes: [
      'Cadrage des process & priorités',
      'Tableaux de bord & rôles',
      'Automatisations & exports',
    ],
  },
]

const realizations = [
  {
    title: 'Electreau Lyon',
    type: 'Site professionnel',
    href: 'https://www.electreau-lyon.fr/',
    domain: 'electreau-lyon.fr',
    summary:
      'Présence en ligne claire pour un électricien lyonnais : services expliqués, confiance renforcée, prise de contact facilitée.',
    tags: ['Site vitrine', 'SEO local', 'Responsive'],
  },
  {
    title: 'Petit Nid',
    type: 'Application web',
    href: 'https://petitnid.app',
    domain: 'petitnid.app',
    summary:
      'Application produit pensée pour un usage régulier. Parcours direct, UX épurée, logique métier au centre.',
    tags: ['App produit', 'UX', 'Parcours récurrents'],
  },
]

type TrustEntry = {
  name: string
  href: string
  src?: typeof citizenplane
  domain?: string
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
    domain: 'electreau-lyon.fr',
    href: 'https://www.electreau-lyon.fr/',
  },
  {
    name: 'Petit Nid',
    domain: 'petitnid.app',
    href: 'https://petitnid.app',
  },
]

export const metadata: Metadata = {
  title:
    'Création de sites web et applications sur mesure | Benoit Bruynbroeck',
  description:
    'Développeur web full stack pour créer un site professionnel, une application métier ou une plateforme web sur mesure, avec Next.js, React, Vue.js, Node.js et PostgreSQL.',
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
  alternates: {
    canonical: 'https://bbenoit.fr',
  },
}

const eyebrow =
  'text-xs font-semibold uppercase tracking-[0.18em] text-base-content/55'
const heading2 =
  'text-[clamp(1.875rem,3vw,2.75rem)] font-semibold leading-[1.1] tracking-tight'
const btnPrimary =
  'interactive inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-content hover:bg-primary/92'
const btnGhost =
  'interactive inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-medium text-base-content/70 hover:bg-base-200 hover:text-base-content'

export default function Home() {
  return (
    <main className="bg-base-100 text-base-content">
      {/* ─────────────────────────── HERO ─────────────────────────── */}
      <section id="home" aria-labelledby="hero-heading" className="relative">
        <div className="mx-auto grid max-w-6xl gap-14 px-6 pb-20 pt-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20 lg:px-10 lg:pb-28 lg:pt-16">
          <div className="flex flex-col justify-center">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-base-300 bg-base-100 px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-base-content/65">
              <span className="status-dot" aria-hidden="true" />
              Disponible pour de nouveaux projets
            </div>

            <h1
              id="hero-heading"
              className="mt-6 text-[clamp(2.25rem,4.8vw,4.25rem)] font-semibold leading-[1.05] tracking-tight"
            >
              Des sites et des produits web qui{' '}
              <span className="italic text-secondary">vendent</span>, construits
              par un seul interlocuteur.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-base-content/65 md:text-lg md:leading-8">
              Site professionnel, application métier ou plateforme complète. Je
              vous accompagne du cadrage à la mise en ligne, avec une base
              technique fiable et un objectif clair&nbsp;: générer des clients,
              des revenus ou du temps gagné.
            </p>

            <div className="mt-8 flex flex-col gap-2.5 sm:flex-row sm:items-center">
              <a href="mailto:bruy.benoit@gmail.com" className={btnPrimary}>
                Discuter de mon projet
                <span aria-hidden="true">→</span>
              </a>
              <Link href="/jobs" className={btnGhost}>
                Voir mon parcours
              </Link>
            </div>

            <dl className="mt-12 grid max-w-md grid-cols-3 gap-x-6 border-t border-base-300 pt-6">
              <div>
                <dt className={eyebrow}>Expérience</dt>
                <dd className="mt-1.5 text-xl font-semibold tracking-tight">
                  6+ ans
                </dd>
              </div>
              <div>
                <dt className={eyebrow}>Mentorés</dt>
                <dd className="mt-1.5 text-xl font-semibold tracking-tight">
                  50+
                </dd>
              </div>
              <div>
                <dt className={eyebrow}>En production</dt>
                <dd className="mt-1.5 text-xl font-semibold tracking-tight">
                  100%
                </dd>
              </div>
            </dl>
          </div>

          {/* Right-hand portrait — clean, no decoration */}
          <div className="relative mx-auto flex w-full max-w-md flex-col items-center lg:max-w-none">
            <div className="relative aspect-square w-full max-w-[400px]">
              <Image
                src={profile}
                alt="Portrait de Benoit Bruynbroeck, développeur full stack JavaScript"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 400px"
                className="object-contain"
              />

              <div className="absolute right-0 top-4 inline-flex items-center gap-1.5 rounded-md border border-base-300 bg-base-100 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-base-content/65">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 16 16"
                  className="h-3 w-3 text-secondary"
                  fill="currentColor"
                >
                  <path d="M8 1.5a4.5 4.5 0 0 0-4.5 4.5c0 3.2 4.05 7.92 4.22 8.12a.36.36 0 0 0 .56 0C8.45 13.92 12.5 9.2 12.5 6A4.5 4.5 0 0 0 8 1.5Zm0 6.25A1.75 1.75 0 1 1 8 4.25a1.75 1.75 0 0 1 0 3.5Z" />
                </svg>
                Lyon · France
              </div>
            </div>

            <div className="mt-4 grid w-full max-w-sm grid-cols-3 overflow-hidden rounded-lg border border-base-300 bg-base-100 text-center">
              <div className="border-r border-base-300 px-3 py-3">
                <p className="text-sm font-semibold leading-none">Node</p>
                <p className="mt-1.5 text-[10px] uppercase tracking-wider text-base-content/55">
                  6+ ans
                </p>
              </div>
              <div className="border-r border-base-300 px-3 py-3">
                <p className="text-sm font-semibold leading-none">TypeScript</p>
                <p className="mt-1.5 text-[10px] uppercase tracking-wider text-base-content/55">
                  5+ ans
                </p>
              </div>
              <div className="px-3 py-3">
                <p className="text-sm font-semibold leading-none">Postgres</p>
                <p className="mt-1.5 text-[10px] uppercase tracking-wider text-base-content/55">
                  Prod ready
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────── TRUST STRIP / CLIENTS ──────────────────── */}
      <section
        aria-label="Ils m'ont fait confiance"
        className="border-y border-base-300 py-8"
      >
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <p className={`${eyebrow} text-center md:text-left`}>
            Ils m’ont fait confiance
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 md:justify-start lg:flex-nowrap lg:gap-x-9">
            {trustLogos.map((entry) => (
              <a
                key={entry.name}
                href={entry.href}
                target="_blank"
                rel="noreferrer"
                className="interactive group inline-flex shrink-0 items-center gap-2 whitespace-nowrap"
              >
                {entry.src ? (
                  <>
                    <Image
                      src={entry.src}
                      alt={entry.name}
                      width={28}
                      height={28}
                      className="h-7 w-7 rounded object-cover opacity-65 grayscale transition group-hover:opacity-100 group-hover:grayscale-0"
                    />
                    <span className="text-sm font-medium tracking-tight text-base-content/70 transition group-hover:text-base-content">
                      {entry.name}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-sm font-medium tracking-tight text-base-content/70 transition group-hover:text-base-content">
                      {entry.name}
                    </span>
                    <span
                      aria-hidden="true"
                      className="text-xs text-base-content/35 transition group-hover:text-secondary"
                    >
                      ↗
                    </span>
                  </>
                )}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────── PROMISE / VALUE STATEMENT ──────────────────── */}
      <section className="px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.35fr_0.65fr] lg:gap-16">
          <div>
            <p className={eyebrow}>Pourquoi me confier votre projet</p>
            <div className="hairline mt-5 max-w-[40%]" />
          </div>
          <p className="text-xl font-normal leading-[1.4] tracking-tight text-base-content md:text-[1.625rem] md:leading-[1.35]">
            La plupart des projets web échouent parce qu’ils livrent du code,
            pas un produit.{' '}
            <span className="text-base-content/45">
              Mon approche démarre par votre client final, votre offre et votre
              modèle économique — la technique vient ensuite, comme un moyen,
              jamais comme une fin.
            </span>
          </p>
        </div>
      </section>

      {/* ──────────────────── SERVICES ──────────────────── */}
      <section
        id="services"
        aria-labelledby="services-heading"
        className="bg-base-200/50 px-6 py-20 lg:px-10 lg:py-28"
      >
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className={eyebrow}>Ce que je construis</p>
              <h2 id="services-heading" className={`mt-3 ${heading2}`}>
                Trois formats, un même standard de qualité.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-base-content/65">
              Chaque format est cadré et livré comme un produit : pas de scope
              inutile, pas de dette technique offerte.
            </p>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-[1.3fr_1fr] lg:grid-rows-2">
            {/* Featured card — spans both rows on left */}
            <article className="interactive group relative flex flex-col justify-between overflow-hidden rounded-xl bg-primary p-7 text-primary-content lg:row-span-2 lg:p-9">
              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-content/55">
                  {services[0].eyebrow}
                </p>
                <h3 className="mt-4 text-2xl font-semibold leading-tight tracking-tight lg:text-[1.75rem]">
                  {services[0].title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-primary-content/70 lg:text-base lg:leading-7">
                  {services[0].pitch}
                </p>

                <ul className="mt-7 space-y-2.5 text-sm">
                  {services[0].outcomes.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-2 inline-block h-1 w-1 rounded-full bg-primary-content/40"
                      />
                      <span className="text-primary-content/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative mt-8 border-t border-primary-content/10 pt-5">
                <a
                  href="mailto:bruy.benoit@gmail.com"
                  className="interactive inline-flex items-center gap-1.5 text-sm font-medium text-primary-content hover:text-secondary"
                >
                  En parler
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </article>

            {services.slice(1).map((service) => (
              <article
                key={service.title}
                className="interactive group relative flex flex-col justify-between overflow-hidden rounded-xl border border-base-300 bg-base-100 p-7 hover:border-base-content/15"
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
                    {service.eyebrow}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold leading-tight tracking-tight">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-base-content/65">
                    {service.pitch}
                  </p>

                  <ul className="mt-5 space-y-2 text-sm text-base-content/70">
                    {service.outcomes.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span
                          aria-hidden="true"
                          className="mt-2 inline-block h-1 w-1 rounded-full bg-base-content/30"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-7 border-t border-base-300 pt-4">
                  <a
                    href="mailto:bruy.benoit@gmail.com"
                    className="text-sm font-medium text-secondary hover:underline"
                  >
                    En parler →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────── REALIZATIONS / LIVE PROJECTS ──────────────────── */}
      <section
        id="realizations"
        aria-labelledby="realizations-heading"
        className="px-6 py-20 lg:px-10 lg:py-28"
      >
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className={eyebrow}>Réalisations récentes</p>
              <h2 id="realizations-heading" className={`mt-3 ${heading2}`}>
                Des projets en ligne, livrés et utilisés.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-base-content/65">
              Deux exemples concrets, en production. Cliquez pour voir les sites
              en vrai.
            </p>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            {realizations.map((r) => (
              <a
                key={r.href}
                href={r.href}
                target="_blank"
                rel="noreferrer"
                className="interactive group relative flex flex-col justify-between overflow-hidden rounded-xl border border-base-300 bg-base-100 p-7 hover:border-base-content/15 lg:p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
                      {r.type}
                    </p>
                    <h3 className="mt-2.5 text-2xl font-semibold tracking-tight md:text-[1.625rem]">
                      {r.title}
                    </h3>
                  </div>
                  <span
                    aria-hidden="true"
                    className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-base-300 text-base text-base-content/55 transition group-hover:-rotate-45 group-hover:border-base-content group-hover:text-base-content"
                  >
                    →
                  </span>
                </div>

                <p className="mt-5 text-sm leading-6 text-base-content/65 md:text-base md:leading-7">
                  {r.summary}
                </p>

                <div className="mt-6 flex flex-wrap gap-1.5">
                  {r.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-base-300 px-2 py-0.5 text-xs font-medium text-base-content/65"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-7 flex items-center justify-between gap-3 border-t border-base-300 pt-4">
                  <span className="font-mono text-xs text-base-content/55 transition group-hover:text-base-content">
                    {r.domain}
                  </span>
                  <span className="text-[11px] font-medium uppercase tracking-wider text-base-content/40 transition group-hover:text-secondary">
                    Voir le site ↗
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────── SIMPLE CONTACT CTA ──────────────────── */}
      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="border-t border-base-300 px-6 py-20 lg:px-10 lg:py-24"
      >
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-base-300 px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-base-content/65">
            <span className="status-dot" aria-hidden="true" />
            Réponse sous 24h ouvrées
          </div>

          <h2
            id="contact-heading"
            className="mt-5 text-[clamp(1.875rem,3.5vw,3rem)] font-semibold leading-[1.1] tracking-tight"
          >
            Parlons de votre projet.
          </h2>

          <p className="mt-4 max-w-xl text-base leading-7 text-base-content/65">
            Quelques lignes sur votre activité, votre objectif et vos
            contraintes — je vous réponds avec une première lecture, sans
            engagement.
          </p>

          <div className="mt-7 flex flex-col gap-2.5 sm:flex-row">
            <a href="mailto:bruy.benoit@gmail.com" className={btnPrimary}>
              bruy.benoit@gmail.com
              <span aria-hidden="true">→</span>
            </a>
            <a
              href="https://www.linkedin.com/in/benoit-bruynbroeck-a21214b4/"
              target="_blank"
              rel="noreferrer"
              className={btnGhost}
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
