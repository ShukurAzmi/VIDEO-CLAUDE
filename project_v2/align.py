import json,wave,numpy as np,re
chunks=[(0,21.8,"Kalau anda tengok video ni sampai habis, mungkin Allah dah gerakkan hati anda untuk bermula. Saya tak nak paksa sesiapa pun, tapi saya cuma nak ingatkan, yang anda tak perlu pun nak tunggu gaji naik, anda tak perlu pun nak tunggu harga yang paling sempurna. Pesan mentor saya, Tuan Muhammad Sufi Syafi'in, bukan emas yang membuatkan kita berjaya, tapi"),
(21.8,38.0,"ilmu emas. Jadi, mulakan dengan ilmu yang betul. Fahami bahawa ilmu emas ini bukan untuk simpanan jangka masa pendek, tapi dia sesuai untuk jangka masa panjang. Harga memang akan ada turun naik, dan ada perbezaan harga jual dan beli."),
(38.0,56.96,"Kemudian, mulakan dengan jumlah yang mampu. Ikut bajet anda masing-masing, tak perlu besar pun, yang penting bermula. Rutinkan setiap bulan mengikut bajet anda tersendiri. Jadikan dia satu tabiat, macam kita bayar bil. Dan fokus pada penambahan gram, bukan pada"),
(56.96,75.55,"harga. Bila gram bertambah banyak, matlamat yang boleh kita capai untuk keluarga, untuk anak, untuk masa depan yang lebih tenang, insya Allah. Kalau video ini bermanfaat, boleh simpan untuk rujukan anda nanti, dan follow untuk ilmu emas yang seterusnya, insya Allah. Jumpa lagi.")]
w=wave.open("v1.wav");x=np.frombuffer(w.readframes(w.getnframes()),dtype=np.int16).astype(np.float32)/32768
hop=160;n=len(x)//hop
rms=np.array([np.sqrt(np.mean(x[i*hop:(i+1)*hop]**2)+1e-12) for i in range(n)]);db=20*np.log10(rms)
thr=np.percentile(db,95)-28;act=db>thr
# close gaps <150ms, drop blips
i=0
while i<n:
    if not act[i]:
        j=i
        while j<n and not act[j]:j+=1
        if j-i<15 and i>0 and j<n: act[i:j]=True
        i=j
    else:i+=1
def syl(wd): return max(1,len(re.findall(r'[aeiouAEIOU]+',wd)))+ (0.5 if re.search(r'[.,]$',wd) else 0)
words=[]
for a,b,t in chunks:
    ws=t.split();ia=int(a*100);ib=min(n,int(b*100))
    idx=np.where(act[ia:ib])[0]+ia
    if len(idx)==0: continue
    cum=np.arange(1,len(idx)+1)/len(idx)
    wt=np.array([syl(x) for x in ws]);edges=np.concatenate([[0],np.cumsum(wt)])/wt.sum()
    for k,wd in enumerate(ws):
        s=idx[min(len(idx)-1,int(np.searchsorted(cum,edges[k],'left')))]/100
        e=idx[min(len(idx)-1,max(0,int(np.searchsorted(cum,edges[k+1],'left'))-1))]/100
        words.append({"w":wd,"s":round(s,2),"e":round(max(e,s+0.12),2)})
json.dump(words,open("words.json","w"),ensure_ascii=False)
for k,wd in enumerate(words):
    if k%1==0 and (wd['w'][0].isupper() or k%6==0): print(f"{wd['s']:.2f} {wd['w']}")
