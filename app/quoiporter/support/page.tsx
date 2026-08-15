import Link from 'next/link'

import { buildPageMetadata, siteConfig } from '@/app/lib/seo'

const pageTitle = 'Support — QuoiPorter'
const pageDescription =
  "Aide et contact pour QuoiPorter, l'app qui donne la tenue du jour selon la météo."
const pagePath = '/quoiporter/support'

export const metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  index: false,
})

const heading =
  'font-display text-xl font-semibold tracking-tight text-base-content'
const body = 'text-base leading-7 text-base-content/70'
const question = 'text-base italic leading-7 text-base-content/55'
const link = 'font-medium text-[color:var(--brand-blue)] hover:underline'

export default function QuoiPorterSupportPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20 lg:px-10 lg:py-28">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-base-content/65">
        QuoiPorter
      </p>
      <h1 className="font-display mt-3 text-[clamp(2rem,3.2vw,3rem)] font-semibold leading-[1.1] tracking-tight">
        Support
      </h1>
      <p className="mt-6 text-lg leading-8 text-base-content/75">
        QuoiPorter répond à une seule question : qu’est-ce que je mets ? Si la
        réponse te paraît fausse ou si quelque chose bloque, écris-nous — on lit
        tout.
      </p>

      <div className="mt-12 space-y-12">
        <section className="space-y-3">
          <h2 className={heading}>Nous écrire</h2>
          <p className={body}>
            <a href={`mailto:${siteConfig.email}`} className={link}>
              {siteConfig.email}
            </a>
          </p>
          <p className={body}>
            Pour un problème d’affichage, dis-nous ta ville et le moment de la
            journée : c’est presque toujours suffisant pour reproduire le souci.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className={heading}>L’app ne trouve pas ma position</h2>
          <p className={question}>
            « On me demande une ville alors que j’ai un GPS. »
          </p>
          <p className={body}>
            L’autorisation de localisation a probablement été refusée. Tu peux
            la rétablir dans les réglages de ton téléphone, à la fiche de
            QuoiPorter. Ce n’est pas obligatoire : ouvre la recherche de ville,
            tape « Paris », « Lisbonne » ou n’importe quel autre nom, et l’app
            retiendra ce lieu pour les fois suivantes.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className={heading}>La tenue ne me correspond pas</h2>
          <p className={question}>
            « Je suis toujours plus frileux que ce qu’on me propose. »
          </p>
          <p className={body}>
            Le vestiaire dans lequel les tenues sont choisies est réglable
            depuis l’écran principal. Change-le et la recommandation se
            recalcule aussitôt, pour aujourd’hui comme pour les sept jours
            suivants.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className={heading}>Le widget n’est pas à jour</h2>
          <p className={question}>« L’écran d’accueil me montre la tenue d’hier. »</p>
          <p className={body}>
            iOS et Android limitent la fréquence à laquelle un widget peut se
            réveiller, pour préserver la batterie — ce n’est pas nous qui
            décidons du rythme. Ouvrir l’app force la mise à jour immédiatement.
            Si le widget reste figé plus d’une journée, dis-le-nous.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className={heading}>Aucune prévision ne s’affiche</h2>
          <p className={question}>« L’écran reste vide. »</p>
          <p className={body}>
            Une connexion internet est nécessaire pour aller chercher le
            bulletin. Les prévisions viennent d’{' '}
            <a
              href="https://open-meteo.com"
              target="_blank"
              rel="noreferrer"
              className={link}
            >
              Open-Meteo
            </a>{' '}
            : si leur service est momentanément indisponible, l’app n’a rien à
            afficher. Réessaye un peu plus tard.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className={heading}>Supprimer mes données</h2>
          <p className={body}>
            Il n’y a rien à supprimer ailleurs que sur ton téléphone : le lieu
            et les préférences ne quittent jamais l’appareil. Désinstaller l’app
            efface tout. Le détail est sur la page{' '}
            <Link href="/quoiporter/confidentialite" className={link}>
              confidentialité
            </Link>
            .
          </p>
        </section>
      </div>

      <p className="mt-16 text-sm text-base-content/65">
        Version 1.0 ·{' '}
        <Link href="/quoiporter/confidentialite" className={link}>
          Confidentialité
        </Link>
      </p>
    </main>
  )
}
