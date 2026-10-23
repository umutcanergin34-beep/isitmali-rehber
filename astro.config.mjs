import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync } from 'node:fs';
import { SITE_URL } from './src/lib/site.ts';

// noindex olan taslak rehberler (dogrulanacak: true) site haritasına girmez
const taslaklar = readdirSync('./src/content/rehber')
  .filter((f) => f.endsWith('.md') && /^dogrulanacak:\s*true/m.test(readFileSync(`./src/content/rehber/${f}`, 'utf8')))
  .map((f) => `/rehber/${f.replace(/\.md$/, '')}/`);

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  integrations: [sitemap({ filter: (sayfa) => !taslaklar.some((y) => sayfa.endsWith(y)) })],
});
