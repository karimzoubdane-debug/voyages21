// V2 — Outils disponibles dans le chat V21 STUDIO
// Chaque outil correspond à un connecteur réel ou à un formateur structuré.

export const TOOLS = [
  {
    name: 'higgsfield_prompt',
    description:
      "Formate un prompt optimisé pour Higgsfield (image ou vidéo). À utiliser dès que Karim demande un visuel, une image, une vidéo, un Reel, ou dit 'génère', 'crée', 'visualise'. Donne toujours le prompt en anglais, précis et cinématographique.",
    input_schema: {
      type: 'object',
      properties: {
        media_type: {
          type: 'string',
          enum: ['image', 'video'],
          description: 'Type de média',
        },
        model: {
          type: 'string',
          enum: [
            'nano_banana_pro',
            'soul_2',
            'marketing_studio_image',
            'seedance_2_0',
            'marketing_studio_video',
            'kling3_0',
          ],
          description:
            'Modèle Higgsfield. nano_banana_pro = image 4K/texte. soul_2 = portrait/fashion. marketing_studio_image/video = pub produit. seedance_2_0 = vidéo identité. kling3_0 = multi-shot/audio.',
        },
        prompt: {
          type: 'string',
          description:
            'Prompt de génération en anglais, détaillé et cinématographique (style, lumière, angle, émotion, lieu).',
        },
        aspect_ratio: {
          type: 'string',
          enum: ['9:16', '16:9', '1:1', '4:5'],
          description: '9:16 pour Reels/Stories, 16:9 pour YouTube/desktop, 4:5 pour feed IG.',
        },
        duration: {
          type: 'number',
          enum: [5, 10],
          description: 'Durée en secondes (vidéo seulement). 5s = Reel rapide, 10s = storytelling.',
        },
        notes: {
          type: 'string',
          description:
            "Recommandations de style ou contexte pour Karim (pourquoi ce modèle, comment l'utiliser).",
        },
      },
      required: ['media_type', 'model', 'prompt', 'aspect_ratio'],
    },
  },
  {
    name: 'scan_instagram',
    description:
      "Lance un scan Apify des derniers posts d'un compte Instagram concurrent. À utiliser quand Karim demande 'scanne @handle', 'veille sur X', 'analyse le compte de Y', ou 'qu'est-ce que Z publie'.",
    input_schema: {
      type: 'object',
      properties: {
        username: {
          type: 'string',
          description: 'Handle Instagram sans le @ (ex: vacancia.ma)',
        },
        limit: {
          type: 'number',
          default: 8,
          description: 'Nombre de posts à analyser (max 15, défaut 8)',
        },
      },
      required: ['username'],
    },
  },
  {
    name: 'add_to_calendar',
    description:
      "Ajoute une idée de contenu au calendrier éditorial Notion de Voyages21. À utiliser quand Karim dit 'note ça', 'ajoute au calendrier', 'programme', 'enregistre cette idée', ou valide un concept de post.",
    input_schema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          description: "Titre de l'idée ou du post (court, descriptif)",
        },
        destination: {
          type: 'string',
          description: 'Destination concernée (Égypte, Turquie, Maroc, Omra, etc.)',
        },
        format: {
          type: 'string',
          enum: ['Reel', 'Carrousel', 'Photo', 'Story'],
          description: 'Format du contenu',
        },
        accroche: {
          type: 'string',
          description: 'Accroche principale (optionnel)',
        },
        date_cible: {
          type: 'string',
          description: 'Date cible ISO (YYYY-MM-DD), optionnel',
        },
      },
      required: ['title', 'destination', 'format'],
    },
  },
];

// Exécute un outil et retourne { text, mediaMarker? }
export async function executeTool(name, input) {
  switch (name) {
    case 'higgsfield_prompt':
      return toolHiggsfieldPrompt(input);
    case 'scan_instagram':
      return toolScanInstagram(input);
    case 'add_to_calendar':
      return toolAddToCalendar(input);
    default:
      return { text: `Outil inconnu : ${name}` };
  }
}

// ── Higgsfield prompt formatter ──────────────────────────────────────────────
// Pas d'API Higgsfield pour l'instant : formate le prompt en carte copiable.
// Quand HIGGSFIELD_TOKEN sera dispo dans Vercel, on upgrade vers génération live.
function toolHiggsfieldPrompt(input) {
  const { media_type, model, prompt, aspect_ratio, duration, notes } = input;
  const data = {
    type: media_type === 'video' ? 'hf_video_prompt' : 'hf_image_prompt',
    model,
    prompt,
    aspect_ratio,
    ...(media_type === 'video' && { duration: duration || 5 }),
    ...(notes && { notes }),
  };
  const b64 = Buffer.from(JSON.stringify(data)).toString('base64');
  return {
    text: `Prompt Higgsfield formaté. Modèle : ${model}. Format : ${aspect_ratio}${media_type === 'video' ? ` · ${duration || 5}s` : ''}.`,
    mediaMarker: `[V21:HFPROMPT:${b64}]`,
  };
}

