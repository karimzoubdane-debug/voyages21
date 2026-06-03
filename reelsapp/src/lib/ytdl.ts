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

function youtubeUrl(youtubeId: string) {
  return `https://www.youtube.com/watch?v=${youtubeId}`;
}

// Best video-only DASH stream starting at startMs.
export function streamVideo(youtubeId: string, startMs: number): Readable {
  const agent = buildAgent();
  return ytdl(youtubeUrl(youtubeId), {
    quality: "highestvideo",
    filter: "videoonly",
    begin: startMs,
    agent,
  }) as unknown as Readable;
}

// Best audio-only DASH stream starting at startMs.
export function streamAudio(youtubeId: string, startMs: number): Readable {
  const agent = buildAgent();
  return ytdl(youtubeUrl(youtubeId), {
    quality: "highestaudio",
    filter: "audioonly",
    begin: startMs,
    agent,
  }) as unknown as Readable;
}
