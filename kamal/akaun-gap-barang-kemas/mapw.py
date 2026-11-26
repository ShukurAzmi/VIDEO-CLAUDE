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
W=[w for w in W if w['s']<48.0 and not(14.3<w['s']<15.9)]  # 14.3-15.9 ulangan dibuang
# pembetulan ikut indeks masa (kapsyen sahaja; audio tak diubah)
FIXT={2.94:'akaun',5.06:'dinar',10.84:'PG JEWEL,',11.68:'khas',13.12:'akaun',21.92:'tuan?',24.18:'akaun',28.78:'dinar.',34.68:'tuan',37.48:'akaun',39.8:'PG JEWEL.',42.22:'akaun'}
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
