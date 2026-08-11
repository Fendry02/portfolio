import Link from 'next/link'
import { notFound } from 'next/navigation'

import JsonLd from '@/app/components/json-ld'
import { getBlogPost, getBlogPosts } from '@/app/lib/blog'
import {
  absoluteUrl,
  buildPageMetadata,
  createBreadcrumbJsonLd,
  createJsonLdGraph,
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
          <p className="mt-8 text-sm font-medium text-[color:var(--brand-blue)]">
            {post.cluster === 'automation'
              ? 'n8n et automatisation'
              : 'Création de site web'}
          </p>
          <h1 className="mt-4 text-[clamp(2.5rem,5vw,4.75rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
            {post.title}
          </h1>
          <p className="mt-7 text-base leading-7 text-base-content/70 md:text-lg md:leading-8">
            {post.description}
          </p>
          <time
            dateTime={post.datePublished}
            className="mt-7 block text-sm text-base-content/55"
          >
            Publié le {formatDate(post.datePublished)}
          </time>
        </header>

        <div className="prose prose-lg mx-auto mt-14 max-w-3xl prose-headings:font-display prose-headings:tracking-tight prose-p:leading-8 prose-a:text-[color:var(--brand-blue)] prose-a:font-medium prose-a:no-underline hover:prose-a:underline">
          <Post />
        </div>

        <aside className="mx-auto mt-16 max-w-3xl border-t border-base-300 pt-10">
          <h2 className="font-display text-2xl font-semibold tracking-tight">
            Aller plus loin sur ce sujet
          </h2>
          <p className="mt-3 text-base leading-7 text-base-content/65">
            Si ce sujet rejoint un problème concret dans votre activité, le
            meilleur point de départ est d’en examiner le contexte et les
            contraintes.
          </p>
          <Link
            href={post.servicePath}
            className="interactive qclay-button mt-6 inline-flex items-center gap-2 rounded-lg bg-[color:var(--brand-blue)] px-5 py-3 text-sm font-medium text-white hover:bg-[color:var(--brand-blue-strong)]"
          >
            Découvrir le service associé
            <span aria-hidden="true">→</span>
          </Link>
        </aside>
      </article>
    </main>
  )
}
