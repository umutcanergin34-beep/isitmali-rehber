// JSON-LD yardımcıları. Sabit @id'ler sayfalar arası varlıkları birbirine bağlar.
import { SITE_ADI, SITE_URL, SITE_SLOGAN, EDITOR } from './site';

type Sema = Record<string, unknown>;
const BAGLAM = 'https://schema.org';
export const mutlakUrl = (yol: string) => new URL(yol, SITE_URL).href;
const YAYINCI_ID = mutlakUrl('/#yayinci');
const WEBSITESI_ID = mutlakUrl('/#websitesi');
const EDITOR_ID = mutlakUrl('/hakkimizda/#editor');

// Satış yapmayan yayıncı: Organization (OnlineStore değil)
export const yayinciSemasi = (): Sema => ({
  '@context': BAGLAM,
  '@type': 'Organization',
  '@id': YAYINCI_ID,
  name: SITE_ADI,
  description: SITE_SLOGAN,
  url: mutlakUrl('/'),
  logo: mutlakUrl('/favicon.svg'),
});

export const webSitesiSemasi = (): Sema => ({
  '@context': BAGLAM,
  '@type': 'WebSite',
  '@id': WEBSITESI_ID,
  name: SITE_ADI,
  url: mutlakUrl('/'),
  inLanguage: 'tr-TR',
  publisher: { '@id': YAYINCI_ID },
});

export const makaleSemasi = (slug: string, v: { baslik: string; aciklama: string; yayin: Date; guncelleme?: Date; etiketler: string[] }): Sema => ({
  '@context': BAGLAM,
  '@type': 'TechArticle',
  headline: v.baslik,
  description: v.aciklama,
  url: mutlakUrl(`/rehber/${slug}/`),
  mainEntityOfPage: mutlakUrl(`/rehber/${slug}/`),
  datePublished: v.yayin.toISOString(),
  dateModified: (v.guncelleme ?? v.yayin).toISOString(),
  inLanguage: 'tr-TR',
  keywords: v.etiketler.join(', '),
  author: EDITOR.ad ? { '@type': 'Person', '@id': EDITOR_ID, name: EDITOR.ad } : { '@id': YAYINCI_ID },
  publisher: { '@id': YAYINCI_ID },
  isPartOf: { '@id': WEBSITESI_ID },
});

export const sssSemasi = (sorular: { soru: string; cevap: string }[]) =>
  sorular.length === 0
    ? null
    : {
        '@context': BAGLAM,
        '@type': 'FAQPage',
        mainEntity: sorular.map((s) => ({ '@type': 'Question', name: s.soru, acceptedAnswer: { '@type': 'Answer', text: s.cevap } })),
      };
