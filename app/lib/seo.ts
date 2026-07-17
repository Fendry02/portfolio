import type { Metadata } from 'next'

export type JsonLdNode = Record<string, unknown>

export const siteConfig = {
  name: 'Benoit Bruynbroeck',
  url: 'https://www.bbenoit.fr',
  email: 'bruy.benoit@gmail.com',
  locale: 'fr_FR',
  language: 'fr-FR',
  location: {
    city: 'Lyon',
    country: 'France',
  },
  defaultTitle:
    'Sites web, applications et automatisations n8n | Benoit Bruynbroeck',
  titleTemplate: '%s | Benoit Bruynbroeck',
  description:
    'Développeur full stack à Lyon pour créer des sites web, applications métier et automatisations n8n sur mesure, de la conception à la mise en production.',
  twitterHandle: '@benoit_bruynbroeck',
  sameAs: [
    'https://www.linkedin.com/in/benoit-bruynbroeck-a21214b4/',
    'https://github.com/Fendry02',
    'https://www.facebook.com/benoit.bruynbroeck/',
  ],
} as const

export const seoKeywords = [
  'création site internet',
  'création site web professionnel',
  'développeur web freelance',
  'développeur full stack JavaScript',
  'développeur Next.js',
  'développeur React',
  'développeur Vue.js',
  'application web sur mesure',
  'application métier',
  'automatisation n8n',
  'expert n8n Lyon',
  'workflow n8n',
  'automatisation de processus',
  'automatisation IA',
  'formation IA',
  'Next.js',
  'React',
  'Vue.js',
  'Node.js',
  'PostgreSQL',
  'TypeScript',
  'Lyon',
]

type OpenGraphImage = {
  url: string
  width: number
  height: number
  alt: string
}

export const defaultOpenGraphImage = {
  url: '/opengraph-image',
  width: 1200,
  height: 630,
  alt: 'Benoit Bruynbroeck - sites web, applications et automatisations n8n sur mesure',
} satisfies OpenGraphImage

export const jobsOpenGraphImage = {
  url: '/jobs/opengraph-image',
  width: 1200,
  height: 630,
  alt: 'Benoit Bruynbroeck - JavaScript Tech Lead and full-stack developer',
} satisfies OpenGraphImage

export const serviceRoutes = {
  websiteCreationLyon: '/services/creation-site-web-lyon',
  automationN8nLyon: '/services/automatisation-n8n-lyon',
} as const

export const serviceOffers = [
  {
    name: 'Création de site web vitrine',
    description:
      'Création de sites web vitrines rapides, responsives et optimisés SEO pour générer des prospects qualifiés.',
    url: serviceRoutes.websiteCreationLyon,
  },
  {
    name: 'Développement d’application web et mobile',
    description:
      'Conception et développement d’applications web et mobiles sur mesure pour répondre à un besoin métier spécifique.',
    url: '/#offres',
  },
  {
    name: 'Automatisation n8n et IA',
    description:
      'Audit des processus et conception de workflows n8n fiables pour connecter les outils, automatiser les tâches répétitives et intégrer l’IA quand elle apporte une valeur concrète.',
    url: serviceRoutes.automationN8nLyon,
  },
  {
    name: 'Formation IA',
    description:
      'Formations pratiques pour aider les équipes à utiliser l’intelligence artificielle dans leurs workflows quotidiens.',
    url: '/#offres',
  },
] as const

export const siteLastModified = new Date('2026-07-18T00:00:00.000Z')

export function absoluteUrl(path = '/'): string {
  return new URL(path, siteConfig.url).toString()
}

function withBrand(title: string): string {
  return title.includes(siteConfig.name)
    ? title
    : `${title} | ${siteConfig.name}`
}

type PageMetadataInput = {
  title: string
  description: string
  path: string
  keywords?: string[]
  image?: OpenGraphImage
  locale?: string
}

export function buildPageMetadata({
  title,
  description,
  path,
  keywords = [],
  image = defaultOpenGraphImage,
  locale = siteConfig.locale,
}: PageMetadataInput): Metadata {
  const canonical = absoluteUrl(path)
  const socialTitle = withBrand(title)

  return {
    title,
    description,
    keywords: [...seoKeywords, ...keywords],
    alternates: {
      canonical,
    },
    openGraph: {
      title: socialTitle,
      description,
      url: canonical,
      siteName: siteConfig.name,
      locale,
      type: 'website',
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description,
      creator: siteConfig.twitterHandle,
      images: [image.url],
    },
  }
}

const personId = absoluteUrl('/#person')
const websiteId = absoluteUrl('/#website')
const professionalServiceId = absoluteUrl('/#professional-service')

