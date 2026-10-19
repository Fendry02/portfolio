import { getBlogPost, getBlogPosts } from '@/app/lib/blog'
import { ogImageSize, renderOgCard } from '@/app/lib/og-card'

export const alt =
  'Guide de Benoit Bruynbroeck, développeur web freelance à Lyon'
export const size = ogImageSize
export const contentType = 'image/png'

export async function generateStaticParams() {
  const posts = await getBlogPosts()

  return posts.map(({ slug }) => ({ slug }))
}

export default async function BlogPostOpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  return renderOgCard({
    eyebrow: 'Guide · Lyon',
    title: post?.title ?? 'Blog',
    subtitle: post?.description ?? '',
    footer: 'Benoit Bruynbroeck · bbenoit.fr/blog',
  })
}
