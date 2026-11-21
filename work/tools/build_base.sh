set -e
cd "${WORK:-$(pwd)}"
python3 - <<'PY'
import subprocess,json,os,shutil
S=json.load(open('segs2.json'))['segs']
v=[];a=[];n=len(S)
G="eq=contrast=1.06:brightness=0.01:saturation=1.08,colorbalance=rs=.03:bs=-.03,unsharp=5:5:0.5:5:5:0"
for i,(s,e) in enumerate(S):
    v.append(f"[0:v]trim={s}:{e},setpts=PTS-STARTPTS[v{i}]")
    a.append(f"[0:a]atrim={s}:{e},asetpts=PTS-STARTPTS,afade=t=in:d=0.015,afade=t=out:st={e-s-0.02:.3f}:d=0.02[a{i}]")
fc=';'.join(v+a)+';'+''.join(f'[v{i}]' for i in range(n))+f'concat=n={n}:v=1:a=0[vc];'+''.join(f'[a{i}]' for i in range(n))+f'concat=n={n}:v=0:a=1[ac];'
fc+=f"[vc]fps=30,scale=1080:1920:flags=lanczos,{G},tpad=stop_mode=clone:stop_duration=1.6[vo];"
fc+="[ac]highpass=f=80,afftdn=nf=-45:tn=1,deesser=i=0.3,acompressor=threshold=-24dB:ratio=3:attack=8:release=120:makeup=4dB,equalizer=f=200:t=q:w=1:g=-1.5,equalizer=f=3500:t=q:w=1:g=2,apad=pad_dur=1.6,aresample=48000[ao]"
subprocess.run(['ffmpeg','-v','error','-y','-i','src.mov','-filter_complex',fc,'-map','[vo]','-map','[ao]','-c:v','libx264','-crf','14','-preset','veryfast','-pix_fmt','yuv420p','-c:a','pcm_s16le','base2.mov'],check=True)
shutil.rmtree('tails',ignore_errors=True); os.makedirs('tails')
for i,(s,e) in enumerate(S[:-1]):
    subprocess.run(['ffmpeg','-v','error','-y','-ss',str(e),'-i','src.mov','-frames:v','4','-vf',f'fps=30,scale=720:1280:flags=lanczos,{G}','-q:v','3',f'tails/c{i}_%d.jpg'],check=True)
PY
ffmpeg -v error -y -i base2.mov -vn voice2_raw.wav
L=$(ffmpeg -i voice2_raw.wav -af loudnorm=I=-14:TP=-1.5:LRA=7:print_format=json -f null - 2>&1 | python3 -c "import sys,json;t=sys.stdin.read();d=json.loads(t[t.rindex('{'):]);print(f\"measured_I={d['input_i']}:measured_TP={d['input_tp']}:measured_LRA={d['input_lra']}:measured_thresh={d['input_thresh']}\")")
ffmpeg -v error -y -i voice2_raw.wav -af loudnorm=I=-14:TP=-1.5:LRA=7:$L:linear=true,aresample=48000 voice2.wav
rm -rf bf2 && mkdir bf2 && ffmpeg -v error -y -i base2.mov -vf scale=720:1280:flags=lanczos -q:v 3 bf2/%05d.jpg
ls bf2 | wc -l
