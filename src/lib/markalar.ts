// Marka sayfaları (/marka/<slug>/): bilgiler "Isıtmalı tütün markaları ve üreticileri" rehberindeki tablodan.
// Bir rehber, başlığında ya da etiketlerinde markanın adı (tam kelime) geçiyorsa o markaya bağlanır.
export type Marka = {
  slug: string;
  ad: string;
  uretici: string;
  cubuk: string;
  isitma: string;
  tur: 'isitmali' | 'e-sigara';
  ozet: string;
  desen: RegExp;
};

export const MARKALAR: Marka[] = [
  { slug: 'iqos', ad: 'IQOS', uretici: 'Philip Morris International (PMI)', cubuk: 'TEREA (ILUMA), HEETS (eski modeller)', isitma: 'İndüksiyon (ILUMA), bıçak (eski modeller)', tur: 'isitmali',
    ozet: 'ILUMA, ILUMA i ve bıçaklı eski IQOS modelleri: kullanım, ışıklar, şarj, uyumlu çubuklar ve sorun giderme.', desen: /\biqos\b/i },
  { slug: 'glo', ad: 'glo', uretici: 'British American Tobacco (BAT)', cubuk: 'neo (hyper serisi), virto (Hilo)', isitma: 'İndüksiyon (hyper serisi)', tur: 'isitmali',
    ozet: 'glo hyper serisi ve Hilo ailesi: modeller arasındaki farklar, kullanım, boost modu ve ışıkların anlamı.', desen: /\bglo\b/i },
  { slug: 'ploom', ad: 'Ploom', uretici: 'Japan Tobacco International (JTI)', cubuk: 'EVO', isitma: 'Dıştan ısıtma', tur: 'isitmali',
    ozet: 'Ploom X, Ploom X Advanced ve Ploom AURA: ısıtma modları, şarj, ışıklar, uygulama ve temizlik.', desen: /\bploom\b/i },
  { slug: 'lil', ad: 'lil', uretici: 'KT&G', cubuk: 'Fiit, MIIX', isitma: 'İndüksiyon (SOLID 2.0), hibrit (HYBRID)', tur: 'isitmali',
    ozet: 'lil SOLID, lil HYBRID ve lil AIBLE: KT&G cihazlarının farkları ve kullanımı.', desen: /\blil\b/i },
  { slug: 'veev', ad: 'VEEV', uretici: 'Philip Morris International (PMI)', cubuk: 'VEEV ONE pod (kapalı sistem)', isitma: 'Sıvıyı buharlaştırır (e-sigara)', tur: 'e-sigara',
    ozet: 'VEEV ONE ısıtmalı tütün değil, kapalı pod sistemli bir e-sigaradır. Pod yapısı, şarj, ışıklar ve sorunlar.', desen: /\bveev\b/i },
];

export const rehberMarkalari = (v: { baslik: string; etiketler: string[] }) =>
  MARKALAR.filter((m) => m.desen.test(v.baslik) || v.etiketler.some((e) => m.desen.test(e))).map((m) => m.slug);
