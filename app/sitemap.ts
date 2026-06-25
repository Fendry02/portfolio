import { MetadataRoute } from 'next'

import { absoluteUrl, siteLastModified } from './lib/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteUrl('/'),
      lastModified: siteLastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: absoluteUrl('/jobs'),
      lastModified: siteLastModified,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
  ]
}
