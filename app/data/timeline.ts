export interface TimelineEntry {
  period: string
  title: string
  role: string
  detail?: string
  side: 'start' | 'end'
}

export const TIMELINE: readonly TimelineEntry[] = [
  {
    period: '2011-2016',
    title: 'ESIEE Amiens',
    role: 'Engineering degree in computer science',
    detail: 'Specialized in software engineering and database systems',
    side: 'start',
  },
  {
    period: '2016-2017',
    title: 'PrixLibre',
    role: 'Junior Developer at PrixLibre — Built e-commerce platform features using PHP and AngularJS',
    detail: 'First professional experience in startup environment',
    side: 'end',
  },
  {
    period: '2017-2019',
    title: 'Business & Decisions',
    role: 'CRM Consultant at Business & Decisions — Managed high-profile accounts (Accor Hotels, Norauto)',
    detail: 'Delivered €200K+ projects • 30% improved customer engagement',
    side: 'start',
  },
  {
    period: '2019-now',
    title: 'CitizenPlane',
    role: 'Tech Lead at CitizenPlane — Leading team of 4+ developers',
    detail: 'Scalable travel platform',
    side: 'end',
  },
]
