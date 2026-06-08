import { NextResponse } from 'next/server';

const HTML_TARGETS = new Set([
  '/design/homepage-v2-luxe.html',
  '/BROCHURE_VOYAGES21_AVEC_IMAGES_V7.html',
]);

export async function middleware(request) {
  const url = new URL(request.url);
  if (!HTML_TARGETS.has(url.pathname) || url.searchParams.get('__v21_static') === '1') {
    return NextResponse.next();
  }

  const staticUrl = new URL(request.url);
  staticUrl.searchParams.set('__v21_static', '1');
  const response = await fetch(staticUrl, { cache: 'no-store' });
  const html = await response.text();
  const script = '<script src="/cms-public.js" defer></script>';
  const body = html.includes(script) ? html : html.replace('</body>', script + '</body>');

  return new NextResponse(body, {
    status: response.status,
    headers: {
      'content-type': 'text/html; charset=utf-8',
    },
  });
}

export const config = {
  matcher: ['/design/homepage-v2-luxe.html', '/BROCHURE_VOYAGES21_AVEC_IMAGES_V7.html'],
};
