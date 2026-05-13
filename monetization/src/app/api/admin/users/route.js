import { NextResponse } from "next/server";
import { getUsersCollection } from "@/lib/mongodb";
import { checkAdminKey, isValidEmail } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET(request) {
  if (!checkAdminKey(request.headers.get("x-admin-key"))) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  try {
    const users = await getUsersCollection();
    const docs = await users
      .find(
        {},
        {
          projection: {
            accessToken: 0,
            passwordHash: 0,
          },
        },
      )
      .sort({ createdAt: -1 })
      .toArray();
    return NextResponse.json({
      users: docs.map((u) => ({
        email: u.email,
        firstName: u.firstName,
        paid: !!u.paid,
        tokensUsed: u.tokensUsed || 0,
        tokensLimit: u.tokensLimit || 0,
        resetDate: u.resetDate,
        paidDate: u.paidDate,
        notes: u.notes || "",
        lastActivityAt: u.lastActivityAt,
      })),
    });
  } catch (err) {
    console.error("users GET error", err.message);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(request) {
  if (!checkAdminKey(request.headers.get("x-admin-key"))) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  try {
    const { email, action } = await request.json();
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }
    const users = await getUsersCollection();
    const paid = action === "reactivate";
    const result = await users.updateOne(
      { email: email.toLowerCase().trim() },
      { $set: { paid, updatedAt: new Date() } },
    );
    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Utilisateur introuvable" }, { status: 404 });
    }
    return NextResponse.json({ ok: true, paid });
  } catch (err) {
    console.error("users DELETE error", err.message);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
