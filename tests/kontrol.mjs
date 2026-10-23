// Derlenmiş sitede satış dili, kırık iç bağlantı/çapa, başlık sırası ve site haritası kontrolü. Önce: npm run build
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const KOK = 'dist';
if (!existsSync(KOK)) { console.error('dist/ yok, önce npm run build'); process.exit(1); }
const dosyalar = [];
const gez = (d) => readdirSync(d).forEach((f) => { const p = join(d, f); statSync(p).isDirectory() ? gez(p) : p.endsWith('.html') && dosyalar.push(p); });
gez(KOK);

// Sitenin hiçbir sayfasında geçmemesi gereken satış ifadeleri. Metin önce Türkçe kurallarla küçültülür:
// JS'in /i bayrağı "SATIN AL"ı "satın al" ile, "SİPARİŞ"i "sipariş" ile eşleştirmez. ı/i, ş/s yazım farkları da yakalanır.
const YASAK = [/sat[ıi]n al/, /sipari[şs] ver/, /sepete ekle/, /kap[ıi]da [öo]deme/, /wa\.me\//, /indirim/, /\d+\s?(?:tl\b|₺)/];
const hatalar = [];

// Yol -> dist dosyası ("/a/" -> dist/a/index.html, "/rss.xml" -> dist/rss.xml)
const dosyaYolu = (yol) => { const y = decodeURIComponent(yol); return y.endsWith('/') ? join(KOK, y, 'index.html') : join(KOK, y); };
const idler = new Map();
const idleri = (d) => {
  if (!idler.has(d)) idler.set(d, new Set([...readFileSync(d, 'utf8').matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
  return idler.get(d);
};
const taranacak = (html) => {
  const gorunur = html.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ');
  // Etiket silinince kaybolan metinler: meta açıklama, alt, title, aria-label ve JSON-LD (etiketler yalnızca orada)
  const ozellik = [...html.matchAll(/\s(?:content|alt|title|aria-label)="([^"]*)"/g)].map((m) => m[1]);
  const jsonLd = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  return [gorunur, ...ozellik, ...jsonLd].join(' ').toLocaleLowerCase('tr');
};

const noindex = new Set();
for (const d of dosyalar) {
  const html = readFileSync(d, 'utf8');
  const metin = taranacak(html);
  for (const y of YASAK) if (y.test(metin)) hatalar.push(`${d}: satış ifadesi (${y})`);
  if (/<meta name="robots" content="noindex/.test(html)) noindex.add(d);

  for (const [, href] of html.matchAll(/href="([^"]*)"/g)) {
    if (!href.startsWith('/') && !href.startsWith('#')) continue;
    const [yol, capa] = href.split('#');
    const hedef = yol ? dosyaYolu(yol) : d;
    if (!existsSync(hedef)) { hatalar.push(`${d}: kırık bağlantı ${href}`); continue; }
    if (capa && hedef.endsWith('.html') && !idleri(hedef).has(decodeURIComponent(capa))) hatalar.push(`${d}: kırık çapa ${href}`);
  }

  const basliklar = [...html.matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]));
  if (basliklar.filter((h) => h === 1).length !== 1) hatalar.push(`${d}: tam olarak bir h1 olmalı`);
  basliklar.forEach((h, i) => { if (i > 0 && h > basliklar[i - 1] + 1) hatalar.push(`${d}: başlık sırası atlıyor (h${basliklar[i - 1]} -> h${h})`); });
}

// RSS de yayımlanan metindir
const rssYolu = join(KOK, 'rss.xml');
if (existsSync(rssYolu)) {
  const rss = readFileSync(rssYolu, 'utf8').toLocaleLowerCase('tr');
  for (const y of YASAK) if (y.test(rss)) hatalar.push(`rss.xml: satış ifadesi (${y})`);
}

// Site haritası: noindex sayfa girmemeli, indekslenebilir her sayfa girmeli
const harita = readdirSync(KOK).filter((f) => /^sitemap-\d+\.xml$/.test(f))
  .flatMap((f) => [...readFileSync(join(KOK, f), 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => dosyaYolu(new URL(m[1]).pathname)));
for (const d of harita) if (noindex.has(d)) hatalar.push(`sitemap: noindex sayfa listelenmiş ${d}`);
for (const d of dosyalar) if (!noindex.has(d) && !harita.includes(d)) hatalar.push(`sitemap: indekslenebilir sayfa eksik ${d}`);

if (hatalar.length) { console.error(hatalar.join('\n')); process.exit(1); }
console.log(`${dosyalar.length} sayfa, ${harita.length} site haritası adresi kontrol edildi, sorun yok.`);
