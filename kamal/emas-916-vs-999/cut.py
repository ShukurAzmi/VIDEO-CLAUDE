# Potong jeda: jeda > 0.26s dipendekkan; sambungan crossfade 4 frame (0.1333s)
import soundfile as sf,numpy as np,json,sys,os,subprocess
W=sys.argv[1]; os.chdir(W)
a,sr=sf.read(os.environ.get('DET','a16.wav'));h=sr//100  # v5: DET=src_df.wav (kesan jeda pada audio bersih)
db=20*np.log10(np.array([np.sqrt(np.mean(a[i:i+h]**2)+1e-12) for i in range(0,len(a)-h,h)]))
q=db<np.percentile(db,95)-float(os.environ.get('OFF',32))
P=[];i=0
while i<len(q):
  if q[i]:
    j=i
    while j<len(q) and q[j]: j+=1
    P.append([i*.01,j*.01]);i=j
  else:i+=1
M=[]
for p in P:  # gabung jeda yang dipisah blip < 30ms
  if M and p[0]-M[-1][1]<0.03: M[-1][1]=p[1]
  else: M.append(p)
M=[p for p in M if p[1]-p[0]>float(os.environ.get('MINP',0.26))]
# buang ulangan/gagap (env CUTS='[[s,e],...]' masa sumber; dianggap jeda)
for c in json.loads(os.environ.get('CUTS','[]')):
  M=[p for p in M if p[1]<c[0] or p[0]>c[1]]+[c]
M.sort()
D=4/30; m=float(os.environ.get('MARG',0.12))
START=float(os.environ.get("START",0.8)); END=float(os.environ.get("END",81.75))
segs=[];cur=START
for s,e in M:
  if e<=START: continue
  if s>=END: break
  segs.append([round(cur,3),round(s+m,3)]); cur=round(e-m,3)
segs.append([cur,END])
segs=[x for x in segs if x[1]-x[0]>0.2]
# peta masa asal->output
off=[];acc=0
for k,(s,e) in enumerate(segs):
  off.append(acc); acc+= (e-s) - (D if k<len(segs)-1 else 0)
json.dump(dict(segs=segs,off=off,D=D,dur=acc),open('segs.json','w'))
print(len(segs),'segs, durasi',round(acc,2),'dari',END-START)
# ffmpeg
f=[];n=len(segs)
for k,(s,e) in enumerate(segs):
  f.append(f"[0:v]trim={s}:{e},setpts=PTS-STARTPTS,fps=30,scale=720:1280,format=yuv420p[v{k}]")
  f.append(f"[0:a]atrim={s}:{e},asetpts=PTS-STARTPTS,aresample=48000[a{k}]")
pv,pa='v0','a0';L=segs[0][1]-segs[0][0]
for k in range(1,n):
  o=L-D
  f.append(f"[{pv}][v{k}]xfade=transition=fade:duration={D:.4f}:offset={o:.4f}[x{k}]")
  f.append(f"[{pa}][a{k}]acrossfade=d={D:.4f}:c1=tri:c2=tri[y{k}]")
  pv,pa=f'x{k}',f'y{k}'; L=o+segs[k][1]-segs[k][0]
open('cut.fc','w').write(';\n'.join(f))
subprocess.run(['ffmpeg','-v','error','-y','-i','src.mov','-filter_complex_script','cut.fc','-map',f'[{pv}]','-map',f'[{pa}]','-c:v','libx264','-crf','14','-preset','fast','-c:a','pcm_s16le','base_raw.mov'],check=True)
