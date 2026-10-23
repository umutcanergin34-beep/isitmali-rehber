#!/usr/bin/env sh
# src/assets/fonts/ altındaki yazı tiplerini @fontsource-variable paketlerinden üretir.
# latin dosyası olduğu gibi kopyalanır; latin-ext (85 KB / 42 KB) yerine yalnızca Türkçe harfleri (ğ Ğ ş Ş İ) içeren ~3 KB'lık alt küme çıkarılır.
# Gerekli: pip install fonttools brotli   (font-feature-settings "cv11","ss01" korunsun diye tüm OpenType özellikleri tutulur)
set -e
cd "$(dirname "$0")/.."
mkdir -p src/assets/fonts
for f in inter source-serif-4; do
  kaynak=node_modules/@fontsource-variable/$f/files
  cp "$kaynak/$f-latin-wght-normal.woff2" src/assets/fonts/
  pyftsubset "$kaynak/$f-latin-ext-wght-normal.woff2" --unicodes="U+011E-011F,U+0130,U+015E-015F" \
    --layout-features='*' --flavor=woff2 --output-file="src/assets/fonts/$f-tr-wght-normal.woff2"
done
ls -l src/assets/fonts
