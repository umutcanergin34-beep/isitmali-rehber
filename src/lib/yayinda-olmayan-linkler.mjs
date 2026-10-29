// Yayın tarihi gelmemiş bir rehbere verilen bağlantıları derleme sonunda düz metne çevirir (Astro entegrasyonu).
// Böylece eski yazılara yeni yazının bağlantısı önceden eklenebilir; yazı yayına girdiği günün derlemesinde bağlantı kendiliğinden açılır.
// Markdown işlemcisinden bağımsız olsun diye çıktı HTML'i üzerinde çalışır.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIZIN = './src/content/rehber';

const bekleyenler = () => {
  if (process.env.ONIZLEME === '1') return [];
  const simdi = Date.now();
  return readdirSync(DIZIN)
    .filter((f) => f.endsWith('.md'))
    .filter((f) => {
      const yayin = readFileSync(`${DIZIN}/${f}`, 'utf8').match(/^yayin:\s*["']?(\d{4}-\d{2}-\d{2})/m)?.[1];
      return yayin && new Date(yayin).getTime() > simdi;
    })
    .map((f) => f.replace(/\.md$/, ''));
};

const htmlDosyalari = (dizin) =>
  readdirSync(dizin, { withFileTypes: true }).flatMap((d) =>
    d.isDirectory() ? htmlDosyalari(join(dizin, d.name)) : d.name.endsWith('.html') ? [join(dizin, d.name)] : [],
  );

export default function yayindaOlmayanLinkler() {
  return {
    name: 'yayinda-olmayan-linkler',
    hooks: {
      'astro:build:done': ({ dir, logger }) => {
        const bekleyen = bekleyenler();
        if (!bekleyen.length) return;
        const kalip = new RegExp(`<a href="/rehber/(?:${bekleyen.join('|')})/(?:#[^"]*)?"[^>]*>([\\s\\S]*?)</a>`, 'g');
        let sayi = 0;
        for (const f of htmlDosyalari(fileURLToPath(dir))) {
          const html = readFileSync(f, 'utf8');
          const yeni = html.replace(kalip, (_, metin) => (sayi++, metin));
          if (yeni !== html) writeFileSync(f, yeni);
        }
        if (sayi) logger.info(`${sayi} bağlantı, yayın tarihi gelmemiş rehbere gittiği için düz metne çevrildi`);
      },
    },
  };
}
