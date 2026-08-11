import Link from 'next/link'

import { buildPageMetadata } from './lib/seo'

export const metadata = buildPageMetadata({
  title: 'Page introuvable',
  description:
    'La page demandée est introuvable. Retrouvez les services et réalisations de Benoit Bruynbroeck, développeur web freelance à Lyon.',
  path: '/404',
  index: false,
})

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[65vh] max-w-3xl flex-col justify-center px-6 py-20 lg:px-10 lg:py-28">
      <p className="text-sm font-medium text-[color:var(--brand-blue)]">
        Erreur 404
      </p>
      <h1 className="mt-4 text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
        Cette page n’existe pas ou plus.
      </h1>
      <p className="mt-7 max-w-2xl text-base leading-7 text-base-content/70 md:text-lg md:leading-8">
        Vous pouvez revenir à l’accueil, découvrir mes services ou me décrire
        directement votre projet.
      </p>
      <div className="mt-9 flex flex-col gap-2.5 sm:flex-row">
        <Link
          href="/"
          className="interactive qclay-button inline-flex items-center justify-center gap-2 rounded-lg bg-[color:var(--brand-blue)] px-5 py-3 text-sm font-medium text-white hover:bg-[color:var(--brand-blue-strong)]"
        >
          Retour à l’accueil
        </Link>
        <Link
          href="/#offres"
          className="interactive qclay-button inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-medium text-base-content/70 hover:bg-base-200 hover:text-base-content"
        >
          Voir les services
        </Link>
        <Link
          href="/#contact"
          className="interactive qclay-button inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-medium text-base-content/70 hover:bg-base-200 hover:text-base-content"
        >
          Me contacter
        </Link>
      </div>
    </main>
  )
}
