export interface TimelineEntry {
  period: string
  title: string
  role: string
  detail?: string
}

/** Most recent first. */
export const TIMELINE: readonly TimelineEntry[] = [
  {
    period: '2019 — now',
    title: 'CitizenPlane',
    role: 'Tech Lead — Leading team of 4+ developers on a scalable travel platform',
    detail: '40% perf gained · 60% deploy time saved · €500K+ projects',
  },
  {
    period: '2017 — 2019',
    title: 'Business & Decisions',
    role: 'CRM Consultant — Managed high-profile accounts (Accor Hotels, Norauto)',
    detail: '€200K+ projects delivered · 30% improved customer engagement',
  },
  {
    period: '2016 — 2017',
    title: 'PrixLibre',
    role: 'Junior Developer — Built e-commerce platform features (PHP, AngularJS)',
    detail: 'First professional experience in a startup environment',
  },
  {
    period: '2011 — 2016',
    title: 'ESIEE Amiens',
    role: 'Engineering degree in computer science',
    detail: 'Specialized in software engineering and database systems',
  },
]
