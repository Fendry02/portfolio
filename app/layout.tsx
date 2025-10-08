import { GoogleAnalytics } from '@next/third-parties/google'
import type { Metadata } from 'next'

import './styles/global.css'

import Header from './components/header'
import Footer from './components/footer'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="cmyk">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "${metadata.title}",
              "image": [ "https://bbenoit.fr/avatar.svg"  ],
              "url": "https://bbenoit.fr/"
            }`,
          }}
        ></script>
      </head>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
      <GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS_ID || ''} />
    </html>
  )
}

export const metadata: Metadata = {
  title: 'Benoit Bruynbroeck | Fullstack developer',
  description: 'Benoit Bruynbroeck Portfolio',
  openGraph: {
    title: 'Benoit Bruynbroeck | Fullstack developer',
    description: 'Benoit Bruynbroeck Portfolio',
    url: 'https://bbenoit.fr',
    siteName: 'Benoit Bruynbroeck',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://bbenoit.fr/avatar.svg',
      },
    ],
  },
  twitter: {
    title: 'Benoit Bruynbroeck | Fullstack developer',
    description: 'Benoit Bruynbroeck Portfolio',
    card: 'summary_large_image',
    images: [
      {
        url: 'https://bbenoit.fr/avatar.svg',
      },
    ],
  },
}
