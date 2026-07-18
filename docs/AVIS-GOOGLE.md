# ⭐ Auto-réponse aux avis Google — mode d'emploi

Automatisme **semi-automatique** (« human-in-the-loop ») pour répondre aux avis
Google de Voyages21 :

1. Un cron interroge régulièrement la fiche Google Business Profile.
2. Pour chaque **nouvel avis**, une **proposition de réponse** est rédigée (IA, ton Voyages21).
3. Karim reçoit une **alerte e-mail** avec la proposition + un lien.
4. Karim relit dans la **mini-app** (`/admin/avis-google`), ajuste si besoin, puis
   **« Valider & publier »** → la réponse est postée sur Google via l'API.

> 🔒 **Rien n'est jamais publié sans l'action explicite de Karim.** Le cron ne fait
> que *proposer*. La publication n'a lieu qu'au clic « Valider & publier ».

---

## Architecture (fichiers)

| Fichier | Rôle |
|---|---|
| `src/lib/googleReviews.js` | File d'attente des avis (stockage Vercel Blob) |
| `src/lib/googleBusiness.js` | Client API Google Business Profile (lecture avis + publication réponse) |
| `src/lib/reviewReply.js` | Génération de la proposition de réponse (IA + repli) |
| `src/lib/reviewEmail.js` | Alerte e-mail (Resend) |
| `src/app/api/avis-google/poll/route.js` | Cron : récupère → propose → alerte |
| `src/app/api/avis-google/route.js` | Liste des avis (mini-app) |
| `src/app/api/avis-google/[id]/route.js` | Actions : valider / refuser / enregistrer |
| `src/app/admin/avis-google/page.jsx` | Mini-app de validation (propriétaire) |
| `vercel.json` | Planification du cron |

Le tout fonctionne en **« dégradation douce »** : si l'IA, l'e-mail ou même Google
ne sont pas encore configurés, la mini-app reste utilisable et affiche un bandeau
d'avertissement — aucune erreur bloquante.

---

## Variables d'environnement (Vercel → Settings → Environment Variables)

Voir aussi `.env.example`. Le module est actif dès que les 5 variables **Google**
sont présentes ; les blocs **IA** et **e-mail** sont optionnels mais recommandés.

### 1. Google Business Profile (obligatoire)
```
GOOGLE_CLIENT_ID        # identifiant OAuth du projet Google Cloud
GOOGLE_CLIENT_SECRET    # secret OAuth
GOOGLE_REFRESH_TOKEN    # jeton de rafraîchissement (compte propriétaire de la fiche)
GBP_ACCOUNT_ID          # identifiant du compte Business Profile
GBP_LOCATION_ID         # identifiant de l'établissement Voyages21
```

### 2. IA (optionnel — sinon réponse « modèle de secours »)
```
ANTHROPIC_API_KEY       # clé API Claude
REVIEW_AI_MODEL         # défaut : claude-haiku-4-5-20251001
REVIEW_SIGNATURE        # défaut : « L'équipe Voyages21 »
```

### 3. Alerte e-mail (optionnel)
```
RESEND_API_KEY          # clé API Resend
REVIEW_ALERT_TO         # défaut : karimzoubdane@gmail.com
REVIEW_ALERT_FROM       # expéditeur vérifié chez Resend
```

### 4. Cron + liens
```
CRON_SECRET             # protège /api/avis-google/poll (Vercel l'ajoute auto au cron)
NEXT_PUBLIC_SITE_URL    # base des liens e-mail (défaut : https://www.voyages21.com)
```

---

## Obtenir les identifiants Google (une seule fois)

L'API Business Profile n'est pas ouverte librement : il faut un projet Google Cloud
et, pour certaines opérations, une **demande d'accès** à Google.

1. **Google Cloud Console** → créer/choisir un projet.
2. **Activer les API** : *Google My Business API* / *Business Profile API*.
   (Si l'accès est restreint, remplir le formulaire de demande d'accès Google.)
3. **Écran de consentement OAuth** : type « Externe », ajouter Karim en utilisateur
   de test, scope `https://www.googleapis.com/auth/business.manage`.
4. **Identifiants → ID client OAuth** (type « Application Web ») →
   récupérer `GOOGLE_CLIENT_ID` et `GOOGLE_CLIENT_SECRET`.
5. **Obtenir le `GOOGLE_REFRESH_TOKEN`** via l'OAuth Playground
   (`https://developers.google.com/oauthplayground`) :
   - roue crantée → cocher *Use your own OAuth credentials* → coller ID + secret ;
   - saisir le scope `https://www.googleapis.com/auth/business.manage` ;
   - autoriser avec le compte Google **propriétaire de la fiche** ;
   - échanger le code → copier le **refresh token**.
6. **Trouver `GBP_ACCOUNT_ID` et `GBP_LOCATION_ID`** :
   - comptes : `GET https://mybusinessaccountmanagement.googleapis.com/v1/accounts`
   - établissements : `GET https://mybusinessbusinessinformation.googleapis.com/v1/accounts/{accountId}/locations?readMask=name`
   - garder la partie numérique des identifiants renvoyés.

---

## Fréquence du cron

`vercel.json` planifie le poll **toutes les heures** (`0 * * * *`).
- **Plan Vercel Hobby** : les crons sont déclenchés **une fois par jour** (limite du plan).
- **Plan Pro** : la fréquence horaire (ou plus) s'applique.

En complément, le bouton **« ↻ Rafraîchir »** de la mini-app déclenche un poll
immédiat à la demande.

---

## Utilisation au quotidien

1. Un client laisse un avis → au prochain poll, Karim reçoit un e-mail.
2. Cliquer sur **« Valider mes réponses »** (ou ouvrir `/admin/avis-google`).
3. Relire la proposition, l'ajuster dans le champ texte si besoin.
4. **« ✅ Valider & publier »** → la réponse apparaît sur Google.
   - **« 💾 Enregistrer »** garde le brouillon sans publier.
   - **« Refuser »** classe l'avis sans réponse (réversible).

---

## Évolutions possibles (v2)

- **Validation par WhatsApp** (répondre « OK » depuis WhatsApp) via la WhatsApp
  Business API — plus fluide mais nécessite un compte Meta + BSP (Twilio/360dialog).
- **Auto-publication des avis 5★** (les seuls sans risque), validation manuelle
  conservée pour les avis ≤ 4★.
- **Fiche Cockpit** : brancher les compteurs (avis en attente) sur le tableau de bord.
