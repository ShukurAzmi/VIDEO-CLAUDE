import subprocess
sil=[(0,2.906),(24.47,25.016),(25.847,26.264),(31.64,32.108),(41.38,41.864),(44.52,45.04),(48.896,49.307),(50.08,50.497),(61.21,61.714),(62.224,62.782),(66.926,67.359),(74.223,74.681),(80.797,82.545)]
pad=0.12; segs=[]; 
for i,(s,e) in enumerate(sil[:-1]):
    segs.append((e-pad if i else e-pad, sil[i+1][0]+pad))
segs[0]=(2.79,segs[0][1])
segs[-1]=(segs[-1][0],80.92)
f=[];v=[];a=[];t=0;marks=[]
for i,(s,e) in enumerate(segs):
    d=e-s; marks.append(round(t,2)); t+=d
    z=1.06 if i%2 else 1.0
    f.append(f"[0:v]trim={s:.3f}:{e:.3f},setpts=PTS-STARTPTS,scale=1080:1920:flags=lanczos,"+(f"scale=iw*{z}:ih*{z}:flags=lanczos,crop=1080:1920," if z>1 else "")+f"fps=30[v{i}]")
    f.append(f"[0:a]atrim={s:.3f}:{e:.3f},asetpts=PTS-STARTPTS,afade=t=in:d=0.02,afade=t=out:st={d-0.02:.3f}:d=0.02[a{i}]")
    v.append(f"[v{i}][a{i}]")
n=len(segs)
f.append("".join(v)+f"concat=n={n}:v=1:a=1[vc][ac]")
open("filter.txt","w").write(";".join(f)); print("dur",round(t,2),segs,marks)
