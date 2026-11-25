# Muzik latar sintetik: tegang (hook, "jangan tunggu") -> hopeful (babak emas/matlamat)
import numpy as np,soundfile as sf,sys
SR=48000;DUR=float(sys.argv[2]);N=int(SR*DUR);t=np.arange(N)/SR
BPM=96;beat=60/BPM;bar=4*beat
def note(m):return 440*2**((m-69)/12)
# mood per masa (0=tegang,1=hopeful), bersilang 1.5s
K=[(0,0),(14.5,1),(35.5,0),(51.8,1)]
mood=np.zeros(N)
for (a,v),(b,_) in zip(K,K[1:]+[(DUR,0)]):
  mood[(t>=a)&(t<b)]=v
k=np.ones(int(SR*1.5))/int(SR*1.5);mood=np.convolve(mood,k,'same')
tense=[[45,52,57,60],[45,52,57,60],[41,48,53,57],[44,52,56,59]]   # Am Am F E
hope=[[48,55,60,64],[43,50,55,59],[45,52,57,60],[41,48,53,57]]    # C G Am F
def pad(prog):
  y=np.zeros(N)
  for i in range(int(DUR/bar)+1):
    s=int(i*bar*SR);e=min(N,int((i+1)*bar*SR)+SR//4)
    if s>=N:break
    tt=np.arange(e-s)/SR;en=np.minimum(1,tt/0.4)*np.minimum(1,(e-s-np.arange(e-s))/SR/0.3)
    for m in prog[i%4]:
      f=note(m);y[s:e]+=en*(np.sin(2*np.pi*f*tt)+0.3*np.sin(2*np.pi*f*1.003*tt)+0.15*np.sin(4*np.pi*f*tt))*0.12
  return y
def arp(prog,vel):
  y=np.zeros(N);step=beat/2
  for j in range(int(DUR/step)):
    s=int(j*step*SR);ch=prog[int(j*step/bar)%4];m=ch[[0,1,2,3,2,1,2,3][j%8]]+12
    L=min(N-s,int(SR*0.5));tt=np.arange(L)/SR;f=note(m)
    y[s:s+L]+=np.sin(2*np.pi*f*tt)*np.exp(-tt*7)*vel
  return y
def pulse():
  y=np.zeros(N)
  for j in range(int(DUR/(beat/2))):
    s=int(j*beat/2*SR);L=min(N-s,int(SR*0.2));tt=np.arange(L)/SR
    y[s:s+L]+=np.sin(2*np.pi*55*tt)*np.exp(-tt*18)*(1 if j%2==0 else .5)
  return y
def kick():
  y=np.zeros(N)
  for j in range(int(DUR/beat)):
    s=int(j*beat*SR);L=min(N-s,int(SR*0.3));tt=np.arange(L)/SR
    y[s:s+L]+=np.sin(2*np.pi*(45+80*np.exp(-tt*30))*tt)*np.exp(-tt*10)*(0.8 if j%2==0 else 0.35)
  return y
T=pad(tense)+0.5*pulse(); H=pad(hope)*0.9+arp(hope,0.10)+0.35*kick()
y=T*(1-mood)+H*mood
fade=np.minimum(1,t/1.0)*np.minimum(1,(DUR-t)/2.0)
y=np.tanh(y*1.2)*fade;y=y/np.max(np.abs(y))*0.8
d=int(SR*0.015);r=np.concatenate([np.zeros(d),y[:-d]])
sf.write(sys.argv[1],np.stack([y*0.8+r*0.2,r*0.8+y*0.2],1).astype(np.float32),SR)
