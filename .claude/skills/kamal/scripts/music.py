import numpy as np, soundfile as sf, sys
SR=44100; DUR=float(sys.argv[1]); TURN=float(sys.argv[2]); out=sys.argv[3]
bpm=84; beat=60/bpm; bar=4*beat
N=int(DUR*SR); L=np.zeros(N); R=np.zeros(N)
rng=np.random.default_rng(7)
def f(n): return 440*2**((n-69)/12)
def add(sig,t,pan=0.0,g=1.0):
    i=int(t*SR); j=min(N,i+len(sig))
    if i>=N: return
    s=sig[:j-i]*g; L[i:j]+=s*(1-pan)/1.0; R[i:j]+=s*(1+pan)/1.0
def pad(notes,d):
    t=np.arange(int(d*SR))/SR; s=np.zeros_like(t)
    for n in notes:
        for det in (-0.08,0.0,0.08):
            fr=f(n)*2**(det/12); s+=np.sin(2*np.pi*fr*t+rng.random()*6)+0.3*np.sin(4*np.pi*fr*t)
    env=np.minimum(1,t/0.9)*np.minimum(1,(d-t)/0.9); return s*env/len(notes)/3
def pluck(n,d=1.6,b=0.0):
    t=np.arange(int(d*SR))/SR; fr=f(n)
    s=sum(np.sin(2*np.pi*fr*k*t)*np.exp(-t*(2.2+k*1.8))/k**1.3 for k in range(1,6))
    return s*np.minimum(1,t/0.004)
def bass(n,d):
    t=np.arange(int(d*SR))/SR; fr=f(n)
    s=np.sin(2*np.pi*fr*t)+0.25*np.sin(4*np.pi*fr*t)
    return s*np.minimum(1,t/0.01)*np.exp(-t*3.5)
def tick(d=0.06):
    s=rng.standard_normal(int(d*SR)); s=np.diff(s,prepend=0); t=np.arange(len(s))/SR
    return s*np.exp(-t*70)
def kick():
    t=np.arange(int(0.35*SR))/SR; ph=2*np.pi*np.cumsum(50+70*np.exp(-t*30))/SR
    return np.sin(ph)*np.exp(-t*9)
dark=[[45,57,60,64],[41,57,60,65],[38,57,62,65],[40,56,59,64]]   # Am F Dm E
hope=[[41,57,60,65,69],[36,55,60,64,67],[43,55,59,62,67],[45,57,60,64,69]] # F C G Am
t=0.0; k=0
while t<DUR:
    sec= 'hope' if t>=TURN-0.01 else 'dark'
    ch=(hope if sec=='hope' else dark)[k%4]
    add(pad([n+12 for n in ch[1:]],bar+0.9),t,0,0.10 if sec=='dark' else 0.12)
    for b8 in range(8):
        tt=t+b8*beat/2
        if tt>=DUR: break
        add(bass(ch[0],beat/2),tt,0,0.22 if sec=='dark' else 0.16)
        add(tick(),tt+beat/4,0.5 if b8%2 else -0.5,0.035)
    if sec=='hope':
        arp=[ch[1]+12,ch[2]+12,ch[3]+12,ch[2]+12,ch[-1]+12,ch[3]+12,ch[2]+12,ch[1]+12]
        for i,n in enumerate(arp): add(pluck(n),t+i*beat/2,(-0.3 if i%2 else 0.3),0.09)
        for b in range(4): add(kick(),t+b*beat,0,0.18 if b%2==0 else 0.08)
    else:
        for b in (0,2): add(kick(),t+b*beat,0,0.12)
    t+=bar; 
    if sec=='hope' and t-bar<TURN: k=0
    k+=1
# switch section phrase reset handled above; gentle reverb via comb
def verb(x):
    y=x.copy()
    for dly,g in ((0.031,.35),(0.047,.3),(0.071,.25),(0.113,.2)):
        d=int(dly*SR); y[d:]+=x[:-d]*g
    return y
L=verb(L); R=verb(R[::1])
st=np.stack([L,R],1); st/=np.abs(st).max()*1.25
fade=int(2.5*SR); st[-fade:]*=np.linspace(1,0,fade)[:,None]; st[:int(.5*SR)]*=np.linspace(0,1,int(.5*SR))[:,None]
sf.write(out,st,SR)