// ── Apify Instagram scan ─────────────────────────────────────────────────────
async function toolScanInstagram({ username, limit = 8 }) {
  const token = process.env.APIFY_TOKEN;
  if (!token) {
    return {
      text: "APIFY_TOKEN non configuré dans les variables d'environnement Vercel. Ajoute-le pour activer la veille depuis le chat.",
    };
  }

  const safeLimit = Math.min(Number(limit) || 8, 15);

  try {
    const startRes = await fetch(
      `https://api.apify.com/v2/acts/apify~instagram-scraper/runs?token=${token}&waitSecs=45`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          directUrls: [`https://www.instagram.com/${username}/`],
          resultsType: 'posts',
          resultsLimit: safeLimit,
          addParentData: false,
        }),
      },
    );

    if (!startRes.ok) {
      const err = await startRes.text();
      return { text: `Erreur Apify (${startRes.status}) : ${err.slice(0, 200)}` };
    }

    const runData = await startRes.json();
    const datasetId = runData?.data?.defaultDatasetId;
    const status = runData?.data?.status;

    if (!datasetId) {
      return { text: `Scan @${username} : pas de dataset retourné (statut : ${status}).` };
    }

    if (status !== 'SUCCEEDED') {
      return {
        text: `Scan @${username} toujours en cours (statut : ${status}). Dataset : ${datasetId}. Réessaie dans quelques secondes.`,
      };
    }

    const itemsRes = await fetch(
      `https://api.apify.com/v2/datasets/${datasetId}/items?token=${token}&limit=${safeLimit}&format=json`,
    );
    if (!itemsRes.ok) {
      return { text: `Erreur lecture dataset : ${itemsRes.status}` };
    }

    const items = await itemsRes.json();
    if (!Array.isArray(items) || items.length === 0) {
      return { text: `Aucun post trouvé pour @${username}. Compte privé ou inexistant.` };
    }

    const lines = items.map((p, i) => {
      const likes = p.likesCount || 0;
      const coms = p.commentsCount || 0;
      const views = p.videoViewCount ? ` | ${p.videoViewCount.toLocaleString()} vues` : '';
      const icon = p.type === 'Video' ? '🎥' : p.type === 'Sidecar' ? '📑' : '🖼';
      const cap = (p.caption || '').replace(/\n/g, ' ').slice(0, 70);
      return `${i + 1}. ${icon} ${likes.toLocaleString()} ❤️  ${coms} 💬${views}\n   « ${cap}… »`;
    });

    return {
      text: `Scan Apify @${username} — ${items.length} posts :\n\n${lines.join('\n\n')}`,
    };
  } catch (e) {
    return { text: `Erreur scan @${username} : ${e?.message || e}` };
  }
}

// ── Notion calendar ──────────────────────────────────────────────────────────
const NOTION_DB_ID = '0bd16790-40ac-470d-8e59-12eae406df2b';

async function toolAddToCalendar({ title, destination, format, accroche, date_cible }) {
  const token = process.env.NOTION_TOKEN;
  if (!token) {
    return {
      text: "NOTION_TOKEN non configuré dans les variables d'environnement Vercel. Ajoute-le pour activer l'ajout au calendrier depuis le chat.",
    };
  }

  try {
    const props = {
      Name: { title: [{ text: { content: title } }] },
    };
    // Propriétés conditionnelles : noms exacts selon la base Notion de Karim.
    // Si une propriété n'existe pas, Notion retourne une erreur 400 qu'on gère ci-dessous.
    if (destination) props['Destination'] = { rich_text: [{ text: { content: destination } }] };
    if (format) props['Format'] = { select: { name: format } };
    if (accroche) props['Accroche'] = { rich_text: [{ text: { content: accroche } }] };
    if (date_cible) props['Date cible'] = { date: { start: date_cible } };

    const res = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        parent: { database_id: NOTION_DB_ID },
        properties: props,
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      return {
        text: `Erreur Notion (${res.status}) : ${err?.message || JSON.stringify(err).slice(0, 200)}`,
      };
    }

    const page = await res.json();
    return {
      text: `✅ Idée ajoutée au calendrier Notion !\nTitre : "${title}" — ${destination} — ${format}\nOuvrir : ${page?.url || 'https://notion.so'}`,
    };
  } catch (e) {
    return { text: `Erreur Notion : ${e?.message || e}` };
  }
}
