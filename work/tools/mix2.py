import subprocess,sys
sys.path.insert(0,'tools')
from timeline2 import old2new, DUR
F={'whoosh':'sfx/whoosh.mp3','pop':'sfx/pop.mp3','impact':'sfx/impact.mp3','stamp':'sfx/stamp.mp3','ding':'sfx/ding.mp3','shimmer':'sfx/shimmer.mp3',
   'alarm':'sfx2/alarm.mp3','sting':'sfx2/sting.mp3','glitch':'sfx2/glitch.mp3','cash':'sfx2/cash.mp3','heart':'sfx2/heart.mp3','fall':'sfx2/fall.mp3',
   'riser':'sfx2/riser.mp3','success':'sfx2/success.mp3','tap':'sfx2/tap.mp3','buzzer':'sfx2/buzzer.wav','typing':'sfx2/typing.wav'}
# (name, gain dB, [times in v1 timeline])
EV=[
 ('whoosh',-14,[0.0,4.9,8.95,12.35,20.5,25.05,28.05,31.85,42.15,48.85,51.5,55.0,59.85,63.55,68.22]),
 ('pop',-16,[1.38,5.5,9.15,11.4,13.0,15.68,16.84,18.8,22.3,29.3,30.35,33.7,41.35,49.9,57.0,60.0,61.1,64.85,66.85]),
 ('tap',-14,[15.98,17.14,19.1,64.95,67.25]),
 ('riser',-12,[2.95,47.2,20.4]),
 ('sting',-9,[4.02,21.43,48.28]),
 ('impact',-12,[4.02,36.66,48.28]),
 ('typing',-12,[5.15]),
 ('ding',-13,[5.78,25.13]),
 ('glitch',-15,[5.9,21.45,31.3]),
 ('alarm',-19,[7.75]),
 ('stamp',16,[8.03,27.48,36.66,48.28]),
 ('cash',-13,[27.25,52.3]),
 ('buzzer',-15,[27.5,44.2,45.2,46.25]),
 ('heart',-9,[23.0,28.15,39.0]),
 ('fall',-11,[33.19,36.55]),
 ('success',-8,[48.9,54.55,65.0]),
 ('shimmer',-15,[48.95,54.6,68.3]),
]
ins=['-i','voice2.wav','-i','music2.wav']; fc=[]; labels=[]; idx=2
for name,g,ts in EV:
    ins+=['-i',F[name]]; n=len(ts)
    fc.append(f'[{idx}:a]aresample=48000,aformat=channel_layouts=stereo,volume={g}dB,asplit={n}'+''.join(f'[{name}{k}]' for k in range(n)))
    for k,t in enumerate(ts):
        ms=max(0,int(old2new(t)*1000)); fc.append(f'[{name}{k}]adelay={ms}|{ms}[{name}d{k}]'); labels.append(f'[{name}d{k}]')
    idx+=1
fc.append(''.join(labels)+f'amix=inputs={len(labels)}:normalize=0[sfx]')
fc.append('[0:a]aformat=channel_layouts=stereo,asplit[v1][v2]')
fc.append('[1:a]aresample=48000,volume=-15dB[m]')
fc.append('[m][v2]sidechaincompress=threshold=0.03:ratio=5:attack=20:release=350:makeup=1[md]')
fc.append(f'[v1][md][sfx]amix=inputs=3:normalize=0,alimiter=limit=0.89,atrim=0:{DUR:.3f}[out]')
subprocess.run(['ffmpeg','-v','error','-y',*ins,'-filter_complex',';'.join(fc),'-map','[out]','-ar','48000','mix2.wav'],check=True)
print('ok',DUR)
