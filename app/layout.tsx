import { GoogleAnalytics } from '@next/third-parties/google'
import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Caveat, Geist } from 'next/font/google'

import './styles/global.css'

import Header from './components/header'
import Footer from './components/footer'
import JsonLd from './components/json-ld'
import {
  createJsonLdGraph,
  defaultOpenGraphImage,
  personJsonLd,
  professionalServiceJsonLd,
  seoKeywords,
  siteConfig,
  websiteJsonLd,
} from './lib/seo'

const handwriting = Caveat({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-handwriting',
  display: 'swap',
})

const display = Geist({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="fr"
      data-theme="corporate"
      className={`${handwriting.variable} ${display.variable}`}
    >
      <body>
        <JsonLd
          data={createJsonLdGraph([
            personJsonLd,
            websiteJsonLd,
            professionalServiceJsonLd,
          ])}
        />
        <Header />
        {children}
        <Footer />
        <Analytics />
      </body>
      {process.env.GOOGLE_ANALYTICS_ID && (
        <GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS_ID} />
      )}
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.defaultTitle,
    template: siteConfig.titleTemplate,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: seoKeywords,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/manifest.webmanifest',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: siteConfig.defaultTitle,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: 'website',
    images: [defaultOpenGraphImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.defaultTitle,
    description: siteConfig.description,
    creator: siteConfig.twitterHandle,
    images: [defaultOpenGraphImage.url],
  },
  alternates: {
    canonical: siteConfig.url,
  },
  category: 'technology',
}
