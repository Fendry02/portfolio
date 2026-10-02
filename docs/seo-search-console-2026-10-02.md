# SEO de bbenoit.fr — analyse du 2 octobre 2026

## Diagnostic

Le principal problème visible dans cet export est le faible volume de recherches
sur lesquelles le site apparaît. Avant les modifications, le site de production passe les 359 contrôles
de l’audit SEO existant. Ajouter des balises seules ne répondrait pas à ce manque
de visibilité. Le travail porte donc sur les pages commerciales, leurs liens et
les contenus qui répondent aux questions des prospects.

Les données viennent de l’export Search Console fourni, pour la recherche Web du
**30 juin au 29 septembre 2026**. Le nom du dossier indique la date d’export,
pas la dernière date de données.

| Indicateur                  |                                 Valeur | Source                         |
| --------------------------- | -------------------------------------: | ------------------------------ |
| Impressions du site         |                                    164 | Graphique.csv, somme des jours |
| Clics du site               |                                      5 | Graphique.csv, somme des jours |
| Taux de clic global         |                                 3,05 % | 5 / 164                        |
| Page `/jobs`                | 78 impressions, 3 clics, position 6,23 | Pages.csv                      |
| Accueil avec `www`          | 60 impressions, 2 clics, position 7,48 | Pages.csv                      |
| Service n8n                 | 21 impressions, 0 clic, position 13,24 | Pages.csv                      |
| Accueil sans `www`          | 17 impressions, 0 clic, position 19,12 | Pages.csv                      |
| « audit informatique lyon » | 11 impressions, 0 clic, position 22,36 | Requêtes.csv                   |

Les impressions par mois sont 29 en juillet, 67 en août et 68 du 1er au
29 septembre. Ces volumes sont trop petits pour tirer une conclusion solide sur
le taux de clic ou la progression d’une requête précise.

L’export par requête ne détaille que 13 impressions et aucun des 5 clics.
Il ne permet donc pas de connaître toutes les recherches qui ont généré le
trafic. Les fichiers Pages et Requêtes ne donnent pas non plus le croisement
requête/page : on ne peut pas attribuer « audit informatique lyon » à la page n8n.

