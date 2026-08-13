import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

import {
  assertSemScraperSuccess,
  createSerpRequests,
  summarizeSerpResults,
} from './serp-monitor-lib.mjs'

const apiBaseUrl = 'https://api.semscraper.com/v1'
const reportDirectory = 'reports/seo'

function getRequiredEnvironmentValue(name) {
  const value = process.env[name]?.trim()

  if (!value) {
    throw new Error(
      `${name} is required. Add it to .env.local; never commit or share this key.`,
    )
  }

  return value
}

function parseDevices(value) {
  const devices = (value ?? 'desktop,mobile')
    .split(',')
    .map((device) => device.trim())
    .filter(Boolean)

  if (
    devices.length === 0 ||
    devices.some((device) => !['desktop', 'mobile'].includes(device))
  ) {
    throw new Error('SEMSCRAPER_DEVICES must contain desktop and/or mobile.')
  }

  return devices
}

function parsePositiveInteger(value, defaultValue, name) {
  if (!value) {
    return defaultValue
  }

  const parsedValue = Number.parseInt(value, 10)
  if (!Number.isInteger(parsedValue) || parsedValue < 1) {
    throw new Error(`${name} must be a positive integer.`)
  }

  return parsedValue
}

function getRunConfiguration() {
  const depth = parsePositiveInteger(
    process.env.SEMSCRAPER_DEPTH,
    1,
    'SEMSCRAPER_DEPTH',
  )
  if (depth > 10) {
    throw new Error('SEMSCRAPER_DEPTH must not exceed 10.')
  }

  return {
    apiKey: process.env.SEMSCRAPER_API_KEY?.trim(),
    depth,
    devices: parseDevices(process.env.SEMSCRAPER_DEVICES),
    geolocation: process.env.SEMSCRAPER_GEOLOCATION?.trim() || 'Lyon, France',
    location: process.env.SEMSCRAPER_LOCATION?.trim() || 'fr',
    language: process.env.SEMSCRAPER_LANGUAGE?.trim() || 'fr',
    pollIntervalMs: parsePositiveInteger(
      process.env.SEMSCRAPER_POLL_INTERVAL_MS,
      2_000,
      'SEMSCRAPER_POLL_INTERVAL_MS',
    ),
    maxPolls: parsePositiveInteger(
      process.env.SEMSCRAPER_MAX_POLLS,
      15,
      'SEMSCRAPER_MAX_POLLS',
    ),
  }
}

async function fetchJson(url, options) {
  const response = await fetch(url, options)
  const payload = await response.json().catch(() => null)
  return assertSemScraperSuccess(payload, response)
}

function createRequestOptions(apiKey, body) {
  return {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }
}

function createReadOptions(apiKey) {
  return { headers: { Authorization: `Bearer ${apiKey}` } }
}

function wait(durationMs) {
  return new Promise((resolve) => setTimeout(resolve, durationMs))
}

async function fetchCompletedSerps({ apiKey, ids, pollIntervalMs, maxPolls }) {
  const url = new URL(`${apiBaseUrl}/serp`)
  url.searchParams.set('ids', ids.join(','))
  url.searchParams.set('output', 'json')

  for (let attempt = 1; attempt <= maxPolls; attempt += 1) {
    const payload = await fetchJson(url, createReadOptions(apiKey))
    const allSerpsAreReady = payload.data?.every(
      ({ status }) => status === 'done',
    )

    if (allSerpsAreReady) {
      return payload
    }

    if (attempt < maxPolls) {
      await wait(pollIntervalMs)
    }
  }

  throw new Error(
    `SemScraper did not finish within ${maxPolls} polling attempts. Try again later; created requests remain available in your account.`,
  )
}

function formatReportFileName(date) {
  return `serp-monitor-${date
    .toISOString()
    .replaceAll(':', '-')
    .replace(/\.\d{3}Z$/, 'Z')}.json`
}

function printSummary(summary) {
  for (const result of summary) {
    const placement = result.portfolioResult
      ? `position organique ${result.portfolioResult.organicRank}`
      : 'absent des 10 premiers résultats organiques'
    console.log(`${result.keyword} (${result.device}) — ${placement}`)
  }
}

async function main() {
  const configuration = getRunConfiguration()
  const requests = createSerpRequests(configuration)

  if (process.env.SEMSCRAPER_DRY_RUN === '1') {
    console.log(
      `${requests.length} requêtes prêtes pour ${configuration.geolocation}.`,
    )
    for (const request of requests) {
      console.log(`- ${request.keyword} (${request.device})`)
    }
    return
  }

  const apiKey =
    configuration.apiKey ?? getRequiredEnvironmentValue('SEMSCRAPER_API_KEY')
  const creationPayload = await fetchJson(
    `${apiBaseUrl}/serp`,
    createRequestOptions(apiKey, requests),
  )
  const ids = creationPayload.data?.map(({ id }) => id).filter(Boolean) ?? []

  if (ids.length !== requests.length) {
    throw new Error('SemScraper did not return an ID for every requested SERP.')
  }

  const resultPayload = await fetchCompletedSerps({
    ...configuration,
    apiKey,
    ids,
  })
  const summary = summarizeSerpResults(resultPayload)
  const createdAt = new Date()
  const report = {
    createdAt: createdAt.toISOString(),
    location: configuration.geolocation,
    language: configuration.language,
    depth: configuration.depth,
    queries: summary,
  }

  await mkdir(reportDirectory, { recursive: true })
  const reportPath = path.join(reportDirectory, formatReportFileName(createdAt))
  await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`)
  printSummary(summary)
  console.log(`Rapport enregistré dans ${reportPath}`)
}

main().catch((error) => {
  console.error(error.message)
  process.exitCode = 1
})
