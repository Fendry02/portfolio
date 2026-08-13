# Maillage interne des pages de services — cycle TDD

## RED

Le test `app/lib/service-navigation.test.ts` a d’abord échoué, car le module
`service-navigation` n’existait pas encore. Il fixe les règles de maillage :

- chaque service propose exactement deux autres services, sans lien vers lui-même ;
- les services « création de site » et « automatisation n8n » relient seulement
  leur guide déjà publié ;
- les deux autres services ne reçoivent pas de ressource éditoriale inventée.

## GREEN

`app/lib/service-navigation.ts` centralise les liens et
`app/components/service-navigation.tsx` les rend dans les pages. Les deux
pages de services dédiées et le composant partagé les utilisent.

## Vérification

- `node --test --experimental-test-coverage app/lib/service-navigation.test.ts`
  — 3 tests passent ; `service-navigation.ts` atteint 100 % de couverture de
  lignes, branches et fonctions.
- `npm test` — 63 tests passent.
- `npm run lint` — passe.
- `npm run build` — passe.
- `SEO_AUDIT_BASE_URL=http://localhost:4173 npm run seo:audit` — passe sur les
  pages rendues, y compris les nouveaux liens internes.
