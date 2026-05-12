import { NextResponse } from 'next/server'

export async function GET(request) {
  const token = request.cookies.get('yt_token')?.value
  return NextResponse.json({ connected: !!token })
}

export async function DELETE(request) {
  const response = NextResponse.json({ ok: true })
  response.cookies.delete('yt_token')
  return response
}
