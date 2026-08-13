import { buildSearchAnalyticsRequest } from './search-console-lib.mjs'

export async function fetchSearchAnalyticsRowGroups({
  querySearchAnalytics,
  accessToken,
  siteUrl,
  period,
}) {
  const queryPageDimensions = ['query', 'page']
  const queryDimensions = ['query']
  const pageDimensions = ['page']
  const [queryPageRows, queryRows, pageRows] = await Promise.all([
    querySearchAnalytics({
      accessToken,
      siteUrl,
      body: buildSearchAnalyticsRequest({
        ...period,
        dimensions: queryPageDimensions,
      }),
    }),
    querySearchAnalytics({
      accessToken,
      siteUrl,
      body: buildSearchAnalyticsRequest({
        ...period,
        dimensions: queryDimensions,
      }),
    }),
    querySearchAnalytics({
      accessToken,
      siteUrl,
      body: buildSearchAnalyticsRequest({
        ...period,
        dimensions: pageDimensions,
      }),
    }),
  ])

  return { queryPageRows, queryRows, pageRows }
}
