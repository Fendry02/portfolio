import type { Metadata } from 'next'

export type JsonLdNode = Record<string, unknown>

export const siteConfig = {
  name: 'Benoit Bruynbroeck',
  url: 'https://bbenoit.fr',
  email: 'bruy.benoit@gmail.com',
  locale: 'fr_FR',
  language: 'fr-FR',
  location: {
    city: 'Lyon',
    country: 'France',
  },
  defaultTitle:
    'Création de sites web et applications sur mesure | Benoit Bruynbroeck',
  titleTemplate: '%s | Benoit Bruynbroeck',
  description:
    'Développeur full stack JavaScript à Lyon pour créer des sites web professionnels, applications métier et plateformes web sur mesure avec Next.js, React, Vue.js, Node.js et PostgreSQL.',
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
  alt: 'Benoit Bruynbroeck - création de sites web et applications sur mesure',
} satisfies OpenGraphImage

export const jobsOpenGraphImage = {
  url: '/jobs/opengraph-image',
  width: 1200,
  height: 630,
  alt: 'Benoit Bruynbroeck - JavaScript Tech Lead and full-stack developer',
} satisfies OpenGraphImage

export const serviceRoutes = {
  websiteCreationLyon: '/services/creation-site-web-lyon',
} as const

export const serviceOffers = [
  {
    name: 'Création de site web vitrine',
    description:
      'Création de sites web vitrines rapides, responsives et optimisés SEO pour générer des prospects qualifiés.',
  },
  {
    name: 'Développement d’application web et mobile',
    description:
      'Conception et développement d’applications web et mobiles sur mesure pour répondre à un besoin métier spécifique.',
  },
  {
    name: 'Audit et automatisation IA',
    description:
      'Audit des process, identification des opportunités IA et mise en place d’automatisations concrètes.',
  },
  {
    name: 'Formation IA',
    description:
      'Formations pratiques pour aider les équipes à utiliser l’intelligence artificielle dans leurs workflows quotidiens.',
  },
] as const

export const siteLastModified = new Date('2026-06-25T00:00:00.000Z')

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
      url: absoluteUrl('/#offres'),
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
}: {
  path: string
  name: string
  description: string
}): JsonLdNode {
  return {
    '@type': 'Service',
    '@id': `${absoluteUrl(path)}#service`,
    name,
    description,
    serviceType: 'Création de site web professionnel',
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