Les totaux par page ne doivent pas remplacer le total du graphique : Google
agrège différemment les impressions par propriété et par URL. Voir les
[définitions du rapport Search Console](https://support.google.com/webmasters/answer/7576553).
Le fichier Apparence dans les résultats de recherche contient seulement son
en-tête. Cela ne prouve pas une erreur dans les données structurées.

L’absence de certaines pages dans cet export de performance ne prouve pas
qu’elles sont exclues de l’index. Il faut le rapport d’indexation ou une
inspection d’URL pour le déterminer.

## Changements réalisés

- **Une page `/services`** présente les quatre offres et aide à choisir selon
  le problème à résoudre. Elle possède sa propre URL canonique, ses métadonnées,
  une liste structurée et un fil d’Ariane.
- **Des liens vers les quatre services depuis le contenu de l’accueil.**
  Les pages application et formation ne dépendent plus seulement du pied de
  page pour y être accessibles. Le titre de la section décrit les prestations.
- **Une navigation vers Services, Réalisations et Guides.** Les pages de service
  affichent un fil d’Ariane vers `/services`. Le menu tient compte des écrans
  étroits.
- **Une page n8n plus précise.** Elle présente le diagnostic des processus, un
  exemple de parcours formulaire/CRM, les postes du devis, le choix de
  l’hébergement et la reprise des workflows par l’équipe. L’exemple est un
  scénario explicatif, pas une réalisation client revendiquée.
- **Trois nouveaux guides** : audit informatique à Lyon avec un périmètre
  explicite sur les processus, prix d’une automatisation n8n et devis d’un site
  vitrine à Lyon. Chaque guide renvoie au service concerné et à des contenus
  complémentaires. Aucun tarif de prestation ou résultat client n’est inventé.
- **Des liens vers les guides depuis l’accueil et les services.** Les titres des
  articles sont cliquables et le bouton en fin d’article nomme le service.
- **La typographie du blog rétablie.** Le plugin de mise en forme était installé
  mais absent de la feuille Tailwind 4. Son activation rend les titres,
  paragraphes et listes distincts à la lecture.
- **Le sitemap complété.** La réalisation QuoiPorter, déjà publiée mais absente
  du registre, y figure désormais. Les dates des pages substantiellement
  modifiées sont mises à jour au 2 octobre. Les nouveaux articles alimentent
  automatiquement le sitemap et le RSS.
- **Le balisage vidéo corrigé.** Google signalait deux avertissements sur la
  date de publication de la vidéo d’accueil. Une date-heure avec fuseau est
  maintenant utilisée, issue du premier déploiement réel de cette vidéo.
- **Le renouvellement du rapport Google simplifié.** Le script accepte
  `--renew` sans supprimer au préalable l’autorisation existante. Il explique
  comment renouveler l’accès lorsque Google renvoie `invalid_grant`.
- **Un audit plus strict.** Les liens requis doivent figurer dans le contenu
  principal. Un lien du pied de page ou d’un autre domaine ne peut plus faire
  passer ce contrôle. L’audit vérifie aussi le H1 unique, les consignes
  d’indexation HTML/HTTP, les URL du sitemap sans redirection et leur canonique.

Ces choix suivent les recommandations de Google sur les
[liens internes descriptifs](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)
et les [dates de modification fiables du sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).
Les valeurs `priority` et `changefreq` conservées dans le sitemap ne constituent
pas des leviers de classement pour Google.

## URL sans `www`

Les vérifications de production du 2 octobre montrent une redirection HTTP 308
de `https://bbenoit.fr/services/automatisation-n8n-lyon` vers la même page sur
`https://www.bbenoit.fr`, qui répond en 200. L’accueil redirige aussi vers `www`.
Les 17 impressions historiques sans `www` justifient de vérifier le choix de
canonique dans Search Console, mais pas de modifier une redirection déjà correcte.

## Validation

Les résultats finaux et les limites des contrôles sont consignés dans
[le rapport de vérification](testing/seo-search-console-2026-10-02.md).
Les changements ont été poussés sur `main` et déployés en production. Les
612 contrôles du nouvel audit passent sur `https://www.bbenoit.fr`. Le workflow
hebdomadaire corrigé passe aussi sur GitHub Actions :
[exécution du 2 octobre](https://github.com/Fendry02/portfolio/actions/runs/37014402196).

## Indexation vérifiée dans Search Console

La propriété de domaine a été consultée après la mise en ligne. Son rapport
agrégé est daté du **21 septembre 2026** : 6 pages indexées et 14 non indexées.
Ce rapport antérieur au déploiement ne décrit pas encore les nouvelles pages.

| Motif                              | Nombre | Constat                                                                                           |
| ---------------------------------- | -----: | ------------------------------------------------------------------------------------------------- |
| Exclue par `noindex`               |      2 | `/mentions-legales` et `/confidentialite`, exclusions prévues                                     |
| Page avec redirection              |      2 | Accueil HTTP et HTTPS sans `www`, redirections prévues                                            |
| Erreur liée à des redirections     |      1 | Ancien signal sur `https://bbenoit.fr/jobs`, exploré le 26 juin                                   |
| Détectée, actuellement non indexée |      8 | Blog, deux anciens guides, QuoiPorter, Réalisations, Chez Viko, Electreau et création de site web |
| Explorée, actuellement non indexée |      1 | Ancienne URL d’icône `/icon?9ef4990d85b39989`, sans enjeu commercial                              |

La redirection de `/jobs` répond aujourd’hui en 308 vers la même page avec
`www`, qui répond en 200. La validation a été lancée dans Search Console le
2 octobre ; l’interface affiche « commencé ». La correction était déjà présente
sur le site, il s’agit de faire réévaluer l’ancien signal par Google.

Le sitemap canonique contenant 19 URL a été soumis à nouveau. Google a confirmé
« Sitemap envoyé ». Le nombre de pages découvertes affiché juste après l’envoi
correspond encore à la précédente lecture ; il ne faut pas le confondre avec
les 19 URL actuellement servies.

Les demandes d’indexation et leurs résultats sont consignés dans
[le rapport de vérification](testing/seo-search-console-2026-10-02.md).
La soumission ne garantit pas l’ajout à l’index ni une meilleure position.
Google indique que [la réexploration peut prendre quelques jours à quelques semaines](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl).

## Suivi après la mise en ligne

1. Suivre le traitement du sitemap `https://www.bbenoit.fr/sitemap.xml`,
   soumis le 2 octobre, et la validation de la redirection de `/jobs`.
2. Suivre les neuf demandes d’indexation ou de réexploration acceptées le
   2 octobre : accueil, `/services`, quatre pages de service et trois nouveaux
   articles. La page création de site web était détectée mais non indexée ;
   l’accueil, n8n, Application et Formation étaient déjà indexés avec la bonne
   canonique. Vérifier leur prochaine exploration et l’ajout des nouvelles pages.
3. Comparer deux périodes complètes de 28 jours avec le filtre France, puis
   examiner les couples requête/page. Suivre surtout les impressions et clics
   des services, ainsi que les demandes de contact. Les positions moyennes sur
   une ou deux impressions ne suffisent pas à juger une page.
4. Renforcer la visibilité locale avec des avis de vrais clients et des liens
   de crédits sur les sites livrés lorsque les clients l’acceptent. Aucun
   message ni modification de ces sites n’a été effectué dans cette intervention.

Les FAQ présentes dans le site servent d’abord à répondre aux visiteurs.
Un balisage ne garantit pas un affichage enrichi ni une meilleure position.
