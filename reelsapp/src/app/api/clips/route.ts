import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { inngest } from "@/lib/inngest";

function computeSegments(durationSec: number) {
  const clipDuration = 30;
  const third = Math.floor(durationSec / 3);
  return [
    { start: 0, end: Math.min(clipDuration, durationSec) },
    { start: Math.max(0, third - 15), end: Math.min(durationSec, third + 15) },
    { start: Math.max(0, durationSec - clipDuration), end: durationSec },
  ];
}

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { videoId } = await req.json();
  const video = await prisma.video.findUnique({ where: { id: videoId } });
  if (!video) return NextResponse.json({ error: "Video not found" }, { status: 404 });

  const segments = computeSegments(video.duration);
  const platforms = ["YOUTUBE_SHORT", "INSTAGRAM_REEL", "TIKTOK"] as const;

  const clips = await Promise.all(
    segments.map((seg, i) =>
      prisma.clip.create({
        data: {
          projectId: video.projectId,
          videoId,
          platform: platforms[i],
          startTime: seg.start,
          endTime: seg.end,
          status: "PENDING",
        },
      })
    )
  );

  await inngest.send({
    name: "clip/generate",
    data: { videoId, clipIds: clips.map((c: { id: string }) => c.id) },
  });

  return NextResponse.json({ clips });
}
