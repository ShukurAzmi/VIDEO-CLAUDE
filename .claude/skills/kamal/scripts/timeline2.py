import json
from timeline import SEGS as SEGS1, m as m1
P=json.load(open('pauses.json'))
START,END=0.98,70.26
CUTS=[]  # (a,b) source ranges to remove
for s,e in P:
    if e<=START or s>=END: continue
    if e-s>=0.14:
        a=s+0.06; b=e-0.05
        if b-a>0.04: CUTS.append((a,b))
CUTS+= [(15.95,16.36),(60.46,61.18),(61.60,62.36),(43.62,44.02)]
CUTS.sort()
# merge
M=[]
for a,b in CUTS:
    if M and a<=M[-1][1]: M[-1]=(M[-1][0],max(M[-1][1],b))
    else: M.append((a,b))
SEGS=[];c=START
for a,b in M:
    if a>c: SEGS.append((round(c,3),round(a,3)))
    c=max(c,b)
SEGS.append((round(c,3),END))
OUTRO=1.4
def m2(t):
    o=0
    for a,b in SEGS:
        if t<a: return o
        if t<=b: return o+t-a
        o+=b-a
    return o
DUR=sum(b-a for a,b in SEGS)+OUTRO
def old2new(t_old):
    # old output -> source -> new output
    o=0
    for a,b in SEGS1:
        d=b-a
        if t_old<=o+d: return m2(a+t_old-o)
        o+=d
    return m2(END)+(t_old-o)
if __name__=='__main__':
    json.dump({'segs':SEGS,'segs1':SEGS1,'dur':DUR,'outro':OUTRO},open('segs2.json','w'))
    print(len(SEGS),'segments, dur',round(DUR,2),'(v1 69.67)')
    print([ (round(a,2),round(b,2)) for a,b in M])
