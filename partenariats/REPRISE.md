# 🔁 REPRISE — Dossier Partenariats & Apport d'affaires

> Tapez **`APPORTEUR`** pour reprendre (fiche Cockpit dédiée #51). Mettre à jour ce fichier
> après chaque avancée. À ne pas confondre avec la fiche #21 (page publique /partenaires).

## Dernière avancée (2026-07-24) : 1ʳᵉ version Word des contrats
- Générés dans `partenariats/word/` : contrat apporteur, convention, contrat-cadre (.docx aux couleurs V21).
- **En attente (suspens gardés)** : décisions Phase 1 (base commission + taux, rattachement, statut, exclusivité) ;
  génération du **tableur Excel** du registre de suivi (Volet C) ; PDF signable final après validation juridique.

## Où on en est (dernière mise à jour : 2026-07-24)
- **Dernière action** : dossier `partenariats/` créé et **fusionné sur main** (PR #227) ;
  fiche Cockpit #21 mise à jour (PR #74 fusionnée). Puis **consolidation** : la grille de
  commissions est désormais **intégrée en Annexe 1 du contrat d'apporteur** (self-contained) ;
  le fichier grille restant ne couvre plus que les **avantages** des conventions
  (`GRILLE-AVANTAGES-PARTENAIRES.md`).
- **Décidé** : modèle « l'agence encaisse et commissionne l'apporteur » (l'apporteur
  n'encaisse pas les ventes de voyage — pas de licence agence). Contrat = *apporteur
  d'affaires* (pas agent commercial). Commission sur **marge** (sur-mesure) ou **CA** (volume).
- **Prochaine étape proposée** : (1) choisir la base de commission (marge vs CA) et les
  taux réels ; (2) convertir les modèles en Word/PDF signables aux couleurs Voyages21 ;
  (3) brancher le suivi des apports (Rewardful / HubSpot déjà dans le stack B2B).

## En attente / décisions
- [ ] Base de commission retenue : **% marge nette** ou **% CA** ? Taux ?
- [ ] Durée de rattachement d'un client apporté (12 / 24 / 36 mois ?)
- [ ] Statut de Karim pour facturer l'agence (auto-entrepreneur / société ?)
- [ ] Validation avocat + comptable (licence, TVA, Office des Changes)
- [ ] Générer les versions Word/PDF signables

## Structure du dossier
- `README.md` — index + adresses
- `dossier/DOSSIER-STRATEGIQUE-APPORTEUR.md` — Volet A
- `contrats/CONTRAT-APPORTEUR-AFFAIRES.md` — Volet B (grille commissions en Annexe 1)
- `contrats/CONVENTION-PARTENARIAT.md` — Volet B
- `contrats/CONTRAT-CADRE.md` — Volet B
- `contrats/GRILLE-AVANTAGES-PARTENAIRES.md` — Volet B (avantages membres + contrepartie)
