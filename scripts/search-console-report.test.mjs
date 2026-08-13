import assert from 'node:assert/strict'
import test from 'node:test'

import { fetchSearchAnalyticsRowGroups } from './search-console-report-requests.mjs'

test('keeps Search Console query, query-page, and page rows in their report groups', async () => {
  const queryRows = [
    {
      keys: ['développeur web lyon'],
      clicks: 2,
      impressions: 20,
      ctr: 0.1,
      position: 9,
    },
  ]
  const queryPageRows = [
    {
      keys: ['développeur web lyon', 'https://www.bbenoit.fr/'],
      clicks: 2,
      impressions: 20,
      ctr: 0.1,
      position: 9,
    },
  ]
  const pageRows = [
    {
      keys: ['https://www.bbenoit.fr/'],
      clicks: 2,
      impressions: 20,
      ctr: 0.1,
      position: 9,
    },
  ]
  const requests = []

  const groups = await fetchSearchAnalyticsRowGroups({
    querySearchAnalytics: async ({ accessToken, siteUrl, body }) => {
      requests.push({ accessToken, siteUrl, ...body })

      if (body.dimensions.join(',') === 'query,page') {
        return queryPageRows
      }

      if (body.dimensions[0] === 'query') {
        return queryRows
      }

      return pageRows
    },
    accessToken: 'access-token',
    siteUrl: 'sc-domain:bbenoit.fr',
    period: { startDate: '2026-07-14', endDate: '2026-08-10' },
  })

  assert.deepEqual(groups, { queryPageRows, queryRows, pageRows })
  assert.deepEqual(
    requests.map(({ dimensions, aggregationType }) => ({
      dimensions,
      aggregationType,
    })),
    [
      { dimensions: ['query', 'page'], aggregationType: 'auto' },
      { dimensions: ['query'], aggregationType: 'byProperty' },
      { dimensions: ['page'], aggregationType: 'auto' },
    ],
  )
})
