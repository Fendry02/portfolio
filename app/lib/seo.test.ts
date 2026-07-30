import test from 'node:test'
import assert from 'node:assert/strict'

import {
  absoluteUrl,
  buildPageMetadata,
  createFaqPageJsonLd,
  createJsonLdGraph,
  createServiceJsonLd,
  createWebPageJsonLd,
  professionalServiceJsonLd,
  seoKeywords,
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
  assert.deepEqual(siteConfig.alternateNames, [
    'B/B',
    'bbenoit',
    'bbenoit.fr',
  ])
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

test('n8n automation has a stable service route and discoverable keyword', () => {
  assert.equal(
    serviceRoutes.automationN8nLyon,
    '/services/automatisation-n8n-lyon',
  )
  assert.ok(seoKeywords.includes('automatisation n8n'))
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
