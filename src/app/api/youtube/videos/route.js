import { google } from 'googleapis'
import { NextResponse } from 'next/server'

function getOAuth2Client(tokenData) {
  const client = new google.auth.OAuth2(
    process.env.YOUTUBE_CLIENT_ID,
    process.env.YOUTUBE_CLIENT_SECRET,
    process.env.YOUTUBE_REDIRECT_URI
  )
  client.setCredentials(tokenData)
  return client
}

export async function GET(request) {
  const tokenCookie = request.cookies.get('yt_token')?.value
  if (!tokenCookie) {
    return NextResponse.json({ error: 'not_authenticated' }, { status: 401 })
  }

  let tokenData
  try {
    tokenData = JSON.parse(tokenCookie)
  } catch {
    return NextResponse.json({ error: 'invalid_token' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const playlistId = searchParams.get('playlistId')

  if (!playlistId) {
    return NextResponse.json({ error: 'playlistId required' }, { status: 400 })
  }

  try {
    const auth = getOAuth2Client(tokenData)
    const youtube = google.youtube({ version: 'v3', auth })

    const videoIds = []
    const itemMap = {}
    let pageToken = undefined

    // Fetch all playlist items (video IDs + positions)
    do {
      const res = await youtube.playlistItems.list({
        part: ['snippet', 'contentDetails'],
        playlistId,
        maxResults: 50,
        pageToken,
      })
      for (const item of res.data.items || []) {
        const vid = item.contentDetails.videoId
        videoIds.push(vid)
        itemMap[vid] = {
          playlistItemId: item.id,
          position: item.snippet.position,
        }
      }
      pageToken = res.data.nextPageToken
    } while (pageToken)

    // Fetch full video details in batches of 50
    const videos = []
    for (let i = 0; i < videoIds.length; i += 50) {
      const batch = videoIds.slice(i, i + 50)
      const detailRes = await youtube.videos.list({
        part: ['snippet', 'contentDetails', 'statistics'],
        id: batch.join(','),
      })
      for (const v of detailRes.data.items || []) {
        videos.push({
          id: v.id,
          playlistItemId: itemMap[v.id]?.playlistItemId,
          position: itemMap[v.id]?.position,
          title: v.snippet.title,
          description: v.snippet.description,
          publishedAt: v.snippet.publishedAt,
          channel: v.snippet.channelTitle,
          duration: v.contentDetails.duration,
          thumbnail:
            v.snippet.thumbnails?.medium?.url ||
            v.snippet.thumbnails?.default?.url ||
            null,
          viewCount: v.statistics?.viewCount,
          url: `https://www.youtube.com/watch?v=${v.id}`,
        })
      }
    }

    // Sort by position in playlist
    videos.sort((a, b) => (a.position ?? 0) - (b.position ?? 0))

    return NextResponse.json({ videos, total: videos.length })
  } catch (err) {
    console.error('YouTube videos error:', err.message)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
