# v5 suara lebih bersih: df_nr.wav -> noisereduce kedua (profil dari bahagian senyap df_nr) -> expander lembut (jeda antara perkataan) -> clean2.wav
import soundfile as sf,numpy as np,noisereduce as nr
a,sr=sf.read('df_nr.wav');h=int(sr*.01)
env=lambda x:20*np.log10(np.array([np.sqrt(np.mean(x[i:i+h]**2)) for i in range(0,len(x)-h+1,h)])+1e-9)
d=env(a);q=np.where(d<np.percentile(d,15))[0]
nz=np.concatenate([a[i*h:(i+1)*h] for i in q]);print('profil',round(len(nz)/sr,1),'s')
y=nr.reduce_noise(y=a,sr=sr,y_noise=nz,stationary=True,prop_decrease=1.0,n_std_thresh_stationary=1.5,freq_mask_smooth_hz=200,time_mask_smooth_ms=30)
# expander: bawah ambang -> turun sehingga 18dB; attack 5ms, release 120ms (suara tak disentuh)
d=env(y);thr=np.percentile(d,90)-30
g=np.clip((d-thr)*1.5,-18,0)            # ratio ~2.5:1 di bawah ambang, maks -18dB
sm=np.zeros_like(g);c=0
for i,v in enumerate(g):
  k=0.6 if v>c else 0.08                 # cepat buka, perlahan tutup
  c=c+(v-c)*k;sm[i]=c
gl=np.repeat(10**(sm/20),h);gl=np.pad(gl,(0,len(y)-len(gl)),'edge')
y=y*gl
sf.write('clean2.wav',y.astype(np.float32),sr)
for n,x in [('df_nr',a),('clean2',y)]:
  e=env(x);print(n,'p10',round(np.percentile(e,10)),'p50',round(np.percentile(e,50)),'p90',round(np.percentile(e,90)))
