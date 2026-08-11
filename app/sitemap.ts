import { MetadataRoute } from 'next'

import { getBlogPosts } from './lib/blog'
import { absoluteUrl, createStaticSitemapEntries } from './lib/seo'

export function staticSitemapEntries(): MetadataRoute.Sitemap {
  return createStaticSitemapEntries()
}

export async function blogSitemapEntries(): Promise<MetadataRoute.Sitemap> {
  const posts = await getBlogPosts()

  return posts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(`${post.dateModified}T00:00:00.000Z`),
    changeFrequency: 'monthly',
    priority: 0.65,
  }))
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [...staticSitemapEntries(), ...(await blogSitemapEntries())]
}
