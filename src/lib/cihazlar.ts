// Karşılaştırma tablosu (/karsilastirma/). Her satırın değerleri, `rehber` alanındaki yazının kaynaklı tablosundan alındı;
// kaynakta geçmeyen bilgi boş bırakılır (sayfada "—"). Yeni değer eklerken önce ilgili rehbere kaynağıyla yazın.
export type Isitma = 'induksiyon' | 'bicak' | 'distan' | 'hibrit';
export type Cihaz = {
  ad: string;
  marka: string; // MARKALAR slug'ı
  isitma: Isitma;
  isitmaAd: string;
  cubuk: string;
  yapi?: string; // parça yapısı ya da öne çıkan özellik
  kullanim?: string; // bir çubuğun süresi / nefes sınırı
  sarj?: string; // boştan tam şarj
  sarjBasina?: string; // tam şarjla kaç kullanım
  rehber: string; // ayrıntı ve kaynaklar
};

export const ISITMA_AD: Record<Isitma, string> = { induksiyon: 'İndüksiyon', bicak: 'Isıtma bıçağı', distan: 'Dıştan ısıtma', hibrit: 'Hibrit' };

export const CIHAZLAR: Cihaz[] = [
  { ad: 'IQOS ILUMA / ILUMA PRIME', marka: 'iqos', isitma: 'induksiyon', isitmaAd: 'SMARTCORE indüksiyon', cubuk: 'TEREA', yapi: 'Holder + şarj kutusu',
    kullanim: 'En fazla 6 dk ya da 14 nefes', sarj: 'Yaklaşık 2 sa 15 dk (kutu)', sarjBasina: 'Holder ile art arda 2', rehber: 'iqos-iluma-modelleri-farklari' },
  { ad: 'IQOS ILUMA ONE', marka: 'iqos', isitma: 'induksiyon', isitmaAd: 'SMARTCORE indüksiyon', cubuk: 'TEREA', yapi: 'Tek parça',
    kullanim: 'En fazla 6 dk ya da 14 nefes', sarj: 'Yaklaşık 1 sa 30 dk', sarjBasina: 'Art arda 20', rehber: 'iqos-iluma-modelleri-farklari' },
  { ad: 'IQOS ILUMA i / i PRIME', marka: 'iqos', isitma: 'induksiyon', isitmaAd: 'SMARTCORE indüksiyon', cubuk: 'TEREA', yapi: 'Holder + şarj kutusu, dokunmatik ekran',
    kullanim: 'En fazla 6 dk ya da 14 nefes (FlexPuff ile +4’e kadar)', sarj: 'Yaklaşık 135 dk (kutu)', sarjBasina: 'Holder ile 1-3 (moda göre)', rehber: 'iqos-iluma-i-sarj-suresi-ve-adaptor' },
  { ad: 'IQOS ILUMA i ONE', marka: 'iqos', isitma: 'induksiyon', isitmaAd: 'SMARTCORE indüksiyon', cubuk: 'TEREA', yapi: 'Tek parça',
    kullanim: 'En fazla 6 dk ya da 14 nefes', sarj: 'Yaklaşık 90 dk', sarjBasina: 'Art arda 20’ye kadar', rehber: 'iqos-iluma-i-sarj-suresi-ve-adaptor' },
  { ad: 'IQOS 3 DUO (ORIGINALS DUO)', marka: 'iqos', isitma: 'bicak', isitmaAd: 'Isıtma bıçağı', cubuk: 'HEETS', yapi: 'Holder + şarj kutusu',
    kullanim: 'En fazla 6 dk ya da 14 nefes', sarj: 'Yaklaşık 120 dk (kutu)', sarjBasina: 'Holder ile art arda 2; dolu kutuyla 20’ye kadar', rehber: 'iqos-3-duo-nasil-kullanilir' },
  { ad: 'glo hyper serisi', marka: 'glo', isitma: 'induksiyon', isitmaAd: 'İndüksiyon', cubuk: 'hyper tipi çubuk (neo)', yapi: 'Standart ve boost modu',
    kullanim: 'Yaklaşık 4 dk (boost ~3 dk), nefes sınırı yok', rehber: 'glo-hyper-serisi-modelleri' },
  { ad: 'Ploom X Advanced', marka: 'ploom', isitma: 'distan', isitmaAd: 'POWER HEATFLOW (dıştan)', cubuk: 'EVO', yapi: 'Yaklaşık 320 °C ısıtma (Japonya sürümü)',
    kullanim: 'Yaklaşık 5 dk, nefes sınırı yok', sarj: 'Yaklaşık 110 dk', sarjBasina: 'Yaklaşık 23 çubuk', rehber: 'ploom-x-sarj-suresi-ve-sarj-olmuyor' },
  { ad: 'Ploom AURA', marka: 'ploom', isitma: 'distan', isitmaAd: 'SMART HEATFLOW (dıştan)', cubuk: 'EVO', yapi: 'Dört ısıtma modu (Heat Select, Japonya)',
    kullanim: 'Yaklaşık 3-6 dk (moda göre)', sarj: 'Yaklaşık 180 dk', sarjBasina: '19-27 çubuk (moda göre)', rehber: 'ploom-aura-sarj-suresi-ve-adaptor' },
  { ad: 'lil SOLID', marka: 'lil', isitma: 'induksiyon', isitmaAd: 'Isıtma (SOLID 2.0’da indüksiyon)', cubuk: 'Fiit', rehber: 'lil-solid-hybrid-aible-farki' },
  { ad: 'lil HYBRID', marka: 'lil', isitma: 'hibrit', isitmaAd: 'Tütün çubuğu + sıvı kartuşu', cubuk: 'MIIX', yapi: 'Çubuk ve ayrı kartuş', rehber: 'lil-solid-hybrid-aible-farki' },
];
