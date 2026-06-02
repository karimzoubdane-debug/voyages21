import { inngest } from "@/lib/inngest";
import { prisma } from "@/lib/prisma";
import { generateClip } from "@/lib/ffmpeg";
import { put } from "@vercel/blob";
import fs from "fs";

export const generateClips = inngest.createFunction(
  { id: "generate-clips", triggers: { event: "clip/generate" } } as any,
  async ({ event, step }: any) => {
    const { videoId, clipIds } = event.data as { videoId: string; clipIds: string[] };

    const video = await step.run("fetch-video", async () => {
      return prisma.video.findUniqueOrThrow({ where: { id: videoId } });
    });

    for (const clipId of clipIds) {
      await step.run(`generate-clip-${clipId}`, async () => {
        const clip = await prisma.clip.findUniqueOrThrow({ where: { id: clipId } });

        await prisma.clip.update({
          where: { id: clipId },
          data: { status: "GENERATING" },
        });

        try {
          const outputName = `clip_${clipId}.mp4`;
          const outputPath = await generateClip({
            youtubeId: video.youtubeId,
            startSec: clip.startTime,
            endSec: clip.endTime,
            ctaText: clip.ctaText ?? undefined,
            outputName,
          });

          const fileBuffer = fs.readFileSync(outputPath);
          const blob = await put(`clips/${clipId}.mp4`, fileBuffer, {
            access: "public",
            contentType: "video/mp4",
          });

          await prisma.clip.update({
            where: { id: clipId },
            data: { status: "DONE", outputPath: blob.url },
          });
        } catch (err) {
          // Surface the error in the DB so the UI can show it and allow retry
          await prisma.clip.update({
            where: { id: clipId },
            data: { status: "ERROR" },
          });
          throw err; // re-throw so Inngest logs the full stack trace
        }
      });
    }

    return { videoId, clipsGenerated: clipIds.length };
  }
);
