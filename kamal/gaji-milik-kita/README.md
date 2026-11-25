# Kamal — "Gaji kita: berapa % betul-betul milik kita?"
Sumber 99s → 90.25s selepas potong jeda (20 segmen, crossfade 4-frame).
Aliran: `tr.py` (whisper large-v3) → `START=0.55 END=97.0 python3 cut.py <work>` → `mapw.py` (peta masa + betulkan perkataan: Tumpen→tuan puan, sini→slip, mimpan→menyimpan, cuba-cuba→cukup-cukup, sebab baliknya→sebaliknya)
→ suara chain + loudnorm → `MOOD='[[0,0],[46.5,1]]' python3 music.py music.wav 90.3` → `KEYSFX=1 python3 mix.py <work>` → `node render.js <work> pv 0.5 all 0 90.25`.
`scenes.js` = babak sahaja (sudah digabung dalam `comp.js`).

SFX penting (9): impact 3.55 (milik kita?), fall 28.69 (milik orang lain), heart 41.45 (mak ayah), stamp 49.98 (HABIS ✓), buzzer 52.0 (pinjaman baru ✕), chime 57.08 (simpanan), cha-ching 66.41 (simpan RM300), chime 79.84 (kawal duit), tap 89.5 (link bio).
Zoom 1.08x: 29.2, 43.5, 62.45, 68.9.
