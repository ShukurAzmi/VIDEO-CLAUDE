import subprocess,json
DUR=json.load(open('segs2.json'))['dur']
EV=[ # (name, gain dB, output times) — adila12 "nilai duit semakin kecil"
 ('whoosh',-14,[3.8,7.9,12.05,17.1,23.1,26.8,32.9,38.3,42.3,46.4,49.3,52.45,57.05,60.45,69.5,73.0,75.5,81.75,84.95]),
 ('pop',-16,[0.05,1.5,3.95,4.85,6.62,8.3,13.6,15.1,15.6,16.16,16.44,17.3,18.87,19.67,20.88,24.0,26.95,28.29,36.27,41.14,42.4,43.35,43.8,57.2,60.6,64.85,66.06,70.5,70.75,71.0,71.25,71.5,75.7,80.73,82.0,85.1]),
 ('impact',-10,[3.32,22.06,38.98,64.14]),
 ('riser',-13,[1.4,58.5]),
 ('tap',-10,[79.93,80.39,84.21]),
 ('cash',-12,[13.67,18.87]),
 ('ding',-14,[5.4,7.2,43.35]),
 ('tick',-13,[26.95]),
 ('fail',-12,[47.9]),
 ('buzzer',-17,[50.05,51.99]),
 ('fall',-11,[2.8,37.54,45.35,55.82]),
 ('heart',-8,[39.0,40.4]),
 ('success',-9,[71.78,74.17]),
 ('shimmer',-13,[64.2,65.1,74.2,85.1]),
]
ins=['-i','voice2.wav','-i','music.wav'];fc=[];lab=[];idx=2
for n,g,ts in EV:
    ins+=['-i',f'sfx/{n}.wav'];k=len(ts)
    fc.append(f'[{idx}:a]aresample=48000,aformat=channel_layouts=stereo,volume={g}dB,asplit={k}'+''.join(f'[{n}{i}]' for i in range(k)))
    for i,t in enumerate(ts):
        ms=max(0,int(t*1000));fc.append(f'[{n}{i}]adelay={ms}|{ms}[{n}d{i}]');lab.append(f'[{n}d{i}]')
    idx+=1
fc.append(''.join(lab)+f'amix=inputs={len(lab)}:normalize=0[sfx]')
fc.append('[0:a]aformat=channel_layouts=stereo,asplit[v1][v2]')
fc.append('[1:a]aresample=48000,volume=-15dB[m]')
fc.append('[m][v2]sidechaincompress=threshold=0.03:ratio=5:attack=20:release=350:makeup=1[md]')
fc.append(f'[v1][md][sfx]amix=inputs=3:normalize=0,alimiter=limit=0.89,atrim=0:{DUR:.3f}[out]')
subprocess.run(['ffmpeg','-v','error','-y',*ins,'-filter_complex',';'.join(fc),'-map','[out]','-ar','48000','mix.wav'],check=True)
print('ok',DUR)
