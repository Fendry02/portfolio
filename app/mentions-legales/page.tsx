import Link from 'next/link'

import { buildPageMetadata, siteConfig } from '@/app/lib/seo'

const pageTitle = 'Mentions légales'
const pageDescription =
  'Mentions légales du site de Benoit Bruynbroeck : éditeur, hébergeur et informations légales.'
const pagePath = '/mentions-legales'

export const metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
})

const heading = 'font-display text-xl font-semibold tracking-tight text-base-content'
const body = 'text-base leading-7 text-base-content/70'
const term = 'font-medium text-base-content'

export default function MentionsLegalesPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20 lg:px-10 lg:py-28">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-base-content/65">
        Informations légales
      </p>
      <h1 className="font-display mt-3 text-[clamp(2rem,3.2vw,3rem)] font-semibold leading-[1.1] tracking-tight">
        Mentions légales
      </h1>
      <p className="mt-4 text-sm text-base-content/65">
        Dernière mise à jour : juillet 2026
      </p>

      <div className="mt-12 space-y-12">
        <section className="space-y-3">
          <h2 className={heading}>Éditeur du site</h2>
          {/* TODO Benoit: compléter statut juridique, adresse, téléphone, SIREN/SIRET et TVA. */}
          <p className={body}>
            <span className={term}>{siteConfig.name}</span>
            <br />
            Statut&nbsp;: [à compléter : micro-entreprise / EI]
            <br />
            Adresse&nbsp;: [à compléter], {siteConfig.location.city},{' '}
            {siteConfig.location.country}
            <br />
            Email&nbsp;:{' '}
            <a
              href={`mailto:${siteConfig.email}`}
              className="font-medium text-[#2563eb] hover:underline"
            >
              {siteConfig.email}
            </a>
            <br />
            Téléphone&nbsp;: [à compléter]
            <br />
            SIREN / SIRET&nbsp;: [à compléter]
            <br />
            TVA intracommunautaire&nbsp;: [à compléter, ou «&nbsp;TVA non
            applicable, art. 293 B du CGI&nbsp;» si micro-entreprise]
          </p>
        </section>

        <section className="space-y-3">
          <h2 className={heading}>Directeur de la publication</h2>
          <p className={body}>{siteConfig.name}</p>
        </section>

        <section className="space-y-3">
          <h2 className={heading}>Hébergeur</h2>
          <p className={body}>
            <span className={term}>Vercel Inc.</span>
            <br />
            340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis
            <br />
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-[#2563eb] hover:underline"
            >
              vercel.com
            </a>
          </p>
        </section>

        <section className="space-y-3">
          <h2 className={heading}>Propriété intellectuelle</h2>
          <p className={body}>
            L’ensemble des contenus présents sur ce site (textes, images, mise
            en page, code) est protégé par le droit d’auteur. Toute
            reproduction ou réutilisation sans autorisation préalable est
            interdite. Les marques, logos et captures de sites clients restent
            la propriété de leurs titulaires respectifs et sont utilisés à
            titre d’illustration avec leur accord.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className={heading}>Données personnelles</h2>
          <p className={body}>
            Le formulaire de contact collecte des données personnelles traitées
            uniquement pour répondre à votre demande. Le détail des traitements,
            de leur durée de conservation et de vos droits figure dans la{' '}
            <Link
              href="/confidentialite"
              className="font-medium text-[#2563eb] hover:underline"
            >
              politique de confidentialité
            </Link>
            .
          </p>
        </section>

        <section className="space-y-3">
          <h2 className={heading}>Droit applicable</h2>
          <p className={body}>
            Le présent site et ses mentions légales sont régis par le droit
            français. En cas de litige, et à défaut de résolution amiable, les
            tribunaux français seront seuls compétents.
          </p>
        </section>
      </div>
    </main>
  )
}
