import soundfile as sf
from faster_whisper import WhisperModel
a,sr=sf.read('a16.wav',dtype='float32')
m=WhisperModel('large-v3',device='cpu',compute_type='int8',cpu_threads=4)
for s,e,p in [(0.5,6.4,'916 lebih popular, tapi 999 lebih rendah spread dia. Kenapa?'),(23.0,30.0,'emas 999 mengandungi kandungan emas tulin yang lebih tinggi untuk berat yang sama.'),(29.9,33.0,'tengok pula spread value dekat PG Jewel.'),(50.9,56.5,'Jadi tuan puan, kalau nak pakai sebagai perhiasan, 916 boleh jadi pilihan.'),(70.9,74.7,'Beli emas biarlah berilmu, bukan sekadar ikut orang.'),(74.6,82.2,'Untuk tuan puan yang berminat untuk memiliki emas perhiasan macam dekat tangan saya ini, boleh klik link di bio.')]:
  seg,_=m.transcribe(a[int(s*16000):int(e*16000)],language='ms',beam_size=5,word_timestamps=True,initial_prompt='Public Gold, PG Jewel, emas 916, emas 999, spread value, perhiasan, barang kemas. '+p)
  for x in seg: print(s,'|',x.text,[(w.word,round(w.start+s,2)) for w in x.words],flush=True)
