# Builds timeline.json from word timings. Usage: python3 build_timeline.py audio/words_X.json DURATION
import json,re,sys
WF=sys.argv[1] if len(sys.argv)>1 else 'audio/words.json'
words=json.load(open(WF))['words']
W=[]
for i,w in enumerate(words):
    t=w['text']
    if i==1: t='ni,'
    if t=='bank.': t='bang.'
    W.append((t,w['start_ms']/1000,w['end_ms']/1000))
DUR=float(sys.argv[2]) if len(sys.argv)>2 else W[-1][2]+1.5
def find(text,after=0):
    for i in range(after,len(W)):
        if W[i][0].rstrip('.,?!')==text: return i
    raise ValueError(text)
def seq(*ts):  # index of first word of a phrase
    for i in range(len(W)-len(ts)+1):
        if all(W[i+k][0].rstrip('.,?!')==ts[k] for k in range(len(ts))): return i
    raise ValueError(ts)
st=lambda i:W[i][1]; en=lambda i:W[i][2]
cut=lambda i:round((W[i-1][2]+W[i][1])/2,3)   # boundary just before word i
iNight=seq('Tahun','2016'); iDining=seq('Satu','malam'); iIbu=seq('Banyaknya'); iIbuEnd=seq('sebanyak','tu')+1
iDecide=seq('Encik','Hakim','buat'); iMamak=seq('Kawan-kawan'); iF1=seq('RM100','je'); iF1End=seq('boleh','dapat')+1
iMont=seq('Tahun','berganti'); iChart=seq('Harga','emas'); iReveal=seq('10','tahun','kemudian'); iValue=seq('Tapi','nilai')
iHug=seq('Ayah','macam'); iAyah=seq('Ayah','bukan'); iAyahEnd=seq('mula','awal')+1; iShop=seq('Anak','kita'); iJom=seq('Jom','mula')
NAME=W[2][0].rstrip('.,')
b=[0,cut(iNight),cut(iDining),cut(iDecide),cut(iMamak),cut(iMont),cut(iChart),cut(iReveal),cut(iHug),cut(iShop),DUR]
ids=['uni','night','dining','decide','mamak','montage','chart','reveal','hug','shop']
shots=[(ids[k],b[k],b[k+1]) for k in range(10)]
T=lambda c,x: {'cls':c,'text':x}
e=lambda x:round(x-0.15,3)
titles=[
 (0.3,e(b[1]),[T('big','HARI PENDAFTARAN'),T('sub',f'{NAME} masuk universiti')]),
 (b[1]+0.15,e(b[2]),[T('big','10 TAHUN SEBELUMNYA'),T('sub','2016 · Gaji RM3,000 sebulan')]),
 (b[2]+0.3,st(iIbu)-0.1,[T('sub','Kos belajar ijazah'),T('gold','±RM40,000')]),
 (st(iIbu),e(b[3]),[T('quote','“Banyaknya, bang…<br>mana nak cari?”')]),
 (b[3]+0.25,e(b[4]),[T('gold','RM100 sebulan'),T('sub','ditukar jadi emas')]),
 (b[4]+0.15,e(b[5]),[T('quote','“Seratus ringgit je?”')]),
 (b[5]+0.2,e(b[6]),[T('big','TAHUN BERGANTI…'),T('sub','tapi dia tak pernah berhenti')]),
 (b[6]+0.2,e(b[7]),[T('sub','Harga emas segram'),T('gold','±RM170 → ±RM620'),T('small','*anggaran')]),
 (b[7]+0.15,st(iValue)-0.1,[T('big','10 TAHUN KEMUDIAN'),T('sub','Jumlah disimpan: RM12,000')]),
 (st(iValue)-0.1,e(b[8]),[T('sub','Nilai emas sekarang'),T('gold','±RM25,000+'),T('small','*anggaran; harga emas berubah-ubah')]),
 (b[8]+0.4,st(iAyah)-0.1,[T('quote','“Ayah, macam mana<br>ayah sempat simpan?”')]),
 (st(iAyah)-0.1,e(b[9]),[T('quote','“Ayah bukan orang kaya.<br>Ayah cuma mula awal.”')]),
 (st(iJom)-0.1,DUR,[T('big','JOM SIMPAN EMAS'),T('sub','untuk anak, dari sekarang')]),
]
subs=[];cur=[]
for w in W:
    cur.append(w)
    if re.search(r'[.,?!]$',w[0]) or len(cur)==2 or len(' '.join(x[0] for x in cur))>14: subs.append(cur); cur=[]
if cur: subs.append(cur)
S=[]
for k,c in enumerate(subs):
    s0=c[0][1]; e0=c[-1][2]; nxt=subs[k+1][0][1] if k+1<len(subs) else e0+0.8
    S.append({'start':round(s0,3),'end':round(min(nxt,e0+0.5),3),'text':' '.join(re.sub(r'^(RM[\d,]+|\d{2,4})',r'<b>\1</b>',x[0]) for x in c)})
tl={'duration':DUR,'shots':[{'id':a,'start':x,'end':y} for a,x,y in shots],
    'titles':[{'start':round(x,3),'end':round(y,3),'lines':l} for x,y,l in titles],'subs':S,
    'talk':[{'who':'ibu','start':st(iIbu),'end':en(iIbuEnd)},{'who':'f1','start':st(iF1),'end':en(iF1End)},{'who':'aiman','start':st(iHug),'end':en(iAyah-1)},{'who':'ayah','start':st(iAyah),'end':en(iAyahEnd)}],
    'fades':[{'at':b[1],'dur':0.3},{'at':b[7],'dur':0.3}]}
json.dump(tl,open('timeline.json','w'),ensure_ascii=False,indent=1)
print('DUR',DUR,'shots',[(a,round(x,2)) for a,x,_ in shots]); print('talk',tl['talk'])
