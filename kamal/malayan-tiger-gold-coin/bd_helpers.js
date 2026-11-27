
// zon selamat v2 (lebih ketat): x 90–900, y 320–1420
const topPill=(R,html,fs=46,top=330)=>E(R,`left:90px;right:180px;top:${top}px;text-align:center`,html);
const gtag=(tx,fs=44)=>`<div class="glass" style="display:inline-block;padding:14px 40px;border-radius:60px;font:900 ${fs}px Mont;color:#fff;white-space:nowrap">${tx}</div>`;
const imgTile=(src,pos='50% 50%')=>`<div style="position:absolute;inset:0;border-radius:22px;overflow:hidden;border:4px solid #E8B830;box-shadow:0 10px 24px rgba(0,0,0,.6)"><img src="${src}" style="width:100%;height:100%;object-fit:cover;object-position:${pos}">${SHN}</div>`;
const brk=(R,css)=>E(R,css,['top:0;left:0;border-top:6px solid #fff;border-left:6px solid #fff','top:0;right:0;border-top:6px solid #fff;border-right:6px solid #fff','bottom:0;left:0;border-bottom:6px solid #fff;border-left:6px solid #fff','bottom:0;right:0;border-bottom:6px solid #fff;border-right:6px solid #fff'].map(c=>`<div style="position:absolute;width:70px;height:70px;${c};filter:drop-shadow(0 0 6px rgba(0,0,0,.6))"></div>`).join(''));
