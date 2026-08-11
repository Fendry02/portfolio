import { getBlogPosts } from '@/app/lib/blog'
import { absoluteUrl, siteConfig } from '@/app/lib/seo'

export const dynamic = 'force-static'

function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

export async function GET() {
  const posts = await getBlogPosts()
  const lastBuildDate = new Date(
    `${posts[0]?.dateModified ?? '2026-08-11'}T12:00:00.000Z`,
  ).toUTCString()
  const items = posts
    .map((post) => {
      const url = absoluteUrl(`/blog/${post.slug}`)

      return `
        <item>
          <title>${escapeXml(post.title)}</title>
          <description>${escapeXml(post.description)}</description>
          <link>${url}</link>
          <guid isPermaLink="true">${url}</guid>
          <pubDate>${new Date(`${post.datePublished}T12:00:00.000Z`).toUTCString()}</pubDate>
        </item>`
    })
    .join('')

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0">
      <channel>
        <title>${escapeXml(siteConfig.name)} — Blog</title>
        <description>Conseils n8n et création de site web de ${escapeXml(siteConfig.name)}.</description>
        <link>${absoluteUrl('/blog')}</link>
        <lastBuildDate>${lastBuildDate}</lastBuildDate>${items}
      </channel>
    </rss>`

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  })
}
