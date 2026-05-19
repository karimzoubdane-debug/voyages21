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

  try {
    const auth = getOAuth2Client(tokenData)
    const youtube = google.youtube({ version: 'v3', auth })

    const playlists = []
    let pageToken = undefined

    do {
      const res = await youtube.playlists.list({
        part: ['snippet', 'contentDetails'],
        mine: true,
        maxResults: 50,
        pageToken,
      })
      playlists.push(...(res.data.items || []))
      pageToken = res.data.nextPageToken
    } while (pageToken)

    const result = playlists.map((p) => ({
      id: p.id,
      title: p.snippet.title,
      description: p.snippet.description,
      count: p.contentDetails.itemCount,
      thumbnail: p.snippet.thumbnails?.default?.url || null,
    }))

    return NextResponse.json({ playlists: result })
  } catch (err) {
    console.error('YouTube playlists error:', err.message)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
