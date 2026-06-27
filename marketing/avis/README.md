# Avis Google — lien court + QR code

Objectif : permettre aux clients de laisser un avis Google en 1 clic / 1 scan,
sans recherche ni étapes (pensé aussi pour les personnes âgées).

## Lien à partager (WhatsApp, mail, signature, carte de visite)
**https://www.voyages21.com/avis** → redirige directement vers la fenêtre
« Laisser un avis » de la fiche Google Business de Voyages21.

> Actif une fois la PR #99 fusionnée sur `main`.

## Fichiers
- `voyages21-avis-qr-couleur.png` — QR vert V21 sur fond blanc (écran, affiches couleur)
- `voyages21-avis-qr-noir.png` — QR noir & blanc (photocopies, impression économique)
- `voyages21-avis-qr.svg` — QR vectoriel (impression à n'importe quelle taille sans perte)
- `voyages21-avis-affiche-A4.pdf` — affiche A4 prête à imprimer pour l'agence
- `voyages21-avis-affiche-A4.html` — source de l'affiche (modifiable)

## Bon à savoir
- Le QR pointe vers le lien court `voyages21.com/avis`. Si le lien Google change
  un jour, on modifie juste la redirection (`src/app/avis/page.jsx`) — **le QR
  déjà imprimé reste valable**, aucune réimpression nécessaire.
- Correction d'erreur élevée (niveau H) : le QR reste lisible même un peu abîmé.
