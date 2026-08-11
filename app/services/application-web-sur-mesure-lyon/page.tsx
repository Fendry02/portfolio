import AppVisual from '@/app/components/offer-visuals/AppVisual'
import ServicePage from '@/app/components/service-page'
import { caseStudies } from '@/app/lib/case-studies'
import { buildPageMetadata, serviceRoutes } from '@/app/lib/seo'

const pagePath = serviceRoutes.customAppLyon
const pageTitle = 'Application web sur mesure à Lyon'
const pageDescription =
  'Application web sur mesure à Lyon pour simplifier un processus métier, réunir vos données et donner à vos équipes un outil adapté à leur travail.'

export const metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
})

export default function CustomAppLyonPage() {
  return (
    <ServicePage
      path={pagePath}
      title={pageTitle}
      description={pageDescription}
      hero="Application web sur mesure à Lyon, pensée pour votre vrai métier."
      intro="Je conçois des applications web qui remplacent un processus dispersé par un outil clair, fiable et utilisable au quotidien. Le but n’est pas d’ajouter un logiciel de plus, mais de faire circuler la bonne information au bon moment."
      problemTitle="Un tableur partagé ne devrait pas devenir votre système d’information."
      problem={[
        'Quand un processus métier repose sur des fichiers, des emails et plusieurs outils, les décisions deviennent lentes et les informations importantes se perdent. Une application sur mesure part de ce qui bloque réellement le travail, puis donne une forme simple aux étapes, données et règles utiles.',
        'Mon rôle est de cadrer le besoin avec vous, de construire une première version concrète et de l’améliorer avec les retours des personnes qui l’utilisent. Les connexions à vos outils existants et les automatisations ne sont ajoutées que lorsqu’elles réduisent une friction réelle.',
      ]}
      deliverables={[
        'Cadrage des rôles, données et parcours prioritaires',
        'Interface web responsive conçue pour vos usages réels',
        'API, base de données et intégrations utiles',
        'Gestion des droits, validation et traçabilité adaptée',
        'Mise en ligne, suivi et plan d’évolution',
        'Documentation pour garder une base maintenable',
      ]}
      processSteps={[
        {
          title: 'Observer le flux existant',
          text: 'Nous identifions les décisions, les informations et les manipulations qui comptent vraiment avant de parler d’écrans.',
        },
        {
          title: 'Prioriser une première version utile',
          text: 'Le périmètre initial vise le gain le plus visible, avec des critères concrets pour savoir si l’outil aide réellement.',
        },
        {
          title: 'Construire et tester avec les utilisateurs',
          text: 'Les retours terrain guident les ajustements : vocabulaire, exceptions, droits et enchaînement des actions.',
        },
        {
          title: 'Faire évoluer sans repartir de zéro',
          text: 'La base technique reste lisible pour accueillir de nouvelles fonctions, connexions ou automatisations au bon rythme.',
        },
      ]}
      audiences={[
        {
          title: 'PME avec un processus spécifique',
          text: 'Transformer un fonctionnement informel en outil partagé sans le rigidifier inutilement.',
        },
        {
          title: 'Équipes opérationnelles',
          text: 'Réduire les doubles saisies, retrouver l’information et rendre les prochaines actions évidentes.',
        },
        {
          title: 'Fondateurs de produit',
          text: 'Passer d’une idée ou d’un prototype à une expérience web cohérente et prête à apprendre.',
        },
        {
          title: 'Directions qui doivent connecter leurs outils',
          text: 'Relier les étapes qui existent déjà plutôt que créer une nouvelle couche isolée.',
        },
      ]}
      faqItems={[
        {
          question: 'Quand une application sur mesure est-elle pertinente ?',
          answer:
            'Lorsqu’un processus important ne tient plus dans des outils généralistes, ou quand leur assemblage coûte plus de temps qu’il n’en fait gagner. Le cadrage sert justement à vérifier cette pertinence avant de développer.',
        },
        {
          question: 'Peut-on commencer petit ?',
          answer:
            'Oui. Une première version peut se concentrer sur un parcours, une équipe ou une décision. L’essentiel est qu’elle soit utilisable et qu’elle prépare les évolutions suivantes sans promettre tout dès le départ.',
        },
        {
          question: 'L’application peut-elle se connecter à nos outils ?',
          answer:
            'Oui, lorsque les outils proposent les accès nécessaires. Les connexions sont priorisées selon leur utilité : éviter une ressaisie, synchroniser une information importante ou déclencher une action clairement définie.',
        },
        {
          question: 'Qui garde la main après la mise en ligne ?',
          answer:
            'Vous conservez la visibilité sur le fonctionnement, les accès et les décisions d’évolution. Je documente la base construite pour que la suite ne dépende pas d’une boîte noire.',
        },
      ]}
      visual={<AppVisual />}
      relatedCaseStudies={caseStudies.filter(
        (caseStudy) => caseStudy.relatedService === pagePath,
      )}
    />
  )
}
