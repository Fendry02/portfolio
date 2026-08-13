import assert from 'node:assert/strict'
import test from 'node:test'

import {
  assertSemScraperSuccess,
  createSerpRequests,
  summarizeSerpResults,
} from './serp-monitor-lib.mjs'

test('creates one localized Google query for every offer and device', () => {
  const requests = createSerpRequests({
    devices: ['desktop', 'mobile'],
    geolocation: 'Lyon, France',
  })

  assert.equal(requests.length, 8)
  assert.deepEqual(requests[0], {
    search_engine: 'google_search',
    keyword: 'création site web Lyon',
    device: 'desktop',
    depth: 1,
    location: 'fr',
    language: 'fr',
    geolocation: 'Lyon, France',
    priority: 1,
  })
  assert.equal(requests.at(-1).keyword, 'formation IA Lyon')
  assert.equal(requests.at(-1).device, 'mobile')
})

test('does not send monitor-only settings to the SemScraper API', () => {
  const [request] = createSerpRequests({
    devices: ['desktop'],
    geolocation: 'Lyon, France',
    apiKey: 'private-key',
    maxPolls: 10,
    pollIntervalMs: 2_000,
  })

  assert.deepEqual(Object.keys(request).sort(), [
    'depth',
    'device',
    'geolocation',
    'keyword',
    'language',
    'location',
    'priority',
    'search_engine',
  ])
})

test('accepts an explicit SemScraper search configuration', () => {
  const [request] = createSerpRequests({
    devices: ['mobile'],
    geolocation: 'Villeurbanne, France',
    depth: 2,
    location: 'fr',
    language: 'fr',
    priority: 3,
  })

  assert.equal(request.device, 'mobile')
  assert.equal(request.depth, 2)
  assert.equal(request.priority, 3)
  assert.equal(request.geolocation, 'Villeurbanne, France')
})

test('reports the portfolio organic rank separately from the visible SERP position', () => {
  const summary = summarizeSerpResults({
    data: [
      {
        id: 'serp-1',
        keyword: 'création site web Lyon',
        device: 'desktop',
        results: [
          {
            type: 'local_pack',
            items: [{ rank_type: 1, rank_serp: 1, domain: 'maps.google.com' }],
          },
          {
            type: 'organic',
            items: [
              {
                rank_type: 1,
                rank_serp: 4,
                domain: 'agency.example',
                url: 'https://agency.example/sites-lyon',
                title: 'Création site web Lyon',
              },
              {
                rank_type: 2,
                rank_serp: 5,
                domain: 'www.bbenoit.fr',
                url: 'https://www.bbenoit.fr/services/creation-site-web-lyon',
                title: 'Création de site web à Lyon',
              },
            ],
          },
        ],
      },
    ],
  })

  assert.deepEqual(summary, [
    {
      id: 'serp-1',
      keyword: 'création site web Lyon',
      device: 'desktop',
      portfolioResult: {
        organicRank: 2,
        serpRank: 5,
        url: 'https://www.bbenoit.fr/services/creation-site-web-lyon',
        title: 'Création de site web à Lyon',
      },
      topOrganicResults: [
        {
          organicRank: 1,
          serpRank: 4,
          domain: 'agency.example',
          url: 'https://agency.example/sites-lyon',
          title: 'Création site web Lyon',
        },
        {
          organicRank: 2,
          serpRank: 5,
          domain: 'www.bbenoit.fr',
          url: 'https://www.bbenoit.fr/services/creation-site-web-lyon',
          title: 'Création de site web à Lyon',
        },
      ],
    },
  ])
})

test('keeps an absent portfolio result explicit', () => {
  const summary = summarizeSerpResults({
    data: [
      {
        id: 'serp-2',
        keyword: 'automatisation n8n Lyon',
        device: 'mobile',
        results: [{ type: 'organic', items: [] }],
      },
    ],
  })

  assert.equal(summary[0].portfolioResult, null)
  assert.deepEqual(summary[0].topOrganicResults, [])
})

test('recognizes the portfolio domain without a www prefix', () => {
  const summary = summarizeSerpResults({
    data: [
      {
        id: 'serp-3',
        keyword: 'formation IA Lyon',
        device: 'desktop',
        results: [
          {
            type: 'organic',
            items: [
              {
                rank_type: 1,
                rank_serp: 1,
                domain: 'bbenoit.fr',
                url: 'https://bbenoit.fr/services/formation-ia-lyon',
                title: 'Formation IA à Lyon',
              },
            ],
          },
        ],
      },
    ],
  })

  assert.equal(summary[0].portfolioResult.organicRank, 1)
})

test('keeps a successful SemScraper payload available', () => {
  const payload = { status: 'success', data: [] }

  assert.equal(
    assertSemScraperSuccess(payload, {
      ok: true,
      status: 200,
      statusText: 'OK',
    }),
    payload,
  )
})

test('exposes SemScraper application errors returned with HTTP 200', () => {
  assert.throws(
    () =>
      assertSemScraperSuccess(
        {
          error: 'insufficient_funds',
          message: 'Your account balance is too low to process this request.',
          code: 402,
        },
        { ok: true, status: 200, statusText: 'OK' },
      ),
    {
      message:
        'SemScraper API error 402 (insufficient_funds): Your account balance is too low to process this request.',
    },
  )
})
