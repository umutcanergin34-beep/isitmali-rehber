import { getCollection } from 'astro:content';
import { KATEGORI_BILGI } from '../content.config';

// Üst menüdeki arama kutusunun dizini: ilk açılışta bir kez indirilir. Taslaklar (noindex) aranmaz
export async function GET() {
  const rehberler = await getCollection('rehber', (r) => !r.data.dogrulanacak);
  const dizin = rehberler.map((r) => ({
    u: `/rehber/${r.id}/`,
    b: r.data.baslik,
    a: r.data.aciklama,
    k: KATEGORI_BILGI[r.data.kategori].kisa,
    e: r.data.etiketler.join(' '),
  }));
  return new Response(JSON.stringify(dizin), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
}
