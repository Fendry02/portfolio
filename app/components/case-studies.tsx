import Image, { type StaticImageData } from 'next/image'

import electreauCapture from '@/public/works/electreau-capture.webp'
import petitNidCapture from '@/public/works/petitnid-capture.webp'
import vikoCapture from '@/public/works/chezviko-capture.webp'

type CaseStudy = {
  title: string
  scope: string
  image: StaticImageData
  imageAlt: string
  context: string
  result: string
}

const featuredCase: CaseStudy = {
  title: 'Petit Nid',
  scope: 'Projet fondateur, application mobile de suivi bébé',
  image: petitNidCapture,
  imageAlt:
    'Capture du site Petit Nid présentant une application mobile de suivi bébé',
  context:
    'Mon propre produit, conçu pour aider les parents à suivre les rythmes de leur bébé sans transformer le quotidien en tableau de bord.',
  result:
    "Résultat concret: une proposition lisible dès la première visite, un parcours d'inscription clair et une base produit prête à évoluer.",
}

const compactCases: CaseStudy[] = [
  {
    title: 'Electreau Lyon',
    scope: "Site vitrine d'électricien",
    image: electreauCapture,
    imageAlt:
      "Capture du site Electreau Lyon présentant les services d'un artisan local",
    context:
      "Un artisan lyonnais avait besoin d'une vitrine directe, rassurante et pensée pour les demandes urgentes sur mobile.",
    result:
      'Résultat concret: des services, avis et moyens de contact visibles tout de suite, pour des demandes plus qualifiées.',
  },
  {
    title: 'Chez Viko',
    scope: 'Site vitrine de pizzeria',
    image: vikoCapture,
    imageAlt: 'Capture du site Chez Viko, pizzeria au feu de bois à Lyon',
    context:
      "Une pizzeria lyonnaise qui avait besoin d'une adresse crédible en ligne, facile à découvrir avant de réserver une table.",
    result:
      'Résultat concret: carte, horaires et itinéraire accessibles en quelques secondes, et une image qui donne envie de pousser la porte.',
  },
]

const titleClass =
  'font-display text-[clamp(2.1rem,3.4vw,3.35rem)] font-semibold leading-[1.08] tracking-tight'

const cardClass =
  'qclay-subtle-card rounded-2xl border border-base-300 bg-base-100 p-3 shadow-[0_18px_45px_oklch(20.8%_0.042_265.755/0.05)]'

export default function CaseStudies() {
  return (
    <section
      aria-labelledby="realisations-heading"
      className="qclay-section qclay-scroll-reveal cv-auto border-t border-base-300 py-20 lg:py-28"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="max-w-3xl">
          <h2 id="realisations-heading" className={titleClass}>
            Trois projets, trois besoins terrain
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-base-content/65">
            Des produits utiles, pour mes propres projets comme pour des PME
            locales, avec un objectif de conversion clair.
          </p>
        </div>

        <article
          className={`qclay-reveal-item mt-10 ${cardClass}`}
          style={{ '--qclay-reveal-i': 0 } as React.CSSProperties}
        >
          <figure className="grid gap-2 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-center">
            <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-base-300 bg-base-200">
              <Image
                src={featuredCase.image}
                alt={featuredCase.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 620px"
                className="object-cover object-top"
              />
            </div>
            <figcaption className="px-2 pb-4 pt-5 lg:px-8 lg:py-6">
              <p className="text-sm font-medium text-[#2563eb]">
                {featuredCase.scope}
              </p>
              <h3 className="font-display mt-2 text-3xl font-semibold tracking-tight text-base-content">
                {featuredCase.title}
              </h3>
              <p className="mt-3 text-base leading-7 text-base-content/65">
                {featuredCase.context}
              </p>
              <p className="mt-4 rounded-lg bg-base-200 px-4 py-3 text-sm font-medium leading-6 text-base-content/75">
                {featuredCase.result}
              </p>
            </figcaption>
          </figure>
        </article>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {compactCases.map((caseStudy, index) => (
            <article
              key={caseStudy.title}
              className={`qclay-reveal-item ${cardClass}`}
              style={{ '--qclay-reveal-i': index + 1 } as React.CSSProperties}
            >
              <figure className="flex h-full flex-col">
                <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-base-300 bg-base-200">
                  <Image
                    src={caseStudy.image}
                    alt={caseStudy.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 520px"
                    className="object-cover object-top"
                  />
                </div>
                <figcaption className="flex flex-1 flex-col px-2 pb-4 pt-5 sm:px-4 sm:pb-5">
                  <p className="text-sm font-medium text-[#2563eb]">
                    {caseStudy.scope}
                  </p>
                  <h3 className="font-display mt-2 text-2xl font-semibold tracking-tight text-base-content">
                    {caseStudy.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-6 text-base-content/65">
                    {caseStudy.context}
                  </p>
                  <p className="mt-4 rounded-lg bg-base-200 px-4 py-3 text-sm font-medium leading-6 text-base-content/75">
                    {caseStudy.result}
                  </p>
                </figcaption>
              </figure>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
