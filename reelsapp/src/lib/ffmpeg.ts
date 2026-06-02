import { exec } from "child_process";
import { promisify } from "util";
import path from "path";
import fs from "fs";

const execAsync = promisify(exec);

const TMP_DIR = "/tmp/reelsapp";

function ensureTmpDir() {
  if (!fs.existsSync(TMP_DIR)) fs.mkdirSync(TMP_DIR, { recursive: true });
}

export async function reframeToVertical(
  inputPath: string,
  outputName: string
): Promise<string> {
  ensureTmpDir();
  const outputPath = path.join(TMP_DIR, outputName);
  // Crop center to 9:16, scale to 1080x1920
  await execAsync(
    `ffmpeg -i "${inputPath}" -vf "crop=ih*9/16:ih,scale=1080:1920" -c:v libx264 -preset fast -crf 23 -c:a aac -y "${outputPath}"`
  );
  return outputPath;
}

export async function cutClip(
  inputPath: string,
  startSec: number,
  endSec: number,
  outputName: string
): Promise<string> {
  ensureTmpDir();
  const outputPath = path.join(TMP_DIR, outputName);
  const duration = endSec - startSec;
  await execAsync(
    `ffmpeg -ss ${startSec} -i "${inputPath}" -t ${duration} -c:v libx264 -preset fast -crf 23 -c:a aac -y "${outputPath}"`
  );
  return outputPath;
}

export async function burnSubtitles(
  inputPath: string,
  srtPath: string,
  outputName: string
): Promise<string> {
  ensureTmpDir();
  const outputPath = path.join(TMP_DIR, outputName);
  await execAsync(
    `ffmpeg -i "${inputPath}" -vf "subtitles='${srtPath}':force_style='FontSize=22,PrimaryColour=&Hffffff,OutlineColour=&H000000,Outline=2,Alignment=2'" -c:v libx264 -preset fast -crf 23 -c:a aac -y "${outputPath}"`
  );
  return outputPath;
}

export async function addTextOverlay(
  inputPath: string,
  text: string,
  outputName: string
): Promise<string> {
  ensureTmpDir();
  const outputPath = path.join(TMP_DIR, outputName);
  const safeText = text.replace(/'/g, "\\'");
  await execAsync(
    `ffmpeg -i "${inputPath}" -vf "drawtext=text='${safeText}':fontsize=28:fontcolor=white:x=(w-text_w)/2:y=h-80:box=1:boxcolor=black@0.5:boxborderw=10" -c:v libx264 -preset fast -crf 23 -c:a aac -y "${outputPath}"`
  );
  return outputPath;
}

export async function generateClip(params: {
  inputPath: string;
  startSec: number;
  endSec: number;
  srtPath?: string;
  ctaText?: string;
  outputName: string;
}): Promise<string> {
  const { inputPath, startSec, endSec, srtPath, ctaText, outputName } = params;

  let current = await cutClip(inputPath, startSec, endSec, `cut_${outputName}`);
  current = await reframeToVertical(current, `reframed_${outputName}`);
  if (srtPath) current = await burnSubtitles(current, srtPath, `sub_${outputName}`);
  if (ctaText) current = await addTextOverlay(current, ctaText, outputName);

  return current;
}
