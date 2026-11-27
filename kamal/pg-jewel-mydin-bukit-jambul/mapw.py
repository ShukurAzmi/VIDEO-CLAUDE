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
W=[w for w in W if 3.4<w['s']<41 and not (31.7<=w['s']<35.5)]
W.insert([i for i,w in enumerate(W) if w['s']>35][0],dict(w='TUAN-TUAN',s=35.12,e=35.98))
# pembetulan ikut indeks masa (kapsyen sahaja; audio tak diubah)
FIXT={4.38:'TUAN PUAN',6.6:'GOLD',7.24:'COIN',8.5:None,9.58:'TIGER.',10.98:'TUAN PUAN',12.46:'BELAH',16.4:None,16.9:'999.9,',17.18:None,18.36:'TUAN-TUAN?',26.2:None,26.0:'BIASALAH,',38.05:'BOLEH.',35.73:None}
out=[]
for i,w in enumerate(W):
  w=dict(w);t=w['w']
  if w['s'] in FIXT :
    if FIXT[w['s']] is None:
      if out: out[-1]['e']=round(mp(w['e']),2)
      continue
    w['w']=FIXT[w['s']]
    if t.startswith('-') and out: out[-1]['w']+=t;out[-1]['e']=round(mp(w['e']),2);continue
  if t.startswith('-') and out: out[-1]['w']+=t;out[-1]['e']=round(mp(w['e']),2);continue
  w['s']=round(mp(w['s']),2);w['e']=round(mp(w['e']),2)
  if out and w['s']<=out[-1]['s']: w['s']=round(out[-1]['s']+.01,2)
  if w['e']<w['s']+.08: w['e']=round(w['s']+.08,2)
  out.append(w)
json.dump(out,open('words_out.json','w'))
print(' '.join(f"{w['w']}@{w['s']}" for w in out))
