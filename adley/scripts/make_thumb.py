# Adley — thumbnail TikTok 1080x1920 gaya poster (Adila Gold).
# guna: python3 make_thumb.py --photo foto.jpg --out THUMB.jpg --pill "BUKAN GOLD BAR JE! 😱" \
#        --l1 "PUBLIC GOLD" --l2 "KINI ADA" --l3 "BARANG KEMAS 💍" --sub "✨ <g>PG JEWEL</g> · 916 &amp; 999 ✨" [--guide]
# Langkah: grade seimbang -> muka glowing (beauty.py) -> potong orang (segimg.py, mediapipe) -> letak muka di tengah atas
#          -> tulisan hook di BAWAH dagu, dalam zon selamat TikTok (x 90-900, y 320-1420) -> render Playwright.
import argparse,os,subprocess,json,shutil,sys,cv2,numpy as np
H=os.path.dirname(os.path.abspath(__file__))
a=argparse.ArgumentParser()
for k in ['photo','out','pill','l1','l2','l3','sub']:a.add_argument('--'+k,default='')
a.add_argument('--guide',action='store_true');a.add_argument('--bright',type=float,default=0.015)
a.add_argument('--fonts',default=os.path.join(H,'fonts'));a.add_argument('--model',default=os.path.join(H,'seg.tflite'))
A=a.parse_args()
if not os.path.exists(A.model):  # model potong orang (mediapipe selfie multiclass) — muat turun kali pertama
  subprocess.run(['curl','-sfL','-o',A.model,'https://storage.googleapis.com/mediapipe-models/image_segmenter/selfie_multiclass_256x256/float32/latest/selfie_multiclass_256x256.tflite'],check=True)
