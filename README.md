# Isıtmalı Rehber

Isıtmalı tütün cihazları (IQOS, glo, Ploom, lil) için markadan bağımsız, satış yapmayan teknik rehber sitesi. Astro ile statik site; Cloudflare Workers (statik varlıklar) üzerinde yayınlanır.

## Durum
- **Yayında.** `src/lib/site.ts` içinde `YAYINDA = true`. `false` yapılırsa tüm sayfalar `noindex` olur, `robots.txt` her şeyi kapatır.
- Alan adı: `https://isitmalihber.com` (Cloudflare Workers özel alan adı, `wrangler.jsonc`).
- Editör ve sahiplik bilgisi boş (`EDITOR`, `SAHIPLIK`). Uyarı yalnızca `YAYINDA = false` iken görünür; yayındayken Hakkımızda'da sahiplik açıklaması hiç yok. **Yapılacak.**
- Vape kategorisi yok; 3 ay sonra Search Console verisine bakılıp karar verilecek. İstisna: VEEV ONE dizisi ve kapalı pod/açık sistem yazısı (`docs/icerik-plani.md`, V1-V11); her yazıda e-sigara olduğu açıkça belirtiliyor.

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

## Kademeli yayın
`yayin` tarihi ileride olan rehber derlemeye girmez: sayfası, listelerde, aramada, RSS'te ve site haritasında görünmez (`src/lib/rehberler.ts`). Yazılar ileri tarihle eklenir, site her gün yeniden derlenip yayınlanınca o günün yazısı açılır. Önizleme için `ONIZLEME=1 npm run build` (`npm run dev` hepsini gösterir). Takvim `docs/icerik-plani.md` içinde.

Yayında olmayan bir rehbere eski yazılardan şimdiden bağlantı verilebilir: derleme sonunda bu bağlantılar düz metne çevrilir (`src/lib/yayinda-olmayan-linkler.mjs`), yazının yayın günündeki derlemede kendiliğinden açılır.

Günlük derleme: `.github/workflows/gunluk-yayin.yml` her sabah 06:00'da (TSİ) `main`'i derler, `npm test` geçerse `wrangler deploy` yapar. Elle çalıştırmak için GitHub'da Actions > Günlük yayın > Run workflow. Depo sırları: `CLOUDFLARE_API_TOKEN` ("Edit Cloudflare Workers" şablonu) ve `CLOUDFLARE_ACCOUNT_ID`.

## IndexNow (Bing, Yandex)
Anahtar dosyası: `public/dd85c5ae6b50b5a0c7e185f5d761ffa8.txt`. Yeni ya da güncellenen sayfalar yayına çıktıktan sonra `https://api.indexnow.org/indexnow` adresine bu anahtarla bildirilir. Google IndexNow kullanmaz; Google için Search Console.

## Komutlar
```bash
npm install
npm run dev     # geliştirme sunucusu
npm run build   # dist/
npm test        # satış dili, kırık bağlantı/çapa, başlık sırası, site haritası (önce build)
```
