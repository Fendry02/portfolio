import assert from 'node:assert/strict'
import test from 'node:test'

import { serviceRoutes } from './seo.ts'
import {
  getRelatedServices,
  getServiceResources,
} from './service-navigation.ts'

const servicePaths = Object.values(serviceRoutes)

test('each service suggests two distinct, relevant next steps without linking to itself', () => {
  for (const servicePath of servicePaths) {
    const relatedServices = getRelatedServices(servicePath)

    assert.equal(relatedServices.length, 2)
    assert.equal(new Set(relatedServices.map(({ href }) => href)).size, 2)
    assert.ok(
      relatedServices.every(
        ({ href }) => href !== servicePath && servicePaths.includes(href),
      ),
    )
  }
})

test('the website and n8n services expose their supporting guides', () => {
  assert.deepEqual(getServiceResources(serviceRoutes.websiteCreationLyon), [
    {
      href: '/blog/creer-site-web-lyon-qui-aide-prendre-contact',
      title: 'Créer un site web à Lyon qui aide vraiment à prendre contact',
      description:
        'Les choix de contenu et de confiance qui préparent une prise de contact.',
    },
  ])
  assert.deepEqual(getServiceResources(serviceRoutes.automationN8nLyon), [
    {
      href: '/blog/automatiser-processus-n8n-sans-boite-noire',
      title: 'Automatiser un processus avec n8n sans créer une boîte noire',
      description:
        'Une méthode pour concevoir un workflow lisible, vérifiable et maintenable.',
    },
  ])
})

test('services without a published guide do not receive invented resources', () => {
  assert.deepEqual(getServiceResources(serviceRoutes.customAppLyon), [])
  assert.deepEqual(getServiceResources(serviceRoutes.aiTrainingLyon), [])
})
