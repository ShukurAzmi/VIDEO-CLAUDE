import sys,soundfile as sf,torch
from df.enhance import enhance,init_df
m,st,_=init_df(model_base_dir=sys.argv[4])
a,sr=sf.read(sys.argv[1],dtype='float32');assert sr==48000
x=torch.from_numpy(a)[None]
y=enhance(m,st,x,atten_lim_db=(None if sys.argv[3]=='none' else float(sys.argv[3])))
sf.write(sys.argv[2],y[0].numpy(),48000)
