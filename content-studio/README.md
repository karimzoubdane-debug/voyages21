# Content Studio Voyages21 — Système de création de contenu piloté par Claude

Équivalent du « AIOS » : ce dossier centralise l'identité de marque, les prompts
Higgsfield et le calendrier éditorial. Claude le lit au début de chaque session
de production de contenu.

## Connecteurs actifs
| Outil | Rôle | État |
|---|---|---|
| Higgsfield (MCP) | Génération images / vidéos / audio, upscale, analyse de vidéos | ✅ opérationnel |
| Google Drive (MCP) | Réception de vos photos/vidéos sources | ✅ opérationnel (lecture) |
| Notion (MCP) | Calendrier de publication, validation des accroches | ✅ opérationnel — calendrier installé le 12/06/2026 |
| Apify (MCP) | Veille des contenus viraux concurrents | ✅ opérationnel (testé le 12/06/2026) |

## Comment transmettre vos propres images et vidéos (pour retravail)

### Canal 1 — Google Drive (recommandé pour les lots et les vidéos)
**Dossier officiel unique** : `VOYAGES21-CONTENT-STUDIO`
(https://drive.google.com/drive/folders/1PPELuQYdp4sN9gXJHZ6ND5s6fJS_UpK5)
— créé le 12/06/2026. Règle « from scratch » : tout autre média présent dans
le Drive est ignoré par le système.

1. Déposez vos fichiers dans le sous-dossier `01-SOURCES-A-DEPOSER-ICI`.
2. Une seule fois : **clic droit sur `VOYAGES21-CONTENT-STUDIO` → Partager →
   « Tous les utilisateurs disposant du lien » (lecteur)** — sans cela
   Higgsfield ne peut pas récupérer les fichiers (vérifié : fichier privé refusé).
3. Dites à Claude « retravaille les fichiers du dossier sources » :
   il les importe dans Higgsfield et lance le retravail. Les sorties validées
   sont référencées dans `02-RESULTATS-GENERES`.
   Limite : ~50 Mo par fichier pour l'import par URL. Compressez les grosses
   vidéos ou découpez-les avant dépôt.

### Canal 2 — URL publique (instantané)
Tout média déjà en ligne (site voyages21.vercel.app, Instagram, etc.) :
donnez simplement l'URL à Claude. Astuce : un fichier ajouté dans `public/`
du repo devient une URL publique après déploiement
(ex. `https://voyages21.vercel.app/logo-voyages21.png` — importé avec succès
dans Higgsfield le 12/06/2026, media_id `bf6f77a5-ddc3-4138-9ba5-66e97a4f7a03`).

### Canal 3 — Widget d'upload Higgsfield (depuis l'app Claude)
Dans une conversation Claude (app de bureau ou claude.ai), demandez
« ouvre le widget d'upload Higgsfield » : vous choisissez les fichiers
depuis votre ordinateur/téléphone, ils partent directement chez Higgsfield.
Ne pas joindre les fichiers en pièce jointe du chat : les outils Higgsfield
ne peuvent pas les lire.

### Canal 4 — YouTube (analyse uniquement)
Pour décortiquer une vidéo (la vôtre ou une référence) scène par scène :
donnez le lien YouTube, Claude lance l'analyse Higgsfield (3-5 min).

## Retravaux possibles sur vos médias
- Upscale image 2K/4K, upscale vidéo jusqu'à 4K (presets UGC, film ancien…)
- Outpainting (étendre un cadre, changer de format 9:16 ↔ 16:9)
- Suppression de fond, recadrage intelligent (reframe)
- Image → vidéo animée (donner vie à une photo de désert, riad, médina)
- Analyse scène par scène d'une vidéo pour en tirer un script réutilisable

## Fichiers du studio
- `aboutme.md` — profil de marque qui guide toutes les générations
- `prompts-higgsfield.md` — bibliothèque de prompts validés, codes visuels
- `calendrier-editorial.md` — pipeline de contenus à valider/publier
