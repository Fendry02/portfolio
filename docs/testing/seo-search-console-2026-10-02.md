# Vérification des améliorations SEO — 2 octobre 2026

L’intervention part des exports Search Console fournis et de l’audit du site de
production. Le [rapport d’analyse](../seo-search-console-2026-10-02.md) décrit les
données, les changements et les actions après déploiement.

## Résultats

| Contrôle                                                     | Résultat                                                                |
| ------------------------------------------------------------ | ----------------------------------------------------------------------- |
| `npm test`                                                   | 76 tests réussis, aucun échec ni test ignoré                            |
| `npm run lint`                                               | Réussi                                                                  |
| `npm run build`                                              | Réussi, compilation TypeScript et génération de 36 routes/pages         |
| `SEO_AUDIT_BASE_URL=http://localhost:3100 npm run seo:audit` | 612 contrôles réussis, aucun échec                                      |
| Sitemap servi par la compilation finale                      | 19 URL, dont `/services`, les trois guides et la réalisation QuoiPorter |
| RSS servi par la compilation finale                          | Les trois nouveaux guides sont présents                                 |
| Formatage des fichiers modifiés                              | Vérifié avec Prettier                                                   |

L’audit contrôle en détail 18 pages et vérifie les URL du sitemap. Le succès
atteste les réponses HTTP, les métadonnées attendues, les données JSON-LD
analysables, les liens du contenu principal et les directives d’indexation.
Il n’atteste pas leur présence effective dans l’index de Google.

## Garanties couvertes par les tests

- Un lien dans le pied de page ou l’en-tête ne satisfait pas un contrôle de lien
  dans le contenu principal.
- Un lien d’un autre domaine, un email, une URL malformée, un attribut
  `data-href` et du texte dans un script ne comptent pas comme liens internes.
- Les directives `noindex` et `none` sont reconnues dans les balises `robots`,
  `googlebot` et dans l’en-tête HTTP `X-Robots-Tag`.
- Chaque réalisation publiée possède une entrée dans le registre du sitemap.
- Chaque guide lié depuis un service existe et indique ce même service dans
  ses métadonnées.
- Les nouveaux articles sont lus, ordonnés et résolus par le système de blog
  existant.

Le test de couverture des réalisations a d’abord échoué avec
`Missing case study: quoiporter`, puis réussi après l’ajout au registre.
Les tests d’analyse HTML ont aussi révélé que `data-href` et `data-name`
pouvaient être pris pour `href` et `name`. Ils passent après correction de la
reconnaissance des attributs.

Le contrôle ciblé
`node --experimental-test-coverage --test scripts/seo-audit-lib.test.mjs`
mesure **100 % des lignes, 95 % des branches et 100 % des fonctions** du nouveau
module d’analyse de l’audit. Ce chiffre ne représente pas la couverture globale
de l’application.

## Vérification dans le navigateur

Sur la compilation de production locale :

- La page Services s’affiche sur un écran étroit et à 1280 px.
- Le menu mobile s’ouvre, expose les nouveaux liens et permet d’aller au blog.
- Un titre d’article ouvre le guide d’audit des processus.
- Le guide affiche ses titres, paragraphes et listes après activation du plugin
  Typography dans la feuille Tailwind 4.
- Aucun débordement horizontal n’a été observé sur les vues examinées, à 322 px
  et 1280 px.
- Aucun message d’erreur ou avertissement n’a été relevé dans la console sur
  les parcours examinés.

## Déploiement et contrôle de production

Les modifications ont été poussées sur `main` dans le commit `36179d4`. Les deux
commits distants ajoutant la vidéo d’accueil et ses sources ont été intégrés
avant le push. Vercel confirme le déploiement de production
`dpl_4R6kms1awGoz9yoUwMkxNDQaacSQ` à l’état `READY`, associé à `www.bbenoit.fr`.

Après intégration, les 76 tests, le lint et la compilation passent. Sur le site
public, les 612 contrôles SEO passent. Les pages Services et le nouveau guide
d’audit des processus ont aussi été vérifiés dans le navigateur. Aucune erreur
d’exécution n’a été trouvée par Vercel dans la fenêtre examinée de 15 minutes.

