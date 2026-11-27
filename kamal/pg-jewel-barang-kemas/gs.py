# GREEN SCREEN: ganti latar belakang Adila dengan rakaman kedai. guna: gs.py <bfdir> <brfdir>
# GSW = [mula_sumber, akhir_sumber, klip, saat_mula_klip]
import sys,json,glob,os,numpy as np,cv2,mediapipe as mp
from mediapipe.tasks.python import vision,BaseOptions
GSW=[(14.0,17.95,'5630',0.3),(21.4,27.2,'5629',10.5),(48.34,54.37,'5629',0.0),(68.5,73.6,'5729',0.0)]
D=sys.argv[1];BRD=sys.argv[2] if len(sys.argv)>2 else 'brf2';S=json.load(open('segs.json'))
def fs(x):
  b=None
  for (s,e),o in zip(S['segs'],S['off']):
    if x<s: return o if b is None else b
    if x<=e: return o+x-s
    b=o+e-s
  return b
for (sa,sb,clip,co) in GSW:
  seg=vision.ImageSegmenter.create_from_options(vision.ImageSegmenterOptions(base_options=BaseOptions(model_asset_path='seg.tflite'),output_confidence_masks=True,running_mode=vision.RunningMode.VIDEO))
  a,b=fs(sa),fs(sb);f0,f1=int(a*30)+1,int(b*30)+1
  BR=sorted(glob.glob(f'{BRD}/{clip}/*.jpg'))
  for k,f in enumerate(range(f0,f1+1)):
    p=f'{D}/{f:05d}.jpg'
    if not os.path.exists(p):continue
    im=cv2.imread(p);h,w=im.shape[:2]
    r=seg.segment_for_video(mp.Image(image_format=mp.ImageFormat.SRGB,data=cv2.cvtColor(im,cv2.COLOR_BGR2RGB)),int(k*33.3))
    m=1-r.confidence_masks[0].numpy_view();m=cv2.GaussianBlur(np.clip((m-.25)/.5,0,1),(0,0),max(1,w/540))[...,None]
    bg=cv2.imread(BR[min(len(BR)-1,int(co*30)+k)]);bg=cv2.resize(bg,(w,h));bg=cv2.GaussianBlur(bg,(0,0),w/400)
    tr=min(1,k/9,(f1-f)/9);bg=bg*tr+im*(1-tr)
    out=im*m+bg*(1-m);cv2.imwrite(p,out.astype(np.uint8),[cv2.IMWRITE_JPEG_QUALITY,95])
  print('gs',clip,f0,f1,flush=True)
