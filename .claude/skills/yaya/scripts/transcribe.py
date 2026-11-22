import json,sys
from faster_whisper import WhisperModel
m=WhisperModel('medium',device='cpu',compute_type='int8',cpu_threads=4)
import numpy as np
segs,info=m.transcribe(np.fromfile(sys.argv[1],dtype=np.float32),language='ms',word_timestamps=True,vad_filter=False,beam_size=5,
  initial_prompt='Hari ni, Nadim daftar masuk universiti. Encik Nor. Baba. segram. emas.')
out=[]
for s in segs:
    print(f"{s.start:6.2f}-{s.end:6.2f} {s.text}",flush=True)
    for w in s.words: out.append({'text':w.word.strip(),'start':round(w.start,2),'end':round(w.end,2)})
json.dump(out,open(sys.argv[2],'w'),ensure_ascii=False)
