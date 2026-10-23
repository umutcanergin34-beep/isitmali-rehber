import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
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
export const KATEGORI_BILGI: Record<Kategori, { kisa: string; renk: string; aciklama: string; seoBaslik: string; seoAciklama: string }> = {
  teknoloji: { kisa: 'Teknoloji', renk: '#0e6b5c', aciklama: 'Cihazlar nasıl çalışır, hangi çubukla uyumludur, markalar arasında ne fark var.',
    seoBaslik: 'Isıtmalı Tütün Teknolojisi ve Çubuk Uyumluluğu',
    seoAciklama: 'IQOS, glo, Ploom ve lil cihazlarının ısıtma yöntemleri, model farkları ve hangi çubuğun hangi cihazla uyumlu olduğu; üretici kaynaklarıyla.' },
  kullanim: { kisa: 'Kullanım', renk: '#2f5d9e', aciklama: 'Kullanım, bakım, temizlik ve sık görülen sorunların çözümü.',
    seoBaslik: 'Isıtmalı Tütün Cihazı Kullanımı, Bakımı ve Sorunları',
    seoAciklama: 'Isıtmalı tütün cihazlarını adım adım kullanma, temizlik, şarj, ışık kodları ve ısıtmama gibi sık sorunların çözümü; üretici kılavuzlarına dayanır.' },
  mevzuat: { kisa: 'Mevzuat', renk: '#9a3b2e', aciklama: 'Türkiye ve dünyada ısıtmalı tütünle ilgili kanunlar, kararlar ve değişiklikler.',
    seoBaslik: 'Isıtmalı Tütün Mevzuatı: Türkiye ve Dünya',
    seoAciklama: 'Türkiye ve dünyada ısıtmalı tütünle ilgili kanunlar, AB direktifleri ve DSÖ kararları; resmi metinlere bağlantılı, sade anlatımla.' },
  guven: { kisa: 'Güven', renk: '#8a5a00', aciklama: 'Sahte ürün, dolandırıcılık ve güvenli kullanım uyarıları.',
    seoBaslik: 'Isıtmalı Tütün Cihazında Güvenlik ve Sahte Ürün',
    seoAciklama: 'Batarya güvenliği, çocuklardan uzak tutma, çubuktaki metal parça ve sahte ürün işaretleri: ısıtmalı tütün cihazları için güvenlik rehberleri.' },
  temel: { kisa: 'Temel bilgiler', renk: '#5b4b8a', aciklama: 'Isıtmalı tütüne yeni başlayanlar için kavramlar ve sözlük.',
    seoBaslik: 'Isıtmalı Tütün Nedir? Temel Bilgiler ve Sözlük',
    seoAciklama: 'Isıtmalı tütün nedir, e-sigaradan farkı ne, hangi marka hangi şirketin? Yeni başlayanlar için kavramlar, kısa tarih ve terimler sözlüğü.' },
};

// Yalnızca http(s): z.url() tek başına javascript: ve data: adreslerini de kabul eder, bunlar href olarak basılıyor
const WEB_URL = z.url({ protocol: /^https?$/ });

// Rehber yazıları: her yazı bir Markdown dosyası
const rehber = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/rehber' }),
  schema: ({ image }) => z.object({
    baslik: z.string(),
    // Arama sonucu başlığı (<title>); H1 'baslik' olarak kalır. Site adıyla birlikte ~60 karakteri geçmesin
    seoBaslik: z.string().max(60).optional(),
    aciklama: z.string().min(70).max(160),
    kategori: z.enum(Object.keys(KATEGORILER) as [keyof typeof KATEGORILER, ...(keyof typeof KATEGORILER)[]]),
    yayin: z.coerce.date(),
    guncelleme: z.coerce.date().optional(),
    etiketler: z.array(z.string()).default([]),
    sss: z.array(z.object({ soru: z.string(), cevap: z.string() })).default([]),
    kaynaklar: z.array(z.object({ ad: z.string(), url: WEB_URL })).default([]),
    // Yayın öncesi doğrulanması gereken bilgi varsa true; sayfada uyarı çıkar, sitemap'e girmez
    dogrulanacak: z.boolean().default(false),
    // Kapak fotoğrafı: src/assets/gorseller/ altında, sitenin kendi sunucusundan servis edilir (Wikimedia doğrudan bağlantıyı engelliyor). Paket ve marka ambalajı yok
    gorsel: z.object({
      src: image(),
      alt: z.string().min(10),
      kaynak: z.string().optional(),
      kaynakUrl: WEB_URL.optional(),
    }),
  }),
});

export const collections = { rehber };
