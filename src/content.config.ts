import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const KATEGORILER = {
  teknoloji: 'Teknoloji ve uyumluluk',
  kullanim: 'Kullanım ve bakım',
  mevzuat: 'Mevzuat',
  guven: 'Güven ve sahte ürün',
  temel: 'Temel bilgiler',
} as const;

// Rehber yazıları: her yazı bir Markdown dosyası
const rehber = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/rehber' }),
  schema: z.object({
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
  }),
});

export const collections = { rehber };
