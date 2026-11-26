# v2 suara bersih (buang bunyi kipas): df_pf.wav (DeepFilterNet3 + post-filter)
# -> noisereduce stationary 2 peringkat (profil dari frame paling senyap) -> expander lebih dalam (maks -30dB) -> clean3.wav
import soundfile as sf,numpy as np,noisereduce as nr
a,sr=sf.read('df_pf.wav');h=int(sr*.01)
env=lambda x:20*np.log10(np.array([np.sqrt(np.mean(x[i:i+h]**2)) for i in range(0,len(x)-h+1,h)])+1e-9)
def prof(x):
  d=env(x);q=np.where(d<np.percentile(d,20))[0];return np.concatenate([x[i*h:(i+1)*h] for i in q])
y=nr.reduce_noise(y=a,sr=sr,y_noise=prof(a),stationary=True,prop_decrease=1.0,n_std_thresh_stationary=1.3,freq_mask_smooth_hz=150,time_mask_smooth_ms=40)
y=nr.reduce_noise(y=y,sr=sr,y_noise=prof(y),stationary=True,prop_decrease=0.85,n_std_thresh_stationary=1.5,freq_mask_smooth_hz=150,time_mask_smooth_ms=40)
d=env(y);thr=np.percentile(d,90)-24
g=np.clip((d-thr)*2.0,-30,0)
sm=np.zeros_like(g);c=0
for i,v in enumerate(g):
  k=0.6 if v>c else 0.06; c=c+(v-c)*k; sm[i]=c
gl=np.repeat(10**(sm/20),h);gl=np.pad(gl,(0,len(y)-len(gl)),'edge');y=y*gl
sf.write('clean3.wav',y.astype(np.float32),sr)
for n,x in [('raw',sf.read('raw48.wav')[0]),('df_pf',a),('clean3',y)]:
  e=env(x);print(n,'p10',round(np.percentile(e,10)),'p25',round(np.percentile(e,25)),'p50',round(np.percentile(e,50)),'p90',round(np.percentile(e,90)))
