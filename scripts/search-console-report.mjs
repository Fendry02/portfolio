import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

import {
  createSearchConsoleReport,
  getSearchAnalyticsDateRange,
} from './search-console-lib.mjs'
import { fetchSearchAnalyticsRowGroups } from './search-console-report-requests.mjs'

const tokenPath = '.search-console/token.json'
const reportDirectory = 'reports/seo'
const defaultSiteUrl = 'sc-domain:bbenoit.fr'

function getRequiredEnvironmentValue(name) {
  const value = process.env[name]?.trim()

  if (!value) {
    throw new Error(
      `${name} is required. See the Search Console OAuth setup in README.md.`,
    )
  }

  return value
}

async function readRefreshToken() {
  try {
    const token = JSON.parse(await readFile(tokenPath, 'utf8'))
    if (token.refresh_token) {
      return token.refresh_token
    }
  } catch {
    // The direct error below tells the owner how to create a valid token.
  }

  throw new Error(
    'No local Google authorization found. Run npm run seo:gsc:auth first.',
  )
}

async function createAccessToken({ refreshToken, clientId, clientSecret }) {
  const body = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    refresh_token: refreshToken,
    grant_type: 'refresh_token',
  })
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  })
  const payload = await response.json().catch(() => null)

  if (!response.ok || !payload?.access_token) {
    throw new Error(
      payload?.error_description ?? 'Google token refresh failed.',
    )
  }

  return payload.access_token
}

async function querySearchAnalytics({ accessToken, siteUrl, body }) {
  const endpoint = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  const payload = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(
      payload?.error?.message ??
        `Search Console request failed (${response.status}).`,
    )
  }

  return payload.rows ?? []
}

function reportFileName(date) {
  return `search-console-${date
    .toISOString()
    .replaceAll(':', '-')
    .replace(/\.\d{3}Z$/, 'Z')}.json`
}

function printOpportunities(opportunities) {
  const printGroup = (title, rows) => {
    console.log(`${title}: ${rows.length}`)
    for (const row of rows.slice(0, 10)) {
      console.log(
        `- ${row.query} — position ${row.position.toFixed(1)}, ${row.impressions} impressions — ${row.page}`,
      )
    }
  }

  printGroup(
    'Requêtes à faire progresser (positions 11–20)',
    opportunities.improveRank,
  )
  printGroup(
    'Extraits à rendre plus attractifs (positions 1–10)',
    opportunities.improveCtr,
  )
}

async function main() {
  const clientId = getRequiredEnvironmentValue(
    'GOOGLE_SEARCH_CONSOLE_CLIENT_ID',
  )
  const clientSecret = getRequiredEnvironmentValue(
    'GOOGLE_SEARCH_CONSOLE_CLIENT_SECRET',
  )
  const siteUrl =
    process.env.GOOGLE_SEARCH_CONSOLE_SITE_URL?.trim() || defaultSiteUrl
  const refreshToken = await readRefreshToken()
  const accessToken = await createAccessToken({
    refreshToken,
    clientId,
    clientSecret,
  })
  const period = getSearchAnalyticsDateRange()
  const { queryPageRows, queryRows, pageRows } =
    await fetchSearchAnalyticsRowGroups({
      querySearchAnalytics,
      accessToken,
      siteUrl,
      period,
    })
  const createdAt = new Date()
  const report = createSearchConsoleReport({
    createdAt: createdAt.toISOString(),
    siteUrl,
    period,
    queryPageRows,
    queryRows,
    pageRows,
  })

  await mkdir(reportDirectory, { recursive: true })
  const reportPath = path.join(reportDirectory, reportFileName(createdAt))
  await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`)
  printOpportunities(report.opportunities)
  console.log(`Rapport enregistré dans ${reportPath}`)
}

main().catch((error) => {
  console.error(error.message)
  process.exitCode = 1
})
