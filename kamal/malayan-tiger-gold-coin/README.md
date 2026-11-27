# Kamal — Gold Coin Limited Edition Malayan Tiger 2026 (preview v1)

Video talking-head 42.8s → 32.9s (jeda >0.45s dipendekkan, tempo asal, santai). Mula selepas "Ok, saya yang cakap" (START=3.3);
hujung kekal 2.8s Adila tunjuk papan tanda PG Jewel (`NOCUT_AFTER=39.1` dalam `cut.py`). Senyap 32–35s (pusing syiling tanpa suara) dibuang (`CUTS`).

Perintah potong: `CUTS='[[32.05,35.25]]' START=3.3 END=41.8 NOCUT_AFTER=39.1 MINP=0.45 MARG=0.2 OFF=34 DET=src_df.wav python3 cut.py .`

## Babak (masa output)
1. 2.5s (nob) tajuk kaca "KOLEKSI TERBARU · GOLD COIN"
2. 4.1s blur + syiling 3D berpusing (harimau → Public Gold) "LIMITED EDITION / MALAYAN TIGER 2026 · No. siri 0222/1000"
3. 6.8s (nob) zoom 1.08x + glass tag "½ OZ"
4. 12.0s blur + syiling Public Gold "KETULENAN 999.9" + FINE GOLD ✓ / EMAS TULEN 24K ✓
5. 15.95s (nob) freeze & label — kad sijil "SIJIL EMAS ½ OZ · Au 999.9"
6. 19.85s (nob) freeze & label — syiling "1 OZ"
7. 20.75s blur — perbandingan saiz 1 OZ (±31.1 g) vs ½ OZ (±15.55 g)
8. 25.05s (nob) pil "DEPAN & BELAKANG"
9. 26.75s (nob) GREEN SCREEN (latar rakaman IMG_5690 paparan syiling) + zoom + "ADA BAJET?" + tag ½ OZ / 1 OZ
10. 29.95s (nob) CTA kaca "DAPATKAN DI KEDAI EMAS PG JEWEL" + butang "MALAYAN TIGER 2026"

`scenes.js = hd2.js + bd_helpers.js + bd2.js`; `comp.js = head.js + segs.js + scenes.js + tail.js`.
Foto syiling dipotong bulat dari gambar Adila (IMG_5678 harimau, IMG_5677 Public Gold, IMG_5679 kad ½ oz) → `img/c_*.png`.
Green screen perlu `libegl1` (apt) untuk mediapipe.

## Thumbnail (Adley)
Foto IMG_5682 (Adila pegang kad ½ oz + syiling 1 oz, logo PG Jewel di latar). `thumb.html` = fail kerja `make_thumb.py`:
`--pill "EDISI TERHAD! 🐯" --l1 "MALAYAN TIGER" --l2 "GOLD COIN" --l3 "2026" --sub "✨ <g>½ OZ</g> &amp; <g>1 OZ</g> · 999.9 ✨"` — tulisan y 988–1389 (zon selamat).
Nota: emoji dalam baris emas (l1/l3) jadi gumpalan emas (background-clip text) — letak emoji dalam pil/sub sahaja.

### Thumbnail B (gambar IMG_5683 — dipilih Adila untuk thumbnail)
Muka kabur (portrait mode), syiling tajam → susunan khas: syiling jadi hero (pusat ≈ 640,800), tulisan hook DI BAWAH syiling (y 985–1320),
tiada beauty.py/potong orang (muka memang kabur), cahaya emas lembut belakang syiling + 3 kilauan. `thumb_b.html` + `node thumb_shot.js <html> <out.jpg> [guide]`.
Foto = IMG_5683 digrade Adley, lebar 1546px, left −287, top −416.
