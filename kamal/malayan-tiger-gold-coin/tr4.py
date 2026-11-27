import soundfile as sf,sys
from faster_whisper import WhisperModel
a,_=sf.read('a16.wav',dtype='float32')
m=WhisperModel('large-v3',device='cpu',compute_type='int8',cpu_threads=4)
for s,e,p in [(15.4,19.5,'Ni setengah auns, ketulenan 999.9. Nampak tak?'),(36.5,42.83,'So tuan-tuan yang mana ada bajet sekitar ni, boleh dapatkan di PG Jewel.')]:
  seg,_=m.transcribe(a[int(s*16000):int(e*16000)],language='ms',beam_size=5,initial_prompt=p,word_timestamps=True)
  for x in seg: print(s,[(w.word,round(w.start+s,2)) for w in x.words])
