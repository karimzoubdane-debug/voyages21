# EVA — Web Designer & Funnel AI (landing pages, tunnels de vente)

> Équivalent ClientX : « Eva · Funnel & Web AI » (99€/mois + 2,97€/funnel + 0,45€/1000 mots)
> Statut : **déjà opérationnel** — c'est exactement notre mode de travail actuel sur le site V21.
> Ce fichier formalise la méthode pour produire des landing pages qui convertissent, à la demande.

---

## Prompt à me donner pour chaque nouvelle landing page

```
Construis une landing page de conversion pour Voyages21 sur le sujet : [SUJET — ex. "Circuit
désert de Merzouga 4 jours", "Voyage de noces au Maroc", "Incentive entreprise Marrakech"].

Cible : [QUI — ex. couples européens 30-50 ans / DRH d'entreprises françaises].
Objectif de conversion : [demande de devis / réservation d'appel / inscription newsletter].
Offre mise en avant : [prix, durée, points forts, période].

Contraintes :
- Page Next.js App Router dans src/app/lp/[slug]/page.jsx avec CSS Module dédié.
- Design system V21 : vert forêt #1B3A28, or #C8A440, crème #F5F0E8, Playfair Display
  (titres, italic), DM Sans (corps). Header 3 barres et Footer existants conservés.
- Structure AIDA : hero émotionnel → preuve (25 ans d'expérience, depuis 2000) →
  programme détaillé → témoignages → FAQ → CTA répété (formulaire + WhatsApp).
- Formulaire branché sur la table `leads` (même base qu'Axel) avec le champ source=[slug].
- SEO : metadata Next.js complet, données structurées schema.org TouristTrip.
- Mobile-first, score Lighthouse > 90.

Livrables : la page déployée en preview Vercel + un récapitulatif des choix de copywriting.
```

## Architecture

```
src/app/lp/
  merzouga-4-jours/page.jsx + lp.module.css     ← une page par campagne
  voyage-de-noces/page.jsx + lp.module.css
  ...
src/components/
  LeadForm.jsx          — formulaire réutilisable (POST /api/leads, champ source)
  Testimonials.jsx      — bloc témoignages réutilisable
  FaqAccordion.jsx      — FAQ dépliante réutilisable
src/app/api/leads/route.js   — endpoint partagé avec Axel (même table Postgres)
```

## Méthode de production (ce que je fais à chaque demande)

1. **Brief → copywriting** : je rédige tout le texte en français (ton V21 : élégant,
   sur-mesure, « De l'aventure intime aux projets d'envergure »), titres Playfair en italique.
2. **Visuels** : photos fournies par Karim, ou générés/retouchés via Higgsfield
   (upscale, recadrage 16:9 hero / 4:5 mobile, suppression de fond).
3. **Construction** : page complète + composants réutilisables, jamais de duplication —
   `LeadForm`, `Testimonials`, `FaqAccordion` sont partagés entre toutes les LP.
4. **Tracking** : champ `source` dans le formulaire + événements (Meta Pixel / GA4 si
   configurés) pour mesurer chaque campagne séparément.
5. **Déploiement** : push sur la branche de travail → preview Vercel → validation Karim
   → merge en production.

## Tunnel de vente complet (option avancée)

Pour une campagne payante (Meta Ads / Google Ads), le tunnel type :

```
Annonce → /lp/[slug] (promesse unique, 1 CTA)
        → /lp/[slug]/merci (confirmation + bonus PDF itinéraire)
        → relance automatique par MAX (J+1, J+3, J+7)
```

La page `/merci` déclenche l'entrée du lead dans la séquence de relance de Max
(voir MAX-workflow-relances.md) — c'est la jonction entre Eva et Max.

## Coût estimé

- Construction : incluse dans nos sessions Claude Code (aucun coût par page).
- Hébergement : Vercel, déjà en place.
- Comparaison : ClientX facture 2,97€/funnel généré + abonnement — ici, zéro coût marginal.
