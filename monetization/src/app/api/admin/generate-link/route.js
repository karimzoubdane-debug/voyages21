import { NextResponse } from "next/server";
import { getUsersCollection } from "@/lib/mongodb";
import {
  checkAdminKey,
  generateAccessToken,
  hashPassword,
  isValidEmail,
  addDays,
} from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    if (!checkAdminKey(request.headers.get("x-admin-key"))) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { email, firstName, password, tokenLimit, notes } = await request.json();

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }
    if (typeof firstName !== "string" || !firstName.trim()) {
      return NextResponse.json({ error: "Prénom requis" }, { status: 400 });
    }
    if (typeof password !== "string" || password.length < 8) {
      return NextResponse.json({ error: "Mot de passe trop court (min 8 caractères)" }, { status: 400 });
    }
    const limit = Number(tokenLimit);
    if (!Number.isFinite(limit) || limit < 1000) {
      return NextResponse.json({ error: "Limite de tokens invalide" }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const users = await getUsersCollection();
    const accessToken = generateAccessToken();
    const passwordHash = await hashPassword(password);
    const now = new Date();

    await users.updateOne(
      { email: normalizedEmail },
      {
        $set: {
          email: normalizedEmail,
          firstName: firstName.trim(),
          passwordHash,
          accessToken,
          paid: true,
          paidDate: now,
          tokensLimit: limit,
          tokensUsed: 0,
          resetDate: addDays(now, 30),
          notes: typeof notes === "string" ? notes : "",
          updatedAt: now,
        },
        $setOnInsert: { createdAt: now },
      },
      { upsert: true },
    );

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || new URL(request.url).origin;
    const loginUrl = `${baseUrl.replace(/\/$/, "")}/login`;
    const accessLink = `${baseUrl.replace(/\/$/, "")}/access?token=${accessToken}`;

    return NextResponse.json({
      email: normalizedEmail,
      firstName: firstName.trim(),
      tokenLimit: limit,
      loginUrl,
      accessLink,
    });
  } catch (err) {
    console.error("generate-link error", err.message);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
