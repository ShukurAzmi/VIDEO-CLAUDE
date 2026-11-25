import sys
from PIL import Image,ImageDraw
out=sys.argv[1]; fs=sys.argv[2:]; W,H=270,480; k=W/1080
tiles=[]
for f in fs:
    im=Image.open(f).convert('RGBA').resize((W,H)); ov=Image.new('RGBA',(W,H),(0,0,0,0)); d=ImageDraw.Draw(ov)
    for x0,y0,x1,y1 in [(0,0,1080,250),(0,1480,1080,1920),(940,700,1080,1600),(0,250,60,1480)]:
        d.rectangle([x0*k,y0*k,x1*k,y1*k],fill=(255,0,0,70))
    tiles.append(Image.alpha_composite(im,ov))
c=Image.new('RGB',(W*8,H*((len(tiles)+7)//8)),'white')
for i,t in enumerate(tiles): c.paste(t,((i%8)*W,(i//8)*H))
c.save(out)
