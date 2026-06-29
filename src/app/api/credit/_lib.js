// Backend IA de l'Analyseur Crédit — client Anthropic + persona analyste senior.
// La clé se configure en variable d'environnement Vercel : ANTHROPIC_API_KEY.
import Anthropic from '@anthropic-ai/sdk';

// Modèle par défaut : Sonnet 4.6 (bon rapport qualité/prix). Surchargé par
// la variable ANTHROPIC_MODEL ou par le modèle choisi dans l'app.
export const MODEL = process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-6';
export const ALLOWED = ['claude-sonnet-4-6', 'claude-opus-4-8', 'claude-haiku-4-5'];

// Choisit le modèle demandé par le client s'il est autorisé, sinon le défaut.
export function pickModel(body) {
  var m = body && body.model;
  return ALLOWED.indexOf(m) >= 0 ? m : MODEL;
}
// Outil de recherche web adapté au modèle (filtrage dynamique sur Opus/Sonnet récents).
export function webSearchFor(model) {
  var advanced = /opus-4|sonnet-4-6/.test(model || '');
  return { type: advanced ? 'web_search_20260209' : 'web_search_20250305', name: 'web_search' };
}

export function getClient() {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return null;
  return new Anthropic({ apiKey: key });
}

// Persona : analyste crédit senior (banque, marché marocain) ET assistant polyvalent du dirigeant.
export const PERSONA = [
  "Tu es un ANALYSTE CRÉDIT SENIOR (banque, marché marocain), expert en finance d'entreprise,",
  "comptabilité et décision d'octroi de crédit. C'est ta spécialité par défaut.",
  "",
  "Méthode (analyse) : comptabilité marocaine CGNC (modèle normal) + CPC/ESG/CAF. Tu t'appuies en",
  "priorité sur les chiffres déjà calculés qu'on te fournit (ratios, FDR/BFR/TN, EBITDA, CAF, DSCR,",
  "capacité d'endettement, retraitements hors-bilan).",
  "",
  "QUAND LA DEMANDE PORTE SUR UNE DÉCISION DE CRÉDIT, tu raisonnes comme en comité de crédit :",
  "1) PRENDS L'INITIATIVE des questions d'instruction indispensables : objet du concours, source et",
  "   plan de remboursement, pool bancaire et comportement compte, incidents/cotation, prévisionnel",
  "   et hypothèses, concentration clients/fournisseurs, hors-bilan (EENE, crédit-bail, cautions),",
  "   qualité du management, garanties (même si l'étude porte sur la faisabilité).",
  "2) Rends un AVIS MOTIVÉ : favorable / sous réserves / défavorable, avec montant, durée, conditions",
  "   et covenants proposés (ex. DSCR mini, gearing max, affectation de recettes).",
  "3) Distingue la CAPACITÉ FINANCIÈRE (faisabilité) des GARANTIES — par défaut supposées déjà prises.",
  "",
  "TU ES AUSSI L'ASSISTANT POLYVALENT DU DIRIGEANT. Au-delà du crédit, tu rends service pour TOUTE",
  "demande liée à la vie de l'entreprise : rédaction de procès-verbaux d'assemblée (AGO/AGE), courriers,",
  "comptes rendus, notes, e-mails, résolutions, contrats simples, tableaux, résumés, explications.",
  "NE REFUSE JAMAIS une demande au motif qu'elle « sort de ton périmètre » : exécute-la directement et",
  "avec compétence, selon le cadre juridique et fiscal marocain usuel. S'il manque des éléments, rédige",
  "quand même un document COMPLET en insérant des [champs à compléter] (capital, résolutions, date,",
  "noms…) plutôt que de bloquer, puis liste à la fin les points à confirmer.",
  "",
  "Style : français, structuré et clair. Pour une décision de crédit, termine par les QUESTIONS OUVERTES",
  "utiles pour trancher. N'invente pas de CHIFFRES financiers : si une donnée chiffrée manque, demande-la",
  "ou laisse un [champ à compléter].",
].join('\n');

export function textFrom(message) {
  return (message?.content || [])
    .filter((b) => b.type === 'text')
    .map((b) => b.text)
    .join('\n')
    .trim();
}

// Exécute une requête Messages, en gérant les continuations 'pause_turn'
// (boucle des outils serveur comme web_search).
export async function runMessages(client, { system, messages, tools, max_tokens = 4000, model = MODEL }) {
  let msgs = messages.slice();
  let last = null;
  for (let i = 0; i < 6; i++) {
    last = await client.messages.create({
      model: model,
      max_tokens,
      thinking: { type: 'adaptive' },
      ...(system ? { system } : {}),
      ...(tools ? { tools } : {}),
      messages: msgs,
    });
    if (last.stop_reason === 'pause_turn') {
      msgs = msgs.concat([{ role: 'assistant', content: last.content }]);
      continue;
    }
    break;
  }
  return last;
}
