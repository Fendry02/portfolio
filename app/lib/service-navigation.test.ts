import assert from 'node:assert/strict'
import test from 'node:test'

import { getBlogPost } from './blog.ts'
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

test('service resources resolve to published guides supporting the same service', async () => {
  for (const servicePath of servicePaths) {
    const resources = getServiceResources(servicePath)
    assert.equal(
      new Set(resources.map(({ href }) => href)).size,
      resources.length,
    )
    for (const resource of resources) {
      const post = await getBlogPost(resource.href.replace('/blog/', ''))
      assert.ok(post, `Missing guide: ${resource.href}`)
      assert.equal(post.servicePath, servicePath)
    }
  }
})

test('services without a published guide do not receive invented resources', () => {
  assert.deepEqual(getServiceResources(serviceRoutes.customAppLyon), [])
  assert.deepEqual(getServiceResources(serviceRoutes.aiTrainingLyon), [])
})
