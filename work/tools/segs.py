import json,re
P=json.load(open('pauses.json'))
# === EDIT PER VIDEO ===
START,END,OUTRO=0.02,107.50,1.8          # source in/out (buang senyap/whisper halusinasi di hujung)
KEEP={}       # jeda yg ada aksi visual (cth tunjuk emas): potong separuh sahaja
FIX={'ekon':'akaun','ujung':'hujung','tuk-tuk':'tup-tup'}
FIXT={54.74:'CUMA',78.84:'HATI',28.26:'KENDURI',30.82:'MAHAL'}  # betulan ikut masa (sahkan dgn user)                  # betulkan salah dengar whisper (tanya user!)
# =======================
CUTS=[]
for s,e in P:
    if e<=START or s>=END: continue
    if (s,e) in KEEP: CUTS.append(KEEP[(s,e)]); continue
    a=s+0.06;b=e-0.05
    if b-a>0.04: CUTS.append((a,b))
CUTS.sort(); SEGS=[]; c=START
for a,b in CUTS:
    if a>c: SEGS.append((round(c,3),round(a,3)))
    c=max(c,b)
SEGS.append((round(c,3),END))
def m(t):
    o=0
    for a,b in SEGS:
        if t<a: return o
        if t<=b: return o+t-a
        o+=b-a
    return o
DUR=sum(b-a for a,b in SEGS)+OUTRO
HL={'duit','susah','halangan','rm100','tekad','separuh','kosong','lemah','mengalah','malas','penat','hilang','berfikir','nilai','usaha','perlukan','mampu','mudah','gagal','payah','bermanfaat','save','share','link','bio','emas','simpanan','simpan','akaun','hujung','pelik','rm100','susah','shopee','buy','now','malam-malam','tiktok','murahlah','diskaun','semenit','nantilah','depan','mampu','senang','senyap','bungkusan','puas','masa','keluar','lupa','perlukan','kecil','asingkan','sikit','diri','emas','simpanan','tenang','gembira','esok','kawan','diam','bermanfaat','save','share','link','bio','tiba-tiba'}
words=[]
for seg in json.load(open('tr.json')):
    ws=seg['w']; i=0
    while i<len(ws):
        w=ws[i]; txt=w['w'].strip(); s,e=w['s'],w['e']
        if i+1<len(ws) and ws[i+1]['w'].startswith('-'): txt+=ws[i+1]['w'].strip(); e=ws[i+1]['e']; i+=1
        i+=1
        if s>=END: continue
        clean=re.sub(r'[^\w-]','',txt.lower()); clean=FIX.get(clean,clean)
        disp=FIX.get(re.sub(r'[^\w-]','',txt.lower()),None)
        disp=(disp or re.sub(r'[,.?!]','',txt)).upper()
        if round(s,2) in FIXT: disp=FIXT[round(s,2)]; clean=disp.lower()
        words.append({'w':disp,'s':round(m(max(s,START)),3),'e':round(m(min(e,END)),3),'hl':clean in HL})
json.dump({'segs':SEGS,'dur':DUR},open('segs2.json','w'))
open('comp/segs.js','w').write(f'window.SEG2={json.dumps(SEGS)};window.SEG1=window.SEG2;window.NFRAMES={int(DUR*30)};window.FRAMEDIR="../bf2/";')
open('comp/words.js','w').write('window.WORDS='+json.dumps(words,ensure_ascii=False)+';')
print('segs',len(SEGS),'dur',round(DUR,2))
# print sentence starts in output time
for seg in json.load(open('tr.json')):
    if seg['s']<END: print(f"{m(max(seg['s'],START)):6.2f}  {seg['t']}")
for (s,e),(a,b) in KEEP.items(): print('keep visual', round(m(b),2), round(m(e),2))
