# SFX & muzik sintetik (ElevenLabs tiada kredit). Output: sfx/*.wav 48k stereo
import numpy as np,soundfile as sf,os,sys
SR=48000;O=sys.argv[1];os.makedirs(O,exist_ok=True)
rng=np.random.default_rng(7)
t_=lambda d:np.arange(int(SR*d))/SR
def env(n,a=0.005,r=None,k=6):
  t=np.arange(n)/SR;e=np.minimum(1,t/a)
  return e*np.exp(-k*t/(t[-1]+1e-9)) if r is None else e
def lp(x,c):  # one-pole lowpass
  a=np.exp(-2*np.pi*c/SR);y=np.zeros_like(x);s=0
  for i in range(len(x)): s=(1-a)*x[i]+a*s;y[i]=s
  return y
def save(n,x,st=0.0):
  x=x/ (np.max(np.abs(x))+1e-9)*0.9
  if st:  # pseudo stereo
    d=int(SR*0.012);r=np.concatenate([np.zeros(d),x[:-d]]);x=np.stack([x*(1-st)+r*st,r*(1-st)+x*st],1)
  else: x=np.stack([x,x],1)
  sf.write(f'{O}/{n}.wav',x.astype(np.float32),SR)
noise=lambda d:rng.standard_normal(int(SR*d))
# whoosh: noise band sweep
t=t_(0.55);n=noise(0.55);c=np.concatenate([[0],np.cumsum(1/SR*(300+5000*np.sin(np.pi*t/0.55)**2))])[:-1]
w=np.convolve(n,np.ones(6)/6,'same')*np.sin(np.pi*t/0.55)**3*(0.6+0.4*np.sin(2*np.pi*c*0.01));save('whoosh',w-lp(w,250),0.4)
# pop
t=t_(0.12);save('pop',np.sin(2*np.pi*(900-5000*t)*t)*np.exp(-t*45))
# tap
t=t_(0.08);save('tap',(np.sin(2*np.pi*1800*t)*0.6+noise(0.08)*0.3)*np.exp(-t*90))
# impact: sub boom + noise crack
t=t_(1.8);b=np.sin(2*np.pi*(38+70*np.exp(-t*6))*t)*np.exp(-t*2.2);cr=lp(noise(1.8),1800)*np.exp(-t*9)*2
save('impact',np.tanh(1.6*(b+cr)),0.2)
# stinger: dissonant low brass cluster swelling then hit
t=t_(1.6);s=sum(np.sign(np.sin(2*np.pi*f*t))*0.2 for f in (55,58.3,82.4,87.3));s=lp(s,900)*np.minimum(1,t/0.08)*np.exp(-t*1.8);save('stinger',s,0.3)
# riser: noise + rising sine 1.5s
t=t_(1.5);r=np.sin(2*np.pi*np.cumsum(200+1400*(t/1.5)**2)/SR)*0.4+ (noise(1.5)-lp(noise(1.5),1500))*0.5;save('riser',r*(t/1.5)**2,0.3)
# fall: descending tone
t=t_(1.3);f=900*np.exp(-t*1.6);save('fall',(np.sin(2*np.pi*np.cumsum(f)/SR)+0.3*np.sin(4*np.pi*np.cumsum(f)/SR))*np.exp(-t*1.2)*np.minimum(1,t/0.02))
# buzzer
t=t_(0.6);bz=np.sign(np.sin(2*np.pi*140*t))*0.5+np.sign(np.sin(2*np.pi*147*t))*0.5;save('buzzer',lp(bz,2500)*np.minimum(1,t/0.01)*np.where(t>0.52,np.exp(-(t-0.52)*60),1))
# heartbeat (2 thumps)
t=t_(1.6);h=np.zeros_like(t)
for s0 in (0,0.28,0.9,1.18):
  m=t>=s0;tt=t[m]-s0;h[m]+=np.sin(2*np.pi*(45+30*np.exp(-tt*20))*tt)*np.exp(-tt*14)*(1 if s0 in(0,0.9) else .7)
save('heart',np.tanh(2*h))
# ding
t=t_(1.2);save('ding',sum(np.sin(2*np.pi*f*t)*a*np.exp(-t*k) for f,a,k in((1318,1,3),(2637,.4,5),(3951,.2,7))))
# chime + shimmer (gold)
t=t_(2.2);x=np.zeros_like(t)
for i,f in enumerate((1568,1976,2349,2637,3136,3951)):
  m=t>=i*0.06;tt=t[m]-i*0.06;x[m]+=np.sin(2*np.pi*f*tt)*np.exp(-tt*2.5)*0.5
sh=(noise(2.2)-lp(noise(2.2),6000))*0.15*np.exp(-t*2)*(0.5+0.5*np.sin(2*np.pi*14*t));save('chime',x+sh,0.5)
# cha-ching: two bell clicks + coin jingle
t=t_(1.4);x=np.zeros_like(t)
for s0,f in((0,2100),(0.11,2800)):
  m=t>=s0;tt=t[m]-s0;x[m]+=(np.sin(2*np.pi*f*tt)+0.5*np.sin(2*np.pi*f*2.76*tt))*np.exp(-tt*6)
for k in range(14):
  s0=0.2+rng.random()*0.7;f=3000+rng.random()*3000;m=t>=s0;tt=t[m]-s0;x[m]+=np.sin(2*np.pi*f*tt)*np.exp(-tt*40)*0.3
save('chaching',x,0.4)
# stamp (rubber stamp thud)
t=t_(0.4);save('stamp',np.tanh(3*(np.sin(2*np.pi*(80+120*np.exp(-t*30))*t)*np.exp(-t*12)+lp(noise(0.4),900)*np.exp(-t*30))))
# typing / click
t=t_(0.7);x=np.zeros_like(t)
for s0 in np.arange(0,0.65,0.09)+rng.random(8)*0.02:
  m=t>=s0;tt=t[m]-s0;x[m]+=(noise(0.7)[:m.sum()]*np.exp(-tt*300))
save('typing',x)
# glitch
t=t_(0.4);g=np.sign(np.sin(2*np.pi*(200+rng.integers(0,8,len(t))//1*100)*t))*(rng.random(len(t))>0.3);save('glitch',lp(g.astype(float),5000)*np.exp(-t*4))
# swoosh-up (sparkle tick) for checklist
t=t_(0.25);save('check',np.sin(2*np.pi*np.cumsum(800+3000*t/0.25)/SR)*np.exp(-t*12))
print('ok')
