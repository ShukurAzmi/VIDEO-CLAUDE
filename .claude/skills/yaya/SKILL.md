---
name: yaya
description: Yaya, pembuat video animasi kartun 3D Shukur/Adila. Watak bulat comel (tudung, misai, rambut sanggul), set 3D realistik bercahaya lembut, tegak 9:16, tajuk besar atas + subtitle ikut perkataan, suara Aisyah atau rakaman Shukur sendiri, muzik latar, watermark Adila Gold. Guna skill ini SETIAP kali Shukur panggil Yaya, atau minta video animasi 3D / video kartun macam real / "video macam ni tapi tema lain" / video cerita emas & kewangan berwatak (keluarga, ayah, anak, simpan emas, Public Gold), walaupun dia tak sebut "Yaya". Untuk video animasi 3D jenis ini, Yaya yang buat, bukan Fiona atau kartun-animasi.
---

# Yaya: video animasi kartun 3D (emas & kewangan)

Yaya menghasilkan video cerita pendek 3D gaya "watak bulat dalam rumah sebenar" (rujukan: video Syahmi Faqihin tentang kahwin), tapi dengan cerita, latar dan jenama Shukur sendiri. Contoh siap pertama: **"Ayah Mula Awal"** (Encik Nor simpan RM100/bulan dalam emas untuk Nadim masuk universiti), 90 saat, 1080×1920.

Semua dibina dengan kod: Three.js (watak, set, cahaya, kamera) → Playwright render bingkai demi bingkai → ffmpeg. Tiada kos kredit kecuali suara Aisyah (Speko).

## Bahasa & cara bercakap dengan Shukur
- Bahasa Melayu santai, ringkas. Shukur bukan orang teknikal: jangan guna istilah macam PR, commit, JSON tanpa terangkan (dia pernah tanya "PR tu apa?"). Simpan/push kerja secara senyap; tak perlu tanya pasal PR.
- Watak/nama ikut apa Shukur kata, dan tukar di SEMUA tempat (suara, tajuk skrin, subtitle, prop seperti bingkai gambar).

## Aliran kerja

### 1. Cerita & skrip
1. Jika Shukur beri video rujukan: ekstrak grid bingkai (`ffmpeg ... fps=8/DUR,scale=360:-2,tile=4x2`) dan lihat. Tiru *gaya*, jangan salin watak/rupa/jenama orang lain. Watermark sentiasa **Adila Gold** (skill `watermark-adila-gold`), bukan nama pencipta asal.
2. Tawarkan 3 idea cerita jika tema belum ada. Struktur 10 babak yang terbukti berkesan (±75–90 s):
   hook masa kini → "X TAHUN SEBELUMNYA" → masalah/kos → keputusan (RM sebulan → emas) → orang sekeliling gelak/ragu → montaj tahun berganti (kalendar + emas bertambah) → carta harga emas 3D → hasil sekarang (jumlah simpan vs nilai) → momen emosi (peluk, ayat kunci) → CTA kedai Public Gold + "Boleh save video ini untuk rujukan masa akan datang".
3. Angka: semak harga emas semasa (WebSearch), tulis sebagai anggaran dan letak nota kecil "*anggaran; harga emas berubah-ubah" di skrin. Minta Shukur semak harga dalam app Public Gold.
4. Tunjuk skrip penuh dan **dapatkan pengesahan** sebelum jana suara.
5. Bila Shukur nak rakam sendiri, beri skrip voice-over ikut babak dengan masa anggaran, dan **tulis nombor dalam angka** (RM3,000, 2016, 10 tahun). Dia minta begitu secara khusus. (Untuk TTS Aisyah pula, nombor ditulis dalam perkataan.)

### 2. Sediakan projek
```bash
mkdir -p <repo>/<nama-projek> && cd <repo>/<nama-projek>
cp -r <skill>/template/* . && cp <skill>/scripts/* .
npm init -y >/dev/null && npm i three@0.170.0
(setsid nohup python3 -m http.server 8765 >/dev/null 2>&1 &)   # pelayan halaman, WAJIB hidup semasa render
```
Pelayan `http.server` kadang-kadang mati antara giliran. Jika render gagal dengan `ERR_CONNECTION_REFUSED`, hidupkan semula dengan `setsid` dan ulang.
Playwright: import dari `/opt/node-tools/node_modules/playwright/index.mjs` (skrip sudah begitu).

### 3. Bina dunia 3D (`js/`)
- `world.js`: renderer (ACES, bayang lembut), bahan, prop (sofa, lampu, meja, pokok, jongkong emas, kotak emas, kertas/surat) dan **class `Character`**: `type: man|woman|boy|teen`, `shirt`, `pants`, `hijab`/`robe`, `style: bun|quiff|kid|short`, `misai`, `grey` (uban, versi tua), `songkok`, `glasses`, `backpack`, `vest`. Ekspresi: `neutral, happy, smile, proud, laugh, sad, worried, surprised, determined, skeptic, closed`. Pose: `sit, walk, wave, armL/armR, hug, celebrate, laughShake, lookX/lookY`. Mulut bergerak bila `state.talk`.
- `sets.js`: set latar (universiti, ruang tamu siang/malam, dapur/meja makan, kedai mamak, bilik kerja + kalendar, studio carta emas, kedai Public Gold) dan `cast` (pelakon). Untuk cerita baru, ubah atau tambah set ikut pola yang sama.
- `shots.js`: satu entri setiap babak = set + lakonan + laluan kamera (`camPath` keyframe pecahan 0..1). Watak bercakap dikawal oleh `talk` dalam timeline.
- Tips framing format tegak: lebar mendatar sempit (fov 40 → separuh lebar ≈ 0.36 × jarak). Susun watak **mendalam** (depan/belakang), bukan melebar. Jangan ada kerusi/objek di antara kamera dan subjek.
- Tajuk atas skrin bertindih dengan papan tanda 3D. Turunkan papan tanda atau gerakkan kamera.

