import json,re
SEGS=[(0.90,5.86),(6.02,15.12),(15.24,33.02),(33.22,50.26),(50.40,53.08),(53.40,61.74),(61.90,70.26)]
OUTRO=1.4
def m(t):
    """source time -> output time"""
    o=0
    for a,b in SEGS:
        if t<a: return o
        if t<=b: return o+t-a
        o+=b-a
    return o
DUR=sum(b-a for a,b in SEGS)+OUTRO
FIX=[ # (seg index in tr.json, corrected text)
"Duit yang kita kumpul bertahun-tahun selama ni, boleh hilang dalam satu malam.",
"Disebabkan satu mesej sahaja.",
"So, tuan-tuan, sila berhati-hati.",
"Kita kena ingat, kita simpan duit selama ni, untuk apa tuan-tuan?",
"Untuk in case in future, kita ni akan jatuh sakit ke, kehilangan pekerjaan ke,",
"ataupun benda yang kita tak expect langsung.",
"Tapi tuan-tuan, scam ni sangat bijak.",
"Sebab tu dia akan datang dekat kita, dia akan cakap,",
"masuk sikit je, esok confirm dah untung.",
"So, bila kita tak ada ilmu, kita sendiri yang akan percaya kata scam tu.",
"Bila duit pun dah hilang, sakit hati pun timbul, simpanan kita pun dah lesap,",
"nak cerita dengan orang pun, kita jadi segan, jadi malu.",
"So, terpaksa pendam sendiri.",
"So, tuan-tuan, kalau yang berjanji kata untung tetap, suruh cepat-cepat join,",
"suruh orang lain masuk, sila elak.",
"Simpanan ni tuan-tuan, tak semestinya dalam bentuk duit je.",
"Kita boleh alihkan simpanan kita ke dalam bentuk emas.",
"So, kalau tuan-tuan rasa video saya ni bermanfaat untuk anda,",
"anda boleh share kepada rakan-rakan anda dan kalau anda nak bermula",
"dan buka akaun emas Public Gold, boleh klik link in bio.",
]
HL={'bertahun-tahun','satu','malam','mesej','berhati-hati','sakit','pekerjaan','scam','bijak','sikit','untung','ilmu','percaya','hilang','lesap','segan','malu','pendam','tetap','join','elak','emas','simpanan','share','public','gold','link','bio','duit','bermanfaat'}
if __name__=='__main__':
    tr=json.load(open('tr.json'))[:20]
    words=[]
    for seg,txt in zip(tr,FIX):
        toks=txt.split(); ws=seg['w']
        if len(toks)==len(ws): times=[(w['s'],w['e']) for w in ws]
        else:
            s,e=ws[0]['s'],ws[-1]['e']; L=[len(x)+2 for x in toks]; T=sum(L); c=s; times=[]
            for l in L: d=(e-s)*l/T; times.append((c,c+d)); c+=d
        for tok,(s,e) in zip(toks,times):
            if e<=s: e=s+0.12
            if s>70.26: continue
            clean=re.sub(r'[^\w-]','',tok.lower())
            words.append({'w':re.sub(r'[,.?]','',tok).upper(),'s':round(m(s),3),'e':round(m(min(e,70.26)),3),'hl':clean in HL})
    json.dump({'duration':round(DUR,3),'words':words},open('words.json','w'),ensure_ascii=False)
    print(DUR,len(words)); print([ (round(m(a),2)) for a,b in SEGS])
