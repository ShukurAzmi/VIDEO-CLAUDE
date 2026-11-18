import json,wave,numpy as np,sherpa_onnx
M="m/sherpa-onnx-whisper-medium/"
r=sherpa_onnx.OfflineRecognizer.from_whisper(encoder=M+"medium-encoder.int8.onnx",decoder=M+"medium-decoder.int8.onnx",tokens=M+"medium-tokens.txt",language="ms",task="transcribe",num_threads=4)
w=wave.open("v1.wav");x=np.frombuffer(w.readframes(w.getnframes()),dtype=np.int16).astype(np.float32)/32768
marks=[0,21.8,22.87,28.49,38.0,40.9,44.99,46.0,56.96,57.71,62.09,69.2,75.55]
# merge tiny segments into chunks <=28s
chunks=[];s=marks[0]
for i in range(1,len(marks)):
    if marks[i]-s>14 or i==len(marks)-1:
        chunks.append((s,marks[i]));s=marks[i]
if chunks[-1][0]!=s: pass
print(chunks)
out=[]
for a,b in chunks:
    st=r.create_stream();st.accept_waveform(16000,x[int(a*16000):int(b*16000)]);r.decode_stream(st)
    out.append({"s":a,"e":b,"t":st.result.text.strip()});print(f"{a:.1f}-{b:.1f}: {out[-1]['t']}")
json.dump(out,open("tr2.json","w"),ensure_ascii=False)
