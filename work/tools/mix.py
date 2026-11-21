import subprocess
SFX={
 'whoosh':(-14,[0.0,4.9,8.95,12.35,20.5,25.05,28.05,31.85,42.15,48.85,51.5,55.0,59.85,63.55,68.22]),
 'pop':(-17,[1.38,5.5,9.15,11.4,13.0,15.68,16.84,18.8,22.3,29.3,30.35,33.7,39.0,40.0,41.35,44.2,45.2,46.25,49.9,57.0,60.0,61.1,64.85,66.85]),
 'impact':(-11,[4.02,21.43,36.66,48.28]),
 'stamp':(16,[8.03,27.48,36.66,48.28]),
 'ding':(-15,[5.78,25.13]),
 'shimmer':(-15,[48.9,54.55,68.3]),
}
ins=['-i','voice.wav','-i','music.wav']; fc=[]; labels=[]; idx=2
for name,(g,ts) in SFX.items():
    ins+=['-i',f'sfx/{name}.mp3']; n=len(ts)
    fc.append(f'[{idx}:a]aresample=48000,aformat=channel_layouts=stereo,volume={g}dB,asplit={n}'+''.join(f'[{name}{k}]' for k in range(n)))
    for k,t in enumerate(ts):
        ms=int(t*1000); fc.append(f'[{name}{k}]adelay={ms}|{ms}[{name}d{k}]'); labels.append(f'[{name}d{k}]')
    idx+=1
fc.append(''.join(labels)+f'amix=inputs={len(labels)}:normalize=0[sfx]')
fc.append('[0:a]aformat=channel_layouts=stereo,asplit[v1][v2]')
fc.append('[1:a]aresample=48000,volume=-17dB[m]')
fc.append('[m][v2]sidechaincompress=threshold=0.03:ratio=6:attack=20:release=350:makeup=1[md]')
fc.append('[v1][md][sfx]amix=inputs=3:normalize=0,alimiter=limit=0.89,atrim=0:69.667[out]')
subprocess.run(['ffmpeg','-v','error','-y',*ins,'-filter_complex',';'.join(fc),'-map','[out]','-ar','48000','mix.wav'],check=True)
