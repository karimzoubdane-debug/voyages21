# Avis Google — lien court + QR code

Objectif : permettre aux clients de laisser un avis Google en 1 clic / 1 scan,
sans recherche ni étapes (pensé aussi pour les personnes âgées).

## 2 liens à partager (WhatsApp, mail, signature, carte de visite)

1. **Lien simple** — `https://www.voyages21.com/avis`
   Redirige instantanément vers la fenêtre « Laisser un avis » Google. (Actif.)

2. **Affiche cliquable (recommandé sur WhatsApp)** — `https://www.voyages21.com/avis-affiche`
   En collant ce lien sur WhatsApp, l'aperçu montre **directement le visuel de
   l'affiche** ; le client tape dessus → fenêtre d'avis Google. Idéal pour les
   personnes âgées (un visuel + un seul geste).

## Fichiers
- `voyages21-avis-qr-couleur.png` — QR vert V21 sur fond blanc (écran, affiches couleur)
- `voyages21-avis-qr-noir.png` — QR noir & blanc (photocopies, impression économique)
- `voyages21-avis-qr.svg` — QR vectoriel (impression à n'importe quelle taille sans perte)
- `voyages21-avis-affiche-A4.pdf` — affiche A4 avec QR, prête à imprimer pour l'agence
- `voyages21-avis-affiche-A4.html` — source de l'affiche imprimable (modifiable)
- `voyages21-avis-affiche-CLIQUABLE.pdf` — affiche **cliquable** à envoyer (taper dessus → Google)
- `voyages21-avis-affiche-digitale.png` — visuel de l'affiche digitale (= aperçu WhatsApp de `/avis-affiche`)

## Bon à savoir
- Le QR pointe vers le lien court `voyages21.com/avis`. Si le lien Google change
  un jour, on modifie juste la redirection (`src/app/avis/page.jsx`) — **le QR
  déjà imprimé reste valable**, aucune réimpression nécessaire.
- Correction d'erreur élevée (niveau H) : le QR reste lisible même un peu abîmé.
