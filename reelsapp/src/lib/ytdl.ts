import ytdl from "@distube/ytdl-core";

// Returns the direct CDN URL for a YouTube video (combined audio+video, max 720p).
// Passing this URL to FFmpeg with input-seeking avoids downloading the full file.
export async function getVideoUrl(youtubeId: string): Promise<string> {
  const url = `https://www.youtube.com/watch?v=${youtubeId}`;
  const info = await ytdl.getInfo(url);
  const format = ytdl.chooseFormat(info.formats, {
    quality: "highestvideo",
    filter: "audioandvideo",
  });
  return format.url;
}
