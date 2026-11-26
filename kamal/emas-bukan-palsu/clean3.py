# v2 (bunyi kipas): df_nr -> NR stationary kuat (profil dari 15% paling senyap) -> NR tak-stationary lembut -> expander dalam (maks -35 dB di jeda) -> clean3.wav
import soundfile as sf,numpy as np,noisereduce as nr
a,sr=sf.read('df_nr.wav');h=int(sr*.01)
env=lambda x:20*np.log10(np.array([np.sqrt(np.mean(x[i:i+h]**2)) for i in range(0,len(x)-h+1,h)])+1e-9)
d=env(a);q=np.where(d<np.percentile(d,15))[0]
nz=np.concatenate([a[i*h:(i+1)*h] for i in q])
y=nr.reduce_noise(y=a,sr=sr,y_noise=nz,stationary=True,prop_decrease=1.0,n_std_thresh_stationary=1.3,freq_mask_smooth_hz=150,time_mask_smooth_ms=25)
# (pas tak-stationary dibuang: makan suara)
d=env(y);thr=np.percentile(d,90)-26
g=np.clip((d-thr)*2.0,-35,0)
sm=np.zeros_like(g);c=0
for i,v in enumerate(g):
  k=0.7 if v>c else 0.06
  c=c+(v-c)*k;sm[i]=c
gl=np.repeat(10**(sm/20),h);gl=np.pad(gl,(0,len(y)-len(gl)),'edge');y=y*gl
sf.write('clean3.wav',y.astype(np.float32),sr)
for n,x in [('df_nr',a),('clean3',y)]:
  e=env(x);print(n,'p10',round(np.percentile(e,10)),'p50',round(np.percentile(e,50)),'p90',round(np.percentile(e,90)))
