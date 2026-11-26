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
if os.environ.get('KEYSFX'): EV=[('shimmer', -17, 2.1), ('sparkle', -15, 2.21), ('pop2', -15, 2.68), ('pop2', -15, 3.06), ('pop2', -15, 6.22), ('pop2', -16, 6.93), ('bell', -14, 8.61), ('sparkle', -15, 11.68), ('pop2', -15, 14.32), ('pop2', -16, 15.0), ('pop2', -15, 15.46), ('pop2', -13, 16.81), ('bell', -13, 21.94), ('pop2', -16, 22.83), ('pop2', -16, 23.02), ('pop2', -16, 23.15), ('pop2', -16, 24.22), ('sparkle', -14, 26.87), ('bell', -14, 27.36), ('pop2', -16, 28.71), ('pop2', -16, 29.59), ('pop2', -16, 30.29), ('sparkle', -14, 31.28), ('pop2', -16, 33.54), ('bell', -14, 34.19), ('pop2', -16, 34.75), ('pop2', -15, 35.51), ('pop2', -15, 37.1), ('bell', -14, 40.15), ('pop2', -14, 44.86), ('pop2', -15, 46.86), ('pop2', -15, 49.47), ('sparkle', -14, 50.16), ('pop2', -16, 52.42), ('pop2', -16, 52.87), ('bell', -14, 53.97), ('sparkle', -15, 55.83), ('bell', -14, 56.71), ('pop2', -15, 59.11), ('pop2', -15, 63.18), ('pop2', -15, 63.78), ('sparkle', -14, 66.42), ('bell', -13, 67.37)]  # SFX lembut/elegan (nicesfx.py), tiada thump/tong/whoosh
for n,g,t in EV:
  if n not in C: C[n]=sf.read(f'{W}/sfx/{n}.wav')[0]
  x=C[n]*db(g);s=int(t*SR);L=min(len(x),N-s)
  if L>0: out[s:s+L]+=x[:L]
pk=np.max(np.abs(out));
out=np.where(np.abs(out)>0.8,np.sign(out)*(0.8+0.09*np.tanh((np.abs(out)-0.8)/0.09)),out)  # soft limiter -> 0.89
sf.write(f'{W}/mix.wav',out.astype(np.float32),SR,subtype='PCM_16');print('peak sebelum',round(pk,2))
