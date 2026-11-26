# Versi muka bergerak: kesan muka setiap 10 frame, interpolasi kotak, kekuatan pudar 0 bila tiada muka (produk/klip sambungan)
import cv2,numpy as np,sys,os,glob
from multiprocessing import Pool
import beauty as B
fs=sorted(glob.glob(sys.argv[1]+'/*.jpg'));OUT=sys.argv[2];os.makedirs(OUT,exist_ok=True)
N=len(fs);ST=10;det={}
for i in range(0,N,ST):
  b=B.detect(cv2.imread(fs[i]))
  if b is not None and b[2]>=160: det[i]=b
K=sorted(det);print('muka dikesan',len(K),'/',len(range(0,N,ST)))
box=[None]*N;w=np.zeros(N)
for i in range(N):
  a=[k for k in K if k<=i];c=[k for k in K if k>=i]
  if a and c and c[0]-a[-1]<=3*ST:
    k0,k1=a[-1],c[0];t=0 if k1==k0 else (i-k0)/(k1-k0);box[i]=(det[k0]*(1-t)+det[k1]*t).astype(int);w[i]=1
w=np.convolve(w,np.ones(9)/9,'same')
for i in range(N):  # isi kotak untuk ramp
  if box[i] is None and w[i]>0:
    j=min([k for k in range(N) if box[k] is not None],key=lambda k:abs(k-i));box[i]=box[j]
def job(i):
  img=cv2.imread(fs[i]);o=os.path.join(OUT,os.path.basename(fs[i]))
  if w[i]<0.01: cv2.imwrite(o,img,[cv2.IMWRITE_JPEG_QUALITY,95]);return
  out=B.beauty(img,box[i]).astype(np.float32);out=img*(1-w[i])+out*w[i]
  cv2.imwrite(o,np.clip(out,0,255).astype(np.uint8),[cv2.IMWRITE_JPEG_QUALITY,95])
if __name__=='__main__':
  with Pool(4) as p: p.map(job,range(N),chunksize=20)
  print('ok')
