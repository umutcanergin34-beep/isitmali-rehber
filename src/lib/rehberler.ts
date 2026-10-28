import { getCollection, type CollectionEntry } from 'astro:content';

// Kademeli yayın: `yayin` tarihi gelmemiş yazılar derlemeye hiç girmez (sayfa, liste, arama, RSS, site haritası).
// Tarihler UTC gece yarısıdır; o gün derlenen site yazıyı açar. Günlük yeniden derleme yazıları sırayla yayına çıkarır.
// ONIZLEME=1 ile derlenirse (npm run dev ya da ONIZLEME=1 npm run build) ileri tarihli yazılar da görünür.
const ONIZLEME = import.meta.env.DEV || process.env.ONIZLEME === '1';
export const yayindaMi = (r: CollectionEntry<'rehber'>) => ONIZLEME || r.data.yayin.getTime() <= Date.now();

export const yayindakiRehberler = (filtre?: (r: CollectionEntry<'rehber'>) => boolean) =>
  getCollection('rehber', (r) => yayindaMi(r) && (!filtre || filtre(r)));
