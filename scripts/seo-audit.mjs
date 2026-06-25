const fetchBaseUrl = stripTrailingSlash(
  process.env.SEO_AUDIT_BASE_URL ?? 'https://bbenoit.fr',
)
const siteUrl = stripTrailingSlash(
  process.env.SEO_SITE_URL ?? 'https://bbenoit.fr',
)

const pages = [
  {
    path: '/',
    title:
      'Création de sites web et applications sur mesure | Benoit Bruynbroeck',
    canonical: siteUrl,
    descriptionIncludes: 'Développeur web full stack',
    requiredJsonLdTypes: [
      'Person',
      'WebSite',
      'ProfessionalService',
      'WebPage',
      'BreadcrumbList',
    ],
  },
  {
    path: '/jobs',
    title: 'JavaScript Tech Lead and full-stack developer | Benoit Bruynbroeck',
    canonical: `${siteUrl}/jobs`,
    descriptionIncludes: 'JavaScript Tech Lead',
    requiredJsonLdTypes: [
      'Person',
      'WebSite',
      'ProfessionalService',
      'ProfilePage',
      'BreadcrumbList',
    ],
  },
  {
    path: '/services/creation-site-web-lyon',
    title: 'Création de site web à Lyon | Benoit Bruynbroeck',
    canonical: `${siteUrl}/services/creation-site-web-lyon`,
    descriptionIncludes: 'Création de site web professionnel à Lyon',
    requiredJsonLdTypes: [
      'Person',
      'WebSite',
      'ProfessionalService',
      'WebPage',
      'Service',
      'FAQPage',
      'BreadcrumbList',
    ],
  },
]

const failures = []

function stripTrailingSlash(value) {
  return value.replace(/\/+$/, '')
}

function normalizeCanonical(value) {
  return stripTrailingSlash(value.trim())
}

function auditUrl(path) {
  return new URL(path, `${fetchBaseUrl}/`).toString()
}

function publicUrl(path) {
  return new URL(path, `${siteUrl}/`).toString()
}

function report(ok, label) {
  if (ok) {
    console.log(`PASS ${label}`)
    return
  }

  failures.push(label)
  console.error(`FAIL ${label}`)
}

async function fetchResource(path, expectedContentType) {
  const url = auditUrl(path)
  const response = await fetch(url)

  report(response.ok, `${url} returns ${response.status}`)

  if (expectedContentType) {
    const contentType = response.headers.get('content-type') ?? ''
    report(
      contentType.includes(expectedContentType),
      `${url} content-type includes ${expectedContentType}`,
    )
  }

  return response
}

function readAttribute(tag, attributeName) {
  const pattern = new RegExp(`${attributeName}=["']([^"']+)["']`, 'i')
  return tag.match(pattern)?.[1]
}

function readTitle(html) {
  return html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1].trim()
}

function readMeta(html, attributeName, attributeValue) {
  const tags = html.match(/<meta\s+[^>]*>/gi) ?? []
  const matchingTag = tags.find(
    (tag) => readAttribute(tag, attributeName) === attributeValue,
  )

  return matchingTag ? readAttribute(matchingTag, 'content') : undefined
}

function readLink(html, rel) {
  const tags = html.match(/<link\s+[^>]*>/gi) ?? []
  const matchingTag = tags.find((tag) => readAttribute(tag, 'rel') === rel)

  return matchingTag ? readAttribute(matchingTag, 'href') : undefined
}

function readJsonLdTypes(html) {
  const scripts = [
    ...html.matchAll(
      /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
    ),
  ]

  const types = new Set()

  for (const [, rawJson] of scripts) {
    try {
      collectJsonLdTypes(JSON.parse(rawJson), types)
    } catch (error) {
      failures.push(`JSON-LD parses correctly: ${error.message}`)
    }
  }

  return types
}

