import sys,os
from playwright.sync_api import sync_playwright
D=75.55; S=70.8; E=75.55
html='''<html><body style="margin:0;width:1080px;height:1920px;background:transparent;overflow:hidden;font-family:Inter,sans-serif">
<div id=c style="position:absolute;top:1180px;left:0;right:0;display:flex;justify-content:center;opacity:0">
<div style="display:flex;align-items:center;gap:22px;padding:26px 46px;border-radius:999px;background:linear-gradient(135deg,#F5C542,#C9930F);box-shadow:0 12px 40px rgba(0,0,0,.35)">
<div style="width:62px;height:62px;border-radius:50%;background:#1a1408;color:#F5C542;font-size:50px;font-weight:800;display:flex;align-items:center;justify-content:center">+</div>
<div style="color:#1a1408;font-weight:800;font-size:46px;line-height:1.15">Follow untuk tips<br>simpan emas</div></div></div></body></html>'''
with sync_playwright() as pw:
    b=pw.chromium.launch(executable_path='/opt/pw-browsers/chromium-1243/chrome-linux64/chrome',args=['--no-sandbox']); pg=b.new_page(viewport={"width":1080,"height":1920}); pg.set_content(html)
    pg.evaluate("""([s,e])=>{const el=document.getElementById('c');const D=(e-s)*1000;
     el.animate([{opacity:0,transform:'translateY(80px) scale(.85)',easing:'cubic-bezier(.34,1.56,.64,1)'},{opacity:1,transform:'none',offset:300/D},{opacity:1,transform:'none',offset:1-200/D},{opacity:0}],{duration:D,delay:s*1000,fill:'none'});
     document.getAnimations().forEach(a=>a.pause())}""",[S,E-0.02])
    os.makedirs("ov",exist_ok=True)
    for i in range(int(S*30),int(D*30)):
        pg.evaluate(f"document.getAnimations().forEach(a=>a.currentTime={i/30*1000})")
        pg.screenshot(path=f"ov/{i-int(S*30):05d}.png",omit_background=True)
    b.close()