export const personJsonLd: JsonLdNode = {
  '@type': 'Person',
  '@id': personId,
  name: siteConfig.name,
  url: siteConfig.url,
  image: absoluteUrl('/profile.jpg'),
  email: siteConfig.email,
  jobTitle: 'Développeur full stack JavaScript & Tech Lead',
  description: siteConfig.description,
  sameAs: siteConfig.sameAs,
  homeLocation: {
    '@type': 'Place',
    name: `${siteConfig.location.city}, ${siteConfig.location.country}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteConfig.location.city,
      addressCountry: 'FR',
    },
  },
  knowsAbout: [
    'JavaScript',
    'TypeScript',
    'React',
    'Next.js',
    'Vue.js',
    'Node.js',
    'PostgreSQL',
    'API Development',
    'Software Architecture',
    'Team Leadership',
    'n8n',
    'Workflow Automation',
    'Business Process Automation',
    'AI Automation',
  ],
  worksFor: {
    '@type': 'Organization',
    name: 'CitizenPlane',
    url: 'https://citizenplane.com',
  },
  alumniOf: [
    {
      '@type': 'Organization',
      name: 'Business & Decision',
    },
    {
      '@type': 'CollegeOrUniversity',
      name: 'ESIEE Amiens',
    },
  ],
}

export const websiteJsonLd: JsonLdNode = {
  '@type': 'WebSite',
  '@id': websiteId,
  url: siteConfig.url,
  name: siteConfig.name,
  description: siteConfig.description,
  inLanguage: siteConfig.language,
  publisher: {
    '@id': personId,
  },
}

export const professionalServiceJsonLd: JsonLdNode = {
  '@type': 'ProfessionalService',
  '@id': professionalServiceId,
  name: siteConfig.name,
  url: siteConfig.url,
  image: absoluteUrl('/profile.jpg'),
  email: siteConfig.email,
  description: siteConfig.description,
  priceRange: 'Sur devis',
  areaServed: [
    {
      '@type': 'Country',
      name: 'France',
    },
    {
      '@type': 'City',
      name: siteConfig.location.city,
    },
  ],
  founder: {
    '@id': personId,
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: siteConfig.location.city,
    addressCountry: 'FR',
  },
  sameAs: siteConfig.sameAs,
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Services web et IA',
    itemListElement: serviceOffers.map((offer) => ({
      '@type': 'Offer',
      url: absoluteUrl(offer.url),
      itemOffered: {
        '@type': 'Service',
        name: offer.name,
        description: offer.description,
        provider: {
          '@id': professionalServiceId,
        },
      },
    })),
  },
}

export function createJsonLdGraph(nodes: JsonLdNode[]): JsonLdNode {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes,
  }
}

export function createWebPageJsonLd({
  path,
  name,
  description,
  inLanguage = siteConfig.language,
}: {
  path: string
  name: string
  description: string
  inLanguage?: string
}): JsonLdNode {
  const url = absoluteUrl(path)

  return {
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name,
    description,
    inLanguage,
    isPartOf: {
      '@id': websiteId,
    },
    about: {
      '@id': professionalServiceId,
    },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: absoluteUrl(defaultOpenGraphImage.url),
      width: defaultOpenGraphImage.width,
      height: defaultOpenGraphImage.height,
    },
  }
}

export function createProfilePageJsonLd({
  path,
  name,
  description,
}: {
  path: string
  name: string
  description: string
}): JsonLdNode {
  const url = absoluteUrl(path)

  return {
    '@type': 'ProfilePage',
    '@id': `${url}#profile-page`,
    url,
    name,
    description,
    inLanguage: 'en',
    isPartOf: {
      '@id': websiteId,
    },
    mainEntity: {
      '@id': personId,
    },
  }
}

export function createBreadcrumbJsonLd(
  items: Array<{ name: string; path: string }>,
): JsonLdNode {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function createServiceJsonLd({
  path,
  name,
  description,
  serviceType = 'Création de site web professionnel',
}: {
  path: string
  name: string
  description: string
  serviceType?: string
}): JsonLdNode {
  return {
    '@type': 'Service',
    '@id': `${absoluteUrl(path)}#service`,
    name,
    description,
    serviceType,
    areaServed: [
      {
        '@type': 'City',
        name: siteConfig.location.city,
      },
      {
        '@type': 'Country',
        name: siteConfig.location.country,
      },
    ],
    provider: {
      '@id': professionalServiceId,
    },
    url: absoluteUrl(path),
  }
}

export function createFaqPageJsonLd(
  questions: Array<{ question: string; answer: string }>,
): JsonLdNode {
  return {
    '@type': 'FAQPage',
    mainEntity: questions.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}
