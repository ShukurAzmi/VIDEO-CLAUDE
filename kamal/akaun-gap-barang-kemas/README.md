# Kamal — "Akaun emas GAP kini boleh tebus barang kemas (PG Jewel)"
Sumber 48.06s → 40.95s (11 segmen, crossfade 4-frame). Ulangan "yang dah ada akaun emas GAP ini" dibuang: `CUTS='[[14.13,15.97]]'`.
Aliran: `tr.py` (+ `tr3.py` transkrip semula 10–21s dengan prompt PG Jewel) → `START=0.55 END=47.85 CUTS='[[14.13,15.97]]' python3 cut.py <work>` → `mapw.py`
(ekor→AKAUN, dinas→DINAR, PG2→PG JEWEL, pas→KHAS, apa tempat→APA TUAN?, teman-teman→TUAN-TUAN) → `voice.sh` (DeepFilterNet3 + denoise.py profil bunyi dari jeda) →
`MOOD='[[0,1]]' python3 music.py music.wav 41.0` → `python3 nicesfx.py` → `KEYSFX=1 python3 mix.py <work>` → `node render.js <work> pv 0.5 all 0 40.95` → `final.sh`.

FACE=[470,830]. Muka jelas 0–2.55s (Adila bercakap dulu), babak nob: 5.3–7.45, 15.4–19.75 (tunjuk app), 27.9–29.25 (tunjuk gelang), 34.2–36.5.
B-roll (img/, tak di-commit): goldbar.png, dinar.jpg, gelang1b.jpg, gelang2b.jpg, cincin.jpg, adila2.jpg, gap50.jpg (skrin app 720x1290, kod PG nampak, "*ilustrasi").
SFX lembut (nicesfx.py): shimmer 2.55, sparkle 3.4/3.95/12.4/20.3/32.05, pop2 4.31 …, bell 7.9 (PG Jewel), 26.37 (barang kemas), 39.4 (CTA). Tiada impact/stamp/tap.
Zoom 1.08x: 5.35, 16.0, 34.3.
