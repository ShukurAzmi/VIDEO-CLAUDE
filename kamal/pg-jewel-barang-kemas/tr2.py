import soundfile as sf
from faster_whisper import WhisperModel
a,sr=sf.read('a16.wav',dtype='float32')
m=WhisperModel('large-v3',device='cpu',compute_type='int8',cpu_threads=4)
for s,e,p in [(21.3,27.0,'tapi sekarang ni kita dah ada pilihan dengan barang kemas 916 dan juga 999.'),(63.8,68.3,'Ketulinan dan harga belian dan spread sebelum membuat satu keputusan.'),(10.4,13.4,'Sebenarnya melalui PG Jewel Public Gold')]:
  seg,_=m.transcribe(a[int(s*16000):int(e*16000)],language='ms',beam_size=5,initial_prompt=p,word_timestamps=True)
  for x in seg: print(s,' '.join(f"{w.word.strip()}@{round(w.start+s,2)}" for w in x.words),flush=True)
