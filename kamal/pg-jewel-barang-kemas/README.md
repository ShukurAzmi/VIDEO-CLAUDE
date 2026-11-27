# Kamal — PG Jewel: Public Gold kini ada barang kemas (preview v1)

Video talking-head 83s → ±72s (jeda >0.25s dipendekkan). 23 babak, 24 video effect dipetakan ikut ayat
(headline, paper cut, before/after, freeze & label, spotlight, glass tag, spatial glass, checklist + check grow,
phone mockup, screen dive, sticker tag, digital zoom, prompt box, tag wall, wrap focus, frame break, skin text,
finger text, swap, skin tag, marker, green screen, CTA glass).

- Masa babak ditulis dalam **masa sumber** dan ditukar dengan `S()` (`segs.js`) → tak perlu kira semula bila potongan berubah.
- `comp.js` = `head.js + segs.js + scenes.js + tail.js`.
- Color grade gaya filem dalam `grades.sh` (anggaran, bukan LUT rasmi): NEUTRAL, THE_FATHER, THE_REVENANT, DUNE, JOKER, AMELIE, HER, DRIVE. Pilihan semasa: `grade_sel.txt` (HER).
- Green screen: `gs.py` (mediapipe selfie multiclass, `seg.tflite`) ganti latar dengan rakaman kedai IMG_5729; jalankan pada `bf` (preview) dan `bfF` (final).
- Frame break: `segimg.py` potong Adila daripada foto IMG_5669.
- B-roll iPhone (HLG, -90°) → tonemap `zscale…tonemap=mobius`, `brf/<klip>/%05d.jpg` 720×1280 bergrade.

## v2 (maklum balas Adila, 27 Nov 2026)
- Grade kembali ke grade Kamal (`grade.txt`).
- Jeda lebih santai: `MINP=0.45 MARG=0.2` (74.4s).
- Effect dikurangkan kepada 17 babak; 4 babak **green screen** (`gs.py` GSW: IMG_5630, IMG_5629×2, IMG_5729).
- Gold bar & dinar guna foto sebenar; babak "simpanan jangka panjang" guna logo Public Gold (teks orbit dibuang).
- Marker bulatan merah + "CANTIK JE?" dibuang.
- Zon selamat lebih ketat: x 90–900, y 320–1420 (safecheck + kapsyen).
- Babak v2 = `sv2_head.js + sv2_body.js` → `scenes.js`; v1 disimpan dalam `scenes_v1.js`.
