import assert from 'node:assert/strict'
import test from 'node:test'

import { getBlogPost, getBlogPosts } from './blog.ts'

test('blog posts are read from MDX frontmatter and sorted by publication date', async () => {
  const posts = await getBlogPosts()

  assert.deepEqual(
    posts.map((post) => post.slug),
    [
      'automatiser-processus-n8n-sans-boite-noire',
      'creer-site-web-lyon-qui-aide-prendre-contact',
    ],
  )
  assert.ok(posts.every((post) => post.title))
  assert.ok(posts.every((post) => post.description))
  assert.ok(
    posts.every((post) => /^\d{4}-\d{2}-\d{2}$/.test(post.datePublished)),
  )
  assert.ok(
    posts.every((post) => /^\d{4}-\d{2}-\d{2}$/.test(post.dateModified)),
  )
  assert.ok(posts.every((post) => post.servicePath.startsWith('/services/')))
})

test('blog posts resolve by slug and reject unknown articles', async () => {
  assert.equal(
    (await getBlogPost('automatiser-processus-n8n-sans-boite-noire'))?.cluster,
    'automation',
  )
  assert.equal(await getBlogPost('unknown'), undefined)
})
