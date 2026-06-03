import ytdl from "@distube/ytdl-core";

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

export interface StreamUrls {
  videoUrl: string;
  audioUrl: string;
}

// Resolve the direct googlevideo URLs for the best video-only + audio-only
// DASH formats. FFmpeg seeks these with HTTP range requests (-ss), so we never
// download the whole file and time-seeking works (unlike ytdl's `begin`, which
// is unsupported for DASH formats).
export async function getStreamUrls(youtubeId: string): Promise<StreamUrls> {
  const agent = buildAgent();
  const info = await ytdl.getInfo(`https://www.youtube.com/watch?v=${youtubeId}`, { agent });

  const video = ytdl.chooseFormat(info.formats, {
    quality: "highestvideo",
    filter: "videoonly",
  });
  const audio = ytdl.chooseFormat(info.formats, {
    quality: "highestaudio",
    filter: "audioonly",
  });

  if (!video?.url || !audio?.url) {
    throw new Error("Could not resolve video/audio stream URLs from YouTube");
  }

  return { videoUrl: video.url, audioUrl: audio.url };
}
