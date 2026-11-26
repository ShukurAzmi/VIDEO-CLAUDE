import soundfile as sf
from faster_whisper import WhisperModel
a,sr=sf.read('a16.wav',dtype='float32')
m=WhisperModel('large-v3',device='cpu',compute_type='int8',cpu_threads=4)
for s,e,p in [(6.8,10.0,'sebab kita nak keluarkan duit hasil titik peluh kita sendiri.'),(28.4,32.2,'Yang pertama, syarikat atau penjual ni'),(59.5,61.3,'tempat yang kita sendiri tak boleh semak.'),(79.0,82.4,'Untuk anda yang nak mula simpanan emas, boleh klik link di bawah.')]:
  seg,_=m.transcribe(a[int(s*16000):int(e*16000)],language='ms',beam_size=5,word_timestamps=True,initial_prompt='Public Gold, emas, simpanan emas. '+p)
  for x in seg: print(s,'|',x.text,[(w.word,round(w.start+s,2)) for w in x.words],flush=True)
