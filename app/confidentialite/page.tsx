import Link from 'next/link'

import { buildPageMetadata, siteConfig } from '@/app/lib/seo'

const pageTitle = 'Politique de confidentialité'
const pageDescription =
  'Politique de confidentialité du site de Benoit Bruynbroeck : données collectées, finalités, durée de conservation et vos droits RGPD.'
const pagePath = '/confidentialite'

export const metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
})

const heading =
  'font-display text-xl font-semibold tracking-tight text-base-content'
const body = 'text-base leading-7 text-base-content/70'

export default function ConfidentialitePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20 lg:px-10 lg:py-28">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-base-content/65">
        Vos données
      </p>
      <h1 className="font-display mt-3 text-[clamp(2rem,3.2vw,3rem)] font-semibold leading-[1.1] tracking-tight">
        Politique de confidentialité
      </h1>
      <p className="mt-4 text-sm text-base-content/65">
        Dernière mise à jour : juillet 2026
      </p>

      <div className="mt-12 space-y-12">
        <section className="space-y-3">
          <h2 className={heading}>Responsable du traitement</h2>
          <p className={body}>
            Les données collectées sur ce site sont traitées par{' '}
            <span className="font-medium text-base-content">
              {siteConfig.name}
            </span>
            . Pour toute question relative à vos données, écrivez à{' '}
            <a
              href={`mailto:${siteConfig.email}`}
              className="font-medium text-[#2563eb] hover:underline"
            >
              {siteConfig.email}
            </a>
            .
          </p>
        </section>

        <section className="space-y-3">
          <h2 className={heading}>Données collectées et finalité</h2>
          <p className={body}>
            Le formulaire de contact collecte votre nom, votre adresse email, le
            type de projet et le contenu de votre message. Ces données sont
            utilisées uniquement pour traiter votre demande et vous répondre.
            Aucune donnée n’est vendue ni utilisée à des fins publicitaires.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className={heading}>Base légale</h2>
          <p className={body}>
            Le traitement repose sur votre consentement et sur les mesures
            précontractuelles prises à votre demande (article 6 du RGPD).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className={heading}>Destinataires et sous-traitants</h2>
          <p className={body}>
            Vos messages sont reçus directement par {siteConfig.name}.
            L’acheminement des emails est assuré par Resend, et l’hébergement du
            site par Vercel. Ces prestataires n’utilisent vos données que pour
            fournir leur service.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className={heading}>Durée de conservation</h2>
          {/* TODO Benoit: ajuster la durée si besoin. */}
          <p className={body}>
            Les données issues du formulaire sont conservées pendant 3 ans à
            compter du dernier contact, puis supprimées.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className={heading}>Mesure d’audience</h2>
          <p className={body}>
            Ce site utilise Google Analytics et Vercel Analytics pour mesurer sa
            fréquentation et améliorer son contenu. Ces outils peuvent déposer
            des cookies ou identifiants de mesure. Vous pouvez vous y opposer
            via les réglages de votre navigateur.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className={heading}>Vos droits</h2>
          <p className={body}>
            Conformément au RGPD, vous disposez d’un droit d’accès, de
            rectification, d’effacement, d’opposition, de limitation et de
            portabilité de vos données. Pour les exercer, écrivez à{' '}
            <a
              href={`mailto:${siteConfig.email}`}
              className="font-medium text-[#2563eb] hover:underline"
            >
              {siteConfig.email}
            </a>
            . Vous pouvez également introduire une réclamation auprès de la CNIL
            (
            <a
              href="https://www.cnil.fr"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-[#2563eb] hover:underline"
            >
              cnil.fr
            </a>
            ).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className={heading}>Mentions légales</h2>
          <p className={body}>
            Les informations relatives à l’éditeur et à l’hébergeur du site sont
            disponibles sur la page{' '}
            <Link
              href="/mentions-legales"
              className="font-medium text-[#2563eb] hover:underline"
            >
              mentions légales
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  )
}
