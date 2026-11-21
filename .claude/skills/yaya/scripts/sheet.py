import sys,glob
from PIL import Image,ImageDraw
fs=sys.argv[2:]; ims=[Image.open(f).resize((360,640)) for f in fs]
c=Image.new('RGB',(360*len(ims),670),'white'); d=ImageDraw.Draw(c)
for i,(f,im) in enumerate(zip(fs,ims)): c.paste(im,(i*360,30)); d.text((i*360+5,8),f.split('/')[-1],fill='black')
c.save(sys.argv[1])
