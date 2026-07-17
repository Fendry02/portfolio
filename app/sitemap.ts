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
    {
      url: absoluteUrl(serviceRoutes.automationN8nLyon),
      lastModified: siteLastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: absoluteUrl('/mentions-legales'),
      lastModified: siteLastModified,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: absoluteUrl('/confidentialite'),
      lastModified: siteLastModified,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
  ]
}
