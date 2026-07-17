import Link from 'next/link'
import {
  ArrowsClockwiseIcon,
  CheckCircleIcon,
  DatabaseIcon,
  EnvelopeSimpleIcon,
  FileTextIcon,
} from '@phosphor-icons/react/dist/ssr'

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

const pagePath = serviceRoutes.automationN8nLyon
const pageTitle = 'Automatisation n8n à Lyon'
const pageDescription =
  'Automatisation n8n à Lyon pour PME et indépendants : audit des processus, workflows sur mesure, intégrations API, IA, supervision et maintenance.'

const useCases = [
  {
    title: 'Ventes et relation client',
    text: 'Synchroniser les formulaires avec le CRM, qualifier les demandes, relancer les devis et notifier la bonne personne.',
  },
  {
    title: 'Opérations et administration',
    text: 'Transférer les données entre vos outils, générer des documents et supprimer les doubles saisies qui ralentissent les équipes.',
  },
  {
    title: 'Support et communication',
    text: 'Trier les messages entrants, préparer des réponses, créer des tickets et suivre les demandes sans perdre le contexte.',
  },
  {
    title: 'Données et reporting',
    text: 'Collecter les informations utiles, contrôler leur qualité et produire des tableaux de bord ou alertes à intervalles réguliers.',
  },
]

const deliverables = [
  'Cartographie du processus et des gains attendus',
  'Workflow n8n documenté et versionné',
  'Connexions API, webhooks et outils métier',
  'Gestion des erreurs, reprises et alertes',
  'Intégration IA seulement quand elle est pertinente',
  'Mise en production, transfert et maintenance',
]

const processSteps = [
  {
    title: 'Observer le travail réel',
    text: 'On identifie les actions répétitives, les données utilisées, les exceptions et les points où une validation humaine reste nécessaire.',
  },
  {
    title: 'Prioriser un premier flux',
    text: 'Je sélectionne une automatisation utile, mesurable et assez ciblée pour produire rapidement un résultat sans fragiliser vos opérations.',
  },
  {
    title: 'Construire et sécuriser',
    text: 'Je développe le workflow n8n, connecte les API, protège les accès et prévois les erreurs, les doublons et les reprises.',
  },
  {
    title: 'Mettre en production et suivre',
    text: 'Le flux est testé avec des cas réels, documenté puis supervisé. Vous gardez une vision claire de ce qui s’exécute et de ce qui demande une action.',
  },
]

const faqItems = [
  {
    question: 'Quelles tâches peut-on automatiser avec n8n ?',
    answer:
      'n8n est adapté aux processus qui font circuler des données entre plusieurs outils : formulaires, CRM, emails, bases de données, facturation, support, reporting ou API métier. Je commence par vérifier que le volume et la fréquence justifient réellement l’automatisation.',
  },
  {
    question: 'Faut-il remplacer les outils déjà en place ?',
    answer:
      'Non. Le plus souvent, n8n sert de couche d’orchestration entre vos outils existants. Il récupère une information, applique des règles puis déclenche les bonnes actions sans imposer un nouveau logiciel à toute l’équipe.',
  },
  {
    question:
      'Peut-on intégrer de l’intelligence artificielle dans un workflow n8n ?',
    answer:
      'Oui, pour classer, résumer, extraire ou générer du contenu lorsque le résultat peut être contrôlé. Je conserve des règles déterministes et une validation humaine dès que le risque métier le demande.',
  },
  {
    question: 'Que se passe-t-il si une automatisation échoue ?',
    answer:
      'Un workflow professionnel doit rendre ses erreurs visibles. Je prévois les journaux, alertes, tentatives de reprise et procédures manuelles adaptées pour éviter qu’un échec reste silencieux.',
  },
] as const

export const metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  keywords: [
    'automatisation n8n Lyon',
    'expert n8n Lyon',
    'freelance n8n',
    'consultant n8n',
    'création workflow n8n',
    'intégration API n8n',
    'automatisation PME',
    'automatisation IA n8n',
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
    serviceType: 'Automatisation de processus avec n8n',
  }),
  createFaqPageJsonLd([...faqItems]),
  createBreadcrumbJsonLd([
    { name: 'Accueil', path: '/' },
    { name: 'Services', path: '/#offres' },
    { name: 'Automatisation n8n à Lyon', path: pagePath },
  ]),
])

