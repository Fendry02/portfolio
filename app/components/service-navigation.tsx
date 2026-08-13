import Link from 'next/link'

import {
  getRelatedServices,
  getServiceResources,
  type ServicePath,
} from '@/app/lib/service-navigation'

type ServiceNavigationProps = {
  servicePath: ServicePath
}

const sectionTitle =
  'font-display text-[clamp(2.25rem,3.6vw,3.5rem)] font-semibold leading-[1.08] tracking-tight'

export function RelatedServiceLinks({ servicePath }: ServiceNavigationProps) {
  const relatedServices = getRelatedServices(servicePath)

  return (
    <section className="qclay-section qclay-scroll-reveal cv-auto border-y border-base-300 bg-base-200/50 px-6 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-base-content/65">
            Selon votre besoin
          </p>
          <h2 className={`mt-3 ${sectionTitle}`}>
            Deux prolongements possibles pour avancer sans bricoler.
          </h2>
        </div>
        <div className="qclay-reveal-grid mt-10 grid gap-4 sm:grid-cols-2">
          {relatedServices.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              className="interactive qclay-subtle-card group rounded-xl border border-base-300 bg-base-100 p-5"
            >
              <h3 className="text-lg font-semibold tracking-tight group-hover:text-[color:var(--brand-blue)]">
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-base-content/65">
                {service.description}
              </p>
              <span className="mt-5 inline-flex text-sm font-medium text-[color:var(--brand-blue)]">
                Découvrir ce service →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ServiceResources({ servicePath }: ServiceNavigationProps) {
  const resources = getServiceResources(servicePath)

  if (resources.length === 0) {
    return null
  }

  return (
    <section className="qclay-section qclay-scroll-reveal cv-auto px-6 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.38fr_0.62fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-base-content/65">
            Pour approfondir
          </p>
          <h2 className={`mt-3 ${sectionTitle}`}>
            Un guide pour préparer la bonne décision.
          </h2>
        </div>
        <div className="space-y-4">
          {resources.map((resource) => (
            <Link
              key={resource.href}
              href={resource.href}
              className="interactive qclay-subtle-card group block rounded-xl border border-base-300 bg-base-100 p-5"
            >
              <h3 className="text-lg font-semibold tracking-tight group-hover:text-[color:var(--brand-blue)]">
                {resource.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-base-content/65">
                {resource.description}
              </p>
              <span className="mt-5 inline-flex text-sm font-medium text-[color:var(--brand-blue)]">
                Lire le guide →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
