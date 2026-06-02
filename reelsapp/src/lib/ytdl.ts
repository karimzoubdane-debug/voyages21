import ytdl from "@distube/ytdl-core";
import type { Readable } from "stream";

// Streams the video starting at startMs (milliseconds), audio+video combined (max 720p).
// Pipe the result into FFmpeg stdin — avoids downloading the full file.
export function streamVideoSegment(youtubeId: string, startMs: number): Readable {
  const url = `https://www.youtube.com/watch?v=${youtubeId}`;
  return ytdl(url, {
    quality: "highestvideo",
    filter: "audioandvideo",
    begin: startMs,
  }) as unknown as Readable;
}
