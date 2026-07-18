// Génération de la proposition de réponse à un avis Google.
// Priorité à l'IA (API Claude) pour un texte personnalisé au ton Voyages21 ;
// repli sur un modèle de texte si la clé n'est pas configurée ou en cas d'erreur.
//
// Variables d'environnement :
//   ANTHROPIC_API_KEY  — clé API Claude (si absente : mode « modèle de secours »)
//   REVIEW_AI_MODEL    — modèle à utiliser (défaut : claude-haiku-4-5-20251001)
//   REVIEW_SIGNATURE   — signature à ajouter (défaut : « L'équipe Voyages21 »)

const ANTHROPIC_ENDPOINT = 'https://api.anthropic.com/v1/messages';
const DEFAULT_MODEL = 'claude-haiku-4-5-20251001';

function signature() {
  return process.env.REVIEW_SIGNATURE || 'L’équipe Voyages21';
}

export function isAiConfigured() {
  return !!process.env.ANTHROPIC_API_KEY;
}

// Consigne de marque : ton chaleureux, artisan du voyage sur mesure au Maroc.
const SYSTEM_PROMPT = `Tu rédiges les réponses publiques aux avis Google de Voyages21, agence de voyages sur mesure au Maroc depuis 2000 (fondateur : Karim Zoubdane).

Règles de ton :
- Chaleureux, sincère, professionnel — jamais robotique ni commercial à l'excès.
- Réponds TOUJOURS dans la langue de l'avis (français, anglais, espagnol, arabe…).
- Remercie nommément le client quand un prénom est disponible.
- Pour un avis positif : gratitude sincère + une touche personnelle qui reprend un détail de l'avis + invitation chaleureuse à revenir.
- Pour un avis mitigé ou négatif : empathie et responsabilité, sans être sur la défensive, proposer de poursuivre en privé (contact@voyages21.com), rester digne.
- Court : 2 à 4 phrases. Pas de listes, pas d'emojis à outrance (un seul maximum, optionnel).
- N'invente jamais de faits (dates, noms, prestations) qui ne sont pas dans l'avis.
- Termine par la signature exacte fournie, sur une nouvelle ligne.

Tu renvoies UNIQUEMENT le texte de la réponse, rien d'autre.`;

function buildUserPrompt(review) {
  const stars = review.rating ? `${review.rating}/5 étoiles` : 'note non précisée';
  const texte = review.comment?.trim()
    ? `Texte de l'avis :\n"""${review.comment.trim()}"""`
    : "L'avis ne contient pas de texte, seulement une note.";
  return `Nouvel avis à traiter.
Client : ${review.reviewerName || 'Client Google'}
Note : ${stars}
${texte}

Signature à utiliser telle quelle : ${signature()}`;
}

// Génère la proposition via l'API Claude. Renvoie { text, aiGenerated }.
export async function generateReply(review) {
  if (!isAiConfigured()) {
    return { text: fallbackReply(review), aiGenerated: false };
  }
  try {
    const res = await fetch(ANTHROPIC_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: process.env.REVIEW_AI_MODEL || DEFAULT_MODEL,
        max_tokens: 500,
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: buildUserPrompt(review) }],
      }),
      cache: 'no-store',
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data?.error?.message || `HTTP ${res.status}`);
    }
    const text = (data.content || [])
      .filter((block) => block.type === 'text')
      .map((block) => block.text)
      .join('')
      .trim();
    if (!text) throw new Error('Réponse IA vide');
    return { text, aiGenerated: true };
  } catch {
    // En cas de pépin IA, on ne bloque pas le pipeline : modèle de secours.
    return { text: fallbackReply(review), aiGenerated: false };
  }
}

// Modèle de secours (sans IA) : réponse correcte, à personnaliser par Karim.
export function fallbackReply(review) {
  const name = review.reviewerName && review.reviewerName !== 'Client Google'
    ? review.reviewerName
    : '';
  const bonjour = name ? `Bonjour ${name},` : 'Bonjour,';
  if (review.rating >= 4) {
    return `${bonjour}\n\nUn grand merci pour votre confiance et pour ce retour qui nous touche beaucoup. Nous serions ravis de vous accompagner à nouveau sur les routes du Maroc.\n\n${signature()}`;
  }
  if (review.rating === 3) {
    return `${bonjour}\n\nMerci d'avoir pris le temps de partager votre expérience. Nous aimerions comprendre ce qui aurait pu être mieux : n'hésitez pas à nous écrire à contact@voyages21.com afin d'en échanger.\n\n${signature()}`;
  }
  return `${bonjour}\n\nNous sommes sincèrement désolés que votre expérience n'ait pas été à la hauteur de vos attentes. Votre retour compte pour nous : pourriez-vous nous contacter à contact@voyages21.com afin que nous puissions en discuter et trouver une solution ?\n\n${signature()}`;
}
