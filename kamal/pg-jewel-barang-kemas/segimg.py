# Topeng orang (mediapipe selfie multiclass) -> PNG RGBA. guna: segimg.py in.jpg out.png
import sys,numpy as np,cv2,mediapipe as mp
from mediapipe.tasks.python import vision,BaseOptions
o=vision.ImageSegmenterOptions(base_options=BaseOptions(model_asset_path=sys.argv[3] if len(sys.argv)>3 else 'seg.tflite'),output_confidence_masks=True)
s=vision.ImageSegmenter.create_from_options(o)
im=cv2.imread(sys.argv[1]);rgb=cv2.cvtColor(im,cv2.COLOR_BGR2RGB)
r=s.segment(mp.Image(image_format=mp.ImageFormat.SRGB,data=rgb))
bg=r.confidence_masks[0].numpy_view();a=1-bg
a=cv2.GaussianBlur(np.clip((a-.3)/.4,0,1),(0,0),1.5)
out=np.dstack([im,(a*255).astype(np.uint8)]);cv2.imwrite(sys.argv[2],out)
