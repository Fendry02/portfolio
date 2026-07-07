import Image, { type StaticImageData } from 'next/image'

import electreauCapture from '@/public/works/electreau-capture.webp'
import petitNidCapture from '@/public/works/petitnid-capture.webp'

type CaseStudy = {
  title: string
  scope: string
  image: StaticImageData
  imageAlt: string
  context: string
  result: string
}

type Testimonial = {
  quote: string
  name: string
  role: string
  company: string
}

const caseStudies: CaseStudy[] = [
  {
    title: 'Petit Nid',
    scope: 'Projet fondateur, application mobile de suivi bébé',
    image: petitNidCapture,
    imageAlt:
      'Capture du site Petit Nid présentant une application mobile de suivi bébé',
    context:
      'Mon propre produit, conçu pour aider les parents à suivre les rythmes de leur bébé sans transformer le quotidien en tableau de bord.',
    result:
      "Résultat concret: une proposition lisible dès la première visite, un parcours d'inscription clair et une base produit prête à évoluer.",
  },
  {
    title: 'Electreau Lyon',
    scope: "Site vitrine d'électricien",
    image: electreauCapture,
    imageAlt:
      "Capture du site Electreau Lyon présentant les services d'un artisan local",
    context:
      "Un artisan lyonnais avait besoin d'une vitrine directe, rassurante et pensée pour les demandes urgentes sur mobile.",
    result:
      'Résultat concret: des services, avis et moyens de contact visibles tout de suite, pour générer des demandes plus qualifiées.',
  },
]

const testimonials: Testimonial[] = [
  {
    quote:
      'Le site nous donne une image plus professionnelle et facilite les premiers échanges avec les clients.',
    name: 'Thibaut Cuny',
    role: 'Gérant',
    company: 'Electreau Lyon',
  },
  {
    quote:
      'Benoit a cadré le besoin rapidement, puis livré une solution claire et facile à gérer.',
    name: 'Marc Dumas',
    role: 'Gérant',
    company: 'Chez Viko',
  },
]

const titleClass =
  'font-display text-[clamp(2.1rem,3.4vw,3.35rem)] font-semibold leading-[1.08] tracking-tight'

export default function CaseStudies() {
  const [featuredCase, compactCase] = caseStudies

  return (
    <section
      aria-labelledby="realisations-heading"
      className="qclay-section qclay-scroll-reveal cv-auto border-t border-base-300 py-20 lg:py-28"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="max-w-3xl">
          <h2 id="realisations-heading" className={titleClass}>
            Deux projets, deux besoins terrain
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-base-content/65">
            Des produits utiles, pour mes propres projets comme pour des PME
            locales, avec un objectif de conversion clair.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(19rem,0.75fr)] lg:items-start">
          <article className="qclay-subtle-card rounded-2xl border border-base-300 bg-base-100 p-3 shadow-[0_18px_45px_oklch(20.8%_0.042_265.755/0.05)]">
            <figure>
              <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-base-300 bg-base-200">
                {/* TODO: capture Petit Nid, 1440x900 */}
                <Image
                  src={featuredCase.image}
                  alt={featuredCase.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 720px"
                  className="object-cover object-top"
                />
              </div>
              <figcaption className="px-2 pb-4 pt-5 sm:px-4 sm:pb-5">
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

          <div className="grid gap-6">
            <article className="qclay-subtle-card rounded-2xl border border-base-300 bg-base-100 p-3 shadow-[0_18px_45px_oklch(20.8%_0.042_265.755/0.045)] lg:translate-y-12">
              <figure>
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-base-300 bg-base-200">
                  {/* TODO: capture Electreau Lyon, 1440x900 */}
                  <Image
                    src={compactCase.image}
                    alt={compactCase.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 420px"
                    className="object-cover object-top"
                  />
                </div>
                <figcaption className="px-2 pb-4 pt-5">
                  <p className="text-sm font-medium text-[#2563eb]">
                    {compactCase.scope}
                  </p>
                  <h3 className="font-display mt-2 text-2xl font-semibold tracking-tight text-base-content">
                    {compactCase.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-base-content/65">
                    {compactCase.context}
                  </p>
                  <p className="mt-4 rounded-lg bg-base-200 px-4 py-3 text-sm font-medium leading-6 text-base-content/75">
                    {compactCase.result}
                  </p>
                </figcaption>
              </figure>
            </article>

            <aside
              aria-labelledby="testimonials-heading"
              className="rounded-2xl border border-base-300 bg-base-200 p-5 lg:mt-12"
            >
              <h3
                id="testimonials-heading"
                className="font-display text-xl font-semibold tracking-tight text-base-content"
              >
                Témoignages
              </h3>
              <div className="mt-5 grid gap-4">
                {testimonials.map((testimonial) => (
                  <figure
                    key={`${testimonial.name}-${testimonial.company}`}
                    className="rounded-lg border border-base-300 bg-base-100 p-4"
                  >
                    <blockquote className="text-sm leading-6 text-base-content/75">
                      “{testimonial.quote}”
                    </blockquote>
                    <figcaption className="mt-4 text-sm">
                      <span className="font-semibold text-base-content">
                        {testimonial.name}
                      </span>
                      <span className="block text-base-content/55">
                        {testimonial.role}, {testimonial.company}
                      </span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  )
}
