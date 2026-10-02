function readAttribute(tag, name) {
  return tag.match(
    new RegExp(`(?:^|\\s)${name}\\s*=\\s*["']([^"']*)["']`, 'i'),
  )?.[1]
}

function withoutScripts(html) {
  return html.replace(/<script\b[\s\S]*?<\/script>/gi, '')
}

export function readMainContent(html) {
  return (
    withoutScripts(html).match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? ''
  )
}

export function readAnchorPaths(html, siteUrl) {
  const origin = new URL(siteUrl).origin
  const paths = new Set()

  for (const [tag] of withoutScripts(html).matchAll(/<a\s+[^>]*>/gi)) {
    const href = readAttribute(tag, 'href')
    if (!href) continue
    try {
      const url = new URL(href, siteUrl)
      if (url.origin === origin) paths.add(url.pathname)
    } catch {
      // A malformed link cannot satisfy the internal-link requirement.
    }
  }
  return paths
}

export function hasNoIndexDirective(html, xRobotsTag = '') {
  const directives = [xRobotsTag]
  for (const [tag] of withoutScripts(html).matchAll(/<meta\s+[^>]*>/gi)) {
    const name = readAttribute(tag, 'name')?.toLowerCase()
    if (name === 'robots' || name === 'googlebot') {
      directives.push(readAttribute(tag, 'content') ?? '')
    }
  }
  return directives.some((value) =>
    /(?:^|[\s,:])(?:noindex|none)(?:$|[\s,])/i.test(value),
  )
}
