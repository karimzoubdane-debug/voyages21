# 🤝 COLLAB-IA — Règles communes à TOUTES les IA (Codex, Claude, autres)

> **À lire en premier, quelle que soit l'IA utilisée.**
> Ce fichier est la **source de vérité unique** du mode de travail multi-IA sur
> le site Voyages21. Il permet de passer d'une IA à l'autre, et de laisser une
> IA reprendre/modifier le travail d'une autre, **sans risque de casser le site**.
> `AGENTS.md` (Codex) et `CLAUDE.md` (Claude) renvoient tous les deux ici.

---

## 1. Les URLs (à ne pas confondre)

| URL | Rôle |
|---|---|
| **https://www.voyages21.com** | **Site officiel** vu par les clients (domaine public). |
| https://voyages21.vercel.app | Même site, adresse **technique** de l'hébergeur Vercel. |
| `…-git-<branche>-…vercel.app` | **Preview temporaire** d'une branche (pour tester avant mise en ligne). |

➡️ Toute modification ne devient publique sur **www.voyages21.com** que lorsqu'une
PR est **fusionnée dans `main`** (déploiement automatique Vercel).

---

## 2. Source de vérité : qu'est-ce qui est le VRAI site ?

Le site est **hybride**. Avant de modifier un fichier, sache dans quelle catégorie il est :

### ✅ VRAI SITE — EN PRODUCTION (modifier avec prudence)
- `src/app/**` — l'application **Next.js** (accueil, about, contact, faq, experiences, mice, marhaba, chroniques, partenaires, en-images, account…).
- `src/components/**` — composants partagés (NavBar, Footer…).
- `public/voyages/**.html` — **catalogue réel** des voyages (54 pages) et destinations (17 pages), servis sur `www.voyages21.com/voyages/…`.
- `public/*.html` à la racine de `public/` (ex. `cover-ete-2026.html`) et les `.js` globaux (ex. `social-contact-bar.js`).

### 🧪 MAQUETTES / PROTOTYPES — PAS la prod réelle
- `public/design/**.html` (ex. `homepage-v2-luxe.html`) — **previews de design**.
  Elles sont accessibles par URL directe mais **ne sont reliées à aucune navigation** :
  les modifier **ne peut pas casser** le parcours client. C'est le bac à sable.

> ⚠️ Ne jamais confondre une **maquette** (`public/design/`) avec la **vraie page d'accueil**
> (`src/app/page.jsx`). En cas de doute sur la cible, **demander à Karim avant de modifier**.

---

## 3. Les 5 règles d'or (anti-casse)

1. **JAMAIS de push direct sur `main`.** Toujours : nouvelle branche → commit → PR → vérifier le **preview Vercel** → puis fusionner.
2. **Une tâche = une branche = une PR.** PR petites et ciblées (faciles à relire et à annuler).
3. **Jamais deux IA sur la même branche en même temps.** On finit, on commit/push, *puis* l'autre IA prend le relais. (C'est la cause n°1 des conflits.)
4. **Modification minimale.** Ne corrige/refactorise/renomme **rien** qui n'a pas été demandé. Ne change pas l'archi ni le design global sans validation.
5. **Vérifier le preview avant de fusionner dans `main`.** Si le preview est cassé, on ne fusionne pas.

> 🛟 Filet de sécurité permanent : tout est dans Git. **Aucun changement n'est définitif**
> tant qu'il n'est pas fusionné dans `main`, et même fusionné il reste **annulable** (revert).

---

## 4. Passage de relais entre IA (handoff)

Pour qu'une IA reprenne proprement le travail d'une autre :

- **Début de session :** lire `SESSION_STATE.md` (état exact laissé par la session précédente).
- **Fin de session :** mettre à jour `SESSION_STATE.md` (date, ce qui a été fait, prochaine étape précise, fichiers modifiés, branche/PR en cours), puis commit + push.
- Indiquer **le numéro de PR et la branche** en cours pour que l'IA suivante continue au bon endroit.

---

## 5. Phrase de démarrage à coller à N'IMPORTE QUELLE IA

> « Avant toute chose, lis `COLLAB-IA.md` à la racine du dépôt et applique ses
> règles. Travaille sur une branche dédiée (jamais sur `main`), fais une PR, et
> dis-moi quels fichiers tu vas modifier — vrai site (`src/app`, `public/voyages`)
> ou maquette (`public/design`) — avant de commencer. Voici ma demande : … »

---

## 6. Checklist sécurité avant de fusionner une PR

- [ ] La PR ne touche **que** les fichiers nécessaires à la demande.
- [ ] Je sais si elle touche le **vrai site** ou une **maquette**.
- [ ] Le **preview Vercel** s'affiche correctement.
- [ ] `SESSION_STATE.md` est à jour.
- [ ] Pas de push direct sur `main`.
