// Derlenmiş sitede satış dili ve kırık iç bağlantı kontrolü. Önce: npm run build
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const KOK = 'dist';
if (!existsSync(KOK)) { console.error('dist/ yok, önce npm run build'); process.exit(1); }
const dosyalar = [];
const gez = (d) => readdirSync(d).forEach((f) => { const p = join(d, f); statSync(p).isDirectory() ? gez(p) : p.endsWith('.html') && dosyalar.push(p); });
gez(KOK);

// Sitenin hiçbir sayfasında geçmemesi gereken satış ifadeleri
const YASAK = [/satın al/i, /sipariş ver/i, /sepete ekle/i, /kapıda ödeme/i, /wa\.me\//i, /indirim/i, /\d+\s?(TL|₺)/];
const hatalar = [];
for (const d of dosyalar) {
  const html = readFileSync(d, 'utf8');
  const metin = html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ');
  for (const y of YASAK) if (y.test(metin)) hatalar.push(`${d}: satış ifadesi (${y})`);
  for (const [, href] of html.matchAll(/href="(\/[^"#]*)"/g)) {
    const hedef = join(KOK, href, href.endsWith('/') ? 'index.html' : '');
    if (!existsSync(hedef) && !existsSync(join(KOK, href))) hatalar.push(`${d}: kırık bağlantı ${href}`);
  }
}
if (hatalar.length) { console.error(hatalar.join('\n')); process.exit(1); }
console.log(`${dosyalar.length} sayfa kontrol edildi, sorun yok.`);
