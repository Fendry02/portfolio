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
    <html lang="fr" data-theme="corporate">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Benoit Bruynbroeck',
              jobTitle: 'Développeur full stack JavaScript & Tech Lead',
              description:
                'Développeur full stack JavaScript spécialisé dans la création de sites web, applications métier et plateformes web sur mesure avec Next.js, Vue.js, Node.js et PostgreSQL.',
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
      {process.env.GOOGLE_ANALYTICS_ID && (
        <GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS_ID} />
      )}
    </html>
  )
}

export const metadata: Metadata = {
  title: 'Benoit Bruynbroeck | Sites web et applications sur mesure',
  description:
    'Création de sites web professionnels, applications métier et plateformes web sur mesure. Développeur full stack JavaScript spécialisé en Next.js, Vue.js, Node.js et PostgreSQL.',
  keywords: [
    'JavaScript',
    'Développeur full stack',
    'Création site web',
    'Application web sur mesure',
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
    title: 'Benoit Bruynbroeck | Sites web et applications sur mesure',
    description:
      'Création de sites web professionnels, applications métier et plateformes web sur mesure avec Next.js, Vue.js, Node.js et PostgreSQL.',
    url: 'https://bbenoit.fr',
    siteName: 'Benoit Bruynbroeck Portfolio',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: 'https://bbenoit.fr/profile.webp',
        width: 1200,
        height: 630,
        alt: 'Benoit Bruynbroeck - Développeur full stack JavaScript',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Benoit Bruynbroeck | Sites web et applications sur mesure',
    description:
      'Création de sites web professionnels, applications métier et plateformes web sur mesure.',
    images: ['https://bbenoit.fr/profile.webp'],
    creator: '@benoit_bruynbroeck',
  },
  alternates: {
    canonical: 'https://bbenoit.fr',
  },
  category: 'technology',
}