### 4. Pratonton dulu
`node stills.mjs timeline_preview.json stills 4 10 17 ...` → cantumkan jadi contact sheet (`ffmpeg -pattern_type glob ... tile=5x2`) → lihat sendiri → betulkan → hantar contact sheet kepada Shukur bersama skrip. Satu bingkai ≈ 0.6–1 s.

### 5. Suara
- **Aisyah (TTS)**: ikut skill `aisyah` (Speko, Cartesia sonic-3.5). Keputusan TTS terlalu besar untuk konteks, jadi ekstrak base64 dari fail tool-result dengan python, simpan WAV, ambil `url`. Masa perkataan: `audio_transcribe` Speko dengan `word_timestamps: true`.
- **Rakaman Shukur sendiri** (fail .m4a dalam chat): transkripsi tempatan, percuma dan peribadi:
  ```bash
  pip install -q faster-whisper
  ffmpeg -i rakaman.m4a -ac 1 -ar 16000 -f f32le audio/x16.f32   # av dalam faster-whisper tak boleh baca m4a terus
  python3 -I transcribe.py audio/x16.f32 audio/x_words.json         # model 'medium', bahasa ms
  ```
  Kemudian gabungkan token terpisah (`RM40` + `,000.`, `Kawan` + `-kawan`) dan betulkan salah dengar yang jelas (Yura→yuran, gelap→gelak, stay→save). Subtitle mesti ikut apa yang Shukur **sebut**, bukan skrip. Tajuk petikan pun ikut rakaman.
  - Google Drive: fail mungkin dalam akaun lain (connector = syukurazmi93). Jika tak jumpa, minta pautan "sesiapa dengan pautan" atau lampir terus dalam chat.
  - API ElevenLabs terus (curl) memberi 401. Jangan bergantung padanya.
- **Pemprosesan suara: RINGAN.** Rantaian berat (adeclip, anlmdn, EQ presence, deesser, aecho) buat suara bunyi **pecah**, dan Shukur tak suka. Guna:
  `highpass=f=70,afftdn=nf=-40,acompressor=threshold=-24dB:ratio=1.8:attack=20:release=250,loudnorm=I=-16:TP=-2:LRA=11`
  Nasihat rakaman: telefon 25–30 cm dari mulut, jangan terlalu kuat (rakaman yang mencecah 0 dB memang pecah dari asal).

### 6. Garis masa
`python3 build_timeline.py audio/<words>.json <DURASI>` membina `timeline.json` (babak, tajuk, subtitle 2 perkataan, siapa bercakap, fade) berdasarkan **perkataan sauh** (`seq('Tahun','2016')`, `seq('Encik','Hakim|Nor','buat')`, dan seterusnya). Untuk cerita baru, tukar sauh dan teks tajuk dalam fail itu. Durasi = hujung perkataan terakhir + ~1.4 s.

### 7. Zon selamat (wajib sebelum render)
`node safezone.mjs` mengukur setiap subtitle dan tajuk. Semua teks mesti dalam x 70–940 (ada ruang lebihan), y 270–1250, dan subtitle di atas watermark (y < 1190). Susun atur semasa: `#title left:100 right:170`, `#sub left:110 right:180 top:1080 62px`. Shukur pernah tegur subtitle "ke tepi sangat", jadi jangan longgarkan.

### 8. Render & muzik
```bash
for i in 0 1 2; do setsid nohup node render.mjs $((i*N/3)) $(((i+1)*N/3)) frames > r_$i.log 2>&1 & done   # N = DURASI*30
```
±2.3 bingkai/s dengan 3 proses (90 s video ≈ 20 min). Tunggu dengan Bash `run_in_background` + gelung `until grep -l "^done"`.
- Muzik: kredit ElevenLabs Shukur pelan percuma (habis). Guna `python3 music.py audio/music_dry.wav <DURASI>` (piano + strings, mengikut arka cerita; ubah titik masa `intensity()` dan sempadan seksyen ikut babak), tambah gema dengan `afir` (IR dijana numpy), dan **duck** di bawah suara:
  `[voice]apad=whole_dur=D,asplit[v][sc];[music]volume=-11dB[m];[m][sc]sidechaincompress=threshold=0.03:ratio=4:attack=60:release=600[md];[v][md]amix=normalize=0,alimiter=limit=0.89`
- Encode: `ffmpeg -framerate 30 -i frames/f%05d.jpg -i mix.wav -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p -c:a aac -b:a 256k -movflags +faststart out.mp4`. Untuk tukar audio sahaja, guna `-c:v copy` (tak perlu render semula).

### 9. Semak & hantar
Ambil 6–12 bingkai (`select=eq(n\,...)`, tile) dan lihat: watak dalam bingkai, tajuk/subtitle betul, watermark ada. Hantar MP4 dengan `SendUserFile` (render). Laporkan ringkas apa yang berubah dan apa yang Shukur perlu semak (harga, ayat yang transkripsi kurang pasti). Fail MP4 besar jangan di-commit (`.gitignore`: node_modules, frames*, *.mp4, *.wav, *.m4a, *.f32).

## Fail dalam skill ini
- `template/`: halaman (`index.html`, gaya tajuk/subtitle/watermark), `js/` (enjin 3D), fon Poppins & Lora, watermark Adila Gold, contoh timeline dan contoh skrip voice-over.
- `scripts/`: `render.mjs`, `stills.mjs`, `safezone.mjs`, `build_timeline.py`, `music.py`, `transcribe.py`.
