import Link from 'next/link'

import JsonLd from '@/app/components/json-ld'
import { getBlogPosts } from '@/app/lib/blog'
import {
  absoluteUrl,
  buildPageMetadata,
  createBreadcrumbJsonLd,
  createJsonLdGraph,
  siteConfig,
} from '@/app/lib/seo'

const pagePath = '/blog'
const pageTitle = 'Conseils n8n et création de site web'
const pageDescription =
  'Conseils concrets sur l’automatisation n8n et la création de site web : des méthodes pour clarifier un processus, une offre et les prochaines actions.'

export const metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
})

const sectionTitle =
  'font-display text-[clamp(2.25rem,3.6vw,3.5rem)] font-semibold leading-[1.08] tracking-tight'

function formatDate(date: string) {
  return new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'long',
  }).format(new Date(`${date}T12:00:00.000Z`))
}

export default async function BlogIndexPage() {
  const posts = await getBlogPosts()
  const pageJsonLd = createJsonLdGraph([
    {
      '@type': 'CollectionPage',
      '@id': `${absoluteUrl(pagePath)}#collection-page`,
      url: absoluteUrl(pagePath),
      name: pageTitle,
      description: pageDescription,
      inLanguage: siteConfig.language,
    },
    {
      '@type': 'ItemList',
      name: 'Articles sur l’automatisation et la création de site web',
      itemListElement: posts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: post.title,
        url: absoluteUrl(`/blog/${post.slug}`),
      })),
    },
    createBreadcrumbJsonLd([
      { name: 'Accueil', path: '/' },
      { name: 'Blog', path: pagePath },
    ]),
  ])

  return (
    <main className="bg-base-100 text-base-content">
      <JsonLd data={pageJsonLd} />

      <section className="qclay-hero px-6 pb-16 pt-16 lg:px-10 lg:pb-24 lg:pt-24">
        <div className="mx-auto max-w-6xl">
          <h1 className="max-w-4xl text-[clamp(2.6rem,6vw,5.25rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
            Conseils n8n et création de site web, pour des décisions plus
            simples.
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-7 text-base-content/70 md:text-lg md:leading-8">
            Des méthodes concrètes pour rendre un processus plus fiable,
            clarifier une présence en ligne et savoir où l’automatisation peut
            réellement aider.
          </p>
        </div>
      </section>

      <section className="qclay-section qclay-scroll-reveal cv-auto border-t border-base-300 px-6 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className={sectionTitle}>Les derniers articles</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="qclay-subtle-card flex flex-col rounded-xl border border-base-300 bg-base-100 p-6"
              >
                <p className="text-sm font-medium text-[color:var(--brand-blue)]">
                  {post.cluster === 'automation'
                    ? 'n8n et automatisation'
                    : 'Création de site web'}
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                  {post.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-base-content/65">
                  {post.description}
                </p>
                <div className="mt-7 flex items-center justify-between gap-4">
                  <time
                    dateTime={post.datePublished}
                    className="text-sm text-base-content/55"
                  >
                    {formatDate(post.datePublished)}
                  </time>
                  <Link
                    href={`/blog/${post.slug}`}
                    aria-label={`Lire l’article : ${post.title}`}
                    className="interactive shrink-0 text-sm font-medium text-[color:var(--brand-blue)] hover:underline"
                  >
                    Lire l’article →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
