import Image, { type StaticImageData } from 'next/image'

import electreauCapture from '@/public/works/electreau-capture.webp'
import petitNidCapture from '@/public/works/petitnid-capture.webp'
import vikoCapture from '@/public/works/chezviko-capture.webp'

type CaseStudy = {
  title: string
  scope: string
  image: StaticImageData
  imageAlt: string
  challenge: string
  solution: string
  impact: string
  href: string
}

const featuredCase: CaseStudy = {
  title: 'Petit Nid',
  scope: 'Projet fondateur, application mobile de suivi bébé',
  image: petitNidCapture,
  imageAlt:
    'Capture du site Petit Nid présentant une application mobile de suivi bébé',
  challenge:
    'Expliquer un produit sensible en quelques secondes, sans noyer de jeunes parents dans une logique de tableau de bord.',
  solution:
    'Une page produit rassurante, mobile-first, qui met le bénéfice avant les fonctionnalités et guide vers l’inscription.',
  impact:
    'Une proposition lisible dès la première visite, un parcours clair et une base prête à évoluer.',
  href: 'https://petitnid.app',
}

const compactCases: CaseStudy[] = [
  {
    title: 'Electreau Lyon',
    scope: "Site vitrine d'électricien",
    image: electreauCapture,
    imageAlt:
      "Capture du site Electreau Lyon présentant les services d'un artisan local",
    challenge:
      "Un artisan lyonnais avait besoin d'une vitrine directe, rassurante et efficace sur mobile.",
    solution:
      'Services, avis, zones d’intervention et contact sont ramenés dans un parcours court.',
    impact:
      'Les demandes importantes sont plus faciles à qualifier dès le premier échange.',
    href: 'https://www.electreau-lyon.fr/',
  },
  {
    title: 'Chez Viko',
    scope: 'Site vitrine de pizzeria',
    image: vikoCapture,
    imageAlt: 'Capture du site Chez Viko, pizzeria au feu de bois à Lyon',
    challenge:
      'Donner envie avant la visite, tout en rendant les infos pratiques impossibles à rater.',
    solution:
      'La carte, les horaires, l’adresse et l’ambiance sont placés avant les détails secondaires.',
    impact:
      'Une adresse plus crédible en ligne et un parcours simple avant de réserver ou venir sur place.',
    href: 'https://chezviko.fr',
  },
]

const titleClass =
  'font-display text-[clamp(2.1rem,3.4vw,3.35rem)] font-semibold leading-[1.08] tracking-tight'

const cardClass =
  'qclay-subtle-card rounded-2xl border border-base-300 bg-base-100 shadow-[0_18px_45px_oklch(20.8%_0.042_265.755/0.05)]'

export default function CaseStudies() {
  return (
    <section
      aria-labelledby="realisations-heading"
      className="qclay-section qclay-scroll-reveal cv-auto border-t border-base-300 py-20 lg:py-28"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="max-w-3xl">
          <h2 id="realisations-heading" className={titleClass}>
            Des projets qui prouvent le raisonnement
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-base-content/65">
            Chaque projet part d’un blocage concret: inspirer confiance,
            clarifier une offre, ou rendre une action évidente sur mobile.
          </p>
        </div>

        <article
          className={`qclay-reveal-item mt-10 overflow-hidden ${cardClass}`}
          style={{ '--qclay-reveal-i': 0 } as React.CSSProperties}
        >
          <figure className="grid lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-stretch">
            <div className="relative min-h-[18rem] overflow-hidden border-b border-base-300 bg-base-200 lg:border-b-0 lg:border-r">
              <Image
                src={featuredCase.image}
                alt={featuredCase.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 620px"
                className="object-contain object-top"
              />
            </div>
            <figcaption className="flex flex-col p-6 sm:p-8 lg:p-10">
              <p className="text-sm font-medium text-[color:var(--brand-blue)]">
                {featuredCase.scope}
              </p>
              <h3 className="font-display mt-2 text-3xl font-semibold tracking-tight text-base-content">
                {featuredCase.title}
              </h3>
              <dl className="mt-6 grid gap-5 border-y border-base-300 py-6">
                {[
                  ['Blocage', featuredCase.challenge],
                  ['Intervention', featuredCase.solution],
                  ['Résultat', featuredCase.impact],
                ].map(([label, text]) => (
                  <div key={label}>
                    <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-base-content/50">
                      {label}
                    </dt>
                    <dd className="mt-1.5 text-sm leading-6 text-base-content/70">
                      {text}
                    </dd>
                  </div>
                ))}
              </dl>
              <a
                href={featuredCase.href}
                target="_blank"
                rel="noreferrer"
                className="interactive mt-6 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-[color:var(--brand-blue)] hover:underline"
              >
                Voir le site
                <span aria-hidden="true">↗</span>
              </a>
            </figcaption>
          </figure>
        </article>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {compactCases.map((caseStudy, index) => (
            <article
              key={caseStudy.title}
              className={`qclay-reveal-item overflow-hidden ${cardClass}`}
              style={{ '--qclay-reveal-i': index + 1 } as React.CSSProperties}
            >
              <figure className="flex h-full flex-col">
                <div className="relative aspect-[16/10] overflow-hidden border-b border-base-300 bg-base-200">
                  <Image
                    src={caseStudy.image}
                    alt={caseStudy.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 520px"
                    className="object-contain object-top"
                  />
                </div>
                <figcaption className="flex flex-1 flex-col p-6 sm:p-7">
                  <p className="text-sm font-medium text-[color:var(--brand-blue)]">
                    {caseStudy.scope}
                  </p>
                  <h3 className="font-display mt-2 text-2xl font-semibold tracking-tight text-base-content">
                    {caseStudy.title}
                  </h3>
                  <dl className="mt-5 flex-1 space-y-4 border-y border-base-300 py-5">
                    {[
                      ['Besoin', caseStudy.challenge],
                      ['Réponse', caseStudy.solution],
                      ['Effet', caseStudy.impact],
                    ].map(([label, text]) => (
                      <div key={label}>
                        <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-base-content/50">
                          {label}
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-base-content/65">
                          {text}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <a
                    href={caseStudy.href}
                    target="_blank"
                    rel="noreferrer"
                    className="interactive mt-5 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-[color:var(--brand-blue)] hover:underline"
                  >
                    Voir le site
                    <span aria-hidden="true">↗</span>
                  </a>
                </figcaption>
              </figure>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
