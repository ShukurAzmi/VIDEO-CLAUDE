# SFX elegan sintetik (tiada bass/thump): sparkle, bell, pop2, shimmer
import numpy as np,soundfile as sf
SR=48000;rng=np.random.default_rng(3)
T=lambda d:np.arange(int(SR*d))/SR
def st(x,w=0.25):
  d=int(SR*0.012);l=x;r=np.concatenate([np.zeros(d),x])[:len(x)];return np.stack([l*(1-w)+r*w,r*(1-w)+l*w],1)
def norm(x,p=0.9):return x/np.max(np.abs(x))*p
# sparkle: butir sinus tinggi rawak 2.5-7kHz, rapat di awal
def sparkle(d=1.2,n=38):
  y=np.zeros(int(SR*d))
  for i in range(n):
    t0=(rng.random()**1.8)*d*0.6;f=rng.uniform(2500,7000);L=int(SR*rng.uniform(.08,.35));s=int(t0*SR)
    tt=np.arange(L)/SR;g=np.sin(2*np.pi*f*tt)*np.exp(-tt*rng.uniform(10,25))*np.minimum(1,tt/0.002)*rng.uniform(.3,1)
    e=min(len(y),s+L);y[s:e]+=g[:e-s]
  return norm(y,.8)
# bell: loceng kaca lembut (partial inharmonik), ekor panjang
def bell(f0=1318.5,d=1.8):
  t=T(d);y=0
  for k,a,dec in [(1,1,3),(2.76,.45,5),(5.4,.25,8),(8.93,.12,12),(2,.3,4)]:
    y=y+a*np.sin(2*np.pi*f0*k*t)*np.exp(-t*dec)
  y*=np.minimum(1,t/0.003);return norm(y,.8)
def chord(d=2.0):  # dua loceng (arpeggio E6-B6) + kilauan
  y=np.zeros(int(SR*d));b1=bell(1318.5,d);b2=bell(1975.5,d-.09)
  y+=b1;y[int(.09*SR):]+=b2[:len(y)-int(.09*SR)]*.8
  s=sparkle(1.0,20);y[:len(s)]+=s*.35;return norm(y,.85)
def pop2(): # pop halus bernada tinggi
  t=T(.18);f=900+1400*np.exp(-t*40);y=np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-t*30)*np.minimum(1,t/.002);return norm(y,.7)
def shimmer(d=1.4): # sapuan kilauan naik (ganti whoosh) — lembut
  t=T(d);y=np.zeros_like(t)
  for k in range(10):
    f=np.linspace(1800,5200,len(t))*(1+k*.013);y+=np.sin(2*np.pi*np.cumsum(f)/SR+k)
  env=np.sin(np.pi*np.clip(t/d,0,1))**2;y=y*env*(0.5+0.5*np.sin(2*np.pi*14*t))
  return norm(y,.5)
for n,x in [('sparkle',sparkle()),('bell',chord()),('pop2',pop2()),('shimmer',shimmer())]:
  sf.write(f'sfx/{n}.wav',st(x).astype(np.float32),SR)
print('ok')
