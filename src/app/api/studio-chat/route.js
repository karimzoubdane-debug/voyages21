import Anthropic from '@anthropic-ai/sdk';
import { BRAND_CONTEXT } from './brand-context';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Modèle du chat. Opus 4.8 = meilleure qualité. Pour réduire le coût,
// remplacer par 'claude-sonnet-4-6' (~40% moins cher) ou 'claude-haiku-4-5'
// (~80% moins cher) — un seul mot à changer.
const MODEL = 'claude-opus-4-8';
const MAX_TOKENS = 2048;
const MAX_HISTORY = 24; // garde les derniers échanges, borne le coût par message

const noStore = { 'Cache-Control': 'no-store' };

export async function POST(request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json(
      {
        error:
          "Clé API Claude non configurée. Ajoute ANTHROPIC_API_KEY dans les variables d'environnement Vercel du projet, puis redéploie.",
      },
      { status: 503, headers: noStore },
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Requête invalide.' }, { status: 400, headers: noStore });
  }

  const history = Array.isArray(body?.messages) ? body.messages : [];
  // Ne garder que les messages valides user/assistant avec du texte.
  const messages = history
    .filter(
      (m) =>
        m &&
        (m.role === 'user' || m.role === 'assistant') &&
        typeof m.content === 'string' &&
        m.content.trim(),
    )
    .slice(-MAX_HISTORY)
    .map((m) => ({ role: m.role, content: m.content }));

  if (messages.length === 0 || messages[messages.length - 1].role !== 'user') {
    return Response.json(
      { error: 'Aucun message utilisateur à traiter.' },
      { status: 400, headers: noStore },
    );
  }

  // Contexte courant (produit sélectionné dans le tableau de bord) : bloc système
  // séparé pour ne pas casser le cache du contexte de marque.
  const system = [
    { type: 'text', text: BRAND_CONTEXT, cache_control: { type: 'ephemeral' } },
  ];
  if (typeof body?.currentProduct === 'string' && body.currentProduct.trim()) {
    system.push({
      type: 'text',
      text: `Contexte courant : Karim regarde la fiche produit « ${body.currentProduct.trim()} » dans le tableau de bord.`,
    });
  }

  const client = new Anthropic();

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const run = client.messages.stream({
          model: MODEL,
          max_tokens: MAX_TOKENS,
          system,
          messages,
        });
        for await (const event of run) {
          if (
            event.type === 'content_block_delta' &&
            event.delta?.type === 'text_delta'
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
      } catch (e) {
        controller.enqueue(
          encoder.encode('\n\n⚠️ Erreur : ' + String((e && e.message) || e)),
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}
