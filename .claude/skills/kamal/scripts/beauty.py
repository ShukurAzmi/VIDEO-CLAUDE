import cv2, numpy as np, sys, os, glob
from multiprocessing import Pool
CASC = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
DEF = (330, 560, 330, 420)  # fallback face box x,y,w,h in 1080x1920 base frame
def face_box(img):
    small = cv2.resize(img, (img.shape[1]//3, img.shape[0]//3)); g = cv2.cvtColor(small, cv2.COLOR_BGR2GRAY)
    f = CASC.detectMultiScale(g, 1.1, 5, minSize=(60, 60))
    if len(f) == 0: return None
    x, y, w, h = max(f, key=lambda r: r[2]*r[3]); return (x*3, y*3, w*3, h*3)
def beautify(img, box):
    H, W = img.shape[:2]; x, y, w, h = box
    # work only on a crop around the face (fast)
    x0, y0 = max(0, int(x - .6*w)), max(0, int(y - .5*h)); x1, y1 = min(W, int(x + 1.6*w)), min(H, int(y + 1.9*h))
    c = img[y0:y1, x0:x1]; ch, cw = c.shape[:2]; fx, fy = x - x0, y - y0
    m = np.zeros((ch, cw), np.float32)
    cv2.ellipse(m, (int(fx + w/2), int(fy + h*0.55)), (int(w*0.62), int(h*0.78)), 0, 0, 360, 1.0, -1)
    ycc = cv2.cvtColor(c, cv2.COLOR_BGR2YCrCb)
    skin = cv2.inRange(ycc, (40, 133, 77), (255, 178, 130)).astype(np.float32) / 255
    skin = cv2.morphologyEx(skin, cv2.MORPH_CLOSE, np.ones((15, 15), np.uint8))
    mask = cv2.GaussianBlur(m * skin, (0, 0), 9)
    # 1) soft skin (edge-preserving), keep some texture
    sm = cv2.bilateralFilter(c, 0, 28, 9); sm = cv2.bilateralFilter(sm, 0, 22, 5)
    detail = c.astype(np.float32) - cv2.GaussianBlur(c, (0, 0), 1.2).astype(np.float32)
    out = np.clip(sm.astype(np.float32) + detail * 0.35, 0, 255).astype(np.uint8)
    # 2) de-yellow + brighten + slight rosy (natural light makeup base)
    lab = cv2.cvtColor(out, cv2.COLOR_BGR2LAB).astype(np.float32)
    lab[..., 0] = lab[..., 0] * 1.04 + 8
    lab[..., 2] = 128 + (lab[..., 2] - 128) * 0.62 - 1.5      # much less yellow
    lab[..., 1] = 128 + (lab[..., 1] - 128) * 0.95 + 2.5      # hint of pink
    # 3) blush on cheeks
    bl = np.zeros((ch, cw), np.float32)
    for cx in (0.27, 0.73):
        cv2.ellipse(bl, (int(fx + w*cx), int(fy + h*0.70)), (int(w*0.13), int(h*0.09)), 0, 0, 360, 1.0, -1)
    bl = cv2.GaussianBlur(bl, (0, 0), w*0.06) * mask
    lab[..., 1] += bl * 7; lab[..., 0] += bl * 1.5
    out = cv2.cvtColor(np.clip(lab, 0, 255).astype(np.uint8), cv2.COLOR_LAB2BGR).astype(np.float32)
    # 4) glow: soft bloom of the highlights (screen blend)
    hl = np.clip((out - 150) * 1.6, 0, 255); bloom = cv2.GaussianBlur(hl, (0, 0), 14) / 255.0
    out = 255 - (255 - out) * (1 - bloom * 0.35)
    a = (mask * 0.85)[..., None]
    res = c.astype(np.float32) * (1 - a) + out * a
    img = img.copy(); img[y0:y1, x0:x1] = np.clip(res, 0, 255).astype(np.uint8)
    return img
_last = [DEF]
def proc(args):
    src, dst, box = args
    img = cv2.imread(src); cv2.imwrite(dst, beautify(img, box), [cv2.IMWRITE_JPEG_QUALITY, 95]); return dst
def run(indir, outdir):
    os.makedirs(outdir, exist_ok=True)
    fs = sorted(glob.glob(os.path.join(indir, '*.jpg')))
    # detect faces every 3rd frame, smooth boxes over time
    raw = []
    for i, f in enumerate(fs):
        if i % 3 == 0:
            b = face_box(cv2.imread(f)); raw.append(b if b else (raw[-1] if raw else DEF))
        else: raw.append(raw[-1])
    arr = np.array(raw, np.float32); k = 9
    pad = np.pad(arr, ((k, k), (0, 0)), mode='edge'); sm = np.array([pad[i:i+2*k+1].mean(0) for i in range(len(arr))])
    jobs = [(f, os.path.join(outdir, os.path.basename(f)), tuple(int(v) for v in b)) for f, b in zip(fs, sm)]
    with Pool(4) as p: p.map(proc, jobs, chunksize=20)
    print('done', len(jobs))
if __name__ == '__main__':
    if sys.argv[1] == 'test':
        img = cv2.imread(sys.argv[2]); b = face_box(img) or DEF; print('box', b)
        cv2.imwrite(sys.argv[3], np.hstack([img, beautify(img, b)]))
    else: run(sys.argv[2], sys.argv[3])
