import soundfile as sf, json
from faster_whisper import WhisperModel
a,sr=sf.read('a16.wav',dtype='float32')
m=WhisperModel('large-v3',device='cpu',compute_type='int8',cpu_threads=4)
segs,_=m.transcribe(a,language='ms',word_timestamps=True,beam_size=5,initial_prompt='Adila Gold, Public Gold, emas, simpanan, GAP, gram, tuan-tuan.')
out=[]
for s in segs:
    out.append({'s':s.start,'e':s.end,'t':s.text,'w':[{'w':w.word,'s':w.start,'e':w.end} for w in s.words]})
    print(f"{s.start:6.2f}-{s.end:6.2f} {s.text}",flush=True)
json.dump(out,open('tr.json','w'),ensure_ascii=False)
