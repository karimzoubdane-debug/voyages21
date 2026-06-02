import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const project = await prisma.project.findUnique({
    where: { id },
    include: { videos: true, clips: true },
  });

  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // viewCount/likeCount are BigInt — NextResponse.json can't serialize them.
  const serialized = {
    ...project,
    videos: project.videos.map((v) => ({
      ...v,
      viewCount: v.viewCount.toString(),
      likeCount: v.likeCount.toString(),
    })),
  };

  return NextResponse.json(serialized);
}
