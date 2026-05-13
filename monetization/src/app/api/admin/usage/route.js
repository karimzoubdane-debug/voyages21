import { NextResponse } from "next/server";
import { getUsersCollection } from "@/lib/mongodb";
import { checkAdminKey } from "@/lib/auth";

export const runtime = "nodejs";

const COST_PER_MILLION_TOKENS_USD = 0.80;

export async function GET(request) {
  if (!checkAdminKey(request.headers.get("x-admin-key"))) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  try {
    const users = await getUsersCollection();
    const docs = await users
      .find({}, { projection: { tokensUsed: 1, paid: 1 } })
      .toArray();

    const totalTokensUsed = docs.reduce((acc, u) => acc + (u.tokensUsed || 0), 0);
    const activeUsers = docs.filter((u) => u.paid).length;
    const totalUsers = docs.length;
    const estimatedCostUSD = (totalTokensUsed / 1_000_000) * COST_PER_MILLION_TOKENS_USD;

    return NextResponse.json({
      totalTokensUsed,
      activeUsers,
      totalUsers,
      estimatedCostUSD,
      costPerMillionUSD: COST_PER_MILLION_TOKENS_USD,
    });
  } catch (err) {
    console.error("usage error", err.message);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
