import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Benoit Bruynbroeck — Portfolio',
    short_name: 'Benoit B.',
    description:
      'JavaScript Tech Lead & Full Stack Developer specializing in Vue.js, Next.js, Node.js, and PostgreSQL.',
    start_url: '/',
    display: 'standalone',
    background_color: '#10131c',
    theme_color: '#5fa6f5',
    icons: [
      { src: '/icon', sizes: '32x32', type: 'image/png' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
  }
}
