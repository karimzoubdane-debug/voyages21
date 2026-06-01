/* eslint-disable @typescript-eslint/no-explicit-any */
import { inngest } from "@/lib/inngest";
import { prisma } from "@/lib/prisma";
import { searchYouTubeVideos } from "@/lib/youtube";

const client = inngest as any;

export const processProject = client.createFunction(
  { id: "process-project" },
  { event: "project/process" },
  async ({ event, step }: any) => {
    const { projectId } = event.data;

    await step.run("update-status-processing", async () => {
      await prisma.project.update({
        where: { id: projectId },
        data: { status: "PROCESSING" },
      });
    });

    const project = await step.run("fetch-project", async () => {
      return prisma.project.findUniqueOrThrow({ where: { id: projectId } });
    });

    const videos = await step.run("search-youtube", async () => {
      return searchYouTubeVideos(project.prompt, 10);
    });

    const top3 = [...videos]
      .sort((a: any, b: any) => b.viralityScore - a.viralityScore)
      .slice(0, 3);

    await step.run("save-videos", async () => {
      for (const v of top3) {
        await prisma.video.create({
          data: {
            projectId,
            youtubeId: v.id,
            title: v.title,
            channelName: v.channelName,
            duration: v.duration,
            viewCount: v.viewCount,
            likeCount: v.likeCount,
            viralityScore: v.viralityScore,
            thumbnailUrl: v.thumbnailUrl,
            status: "DONE",
          },
        });
      }
    });

    await step.run("update-status-done", async () => {
      await prisma.project.update({
        where: { id: projectId },
        data: { status: "DONE" },
      });
    });

    return { projectId, videosFound: top3.length };
  }
);
