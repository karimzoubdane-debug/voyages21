import { google } from 'googleapis'
import { NextResponse } from 'next/server'

function getOAuth2Client() {
  return new google.auth.OAuth2(
    process.env.YOUTUBE_CLIENT_ID,
    process.env.YOUTUBE_CLIENT_SECRET,
    process.env.YOUTUBE_REDIRECT_URI || `${process.env.NEXT_PUBLIC_BASE_URL}/api/youtube/callback`
  )
}

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const error = searchParams.get('error')

  if (error) {
    return NextResponse.redirect(new URL('/youtube-organizer?error=access_denied', request.url))
  }

  if (!code) {
    return NextResponse.redirect(new URL('/youtube-organizer?error=no_code', request.url))
  }

  try {
    const oauth2Client = getOAuth2Client()
    const { tokens } = await oauth2Client.getToken(code)

    const tokenData = JSON.stringify({
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      expiry_date: tokens.expiry_date,
    })

    const response = NextResponse.redirect(new URL('/youtube-organizer?connected=1', request.url))
    response.cookies.set('yt_token', tokenData, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
      sameSite: 'lax',
    })

    return response
  } catch {
    return NextResponse.redirect(new URL('/youtube-organizer?error=token_failed', request.url))
  }
}
