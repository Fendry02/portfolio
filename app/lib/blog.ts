import { readFile, readdir } from 'node:fs/promises'
import { join } from 'node:path'

import matter from 'gray-matter'
import { z } from 'zod'

const postFrontmatterSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  datePublished: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  dateModified: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  servicePath: z.enum([
    '/services/automatisation-n8n-lyon',
    '/services/creation-site-web-lyon',
  ]),
  cluster: z.enum(['automation', 'website']),
})

export type BlogPost = z.infer<typeof postFrontmatterSchema> & {
  slug: string
}

const postsDirectory = join(process.cwd(), 'content', 'blog')

async function readBlogPost(filename: string): Promise<BlogPost> {
  const slug = filename.replace(/\.mdx$/, '')
  const source = await readFile(join(postsDirectory, filename), 'utf8')
  const { data } = matter(source)

  return {
    slug,
    ...postFrontmatterSchema.parse(data),
  }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const filenames = await readdir(postsDirectory)
  const posts = await Promise.all(
    filenames.filter((filename) => filename.endsWith('.mdx')).map(readBlogPost),
  )

  return posts.sort(
    (left, right) =>
      right.datePublished.localeCompare(left.datePublished) ||
      left.slug.localeCompare(right.slug),
  )
}

export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  const posts = await getBlogPosts()

  return posts.find((post) => post.slug === slug)
}
