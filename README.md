# Isıtmalı Rehber

Isıtmalı tütün cihazları (IQOS, glo, Ploom, lil) için markadan bağımsız, satış yapmayan teknik rehber sitesi. Astro ile statik site; Cloudflare Pages'e uygun.

## Durum
- **Yayında değil.** `src/lib/site.ts` içinde `YAYINDA = false`: tüm sayfalar `noindex`, `robots.txt` her şeyi kapatıyor.
- Alan adı alınmadı; `SITE_URL` yer tutucu (`https://isitmalirehber.com`).
- Editör ve sahiplik bilgisi boş (`EDITOR`, `SAHIPLIK`); boşken Hakkımızda'da uyarı görünür.
- Vape kategorisi yok; 3 ay sonra Search Console verisine bakılıp karar verilecek.

## Yayına alma listesi
1. Avukat görüşmesi (4207 reklam yasağı ve mağazaya link konusu).
2. Alan adını al, `SITE_URL`'i değiştir.
3. `EDITOR` ve `SAHIPLIK` bilgilerini doldur.
4. `dogrulanacak: true` olan rehberlerdeki bilgileri resmi kaynaktan doğrula, bayrağı kaldır.
5. `YAYINDA = true`, Cloudflare Pages'e bağla, Search Console ve Bing'e ekle.

## İçerik kuralları
- Satış yok: fiyat, sipariş, "satın al", WhatsApp, indirim yok. `npm test` derlenmiş sayfalarda bu ifadeleri ve kırık iç bağlantıları arar.
- Sağlık iddiası yok; ürün fotoğrafı yerine tablo ve çizim.
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
npm test        # satış dili ve kırık bağlantı kontrolü (önce build)
```
