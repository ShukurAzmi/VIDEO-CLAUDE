import json,re
W=json.load(open("words.json"))
norm=lambda s:re.sub(r"[^a-z']","",s.lower())
def find(phrase,after=0.0):
    p=[norm(x) for x in phrase.split()]
    for i in range(len(W)-len(p)+1):
        if W[i]['s']>=after-0.01 and all(norm(W[i+k]['w'])==p[k] for k in range(len(p))): return W[i]['s'],W[i+len(p)-1]['e']
    raise Exception("nf "+phrase)
def S(p,a=0): return find(p,a)[0]
def E(p,a=0): return find(p,a)[1]
for w in W:
    if norm(w['w']) in("pun","naik","harga","gram","bermula","bulan","tabiat","bil","tenang"): w['hl']=True
ev={"duration":75.55,"words":W,"headers":[],"pops":[],"pills":[],"graph":None}
h=ev["headers"]
h.append({"n":1,"title":"ILMU EMAS DULU","s":S("ilmu emas"),"e":S("kemudian")-0.15})
h.append({"n":2,"title":"MULA DENGAN YANG MAMPU","s":S("kemudian"),"e":S("rutinkan")-0.15})
h.append({"n":3,"title":"RUTINKAN SETIAP BULAN","s":S("rutinkan"),"e":S("dan fokus")-0.15})
h.append({"n":4,"title":"FOKUS PADA GRAM","s":S("dan fokus"),"e":E("tenang")+0.2})
p=ev["pops"]
p.append({"top":"KALAU TENGOK","main":"SAMPAI HABIS","color":"#F5C542","s":0.3,"e":2.7})
t=S("tunggu gaji")
p.append({"top":"TAK PERLU TUNGGU","topColor":"#fff","main":"GAJI NAIK","color":"#F5C542","s":t,"e":E("gaji naik")+0.6})
t=S("bukan emas")
p.append({"top":"BUKAN","topColor":"#E53935","main":"EMAS","color":"#fff","s":t,"e":t+1.3})
tp=S("tapi",t)
p.append({"top":"TAPI","topColor":"#fff","main":"ILMU EMAS","color":"#F5C542","s":tp,"e":E("ilmu emas")+0.8})
a=S("jangka masa panjang",30)
p.append({"top":"SESUAI UNTUK","main":"JANGKA PANJANG","color":"#fff","s":a,"e":S("harga memang")-0.1,"icon":"chart"})
a=S("yang penting")
p.append({"top":"YANG PENTING","main":"BERMULA","color":"#F5C542","s":a,"e":E("bermula",a)+0.5})
a=S("macam kita")
p.append({"top":"MACAM","main":"BAYAR BIL","color":"#fff","s":a,"e":E("bayar bil",a)+0.4})
a=S("penambahan gram")
p.append({"top":"FOKUS PADA","main":"TAMBAH GRAM","color":"#F5C542","s":a,"e":S("bukan pada")-0.1,"icon":"bar"})
a=S("bukan pada")
p.append({"top":"BUKAN","topColor":"#E53935","main":"HARGA","color":"#fff","s":a,"e":E("harga",a)+0.7})
a=S("masa depan")
p.append({"top":"UNTUK","main":"MASA DEPAN TENANG","color":"#F5C542","s":a,"e":E("tenang")+0.2,"icon":"shield"})
a=S("harga memang")
ev["graph"]={"s":a,"e":E("beli")+0.5,"title":"HARGA: TURUN NAIK"}
ev["cta"]={"text":"Follow untuk<br>ilmu emas","s":70.8,"e":75.55}
json.dump(ev,open("events.json","w"),ensure_ascii=False)
for k in("headers","pops"):
    for x in ev[k]: print(k,x.get("n",""),x.get("main",x.get("title")),round(x["s"],2),round(x["e"],2))
print("graph",ev["graph"])
