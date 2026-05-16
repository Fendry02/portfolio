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

export default function Home() {
  return (
    <main className="bg-base-100 text-base-content">
      {/* ─────────────────────────── HERO ─────────────────────────── */}
      <section
        id="home"
        aria-labelledby="hero-heading"
        className="relative overflow-hidden"
      >
        <div className="bg-grid-light pointer-events-none absolute inset-0 opacity-60" />
        <div className="pointer-events-none absolute -top-32 right-[-10%] h-[480px] w-[480px] rounded-full bg-secondary/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-16 px-6 pb-24 pt-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20 lg:px-16 lg:pb-32 lg:pt-20">
          <div className="flex flex-col justify-center">
            <div className="inline-flex w-fit items-center gap-2.5 rounded-full border border-base-300 bg-base-100/80 px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-base-content/70 shadow-sm backdrop-blur">
              <span className="status-dot" aria-hidden="true" />
              Disponible pour de nouveaux projets
            </div>

            <h1
              id="hero-heading"
              className="mt-7 text-[clamp(2.6rem,5.6vw,5.25rem)] font-bold leading-[1.02] tracking-tight"
            >
              Des sites et des produits web qui{' '}
              <span className="text-gradient-accent italic">vendent</span>,
              <br className="hidden sm:block" />
              construits par{' '}
              <em className="not-italic underline decoration-secondary decoration-4 underline-offset-[6px]">
                un seul interlocuteur
              </em>
              .
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-base-content/70 md:text-xl">
              Site professionnel, application métier ou plateforme complète. Je
              vous accompagne du cadrage à la mise en ligne, avec une base
              technique fiable et un objectif clair&nbsp;: générer des clients,
              des revenus ou du temps gagné.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="mailto:bruy.benoit@gmail.com"
                className="btn btn-primary btn-lg rounded-full px-7 shadow-lg shadow-primary/20 transition-transform hover:-translate-y-0.5 motion-reduce:transform-none"
              >
                Discuter de mon projet
                <span aria-hidden="true">→</span>
              </a>
              <Link
                href="/jobs"
                className="btn btn-ghost btn-lg rounded-full px-6 text-base-content/80 hover:bg-base-200"
              >
                Voir mon parcours
              </Link>
            </div>

            <dl className="mt-12 grid max-w-xl grid-cols-3 gap-x-6 gap-y-2 border-t border-base-300 pt-8">
              <div>
                <dt className="text-xs uppercase tracking-wider text-base-content/50">
                  Expérience
                </dt>
                <dd className="mt-1 text-2xl font-bold tracking-tight">
                  6+ ans
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-base-content/50">
                  Mentorés
                </dt>
                <dd className="mt-1 text-2xl font-bold tracking-tight">50+</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-base-content/50">
                  En production
                </dt>
                <dd className="mt-1 text-2xl font-bold tracking-tight">100%</dd>
              </div>
            </dl>
          </div>

          {/* Right-hand portrait — round, no frame */}
          <div className="relative mx-auto flex w-full max-w-md flex-col items-center lg:max-w-none">
            <div className="relative aspect-square w-full max-w-[420px]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-6 rounded-full bg-secondary/8 blur-3xl"
              />
              <Image
                src={profile}
                alt="Portrait de Benoit Bruynbroeck, développeur full stack JavaScript"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 420px"
                className="relative object-contain"
              />

              <div className="absolute -right-2 top-6 inline-flex items-center gap-2 rounded-full border border-base-300 bg-base-100/90 px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider text-base-content/75 shadow-sm backdrop-blur md:right-4 lg:right-2">
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

            <div className="mt-4 grid w-full max-w-sm grid-cols-3 overflow-hidden rounded-2xl border border-base-300 bg-base-100 text-center shadow-sm">
              <div className="border-r border-base-300 px-3 py-4">
                <p className="text-lg font-bold leading-none">Node</p>
                <p className="mt-1 text-[10px] uppercase tracking-wider text-base-content/55">
                  6+ ans
                </p>
              </div>
              <div className="border-r border-base-300 px-3 py-4">
                <p className="text-lg font-bold leading-none">TypeScript</p>
                <p className="mt-1 text-[10px] uppercase tracking-wider text-base-content/55">
                  5+ ans
                </p>
              </div>
              <div className="px-3 py-4">
                <p className="text-lg font-bold leading-none">Postgres</p>
                <p className="mt-1 text-[10px] uppercase tracking-wider text-base-content/55">
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
        className="border-y border-base-300 bg-base-200/60 py-10"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-16">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-base-content/55 md:text-left">
            Ils m’ont fait confiance
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 md:justify-start lg:flex-nowrap lg:gap-x-10">
            {trustLogos.map((entry) => (
              <a
                key={entry.name}
                href={entry.href}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex shrink-0 items-center gap-2.5 whitespace-nowrap transition"
              >
                {entry.src ? (
                  <>
                    <Image
                      src={entry.src}
                      alt={entry.name}
                      width={32}
                      height={32}
                      className="h-8 w-8 rounded-md object-cover opacity-70 grayscale transition group-hover:opacity-100 group-hover:grayscale-0"
                    />
                    <span className="text-sm font-semibold tracking-tight text-base-content/75 transition group-hover:text-base-content">
                      {entry.name}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-sm font-semibold tracking-tight text-base-content/75 transition group-hover:text-base-content">
                      {entry.name}
                    </span>
                    <span
                      aria-hidden="true"
                      className="text-xs text-base-content/40 transition group-hover:text-secondary"
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
      <section className="px-6 py-24 lg:px-16 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.4fr_0.6fr] lg:gap-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
              Pourquoi me confier votre projet
            </p>
            <div className="hairline mt-6 max-w-[60%]" />
          </div>
          <div>
            <p className="text-2xl font-medium leading-[1.35] tracking-tight text-base-content md:text-[2rem] md:leading-[1.25]">
              La plupart des projets web échouent parce qu’ils livrent du code,
              pas un produit.{' '}
              <span className="text-base-content/55">
                Mon approche démarre par votre client final, votre offre et
                votre modèle économique — la technique vient ensuite, comme un
                moyen, jamais comme une fin.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* ──────────────────── SERVICES — BENTO ──────────────────── */}
      <section
        id="services"
        aria-labelledby="services-heading"
        className="bg-base-200/40 px-6 py-24 lg:px-16 lg:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
                Ce que je construis
              </p>
              <h2
                id="services-heading"
                className="mt-4 text-[clamp(2rem,3.5vw,3.25rem)] font-bold leading-[1.05] tracking-tight"
              >
                Trois formats, un même standard de qualité.
              </h2>
            </div>
            <p className="max-w-sm text-base text-base-content/70">
              Chaque format est cadré et livré comme un produit&nbsp;: pas de
              scope inutile, pas de dette technique offerte.
            </p>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-[1.3fr_1fr] lg:grid-rows-2">
            {/* Featured card — spans both rows on left */}
            <article className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-primary p-8 text-primary-content shadow-xl shadow-primary/20 lg:row-span-2 lg:p-10">
              <div className="bg-grid-soft pointer-events-none absolute inset-0 opacity-40" />
              <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-secondary/30 blur-3xl" />

              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-content/70">
                  {services[0].eyebrow}
                </p>
                <h3 className="mt-5 text-3xl font-bold leading-tight lg:text-4xl">
                  {services[0].title}
                </h3>
                <p className="mt-5 text-base leading-7 text-primary-content/80 lg:text-lg">
                  {services[0].pitch}
                </p>

                <ul className="mt-8 space-y-3 text-sm lg:text-base">
                  {services[0].outcomes.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-1.5 inline-block h-1.5 w-1.5 rounded-full bg-secondary"
                      />
                      <span className="text-primary-content/85">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative mt-10 border-t border-primary-content/15 pt-6">
                <a
                  href="mailto:bruy.benoit@gmail.com"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary-content transition hover:text-secondary"
                >
                  En parler
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </article>

            {/* Two stacked smaller cards */}
            {services.slice(1).map((service) => (
              <article
                key={service.title}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-base-300 bg-base-100 p-8 transition hover:-translate-y-1 hover:border-secondary/40 hover:shadow-xl motion-reduce:transform-none"
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
                    {service.eyebrow}
                  </p>
                  <h3 className="mt-4 text-2xl font-bold leading-tight">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-base-content/70">
                    {service.pitch}
                  </p>

                  <ul className="mt-6 space-y-2 text-sm text-base-content/75">
                    {service.outcomes.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span
                          aria-hidden="true"
                          className="mt-2 inline-block h-1 w-1 rounded-full bg-base-content/40"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 border-t border-base-300 pt-5">
                  <a
                    href="mailto:bruy.benoit@gmail.com"
                    className="text-sm font-semibold text-secondary transition group-hover:underline"
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
        className="px-6 py-24 lg:px-16 lg:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
                Réalisations récentes
              </p>
              <h2
                id="realizations-heading"
                className="mt-4 text-[clamp(2rem,3.5vw,3.25rem)] font-bold leading-[1.05] tracking-tight"
              >
                Des projets en ligne, livrés et utilisés.
              </h2>
            </div>
            <p className="max-w-sm text-base text-base-content/70">
              Deux exemples concrets, en production aujourd’hui. Cliquez pour
              voir les sites en vrai.
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {realizations.map((r) => (
              <a
                key={r.href}
                href={r.href}
                target="_blank"
                rel="noreferrer"
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-base-300 bg-base-100 p-8 transition hover:-translate-y-1 hover:border-secondary/40 hover:shadow-2xl motion-reduce:transform-none lg:p-10"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-secondary/0 blur-3xl transition duration-500 group-hover:bg-secondary/10"
                />

                <div className="relative flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
                      {r.type}
                    </p>
                    <h3 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                      {r.title}
                    </h3>
                  </div>
                  <span
                    aria-hidden="true"
                    className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-base-300 text-lg text-base-content/65 transition group-hover:rotate-[-45deg] group-hover:border-secondary group-hover:bg-secondary group-hover:text-secondary-content"
                  >
                    →
                  </span>
                </div>

                <p className="relative mt-6 text-base leading-7 text-base-content/70 md:text-lg">
                  {r.summary}
                </p>

                <div className="relative mt-8 flex flex-wrap gap-2">
                  {r.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-base-300 bg-base-200/60 px-3 py-1 text-xs font-medium text-base-content/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="relative mt-8 flex items-center justify-between gap-3 border-t border-base-300 pt-5">
                  <span className="font-mono text-sm text-base-content/55 transition group-hover:text-secondary">
                    {r.domain}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-base-content/45 transition group-hover:text-secondary">
                    Voir le site live ↗
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
        className="border-t border-base-300 px-6 py-24 lg:px-16 lg:py-28"
      >
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-base-300 bg-base-100 px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-base-content/70 shadow-sm">
            <span className="status-dot" aria-hidden="true" />
            Réponse sous 24h ouvrées
          </div>

          <h2
            id="contact-heading"
            className="mt-6 text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] tracking-tight"
          >
            Parlons de votre projet.
          </h2>

          <p className="mt-5 max-w-xl text-base leading-7 text-base-content/70 md:text-lg">
            Quelques lignes sur votre activité, votre objectif et vos
            contraintes — je vous réponds avec une première lecture, sans
            engagement.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="mailto:bruy.benoit@gmail.com"
              className="btn btn-primary btn-lg rounded-full px-7 shadow-lg shadow-primary/20"
            >
              bruy.benoit@gmail.com
              <span aria-hidden="true">→</span>
            </a>
            <a
              href="https://www.linkedin.com/in/benoit-bruynbroeck-a21214b4/"
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost btn-lg rounded-full px-6 text-base-content/80 hover:bg-base-200"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
