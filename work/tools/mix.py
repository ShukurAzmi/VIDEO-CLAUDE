import subprocess,json
DUR=json.load(open('segs2.json'))['dur']
EV=[ # (name, gain dB, output times)
 ('whoosh',-14,[4.0,7.55,10.38,14.65,16.6,20.58,23.45,25.9,33.32,38.4,42.9,49.8,53.02,57.15,60.2,65.3,72.2,76.6,79.4]),
 ('pop',-16,[0.02,1.55,5.87,9.4,15.15,21.55,23.55,26.0,27.35,27.85,28.35,30.15,39.55,43.3,45.1,49.9,53.2,57.3,58.0,59.8,64.7,69.85,72.85,77.8]),
 ('impact',-10,[3.61,24.4,54.85]),
 ('riser',-13,[1.6,52.8]),
 ('tap',-10,[6.85,46.2,74.75,75.2,78.5]),
 ('cash',-12,[7.0,15.89,47.0]),
 ('ding',-14,[8.0,65.9]),
 ('tick',-13,[14.8]),
 ('fail',-12,[21.6]),
 ('buzzer',-17,[31.05,32.2]),
 ('fall',-11,[34.6,38.03]),
 ('heart',-8,[41.65,68.9]),
 ('success',-9,[46.9,58.0,64.7]),
 ('shimmer',-13,[54.9,56.05,79.6]),
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
