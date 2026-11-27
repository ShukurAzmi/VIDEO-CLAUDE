# Kamal — PG Jewel Mydin Bukit Jambul (preview v1)

Talking-head 39.5s → 27.3s (jeda >0.45s dipendekkan, tempo asal). Mula pada "Saya berada di Mydin…" (START=5.25; buang "Nak cakap apa?" juru kamera);
hujung kekal 1.4s syot paparan barang kemas untuk CTA (`NOCUT_AFTER=32.6`, END=34.0; "Itu nak baliklah" & hujung dibuang).

`START=5.25 END=34.0 NOCUT_AFTER=32.6 MINP=0.45 MARG=0.2 OFF=34 DET=src_df.wav python3 cut.py .`

Transkrip: Whisper large-v3 sekeping-sekeping (`tr4.py`; transkrip penuh gagal/halusinasi kerana bunyi kedai). Kapsyen dibetulkan dalam `words.json`:
Maidin→MYDIN, Bukit Jambor→BUKIT JAMBUL, special→KHAS, e-commerce GAP→AKAUN EMAS GAP, Orang-orang→TUAN-PUAN.

## Babak (masa sumber, `S()`)
1. 6.6 (nob) pil "📍 MYDIN BUKIT JAMBUL"
2. 8.5 blur — "TINGKAT LOWER GROUND" + klip kedai IMG_5700 dalam bingkai emas (flip 3D)
3. 11.65 (nob) zoom + glass tag logo PG JEWEL
4. 14.6 blur — "TEMPAT JUAL & BELI" + klip dulang IMG_5734 + pil JUAL ⇄ BELI
5. 18.15 blur — "KHAS UNTUK pemilik AKAUN EMAS GAP" ✓
6. 21.0 (nob) GREEN SCREEN (dulang IMG_5729) + zoom + "BARANG KEMAS" + tag 916 / 999
7. 25.35 blur — checklist "YANG BEST? HANYA BAWA: IC ✓ TELEFON ✓"
8. 29.0 blur — kipas 3 klip (cincin di jari dari klip 30s, IMG_5735, IMG_5728) "PILIH SENDIRI"
9. 31.05 (nob) CTA kaca "KEDAI EMAS PG JEWEL · Mydin Bukit Jambul · Lower Ground" + butang "BANYAK PILIHAN"

`comp.js = head.js + segs.js + body.js + tail.js`. B-roll iPhone HLG → tonemap mobius → `brf2/<klip>/` (grade Kamal).
SFX lembut `nicesfx.py` (15), muzik `music2.py`, tiada watermark.
