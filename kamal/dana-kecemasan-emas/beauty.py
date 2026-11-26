# Muka glowing, macam makeup ringan, TIDAK kekuningan. Hanya kulit muka (tudung/latar tak disentuh).
# python3 beauty.py test in.jpg out.jpg   |   python3 beauty.py run <in_dir> <out_dir>
import cv2,numpy as np,sys,os,glob
from multiprocessing import Pool
CAS=cv2.CascadeClassifier(cv2.data.haarcascades+'haarcascade_frontalface_default.xml')
def detect(img):
  g=cv2.cvtColor(cv2.resize(img,None,fx=.5,fy=.5),cv2.COLOR_BGR2GRAY)
  f=CAS.detectMultiScale(g,1.1,5,minSize=(80,80))
  if len(f)==0: return None
  x,y,w,h=max(f,key=lambda r:r[2]*r[3]);return np.array([x,y,w,h])*2
def mask(img,box):
  H,W=img.shape[:2];x,y,w,h=box
  m=np.zeros((H,W),np.float32)
  cv2.ellipse(m,(int(x+w/2),int(y+h*.55)),(int(w*.52),int(h*.68)),0,0,360,1,-1)
  ycc=cv2.cvtColor(img,cv2.COLOR_BGR2YCrCb)
  sk=((ycc[...,1]>133)&(ycc[...,1]<180)&(ycc[...,2]>77)&(ycc[...,2]<130)).astype(np.float32)
  m=cv2.GaussianBlur(m*sk,(0,0),9)
  return m[...,None]
def beauty(img,box):
  m=mask(img,box)
  f=img.astype(np.float32)
  sm=cv2.bilateralFilter(img,9,40,9).astype(np.float32)
  hp=f-cv2.GaussianBlur(f,(0,0),2)       # tekstur kekal
  out=f*(1-.6*m)+(sm+.45*hp)*(.6*m)
  lab=cv2.cvtColor(np.clip(out,0,255).astype(np.uint8),cv2.COLOR_BGR2LAB).astype(np.float32)
  M=m[...,0]
  lab[...,2]-=6*M                        # kurangkan kuning
  lab[...,1]+=2.5*M                      # rona merah jambu halus
  lab[...,0]+=3*M                        # cerah sedikit
  # blush pipi
  x,y,w,h=box;bl=np.zeros(M.shape,np.float32)
  for cx in (x+w*.27,x+w*.73): cv2.circle(bl,(int(cx),int(y+h*.68)),int(w*.13),1,-1)
  bl=cv2.GaussianBlur(bl,(0,0),w*.07)*M;lab[...,1]+=5*bl
  out=cv2.cvtColor(np.clip(lab,0,255).astype(np.uint8),cv2.COLOR_LAB2BGR).astype(np.float32)
  # highlight bloom
  L=out.max(2,keepdims=True);hi=np.clip((L-180)/75,0,1)*out
  out=out+.15*cv2.GaussianBlur(hi,(0,0),12)*m
  return np.clip(out,0,255).astype(np.uint8)
BOX=None
def job(a):
  i,o=a;cv2.imwrite(o,beauty(cv2.imread(i),BOX),[cv2.IMWRITE_JPEG_QUALITY,95])
if __name__=='__main__':
  if sys.argv[1]=='test':
    img=cv2.imread(sys.argv[2]);b=detect(img);print('box',b);out=beauty(img,b)
    cv2.imwrite(sys.argv[3],np.hstack([img,out]))
  else:
    fs=sorted(glob.glob(sys.argv[2]+'/*.jpg'));os.makedirs(sys.argv[3],exist_ok=True)
    bs=[b for b in (detect(cv2.imread(f)) for f in fs[::60]) if b is not None]
    BOX=np.median(np.array(bs),0).astype(int);print('median box',BOX,'dari',len(bs))
    with Pool(4) as p: p.map(job,[(f,os.path.join(sys.argv[3],os.path.basename(f))) for f in fs],chunksize=20)
