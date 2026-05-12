import { google } from 'googleapis'
import { NextResponse } from 'next/server'

function getOAuth2Client() {
  return new google.auth.OAuth2(
    process.env.YOUTUBE_CLIENT_ID,
    process.env.YOUTUBE_CLIENT_SECRET,
    process.env.YOUTUBE_REDIRECT_URI || `${process.env.NEXT_PUBLIC_BASE_URL}/api/youtube/callback`
  )
}

export async function GET() {
  const oauth2Client = getOAuth2Client()

  const scopes = [
    'https://www.googleapis.com/auth/youtube.readonly',
  ]

  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    prompt: 'consent',
  })

  return NextResponse.redirect(url)
}
