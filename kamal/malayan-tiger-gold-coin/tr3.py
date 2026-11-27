import soundfile as sf,json
from faster_whisper import WhisperModel
a,_=sf.read('a16.wav',dtype='float32')
m=WhisperModel('large-v3',device='cpu',compute_type='int8',cpu_threads=4)
seg,_=m.transcribe(a,language='ms',word_timestamps=True,beam_size=5,condition_on_previous_text=False,vad_filter=True,vad_parameters=dict(min_silence_duration_ms=300),initial_prompt='Adila Gold, Public Gold, syiling emas Malayan Tiger 2026, sijil, auns, PG Jewel.')
W=[];T=[]
for s in seg:
  T.append(f"[{s.start:.2f}-{s.end:.2f}] {s.text}");print(T[-1],flush=True)
  for w in s.words: W.append(dict(w=w.word.strip(),s=round(w.start,2),e=round(w.end,2)))
json.dump(W,open('words.json','w'));open('tr.txt','w').write('\n'.join(T))
