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
  'font-display text-[clamp(2rem,3vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.025em]'

export function ServiceBreadcrumbs({ title }: { title: string }) {
  return (
    <nav
      aria-label="Fil d’Ariane"
      className="mx-auto max-w-6xl px-6 pt-6 text-sm text-base-content/60 lg:px-10"
    >
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link href="/" className="interactive hover:underline">
            Accueil
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li>
          <Link href="/services" className="interactive hover:underline">
            Services
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li aria-current="page">{title}</li>
      </ol>
    </nav>
  )
}

export function RelatedServiceLinks({ servicePath }: ServiceNavigationProps) {
  const relatedServices = getRelatedServices(servicePath)

  return (
    <section className="qclay-section qclay-scroll-reveal cv-auto bg-base-200/50 px-6 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <h2 className={`${sectionTitle}`}>
            Deux services pour aller plus loin.
          </h2>
        </div>
        <div className="qclay-reveal-grid mt-10 grid gap-4 sm:grid-cols-2">
          {relatedServices.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              className="interactive group rounded-xl bg-base-200/70 hover:bg-base-200 p-5"
            >
              <h3 className="text-lg font-semibold tracking-tight group-hover:text-[color:var(--brand-blue)]">
                {service.title}
              </h3>
              <p className="mt-2 text-base leading-7 text-base-content/70">
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
          <h2 className={`${sectionTitle}`}>
            Des guides pour préparer votre projet.
          </h2>
        </div>
        <div className="space-y-4">
          {resources.map((resource) => (
            <Link
              key={resource.href}
              href={resource.href}
              className="interactive group block rounded-xl bg-base-200/70 hover:bg-base-200 p-5"
            >
              <h3 className="text-lg font-semibold tracking-tight group-hover:text-[color:var(--brand-blue)]">
                {resource.title}
              </h3>
              <p className="mt-2 text-base leading-7 text-base-content/70">
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
