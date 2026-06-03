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

    let done = 0;
    let failed = 0;

    for (const clipId of clipIds) {
      // Each clip is its own step that NEVER throws — so one failing clip
      // can't abort the whole run and leave the others stuck in PENDING.
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
          done++;
          return { clipId, ok: true };
        } catch (err) {
          // Store the error message in `subtitle` so it shows up in the UI
          // for debugging (temporary), and log it for Vercel/Inngest logs.
          const message = err instanceof Error ? err.message : String(err);
          console.error(`Clip ${clipId} failed:`, message);
          await prisma.clip.update({
            where: { id: clipId },
            data: { status: "ERROR", subtitle: message.slice(0, 500) },
          });
          failed++;
          return { clipId, ok: false, error: message.slice(0, 200) };
        }
      });
    }

    return { videoId, done, failed };
  }
);
