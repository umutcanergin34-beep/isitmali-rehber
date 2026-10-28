import rss from '@astrojs/rss';
import { yayindakiRehberler } from '../lib/rehberler';
import type { APIContext } from 'astro';
import { SITE_ADI, SITE_SLOGAN } from '../lib/site';

export async function GET(context: APIContext) {
  // noindex taslaklar (dogrulanacak) akışa da girmez
  const rehberler = (await yayindakiRehberler((r) => !r.data.dogrulanacak)).sort((a, b) => b.data.yayin.getTime() - a.data.yayin.getTime());
  return rss({
    title: SITE_ADI,
    description: SITE_SLOGAN,
    site: context.site!,
    items: rehberler.map((r) => ({ title: r.data.baslik, description: r.data.aciklama, pubDate: r.data.yayin, link: `/rehber/${r.id}/` })),
    customData: '<language>tr-TR</language>',
  });
}
