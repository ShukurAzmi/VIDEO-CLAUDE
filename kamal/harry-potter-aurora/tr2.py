import soundfile as sf,json,sys
from faster_whisper import WhisperModel
a,sr=sf.read('a16.wav',dtype='float32')
m=WhisperModel('large-v3',device='cpu',compute_type='int8',cpu_threads=4)
P='So Tuan Puan, ni Harry Potter limited edition gold bar 0.5 gram dari Public Gold. Aurora.'
W=[]
for s0,e0 in json.loads(sys.argv[1]):
  seg,_=m.transcribe(a[int(s0*sr):int(e0*sr)],language='ms',word_timestamps=True,beam_size=5,initial_prompt=P,condition_on_previous_text=False,vad_filter=False)
  for s in seg:
    print(f"[{s.start+s0:.2f}-{s.end+s0:.2f}] {s.text}",flush=True)
    for w in s.words: W.append(dict(w=w.word.strip(),s=round(w.start+s0,2),e=round(w.end+s0,2)))
json.dump(W,open(sys.argv[2],'w'))
