"""Synthesised SFX (fallback when ElevenLabs credits run out). Writes sfx/<name>.wav"""
import numpy as np, soundfile as sf
SR=48000; rng=np.random.default_rng(3)
T=lambda d: np.arange(int(d*SR))/SR
def env(t,a,dcy): return np.minimum(1,t/a)*np.exp(-t*dcy)
def norm(x,g=0.9): return x/np.abs(x).max()*g
def lp(x,k): return np.convolve(x,np.ones(k)/k,'same')
def pop():
    t=T(.12); f=900*np.exp(-t*30)+300; return norm(np.sin(2*np.pi*np.cumsum(f)/SR)*env(t,.002,45))
def impact():
    t=T(1.6); ph=2*np.pi*np.cumsum(38+90*np.exp(-t*12))/SR; boom=np.sin(ph)*np.exp(-t*2.6)
    n=lp(rng.standard_normal(len(t)),6)*np.exp(-t*14)*.6; return norm(np.tanh((boom+n)*2.2))
def riser():
    t=T(2.0); f=180*2**(t*1.6); s=sum(np.sin(2*np.pi*np.cumsum(f*k)/SR)/k for k in (1,1.5,2,3))
    n=rng.standard_normal(len(t)); n=n-lp(n,30); a=(t/2.0)**2.2
    x=(s*.5+n*.35)*a; x[-int(.02*SR):]*=np.linspace(1,0,int(.02*SR)); return norm(x)
def cash():
    out=np.zeros(int(1.1*SR))
    t=T(.25); n=lp(rng.standard_normal(len(t)),2)*env(t,.001,40); out[:len(t)]+=n*.5  # drawer clack
    for st,f in ((.08,2637),(.16,3136)):
        t=T(.9); b=sum(np.sin(2*np.pi*f*k*t)*np.exp(-t*(4+k*3))/k for k in (1,2.76,5.4)); i=int(st*SR); out[i:i+len(t)]+=b[:len(out)-i]*.6
    for k in range(9):  # coins
        t=T(.18); f=rng.uniform(4000,7000); i=int(rng.uniform(.2,.75)*SR); c=np.sin(2*np.pi*f*t)*np.exp(-t*35); out[i:i+len(c)]+=c[:len(out)-i]*.25
    return norm(out)
def fall():
    t=T(1.3); f=520*2**(-t*1.9); s=np.sin(2*np.pi*np.cumsum(f)/SR)+.4*np.sin(4*np.pi*np.cumsum(f)/SR)
    vib=1+.05*np.sin(2*np.pi*6*t); return norm(s*vib*np.minimum(1,t/.02)*np.minimum(1,(1.3-t)/.25))
def ding():
    out=np.zeros(int(1.0*SR))
    for st,f in ((0,1318.5),(.11,1975.5)):
        t=T(.85); b=(np.sin(2*np.pi*f*t)+.3*np.sin(2*np.pi*2*f*t))*env(t,.003,5.5); i=int(st*SR); out[i:i+len(b)]+=b[:len(out)-i]
    return norm(out)
def shimmer():
    out=np.zeros(int(1.8*SR)); notes=[1567.98,1975.53,2349.32,2637.02,3135.96,3951.07]
    for k in range(18):
        f=notes[k%6]*(2 if k>11 else 1); t=T(1.0); i=int(k*.055*SR)
        b=np.sin(2*np.pi*f*t)*env(t,.003,6); out[i:i+len(b)]+=b[:len(out)-i]*(.5+.5*rng.random())
    n=rng.standard_normal(len(out)); n=n-lp(n,8); tt=T(1.8)[:len(out)]
    out+=n*.06*np.sin(np.pi*tt/1.8); return norm(out)
def tap():
    t=T(.06); x=rng.standard_normal(len(t))*env(t,.0005,120)+np.sin(2*np.pi*1800*t)*env(t,.0005,150); return norm(x,.8)
def receipt():
    t=T(2.4); buzz=np.sign(np.sin(2*np.pi*95*t))*.3+np.sin(2*np.pi*190*t)*.3
    step=(np.sin(2*np.pi*28*t)>0.6)*1.0; n=rng.standard_normal(len(t)); n=n-lp(n,4)
    x=(buzz*.4+n*.35)*(.55+.45*lp(step,200)); x*=np.minimum(1,t/.03)*np.minimum(1,(2.4-t)/.05)
    tt=T(.12); x[-len(tt):]+=lp(rng.standard_normal(len(tt)),2)*np.exp(-tt*30)*1.5   # tear
    return norm(x,.8)
def alarm():
    out=np.zeros(int(1.3*SR))
    for k in range(3):
        t=T(.18); b=np.sign(np.sin(2*np.pi*2000*t))*.5*np.minimum(1,t/.004)*np.minimum(1,(.18-t)/.004); i=int(k*.36*SR); out[i:i+len(b)]+=b
    return norm(lp(out,3),.7)
def success():
    out=np.zeros(int(1.8*SR))
    for st,fs in ((0,[523.25,659.25,783.99]),(.16,[659.25,783.99,1046.5]),(.32,[783.99,1046.5,1318.5])):
        for f in fs:
            t=T(1.4); b=(np.sin(2*np.pi*f*t)+.25*np.sin(4*np.pi*f*t))*env(t,.01,2.6); i=int(st*SR); out[i:i+len(b)]+=b[:len(out)-i]
    return norm(out)
def heart():
    out=np.zeros(int(1.0*SR))
    for st,g in ((0,1),(.22,.7)):
        t=T(.25); ph=2*np.pi*np.cumsum(45+30*np.exp(-t*25))/SR; b=np.sin(ph)*env(t,.004,16)*g; i=int(st*SR); out[i:i+len(b)]+=b
    return norm(out)
for n,f in dict(pop=pop,impact=impact,riser=riser,cash=cash,fall=fall,ding=ding,shimmer=shimmer,tap=tap,receipt=receipt,alarm=alarm,success=success,heart=heart).items():
    x=f(); sf.write(f'sfx/{n}.wav',np.stack([x,x],1).astype(np.float32),SR)
print('ok')
