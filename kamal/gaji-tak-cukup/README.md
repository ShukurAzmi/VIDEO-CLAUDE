# Kamal — "Gaji pun tak cukup, macam mana nak simpan emas?"
Sumber 99.3s → 92.98s selepas potong jeda (14 segmen, crossfade 4-frame). Hujung "Terima kasih kerana menonton" (halusinasi Whisper, tiada suara) dibuang: END=97.05.
Aliran: `tr.py` → `START=0.0 END=97.05 python3 cut.py <work>` → `mapw.py` (betulkan kapsyen: skrip→SLIP, penyimpanan→PENYIMPAN, "lebih yang seratus"→RM100, "Bila tuan-tuan dekat ekor emas gap"→TOP UP DEKAT AKAUN EMAS GAP, public go→PUBLIC GOLD, pasan→PAKSAAN)
→ suara chain + loudnorm → `MOOD='[[0,0],[48.1,1]]' python3 music.py music.wav 93.0` → `KEYSFX=1 python3 mix.py <work>` → `node render.js <work> pv 0.5 all 0 92.98`.
FACE=[480,740]. Babak muka jelas 65.6–69.0 (Adila tunjuk app GAP) = label kecil sahaja, tiada blur (`nob:1`).

SFX penting (9): impact 2.53 (emas?), fall 29.13 (tinggal sikit), buzzer 47.56 (hutang selesai ✕), stamp 52.24 (konsisten), chime 56.57 (gram terkumpul), cha-ching 62.51 (RM100), buzzer 75.0 (berhutang ✕), chime 81.28 (kemampuan ✓), tap 91.94 (klik link).
Zoom 1.08x: 36.77, 57.37, 69.05, 83.72.