function collectJsonLdTypes(node, types) {
  if (!node || typeof node !== 'object') {
    return
  }

  if (Array.isArray(node)) {
    node.forEach((child) => collectJsonLdTypes(child, types))
    return
  }

  const type = node['@type']
  if (Array.isArray(type)) {
    type.forEach((item) => types.add(item))
  } else if (type) {
    types.add(type)
  }

  if (Array.isArray(node['@graph'])) {
    node['@graph'].forEach((child) => collectJsonLdTypes(child, types))
  }
}

async function auditPage(page) {
  const response = await fetchResource(page.path, 'text/html')
  const html = await response.text()

  const title = readTitle(html)
  report(title === page.title, `${page.path} title matches expected copy`)

  const description = readMeta(html, 'name', 'description')
  report(Boolean(description), `${page.path} has a meta description`)
  report(
    description?.includes(page.descriptionIncludes),
    `${page.path} description matches page intent`,
  )

  const canonical = readLink(html, 'canonical')
  report(Boolean(canonical), `${page.path} has a canonical link`)
  report(
    canonical ? normalizeCanonical(canonical) === page.canonical : false,
    `${page.path} canonical points to ${page.canonical}`,
  )

  report(
    readMeta(html, 'property', 'og:title') === page.title,
    `${page.path} has the expected Open Graph title`,
  )
  report(
    Boolean(readMeta(html, 'property', 'og:description')),
    `${page.path} has og:description`,
  )
  report(
    Boolean(readMeta(html, 'property', 'og:image')),
    `${page.path} has og:image`,
  )
  report(
    Boolean(readMeta(html, 'name', 'twitter:card')),
    `${page.path} has twitter:card`,
  )
  report(
    Boolean(readMeta(html, 'name', 'twitter:image')),
    `${page.path} has twitter:image`,
  )

  const jsonLdTypes = readJsonLdTypes(html)
  for (const type of page.requiredJsonLdTypes) {
    report(jsonLdTypes.has(type), `${page.path} JSON-LD includes ${type}`)
  }
}

async function auditSitemap() {
  const response = await fetchResource('/sitemap.xml', 'application/xml')
  const sitemap = await response.text()
  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
    ([, loc]) => loc,
  )

  report(locs.includes(publicUrl('/')), 'sitemap includes homepage')
  report(locs.includes(publicUrl('/jobs')), 'sitemap includes /jobs')
  report(
    locs.includes(publicUrl('/services/creation-site-web-lyon')),
    'sitemap includes /services/creation-site-web-lyon',
  )
  report(
    locs.every((loc) => !loc.includes('#')),
    'sitemap has no fragment URLs',
  )

  for (const loc of locs) {
    const path = new URL(loc).pathname
    await fetchResource(path)
  }
}

async function auditRobots() {
  const response = await fetchResource('/robots.txt', 'text/plain')
  const robots = await response.text()

  report(
    robots.includes('User-Agent: *'),
    'robots.txt has a default user-agent rule',
  )
  report(
    robots.includes(`Sitemap: ${publicUrl('/sitemap.xml')}`),
    'robots.txt points to the public sitemap',
  )
}

async function auditManifest() {
  const response = await fetchResource(
    '/manifest.webmanifest',
    'application/manifest+json',
  )
  const manifest = await response.json()

  report(Boolean(manifest.name), 'manifest has a name')
  report(Boolean(manifest.short_name), 'manifest has a short_name')
  report(
    Array.isArray(manifest.icons) && manifest.icons.length > 0,
    'manifest has icons',
  )
}

async function auditSocialImages() {
  await fetchResource('/opengraph-image', 'image/png')
  await fetchResource('/twitter-image', 'image/png')
  await fetchResource('/jobs/opengraph-image', 'image/png')
  await fetchResource('/jobs/twitter-image', 'image/png')
}

for (const page of pages) {
  await auditPage(page)
}

await auditSitemap()
await auditRobots()
await auditManifest()
await auditSocialImages()

if (failures.length > 0) {
  console.error(`\nSEO audit failed with ${failures.length} issue(s).`)
  process.exitCode = 1
} else {
  console.log(`\nSEO audit passed for ${fetchBaseUrl}`)
}
