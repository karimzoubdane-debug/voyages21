import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { inngest } from "@/lib/inngest";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { videoId } = await req.json();

  const clips = await prisma.clip.findMany({
    where: { videoId, status: { in: ["ERROR", "GENERATING", "PENDING"] } },
  });

  if (clips.length === 0) {
    return NextResponse.json({ error: "No retriable clips found" }, { status: 404 });
  }

  await prisma.clip.updateMany({
    where: { id: { in: clips.map((c) => c.id) } },
    data: { status: "PENDING" },
  });

  await inngest.send({
    name: "clip/generate",
    data: { videoId, clipIds: clips.map((c) => c.id) },
  });

  return NextResponse.json({ retried: clips.length });
}
