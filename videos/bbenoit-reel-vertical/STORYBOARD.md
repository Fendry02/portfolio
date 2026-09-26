---
title: "Benoit Bruynbroeck — promo 30s"
message: "Sites, apps, automatisations n8n et formation IA qui font avancer votre activité"
mode: autonomous
canvas: 1920x1080
fps: 60
duration: 30
music: "original 120 BPM, C major C–G–Am–F; groove at 4s, breakdown 20–22s, CTA lift at 22s, final hit 28s"
---

Grid: 120 BPM · beat 0.5s · bar 2s. Persistent: blob background, site header (B/B + CTA pill), 1px blue progress bar.

## Frame 1
- id: s1-hook
- status: outline
- src: compositions/s1-hook.html
- start: 0 · duration: 4
- rules: waterfall-entry (blur word reveal), chromatic-glitch→replaced by index-seeded jitter, press-release-spring
- beat: « Votre activité mérite mieux que l'à-peu-près. » — les lettres de « l'à-peu-près » arrivent de
  travers et flottent, puis se remettent parfaitement en place à 3.0 s et un soulignement bleu se trace dessous.

## Frame 2
- id: s2-intro
- status: outline
- src: compositions/s2-intro.html
- start: 4 · duration: 4
- rules: card-morph-anchor (portrait blob), waterfall-entry, counting-dynamic-scale
- beat: Portrait en forme de blob avec le badge « Lyon · France », puis « Développeur web freelance à Lyon. »
  et « Développeur full stack JavaScript & Tech Lead ». À 6 s, compteur « 10+ ans à transformer des idées en
  produits utiles. »

## Frame 3
- id: s3-offers
- status: outline
- src: compositions/s3-offers.html
- start: 8 · duration: 8
- rules: fixed-anchor-cycle (blueprint), svg-path-draw, cursor-click-ripple, discrete-text-sequence
- beat: 4 offres, une par mesure : texte à gauche, carte UI animée à droite, avec la couleur de chaque offre.
  Site web vitrine (navigateur qui se construit + clic « Prendre contact » + toast), Application web et mobile
  (planning terrain sur téléphone), Automatisation n8n et IA (workflow Formulaire → CRM → IA → Relance),
  Formation IA (prompt tapé + réponse).

## Frame 4
- id: s4-proof
- status: outline
- src: compositions/s4-proof.html
- start: 16 · duration: 6
- rules: waterfall-entry, card-morph-anchor (clip-inset screen swap), ambient-glow-bloom
- beat: « Des produits et des équipes qui ne peuvent pas se contenter de l'à-peu-près. » avec les 6 logos clients,
  puis l'écran projet qui enchaîne Petit Nid → Electreau Lyon → Chez Viko, et le témoignage de Victor Cavrois (Chez Viko).

## Frame 5
- id: s5-cta
- status: outline
- src: compositions/s5-cta.html
- start: 22 · duration: 8
- rules: anchored-layout-expand (blue section wipe), press-release-spring, cursor-click-ripple, svg-path-draw
- beat: Le panneau bleu monte. Badge « Réponse sous 24h ouvrées », titre « Parlons de votre projet. »,
  bouton « Discuter de mon projet → » cliqué, puis lockup B/B + bbenoit.fr.
