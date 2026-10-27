# Isıtmalı Rehber

Isıtmalı tütün cihazları (IQOS, glo, Ploom, lil) için markadan bağımsız, satış yapmayan teknik rehber sitesi. Astro ile statik site; Cloudflare Workers (statik varlıklar) üzerinde yayınlanır.

## Durum
- **Yayında.** `src/lib/site.ts` içinde `YAYINDA = true`. `false` yapılırsa tüm sayfalar `noindex` olur, `robots.txt` her şeyi kapatır.
- Alan adı: `https://isitmalihber.com` (Cloudflare Workers özel alan adı, `wrangler.jsonc`).
- Editör ve sahiplik bilgisi boş (`EDITOR`, `SAHIPLIK`). Uyarı yalnızca `YAYINDA = false` iken görünür; yayındayken Hakkımızda'da sahiplik açıklaması hiç yok. **Yapılacak.**
- Vape kategorisi yok; 3 ay sonra Search Console verisine bakılıp karar verilecek. İstisna: VEEV ONE yazısı (`kullanim` kategorisinde, e-sigara olduğu açıkça belirtiliyor).

## Yayına alma listesi
1. Avukat görüşmesi (4207 reklam yasağı ve mağazaya link konusu).
2. Alan adını al, `SITE_URL`'i değiştir.
3. `EDITOR` ve `SAHIPLIK` bilgilerini doldur.
4. `dogrulanacak: true` olan rehberlerdeki bilgileri resmi kaynaktan doğrula, bayrağı kaldır.
5. `YAYINDA = true`, `npx wrangler deploy`, Search Console ve Bing'e ekle.

## İçerik kuralları
- Satış yok: fiyat, sipariş, "satın al", WhatsApp, indirim yok. `npm test` derlenmiş sayfalarda bu ifadeleri ve kırık iç bağlantıları arar.
- Sağlık iddiası yok; ürün fotoğrafı yerine tablo ve çizim.
- İthalat yasağı ve gümrük konuları işlenmez.
- Her rehber kaynak listesiyle; doğrulanamayan bilgi yazılmaz ya da `dogrulanacak: true` ile işaretlenir.
- Mağaza ve cubukistanbul.com'daki IQOS rehberlerini burada tekrar yazma; bu site markalar arası karşılaştırma ve mevzuat odaklı.
- Mağazaya link: yazı başına en fazla bir, yalnızca ilgili bilgi sayfasına.

## Yeni rehber
`src/content/rehber/<slug>.md` dosyası ekle. Alanlar `src/content.config.ts` içinde: `baslik`, `aciklama` (en fazla 160 karakter), `kategori` (teknoloji, kullanim, mevzuat, guven, temel), `yayin`, `guncelleme`, `etiketler`, `sss`, `kaynaklar`, `dogrulanacak`.

## Komutlar
```bash
npm install
npm run dev     # geliştirme sunucusu
npm run build   # dist/
npm test        # satış dili, kırık bağlantı/çapa, başlık sırası, site haritası (önce build)
```
