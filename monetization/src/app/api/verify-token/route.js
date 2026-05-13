import { NextResponse } from "next/server";
import { findUserByAccessToken, ensureMonthlyReset } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const { token } = await request.json();
    const user = await findUserByAccessToken(token);
    if (!user || !user.paid) {
      return NextResponse.json({ valid: false }, { status: 200 });
    }
    const fresh = await ensureMonthlyReset(user);
    return NextResponse.json({
      valid: true,
      email: fresh.email,
      firstName: fresh.firstName,
      tokensUsed: fresh.tokensUsed || 0,
      tokensLimit: fresh.tokensLimit || 0,
      tokensRemaining: Math.max(0, (fresh.tokensLimit || 0) - (fresh.tokensUsed || 0)),
      resetDate: fresh.resetDate,
    });
  } catch (err) {
    console.error("verify-token error", err.message);
    return NextResponse.json({ valid: false }, { status: 200 });
  }
}
