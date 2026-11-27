import soundfile as sf,json
from faster_whisper import WhisperModel
a,_=sf.read('a16.wav',dtype='float32')
m=WhisperModel('large-v3',device='cpu',compute_type='int8',cpu_threads=4)
P='Adila Gold, PG Jewel, Public Gold, akaun emas GAP, barang kemas 916, 999.'
for s,e in [(5.3,13.0),(12.6,21.2),(20.9,25.6),(24.3,29.4),(29.0,33.2),(33,39.5)]:
  seg,_=m.transcribe(a[int(s*16000):int(e*16000)],language='ms',beam_size=5,initial_prompt=P,word_timestamps=True,no_speech_threshold=None,log_prob_threshold=None,condition_on_previous_text=False)
  for x in seg:
    print(s,e,x.text,[(w.word.strip(),round(float(w.start)+s,2),round(float(w.end)+s,2)) for w in x.words],flush=True)
