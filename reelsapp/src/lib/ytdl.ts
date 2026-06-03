import ytdl from "@distube/ytdl-core";
import type { Readable } from "stream";

// Build an agent with session cookies to bypass YouTube bot detection on datacenter IPs.
// YOUTUBE_COOKIES_JSON must be a JSON array of cookie objects exported from a browser
// (e.g. via "EditThisCookie" or "Get cookies.txt LOCALLY" Chrome extensions).
function buildAgent() {
  const raw = process.env.YOUTUBE_COOKIES_JSON;
  if (!raw) return ytdl.createAgent([]);
  try {
    const cookies = JSON.parse(raw);
    return ytdl.createAgent(cookies);
  } catch {
    console.warn("YOUTUBE_COOKIES_JSON is not valid JSON — falling back to no-cookie agent");
    return ytdl.createAgent([]);
  }
}

// Streams the video starting at startMs (milliseconds), audio+video combined.
// Pipe the result into FFmpeg stdin — avoids downloading the full file.
export function streamVideoSegment(youtubeId: string, startMs: number): Readable {
  const url = `https://www.youtube.com/watch?v=${youtubeId}`;
  const agent = buildAgent();
  return ytdl(url, {
    filter: "audioandvideo",
    begin: startMs,
    agent,
  }) as unknown as Readable;
}
