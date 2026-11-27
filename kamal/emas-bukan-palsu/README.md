# Kamal — "Macam mana nak tahu emas bukan palsu? 3 soalan wajib tanya"
Sumber 85.2s → potong 0.08–82.45 → 75.13s (24 segmen, crossfade 4-frame) + 1.2s CTA ditahan = 76.35s.
Aliran: `tr.py` (+ `tr5.py` semak bahagian meragukan) → `DET=src_df.wav OFF=35 MINP=0.15 MARG=0.09 START=0.0 END=82.45 python3 cut.py <work>`
→ `mapw.py` (simak→SEMAK, tau→TAHU, "mula ke"→MULAKAN) → `voice.sh` (DeepFilterNet3 + denoise.py) → `clean2.py` → `TOT=76.35 voice2.sh`
→ `MOOD='[[0,0],[51.2,1]]' python3 music.py music.wav 76.4` → `nicesfx.py` → `KEYSFX=1 python3 mix.py` → `node render.js <work> pv 0.5 all 0 76.35` → `final.sh`.
FACE=[360,860]. Muka jelas 0–2.3s. Zoom 1.08x: 5.0, 20.5, 45.5, 66.0 (senyap). 14 babak grafik besar + video blur.
B-roll (img/, tak di-commit): foto Unsplash — bar.jpg (jongkong), online.jpg (beli online telefon), parcel.jpg (bungkusan), kedai.jpg (kedai emas), kemas.jpg (barang kemas).
Lantai bunyi: suara p90 vs lantai p10 = 37 dB (asal) → 50 dB.

## v2 (maklum balas: bunyi "kipas", percakapan masih lambat)
- Punca bunyi kipas = muzik sintetik lama (pad 55–110 Hz + pulse 55 Hz = dengung berterusan). Ganti `music2.py`: kotak muzik oktaf tinggi + pad lembut, highpass 350 Hz. Bass 20–300 Hz dalam mix turun ~17 dB.
- Suara: `clean3.py` (NR stationary kuat, profil 15% paling senyap + expander maks −35 dB). Lantai −77 → −87 dB, p90 suara tak berubah. Pas NR tak-stationary dibuang (makan suara 2 dB).
- Potong lebih ketat: `DET=src_df.wav OFF=34 MINP=0.11 MARG=0.06 START=0.0 END=82.45 python3 cut.py` (72.9s) + tempo 1.07x (`atempo`, `setpts=PTS/1.07`) → 68.2s + 1.2s CTA = 69.37s.
- Babak kekal dalam masa v1 (`segs_v1.json`); `comp.js` `OLD(t)` = masa baru ×1.07 → sumber → v1. SFX dipeta semula; kapsyen = mapw ÷ 1.07.

## v3 (maklum balas: cakap terlalu laju — mahu santai)
- Tempo 1.07x dibuang (kelajuan asal). Potongan lebih longgar: `DET=src_df.wav OFF=34 MINP=0.25 MARG=0.13 START=0.0 END=82.45 python3 cut.py` → jeda >0.25s dipendekkan ke ~0.13s, jeda pendek semula jadi kekal. 77.35s + 1.2s CTA = 78.55 s.
- Suara (clean3) & music2 tanpa dengung kekal. `comp.js` KSP=1.0; SFX dipeta dari masa v1.

## Thumbnail TikTok (1080×1920)
`thumbP.html` + `node thumbP.js` → THUMB_A (frame @21s base_raw, senyum) / THUMB_B (frame @1.2s). Latar = frame video + grade; teks "MACAM MANA NAK TAHU / EMAS / BUKAN PALSU? / 3 SOALAN WAJIB TANYA / SEBELUM BELI EMAS" dalam zon grid 3:4 tengah, muka tidak ditutup; foto jongkong + 🔍 di sisi kanan.
