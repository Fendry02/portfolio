const fetchBaseUrl = stripTrailingSlash(
  process.env.SEO_AUDIT_BASE_URL ?? 'https://bbenoit.fr',
)
const siteUrl = stripTrailingSlash(
  process.env.SEO_SITE_URL ?? 'https://www.bbenoit.fr',
)

const pages = [
  {
    path: '/',
    title: 'Développeur web freelance à Lyon | Benoit Bruynbroeck',
    canonical: siteUrl,
    descriptionIncludes: 'développeur web freelance à Lyon',
    h1Includes: 'Développeur web freelance à Lyon',
    contentIncludes: ['Benoit Bruynbroeck'],
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
    mainLanguage: 'en',
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
    contentIncludes: ['développeur web freelance', 'Benoit Bruynbroeck'],
    requiredInternalLinks: [
      '/services/automatisation-n8n-lyon',
      '/services/application-web-sur-mesure-lyon',
      '/blog/creer-site-web-lyon-qui-aide-prendre-contact',
    ],
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
  {
    path: '/services/automatisation-n8n-lyon',
    title: 'Automatisation n8n à Lyon | Benoit Bruynbroeck',
    canonical: `${siteUrl}/services/automatisation-n8n-lyon`,
    descriptionIncludes: 'Automatisation n8n à Lyon',
    contentIncludes: ['développeur web freelance', 'Benoit Bruynbroeck'],
    requiredInternalLinks: [
      '/services/application-web-sur-mesure-lyon',
      '/services/formation-ia-lyon',
      '/blog/automatiser-processus-n8n-sans-boite-noire',
    ],
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
  {
    path: '/services/application-web-sur-mesure-lyon',
    title: 'Application web sur mesure à Lyon | Benoit Bruynbroeck',
    canonical: `${siteUrl}/services/application-web-sur-mesure-lyon`,
    descriptionIncludes: 'Application web sur mesure à Lyon',
    h1Includes: 'Application web sur mesure à Lyon',
    contentIncludes: ['processus métier', 'Petit Nid'],
    requiredInternalLinks: [
      '/services/automatisation-n8n-lyon',
      '/services/formation-ia-lyon',
    ],
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
  {
    path: '/services/formation-ia-lyon',
    title: 'Formation IA à Lyon | Benoit Bruynbroeck',
    canonical: `${siteUrl}/services/formation-ia-lyon`,
    descriptionIncludes: 'Formation IA à Lyon',
    h1Includes: 'Formation IA à Lyon',
    contentIncludes: ['validation humaine', 'cas d’usage'],
    requiredInternalLinks: [
      '/services/automatisation-n8n-lyon',
      '/services/application-web-sur-mesure-lyon',
    ],
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
  {
    path: '/realisations',
    title: 'Réalisations web et applications | Benoit Bruynbroeck',
    canonical: `${siteUrl}/realisations`,
    descriptionIncludes: 'Études de cas',
    h1Includes: 'Des réalisations',
    contentIncludes: ['Petit Nid', 'Electreau Lyon', 'Chez Viko'],
    requiredJsonLdTypes: [
      'Person',
      'WebSite',
      'ProfessionalService',
      'CollectionPage',
      'ItemList',
      'BreadcrumbList',
    ],
  },
  {
    path: '/realisations/petit-nid',
    title: 'Petit Nid — Application de suivi bébé | Benoit Bruynbroeck',
    canonical: `${siteUrl}/realisations/petit-nid`,
    descriptionIncludes: 'Expliquer un produit sensible',
    h1Includes: 'Petit Nid',
    contentIncludes: ['Le blocage', 'La réponse', 'Le socle'],
    requiredJsonLdTypes: [
      'Person',
      'WebSite',
      'ProfessionalService',
      'Article',
      'ImageObject',
      'BreadcrumbList',
    ],
  },
  {
    path: '/realisations/electreau-lyon',
    title: 'Electreau Lyon — Artisan électricien | Benoit Bruynbroeck',
    canonical: `${siteUrl}/realisations/electreau-lyon`,
    descriptionIncludes: 'artisan lyonnais',
    h1Includes: 'Electreau Lyon',
    contentIncludes: ['Le blocage', 'La réponse', 'Le socle'],
    requiredJsonLdTypes: [
      'Person',
      'WebSite',
      'ProfessionalService',
      'Article',
      'ImageObject',
      'BreadcrumbList',
    ],
  },
  {
    path: '/realisations/chez-viko',
    title: 'Chez Viko — Restauration | Benoit Bruynbroeck',
    canonical: `${siteUrl}/realisations/chez-viko`,
    descriptionIncludes: 'Donner envie avant la visite',
    h1Includes: 'Chez Viko',
    contentIncludes: ['Le blocage', 'La réponse', 'Le socle'],
    requiredJsonLdTypes: [
      'Person',
      'WebSite',
      'ProfessionalService',
      'Article',
      'ImageObject',
      'BreadcrumbList',
    ],
  },
  {
    path: '/blog',
    title: 'Conseils n8n et création de site web | Benoit Bruynbroeck',
    canonical: `${siteUrl}/blog`,
    descriptionIncludes: 'automatisation n8n',
    h1Includes: 'Conseils n8n',
    contentIncludes: [
      'Automatiser un processus avec n8n sans créer une boîte noire',
      'Créer un site web à Lyon qui aide vraiment à prendre contact',
    ],
    requiredJsonLdTypes: [
      'Person',
      'WebSite',
      'ProfessionalService',
      'CollectionPage',
      'ItemList',
      'BreadcrumbList',
    ],
  },
  {
    path: '/blog/automatiser-processus-n8n-sans-boite-noire',
    title:
      'Automatiser un processus avec n8n sans créer une boîte noire | Benoit Bruynbroeck',
    canonical: `${siteUrl}/blog/automatiser-processus-n8n-sans-boite-noire`,
    descriptionIncludes: 'automatisation n8n',
    h1Includes: 'Automatiser un processus',
    contentIncludes: [
      'Commencer par le travail, pas par l’outil',
      'Prévoir les erreurs avant la mise en service',
    ],
    requiredJsonLdTypes: [
      'Person',
      'WebSite',
      'ProfessionalService',
      'BlogPosting',
      'BreadcrumbList',
    ],
  },
  {
    path: '/blog/creer-site-web-lyon-qui-aide-prendre-contact',
    title:
      'Créer un site web à Lyon qui aide vraiment à prendre contact | Benoit Bruynbroeck',
    canonical: `${siteUrl}/blog/creer-site-web-lyon-qui-aide-prendre-contact`,
    descriptionIncludes: 'site professionnel',
    h1Includes: 'Créer un site web à Lyon',
    contentIncludes: [
      'Clarifier une décision plutôt que remplir une page',
      'Donner des preuves lisibles dans le bon contexte',
    ],
    requiredJsonLdTypes: [
      'Person',
      'WebSite',
      'ProfessionalService',
      'BlogPosting',
      'BreadcrumbList',
    ],
  },
]

const utilityPages = [
  {
    path: '/mentions-legales',
    contentIncludes: [
      'Benoit Bruynbroeck EI',
      'Entrepreneur individuel (micro-entrepreneur)',
      '302 rue Garibaldi, 69007 Lyon, France',
      '06 98 48 11 21',
      'SIREN : 923 618 433',
      'SIRET : 923 618 433 00018',
      'TVA non applicable, art. 293 B du CGI',
    ],
    contentExcludes: ['à compléter'],
  },
  {
    path: '/confidentialite',
  },
  {
    path: '/introuvable',
    expectedStatus: 404,
    contentIncludes: ['Cette page n’existe pas ou plus.'],
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

async function fetchResource(path, expectedContentType, expectedStatus = 200) {
  const url = auditUrl(path)
  const response = await fetch(url)

  report(response.status === expectedStatus, `${url} returns ${expectedStatus}`)

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

function decodeHtmlText(value) {
  return value
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;|&#xA0;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&#x27;|&apos;/gi, "'")
    .replace(/\s+/g, ' ')
    .trim()
}

function readElementText(html, elementName) {
  const pattern = new RegExp(
    `<${elementName}[^>]*>([\\s\\S]*?)<\\/${elementName}>`,
    'i',
  )

  return decodeHtmlText(html.match(pattern)?.[1] ?? '')
}

function readElementAttribute(html, elementName, attributeName) {
  const pattern = new RegExp(`<${elementName}\\s+[^>]*>`, 'i')
  const tag = html.match(pattern)?.[0]

  return tag ? readAttribute(tag, attributeName) : undefined
}

function readVisibleText(html) {
  return decodeHtmlText(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' '),
  )
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

function readAnchorPaths(html) {
  const anchorTags = html.match(/<a\s+[^>]*>/gi) ?? []

  return new Set(
    anchorTags
      .map((tag) => readAttribute(tag, 'href'))
      .filter(Boolean)
      .map((href) => new URL(href, siteUrl).pathname),
  )
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

  if (page.h1Includes) {
    report(
      readElementText(html, 'h1').includes(page.h1Includes),
      `${page.path} H1 includes ${page.h1Includes}`,
    )
  }

  if (page.contentIncludes) {
    const visibleText = readVisibleText(html).toLocaleLowerCase('fr')

    for (const phrase of page.contentIncludes) {
      report(
        visibleText.includes(phrase.toLocaleLowerCase('fr')),
        `${page.path} visible content includes ${phrase}`,
      )
    }
  }

  if (page.requiredInternalLinks) {
    const anchorPaths = readAnchorPaths(html)

    for (const path of page.requiredInternalLinks) {
      report(
        anchorPaths.has(path),
        `${page.path} includes an internal link to ${path}`,
      )
    }
  }

  if (page.mainLanguage) {
    report(
      readElementAttribute(html, 'main', 'lang') === page.mainLanguage,
      `${page.path} main content declares lang=${page.mainLanguage}`,
    )
  }

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
    locs.includes(publicUrl('/services/automatisation-n8n-lyon')),
    'sitemap includes /services/automatisation-n8n-lyon',
  )
  report(
    locs.includes(publicUrl('/services/application-web-sur-mesure-lyon')),
    'sitemap includes /services/application-web-sur-mesure-lyon',
  )
  report(
    locs.includes(publicUrl('/services/formation-ia-lyon')),
    'sitemap includes /services/formation-ia-lyon',
  )
  report(
    locs.includes(publicUrl('/realisations')),
    'sitemap includes /realisations',
  )
  report(
    locs.includes(publicUrl('/realisations/petit-nid')),
    'sitemap includes /realisations/petit-nid',
  )
  report(
    locs.includes(publicUrl('/realisations/electreau-lyon')),
    'sitemap includes /realisations/electreau-lyon',
  )
  report(
    locs.includes(publicUrl('/realisations/chez-viko')),
    'sitemap includes /realisations/chez-viko',
  )
  report(locs.includes(publicUrl('/blog')), 'sitemap includes /blog')
  report(
    locs.includes(
      publicUrl('/blog/automatiser-processus-n8n-sans-boite-noire'),
    ),
    'sitemap includes the n8n blog post',
  )
  report(
    locs.includes(
      publicUrl('/blog/creer-site-web-lyon-qui-aide-prendre-contact'),
    ),
    'sitemap includes the website-creation blog post',
  )
  report(
    locs.every((loc) => !loc.includes('#')),
    'sitemap has no fragment URLs',
  )
  report(
    !locs.includes(publicUrl('/mentions-legales')),
    'sitemap excludes noindex legal notices',
  )
  report(
    !locs.includes(publicUrl('/confidentialite')),
    'sitemap excludes the noindex privacy policy',
  )

  for (const loc of locs) {
    const path = new URL(loc).pathname
    await fetchResource(path)
  }
}

async function auditNoIndexUtilityPages() {
  for (const page of utilityPages) {
    const response = await fetchResource(
      page.path,
      'text/html',
      page.expectedStatus,
    )
    const html = await response.text()
    const robots = (html.match(/<meta\s+[^>]*>/gi) ?? [])
      .filter((tag) => readAttribute(tag, 'name') === 'robots')
      .map((tag) => readAttribute(tag, 'content') ?? '')
      .join(',')

    report(robots.includes('noindex'), `${page.path} has a noindex directive`)
    report(robots.includes('follow'), `${page.path} keeps links followable`)

    const visibleText = readVisibleText(html)

    for (const phrase of page.contentIncludes ?? []) {
      report(
        visibleText.includes(phrase),
        `${page.path} visible content includes ${phrase}`,
      )
    }

    for (const phrase of page.contentExcludes ?? []) {
      report(
        !visibleText.includes(phrase),
        `${page.path} visible content excludes ${phrase}`,
      )
    }
  }
}

async function auditRss() {
  const response = await fetchResource('/blog/rss.xml', 'application/rss+xml')
  const feed = await response.text()

  report(
    feed.includes(
      publicUrl('/blog/automatiser-processus-n8n-sans-boite-noire'),
    ),
    'RSS includes the n8n blog post',
  )
  report(
    feed.includes(
      publicUrl('/blog/creer-site-web-lyon-qui-aide-prendre-contact'),
    ),
    'RSS includes the website-creation blog post',
  )

  const rootResponse = await fetchResource('/', 'text/html')
  const rootHtml = await rootResponse.text()

  report(
    rootHtml.includes('application/rss+xml') &&
      rootHtml.includes('/blog/rss.xml'),
    'homepage references the RSS feed',
  )
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
await auditNoIndexUtilityPages()
await auditRss()
await auditRobots()
await auditManifest()
await auditSocialImages()

if (failures.length > 0) {
  console.error(`\nSEO audit failed with ${failures.length} issue(s).`)
  process.exitCode = 1
} else {
  console.log(`\nSEO audit passed for ${fetchBaseUrl}`)
}
