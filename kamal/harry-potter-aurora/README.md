# Kamal — "Edisi Harry Potter Aurora 0.5G (box khas PG Jewel)"
Sumber: video utama 71.9s (464×832) + sambungan 5.75s (iPhone HLG 1080×1920, tonemap mobius) → src.mov 77.67s.
Potong: `DET=src_df.wav OFF=35 MINP=0.15 MARG=0.09 START=3.2 END=77.6 CUTS='[[11.9,12.68],[67.95,72.1]]' python3 cut.py <work>` → 25 segmen, 61.56s
(buang "Tuan Puan" berulang; klip sambungan bermula 55.97s output, tiada suara → B-roll penutup).
Transkrip: Whisper large-v3 terlepas 0–30s (halusinasi "Terima kasih") → `tr2.py` tetingkap 7s dengan initial_prompt; `mapw2.py` (aircon market→E-COMMERCE, PJ→PG).
Suara: voice.sh (DeepFilterNet3 + denoise.py) → clean2.py → voice2.sh. Muzik MOOD=[[0,1]]. SFX lembut (nicesfx) KEYSFX.
B-roll: img/p1s.jpg, img/p2s.jpg (gambar Adila di PG Jewel, tak di-commit). FACE=[600,600]; zoom 0.9 & 48.95.
