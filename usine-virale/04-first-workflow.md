# Premier workflow n8n — Airtable Trigger + Download

Objectif : valider la chaîne **Airtable → n8n → fichier local sur VPS**. C'est le maillon le plus simple, donc le bon point de départ pour vérifier que tout est branché.

## Logique du workflow

```
[Airtable Trigger]
   ↓
   Polling toutes les 5 minutes
   Filtre : Statut = "En cours"
   ↓
[HTTP Request]
   ↓
   Télécharge le fichier de "Médias Bruts" (1er attachment)
   ↓
[Write Binary File]
   ↓
   Sauvegarde dans /files/raw/{record_id}_{filename}
   ↓
[Airtable Update]
   ↓
   Met le champ "Notes" à "Téléchargé OK le {{timestamp}}"
```

## Importer le workflow

1. Ouvrir l'interface n8n : `http://TON_IP_VPS:5678`
2. Menu de gauche → **Workflows** → bouton **Import from File**
3. Sélectionner `workflows/01-airtable-trigger.json` (téléchargé depuis ce repo)
4. Le workflow apparaît avec 4 nœuds.

## Configurer les credentials

### Credential Airtable

1. Cliquer sur le nœud **Airtable Trigger**
2. Section **Credentials** → **Create New**
3. Type : **Airtable Personal Access Token**
4. Coller le PAT créé à l'étape 5 de `03-airtable-schema.md`
5. Tester la connexion

### Paramètres Airtable Trigger

| Champ | Valeur |
|---|---|
| Base | Sélectionner "Usine Virale Voyages21" |
| Table | `Publications` |
| Trigger field | `Statut` |
| Trigger value | `En cours` |
| Poll Times | `Every 5 Minutes` |

### Paramètres HTTP Request

| Champ | Valeur |
|---|---|
| Method | `GET` |
| URL | `{{ $json["Médias Bruts"][0].url }}` |
| Response Format | `File` |
| Binary Property Name | `data` |

### Paramètres Write Binary File

| Champ | Valeur |
|---|---|
| File Name | `/files/raw/{{ $('Airtable Trigger').item.json.id }}_{{ $('Airtable Trigger').item.json["Médias Bruts"][0].filename }}` |
| Binary Data | `data` |

### Paramètres Airtable Update

| Champ | Valeur |
|---|---|
| Operation | `Update` |
| Base | Usine Virale Voyages21 |
| Table | `Publications` |
| Record ID | `{{ $('Airtable Trigger').item.json.id }}` |
| Fields → Notes | `Téléchargé OK le {{ $now.toISO() }}` |

## Test

1. Dans Airtable, créer un record dans `Publications` :
   - `Titre` = "Test Sahara 001"
   - `Médias Bruts` = uploader une photo (n'importe laquelle)
   - `Statut` = `En cours`
2. Dans n8n, activer le workflow (toggle en haut à droite).
3. Attendre 5 minutes max.
4. Vérifier sur le VPS :
   ```bash
   ls -la /var/lib/docker/volumes/usine-virale_n8n_files/_data/raw/
   ```
5. Tu dois voir le fichier téléchargé.
6. Dans Airtable, le champ `Notes` doit afficher "Téléchargé OK le ..."

## Si ça ne marche pas

- Vérifier les logs n8n : `docker compose logs -f n8n`
- Vérifier l'historique d'exécution dans n8n : menu **Executions**
- Erreur courante : permissions sur `/files/raw/` → entrer dans le conteneur et créer le dossier :
  ```bash
  docker compose exec n8n mkdir -p /files/raw
  ```

---

**Prochaine étape** : une fois ce test vert, on enchaîne avec le nœud Topaz Image Web pour la restauration. Documenté plus tard dans `05-topaz-integration.md`.
