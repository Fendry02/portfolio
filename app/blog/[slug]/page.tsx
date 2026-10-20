import Link from 'next/link'
import { notFound } from 'next/navigation'

import JsonLd from '@/app/components/json-ld'
import { getBlogPost, getBlogPosts } from '@/app/lib/blog'
import {
  absoluteUrl,
  buildPageMetadata,
  createBreadcrumbJsonLd,
  createJsonLdGraph,
  serviceOffers,
  siteConfig,
} from '@/app/lib/seo'

type PageProps = {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export async function generateStaticParams() {
  const posts = await getBlogPosts()

  return posts.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    return {}
  }

  return buildPageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    image: {
      url: `/blog/${post.slug}/opengraph-image`,
      width: 1200,
      height: 630,
      alt: post.title,
    },
    article: {
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified,
    },
  })
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'long',
  }).format(new Date(`${date}T12:00:00.000Z`))
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    notFound()
  }

  const { default: Post } = await import(`@/content/blog/${post.slug}.mdx`)
  const pagePath = `/blog/${post.slug}`
  const pageUrl = absoluteUrl(pagePath)
  const pageJsonLd = createJsonLdGraph([
    {
      '@type': 'BlogPosting',
      '@id': `${pageUrl}#blog-posting`,
      mainEntityOfPage: pageUrl,
      headline: post.title,
      description: post.description,
      datePublished: post.datePublished,
      dateModified: post.dateModified,
      author: { '@id': absoluteUrl('/#person') },
      publisher: { '@id': absoluteUrl('/#person') },
      inLanguage: siteConfig.language,
    },
    createBreadcrumbJsonLd([
      { name: 'Accueil', path: '/' },
      { name: 'Blog', path: '/blog' },
      { name: post.title, path: pagePath },
    ]),
  ])

  return (
    <main className="bg-base-100 text-base-content">
      <JsonLd data={pageJsonLd} />

      <article className="px-6 pb-20 pt-16 lg:px-10 lg:pb-28 lg:pt-24">
        <header className="mx-auto max-w-3xl">
          <Link
            href="/blog"
            className="interactive text-sm font-medium text-[color:var(--brand-blue)] hover:underline"
          >
            ← Tous les articles
          </Link>
          <h1 className="mt-8 text-[clamp(2.1rem,4.4vw,3.75rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
            {post.title}
          </h1>
          <p className="mt-7 text-base leading-7 text-base-content/70 md:text-lg md:leading-8">
            {post.description}
          </p>
          <p className="mt-7 text-sm text-base-content/60">
            {post.cluster === 'automation'
              ? 'n8n et automatisation'
              : 'Création de site web'}{' '}
            · Publié le{' '}
            <time dateTime={post.datePublished}>
              {formatDate(post.datePublished)}
            </time>
          </p>
        </header>

        <div className="prose prose-lg mx-auto mt-14 max-w-3xl prose-headings:font-display prose-headings:tracking-tight prose-p:leading-8 prose-a:text-[color:var(--brand-blue)] prose-a:font-medium prose-a:no-underline hover:prose-a:underline">
          <Post />
        </div>

        <aside className="mx-auto mt-16 max-w-3xl rounded-2xl bg-base-200/70 p-8 sm:p-10">
          <h2 className="font-display text-2xl font-semibold tracking-tight">
            Aller plus loin sur ce sujet
          </h2>
          <p className="mt-3 text-base leading-7 text-base-content/70">
            Si ce sujet rejoint un problème concret dans votre activité, le
            meilleur point de départ est d’en examiner le contexte et les
            contraintes.
          </p>
          <Link
            href={post.servicePath}
            className="interactive qclay-button mt-6 inline-flex items-center gap-2 rounded-lg bg-[color:var(--brand-blue)] px-5 py-3 text-sm font-medium text-white hover:bg-[color:var(--brand-blue-strong)]"
          >
            {
              serviceOffers.find((offer) => offer.url === post.servicePath)
                ?.name
            }{' '}
            à Lyon
            <span aria-hidden="true">→</span>
          </Link>
        </aside>
      </article>
    </main>
  )
}