Le premier contrôle de production a détecté 19 redirections dans les requêtes
de l’audit : sa configuration visait encore le domaine sans `www`. Les URL du
sitemap étaient correctes. Le domaine canonique devient la cible par défaut de
l’audit et du workflow hebdomadaire ; les 612 contrôles passent avec cette cible.
Cette correction a été poussée dans `a647286`. Son déploiement de production
`dpl_8z6kC5yJzNYF6pYJ61eEpqWcrXWv` est confirmé `READY`.
Le [workflow hebdomadaire](https://github.com/Fendry02/portfolio/actions/runs/37014402196)
relancé sur ce commit s’est terminé avec succès.

## Search Console

La propriété de domaine a été consultée dans la session Google existante.
Le rapport d’indexation, daté du 21 septembre, indique 6 pages indexées et
14 non indexées. Ses motifs et les URL concernées figurent dans l’analyse.

- Le sitemap `https://www.bbenoit.fr/sitemap.xml` a été soumis le 2 octobre.
  Google a confirmé « Sitemap envoyé » ; le site sert 19 URL.
- Les exclusions des deux pages juridiques et des deux versions d’accueil sans
  `www` sont prévues. L’ancienne URL d’icône exclue ne correspond pas à une
  page commerciale.
- La validation de l’ancienne erreur de redirection sur `https://bbenoit.fr/jobs`
  a été lancée. Google affiche « commencé », avec un début au 2 octobre.
  La réponse actuelle est un 308 vers `https://www.bbenoit.fr/jobs`, qui répond
  directement en 200.
- La page n8n est déjà indexée. Google sélectionne l’URL inspectée, identique à
  la canonique déclarée avec `www`. Sa dernière exploration remonte au
  17 septembre. Une demande de réexploration du contenu enrichi a été acceptée.

Les inspections des pages n8n, Application et Formation confirment que Google
les indexe avec leur canonique déclarée. Application et Formation ont été
explorées le 14 août ; n8n le 17 septembre.

## Neuf demandes prioritaires acceptées

| Page                                                                                                      | État au moment de l’inspection                 | Demande du 2 octobre                                                      |
| --------------------------------------------------------------------------------------------------------- | ---------------------------------------------- | ------------------------------------------------------------------------- |
| [Accueil](https://www.bbenoit.fr/)                                                                        | Indexée, canonique identique à l’URL inspectée | Réexploration demandée, acceptée après déploiement de la correction vidéo |
| [Services](https://www.bbenoit.fr/services)                                                               | URL inconnue de Google                         | Indexation demandée, acceptée                                             |
| [Création de site web](https://www.bbenoit.fr/services/creation-site-web-lyon)                            | Détectée, actuellement non indexée             | Indexation demandée, acceptée                                             |
| [Automatisation n8n](https://www.bbenoit.fr/services/automatisation-n8n-lyon)                             | Indexée, canonique identique à l’URL inspectée | Réexploration demandée, acceptée                                          |
| [Application web](https://www.bbenoit.fr/services/application-web-sur-mesure-lyon)                        | Indexée, canonique identique à l’URL inspectée | Réexploration demandée, acceptée                                          |
| [Formation IA](https://www.bbenoit.fr/services/formation-ia-lyon)                                         | Indexée, canonique identique à l’URL inspectée | Réexploration acceptée au second essai                                    |
| [Guide audit des processus](https://www.bbenoit.fr/blog/audit-informatique-lyon-processus-automatisation) | URL inconnue de Google                         | Indexation demandée, acceptée                                             |
| [Guide prix n8n](https://www.bbenoit.fr/blog/prix-automatisation-n8n)                                     | URL inconnue de Google                         | Indexation demandée, acceptée                                             |
| [Guide prix de site vitrine](https://www.bbenoit.fr/blog/prix-site-vitrine-lyon)                          | Détectée, actuellement non indexée             | Indexation demandée, acceptée                                             |

Google a affiché « Indexation demandée » pour chacune de ces neuf URL.
Formation IA a renvoyé une erreur temporaire au premier essai ; le second a
réussi. La demande de l’accueil a été faite après la mise en production de la
correction vidéo. Les captures de confirmation sont conservées localement dans
`reports/seo/`, dossier ignoré par Git.

L’état de la deuxième colonne précède les demandes et ne signifie pas que les
nouvelles pages ont déjà été ajoutées à l’index. Pour les quatre pages déjà
indexées, Google retient la même canonique avec `www` que le site. L’accueil
a été exploré le 30 septembre. La réexploration des neuf URL reste à traiter par
Google.

## Correction du balisage vidéo

L’inspection de l’accueil exploré le 30 septembre signale deux avertissements
non critiques : `uploadDate` n’est pas une date-heure valide et manque de fuseau
horaire. La valeur précédente était `2026-09-26`.

La date a été remplacée par `2026-09-26T12:24:17.944Z`, issue de l’horodatage
`READY` du premier déploiement de production contenant la vidéo :
`dpl_GmjXTCCuejeXcMHByY9bf73c5jEr`, commit `57bf540`. Le jour de publication
est conservé ; l’heure et le fuseau correspondent à une preuve de déploiement.

Une assertion dans le test existant du `VideoObject` exige désormais une
heure et un fuseau. Elle a d’abord échoué avec la date seule, puis les 76 tests
passent avec la correction. La disparition des avertissements du rapport
historique reste conditionnée à une nouvelle exploration Google.

La correction et l’amélioration du renouvellement ont été poussées dans
`f8fa03c`. Vercel confirme le déploiement de production
`dpl_GfPbEPFYo8tmz77JdX4jm8yY1Y65` à l’état `READY`. Le HTML public contient
la nouvelle valeur `uploadDate`. Les 76 tests, le lint, la compilation et les
612 contrôles de production passent après ces derniers changements.

## Accès au rapport automatique

L’appel au rapport par API échoue avec `invalid_grant` : Google refuse
l’autorisation locale, qui peut être expirée ou révoquée. Le renouvellement de l’accès existant en lecture seule a été
préparé. Google affiche un avertissement d’application en cours de test non
validée ; le franchissement de cet avertissement attend la confirmation du
propriétaire. Aucun droit supplémentaire n’a été accordé. L’autorisation
existante est conservée dans le dossier ignoré par Git ; aucun secret n’a été
ajouté aux commits.

Les opérations de sitemap et d’indexation ci-dessus ont été réalisées dans la
session Search Console existante, indépendamment de cet accès API.

Le script d’autorisation accepte désormais `--renew` pour remplacer une
autorisation expirée après réussite du parcours Google, sans effacer le jeton
existant au départ. Le rapport indique cette commande en cas de `invalid_grant`.
La syntaxe des scripts, le lint et le parcours qui conserve l’autorisation
existante ont été vérifiés. L’échec réel du rapport produit le nouveau message
de renouvellement ; il ne constitue pas un rapport de performance réussi.

## Limites

Aucun envoi à un client n’a été effectué. Les résultats d’indexation ultérieurs,
les positions et les Core Web Vitals réels restent à suivre. Les exports fournis
ne contiennent pas les couples requête/page ; le rapport d’indexation a été
consulté ensuite dans la propriété Google. L’absence de données Core Web Vitals
ne permet pas de certifier la performance réelle des visiteurs.
