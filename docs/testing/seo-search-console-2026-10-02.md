# Vérification des améliorations SEO — 2 octobre 2026

L’intervention part des exports Search Console fournis et de l’audit du site de
production. Le [rapport d’analyse](../seo-search-console-2026-10-02.md) décrit les
données, les changements et les actions après déploiement.

## Résultats

| Contrôle                                                     | Résultat                                                                |
| ------------------------------------------------------------ | ----------------------------------------------------------------------- |
| `npm test`                                                   | 71 tests réussis, aucun échec ni test ignoré                            |
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

## Limites

Aucun déploiement, envoi à un client ou changement dans Search Console n’a été
effectué. L’indexation, le choix de canonique par Google, les résultats enrichis
et les Core Web Vitals réels restent à vérifier après la mise en ligne. Les
exports fournis ne contiennent pas les couples requête/page ni le rapport
d’indexation.
