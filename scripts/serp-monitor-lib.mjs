export const trackedKeywords = Object.freeze([
  'création site web Lyon',
  'automatisation n8n Lyon',
  'application web sur mesure Lyon',
  'formation IA Lyon',
])

const defaultSearchOptions = Object.freeze({
  depth: 1,
  location: 'fr',
  language: 'fr',
  priority: 1,
})

/**
 * SemScraper can return an application error in an HTTP 200 response. Convert
 * either transport or application failures into an actionable error message.
 */
export function assertSemScraperSuccess(payload, response) {
  if (payload?.error) {
    const errorCode = payload.code ? ` ${payload.code}` : ''
    const errorName = payload.error ? ` (${payload.error})` : ''
    const details = payload.message ?? response.statusText
    throw new Error(`SemScraper API error${errorCode}${errorName}: ${details}`)
  }

  if (!response.ok) {
    const details = payload?.message ?? response.statusText
    throw new Error(
      `SemScraper request failed (${response.status}): ${details}`,
    )
  }

  return payload
}

function toOrganicResult(item) {
  return {
    organicRank: item.rank_type,
    serpRank: item.rank_serp,
    domain: item.domain,
    url: item.url,
    title: item.title,
  }
}

function isPortfolioDomain(domain) {
  const normalizedDomain = domain?.toLowerCase().replace(/^www\./, '')
  return normalizedDomain === 'bbenoit.fr'
}

function getOrganicItems(result) {
  const organicBlock = result.results?.find(({ type }) => type === 'organic')
  return organicBlock?.items ?? []
}

/**
 * Creates the Google SERP requests for the portfolio's four local offers.
 */
export function createSerpRequests({
  devices,
  geolocation,
  depth,
  location,
  language,
  priority,
}) {
  const options = {
    ...defaultSearchOptions,
    ...(depth ? { depth } : {}),
    ...(location ? { location } : {}),
    ...(language ? { language } : {}),
    ...(priority ? { priority } : {}),
    geolocation,
  }

  return trackedKeywords.flatMap((keyword) =>
    devices.map((device) => ({
      search_engine: 'google_search',
      keyword,
      device,
      ...options,
    })),
  )
}

/**
 * Keeps the useful competitive context while recording the portfolio's
 * organic placement independently from its absolute position in the SERP.
 */
export function summarizeSerpResults(payload) {
  return (payload.data ?? []).map((result) => {
    const topOrganicResults = [...getOrganicItems(result)]
      .sort((first, second) => first.rank_type - second.rank_type)
      .slice(0, 10)
      .map(toOrganicResult)

    const portfolioResult = topOrganicResults.find(({ domain }) =>
      isPortfolioDomain(domain),
    )

    return {
      id: result.id,
      keyword: result.keyword,
      device: result.device,
      portfolioResult: portfolioResult
        ? {
            organicRank: portfolioResult.organicRank,
            serpRank: portfolioResult.serpRank,
            url: portfolioResult.url,
            title: portfolioResult.title,
          }
        : null,
      topOrganicResults,
    }
  })
}
