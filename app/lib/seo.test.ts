import test from 'node:test'
import assert from 'node:assert/strict'

import {
  absoluteUrl,
  buildPageMetadata,
  createFaqPageJsonLd,
  createJsonLdGraph,
  createServiceJsonLd,
  createWebPageJsonLd,
  serviceRoutes,
  siteConfig,
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
