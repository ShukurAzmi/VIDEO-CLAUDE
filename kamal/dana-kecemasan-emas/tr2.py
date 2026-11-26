import soundfile as sf,sys
from faster_whisper import WhisperModel
a,sr=sf.read('a16.wav',dtype='float32')
m=WhisperModel('large-v3',device='cpu',compute_type='int8',cpu_threads=4)
for s,e,p in [(4.0,7.9,'boleh je nak mulakan dua-dua dalam bulan yang sama?'),(7.5,11.0,'Bagi Dila, dana kecemasan memang perlu diutamakan'),(83.6,87.2,'Jika anda nak mulakan simpanan, boleh klik link di bio.'),(40.4,47.6,'mula dengan apa yang kita mampu sahaja.'),(60.0,69.2,'Jangan tunggu kewangan kita sempurna baru kita nak mula menyimpan.')]:
  seg,_=m.transcribe(a[int(s*sr):int(e*sr)],language='ms',word_timestamps=True,initial_prompt=p)
  print(s,[(w.word,round(w.start+s,2),round(w.end+s,2)) for x in seg for w in x.words],flush=True)
