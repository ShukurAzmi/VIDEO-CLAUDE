"""Yaya timeline for Adila 'Kenapa susah simpan duit'. Source time -> output time."""
import json,re
START,END,OUTRO=4.62,80.50,1.4
P=json.load(open('pauses.json'))
CUTS=[]
for s,e in P:
    if e<=START or s>=END: continue
    if e-s>=0.14:
        a=s+0.06; b=e-0.05
        if b-a>0.04: CUTS.append((a,b))
CUTS.sort(); M=[]
for a,b in CUTS:
    if M and a<=M[-1][1]: M[-1]=(M[-1][0],max(M[-1][1],b))
    else: M.append((a,b))
SEGS=[];c=START
for a,b in M:
    if a>c: SEGS.append((round(c,3),round(a,3)))
    c=max(c,b)
if END-c>0.05: SEGS.append((round(c,3),END))
SEGS=[(a,min(b,END)) for a,b in SEGS if min(b,END)-a>0.04]
DUR=sum(b-a for a,b in SEGS)+OUTRO
def m(t):
    o=0
    for a,b in SEGS:
        if t<a: return o
        if t<=b: return o+t-a
        o+=b-a
    return o+(t-END if t>END else 0)
FIX={'riuk':'reward','pelbagai':'pelbagai'}
HL={'duit','simpan','simpanan','emas','gaji','reward','penat','layak','keperluan','gembira','sayang','asingkan','link','hargai','susah','kecil','bermanfaat','share','save','sendiri','banyak','larat'}
if __name__=='__main__':
    tr=json.load(open('tr_raw.json')); words=[]
    for s in tr:
        for w in s['words']:
            t=w['w'].strip(); t=FIX.get(t,t); words.append([t,w['s'],w['e']])
    # 'Memang empat' -> 'bermanfaat'
    for i in range(len(words)-1):
        if words[i] and words[i][0]=='Memang' and words[i+1][0]=='empat': words[i]=['bermanfaat',words[i][1],words[i+1][2]]; words[i+1]=None
    words=[w for w in words if w]
    mg=[]
    for w in words:
        if w[0].startswith('-') and mg: mg[-1]=[mg[-1][0]+w[0],mg[-1][1],w[2]]
        else: mg.append(w)
    words=mg
    out=[]
    for t,s,e in words:
        if t=='So,': s=max(s,e-0.3)
        clean=re.sub(r'[^\w-]','',t.lower())
        out.append({'w':re.sub(r'[,.?]','',t).upper(),'src':round(s,3),'s':round(s,3),'e':round(e,3),'hl':clean in HL})
    json.dump(out,open('words_src.json','w'),ensure_ascii=False)
    json.dump({'segs':SEGS,'dur':DUR,'outro':OUTRO},open('segs2.json','w'))
    open('comp/segs.js','w').write('window.SEG2='+json.dumps(SEGS)+';window.SEG1=window.SEG2;window.NFRAMES='+str(int(DUR*30)+2)+';')
    open('comp/words.js','w').write('window.WORDS='+json.dumps(out,ensure_ascii=False)+';')
    print(len(SEGS),'segs dur',round(DUR,2)); print(' '.join(w['w'] for w in out))
