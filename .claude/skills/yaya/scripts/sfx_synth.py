import numpy as np, soundfile as sf
SR=48000; rng=np.random.default_rng(3)
def T(d): return np.arange(int(d*SR))/SR
def norm(x,g=.9): return x/np.abs(x).max()*g
def lp(x,a):  # one-pole lowpass, a in (0,1)
    y=np.zeros_like(x); s=0.
    for i,v in enumerate(x): s+=a*(v-s); y[i]=s
    return y
def bp_noise(d,f0,f1,q=.5):
    n=rng.standard_normal(int(d*SR)); X=np.fft.rfft(n); fr=np.fft.rfftfreq(len(n),1/SR)
    t=T(d); out=np.zeros(len(n))
    # time-varying via chunks
    ch=64; L=len(n)//ch+1
    for k in range(ch):
        a,b=k*L,min(len(n),(k+1)*L)
        if a>=len(n): break
        fc=f0*(f1/f0)**(k/ch); m=np.exp(-((np.log(fr+1)-np.log(fc))**2)/(2*q*q))
        seg=np.fft.irfft(X*m,len(n))[a:b]; out[a:b]=seg
    return out
def save(n,x): sf.write(f'sfx/{n}.wav',np.stack([x,x],1).astype(np.float32),SR)
# whoosh
d=.6;t=T(d);env=np.sin(np.pi*np.clip(t/d,0,1))**2;save('whoosh',norm(bp_noise(d,400,3500,.6)*env,.8))
# pop
d=.12;t=T(d);f=900*np.exp(-t*30)+300;save('pop',norm(np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-t*40),.7))
# tap
d=.06;t=T(d);save('tap',norm((rng.standard_normal(len(t))*.5+np.sin(2*np.pi*2200*t))*np.exp(-t*120),.7))
# impact boom
d=1.6;t=T(d);ph=2*np.pi*np.cumsum(38+90*np.exp(-t*12))/SR;b=np.sin(ph)*np.exp(-t*2.5);n=lp(rng.standard_normal(len(t)),.08)*np.exp(-t*9)
save('impact',norm(np.tanh(2*(b+.6*n)),.95))
# riser
d=2.0;t=T(d);f=200*2**(t*2.2);s=np.sin(2*np.pi*np.cumsum(f)/SR)*.4+bp_noise(d,300,6000,.5)*1.2;save('riser',norm(s*(t/d)**2,.8))
# shimmer
d=2.2;t=T(d);s=np.zeros_like(t)
for k in range(14):
    st=k*.09; fr=[2093,2349,2637,3136,3520,4186][k%6]*(1+.003*k); m=t>=st; tt=t[m]-st
    s[m]+=np.sin(2*np.pi*fr*tt)*np.exp(-tt*3)*(1-k/20)
save('shimmer',norm(s*np.minimum(1,(d-t)/.5),.6))
# success 2-note ding
d=1.2;t=T(d);s=np.zeros_like(t)
for st,fr in ((0,1318.5),(.12,1975.5)):
    m=t>=st;tt=t[m]-st;s[m]+=(np.sin(2*np.pi*fr*tt)+.3*np.sin(4*np.pi*fr*tt))*np.exp(-tt*4)
save('success',norm(s,.7))
# cash: bell + coin rattle + drawer thunk
d=1.0;t=T(d);bell=sum(np.sin(2*np.pi*f*t)*np.exp(-t*5)/(i+1) for i,f in enumerate((2637,3951,5274)))
rat=np.zeros_like(t)
for k in range(18):
    st=.12+rng.random()*.35; m=t>=st; tt=t[m]-st; rat[m]+=np.sin(2*np.pi*(4000+rng.random()*3000)*tt)*np.exp(-tt*60)*.5
th=np.sin(2*np.pi*90*t)*np.exp(-t*20);save('cash',norm(bell+rat+th,.8))
# buzzer wrong
d=.55;t=T(d);s=np.sign(np.sin(2*np.pi*140*t))*.5+np.sign(np.sin(2*np.pi*147*t))*.5;save('buzzer',norm(lp(s,.2)*np.minimum(1,(d-t)/.05),.6))
# fall (descending coins/tone)
d=1.4;t=T(d);f=900*np.exp(-t*1.6);s=np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-t*1.2)+.3*np.sin(2*np.pi*np.cumsum(f*1.5)/SR)*np.exp(-t*1.5);save('fall',norm(s,.6))
# heartbeat
d=1.4;t=T(d);s=np.zeros_like(t)
for st,a in ((0,1),(.28,.7)):
    m=t>=st;tt=t[m]-st;s[m]+=np.sin(2*np.pi*np.cumsum(45+40*np.exp(-tt*25))/SR)*np.exp(-tt*14)*a
save('heart',norm(np.tanh(3*s),.9))
# ticking
d=2.0;t=T(d);s=np.zeros_like(t)
for k in range(8):
    st=k*.25;m=t>=st;tt=t[m]-st;s[m]+=np.sin(2*np.pi*(3200 if k%2 else 2600)*tt)*np.exp(-tt*150)
save('tick',norm(s,.6))
# scratch + wah wah fail
d=1.6;t=T(d);sc=bp_noise(.25,3000,600,.4)*np.sin(np.pi*np.clip(T(.25)/.25,0,1));s=np.zeros_like(t);s[:len(sc)]+=norm(sc,.7)
for i,(st,f0) in enumerate(((.35,392),(.65,370),(.95,349))):
    dd=.3 if i<2 else .6;m=(t>=st)&(t<st+dd);tt=t[m]-st;f=f0*(1-.06*tt/dd)
    w=sum(np.sin(2*np.pi*np.cumsum(f*k)/SR)/k for k in range(1,6));s[m]+=w*.25*np.minimum(1,(dd-tt)/.05)*(1+.3*np.sin(2*np.pi*6*tt))
save('fail',norm(s,.6))
# notification ding
d=.9;t=T(d);save('ding',norm(np.sin(2*np.pi*1760*t)*np.exp(-t*6)+.4*np.sin(2*np.pi*2640*t)*np.exp(-t*8),.6))
print('ok')
