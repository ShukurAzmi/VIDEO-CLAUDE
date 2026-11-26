# Kamal — "Emas 916 vs 999: ketulinan & spread value"
Sumber 82.2s → 74.97s (+1.2s CTA ditahan = 76.2s), 20 segmen, crossfade 4-frame.
Aliran: `tr.py` (+ `tr4.py` transkrip semula bahagian meragukan) → `START=1.2 END=81.85 python3 cut.py <work>` → `mapw.py`
(91.6%/99.9%/9% digabung, pinjol→PG JEWEL, perempuan→TUAN PUAN, pihak asas→PERHIASAN, beribu→BERILMU, menang→NAK, tanah→TANGAN, segini baiklah→KLIK LINK DI BAWAH)
→ `voice.sh` → `MOOD='[[0,1]]' python3 music.py music.wav 76.3` → `nicesfx.py` → `KEYSFX=1 python3 mix.py` → `node render.js <work> pv 0.5 all 0 76.2` → `final.sh`.
FACE=[465,740]. Muka jelas 0–2.35s; babak nob: 29.95–32.1, 69.05–73.78 (tunjuk rantai). Zoom 1.08x: 4.85, 39.75, 58.6, 69.1.
B-roll (img/, tak di-commit): rantais.jpg (rantai depan logo PG), pakais.jpg (pakai cincin & gelang), cincin3s.jpg (cincin di tapak tangan).

## v5 (maklum balas: suara lebih jelas, percakapan lebih lancar)
- Suara: `clean2.py` (noisereduce kedua, profil dari bahagian paling senyap + expander lembut di jeda, maks −18 dB) → `voice2.sh` (EQ jelas: −3 @250, +3 @3k; compressor 2.5:1). Lantai bunyi jeda −57 → −73 dB, suara p90 tak berubah. Muzik −18 dB.
- Potong lebih ketat: `DET=src_df.wav OFF=35 MINP=0.15 MARG=0.09 START=1.2 END=81.85 python3 cut.py` (kesan jeda pada audio selepas DeepFilterNet) → 72.94s + 1.25s CTA = 74.2s.
- Babak kekal dalam masa v1 (`segs_v1.json`); `comp.js` tukar masa baru → sumber → v1 (`OLD(t)`); SFX dipeta semula.

## Thumbnail (dipilih: A)
`thumbA.html` + `node thumbA.js` → THUMB_A (gambar img/pakai.jpg, "EMAS 916 vs 999 / MANA PILIHAN ANDA? 🤔 / KETULINAN & SPREAD"). Muka tidak ditutup teks.
