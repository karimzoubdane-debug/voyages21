# Checklist de non-régression — Voyages21

Cette checklist doit être utilisée avant toute fusion dans `main`.

## 1. Contrôle PR

- [ ] La PR part d'une branche dédiée, pas de `main`.
- [ ] La PR traite un seul sujet.
- [ ] La PR liste les fichiers touchés.
- [ ] La PR explique le risque de régression.
- [ ] La PR contient un plan de retour arrière.
- [ ] La PR ne mélange pas design, contenu, navigation, CMS et sécurité.
- [ ] L'agent IA a fait son propre diagnostic.
- [ ] L'agent IA a comparé son diagnostic à `AUDIT_VOYAGES21.md`.
- [ ] L'agent IA a indiqué s'il confirme ou non l'audit existant.

## 2. Tests d'affichage général

- [ ] La cover `cover-ete-2026.html` s'ouvre correctement.
- [ ] La homepage luxe s'ouvre correctement.
- [ ] La brochure s'ouvre correctement.
- [ ] La navigation fonctionne sur desktop.
- [ ] La navigation fonctionne sur mobile.
- [ ] Aucun texte visible ne contient le caractère `�`.
- [ ] Les boutons principaux sont visibles et compréhensibles.
- [ ] Les boutons WhatsApp/devis fonctionnent.

## 3. Tests catalogue voyages

Pour chaque voyage touché :

- [ ] Présent dans `public/voyages/data.js`.
- [ ] Fiche HTML présente dans `public/voyages/`.
- [ ] Page destination ou catégorie mise à jour.
- [ ] Carte visible si demandé.
- [ ] Lien menu ou sous-menu cohérent.
- [ ] Fiche produit s'ouvre sans erreur.
- [ ] Prix, durée, dates et inclus/exclus affichés.
- [ ] `mediaKey` cohérente.
- [ ] Aucun voyage existant n'a disparu.

## 4. Tests catégories

- [ ] Afrique / Tunisie visible si concerné.
- [ ] Combinés contient les voyages combinés validés.
- [ ] Croisières contient les croisières validées.
- [ ] Omra contient les programmes Omra validés.
- [ ] Europe / Asie / Amériques / Maroc restent cohérents.
- [ ] Les pages destinations ne pointent pas vers des slugs absents.

## 5. Tests sections homepage

- [ ] Section `Pourquoi nous choisir` respecte la décision validée par Karim.
- [ ] Si la section est masquée, elle ne réapparaît pas.
- [ ] Les liens homepage ne pointent pas vers `#` sauf choix volontaire.
- [ ] Les cartes voyages homepage ouvrent des pages existantes.
- [ ] Le téléphone et le CTA restent visibles.

## 6. Tests admin médias / CMS

À utiliser uniquement si la PR touche admin, médias ou CMS :

- [ ] L'admin n'est pas accessible sans authentification si la PR prétend le sécuriser.
- [ ] Login testé.
- [ ] Session testée.
- [ ] Upload image testé.
- [ ] Upload vidéo testé si concerné.
- [ ] Association média à une carte testée.
- [ ] Association média à une fiche produit testée.
- [ ] Aucune écriture API non autorisée.
- [ ] Rollback documenté.

## 7. Rollback

Avant fusion :

- [ ] Le numéro de PR est noté.
- [ ] Le moyen de revert est clair.
- [ ] La branche précédente saine est connue.
- [ ] Les fichiers critiques modifiés sont identifiés.

Règle finale : en cas de doute, ne pas fusionner.