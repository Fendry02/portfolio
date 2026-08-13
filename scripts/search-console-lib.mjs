import { createHash, randomBytes } from 'node:crypto'

const googleAuthorizationEndpoint =
  'https://accounts.google.com/o/oauth2/v2/auth'
const readOnlySearchConsoleScope =
  'https://www.googleapis.com/auth/webmasters.readonly'

function formatDate(date) {
  return date.toISOString().slice(0, 10)
}

function normalizeSearchRow(row) {
  const [query, page] = row.keys ?? []

  return {
    query,
    page,
    clicks: row.clicks,
    impressions: row.impressions,
    ctr: row.ctr,
    position: row.position,
  }
}

function sortByImpressions(rows) {
  return [...rows].sort(
    (first, second) => second.impressions - first.impressions,
  )
}

function toReportRow(row, dimensions) {
  return {
    ...Object.fromEntries(
      dimensions.map((dimension, index) => [dimension, row.keys?.[index]]),
    ),
    clicks: row.clicks,
    impressions: row.impressions,
    ctr: row.ctr,
    position: row.position,
  }
}

/**
 * Creates a Google OAuth authorization URL that can only read Search Console
 * data. The generated URL never includes a client secret.
 */
export function createAuthorizationUrl({
  clientId,
  redirectUri,
  state,
  codeChallenge,
}) {
  const url = new URL(googleAuthorizationEndpoint)
  url.searchParams.set('client_id', clientId)
  url.searchParams.set('redirect_uri', redirectUri)
  url.searchParams.set('response_type', 'code')
  url.searchParams.set('scope', readOnlySearchConsoleScope)
  url.searchParams.set('access_type', 'offline')
  url.searchParams.set('prompt', 'consent')
  url.searchParams.set('state', state)
  url.searchParams.set('code_challenge', codeChallenge)
  url.searchParams.set('code_challenge_method', 'S256')

  return url.toString()
}

export function createCodeVerifier() {
  return randomBytes(64).toString('base64url')
}

export function createCodeChallenge(codeVerifier) {
  return createHash('sha256').update(codeVerifier).digest('base64url')
}

/**
 * Uses a conservative three-day delay because Search Console data is not
 * always final for the most recent dates.
 */
export function getSearchAnalyticsDateRange({
  today = new Date(),
  days = 28,
  availabilityLagDays = 3,
} = {}) {
  const endDate = new Date(today)
  endDate.setUTCDate(endDate.getUTCDate() - availabilityLagDays)

  const startDate = new Date(endDate)
  startDate.setUTCDate(startDate.getUTCDate() - (days - 1))

  return { startDate: formatDate(startDate), endDate: formatDate(endDate) }
}

export function buildSearchAnalyticsRequest({
  startDate,
  endDate,
  dimensions,
}) {
  const aggregationType = dimensions.includes('page') ? 'auto' : 'byProperty'

  return {
    startDate,
    endDate,
    dimensions,
    type: 'web',
    aggregationType,
    rowLimit: 5000,
  }
}

/**
 * Identifies two actionable cohorts: visible pages that need a stronger
 * snippet, and relevant pages just outside the first results.
 */
export function selectSearchOpportunities(rows) {
  const normalizedRows = rows.map(normalizeSearchRow)

  const improveRank = sortByImpressions(
    normalizedRows
      .filter(
        ({ impressions, position }) =>
          impressions >= 10 && position > 10 && position <= 20,
      )
      .map((row) => ({
        ...row,
        recommendation: 'Renforcer le contenu et les liens internes.',
      })),
  )

  const improveCtr = sortByImpressions(
    normalizedRows
      .filter(
        ({ impressions, ctr, position }) =>
          impressions >= 20 && ctr < 0.03 && position >= 1 && position <= 10,
      )
      .map((row) => ({
        ...row,
        recommendation: 'Clarifier le titre et la meta description.',
      })),
  )

  return { improveRank, improveCtr }
}

export function createSearchConsoleReport({
  createdAt,
  siteUrl,
  period,
  queryPageRows,
  queryRows,
  pageRows,
}) {
  return {
    createdAt,
    source: 'Google Search Console',
    siteUrl,
    period,
    opportunities: selectSearchOpportunities(queryPageRows),
    topQueries: queryRows
      .slice(0, 25)
      .map((row) => toReportRow(row, ['query'])),
    topPages: pageRows.slice(0, 25).map((row) => toReportRow(row, ['page'])),
  }
}
