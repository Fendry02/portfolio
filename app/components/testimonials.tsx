import Image, { type StaticImageData } from 'next/image'

import electreauLogo from '@/public/works/electreau.png'
import vikoLogo from '@/public/works/viko.jpg'

type Testimonial = {
  quote: string
  name: string
  role: string
  company: string
  logo: StaticImageData
  logoAlt: string
  siteHref: string
  siteLabel: string
}

const accent = 'var(--brand-blue)'

const testimonials: Testimonial[] = [
  {
    quote:
      'Le site nous donne une image plus professionnelle et facilite les premiers échanges avec les clients.',
    name: 'Thibaut Cuny',
    role: 'Gérant',
    company: 'Electreau Lyon',
    logo: electreauLogo,
    logoAlt: 'Logo Electreau Lyon',
    siteHref: 'https://www.electreau-lyon.fr/',
    siteLabel: 'electreau-lyon.fr',
  },
  {
    quote:
      'Benoit a cadré le besoin rapidement, puis livré une solution claire et facile à gérer.',
    name: 'Victor Cavrois',
    role: 'Gérant',
    company: 'Chez Viko',
    logo: vikoLogo,
    logoAlt: 'Logo Chez Viko',
    siteHref: 'https://chezviko.fr',
    siteLabel: 'chezviko.fr',
  },
]

export default function Testimonials() {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className="qclay-section qclay-scroll-reveal cv-auto border-t border-base-300 py-20 lg:py-28"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="max-w-3xl">
          <h2
            id="testimonials-heading"
            className="font-display text-[clamp(2.1rem,3.4vw,3.35rem)] font-semibold leading-[1.08] tracking-tight"
          >
            Ce qu’en disent mes clients
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-base-content/65">
            Des retours de dirigeants de PME locales que j’ai accompagnés sur
            leur présence en ligne.
          </p>
        </div>

        <div className="qclay-reveal-grid mt-10 grid gap-6 md:grid-cols-2">
          {testimonials.map((testimonial) => (
            <figure
              key={`${testimonial.name}-${testimonial.company}`}
              className="qclay-subtle-card relative flex h-full flex-col rounded-2xl border border-base-300 bg-base-100 p-7 shadow-[0_18px_45px_oklch(20.8%_0.042_265.755/0.05)] sm:p-9"
            >
              <span
                aria-hidden="true"
                className="font-display text-6xl leading-none opacity-20"
                style={{ color: accent }}
              >
                “
              </span>
              <blockquote className="-mt-3 text-lg font-medium leading-8 tracking-tight text-base-content/85 sm:text-xl sm:leading-9">
                {testimonial.quote}
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4 border-t border-base-300 pt-6">
                <Image
                  src={testimonial.logo}
                  alt={testimonial.logoAlt}
                  width={44}
                  height={44}
                  className="h-11 w-11 shrink-0 rounded-lg border border-base-300 object-cover"
                />
                <span className="text-sm">
                  <span className="block font-semibold text-base-content">
                    {testimonial.name}
                  </span>
                  <span className="block text-base-content/65">
                    {testimonial.role}, {testimonial.company}
                  </span>
                </span>
                <a
                  href={testimonial.siteHref}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Voir le site de ${testimonial.company}`}
                  className="interactive ml-auto inline-flex shrink-0 items-center gap-1 text-sm font-medium text-[color:var(--brand-blue)] hover:underline"
                >
                  {testimonial.siteLabel}
                  <span aria-hidden="true">↗</span>
                </a>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