wd=os.path.abspath(os.path.splitext(A.out)[0]+'_kerja');os.makedirs(wd+'/in',exist_ok=True);os.makedirs(wd+'/bt',exist_ok=True)
# 1) grade seimbang (tak kusam, tak terlalu cerah) — highlight dikawal
G=f"scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,eq=brightness={A.bright}:contrast=1.06:saturation=1.12,colorbalance=bs=0.02:rh=0.01:bh=-0.01,curves=all='0/0.02 0.25/0.24 0.5/0.52 0.85/0.84 1/0.95',unsharp=5:5:0.5"
subprocess.run(['ffmpeg','-v','error','-y','-i',A.photo,'-vf',G,'-q:v','2',wd+'/in/00001.jpg'],check=True)
# 2) muka glowing
subprocess.run([sys.executable,os.path.join(H,'beauty.py'),'run',wd+'/in',wd+'/bt'],check=True)
src=wd+'/bt/00001.jpg';shutil.copy(src,wd+'/photo.jpg')
# 3) potong orang
subprocess.run([sys.executable,os.path.join(H,'segimg.py'),src,wd+'/cut.png',A.model],check=True,stderr=subprocess.DEVNULL)
# 4) kedudukan muka -> anjakan supaya muka ~y 600, dagu jauh dari tulisan
img=cv2.imread(src);cas=cv2.CascadeClassifier(cv2.data.haarcascades+'haarcascade_frontalface_default.xml')
f=cas.detectMultiScale(cv2.cvtColor(img,cv2.COLOR_BGR2GRAY),1.1,5,minSize=(120,120))
if len(f): x,y,w,h=max(f,key=lambda r:r[2]*r[3])
else: x,y,w,h=380,500,330,330;print('AMARAN: muka tak dikesan, guna anggaran')
shift=int(np.clip(600-(y+h/2),-420,0));chin=y+h*1.1+shift
top=int(max(960,chin+90));print('muka',x,y,w,h,'anjak',shift,'dagu',int(chin),'tulisan mula',top)
if top>1000: print('AMARAN: muka terlalu rendah dalam foto — tulisan mungkin rapat ke bawah zon selamat; guna foto yang muka lebih tinggi')
g=lambda s:s.replace('<g>','<span class="gold">').replace('</g>','</span>')
html=f'''<!doctype html><meta charset="utf-8"><style>
@font-face{{font-family:Mont;src:url(file://{A.fonts}/mont800.woff2);font-weight:800}}@font-face{{font-family:Mont;src:url(file://{A.fonts}/mont900.woff2);font-weight:900}}
html,body{{margin:0;background:#000}}#s{{position:relative;width:1080px;height:1920px;overflow:hidden;font-family:Mont,'Noto Color Emoji'}}
.ph{{position:absolute;left:0;top:{shift}px;width:1080px;height:1920px;background:url(photo.jpg) center/cover;filter:blur(9px) brightness(.9) saturate(1.05)}}
.pc{{position:absolute;left:0;top:{shift}px;width:1080px;height:1920px;filter:drop-shadow(0 0 2px rgba(255,230,160,.8)) drop-shadow(0 0 26px rgba(255,215,120,.45))}}
.bot{{position:absolute;left:0;right:0;top:{1920+shift-400}px;bottom:0;background:linear-gradient(180deg,rgba(8,5,1,0) 0%,#080501 60%)}}
.topd{{position:absolute;left:0;right:0;top:0;height:620px;background:linear-gradient(180deg,rgba(8,5,1,.82) 0%,rgba(8,5,1,.5) 40%,rgba(8,5,1,0) 100%)}}
.shade{{position:absolute;left:0;right:0;top:{top-140}px;bottom:0;background:linear-gradient(180deg,rgba(8,5,1,0) 0%,rgba(8,5,1,.72) 16%,rgba(8,5,1,.86) 60%,rgba(8,5,1,.95) 100%)}}
.tx{{position:absolute;left:90px;right:180px;top:{top}px;text-align:center}}
.pill{{display:inline-block;background:#C8102E;color:#fff;font:900 40px Mont;padding:10px 34px;border-radius:50px;border:3px solid #FFD36A;box-shadow:0 8px 20px rgba(0,0,0,.5);transform:rotate(-2deg)}}
.gold{{background:linear-gradient(180deg,#FFF6C8 0%,#F5C542 45%,#C8901A 100%);-webkit-background-clip:text;background-clip:text;color:transparent}}
.l{{font-weight:900;line-height:1.02;white-space:nowrap;filter:drop-shadow(0 5px 0 #000) drop-shadow(0 10px 18px rgba(0,0,0,.85))}}
.sp{{position:absolute;width:40px;height:40px;margin:-20px;background:radial-gradient(circle,#fff 0%,rgba(255,240,180,.9) 18%,transparent 55%);clip-path:polygon(50% 0,58% 42%,100% 50%,58% 58%,50% 100%,42% 58%,0 50%,42% 42%)}}
.guide{{position:absolute;left:90px;top:320px;width:810px;height:1100px;border:4px dashed #0f0;display:{'block' if A.guide else 'none'}}}
</style><div id="s"><div class="ph"></div><img class="pc" src="cut.png"><div class="bot"></div>
<div class="sp" style="left:200px;top:560px"></div><div class="sp" style="left:860px;top:450px;transform:scale(1.4)"></div><div class="sp" style="left:840px;top:760px;transform:scale(.8)"></div>
<div class="topd"></div><div class="shade"></div><div class="tx">
{f'<div class="pill">{A.pill}</div>' if A.pill else ''}
<div class="l gold fit" style="font-size:104px;margin-top:18px">{g(A.l1)}</div>
<div class="l fit" style="font-size:66px;color:#fff;margin-top:6px">{g(A.l2)}</div>
<div class="l gold fit" style="font-size:80px;margin-top:6px">{g(A.l3)}</div>
{f'<div class="l fit" style="font:800 36px Mont;color:#fff;margin-top:12px;letter-spacing:1px">{g(A.sub)}</div>' if A.sub else ''}</div>
<div class="guide"></div></div>'''
open(wd+'/thumb.html','w').write(html)
js=f'''const {{chromium}}=require('playwright');(async()=>{{const b=await chromium.launch();const p=await b.newPage({{viewport:{{width:1080,height:1920}}}});
await p.goto('file://{wd}/thumb.html');await p.evaluate(async()=>{{await document.fonts.ready}});
// kecilkan fon baris yang lebih lebar dari 810px
const r=await p.evaluate(()=>{{for(const e of document.querySelectorAll('.fit')){{let fs=parseFloat(getComputedStyle(e).fontSize);while(e.scrollWidth>e.clientWidth+1&&fs>30){{fs-=2;e.style.fontSize=fs+'px'}}}}
 const b=document.querySelector('.tx').getBoundingClientRect();return [b.top|0,b.bottom|0]}});console.log('tulisan y',r[0],'-',r[1],r[1]>1420?'AMARAN: melebihi zon selamat':'(dalam zon selamat)');
await p.waitForTimeout(300);await p.screenshot({{path:'{os.path.abspath(A.out)}',type:'jpeg',quality:93}});await b.close()}})()'''
open(wd+'/shot.js','w').write(js);subprocess.run(['node',wd+'/shot.js'],check=True);print('siap',A.out)
