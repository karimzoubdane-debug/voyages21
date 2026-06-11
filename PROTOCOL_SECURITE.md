# 🛡️ PROTOCOLE DE SÉCURITÉ — VOYAGES21

**À LIRE ET RESPECTER PAR CHAQUE IA AVANT DE COMMENCER**

---

## 📋 ÉTAPE 1 : AVANT DE COMMENCER

```bash
cd /tmp/voyages21
git pull origin main
git log --oneline -5
cat SESSION_STATE.md
```

✓ Récupère le DERNIER code  
✓ Lis les derniers commits  
✓ Vérifie ce qu'ont fait les autres IAs  
✓ Identifie les fichiers que tu vas modifier  
✓ Vérifie qu'AUCUNE AUTRE IA ne travaille MAINTENANT sur les mêmes fichiers  

---

## 📝 ÉTAPE 2 : PENDANT TES MODIFICATIONS

**Fichiers à modifier (si nécessaire) :**
- ✓ `public/voyages/data.js` (ajout voyage)
- ✓ `public/brochure-media.json` (ajout médias)
- ✓ `src/app/api/media/route.js` (changement API)

**JAMAIS modifier :**
- ✗ `public/admin-cover.html`
- ✗ `public/admin-medias.html`
- ✗ Structure des routes API
- ✗ Variables d'environnement
- ✗ `package.json` ou dépendances
- ✗ DNS email (MX, SPF, SMTP, IMAP, POP3, autodiscover)
- ✗ Stockage Vercel Blob

---

## ✅ ÉTAPE 3 : AVANT DE PUSH

```bash
npm run build
```

**Doit terminer SANS ERREUR** → Corrige si nécessaire

**Teste les 3 URLs publiques :**
- ✓ https://www.voyages21.com
- ✓ https://www.voyages21.com/admin-cover.html
- ✓ https://www.voyages21.com/admin-medias.html

**Teste les 2 APIs :**
- ✓ GET `/api/cover` → retourne JSON
- ✓ GET `/api/media` → retourne JSON

**Vérifie les 2 admins :**
- ✓ admin-cover.html charge, modifier, enregistre (test basique)
- ✓ admin-medias.html charge un voyage, ajoute un média (test basique)

---

## 🔄 ÉTAPE 4 : COMMIT ET PUSH

```bash
git add .
git commit -m "Description courte de ce que tu as fait"
git push origin main
```

**Messages de commit CORRECTS :**
- ✓ "Ajoute voyage Malaisie-Thaïlande été 2026"
- ✓ "Corrige bug API media sur Vercel Blob"
- ✓ "Met à jour prix voyages Turquie"

**Messages MAUVAIS :**
- ✗ "changes"
- ✗ "fix"
- ✗ "updates"

---

## ⏳ ÉTAPE 5 : APRÈS LE PUSH

Attends **1-2 minutes** (Vercel redéploie)

Vérifie le statut sur https://vercel.com/karimzoubdane-debug/voyages21
→ Regarde que le dernier déploiement est "Ready"

**Reteste les 3 URLs publiques** sur le vrai site :
- ✓ https://www.voyages21.com
- ✓ https://www.voyages21.com/admin-cover.html
- ✓ https://www.voyages21.com/admin-medias.html

**Documente ton travail :**

```bash
git pull
echo "" >> SESSION_STATE.md
echo "✓ [DATE - NOM IA] Tâche complétée : [DESCRIPTION]" >> SESSION_STATE.md
echo "   - Fichiers modifiés: [LISTE]" >> SESSION_STATE.md
echo "   - Tests: OK" >> SESSION_STATE.md
echo "   - Vercel: OK" >> SESSION_STATE.md
git add SESSION_STATE.md
git commit -m "Update SESSION_STATE.md"
git push origin main
```

---

## 🚨 EN CAS DE PROBLÈME

**npm run build échoue ?**
→ Lis l'erreur, corrige, réessaye

**Un test fail ?**
→ `git reset --hard HEAD~1` et `git push origin main` (rollback)
→ Fais un nouveau commit correct

**Vercel ne redéploie pas ?**
→ Attends 5 minutes
→ Va sur https://vercel.com et clique "Redeploy"

**Deux IAs ont modifié le même fichier ?**
→ **STOP. Contacte l'autre IA pour coordonner.**
→ NE PAS forcer le push

---

## ⚡ RÉSUMÉ ULTRA RAPIDE

1. `git pull`
2. Modifie UNI les fichiers nécessaires
3. `npm run build` (OK ?)
4. Teste 3 URLs + 2 APIs + 2 admins
5. `git commit -m "..."`
6. `git push`
7. Attends déploiement Vercel (1-2 min)
8. Reteste tout sur le vrai site
9. Update `SESSION_STATE.md`

---

**Questions ?** Contacte l'équipe avant de commencer.
