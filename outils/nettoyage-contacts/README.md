# Nettoyage de la base clients (Google Contacts)

Outil pour organiser et nettoyer les exports **Google Contacts** de Voyages21,
qui arrivent en vrac (doublons, lignes vides, noms poubelle, numéros collés).

## ⚠️ RGPD — données personnelles

Les fichiers de contacts contiennent des **numéros de téléphone et emails de
vrais clients**. Ils ne doivent **jamais** être committés dans ce dépôt (le site
est déployé publiquement). Le dossier `data/` est protégé par un `.gitignore` :
déposez-y les fichiers sources et récupérez-y les fichiers nettoyés en local.

## Utilisation

```bash
python3 clean_contacts.py \
  data/contacts.csv \          # export principal Google Contacts
  data/contacts_extra.csv \    # 2e export (fusionné, dédupliqué)
  data/clients_propre.csv \    # sortie 1 : base lisible (Excel)
  data/reimport_google.csv     # sortie 2 : réimportable dans Google Contacts
```

Le script n'a besoin que de la bibliothèque standard Python (aucune dépendance).

## Ce que fait le nettoyage

1. **Fusion** des fichiers sources (les exports Google en double sont ignorés
   automatiquement par la déduplication).
2. **Suppression des lignes vides** : tout contact sans téléphone *ni* email est
   jeté (artefacts d'import Google).
3. **Nettoyage des noms** : retire la ponctuation/symboles en tête
   (`?`, `( Mr`, `. Prg…`, `+212`…) ; un « nom » composé uniquement de chiffres
   est vidé.
4. **Découpe des numéros collés** : une cellule `06 61 41 74 29 ::: 0661417429`
   est éclatée en plusieurs numéros, puis dédupliquée.
5. **Normalisation des téléphones** : ne garde que `+` et chiffres, `00` → `+`.
6. **Déduplication des contacts** par les **9 derniers chiffres** du téléphone
   (robuste `+212 6XXXXXXXX` ↔ `06XXXXXXXX`) ou, à défaut, par email. Les fiches
   fusionnées cumulent leurs téléphones, emails, groupes et notes.
7. **Nettoyage des groupes** : retire le bruit `* myContacts` et
   `Importé le 06/02…`.

## Sorties

| Fichier | Usage |
|---|---|
| `clients_propre.csv` | Base lisible (Prénom, Nom, Nom complet, Organisation, Téléphones, Emails, Groupes, Notes). Ouvrable dans Excel/Sheets. |
| `reimport_google.csv` | Colonnes au format Google Contacts, prêt à réimporter pour **remplacer** la base actuelle. |

## Résultat sur l'export de référence (juillet 2026)

- 29 842 lignes sources → **7 182 contacts uniques**
- 18 018 lignes vides supprimées
- 4 642 doublons fusionnés
