import { THREE, W, H, renderer, clamp } from './world.js';
import * as SETS from './sets.js';
import { SHOTS } from './shots.js';

const q = new URLSearchParams(location.search);
const TL = await (await fetch(q.get('tl') || 'timeline.json')).json();
await document.fonts.load('800 40px Poppins'); await document.fonts.load('700 40px Lora'); await document.fonts.load('italic 600 40px Lora'); await document.fonts.ready;
await document.getElementById('wm').decode();

const builders = { uni: SETS.setUni, livingNight: () => SETS.setLiving(false), livingDay: () => SETS.setLiving(true), dining: SETS.setDining, mamak: SETS.setMamak, study: SETS.setStudy, chart: SETS.setChart, shop: SETS.setShop };
const sets = {};
const getSet = n => sets[n] || (sets[n] = builders[n]());
const camera = new THREE.PerspectiveCamera(40, W / H, 0.05, 200);

const $title = document.getElementById('title'), $sub = document.getElementById('sub'), $fade = document.getElementById('fade'), $shade = document.getElementById('topshade');
let curTitle = null, curSub = null;

function overlays(t) {
  const ti = TL.titles.find(x => t >= x.start && t < x.end);
  if (ti !== curTitle) { curTitle = ti; $title.innerHTML = ti ? ti.lines.map(l => `<span class="l ${l.cls}">${l.text}</span>`).join('') : ''; }
  if (ti) {
    const a = clamp((t - ti.start) / 0.25), b = clamp((ti.end - t) / 0.2);
    $title.style.opacity = Math.min(a, b); $title.style.transform = `translateY(${(1 - a) * 24}px) scale(${0.94 + 0.06 * a})`;
    $title.querySelectorAll('.l').forEach((el, i) => { const k = clamp((t - ti.start - i * 0.18) / 0.25); el.style.opacity = k; });
  }
  $shade.style.opacity = ti ? Math.min(1, clamp((t - ti.start) / 0.25)) : 0;
  const su = TL.subs.find(x => t >= x.start && t < x.end);
  if (su !== curSub) { curSub = su; $sub.innerHTML = su ? su.text : ''; }
  if (su) { const a = clamp((t - su.start) / 0.08); $sub.style.transform = `scale(${0.9 + 0.1 * a})`; }
  let fo = 0;
  for (const f of TL.fades || []) { const d = Math.abs(t - f.at); if (d < f.dur) fo = Math.max(fo, 1 - d / f.dur); }
  if (t < 0.25) fo = Math.max(fo, 1 - t / 0.25);
  if (t > TL.duration - 0.5) fo = Math.max(fo, (t - (TL.duration - 0.5)) / 0.5);
  $fade.style.opacity = fo;
}

window.renderAt = (t) => {
  const shot = TL.shots.find(s => t >= s.start && t < s.end) || TL.shots[TL.shots.length - 1];
  const def = SHOTS[shot.id];
  const S = getSet(def.set);
  const d = shot.end - shot.start, lt = t - shot.start, f = clamp(lt / d);
  def.run(S, f, lt, d, camera, { t, talk: TL.talk || [] });
  Object.values(S.c).forEach(ch => ch.update(t));
  renderer.render(S.scene, camera);
  overlays(t);
  return shot.id;
};
// warm up every set once so shaders compile before timing starts
window.warm = () => { for (const s of TL.shots) { const def = SHOTS[s.id]; const S = getSet(def.set); def.run(S, 0.5, 0, 1, camera, { t: 0, talk: [] }); Object.values(S.c).forEach(ch => ch.update(0)); renderer.compile(S.scene, camera); renderer.render(S.scene, camera); } return true; };
window.TL = TL;
window.ready = true;
