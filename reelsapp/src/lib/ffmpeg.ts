import ffmpegStatic from "ffmpeg-static";
import { spawn } from "child_process";
import path from "path";
import fs from "fs";
import type { Writable } from "stream";
import { streamVideo, streamAudio } from "./ytdl";

const FFMPEG = ffmpegStatic ?? "ffmpeg";
const TMP_DIR = "/tmp/reelsapp";

function ensureTmpDir() {
  if (!fs.existsSync(TMP_DIR)) fs.mkdirSync(TMP_DIR, { recursive: true });
}

// On Vercel the traced binary can lose its +x bit. Ensure it's executable once.
let ffmpegReady = false;
function ensureFfmpegExecutable() {
  if (ffmpegReady) return;
  if (ffmpegStatic && fs.existsSync(ffmpegStatic)) {
    try {
      fs.chmodSync(ffmpegStatic, 0o755);
    } catch {
      // best-effort; ignore if not permitted
    }
  }
  ffmpegReady = true;
}

// Two-pass: video-only DASH stream on fd 3, audio-only DASH stream on fd 4.
// FFmpeg muxes + crops 9:16 + cuts to duration. ctaText is burned in if provided.
export async function generateClip(params: {
  youtubeId: string;
  startSec: number;
  endSec: number;
  ctaText?: string;
  outputName: string;
}): Promise<string> {
  const { youtubeId, startSec, endSec, ctaText, outputName } = params;
  ensureTmpDir();
  ensureFfmpegExecutable();
  const outputPath = path.join(TMP_DIR, outputName);
  const duration = endSec - startSec;

  let vf = "crop=ih*9/16:ih,scale=1080:1920";
  if (ctaText) {
    const safe = ctaText.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/:/g, "\\:");
    vf += `,drawtext=text='${safe}':fontsize=28:fontcolor=white:x=(w-text_w)/2:y=h-80:box=1:boxcolor=black@0.5:boxborderw=10`;
  }

  const args = [
    "-i", "pipe:3",        // video stream on fd 3
    "-i", "pipe:4",        // audio stream on fd 4
    "-map", "0:v:0",
    "-map", "1:a:0",
    "-t", String(duration),
    "-vf", vf,
    "-c:v", "libx264",
    "-preset", "fast",
    "-crf", "23",
    "-c:a", "aac",
    "-y", outputPath,
  ];

  const startMs = Math.floor(startSec * 1000);
  const videoStream = streamVideo(youtubeId, startMs);
  const audioStream = streamAudio(youtubeId, startMs);

  return new Promise((resolve, reject) => {
    const proc = spawn(FFMPEG, args, {
      stdio: ["ignore", "pipe", "pipe", "pipe", "pipe"],
    });

    const fd3 = proc.stdio[3] as Writable | null;
    const fd4 = proc.stdio[4] as Writable | null;

    if (!fd3 || !fd4) {
      reject(new Error("FFmpeg stdio fds 3/4 not available"));
      return;
    }

    videoStream.pipe(fd3);
    audioStream.pipe(fd4);

    let stderr = "";
    proc.stderr?.on("data", (d: Buffer) => { stderr += d.toString(); });

    proc.on("close", (code: number | null) => {
      if (code === 0) {
        resolve(outputPath);
      } else {
        reject(new Error(`FFmpeg exited ${code}: ${stderr.slice(-800)}`));
      }
    });

    proc.on("error", (err: Error) => reject(err));

    const abort = (err: Error) => {
      fd3.destroy();
      fd4.destroy();
      reject(err);
    };
    videoStream.on("error", abort);
    audioStream.on("error", abort);
  });
}
