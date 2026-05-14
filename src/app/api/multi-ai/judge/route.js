import { NextResponse } from 'next/server';
import { callModel, getModelLabel, JUDGE_MODEL } from '@/lib/ai-providers';

export const runtime = 'nodejs';
export const maxDuration = 60;

const JUDGE_SYSTEM = `Tu es un juge impartial. Tu reçois une question d'origine et plusieurs réponses produites par différentes IA.
Ta mission :
1. Analyser objectivement chaque réponse (pertinence, exactitude, clarté, profondeur, structure).
2. Désigner LA meilleure réponse (numéro de la réponse).
3. Justifier ton choix de manière concise mais argumentée (3 à 6 phrases).

Réponds STRICTEMENT au format JSON suivant, sans markdown ni texte avant/après :
{
  "winnerIndex": <numéro 1-based de la meilleure réponse>,
  "winnerLabel": "<nom du modèle gagnant>",
  "reasoning": "<justification en français>",
  "scores": [
    { "index": 1, "label": "<modèle>", "score": <0-10>, "comment": "<court>" },
    ...
  ]
}`;

export async function POST(req) {
  try {
    const { question, answers, judgeModel } = await req.json();
    if (!question || !Array.isArray(answers) || answers.length === 0) {
      return NextResponse.json({ error: 'question et answers requis' }, { status: 400 });
    }

    const block = answers
      .map((a, i) => {
        const label = getModelLabel(a.modelId);
        const body = a.error ? `[ERREUR : ${a.error}]` : (a.text || '[vide]');
        return `--- Réponse ${i + 1} (${label}) ---\n${body}`;
      })
      .join('\n\n');

    const userPrompt = `QUESTION D'ORIGINE :\n${question}\n\nRÉPONSES À ÉVALUER :\n\n${block}\n\nAnalyse et désigne la meilleure réponse au format JSON demandé.`;

    const raw = await callModel({
      modelId: judgeModel || JUDGE_MODEL,
      prompt: userPrompt,
      system: JUDGE_SYSTEM,
    });

    // Extraire le JSON (au cas où le modèle ajoute des fences markdown)
    let parsed;
    try {
      const match = raw.match(/\{[\s\S]*\}/);
      parsed = JSON.parse(match ? match[0] : raw);
    } catch {
      parsed = { winnerIndex: null, winnerLabel: null, reasoning: raw, scores: [] };
    }

    return NextResponse.json(parsed);
  } catch (e) {
    return NextResponse.json({ error: e.message || 'Erreur inconnue' }, { status: 500 });
  }
}
