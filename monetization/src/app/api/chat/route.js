import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { getUsersCollection } from "@/lib/mongodb";
import { findUserByAccessToken, ensureMonthlyReset } from "@/lib/auth";

export const runtime = "nodejs";
export const maxDuration = 60;

const MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-6";
const SYSTEM_PROMPT =
  "Tu es un assistant personnel bienveillant et précis. Tu réponds en français par défaut, sauf si l'utilisateur écrit dans une autre langue. Tu adaptes ton niveau de détail à la question.";

function estimateInputTokens(messages) {
  let chars = 0;
  for (const m of messages) {
    if (typeof m?.content === "string") chars += m.content.length;
  }
  return Math.ceil(chars / 4) + messages.length * 4;
}

export async function POST(request) {
  try {
    const token = request.headers.get("x-access-token");
    if (!token) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    let user = await findUserByAccessToken(token);
    if (!user) {
      return NextResponse.json({ error: "Token invalide" }, { status: 403 });
    }
    if (!user.paid) {
      return NextResponse.json({ error: "Accès suspendu, contactez l'administrateur" }, { status: 403 });
    }

    user = await ensureMonthlyReset(user);

    const tokensUsed = user.tokensUsed || 0;
    const tokensLimit = user.tokensLimit || 0;

    if (tokensUsed >= tokensLimit) {
      return NextResponse.json(
        { error: "Limite mensuelle atteinte", tokensUsed, tokensLimit },
        { status: 429 },
      );
    }

    const { messages } = await request.json();
    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Messages manquants" }, { status: 400 });
    }

    const formattedMessages = messages
      .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
      .map((m) => ({ role: m.role, content: m.content }));

    if (formattedMessages.length === 0) {
      return NextResponse.json({ error: "Messages invalides" }, { status: 400 });
    }

    const estimatedInput = estimateInputTokens(formattedMessages);
    if (tokensUsed + estimatedInput > tokensLimit) {
      return NextResponse.json(
        { error: "Limite mensuelle atteinte", tokensUsed, tokensLimit },
        { status: 429 },
      );
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({ error: "ANTHROPIC_API_KEY manquante" }, { status: 500 });
    }

    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const remaining = Math.max(256, tokensLimit - tokensUsed - estimatedInput);
    const maxTokens = Math.min(2048, remaining);

    const response = await client.messages.create({
      model: MODEL,
      max_tokens: maxTokens,
      system: SYSTEM_PROMPT,
      messages: formattedMessages,
    });

    const reply = response.content
      .filter((c) => c.type === "text")
      .map((c) => c.text)
      .join("");

    const realInput = response.usage?.input_tokens || 0;
    const realOutput = response.usage?.output_tokens || 0;
    const realTotal = realInput + realOutput;

    const users = await getUsersCollection();
    const updated = await users.findOneAndUpdate(
      { _id: user._id },
      {
        $inc: { tokensUsed: realTotal },
        $set: { lastActivityAt: new Date() },
      },
      { returnDocument: "after" },
    );

    return NextResponse.json({
      reply,
      tokensUsed: updated?.tokensUsed ?? tokensUsed + realTotal,
      tokensLimit,
      tokensSpentThisMessage: realTotal,
    });
  } catch (err) {
    console.error("chat error", err.message);
    return NextResponse.json({ error: err.message || "Erreur serveur" }, { status: 500 });
  }
}
