import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const KATEGORILER = {
  teknoloji: 'Teknoloji ve uyumluluk',
  kullanim: 'Kullanım ve bakım',
  mevzuat: 'Mevzuat',
  guven: 'Güven ve sahte ürün',
  temel: 'Temel bilgiler',
} as const;
export type Kategori = keyof typeof KATEGORILER;
// Menüde ve kapak görsellerinde kullanılan kısa ad, renk ve adres
export const KATEGORI_BILGI: Record<Kategori, { kisa: string; renk: string; aciklama: string }> = {
  teknoloji: { kisa: 'Teknoloji', renk: '#0e6b5c', aciklama: 'Cihazlar nasıl çalışır, hangi çubukla uyumludur, markalar arasında ne fark var.' },
  kullanim: { kisa: 'Kullanım', renk: '#2f5d9e', aciklama: 'Kullanım, bakım, temizlik ve sık görülen sorunların çözümü.' },
  mevzuat: { kisa: 'Mevzuat', renk: '#9a3b2e', aciklama: 'Türkiye ve dünyada ısıtmalı tütünle ilgili kanunlar, kararlar ve değişiklikler.' },
  guven: { kisa: 'Güven', renk: '#8a5a00', aciklama: 'Sahte ürün, dolandırıcılık ve güvenli kullanım uyarıları.' },
  temel: { kisa: 'Temel bilgiler', renk: '#5b4b8a', aciklama: 'Isıtmalı tütüne yeni başlayanlar için kavramlar ve sözlük.' },
};

// Rehber yazıları: her yazı bir Markdown dosyası
const rehber = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/rehber' }),
  schema: ({ image }) => z.object({
    baslik: z.string(),
    aciklama: z.string().max(160),
    kategori: z.enum(Object.keys(KATEGORILER) as [keyof typeof KATEGORILER, ...(keyof typeof KATEGORILER)[]]),
    yayin: z.coerce.date(),
    guncelleme: z.coerce.date().optional(),
    etiketler: z.array(z.string()).default([]),
    sss: z.array(z.object({ soru: z.string(), cevap: z.string() })).default([]),
    kaynaklar: z.array(z.object({ ad: z.string(), url: z.string().url() })).default([]),
    // Yayın öncesi doğrulanması gereken bilgi varsa true; sayfada uyarı çıkar, sitemap'e girmez
    dogrulanacak: z.boolean().default(false),
    // Kapak fotoğrafı: src/assets/gorseller/ altında, sitenin kendi sunucusundan servis edilir (Wikimedia doğrudan bağlantıyı engelliyor). Paket ve marka ambalajı yok
    gorsel: z.object({
      src: image(),
      alt: z.string(),
      kaynak: z.string().optional(),
      kaynakUrl: z.string().url().optional(),
    }).optional(),
  }),
});

export const collections = { rehber };
