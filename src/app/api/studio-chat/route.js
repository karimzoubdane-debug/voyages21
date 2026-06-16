import Anthropic from '@anthropic-ai/sdk';
import { BRAND_CONTEXT } from './brand-context';
import { TOOLS, executeTool } from './tools';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Sonnet 4.6 = meilleur rapport qualité/prix. Opus 4.8 = max. Haiku 4.5 = économique.
const MODEL = 'claude-sonnet-4-6';
const MAX_TOKENS = 4096;
const MAX_HISTORY = 24;
const MAX_TOOL_ROUNDS = 3;

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
      const send = (text) => controller.enqueue(encoder.encode(text));

      try {
        let currentMessages = [...messages];

        for (let round = 0; round < MAX_TOOL_ROUNDS; round++) {
          // Stream la réponse Claude (texte livré en temps réel au navigateur)
          const run = client.messages.stream({
            model: MODEL,
            max_tokens: MAX_TOKENS,
            system,
            messages: currentMessages,
            tools: TOOLS,
          });

          for await (const event of run) {
            if (
              event.type === 'content_block_delta' &&
              event.delta?.type === 'text_delta'
            ) {
              send(event.delta.text);
            }
          }

          // Message complet accumulé par le SDK
          const finalMsg = await run.finalMessage();

          if (finalMsg.stop_reason !== 'tool_use') break;

          // Exécuter les outils demandés par Claude
          const toolUseBlocks = finalMsg.content.filter((b) => b.type === 'tool_use');
          const toolResults = [];

          for (const toolBlock of toolUseBlocks) {
            const result = await executeTool(toolBlock.name, toolBlock.input);

            // Injecter le marqueur média dans le stream AVANT de passer le résultat à Claude
            if (result.mediaMarker) {
              send(result.mediaMarker);
            }

            toolResults.push({
              type: 'tool_result',
              tool_use_id: toolBlock.id,
              content: result.text,
            });
          }

          currentMessages = [
            ...currentMessages,
            { role: 'assistant', content: finalMsg.content },
            { role: 'user', content: toolResults },
          ];
        }
      } catch (e) {
        send('\n\n⚠️ Erreur : ' + String(e?.message || e));
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
