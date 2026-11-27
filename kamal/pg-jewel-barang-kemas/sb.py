import json
S=json.load(open('segs.json'))
def fs(x):
  b=None
  for (s,e),o in zip(S['segs'],S['off']):
    if x<s: return o if b is None else b
    if x<=e: return o+x-s
    b=o+e-s
  return b
P=[(3.8,'HEADLINE','"Selama ni kita kenal Public Gold…"','Muka jelas 2.5s dulu, tajuk kaca kecil di atas'),
(5.95,'PAPER CUT','"…beli gold bar dan emas saja"','Kertas koyak: jongkong + dinar + "SAJA?"'),
(9.7,'BEFORE / AFTER','"…sekarang boleh keluarkan barang kemas"','Gelongsor DULU (gold bar & dinar) → SEKARANG (gelang)'),
(11.55,'FREEZE + SPOTLIGHT','Adila tunjuk rantai','Video beku 0.85s + kilat kamera, sorotan pada rantai, label'),
(12.8,'GLASS TAG','"…melalui PG Jewel, Public Gold"','Tag kaca "PG JEWEL by Public Gold" terapung'),
(16.0,'SPATIAL GLASS','"…satu lagi pilihan"','3 panel kaca 3D: Gold Bar · Dinar · Barang Kemas (BARU)'),
(21.3,'CHECKLIST + CHECK GROW','"…kumpul gold bar dan emas"','✓ dilukis & membesar satu-satu'),
(22.6,'PHONE MOCKUP','"…sekarang ni kita dah ada pilihan"','Rakaman kedai (IMG_5630) dalam telefon'),
(24.2,'SCREEN DIVE','"…pilihan dengan ketulenan"','Kamera "terjun" ke dalam skrin → B-roll penuh'),
(26.6,'STICKER TAG','"…916 dan juga 999"','Pelekat 916 / 999 ditampal pada barang kemas'),
(28.6,'DIGITAL ZOOM + PROMPT BOX','"Kenapa ini menarik untuk saya?"','Zoom 1.08x + kotak "AI prompt" menaip soalan'),
(33.4,'TAG WALL','"…setiap orang ada tujuan berbeza"','Dinding tag tujuan (*contoh)'),
(37.6,'WRAP FOCUS','"…gold bar untuk simpanan jangka panjang"','Teks berpusing 3D mengelilingi jongkong'),
(43.6,'FRAME BREAK','"Ada pula yang suka barang kemas"','Foto Adila (IMG_5669) keluar dari bingkai'),
(44.6,'SKIN TEXT','"…sebab dia boleh pakai"','Tulisan "PAKAI ✓" seolah atas kulit tangan'),
(47.3,'FINGER TEXT','"…rasa benda tu cantik"','Teks "CANTIK ✨" keluar dari jari'),
(51.5,'SWAP','"PG Jewel… pilihan tambahan"','Kad bertukar: Gold Bar → Dinar → PG Jewel → Barang Kemas'),
(58.6,'DIGITAL ZOOM + SKIN TAG','"Tapi satu perkara saya nak pesan"','Zoom + tag harga 916 tergantung pada gelang'),
(62.9,'MARKER','"…jangan hanya tengok cantik"','Bulatan marker + "CANTIK JE? ✕" + "FAHAMI DULU!"'),
(67.8,'CHECKLIST + CHECK GROW','"Ketulenan, harga belian, spread…"','3 semakan ✓ + ✓ besar emas membesar'),
(72.9,'GREEN SCREEN','"…gold bar ke, dinar ke, barang kemas"','Latar diganti rakaman kedai (IMG_5729) + ikon kaca'),
(76.9,'HEADLINE (kinetik)','"Beli emas dengan berilmu, bukan emosi"','Tajuk besar + "BUKAN EMOSI" dicoret marker'),
(82.85,'CTA (GLASS)','"…klik link di bawah"','Foto PG Jewel (IMG_5644) + butang emas + jari tap')]
for i,p in enumerate(P): print(f'{fs(p[0]):.2f}')
json.dump([dict(t=round(fs(p[0]),2),fx=p[1],line=p[2],note=p[3]) for p in P],open('sb.json','w'),ensure_ascii=False)
