import soundfile as sf,json
from faster_whisper import WhisperModel
a,sr=sf.read('a16.wav',dtype='float32')
m=WhisperModel('large-v3',device='cpu',compute_type='int8',cpu_threads=4)
seg,_=m.transcribe(a[int(10.0*16000):int(21.0*16000)],language='ms',beam_size=5,word_timestamps=True,initial_prompt='Public Gold, PG Jewel, akaun emas GAP, barang kemas 916 dan 999.')
for x in seg: print('|',x.text,[(w.word,round(w.start+10,2)) for w in x.words],flush=True)
