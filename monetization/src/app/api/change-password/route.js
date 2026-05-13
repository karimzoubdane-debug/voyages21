import { NextResponse } from "next/server";
import { getUsersCollection } from "@/lib/mongodb";
import {
  findUserByAccessToken,
  verifyPassword,
  hashPassword,
} from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const token = request.headers.get("x-access-token");
    const { currentPassword, newPassword } = await request.json();
    if (typeof newPassword !== "string" || newPassword.length < 8) {
      return NextResponse.json({ error: "Le nouveau mot de passe doit faire au moins 8 caractères" }, { status: 400 });
    }
    const user = await findUserByAccessToken(token);
    if (!user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }
    if (!user.paid) {
      return NextResponse.json({ error: "Accès suspendu" }, { status: 403 });
    }
    const ok = await verifyPassword(currentPassword || "", user.passwordHash);
    if (!ok) {
      return NextResponse.json({ error: "Mot de passe actuel incorrect" }, { status: 401 });
    }
    const newHash = await hashPassword(newPassword);
    const users = await getUsersCollection();
    await users.updateOne(
      { _id: user._id },
      { $set: { passwordHash: newHash, passwordUpdatedAt: new Date() } },
    );
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("change-password error", err.message);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
