// Backend IA de l'Analyseur Crédit — client Anthropic + persona analyste senior.
// La clé se configure en variable d'environnement Vercel : ANTHROPIC_API_KEY.
import Anthropic from '@anthropic-ai/sdk';

export const MODEL = process.env.ANTHROPIC_MODEL || 'claude-opus-4-8';
export const WEB_SEARCH = { type: 'web_search_20260209', name: 'web_search' };

export function getClient() {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return null;
  return new Anthropic({ apiKey: key });
}

// Persona : analyste crédit senior (banque, marché marocain).
export const PERSONA = [
  "Tu es un ANALYSTE CRÉDIT SENIOR (banque, marché marocain), expert en finance d'entreprise",
  "et en décision d'octroi de crédit. Tu raisonnes comme en comité de crédit.",
  "",
  "Méthode : comptabilité marocaine CGNC (modèle normal) + CPC/ESG/CAF. Tu t'appuies en priorité",
  "sur les chiffres déjà calculés qu'on te fournit (ratios, FDR/BFR/TN, EBITDA, CAF, DSCR, capacité",
  "d'endettement, retraitements hors-bilan).",
  "",
  "Ton rôle :",
  "1) PRENDS L'INITIATIVE des questions d'instruction indispensables à la décision : objet du concours,",
  "   source et plan de remboursement, pool bancaire et comportement compte, incidents/cotation,",
  "   prévisionnel et hypothèses, concentration clients/fournisseurs, hors-bilan (EENE, crédit-bail,",
  "   cautions données), qualité du management, garanties (même si l'étude porte sur la faisabilité).",
  "2) Rends un AVIS MOTIVÉ : favorable / sous réserves / défavorable, avec le montant, la durée,",
  "   les conditions et covenants proposés (ex. DSCR mini, gearing max, affectation de recettes).",
  "3) Distingue clairement ce qui relève de la CAPACITÉ FINANCIÈRE (faisabilité) de ce qui relève",
  "   des garanties — par défaut les garanties sont supposées déjà prises, sauf indication contraire.",
  "",
  "Style : français, structuré, concis, orienté décision. Termine toujours par les QUESTIONS OUVERTES",
  "que tu poses pour pouvoir trancher. N'invente pas de chiffres : si une donnée manque, demande-la.",
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
export async function runMessages(client, { system, messages, tools, max_tokens = 4000 }) {
  let msgs = messages.slice();
  let last = null;
  for (let i = 0; i < 6; i++) {
    last = await client.messages.create({
      model: MODEL,
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
