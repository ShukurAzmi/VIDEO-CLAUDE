# Peta masa perkataan ke output + betulkan salah dengar Whisper (kapsyen sahaja)
import json
S=json.load(open('segs.json'));W=json.load(open('words.json'))
def mp(t):
  best=None
  for (s,e),o in zip(S['segs'],S['off']):
    if t<s: return o if best is None else best
    if t<=e: return o+t-s
    best=o+e-s
  return best
W=[w for w in W if w['s']<97.0]
# pembetulan ikut indeks masa (kapsyen sahaja; audio tak diubah)
FIXT={11.26:'slip',40.62:'penyimpan',65.82:'RM100,',65.98:None,67.54:'mula',67.88:'top',67.92:'up',68.3:None,68.56:'akaun',69.26:'GAP',70.36:'gold,',86.82:'paksaan.'}
out=[]
for i,w in enumerate(W):
  w=dict(w);t=w['w']
  if w['s']==68.3 and t=='-tuan': continue
  if w['s'] in FIXT and not(t=='dekat'):
    if FIXT[w['s']] is None:
      if out: out[-1]['e']=round(mp(w['e']),2)
      continue
    w['w']=FIXT[w['s']]
  if t.startswith('-') and out: out[-1]['w']+=t;out[-1]['e']=round(mp(w['e']),2);continue
  w['s']=round(mp(w['s']),2);w['e']=round(mp(w['e']),2)
  if out and w['s']<=out[-1]['s']: w['s']=round(out[-1]['s']+.01,2)
  if w['e']<w['s']+.08: w['e']=round(w['s']+.08,2)
  out.append(w)
json.dump(out,open('words_out.json','w'))
print(' '.join(f"{w['w']}@{w['s']}" for w in out))
