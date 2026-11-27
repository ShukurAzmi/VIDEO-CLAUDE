# Mix: suara utama + muzik -15dB (sidechain ducking) + SFX ikut cerita. Limiter 0.89.
import numpy as np,soundfile as sf,sys,os
W=sys.argv[1];SR=48000
v,_=sf.read(f'{W}/voice.wav');m,_=sf.read(f'{W}/music.wav')
N=len(v);m=np.pad(m,((0,max(0,N-len(m))),(0,0)))[:N]
db=lambda x:10**(x/20)
# envelope suara utk ducking
e=np.abs(v).mean(1);k=int(SR*0.05);e=np.convolve(e,np.ones(k)/k,'same');e=e/ (e.max()+1e-9)
duck=1-0.5*np.clip(e*4,0,1);kk=int(SR*0.25);duck=np.convolve(duck,np.ones(kk)/kk,'same')
out=v.copy()+m*db(-18)*duck[:,None]
# v2: TIADA whoosh/glitch/riser (zoom & transisi senyap — permintaan Adila)
EV=[('stinger',-8,0.0),('pop',-11,1.0),('fall',-9,1.15),('impact',-6,1.65),('pop',-11,1.7),
('heart',-5,6.85),('pop',-12,7.4),('chime',-9,8.1),
('pop',-12,11.6),('chime',-11,14.0),
('pop',-12,19.0),('pop',-14,19.4),('pop',-14,19.55),('chaching',-7,20.6),('pop',-15,20.82),('pop',-15,21.04),('pop',-15,21.26),
('pop',-12,27.05),('pop',-13,27.2),('check',-12,27.55),('pop',-13,28.1),('check',-12,28.45),('pop',-13,29.6),('check',-12,29.95),('stamp',-5,34.95),
('pop',-11,35.8),('buzzer',-11,36.15),('pop',-12,39.9),('ding',-14,39.95),('heart',-5,43.15),('pop',-12,43.2),
('pop',-12,49.2),('typing',-16,49.3),('buzzer',-8,50.75),('stamp',-8,50.75),
('impact',-9,53.35),('chime',-10,53.35),
('pop',-12,58.6),('pop',-13,58.7),('check',-11,59.0),('pop',-13,60.1),('check',-11,60.4),('pop',-13,61.3),('check',-11,61.6),('chaching',-11,61.84),
('pop',-12,63.6),('buzzer',-9,64.75),('chime',-8,66.2),('check',-11,67.1),
('pop',-12,71.0),('pop',-12,71.1),('tap',-6,71.25),('pop',-12,71.7),('tap',-6,71.85),('pop',-12,74.85),('ding',-13,74.85),('tap',-6,75.4),('chime',-12,75.6)]
C={}
if os.environ.get('NOSFX'): EV=[]  # v3: tanpa SFX (permintaan Adila)
# v4: SFX penting sahaja (permintaan Adila)
if os.environ.get('KEYSFX'): EV=[('pop2', -16, 0.17), ('shimmer', -17, 2.72), ('sparkle', -15, 6.97), ('bell', -14, 7.69), ('sparkle', -15, 9.17), ('bell', -15, 9.81), ('shimmer', -17, 12.07), ('pop2', -15, 18.37), ('pop2', -15, 18.87), ('shimmer', -17, 19.47), ('pop2', -14, 22.35), ('pop2', -14, 23.74), ('sparkle', -14, 31.34), ('sparkle', -15, 36.3), ('sparkle', -15, 40.85), ('bell', -14, 42.9), ('pop2', -15, 47.2), ('pop2', -15, 48.61), ('pop2', -15, 54.01), ('pop2', -16, 55.87), ('pop2', -16, 56.52), ('pop2', -16, 57.57), ('bell', -14, 58.6), ('shimmer', -17, 59.92), ('pop2', -16, 62.32), ('pop2', -16, 62.8), ('pop2', -16, 63.92), ('bell', -14, 66.36), ('bell', -14, 72.0), ('bell', -13, 73.62)]  # v2 PG Jewel: SFX lembut, kurang
for n,g,t in EV:
  if n not in C: C[n]=sf.read(f'{W}/sfx/{n}.wav')[0]
  x=C[n]*db(g);s=int(t*SR);L=min(len(x),N-s)
  if L>0: out[s:s+L]+=x[:L]
pk=np.max(np.abs(out));
out=np.where(np.abs(out)>0.8,np.sign(out)*(0.8+0.09*np.tanh((np.abs(out)-0.8)/0.09)),out)  # soft limiter -> 0.89
sf.write(f'{W}/mix.wav',out.astype(np.float32),SR,subtype='PCM_16');print('peak sebelum',round(pk,2))
