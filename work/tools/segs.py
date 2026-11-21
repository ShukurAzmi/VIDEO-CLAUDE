import json,re
P=json.load(open('pauses.json'))
START,END,OUTRO=0.40,87.30,1.6
CUTS=[]
for s,e in P:
    if e<=START or s>=END: continue
    if (s,e)==(62.03,63.97): CUTS.append((62.09,62.65)); continue   # keep gold-card reveal
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
FIX={'seperu':'scroll'}
HL={'pelik','rm100','susah','shopee','buy','now','malam-malam','tiktok','murahlah','diskaun','semenit','nantilah','depan','mampu','senang','senyap','bungkusan','puas','masa','keluar','lupa','perlukan','kecil','asingkan','sikit','diri','emas','simpanan','tenang','gembira','esok','kawan','diam','bermanfaat','save','share','link','bio','tiba-tiba'}
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
        words.append({'w':disp,'s':round(m(max(s,START)),3),'e':round(m(min(e,END)),3),'hl':clean in HL})
json.dump({'segs':SEGS,'dur':DUR},open('segs2.json','w'))
open('comp/segs.js','w').write(f'window.SEG2={json.dumps(SEGS)};window.SEG1=window.SEG2;window.NFRAMES={int(DUR*30)};window.FRAMEDIR="../bf2/";')
open('comp/words.js','w').write('window.WORDS='+json.dumps(words,ensure_ascii=False)+';')
print('segs',len(SEGS),'dur',round(DUR,2))
# print sentence starts in output time
for seg in json.load(open('tr.json')):
    if seg['s']<END: print(f"{m(max(seg['s'],START)):6.2f}  {seg['t']}")
print('gold', m(62.65), m(63.92))
