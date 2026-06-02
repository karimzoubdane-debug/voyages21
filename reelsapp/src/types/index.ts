export type Platform = "YOUTUBE_SHORT" | "INSTAGRAM_REEL" | "TIKTOK";

export interface YouTubeVideo {
  id: string;
  title: string;
  channelName: string;
  duration: number;
  viewCount: number;
  likeCount: number;
  thumbnailUrl: string;
  viralityScore: number;
}

export interface TranscriptSegment {
  start: number;
  end: number;
  text: string;
}

export interface ClipCandidate {
  startTime: number;
  endTime: number;
  platform: Platform;
  title: string;
  subtitle: string;
  ctaText: string;
  hookScore: number;
}

export interface ProjectFormData {
  name: string;
  prompt: string;
  sourceUrl?: string;
}
