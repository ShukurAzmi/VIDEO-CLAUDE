import subprocess,json
DUR=json.load(open('segs2.json'))['dur']
EV=[ # (name, gain dB, output times) — adila13 "Susah nak simpan duit"
 ('whoosh',-14,[3.25,6.38,9.88,11.36,15.44,19.76,22.7,24.25,28.73,33.42,37.47,40.43,43.99,47.02,49.15,52.07,55.72,61.31,63.5,66.69,70.52,72.81,77.3,83.84,87.68,93.99,97.7]),
 ('pop',-16,[0.02,3.35,4.34,6.5,9.95,11.45,12.31,14.2,15.55,23.3,35.71,37.8,41.0,44.06,45.83,47.1,49.25,54.06,56.38,57.74,59.56,59.9,60.24,60.58,61.4,64.11,65.1,66.8,69.79,70.19,70.6,71.73,72.9,77.4,80.87,82.31,84.0,88.66,93.14,94.1,97.85]),
 ('impact',-10,[0.96,8.39,16.59,32.6,46.27,62.92]),
 ('riser',-13,[60.9]),
 ('buzzer',-17,[5.9,14.43,14.71,39.15]),
 ('tap',-10,[52.68,91.08,91.86,96.72]),
 ('cash',-12,[20.85]),
 ('ding',-14,[25.45,26.67,28.02,10.55]),
 ('fall',-11,[30.61,53.42]),
 ('heart',-8,[36.7,75.45]),
 ('fail',-12,[42.26]),
 ('tick',-13,[73.1]),
 ('shimmer',-12,[62.3,64.11,66.8,95.9]),
 ('success',-9,[69.79,85.55,97.85]),
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
