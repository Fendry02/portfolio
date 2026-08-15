import Link from 'next/link'

import { buildPageMetadata, siteConfig } from '@/app/lib/seo'

const pageTitle = 'Confidentialité — QuoiPorter'
const pageDescription =
  "Ce que QuoiPorter fait de ta position, et tout ce qu'elle ne fait pas."
const pagePath = '/quoiporter/confidentialite'

export const metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  index: false,
})

const heading =
  'font-display text-xl font-semibold tracking-tight text-base-content'
const body = 'text-base leading-7 text-base-content/70'
const link = 'font-medium text-[color:var(--brand-blue)] hover:underline'

export default function QuoiPorterConfidentialitePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20 lg:px-10 lg:py-28">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-base-content/65">
        QuoiPorter
      </p>
      <h1 className="font-display mt-3 text-[clamp(2rem,3.2vw,3rem)] font-semibold leading-[1.1] tracking-tight">
        Confidentialité
      </h1>
      <p className="mt-6 text-lg leading-8 text-base-content/75">
        L’app n’a pas de compte, pas de serveur et rien à vendre. Voici quand
        même le détail, écrit pour être lu.
      </p>
      <p className="mt-4 text-sm text-base-content/65">
        Dernière mise à jour : 15 août 2026
      </p>

      <div className="mt-12 space-y-12">
        <section className="space-y-3">
          <h2 className={heading}>Ta position</h2>
          <p className={body}>
            Si tu l’autorises, QuoiPorter lit la position de ton appareil pour
            aller chercher la météo de l’endroit où tu te trouves. Les
            coordonnées partent vers{' '}
            <a
              href="https://open-meteo.com"
              target="_blank"
              rel="noreferrer"
              className={link}
            >
              Open-Meteo
            </a>
            , le service de prévisions qui alimente l’app, le temps d’obtenir le
            bulletin. Elles ne sont transmises à personne d’autre, et ne servent
            à rien d’autre.
          </p>
          <p className={body}>
            Tu peux refuser cette autorisation. La recherche de ville te laisse
            alors choisir un lieu à la main, et toutes les fonctions restent
            accessibles.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className={heading}>Ce qui reste sur ton téléphone</h2>
          <p className={body}>
            Le lieu que tu as choisi et tes préférences de garde-robe sont
            enregistrés sur l’appareil, uniquement. Ils ne remontent vers aucun
            serveur et disparaissent le jour où tu supprimes l’app.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className={heading}>Ce que l’app ne fait pas</h2>
          <p className={body}>
            Aucune publicité. Aucun pistage, sous aucune forme. Aucun outil de
            mesure d’audience, même anonyme. Aucun partage ni revente de données
            à des tiers, et aucun profil publicitaire. Rien de tout cela n’est
            dans le code, et aucune dépendance ne pourrait le faire à notre
            place.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className={heading}>Les enfants</h2>
          <p className={body}>
            L’app ne s’adresse pas spécifiquement aux enfants et ne collecte
            sciemment aucune donnée les concernant.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className={heading}>Tes droits</h2>
          <p className={body}>
            Comme rien n’est conservé en dehors de ton téléphone, il n’y a aucun
            dossier à consulter, corriger ou faire effacer chez nous. Supprimer
            l’app efface tout. Si tu veux une confirmation ou poser une
            question, écris-nous.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className={heading}>Nous écrire</h2>
          <p className={body}>
            <a href={`mailto:${siteConfig.email}`} className={link}>
              {siteConfig.email}
            </a>
          </p>
        </section>
      </div>

      <p className="mt-16 text-sm text-base-content/65">
        <Link href="/quoiporter/support" className={link}>
          Support
        </Link>
      </p>
    </main>
  )
}
