# GREEN SCREEN: ganti latar belakang Adila dengan rakaman kedai (5729) dalam julat masa sumber. guna: gs.py <bfdir>
import sys,json,glob,os,numpy as np,cv2,mediapipe as mp
from mediapipe.tasks.python import vision,BaseOptions
D=sys.argv[1];S=json.load(open('segs.json'))
def fs(x):
  b=None
  for (s,e),o in zip(S['segs'],S['off']):
    if x<s: return o if b is None else b
    if x<=e: return o+x-s
    b=o+e-s
  return b
a,b=fs(68.5),fs(73.6);f0,f1=int(a*30)+1,int(b*30)+2
seg=vision.ImageSegmenter.create_from_options(vision.ImageSegmenterOptions(base_options=BaseOptions(model_asset_path='seg.tflite'),output_confidence_masks=True,running_mode=vision.RunningMode.VIDEO))
BR=sorted(glob.glob('brf/5729/*.jpg'))
for k,f in enumerate(range(f0,f1+1)):
  p=f'{D}/{f:05d}.jpg'
  if not os.path.exists(p):continue
  im=cv2.imread(p);h,w=im.shape[:2]
  r=seg.segment_for_video(mp.Image(image_format=mp.ImageFormat.SRGB,data=cv2.cvtColor(im,cv2.COLOR_BGR2RGB)),int(k*33.3))
  m=1-r.confidence_masks[0].numpy_view();m=cv2.GaussianBlur(np.clip((m-.25)/.5,0,1),(0,0),max(1,w/540))[...,None]
  bg=cv2.imread(BR[min(len(BR)-1,k+20)]);bg=cv2.resize(bg,(w,h));bg=cv2.GaussianBlur(bg,(0,0),w/360)
  # masuk/keluar lembut 0.3s
  tr=min(1,k/9,(f1-f)/9);bg=(bg*tr+im*(1-tr))
  out=im*m+bg*(1-m);cv2.imwrite(p,out.astype(np.uint8),[cv2.IMWRITE_JPEG_QUALITY,95])
print('gs',f0,f1)
