import { MetadataRoute } from 'next'

import { absoluteUrl, serviceRoutes, siteLastModified } from './lib/seo'

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
    {
      url: absoluteUrl(serviceRoutes.websiteCreationLyon),
      lastModified: siteLastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ]
}
