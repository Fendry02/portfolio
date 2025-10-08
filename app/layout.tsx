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
    <html lang="en" data-theme="corporate">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Benoit Bruynbroeck',
              jobTitle: 'JavaScript Tech Lead & Full Stack Developer',
              description:
                'Experienced JavaScript Tech Lead and Full Stack Developer specializing in Vue.js, Next.js, Node.js, and PostgreSQL. Leading development teams with expertise in scalable web applications.',
              url: 'https://bbenoit.fr',
              image: 'https://bbenoit.fr/profile.webp',
              sameAs: [
                'https://www.linkedin.com/in/benoit-bruynbroeck-a21214b4/',
                'https://github.com/benoit-bruynbroeck',
              ],
              knowsAbout: [
                'JavaScript',
                'Vue.js',
                'Next.js',
                'Node.js',
                'PostgreSQL',
                'TypeScript',
                'React',
                'Web Development',
                'Software Engineering',
                'Team Leadership',
                'API Development',
                'Database Design',
                'AWS',
                'Docker',
                'Kubernetes',
              ],
              worksFor: {
                '@type': 'Organization',
                name: 'CitizenPlane',
                url: 'https://citizenplane.com',
              },
              alumniOf: {
                '@type': 'Organization',
                name: 'Business & Decision',
              },
              hasOccupation: {
                '@type': 'Occupation',
                name: 'JavaScript Tech Lead',
                occupationLocation: {
                  '@type': 'Country',
                  name: 'France',
                },
                skills: [
                  'JavaScript',
                  'Vue.js',
                  'Next.js',
                  'Node.js',
                  'PostgreSQL',
                  'TypeScript',
                  'Team Leadership',
                  'Software Architecture',
                ],
              },
            }),
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
  title: 'Benoit Bruynbroeck | JavaScript Tech Lead & Full Stack Developer',
  description:
    'Experienced JavaScript Tech Lead and Full Stack Developer specializing in Vue.js, Next.js, Node.js, and PostgreSQL. Leading development teams at CitizenPlane with expertise in scalable web applications, RESTful APIs, and modern JavaScript frameworks.',
  keywords: [
    'JavaScript',
    'Tech Lead',
    'Full Stack Developer',
    'Vue.js',
    'Next.js',
    'Node.js',
    'PostgreSQL',
    'TypeScript',
    'React',
    'Web Development',
    'Software Engineering',
    'Team Leadership',
    'API Development',
    'Database Design',
    'AWS',
    'Docker',
    'Kubernetes',
  ],
  authors: [{ name: 'Benoit Bruynbroeck' }],
  creator: 'Benoit Bruynbroeck',
  publisher: 'Benoit Bruynbroeck',
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
    title: 'Benoit Bruynbroeck | JavaScript Tech Lead & Full Stack Developer',
    description:
      'Experienced JavaScript Tech Lead and Full Stack Developer specializing in Vue.js, Next.js, Node.js, and PostgreSQL. Leading development teams with expertise in scalable web applications.',
    url: 'https://bbenoit.fr',
    siteName: 'Benoit Bruynbroeck Portfolio',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://bbenoit.fr/profile.webp',
        width: 1200,
        height: 630,
        alt: 'Benoit Bruynbroeck - JavaScript Tech Lead & Full Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Benoit Bruynbroeck | JavaScript Tech Lead & Full Stack Developer',
    description:
      'Experienced JavaScript Tech Lead and Full Stack Developer specializing in Vue.js, Next.js, Node.js, and PostgreSQL.',
    images: ['https://bbenoit.fr/profile.webp'],
    creator: '@benoit_bruynbroeck',
  },
  alternates: {
    canonical: 'https://bbenoit.fr',
  },
  category: 'technology',
}
