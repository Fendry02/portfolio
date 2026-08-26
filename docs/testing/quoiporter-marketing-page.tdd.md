# Page marketing QuoiPorter — preuve TDD

## Parcours protégé

Une personne qui cherche quoi porter selon la météo doit pouvoir trouver la page
publique QuoiPorter dans le sitemap du site, puis rejoindre la fiche App Store
depuis un bouton de téléchargement clair.

## RED

Le test `the public QuoiPorter landing page is available to search engines` a été
ajouté à `app/lib/seo.test.ts`. Avant l’implémentation, il échouait car la route
`/quoiporter` n’existait pas dans `routeRegistry`.

## GREEN

La route `/quoiporter` est maintenant indexable, ajoutée au sitemap et servie par
une page statique avec une balise canonique, des données `SoftwareApplication`,
un lien direct vers l’App Store et des captures réelles de l’app.

Validation exécutée :

```sh
node --test app/lib/seo.test.ts
node --test --experimental-test-coverage app/lib/seo.test.ts
npm run lint
npm run build
```

Le test ciblé est vert. La couverture obtenue sur ce périmètre est de 95,35 %
des lignes et 94,74 % des fonctions.

## Étude de cas dans les réalisations

Cette étape part du besoin exprimé pendant ce travail, sans document de plan.
Une personne qui consulte les réalisations doit trouver QuoiPorter, ouvrir sa
page d’étude de cas, puis pouvoir rejoindre la fiche App Store.

Le test `QuoiPorter links to its App Store page from the portfolio` et la liste
attendue des slugs ont d’abord échoué : l’entrée `quoiporter` n’existait pas
dans `caseStudies`. L’entrée ajoute ensuite le lien App Store public, une capture
réelle et les informations qui alimentent la page statique.

Validation exécutée :

```sh
node --test app/lib/case-studies.test.ts
node --test --experimental-test-coverage app/lib/case-studies.test.ts
```

Les trois tests ciblés passent. La couverture du catalogue et de ses tests est
de 100 % pour les lignes, branches et fonctions.

| Garantie                                                                   | Test                                                          | Résultat |
| -------------------------------------------------------------------------- | ------------------------------------------------------------- | -------- |
| L’URL `/realisations/quoiporter` est générée avec les autres études de cas | `case studies expose unique, complete routes for proof pages` | PASS     |
| Le portfolio envoie vers la fiche officielle de QuoiPorter                 | `QuoiPorter links to its App Store page from the portfolio`   | PASS     |
