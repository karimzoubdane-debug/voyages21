import ytdl from "@distube/ytdl-core";

// Parse the optional browser-exported cookie jar. Cookies tied to a logged-in
// Google account dramatically reduce YouTube's "Sign in to confirm you're not a
// bot" / 403 responses on datacenter IPs (Vercel).
function parseCookies(): unknown[] {
  const raw = process.env.YOUTUBE_COOKIES_JSON;
  if (!raw) return [];
  try {
    const cookies = JSON.parse(raw);
    return Array.isArray(cookies) ? cookies : [];
  } catch {
    console.warn("[ytdl] YOUTUBE_COOKIES_JSON is not valid JSON — ignoring");
    return [];
  }
}

// Build the request agent. The root cause of GENERATING -> ERROR in production is
// that YouTube blocks Vercel's datacenter IPs (HTTP 403). The two levers that
// actually fix this are:
//   - YOUTUBE_PROXY_URL: route requests through a (residential) proxy so the
//     request no longer comes from a flagged datacenter IP.
//   - YOUTUBE_COOKIES_JSON: authenticate as a real signed-in session.
// Both are optional and combine; without either, datacenter blocking is likely.
function buildAgent() {
  const cookies = parseCookies();
  const proxy = process.env.YOUTUBE_PROXY_URL;
  if (proxy) {
    try {
      return ytdl.createProxyAgent({ uri: proxy }, cookies as never);
    } catch (err) {
      console.warn(
        `[ytdl] Failed to build proxy agent (${
          err instanceof Error ? err.message : String(err)
        }) — falling back to direct connection`,
      );
    }
  }
  return ytdl.createAgent(cookies as never);
}

// Browser-like headers further reduce bot heuristics on the WEB client path.
const REQUEST_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  "Accept-Language": "en-US,en;q=0.9",
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// getInfo can fail transiently (403 rate-limit, timeout). Retry a few times with
// exponential backoff before giving up — a single retry often succeeds.
async function getInfoWithRetry(url: string, attempts = 3) {
  let lastErr: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      const agent = buildAgent();
      return await ytdl.getInfo(url, {
        agent,
        requestOptions: { headers: REQUEST_HEADERS },
      });
    } catch (err) {
      lastErr = err;
      const msg = err instanceof Error ? err.message : String(err);
      console.warn(`[ytdl] getInfo attempt ${i + 1}/${attempts} failed: ${msg}`);
      if (i < attempts - 1) await sleep(1000 * 2 ** i); // 1s, 2s, 4s...
    }
  }
  throw lastErr instanceof Error ? lastErr : new Error(String(lastErr));
}

export interface StreamUrls {
  videoUrl: string;
  audioUrl: string;
}

// Resolve direct googlevideo URLs. Prefers DASH (video-only + audio-only) so
// FFmpeg can seek with HTTP range requests without downloading the full file.
// Falls back to the best muxed stream when DASH is unavailable — in that case
// videoUrl === audioUrl and ffmpeg.ts uses a single -i input.
export async function getStreamUrls(youtubeId: string): Promise<StreamUrls> {
  const info = await getInfoWithRetry(
    `https://www.youtube.com/watch?v=${youtubeId}`,
  );

  const all = info.formats;
  const videoOnly = all.filter(f => f.hasVideo && !f.hasAudio && f.url);
  const audioOnly = all.filter(f => !f.hasVideo && f.hasAudio && f.url);

  if (videoOnly.length > 0 && audioOnly.length > 0) {
    const bestVideo = videoOnly.reduce((a, b) => ((b.height ?? 0) > (a.height ?? 0) ? b : a));
    const bestAudio = audioOnly.reduce((a, b) => ((b.audioBitrate ?? 0) > (a.audioBitrate ?? 0) ? b : a));
    return { videoUrl: bestVideo.url!, audioUrl: bestAudio.url! };
  }

  const muxed = all.filter(f => f.hasVideo && f.hasAudio && f.url);
  if (muxed.length > 0) {
    const best = muxed.reduce((a, b) => ((b.height ?? 0) > (a.height ?? 0) ? b : a));
    console.warn(`[ytdl] No DASH streams for ${youtubeId}, using muxed fallback (${best.height}p)`);
    return { videoUrl: best.url!, audioUrl: best.url! };
  }

  throw new Error(
    `No playable formats for ${youtubeId}. ` +
    `Total=${all.length} VideoOnly=${videoOnly.length} AudioOnly=${audioOnly.length} Muxed=${muxed.length}`
  );
}
