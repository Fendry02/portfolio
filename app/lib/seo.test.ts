import test from 'node:test'
import assert from 'node:assert/strict'

import {
  absoluteUrl,
  buildPageMetadata,
  createStaticSitemapEntries,
  createFaqPageJsonLd,
  createJsonLdGraph,
  createServiceJsonLd,
  createWebPageJsonLd,
  professionalServiceJsonLd,
  routeRegistry,
  serviceOffers,
  serviceRoutes,
  siteConfig,
  websiteJsonLd,
} from './seo.ts'

test('absoluteUrl resolves paths from the site origin', () => {
  assert.equal(absoluteUrl('/jobs'), 'https://www.bbenoit.fr/jobs')
  assert.equal(absoluteUrl('/#offres'), 'https://www.bbenoit.fr/#offres')
})

test('buildPageMetadata keeps page title concise and brands social titles', () => {
  const metadata = buildPageMetadata({
    title: 'Création de sites web',
    description: 'Description courte',
    path: '/',
  })

  assert.equal(metadata.title, 'Création de sites web')
  assert.equal(
    metadata.openGraph?.title,
    `Création de sites web | ${siteConfig.name}`,
  )
  assert.equal(metadata.alternates?.canonical, siteConfig.url + '/')
  assert.deepEqual(metadata.alternates?.types, {
    'application/rss+xml': [
      {
        url: '/blog/rss.xml',
        title: 'Articles de Benoit Bruynbroeck',
      },
    ],
  })
  assert.equal(metadata.keywords, undefined)
})

test('the default site intent targets the freelance developer query in Lyon', () => {
  assert.equal(
    siteConfig.defaultTitle,
    'Développeur web freelance à Lyon | Benoit Bruynbroeck',
  )
  assert.match(
    siteConfig.description,
    /Benoit Bruynbroeck, développeur web freelance à Lyon/i,
  )
})

test('website structured data exposes the recognized bbenoit brand aliases', () => {
  assert.deepEqual(siteConfig.alternateNames, ['B/B', 'bbenoit', 'bbenoit.fr'])
  assert.deepEqual(websiteJsonLd.alternateName, siteConfig.alternateNames)
})

test('the legal identity contains verified business contact and registration details', () => {
  assert.equal(siteConfig.legal.name, 'Benoit Bruynbroeck EI')
  assert.equal(
    siteConfig.legal.status,
    'Entrepreneur individuel (micro-entrepreneur)',
  )
  assert.deepEqual(siteConfig.legal.address, {
    street: '302 rue Garibaldi',
    postalCode: '69007',
    city: 'Lyon',
    country: 'France',
    countryCode: 'FR',
  })
  assert.deepEqual(siteConfig.phone, {
    display: '06 98 48 11 21',
    international: '+33 6 98 48 11 21',
    href: 'tel:+33698481121',
  })
  assert.equal(siteConfig.legal.siren, '923 618 433')
  assert.equal(siteConfig.legal.siret, '923 618 433 00018')
  assert.equal(
    siteConfig.legal.vatStatement,
    'TVA non applicable, art. 293 B du CGI',
  )

  const normalizedSiren = siteConfig.legal.siren.replaceAll(' ', '')
  const normalizedSiret = siteConfig.legal.siret.replaceAll(' ', '')

  assert.match(normalizedSiren, /^\d{9}$/)
  assert.match(normalizedSiret, /^\d{14}$/)
  assert.equal(normalizedSiret.slice(0, 9), normalizedSiren)
})

test('professional service structured data exposes the verified local business details', () => {
  assert.equal(
    professionalServiceJsonLd.telephone,
    siteConfig.phone.international,
  )
  assert.deepEqual(professionalServiceJsonLd.address, {
    '@type': 'PostalAddress',
    streetAddress: siteConfig.legal.address.street,
    postalCode: siteConfig.legal.address.postalCode,
    addressLocality: siteConfig.legal.address.city,
    addressCountry: siteConfig.legal.address.countryCode,
  })
  assert.deepEqual(professionalServiceJsonLd.geo, {
    '@type': 'GeoCoordinates',
    latitude: 45.75119,
    longitude: 4.85356,
  })
  assert.ok(
    (professionalServiceJsonLd.areaServed as Array<{ name: string }>).some(
      ({ name }) => name === 'Métropole de Lyon',
    ),
  )
  assert.deepEqual(professionalServiceJsonLd.openingHoursSpecification, [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
      timezone: 'Europe/Paris',
    },
  ])
  assert.deepEqual(professionalServiceJsonLd.knowsLanguage, ['fr-FR', 'en'])
})

