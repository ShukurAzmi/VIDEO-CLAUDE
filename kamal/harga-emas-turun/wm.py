import base64,io,hashlib,numpy as np,sys
from PIL import Image,ImageFilter
B64=''.join(open(sys.argv[1]).read().split())
assert hashlib.sha256(B64.encode()).hexdigest().startswith('d99f8aee1014b697'),'Topeng rosak'
mk=Image.open(io.BytesIO(base64.b64decode(B64))).convert('L')
mk=mk.resize((mk.width*2,mk.height*2),Image.LANCZOS).filter(ImageFilter.GaussianBlur(1.1))
mw,mh=mk.size
g=np.zeros((mh,mw,3),np.uint8)
for k,(t,b) in enumerate(zip((255,236,160),(224,170,34))): g[:,:,k]=np.linspace(t,b,mh)[:,None]
fg=Image.new('RGBA',(mw,mh),(0,0,0,0)); fg.paste(Image.fromarray(g,'RGB'),(0,0),mk)
pad=14; c=Image.new('RGBA',(mw+2*pad,mh+2*pad),(0,0,0,0)); c.paste(fg,(pad,pad))
al=c.split()[3]; sh=Image.new('RGBA',c.size,(0,0,0,0)); sh.putalpha(al.filter(ImageFilter.GaussianBlur(4)).point(lambda v:min(255,int(v*1.6))))
off=Image.new('RGBA',c.size,(0,0,0,0)); off.paste(sh,(2,2))
wm=Image.alpha_composite(off,c); wm=wm.crop(wm.getbbox()); wm.save(sys.argv[2]); print(wm.size)
