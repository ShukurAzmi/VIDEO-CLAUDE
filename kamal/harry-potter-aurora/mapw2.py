import json
S=json.load(open('segs.json'));W=json.load(open('words.json'))
def mp(t):
  best=None
  for (s,e),o in zip(S['segs'],S['off']):
    if t<s: return o if best is None else best
    if t<=e: return o+t-s
    best=o+e-s
  return best
DROP={(9.5,'Aku'),(9.74,'keluar.'),(16.0,'Ataupun'),(16.18,'beli.'),(22.5,'Edition'),(29.66,'Beli'),(12.1,'Tuan'),(12.5,'Puan,'),(15.34,'market')}
FIX={(15.04,'aircon'):'e-commerce',(28.98,'PJ'):'PG',(9.32,'Gold'):'Gold',(50.06,'Tuan'):'Tuan'}
out=[];seen=set()
for w in W:
  k=(w['s'],w['w'])
  if k in DROP or k in seen: continue
  seen.add(k)
  if w['w']=='dah' and out and out[-1]['w']=='dah': continue
  w=dict(w);w['w']=FIX.get(k,w['w'])
  if w['w'].startswith('-') and out: out[-1]['w']+=w['w'];out[-1]['e']=round(mp(w['e']),2);continue
  w['s']=round(mp(w['s']),2);w['e']=round(mp(w['e']),2)
  if out and w['s']<=out[-1]['s']: w['s']=round(out[-1]['s']+.01,2)
  if w['e']<w['s']+.08: w['e']=round(w['s']+.08,2)
  out.append(w)
# 'e-commerce (app)' -> AKAUN EMAS GAP (pembetulan Adila)
o2=[]
for w in out:
  if w['w'].lower().startswith('e-commerce'):
    p=',' if w['w'].endswith(',') else ''
    if o2 and False: pass
    s,e=w['s'],w['e']
    if o2 and o2[-1]['w'].lower().startswith('app'): pass
    d=(e-s)/3
    for i,x in enumerate(['akaun','emas','GAP'+p]): o2.append(dict(w=x,s=round(s+i*d,2),e=round(s+(i+1)*d,2)))
  elif w['w'].lower().startswith('app') and o2 and o2[-1]['w'].startswith('GAP'):
    o2[-1]['w']='GAP'+(',' if w['w'].endswith(',') else '');o2[-1]['e']=w['e']
  else: o2.append(w)
out=o2
json.dump(out,open('words_out.json','w'))
print(' '.join(f"{w['w']}@{w['s']}" for w in out))
