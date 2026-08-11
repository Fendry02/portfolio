const path = require('node:path')
const createMDX = require('@next/mdx')

const withMDX = createMDX({
  options: {
    remarkPlugins: ['remark-frontmatter'],
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  allowedDevOrigins: ['192.168.1.58'],
  turbopack: {
    rules: {
      '{*,next-mdx-rule}': {
        loaders: [
          {
            loader: '@next/mdx/mdx-js-loader',
            options: {
              providerImportSource: 'next-mdx-import-source-file',
              remarkPlugins: ['remark-frontmatter'],
            },
          },
        ],
        as: '*.tsx',
        condition: {
          path: /\.mdx$/,
        },
      },
    },
    resolveAlias: {
      'next-mdx-import-source-file': path.join(__dirname, 'mdx-components.tsx'),
    },
  },
}

module.exports = withMDX(nextConfig)
