# Buang bunyi latar (orang bercakap): noisereduce stationary dengan profil bunyi dari jeda yang DIPOTONG.
# Input: src_df.wav (src48.wav selepas DeepFilterNet), df_full.wav (base_raw selepas DF), segs.json  -> df_nr.wav
import soundfile as sf,numpy as np,json,noisereduce as nr,sys,os
os.chdir(sys.argv[1] if len(sys.argv)>1 else '.')
S=json.load(open('segs.json'))['segs']
a,sr=sf.read('src_df.wav')
gaps=[(S[i][1]+.05,S[i+1][0]-.05) for i in range(len(S)-1) if S[i+1][0]-S[i][1]>.3]+[(0.1,max(0.2,S[0][0]-.1))]
nz=np.concatenate([a[int(s*sr):int(e*sr)] for s,e in gaps]);print('profil bunyi',round(len(nz)/sr,2),'s')
b,_=sf.read('df_full.wav')
y=nr.reduce_noise(y=b,sr=sr,y_noise=nz,stationary=True,prop_decrease=0.9,n_std_thresh_stationary=1.2,freq_mask_smooth_hz=300,time_mask_smooth_ms=40)
sf.write('df_nr.wav',y.astype(np.float32),sr)
for f,x in [('sebelum',b),('selepas',y)]:
  h=int(sr*.02);d=20*np.log10(np.array([np.sqrt(np.mean(x[i:i+h]**2)) for i in range(0,len(x)-h,h)])+1e-9)
  print(f,'[saat, lantai p15, suara p90]',[(k*5,round(np.percentile(d[k*250:(k+1)*250],15)),round(np.percentile(d[k*250:(k+1)*250],90))) for k in range(int(len(d)/250))])
