import type { APIRoute } from 'astro';
import { SITE_URL, YAYINDA } from '../lib/site';

// Yayına kadar arama motorlarına tamamen kapalı
export const GET: APIRoute = () =>
  new Response(
    YAYINDA
      ? `User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap-index.xml', SITE_URL).href}\n`
      : 'User-agent: *\nDisallow: /\n',
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
