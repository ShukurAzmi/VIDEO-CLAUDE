import numpy as np,subprocess,json
raw=subprocess.run(["ffmpeg","-v","error","-i","src.mp4","-f","f32le","-ac","1","-ar","16000","-"],capture_output=True).stdout
a=np.frombuffer(raw,np.float32); hop=160
rms=np.sqrt(np.convolve(a**2,np.ones(hop)/hop,'same')[::hop]+1e-12); db=20*np.log10(rms)
th=np.percentile(db,95)-32; q=db<th
P=[];i=0
while i<len(q):
    if q[i]:
        j=i
        while j<len(q) and q[j]: j+=1
        if (j-i)*0.01>=0.14: P.append((round(i*0.01,3),round(j*0.01,3)))
        i=j
    else: i+=1
json.dump(P,open('pauses.json','w')); print(round(th,1),len(P)); print(P)
