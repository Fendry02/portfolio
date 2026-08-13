import assert from 'node:assert/strict'
import test from 'node:test'

import {
  buildSearchAnalyticsRequest,
  createCodeChallenge,
  createAuthorizationUrl,
  createSearchConsoleReport,
  getSearchAnalyticsDateRange,
  selectSearchOpportunities,
} from './search-console-lib.mjs'

test('builds a consent URL for the read-only Search Console scope', () => {
  const authorizationUrl = new URL(
    createAuthorizationUrl({
      clientId: 'client-id.apps.googleusercontent.com',
      redirectUri: 'http://127.0.0.1:42813/oauth2/callback',
      state: 'csrf-token',
      codeChallenge: 'pkce-challenge',
    }),
  )

  assert.equal(
    authorizationUrl.origin + authorizationUrl.pathname,
    'https://accounts.google.com/o/oauth2/v2/auth',
  )
  assert.equal(
    authorizationUrl.searchParams.get('client_id'),
    'client-id.apps.googleusercontent.com',
  )
  assert.equal(authorizationUrl.searchParams.get('response_type'), 'code')
  assert.equal(authorizationUrl.searchParams.get('access_type'), 'offline')
  assert.equal(authorizationUrl.searchParams.get('prompt'), 'consent')
  assert.equal(authorizationUrl.searchParams.get('state'), 'csrf-token')
  assert.equal(
    authorizationUrl.searchParams.get('code_challenge'),
    'pkce-challenge',
  )
  assert.equal(
    authorizationUrl.searchParams.get('code_challenge_method'),
    'S256',
  )
  assert.equal(
    authorizationUrl.searchParams.get('scope'),
    'https://www.googleapis.com/auth/webmasters.readonly',
  )
})

test('derives a URL-safe PKCE challenge from a code verifier', () => {
  assert.equal(
    createCodeChallenge('dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk'),
    'E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM',
  )
})

test('uses the last complete 28-day period for Search Console reporting', () => {
  const dateRange = getSearchAnalyticsDateRange({
    today: new Date('2026-08-13T12:00:00Z'),
  })

  assert.deepEqual(dateRange, {
    startDate: '2026-07-14',
    endDate: '2026-08-10',
  })
})

test('uses automatic aggregation whenever Search Console groups by page', () => {
  assert.deepEqual(
    buildSearchAnalyticsRequest({
      startDate: '2026-07-14',
      endDate: '2026-08-10',
      dimensions: ['query', 'page'],
    }),
    {
      startDate: '2026-07-14',
      endDate: '2026-08-10',
      dimensions: ['query', 'page'],
      type: 'web',
      aggregationType: 'auto',
      rowLimit: 5000,
    },
  )
})

test('uses property aggregation for a site-wide query without page data', () => {
  assert.equal(
    buildSearchAnalyticsRequest({
      startDate: '2026-07-14',
      endDate: '2026-08-10',
      dimensions: ['query'],
    }).aggregationType,
    'byProperty',
  )
})

test('selects ranking and click-through opportunities with their affected page', () => {
  const opportunities = selectSearchOpportunities([
    {
      keys: ['création site web Lyon', 'https://www.bbenoit.fr/'],
      clicks: 2,
      impressions: 100,
      ctr: 0.02,
      position: 8.1,
    },
    {
      keys: [
        'automatisation n8n Lyon',
        'https://www.bbenoit.fr/services/automatisation-n8n-lyon',
      ],
      clicks: 3,
      impressions: 50,
      ctr: 0.06,
      position: 11.2,
    },
    {
      keys: ['Benoit Bruynbroeck', 'https://www.bbenoit.fr/'],
      clicks: 40,
      impressions: 50,
      ctr: 0.8,
      position: 1.2,
    },
  ])

  assert.deepEqual(opportunities, {
    improveRank: [
      {
        query: 'automatisation n8n Lyon',
        page: 'https://www.bbenoit.fr/services/automatisation-n8n-lyon',
        clicks: 3,
        impressions: 50,
        ctr: 0.06,
        position: 11.2,
        recommendation: 'Renforcer le contenu et les liens internes.',
      },
    ],
    improveCtr: [
      {
        query: 'création site web Lyon',
        page: 'https://www.bbenoit.fr/',
        clicks: 2,
        impressions: 100,
        ctr: 0.02,
        position: 8.1,
        recommendation: 'Clarifier le titre et la meta description.',
      },
    ],
  })
})

test('excludes weak-signal and already dominant Search Console rows', () => {
  assert.deepEqual(
    selectSearchOpportunities([
      {
        keys: ['requête rare', 'https://www.bbenoit.fr/'],
        clicks: 0,
        impressions: 4,
        ctr: 0,
        position: 16,
      },
      {
        keys: ['requête leader', 'https://www.bbenoit.fr/'],
        clicks: 20,
        impressions: 30,
        ctr: 0.67,
        position: 2,
      },
    ]),
    { improveRank: [], improveCtr: [] },
  )
})

test('includes the strongest queries and pages alongside opportunities', () => {
  const report = createSearchConsoleReport({
    createdAt: '2026-08-13T16:48:56.000Z',
    siteUrl: 'sc-domain:bbenoit.fr',
    period: { startDate: '2026-07-14', endDate: '2026-08-10' },
    queryPageRows: [],
    queryRows: [
      {
        keys: ['benoit bruynbroeck'],
        clicks: 1,
        impressions: 12,
        ctr: 1 / 12,
        position: 2.5,
      },
    ],
    pageRows: [
      {
        keys: ['https://www.bbenoit.fr/'],
        clicks: 1,
        impressions: 24,
        ctr: 1 / 24,
        position: 5.3,
      },
    ],
  })

  assert.deepEqual(report.topQueries, [
    {
      query: 'benoit bruynbroeck',
      clicks: 1,
      impressions: 12,
      ctr: 1 / 12,
      position: 2.5,
    },
  ])
  assert.deepEqual(report.topPages, [
    {
      page: 'https://www.bbenoit.fr/',
      clicks: 1,
      impressions: 24,
      ctr: 1 / 24,
      position: 5.3,
    },
  ])
})
