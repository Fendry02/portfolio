import type { serviceRoutes } from './seo'

export type ServicePath =
  (typeof serviceRoutes)[keyof typeof serviceRoutes]

export type ServiceNavigationLink = {
  href: ServicePath
  title: string
  description: string
}

export type ServiceResourceLink = {
  href: string
  title: string
  description: string
}

const relatedServices: Record<
  ServicePath,
  readonly ServiceNavigationLink[]
> = {
  '/services/creation-site-web-lyon': [
    {
      href: '/services/automatisation-n8n-lyon',
      title: 'Automatiser les demandes après la mise en ligne',
      description:
        'Relier un formulaire, un CRM et les bonnes notifications lorsque le volume ou le suivi le justifient.',
    },
    {
      href: '/services/application-web-sur-mesure-lyon',
      title: 'Créer un outil métier quand le site ne suffit plus',
      description:
        'Concevoir une interface sur mesure lorsque le projet doit aussi faire travailler une équipe ou des données.',
    },
  ],
  '/services/automatisation-n8n-lyon': [
    {
      href: '/services/application-web-sur-mesure-lyon',
      title: 'Donner une interface aux processus complexes',
      description:
        'Créer une application métier lorsque le workflow a besoin d’un espace de travail clair pour ses utilisateurs.',
    },
    {
      href: '/services/formation-ia-lyon',
      title: 'Aider l’équipe à adopter l’IA avec méthode',
      description:
        'Partir de cas d’usage réels, de règles de contrôle et des habitudes de travail de l’équipe.',
    },
  ],
  '/services/application-web-sur-mesure-lyon': [
    {
      href: '/services/automatisation-n8n-lyon',
      title: 'Relier l’application aux outils déjà en place',
      description:
        'Connecter les données, déclencher des actions et réduire les ressaisies grâce à des automatisations lisibles.',
    },
    {
      href: '/services/formation-ia-lyon',
      title: 'Accompagner les équipes dans les nouveaux usages IA',
      description:
        'Définir un cadre concret pour utiliser l’IA dans les tâches où elle apporte une valeur vérifiable.',
    },
  ],
  '/services/formation-ia-lyon': [
    {
      href: '/services/automatisation-n8n-lyon',
      title: 'Automatiser les usages validés après la formation',
      description:
        'Transformer un cas d’usage utile en workflow supervisé, sans perdre de vue les contrôles nécessaires.',
    },
    {
      href: '/services/application-web-sur-mesure-lyon',
      title: 'Concevoir un outil métier autour d’un besoin durable',
      description:
        'Créer une interface sur mesure lorsque le besoin dépasse un simple gain de productivité individuel.',
    },
  ],
}

const serviceResources: Partial<
  Record<ServicePath, readonly ServiceResourceLink[]>
> = {
  '/services/creation-site-web-lyon': [
    {
      href: '/blog/creer-site-web-lyon-qui-aide-prendre-contact',
      title: 'Créer un site web à Lyon qui aide vraiment à prendre contact',
      description:
        'Les choix de contenu et de confiance qui préparent une prise de contact.',
    },
  ],
  '/services/automatisation-n8n-lyon': [
    {
      href: '/blog/automatiser-processus-n8n-sans-boite-noire',
      title: 'Automatiser un processus avec n8n sans créer une boîte noire',
      description:
        'Une méthode pour concevoir un workflow lisible, vérifiable et maintenable.',
    },
  ],
}

export function getRelatedServices(servicePath: ServicePath) {
  return relatedServices[servicePath]
}

export function getServiceResources(servicePath: ServicePath) {
  return serviceResources[servicePath] ?? []
}
