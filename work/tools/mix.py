"""Yaya mix: voice + synth music (ducked) + story SFX. EV times are SOURCE seconds."""
import subprocess,sys,json
sys.path.insert(0,'tools')
S=json.load(open('segs2.json')); SEGS=S['segs']; DUR=S['dur']
def m(t):
    o=0
    for a,b in SEGS:
        if t<a: return o
        if t<=b: return o+t-a
        o+=b-a
    return o+t-SEGS[-1][1]
F={k:f'sfx/{k}.wav' for k in 'pop impact riser cash fall ding shimmer tap receipt alarm success heart'.split()}; F['whoosh']='sfx/whoosh.mp3'
EV=[
 ('whoosh',-14,[8.0,14.26,20.14,23.1,27.68,32.22,37.44,43.42,46.88,50.26,56.94,61.58,69.46,75.14,80.45]),
 ('pop',-17,[4.45,5.98,7.2,10.66,12.28,14.3,17.28,18.06,20.98,22.06,27.75,30.06,31.26,32.3,33.8,35.14,39.28,45.52,48.04,48.76,50.4,54.6,59.7,60.22,60.52,61.02,65.04,70.9,72.9,73.5,74.5,75.2]),
 ('riser',-13,[5.6,48.3,77.0]),
 ('impact',-10,[6.42,7.58,26.46,36.66,46.44,56.2,63.36]),
 ('alarm',-17,[15.68]),
 ('fall',-12,[7.35,18.7]),
 ('heart',-8,[19.66,42.74,48.04]),
 ('tap',-12,[21.6,22.55,73.05,73.65,79.52]),
 ('ding',-14,[21.0,22.1]),
 ('cash',-12,[22.52,53.9,58.3]),
 ('receipt',-15,[43.6]),
 ('success',-10,[29.9,50.4,66.58]),
 ('shimmer',-14,[66.6,78.9,80.55]),
]
ins=['-i','voice2.wav','-i','music.wav']; fc=[]; L=[]; idx=2
for name,g,ts in EV:
    ins+=['-i',F[name]]; n=len(ts)
    fc.append(f'[{idx}:a]aresample=48000,aformat=channel_layouts=stereo,volume={g}dB,asplit={n}'+''.join(f'[{name}{k}]' for k in range(n)))
    for k,t in enumerate(ts):
        ms=max(0,int(m(t)*1000)); fc.append(f'[{name}{k}]adelay={ms}|{ms}[{name}d{k}]'); L.append(f'[{name}d{k}]')
    idx+=1
fc.append(''.join(L)+f'amix=inputs={len(L)}:normalize=0[sfx]')
fc.append('[0:a]aformat=channel_layouts=stereo,asplit[v1][v2]')
fc.append('[1:a]aresample=48000,volume=-15dB[m]')
fc.append('[m][v2]sidechaincompress=threshold=0.03:ratio=5:attack=20:release=350:makeup=1[md]')
fc.append(f'[v1][md][sfx]amix=inputs=3:normalize=0,alimiter=limit=0.89,atrim=0:{DUR:.3f}[out]')
subprocess.run(['ffmpeg','-v','error','-y',*ins,'-filter_complex',';'.join(fc),'-map','[out]','-ar','48000','mix.wav'],check=True)
print('ok',round(DUR,2),'turn',round(m(50.26),2))
