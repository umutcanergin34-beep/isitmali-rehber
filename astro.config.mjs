import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync } from 'node:fs';
import { SITE_URL } from './src/lib/site.ts';

// noindex olan taslak rehberler (dogrulanacak: true) site haritasına girmez
const taslaklar = readdirSync('./src/content/rehber')
  .filter((f) => {
    if (!f.endsWith('.md')) return false;
    // Yalnızca frontmatter'a bak: gövdedeki bir kod örneği yazıyı haritadan düşürmesin. Tutarlılığı tests/kontrol.mjs doğrular
    const on = readFileSync(`./src/content/rehber/${f}`, 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? '';
    return /^dogrulanacak:\s*true\b/m.test(on);
  })
  .map((f) => `/rehber/${f.replace(/\.md$/, '')}/`);

// Site haritası lastmod: rehberin güncelleme (yoksa yayın) tarihi; liste sayfaları için içindeki en yeni rehberin tarihi
const tarihler = {};
for (const f of readdirSync('./src/content/rehber').filter((f) => f.endsWith('.md'))) {
  const md = readFileSync(`./src/content/rehber/${f}`, 'utf8');
  // Yayın tarihi gelmemiş yazı derlenmez (src/lib/rehberler.ts); liste sayfalarının lastmod'unu ileri tarihe çekmesin
  const yayin = md.match(/^yayin:\s*["']?(\d{4}-\d{2}-\d{2})/m)?.[1];
  if (yayin && process.env.ONIZLEME !== '1' && new Date(yayin).getTime() > Date.now()) continue;
  const t = (md.match(/^guncelleme:\s*["']?(\d{4}-\d{2}-\d{2})/m) ?? md.match(/^yayin:\s*["']?(\d{4}-\d{2}-\d{2})/m))?.[1];
  const k = md.match(/^kategori:\s*["']?(\w+)/m)?.[1];
  if (t) tarihler[`/rehber/${f.replace(/\.md$/, '')}/`] = { t, k };
}
const enYeni = (liste) => liste.map((x) => x.t).sort().at(-1);
const yayinda = Object.entries(tarihler).filter(([y]) => !taslaklar.includes(y)).map(([, x]) => x);
const lastmod = (yol) =>
  tarihler[yol]?.t ??
  (yol.startsWith('/kategori/') ? enYeni(yayinda.filter((x) => yol === `/kategori/${x.k}/`)) : ['/', '/rehber/'].includes(yol) ? enYeni(yayinda) : undefined);

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'always' },
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  // Hiçbir dosya data: URI olarak gömülmesin: Header menü betiği (CSP'de script-src 'unsafe-inline' gerekmesin)
  // ve küçük Türkçe woff2 alt kümeleri (font-src default-src 'self' ile data: kabul etmez)
  vite: { build: { assetsInlineLimit: 0 } },
  integrations: [
    sitemap({
      filter: (sayfa) => !taslaklar.some((y) => sayfa.endsWith(y)),
      serialize: (oge) => {
        const t = lastmod(new URL(oge.url).pathname);
        return t ? { ...oge, lastmod: t } : oge;
      },
    }),
  ],
});
