// Sitenin tek ayar dosyası.
export const SITE_ADI = 'Isıtmalı Rehber';
export const SITE_SLOGAN = 'Isıtmalı tütün cihazları için bağımsız teknik rehber';
export const SITE_URL = 'https://isitmalihber.com';
// false iken tüm sayfalar noindex, robots.txt her şeyi kapatır: alan adı ve avukat onayı gelmeden Google'a açılmaz.
export const YAYINDA = true;
// Editör: gerçek kişi, gerçek adıyla. Boşken yazar olarak site gösterilir.
export const EDITOR = { ad: 'Gülsüm Yüksel', unvan: 'Editör', hakkinda: '' };
// Okur düzeltme bildirimi için editoryal e-posta. Boşken gösterilmez.
export const ILETISIM = { eposta: 'gulsumyuksel5743@gmail.com' };
// Sahiplik açıklaması (Hakkımızda). Mağaza adı ve linki karar verilince doldurulur; boşken uyarı gösterilir.
export const SAHIPLIK = { magazaAdi: '', magazaUrl: '' };

// İçerik tarihleri UTC gece yarısı olarak okunur; derleme makinesinin saat dilimi günü kaydırmasın (isoGun da UTC)
export const tarihYaz = (d: Date) => d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
export const isoGun = (d: Date) => d.toISOString().slice(0, 10);

// Türkçe metin için dakikada ~200 kelime
export const okumaSuresi = (govde?: string) => Math.max(1, Math.round((govde ?? '').split(/\s+/).filter(Boolean).length / 200));
