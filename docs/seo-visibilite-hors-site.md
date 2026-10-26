# Visibilité hors site : plan d’action

Préparé le 26 octobre 2026, après l’audit du site. Le SEO technique de
`www.bbenoit.fr` passe tous les contrôles de `npm run seo:audit`. Ce qui
manque, c’est la notoriété : du 26 septembre au 26 octobre, Vercel Analytics
compte environ 60 visiteurs, dont 3 venus de Google, 2 de LinkedIn et 1 du site
d’Electreau. Environ 35 visiteurs proviennent des États-Unis, de Singapour, de
Chine et de Hong Kong ; ce sont très probablement des robots.

Les actions ci-dessous se font hors du code. Elles sont classées par impact
attendu sur une activité locale de freelance.

## 1. Google Business Profile et avis clients

La fiche existe déjà (`siteConfig.googleBusinessProfileUrl`). Pour une
recherche du type « développeur web Lyon », Google Maps passe souvent avant les
résultats classiques, et les avis y pèsent lourd.

- [ ] Vérifier que le nom, la catégorie principale, la zone desservie et le
      site (`https://www.bbenoit.fr`) correspondent au site.
- [ ] Ajouter les quatre services avec la même formulation que la page
      `/services`.
- [ ] Ajouter des photos réelles : captures des réalisations, photo de profil.
- [ ] Publier une actualité par mois, par exemple le lien vers chaque nouveau
      guide.
- [ ] Récupérer le lien « Demander des avis » dans la fiche, puis l’envoyer à
      chaque client réel. Ne jamais acheter, échanger ou rédiger d’avis.

Message type à adapter avant de l’envoyer (vouvoiement ou tutoiement selon le
client) :

> Bonjour [prénom],
>
> J’espère que [le site / l’outil] vous rend service depuis la mise en ligne.
> Je développe mon activité de freelance à Lyon et les avis Google comptent
> beaucoup pour être trouvé. Si vous avez deux minutes, un avis sur notre
> collaboration m’aiderait vraiment : [lien de la fiche].
>
> Merci d’avance, et n’hésitez pas si vous avez besoin d’une modification sur
> le site.
>
> Benoit

Clients à contacter en premier : Electreau Lyon, Chez Viko, Petit Nid.

## 2. Liens depuis les sites livrés

Un lien depuis le site d’un client réel est un signal local fort, et Electreau
envoie déjà du trafic. Demander l’accord de chaque client avant toute
modification de son site.

Extrait proposé pour le pied de page, avec un seul lien descriptif :

```html
<p>
  Site réalisé par
  <a href="https://www.bbenoit.fr/realisations/chez-viko"
    >Benoit Bruynbroeck, développeur web à Lyon</a
  >
</p>
```

Remplacer `chez-viko` par le slug de l’étude de cas du client
(`electreau-lyon`, `petit-nid`). Pointer vers l’étude de cas plutôt que vers
l’accueil relie la page à une preuve concrète.

## 3. Profils et annuaires

Utiliser partout la même identité :
`Benoit Bruynbroeck — développeur web freelance à Lyon`.

Accroche courte (LinkedIn, Malt) :

> Développeur web freelance à Lyon. Sites vitrines, applications métier et
> automatisations n8n pour PME et indépendants.

Présentation longue :

> Je conçois des sites vitrines, des applications web sur mesure et des
> automatisations n8n pour les PME et les indépendants de Lyon et des
> environs. Avant de développer, je regarde comment votre équipe travaille :
> quelles données circulent, où sont les ressaisies, qui devra maintenir
> l’outil. Chaque projet est livré documenté, pour que vous puissiez le
> reprendre.
> Site et réalisations : https://www.bbenoit.fr

- [ ] LinkedIn : titre, section Infos, lien du site, page « Services ».
- [ ] Malt : titre, compétences n8n / Next.js / React, lien vers les
      réalisations.
- [ ] GitHub (`Fendry02`) : nom complet, Lyon, bio courte et lien du site.
- [ ] Codeur.com et PagesJaunes : créer une fiche seulement si elle est tenue à
      jour avec les mêmes informations.
- [ ] Vérifier les annuaires et réseaux d’entrepreneurs lyonnais auxquels vous
      avez accès (CCI, associations de commerçants, réseau des clients) avant
      de vous y inscrire.

## 4. Le créneau n8n

La page n8n est déjà la page de service la mieux positionnée (position 13 en
septembre). C’est le créneau le moins disputé du site.

- [ ] Publier un ou deux workflows génériques, sans données client, dans la
      bibliothèque de modèles de n8n ou sur le forum de la communauté, avec le
      lien du site dans le profil.
- [ ] Écrire un guide n8n concret par mois. Pistes : relances de devis
      automatiques, synchroniser un formulaire avec HubSpot ou Pipedrive,
      surveiller ses workflows, classer les emails entrants avec l’IA sous
      contrôle humain.

## 5. LinkedIn : brouillons pour les deux nouveaux guides

Ces brouillons sont à relire et à mettre à votre voix avant de les publier.
Mettre le lien dans le post ou en premier commentaire.

**n8n ou Make**

> On me demande souvent s’il vaut mieux partir sur n8n ou sur Make.
>
> La vraie différence se voit sur la facture. n8n compte une exécution par
> passage complet dans le workflow, alors que Make consomme un crédit par
> action. Un flux qui parcourt 200 lignes chaque heure ne coûte donc pas du tout
> la même chose sur les deux outils.
>
> J’ai écrit un guide pour trancher : facturation, hébergement des données, et
> surtout qui maintiendra les scénarios dans deux ans. Et oui, il y a des cas
> où je conseille Make.
>
> https://www.bbenoit.fr/blog/n8n-ou-make-pme

**Héberger n8n**

> Installer n8n sur un serveur prend peu de temps. Le maintenir, c’est autre
> chose.
>
> Sauvegardes de la base et de la clé de chiffrement, mises à jour, alertes,
> durée de conservation des exécutions pour le RGPD : si personne n’est
> désigné pour ça, n8n Cloud est souvent le meilleur choix, même s’il coûte
> plus cher.
>
> Le guide complet : https://www.bbenoit.fr/blog/heberger-n8n-cloud-ou-serveur

## 6. Routine de suivi

- Chaque semaine : un message à un client (avis ou lien), un post LinkedIn.
- Chaque mois : un guide, une actualité sur la fiche Google, un point sur
  Vercel Analytics (pages vues par provenance, en écartant les pays sans
  lien avec l’activité).
- Quand l’accès Search Console sera renouvelé
  (`npm run seo:gsc:auth -- --renew`) : comparer deux périodes de 28 jours,
  vérifier l’indexation des pages de service et des nouveaux guides.

Les effets du référencement se mesurent sur plusieurs mois. LinkedIn et le
bouche-à-oreille restent les canaux les plus rapides à court terme.
