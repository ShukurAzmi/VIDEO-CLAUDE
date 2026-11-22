import json,re
words=json.load(open('audio/words.json'))['words']
fix={0:None}
W=[]
for i,w in enumerate(words):
    t=w['text']
    if i==1: t='ni,'
    if t=='bank.': t='bang.'
    W.append((t,w['start_ms']/1000,w['end_ms']/1000))
DUR=79.0
shots=[('uni',0,9.45),('night',9.45,16.7),('dining',16.7,27.35),('decide',27.35,33.35),('mamak',33.35,38.2),('montage',38.2,44.0),('chart',44.0,50.35),('reveal',50.35,58.9),('hug',58.9,67.35),('shop',67.35,DUR)]
T=lambda c,x: {'cls':c,'text':x}
titles=[
 (0.3,9.3,[T('big','HARI PENDAFTARAN'),T('sub','Aiman masuk universiti')]),
 (9.6,16.6,[T('big','10 TAHUN SEBELUMNYA'),T('sub','2016 · Gaji RM3,000 sebulan')]),
 (17.0,23.6,[T('sub','Kos belajar ijazah'),T('gold','±RM40,000')]),
 (23.7,27.3,[T('quote','“Banyaknya, bang…<br>mana nak cari?”')]),
 (27.6,33.3,[T('gold','RM100 sebulan'),T('sub','ditukar jadi emas')]),
 (33.5,38.1,[T('quote','“Seratus ringgit je?”')]),
 (38.4,43.9,[T('big','TAHUN BERGANTI…'),T('sub','tapi dia tak pernah berhenti')]),
 (44.2,50.3,[T('sub','Harga emas segram'),T('gold','±RM170 → ±RM620'),T('small','*anggaran')]),
 (50.5,55.0,[T('big','10 TAHUN KEMUDIAN'),T('sub','Jumlah disimpan: RM12,000')]),
 (55.0,58.8,[T('sub','Nilai emas sekarang'),T('gold','±RM25,000+'),T('small','*anggaran; harga emas berubah-ubah')]),
 (59.3,62.6,[T('quote','“Ayah, macam mana<br>ayah sempat simpan?”')]),
 (62.8,67.3,[T('quote','“Ayah bukan orang kaya.<br>Ayah cuma mula awal.”')]),
 (71.3,DUR,[T('big','JOM SIMPAN EMAS'),T('sub','untuk anak, dari sekarang')]),
]
# subtitle chunks: max 2 words, break after punctuation
subs=[];cur=[]
def flush():
    global cur
    if cur: subs.append(cur); cur=[]
for w in W:
    cur.append(w)
    if re.search(r'[.,?!]$',w[0]) or len(cur)==2 or len(' '.join(x[0] for x in cur))>14: flush()
flush()
S=[]
for k,c in enumerate(subs):
    st=c[0][1]; en=c[-1][2]
    nxt=subs[k+1][0][1] if k+1<len(subs) else en+0.8
    en=min(nxt, en+0.5)
    txt=' '.join(re.sub(r'^(RM[\d,]+|\d{2,4})',r'<b>\1</b>',x[0]) for x in c)
    S.append({'start':round(st,3),'end':round(en,3),'text':txt})
tl={'duration':DUR,'shots':[{'id':a,'start':b,'end':c} for a,b,c in shots],
    'titles':[{'start':a,'end':b,'lines':l} for a,b,l in titles],'subs':S,
    'talk':[{'who':'ibu','start':23.7,'end':27.3},{'who':'f1','start':35.2,'end':37.9},{'who':'aiman','start':59.4,'end':62.2},{'who':'ayah','start':62.9,'end':67.0}],
    'fades':[{'at':9.45,'dur':0.3},{'at':50.35,'dur':0.3}]}
json.dump(tl,open('timeline.json','w'),ensure_ascii=False,indent=1)
print(len(S),'subs')
