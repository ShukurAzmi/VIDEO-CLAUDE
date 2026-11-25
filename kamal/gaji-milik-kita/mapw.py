import json
S=json.load(open('segs.json'));W=json.load(open('words.json'))
def mp(t):
  best=None
  for (s,e),o in zip(S['segs'],S['off']):
    if t<s: return o if best is None else best
    if t<=e: return o+t-s
    best=o+e-s
  return best
FIX={'Tumpen,':'Tuan puan,','tumpen':'tuan puan','Tumpen':'tuan puan','sini':'slip','mimpan':'menyimpan','cuba':None,'baliknya':'sebaliknya'}
out=[];i=0
while i<len(W):
  w=dict(W[i]);t=w['w']
  if t=='100' and W[i+1]['w']=='%': w['w']='100%';w['e']=W[i+1]['e'];i+=1
  elif t=='cuba' and W[i+1]['w']=='-cuba': w['w']='cukup-cukup';w['e']=W[i+1]['e'];i+=1
  elif t.startswith('-') and out: out[-1]['w']+=t;out[-1]['e']=round(mp(w['e']),2);i+=1;continue
  elif t=='Sebab' and W[i+1]['w']=='baliknya': w['w']='Sebaliknya';w['e']=W[i+1]['e'];i+=1
  elif t in FIX and FIX[t]: w['w']=FIX[t]
  w['s']=round(mp(w['s']),2);w['e']=round(mp(w['e']),2)
  if out and w['s']<out[-1]['s']: w['s']=out[-1]['s']+.01
  if w['e']<w['s']+.08: w['e']=w['s']+.08
  out.append(w);i+=1
json.dump(out,open('words_out.json','w'))
print(' '.join(f"{w['w']}@{w['s']}" for w in out))
