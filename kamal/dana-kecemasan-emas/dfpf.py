import sys,soundfile as sf,torch
from df.enhance import enhance,init_df
m,st,_=init_df(model_base_dir=sys.argv[3],post_filter=True)
a,sr=sf.read(sys.argv[1],dtype='float32')
y=enhance(m,st,torch.from_numpy(a)[None],atten_lim_db=None)
sf.write(sys.argv[2],y[0].numpy(),48000)
