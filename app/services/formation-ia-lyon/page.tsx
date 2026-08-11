import FormationVisual from '@/app/components/offer-visuals/FormationVisual'
import ServicePage from '@/app/components/service-page'
import { buildPageMetadata, serviceRoutes } from '@/app/lib/seo'

const pagePath = serviceRoutes.aiTrainingLyon
const pageTitle = 'Formation IA à Lyon'
const pageDescription =
  'Formation IA à Lyon pour aider vos équipes à utiliser l’intelligence artificielle dans leurs tâches quotidiennes avec méthode, esprit critique et règles claires.'

export const metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
})

export default function AiTrainingLyonPage() {
  return (
    <ServicePage
      path={pagePath}
      title={pageTitle}
      description={pageDescription}
      hero="Formation IA à Lyon pour transformer des essais en usages utiles."
      intro="J’aide vos équipes à identifier des cas d’usage concrets, à formuler de bonnes demandes et à garder le recul nécessaire sur les réponses produites. La formation s’ancre dans votre travail quotidien, pas dans une démonstration générique."
      problemTitle="L’IA devient utile quand chaque personne sait quoi lui demander — et quoi vérifier."
      problem={[
        'Les outils d’IA peuvent accélérer une recherche, une synthèse, une première rédaction ou la préparation d’un support. Sans cadre commun, ils créent aussi des résultats inégaux, des doutes sur les données et des essais qui ne deviennent jamais des habitudes.',
        'Une formation efficace part de situations réelles : les documents, outils et décisions de l’équipe. Nous travaillons les limites, la qualité des sources et les contrôles nécessaires pour que l’IA soutienne le jugement au lieu de le remplacer.',
      ]}
      deliverables={[
        'Recueil des situations de travail à fort potentiel',
        'Atelier adapté au niveau et aux outils de votre équipe',
        'Méthodes de formulation, vérification et itération',
        'Repères pour les données sensibles et les validations humaines',
        'Exercices sur vos cas d’usage concrets',
        'Support de synthèse pour poursuivre après la session',
      ]}
      processSteps={[
        {
          title: 'Cadrer les usages à traiter',
          text: 'Nous choisissons les tâches fréquentes, compréhensibles et suffisamment importantes pour justifier un changement de pratique.',
        },
        {
          title: 'Expérimenter sur des cas réels',
          text: 'Les participants testent les méthodes avec leur vocabulaire et apprennent à comparer plusieurs formulations.',
        },
        {
          title: 'Apprendre à vérifier',
          text: 'Sources, calculs, contexte, données personnelles : les points de contrôle sont intégrés à chaque usage plutôt qu’ajoutés après coup.',
        },
        {
          title: 'Installer des repères partagés',
          text: 'La session se conclut avec des pratiques simples que l’équipe peut réutiliser, discuter et faire évoluer.',
        },
      ]}
      audiences={[
        {
          title: 'Équipes métiers',
          text: 'Trouver des gains de temps sans perdre la qualité, le contexte ni la responsabilité des décisions.',
        },
        {
          title: 'Managers et directions',
          text: 'Donner un cadre d’adoption clair, réaliste et adapté aux informations manipulées par l’organisation.',
        },
        {
          title: 'Indépendants et petites équipes',
          text: 'Structurer des usages concrets pour préparer, rédiger et analyser avec davantage de méthode.',
        },
        {
          title: 'Équipes produit ou support',
          text: 'Explorer les assistants et automatisations possibles en gardant une validation humaine sur les décisions sensibles.',
        },
      ]}
      faqItems={[
        {
          question: 'Faut-il déjà connaître les outils d’IA ?',
          answer:
            'Non. Le format est adapté au niveau du groupe, avec un vocabulaire simple et des exercices progressifs. Les personnes déjà expérimentées peuvent approfondir la formulation, la vérification et l’intégration dans leurs méthodes.',
        },
        {
          question: 'La formation peut-elle porter sur nos propres cas ?',
          answer:
            'Oui, c’est le principe. Avant la session, nous sélectionnons des situations représentatives et définissons ce qui peut être utilisé sans exposer d’informations sensibles.',
        },
        {
          question: 'Comment éviter de faire confiance à une réponse erronée ?',
          answer:
            'La formation inclut des réflexes de vérification : reformuler le besoin, demander les sources, confronter le résultat au contexte métier et conserver une validation humaine pour ce qui engage l’équipe ou ses clients.',
        },
        {
          question: 'Peut-on poursuivre après l’atelier ?',
          answer:
            'Oui. Le support de synthèse permet de reprendre les méthodes travaillées, puis une suite peut être définie autour de cas d’usage plus ciblés ou d’automatisations identifiées pendant la formation.',
        },
      ]}
      visual={<FormationVisual />}
      relatedCaseStudies={[]}
    />
  )
}
