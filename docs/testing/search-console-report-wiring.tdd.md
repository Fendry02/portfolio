# Rapport Search Console — câblage des groupes de lignes

## Source et parcours utilisateur

Aucun plan n’a été fourni. Le parcours couvert est : « En tant que propriétaire
du portfolio, je veux que les opportunités affichent la page concernée et que
les meilleures requêtes ne soient pas répétées par URL, afin de prioriser les
bonnes actions SEO. »

## RED → GREEN

Le test de câblage a d’abord échoué : `queryDimensions` était la première
requête alors que sa réponse était destructurée dans `queryPageRows`. La
requête `queryPageDimensions` suivait, mais sa réponse alimentait `queryRows`.

Le correctif sépare maintenant la récupération des trois groupes dans
`search-console-report-requests.mjs`. Les résultats sont retournés sous forme
d’objet nommé (`queryPageRows`, `queryRows`, `pageRows`), ce qui supprime la
dépendance à l’ordre implicite dans le script principal.

| Garantie | Test | Type | Résultat |
| --- | --- | --- | --- |
| Les opportunités reçoivent des lignes `query + page` | `search-console-report.test.mjs` | Unitaire | Passe |
| Les meilleures requêtes reçoivent des lignes `query` seules | `search-console-report.test.mjs` | Unitaire | Passe |
| Les pages reçoivent des lignes `page` seules | `search-console-report.test.mjs` | Unitaire | Passe |

## Vérification

- `node --test --experimental-test-coverage scripts/search-console-lib.test.mjs scripts/search-console-report.test.mjs` : 9 tests passent, 99,01 % lignes, 96,43 % branches et 90 % fonctions sur les modules concernés.
- `npm test` : 64 tests passent.
- `npm run lint` et `npm run build` : passent.
- `npm run seo:gsc:report` : le rapport local a été généré avec succès ; les
  requêtes sont uniques et aucune opportunité ne présente une page indéfinie.

Le rapport de test local est ignoré par Git dans `reports/seo/`.