const eyebrow =
  'text-xs font-semibold uppercase tracking-[0.18em] text-base-content/65'
const sectionTitle =
  'text-[clamp(2.25rem,3.6vw,3.5rem)] font-semibold leading-[1.08] tracking-tight'
const bodyText = 'text-base leading-7 text-base-content/65'
const btnBlue =
  'interactive qclay-button inline-flex items-center justify-center gap-2 rounded-lg bg-[color:var(--brand-blue)] px-5 py-3 text-sm font-medium text-white hover:bg-[color:var(--brand-blue-strong)]'
const btnGhost =
  'interactive qclay-button inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-medium text-base-content/70 hover:bg-base-200 hover:text-base-content'

export default function AutomationN8nLyonPage() {
  return (
    <main className="bg-base-100 text-base-content">
      <JsonLd data={pageJsonLd} />
      <QClayMotion />

      <section className="qclay-hero relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-16 pt-8 lg:grid-cols-[1.04fr_0.96fr] lg:gap-20 lg:px-10 lg:pb-28 lg:pt-16">
          <div className="qclay-reveal-stack qclay-reveal-stack--hero flex flex-col justify-center">
            <p className={eyebrow}>Automatisation de processus</p>
            <h1 className="mt-4 text-[clamp(2.25rem,6vw,4.25rem)] font-semibold leading-[1.05] tracking-tight">
              Automatisation n8n à Lyon pour gagner du temps sans perdre le
              contrôle.
            </h1>
            <p className={`mt-6 max-w-2xl ${bodyText} md:text-lg md:leading-8`}>
              Je conçois des workflows n8n sur mesure pour connecter vos outils,
              fiabiliser les échanges de données et automatiser les tâches
              répétitives. Chaque flux reste lisible, supervisé et adapté à vos
              règles métier.
            </p>
            <div className="mt-8 flex flex-col gap-2.5 sm:flex-row">
              <Link href="/#contact" className={btnBlue}>
                Étudier un processus
                <span aria-hidden="true">→</span>
              </Link>
              <Link href="/#offres" className={btnGhost}>
                Voir les offres
              </Link>
            </div>
          </div>

          <div
            role="img"
            aria-label="Exemple de workflow n8n reliant un formulaire et des emails à une base de données et des actions automatisées"
            className="qclay-reveal-stack rounded-xl border border-base-300 bg-base-100 p-5 shadow-[0_20px_60px_oklch(20.8%_0.042_265.755/0.08)] sm:p-7"
          >
            <div className="flex items-center justify-between border-b border-base-300 pb-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-base-content/55">
                  Workflow opérationnel
                </p>
                <p className="mt-1 text-xl font-semibold tracking-tight">n8n</p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-base-content/60">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Supervisé
              </span>
            </div>

            <div className="mt-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
              <div className="grid gap-3">
                <div className="flex items-center gap-3 rounded-lg border border-base-300 px-3 py-3 text-sm font-medium">
                  <FileTextIcon
                    aria-hidden="true"
                    size={20}
                    strokeWidth={1.5}
                    className="shrink-0 text-[color:var(--brand-blue)]"
                  />
                  Formulaires
                </div>
                <div className="flex items-center gap-3 rounded-lg border border-base-300 px-3 py-3 text-sm font-medium">
                  <EnvelopeSimpleIcon
                    aria-hidden="true"
                    size={20}
                    strokeWidth={1.5}
                    className="shrink-0 text-[color:var(--brand-blue)]"
                  />
                  Emails
                </div>
              </div>

              <ArrowsClockwiseIcon
                aria-hidden="true"
                size={26}
                strokeWidth={1.5}
                className="text-[color:var(--brand-blue)]"
              />

              <div className="grid gap-3">
                <div className="flex items-center gap-3 rounded-lg border border-base-300 px-3 py-3 text-sm font-medium">
                  <DatabaseIcon
                    aria-hidden="true"
                    size={20}
                    strokeWidth={1.5}
                    className="shrink-0 text-[color:var(--brand-blue)]"
                  />
                  CRM à jour
                </div>
                <div className="flex items-center gap-3 rounded-lg border border-base-300 px-3 py-3 text-sm font-medium">
                  <CheckCircleIcon
                    aria-hidden="true"
                    size={20}
                    strokeWidth={1.5}
                    className="shrink-0 text-[color:var(--brand-blue)]"
                  />
                  Actions suivies
                </div>
              </div>
            </div>

            <p className="mt-6 border-t border-base-300 pt-4 text-sm leading-6 text-base-content/60">
              Déclencheurs, règles métier, contrôles et alertes réunis dans un
              flux documenté.
            </p>
          </div>
        </div>
      </section>

      <section className="qclay-section qclay-scroll-reveal cv-auto px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.38fr_0.62fr]">
          <div>
            <p className={eyebrow}>Une automatisation durable</p>
            <h2 className={`mt-3 ${sectionTitle}`}>
              n8n comme socle d’intégration, pas comme boîte noire.
            </h2>
          </div>

          <div className="space-y-6">
            <p className={bodyText}>
              Une automatisation utile ne consiste pas à empiler des actions.
              Elle doit respecter vos règles métier, gérer les données
              incomplètes et rendre chaque incident visible. Je structure les
              workflows n8n pour qu’ils restent compréhensibles et modifiables.
            </p>
            <p className={bodyText}>
              Mon expérience de développeur full stack me permet d’aller au-delà
              des connecteurs prêts à l’emploi&nbsp;: API REST, webhooks,
              authentification, transformation de données, requêtes SQL et code
              personnalisé lorsque le cas le demande.
            </p>
            <p className={bodyText}>
              L’intelligence artificielle peut enrichir certains flux, mais elle
              n’est jamais ajoutée par principe. Les étapes critiques conservent
              des contrôles explicites et, si nécessaire, une validation
              humaine.
            </p>
          </div>
        </div>
      </section>

      <section className="qclay-section qclay-scroll-reveal cv-auto border-y border-base-300 bg-base-200/50 px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className={eyebrow}>Cas d’usage</p>
            <h2 className={`mt-3 ${sectionTitle}`}>
              Des flux concrets autour de vos outils existants.
            </h2>
          </div>

          <div className="qclay-reveal-grid mt-10 grid gap-4 sm:grid-cols-2">
            {useCases.map((item) => (
              <article
                key={item.title}
                className="qclay-subtle-card rounded-xl border border-base-300 bg-base-100 p-5"
              >
                <h3 className="text-lg font-semibold tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-base-content/65">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="qclay-section qclay-scroll-reveal cv-auto px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className={eyebrow}>Ce qui est inclus</p>
            <h2 className={`mt-3 ${sectionTitle}`}>
              Du diagnostic à un workflow n8n prêt à être exploité.
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
                  className="mb-4 block h-1.5 w-8 rounded-full bg-[color:var(--brand-blue)]"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="qclay-section qclay-scroll-reveal cv-auto border-y border-base-300 px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className={eyebrow}>Méthode</p>
            <h2 className={`mt-3 ${sectionTitle}`}>
              Commencer petit, mesurer, puis étendre.
            </h2>
          </div>

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

      <section className="qclay-section qclay-scroll-reveal cv-auto px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.38fr_0.62fr]">
          <div>
            <p className={eyebrow}>Questions fréquentes</p>
            <h2 className={`mt-3 ${sectionTitle}`}>
              Avant d’automatiser avec n8n.
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
            Quel processus vous fait perdre du temps chaque semaine&nbsp;?
          </h2>
          <p className={`mt-5 ${bodyText}`}>
            Décrivez-moi les outils concernés, les actions répétitives et le
            résultat attendu. Je vous réponds avec une première lecture du flux
            et de son potentiel d’automatisation.
          </p>
          <div className="mt-8 flex justify-center">
            <Link href="/#contact" className={btnBlue}>
              Étudier mon processus
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
