import { NextResponse } from "next/server";
import { getUsersCollection } from "@/lib/mongodb";
import { verifyPassword, isValidEmail } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    if (!isValidEmail(email) || typeof password !== "string" || !password) {
      return NextResponse.json({ error: "Email ou mot de passe invalide" }, { status: 400 });
    }
    const users = await getUsersCollection();
    const user = await users.findOne({ email: email.toLowerCase().trim() });
    if (!user || !user.passwordHash) {
      return NextResponse.json({ error: "Identifiants invalides" }, { status: 401 });
    }
    const ok = await verifyPassword(password, user.passwordHash);
    if (!ok) {
      return NextResponse.json({ error: "Identifiants invalides" }, { status: 401 });
    }
    if (!user.paid) {
      return NextResponse.json({ error: "Accès suspendu, contactez l'administrateur" }, { status: 403 });
    }
    return NextResponse.json({
      accessToken: user.accessToken,
      email: user.email,
      firstName: user.firstName,
    });
  } catch (err) {
    console.error("login error", err.message);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