test('buildPageMetadata can keep a utility page crawlable but out of the index', () => {
  const metadata = buildPageMetadata({
    title: 'Mentions légales',
    description: 'Informations légales',
    path: '/mentions-legales',
    index: false,
  })

  assert.deepEqual(metadata.robots, {
    index: false,
    follow: true,
  })
  assert.equal(
    metadata.alternates?.canonical,
    'https://www.bbenoit.fr/mentions-legales',
  )
})

test('createJsonLdGraph wraps schema nodes in a schema.org graph', () => {
  const graph = createJsonLdGraph([
    createWebPageJsonLd({
      path: '/',
      name: 'Accueil',
      description: 'Page d’accueil',
    }),
  ])

  assert.equal(graph['@context'], 'https://schema.org')
  assert.ok(Array.isArray(graph['@graph']))
})

test('createServiceJsonLd describes a service page', () => {
  const service = createServiceJsonLd({
    path: serviceRoutes.websiteCreationLyon,
    name: 'Création de site web à Lyon',
    description: 'Création de site web professionnel à Lyon.',
  })

  assert.equal(service['@type'], 'Service')
  assert.equal(
    service.url,
    'https://www.bbenoit.fr/services/creation-site-web-lyon',
  )
})

test('service routes provide a destination for every advertised offer', () => {
  assert.equal(
    serviceRoutes.automationN8nLyon,
    '/services/automatisation-n8n-lyon',
  )
  assert.equal(
    serviceRoutes.customAppLyon,
    '/services/application-web-sur-mesure-lyon',
  )
  assert.equal(serviceRoutes.aiTrainingLyon, '/services/formation-ia-lyon')
  assert.ok(
    serviceOffers.every((offer) => offer.url !== '/#offres'),
    'every offer points to a dedicated service page',
  )
})

test('createServiceJsonLd supports the specific service type', () => {
  const service = createServiceJsonLd({
    path: '/services/automatisation-n8n-lyon',
    name: 'Automatisation n8n à Lyon',
    description: 'Conception de workflows n8n sur mesure.',
    serviceType: 'Automatisation de processus avec n8n',
  })

  assert.equal(service.serviceType, 'Automatisation de processus avec n8n')
})

test('createFaqPageJsonLd creates FAQPage structured data', () => {
  const faq = createFaqPageJsonLd([
    {
      question: 'Question ?',
      answer: 'Réponse.',
    },
  ])

  assert.equal(faq['@type'], 'FAQPage')
  assert.deepEqual(
    (faq.mainEntity as Array<{ '@type': string }>)[0]['@type'],
    'Question',
  )
})

test('the route registry dates every static indexable route exactly once', () => {
  const paths = routeRegistry.map((route) => route.path)

  assert.equal(new Set(paths).size, paths.length)
  assert.ok(routeRegistry.every((route) => route.lastModified instanceof Date))
  assert.deepEqual(paths, [
    '/',
    '/jobs',
    serviceRoutes.websiteCreationLyon,
    serviceRoutes.automationN8nLyon,
    serviceRoutes.customAppLyon,
    serviceRoutes.aiTrainingLyon,
    '/realisations',
    '/realisations/petit-nid',
    '/realisations/electreau-lyon',
    '/realisations/chez-viko',
    '/blog',
  ])
})

test('the sitemap entries map the static route registry one-for-one', () => {
  const entries = createStaticSitemapEntries()

  assert.deepEqual(
    entries.map((entry) => entry.url),
    routeRegistry.map((route) => absoluteUrl(route.path)),
  )
  assert.deepEqual(
    entries.map((entry) => entry.lastModified),
    routeRegistry.map((route) => route.lastModified),
  )
})
