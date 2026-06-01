import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { searchYouTubeVideos } from "@/lib/youtube";

export async function GET(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const query = req.nextUrl.searchParams.get("q");
  if (!query) return NextResponse.json({ error: "Missing query" }, { status: 400 });

  const videos = await searchYouTubeVideos(query);
  return NextResponse.json(videos);
}
