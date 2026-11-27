# Muzik latar v2: TIADA bass/dengung (punca bunyi "kipas"). Petikan kotak muzik + pad tinggi lembut, highpass 350 Hz.
import numpy as np,soundfile as sf,sys
SR=48000;DUR=float(sys.argv[2]);N=int(SR*DUR);t=np.arange(N)/SR
BPM=92;beat=60/BPM;bar=4*beat
note=lambda m:440*2**((m-69)/12)
prog=[[72,76,79,83],[67,71,74,79],[69,72,76,81],[65,69,72,77]]  # C G Am F (oktaf tinggi)
y=np.zeros(N)
step=beat/2
for j in range(int(DUR/step)):
  s=int(j*step*SR);ch=prog[int(j*step/bar)%4];m=ch[[0,2,1,3,2,1,3,2][j%8]]
  L=min(N-s,int(SR*0.9));tt=np.arange(L)/SR;f=note(m);v=.12 if j%2==0 else .08
  y[s:s+L]+=(np.sin(2*np.pi*f*tt)+.25*np.sin(4*np.pi*f*tt))*np.exp(-tt*5)*np.minimum(1,tt/.004)*v
for i in range(int(DUR/bar)+1):  # pad lembut oktaf tinggi
  s=int(i*bar*SR);e=min(N,int((i+1)*bar*SR)+SR//3)
  if s>=N:break
  tt=np.arange(e-s)/SR;en=np.minimum(1,tt/.8)*np.minimum(1,(e-s-np.arange(e-s))/SR/.5)
  for m in prog[i%4][:3]: y[s:e]+=en*np.sin(2*np.pi*note(m)*tt)*.025
# highpass 350 Hz (FFT)
Y=np.fft.rfft(y);fr=np.fft.rfftfreq(N,1/SR);Y[fr<350]=0;Y[(fr>=350)&(fr<500)]*=((fr[(fr>=350)&(fr<500)]-350)/150);y=np.fft.irfft(Y,N)
fade=np.minimum(1,t/1.0)*np.minimum(1,(DUR-t)/2.0);y=y*fade;y=y/np.max(np.abs(y))*0.7
d=int(SR*.02);r=np.concatenate([np.zeros(d),y[:-d]])
sf.write(sys.argv[1],np.stack([y*.8+r*.2,r*.8+y*.2],1).astype(np.float32),SR);print('music2 ok')
