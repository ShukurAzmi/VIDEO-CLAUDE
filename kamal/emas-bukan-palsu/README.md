# Kamal — "Macam mana nak tahu emas bukan palsu? 3 soalan wajib tanya"
Sumber 85.2s → potong 0.08–82.45 → 75.13s (24 segmen, crossfade 4-frame) + 1.2s CTA ditahan = 76.35s.
Aliran: `tr.py` (+ `tr5.py` semak bahagian meragukan) → `DET=src_df.wav OFF=35 MINP=0.15 MARG=0.09 START=0.0 END=82.45 python3 cut.py <work>`
→ `mapw.py` (simak→SEMAK, tau→TAHU, "mula ke"→MULAKAN) → `voice.sh` (DeepFilterNet3 + denoise.py) → `clean2.py` → `TOT=76.35 voice2.sh`
→ `MOOD='[[0,0],[51.2,1]]' python3 music.py music.wav 76.4` → `nicesfx.py` → `KEYSFX=1 python3 mix.py` → `node render.js <work> pv 0.5 all 0 76.35` → `final.sh`.
FACE=[360,860]. Muka jelas 0–2.3s. Zoom 1.08x: 5.0, 20.5, 45.5, 66.0 (senyap). 14 babak grafik besar + video blur.
B-roll (img/, tak di-commit): foto Unsplash — bar.jpg (jongkong), online.jpg (beli online telefon), parcel.jpg (bungkusan), kedai.jpg (kedai emas), kemas.jpg (barang kemas).
Lantai bunyi: suara p90 vs lantai p10 = 37 dB (asal) → 50 dB.
