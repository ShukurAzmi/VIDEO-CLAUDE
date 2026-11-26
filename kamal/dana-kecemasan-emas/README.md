# Kamal — "Dana kecemasan dulu atau simpan emas?"
Sumber 90.0s → 76.75s (+1.2s CTA = 77.95s), 18 segmen, crossfade 4-frame.
Aliran: `tr.py` (+ `tr2.py` semak semula) → `CUTS='[[46.04,47.8],[61.29,62.71],[67.15,68.98]]' DET=src_df.wav OFF=35 MINP=0.15 MARG=0.09 START=1.2 END=87.15 python3 cut.py <work>`
→ `mapw.py` (dia dunia→DUA-DUA, dealer→DILA, ditamakan→DIUTAMAKAN, diri bayu→LINK DI BIO; "Okey" & "Terima kasih kerana menonton" = halusinasi Whisper, dibuang)
→ `voice.sh` → `clean2.py` → `TOT=78.0 voice2.sh` → `MOOD='[[0,0],[30.1,1]]' python3 music.py music.wav 78.1` → `nicesfx.py` → `KEYSFX=1 python3 mix.py` → `node render.js <work> pv 0.5 all 0 77.95` → `final.sh`.
FACE=[450,820]. Zoom 1.08x: 6.4, 22.05, 42.2, 68.0. Babak nob: 71.4–73.45 (save & share). 10 babak grafik besar + blur.

## v2 (maklum balas: 0:54 lambat/lagging, bunyi kipas)
- Potong jeda + nafas selepas "jangka masa panjang" sebelum "Jangan tunggu": CUTS `[61.2,63.2]` (ganti `[61.29,62.71]`) → 76.29s + 1.2s CTA = 77.5s. Babak/SFX dipeta dari masa v1 (`segs_v1.json`, `OLD(t)` dalam comp.js).
- Bunyi kipas: `dfpf.py` (DeepFilterNet3 + post-filter) → `clean3.py` (noisereduce 2 peringkat + expander maks −30 dB) → `TOT=77.5 voice3.sh` (lowpass 12k, compressor 2:1). Lantai bunyi voice.wav p10 −43 → −47 dB.
- Muzik −22 dB (dari −18) supaya suara lebih jelas.

## Thumbnail
`thumbD.html` + `node thumbD.js` → THUMB (frame sumber 1.6s, tangan terbuka, beauty.py run; "DANA KECEMASAN vs SIMPAN EMAS / MANA DULU? 🤔 / ATAU BOLEH DUA-DUA? / JANGAN TUNGGU KEWANGAN \"SEMPURNA\""). Muka tidak ditutup, semua teks dalam safe zone.
