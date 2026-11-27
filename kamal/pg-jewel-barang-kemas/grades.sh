# Film-look grades (anggaran gaya, bukan LUT rasmi)
declare -A G
G[0_NEUTRAL]="$(cat ref/grade.txt)"
G[1_THE_FATHER]="huesaturation=saturation=-0.35:colors=m+b:strength=1,eq=contrast=1.0:saturation=0.78:gamma=1.02,colorbalance=rs=-0.03:gs=0.01:bs=0.05:rm=-0.02:bm=0.03:rh=0.01:bh=0.01,curves=all='0/0.05 0.5/0.5 1/0.94',vignette=PI/6"
G[2_THE_REVENANT]="huesaturation=saturation=-0.4:colors=m+b:strength=1,eq=contrast=1.06:saturation=0.6:gamma=0.98,colorbalance=rs=-0.05:bs=0.07:rm=-0.04:gm=0.0:bm=0.05:rh=-0.02:bh=0.03,curves=all='0/0.02 0.25/0.2 0.5/0.48 1/0.97',vignette=PI/5"
G[3_DUNE]="huesaturation=saturation=-0.5:colors=m+b:strength=1,eq=contrast=0.97:saturation=0.72:gamma=1.03,colorbalance=rs=0.04:gs=0.02:bs=-0.03:rm=0.05:gm=0.02:bm=-0.06:rh=0.03:bh=-0.04,curves=all='0/0.07 0.5/0.52 1/0.93',vignette=PI/6"
G[4_JOKER]="huesaturation=saturation=-0.4:colors=m+b:strength=1,eq=contrast=1.08:saturation=0.85,colorbalance=rs=-0.04:gs=0.03:bs=0.04:rm=0.02:gm=0.04:bm=-0.04:rh=0.03:gh=0.02:bh=-0.05,curves=all='0/0.02 0.3/0.26 0.6/0.6 1/0.95',vignette=PI/4.5"
G[5_AMELIE]="huesaturation=saturation=-0.35:colors=m+b:strength=1,eq=contrast=1.06:saturation=1.18:gamma=1.0,colorbalance=rs=-0.02:gs=0.04:bs=-0.03:rm=0.04:gm=0.03:bm=-0.05:rh=0.05:gh=0.02:bh=-0.05,curves=all='0/0.03 0.5/0.52 1/0.98',vignette=PI/5"
G[6_HER]="huesaturation=saturation=-0.45:colors=m+b:strength=1,eq=contrast=0.94:saturation=0.92:gamma=1.04,colorbalance=rs=0.04:gs=-0.01:bs=-0.02:rm=0.06:gm=-0.01:bm=-0.03:rh=0.04:bh=-0.01,curves=all='0/0.08 0.5/0.54 1/0.95',gblur=sigma=0.6,vignette=PI/7"
G[7_DRIVE]="huesaturation=saturation=-0.3:colors=m:strength=1,eq=contrast=1.12:saturation=1.05:gamma=0.96,colorbalance=rs=-0.06:gs=0.0:bs=0.09:rm=0.0:bm=0.02:rh=0.06:gh=0.02:bh=-0.05,curves=all='0/0.0 0.2/0.14 0.5/0.48 1/0.98',vignette=PI/4"
