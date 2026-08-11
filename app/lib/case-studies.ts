type RelatedService =
  | '/services/creation-site-web-lyon'
  | '/services/application-web-sur-mesure-lyon'

export type CaseStudy = {
  slug: string
  title: string
  client: string
  scope: string
  sector: string
  city: string
  challenge: string
  solution: string
  impact: string
  stack: readonly string[]
  image: string
  imageAlt: string
  href: string
  relatedService: RelatedService
  publishedAt: string
}

export const caseStudies = [
  {
    slug: 'petit-nid',
    title: 'Petit Nid',
    client: 'Petit Nid',
    scope: 'Projet fondateur, application mobile de suivi bébé',
    sector: 'Application de suivi bébé',
    city: 'Projet en ligne',
    challenge:
      'Expliquer un produit sensible en quelques secondes, sans noyer de jeunes parents dans une logique de tableau de bord.',
    solution:
      'Une page produit rassurante, mobile-first, qui met le bénéfice avant les fonctionnalités et guide vers l’inscription.',
    impact:
      'Une proposition lisible dès la première visite, un parcours clair et une base prête à évoluer.',
    stack: ['Next.js', 'React', 'TypeScript'],
    image: '/works/petitnid-capture.webp',
    imageAlt:
      'Capture du site Petit Nid présentant une application mobile de suivi bébé',
    href: 'https://petitnid.app',
    relatedService: '/services/application-web-sur-mesure-lyon',
    publishedAt: '2026-08-11',
  },
  {
    slug: 'electreau-lyon',
    title: 'Electreau Lyon',
    client: 'Electreau Lyon',
    scope: "Site vitrine d'électricien",
    sector: 'Artisan électricien',
    city: 'Lyon',
    challenge:
      'Un artisan lyonnais avait besoin d’une vitrine directe, rassurante et efficace sur mobile.',
    solution:
      'Services, avis, zones d’intervention et contact sont ramenés dans un parcours court.',
    impact:
      'Les demandes importantes sont plus faciles à qualifier dès le premier échange.',
    stack: ['Next.js', 'React', 'SEO local'],
    image: '/works/electreau-capture.webp',
    imageAlt:
      "Capture du site Electreau Lyon présentant les services d'un artisan local",
    href: 'https://www.electreau-lyon.fr/',
    relatedService: '/services/creation-site-web-lyon',
    publishedAt: '2026-08-11',
  },
  {
    slug: 'chez-viko',
    title: 'Chez Viko',
    client: 'Chez Viko',
    scope: 'Site vitrine de pizzeria',
    sector: 'Restauration',
    city: 'Lyon',
    challenge:
      'Donner envie avant la visite, tout en rendant les infos pratiques impossibles à rater.',
    solution:
      'La carte, les horaires, l’adresse et l’ambiance sont placés avant les détails secondaires.',
    impact:
      'Une adresse plus crédible en ligne et un parcours simple avant de réserver ou venir sur place.',
    stack: ['Next.js', 'React', 'SEO local'],
    image: '/works/chezviko-capture.webp',
    imageAlt: 'Capture du site Chez Viko, pizzeria au feu de bois à Lyon',
    href: 'https://chezviko.fr',
    relatedService: '/services/creation-site-web-lyon',
    publishedAt: '2026-08-11',
  },
] as const satisfies readonly CaseStudy[]

export function getCaseStudyBySlug(slug: string) {
  return caseStudies.find((caseStudy) => caseStudy.slug === slug)
}
