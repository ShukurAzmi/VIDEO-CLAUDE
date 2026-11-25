# Mix: suara utama + muzik -15dB (sidechain ducking) + SFX ikut cerita. Limiter 0.89.
import numpy as np,soundfile as sf,sys,os
W=sys.argv[1];SR=48000
v,_=sf.read(f'{W}/voice.wav');m,_=sf.read(f'{W}/music.wav')
N=len(v);m=np.pad(m,((0,max(0,N-len(m))),(0,0)))[:N]
db=lambda x:10**(x/20)
# envelope suara utk ducking
e=np.abs(v).mean(1);k=int(SR*0.05);e=np.convolve(e,np.ones(k)/k,'same');e=e/ (e.max()+1e-9)
duck=1-0.5*np.clip(e*4,0,1);kk=int(SR*0.25);duck=np.convolve(duck,np.ones(kk)/kk,'same')
out=v.copy()+m*db(-15)*duck[:,None]
EV=[('stinger',-8,0.0),('whoosh',-12,0.0),('fall',-9,1.0),('impact',-6,1.65),('pop',-11,1.7),
('whoosh',-12,3.7),('typing',-15,4.0),('heart',-5,6.85),('pop',-12,7.4),('chime',-9,8.1),
('whoosh',-10,8.55),('pop',-12,9.4),('riser',-15,11.0),('whoosh',-11,11.55),('whoosh',-10,12.45),('chime',-11,14.0),
('whoosh',-10,15.2),('pop',-12,15.6),('pop',-12,16.9),('whoosh',-12,19.0),('pop',-14,19.3),('pop',-14,19.45),('chaching',-7,20.6),('pop',-15,20.82),('pop',-15,21.04),('pop',-15,21.26),
('whoosh',-10,23.85),('pop',-12,24.2),('pop',-13,27.2),('check',-12,27.55),('pop',-13,28.1),('check',-12,28.45),('pop',-13,29.6),('check',-12,29.95),('riser',-14,29.0),('impact',-7,30.5),('stamp',-5,34.95),
('glitch',-12,35.7),('whoosh',-11,35.75),('buzzer',-11,36.15),('pop',-12,39.9),('ding',-14,39.95),('heart',-5,43.15),('pop',-12,43.2),
('whoosh',-10,45.7),('ding',-12,45.85),('typing',-16,49.2),('buzzer',-8,50.75),('stamp',-8,50.75),
('whoosh',-10,51.95),('impact',-9,53.35),('chime',-10,53.35),
('whoosh',-10,55.65),('pop',-13,58.7),('check',-11,59.0),('pop',-13,60.1),('check',-11,60.4),('pop',-13,61.3),('check',-11,61.6),('chaching',-11,61.84),
('whoosh',-10,62.15),('pop',-12,63.6),('buzzer',-9,64.75),('chime',-8,66.2),('check',-11,67.1),
('whoosh',-10,67.95),('pop',-12,68.6),('pop',-12,71.1),('tap',-6,71.25),('pop',-12,71.7),('tap',-6,71.85),('pop',-12,72.3),('pop',-12,74.85),('ding',-13,74.85),('tap',-6,75.4),('chime',-12,75.6)]
C={}
for n,g,t in EV:
  if n not in C: C[n]=sf.read(f'{W}/sfx/{n}.wav')[0]
  x=C[n]*db(g);s=int(t*SR);L=min(len(x),N-s)
  if L>0: out[s:s+L]+=x[:L]
pk=np.max(np.abs(out));
out=np.where(np.abs(out)>0.8,np.sign(out)*(0.8+0.09*np.tanh((np.abs(out)-0.8)/0.09)),out)  # soft limiter -> 0.89
sf.write(f'{W}/mix.wav',out.astype(np.float32),SR,subtype='PCM_16');print('peak sebelum',round(pk,2))
