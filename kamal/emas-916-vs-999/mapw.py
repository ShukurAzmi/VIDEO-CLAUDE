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
W=[w for w in W if w['s']<81.7]
# pembetulan ikut indeks masa (kapsyen sahaja; audio tak diubah)
FIXT={13.74:'91.6%',14.12:None,15.32:None,19.62:'99.9%',20.04:None,21.24:None,32.24:'PG JEWEL.',38.6:'9%',38.9:None,51.92:'tuan puan,',53.58:'perhiasan,',54.06:None,72.52:'berilmu,',75.32:'tuan puan',77.02:'nak',79.88:'tangan',81.14:'klik link',81.54:'di bawah.'}
out=[]
for i,w in enumerate(W):
  w=dict(w);t=w['w']
  if w['s'] in FIXT :
    if FIXT[w['s']] is None:
      if out: out[-1]['e']=round(mp(w['e']),2)
      continue
    w['w']=FIXT[w['s']]
  if t=='-teman?': t=w['w']='-tuan?'
  if t.startswith('-') and out: out[-1]['w']+=t;out[-1]['e']=round(mp(w['e']),2);continue
  w['s']=round(mp(w['s']),2);w['e']=round(mp(w['e']),2)
  if out and w['s']<=out[-1]['s']: w['s']=round(out[-1]['s']+.01,2)
  if w['e']<w['s']+.08: w['e']=round(w['s']+.08,2)
  out.append(w)
json.dump(out,open('words_out.json','w'))
print(' '.join(f"{w['w']}@{w['s']}" for w in out))
