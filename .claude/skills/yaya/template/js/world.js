// Shared 3D toolkit: renderer, materials, props and the cartoon Character.
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

export { THREE };
export const W = 1080, H = 1920;

export const canvas = document.getElementById('gl');
export const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, preserveDrawingBuffer: true });
renderer.setSize(W, H, false);
renderer.setPixelRatio(1);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;
renderer.outputColorSpace = THREE.SRGBColorSpace;

const pmrem = new THREE.PMREMGenerator(renderer);
export const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

// ---------- deterministic random ----------
let seed = 12345;
export function rnd() { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }
export function setSeed(s) { seed = s; }

// ---------- easing / interpolation ----------
export const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
export const lerp = (a, b, t) => a + (b - a) * t;
export const ease = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
export const easeOut = t => 1 - Math.pow(1 - t, 3);
export const seg = (t, a, b) => clamp((t - a) / (b - a));

// ---------- materials ----------
const matCache = new Map();
export function mat(color, rough = 0.8, metal = 0, extra = {}) {
  const key = color + '|' + rough + '|' + metal + '|' + JSON.stringify(extra);
  if (!extra.noCache && matCache.has(key)) return matCache.get(key);
  const { noCache, ...rest } = extra;
  const m = new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: metal, ...rest });
  if (!noCache) matCache.set(key, m);
  return m;
}
export const goldMat = new THREE.MeshStandardMaterial({ color: 0xffc94a, roughness: 0.22, metalness: 1.0, envMapIntensity: 1.6 });

function shade(m) { m.castShadow = true; m.receiveShadow = true; return m; }
export function box(w, h, d, color, o = {}) {
  const r = o.r ?? Math.min(0.03, w / 4, h / 4, d / 4);
  const g = r > 0.001 ? new RoundedBoxGeometry(w, h, d, 3, r) : new THREE.BoxGeometry(w, h, d);
  return shade(new THREE.Mesh(g, o.mat || mat(color, o.rough ?? 0.8, o.metal ?? 0)));
}
export function cyl(rt, rb, h, color, o = {}) {
  return shade(new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, o.seg || 40), o.mat || mat(color, o.rough ?? 0.7, o.metal ?? 0)));
}
export function sph(r, color, o = {}) {
  return shade(new THREE.Mesh(new THREE.SphereGeometry(r, 48, 32), o.mat || mat(color, o.rough ?? 0.7, o.metal ?? 0)));
}
export function at(obj, x, y, z, ry = 0) { obj.position.set(x, y, z); obj.rotation.y = ry; return obj; }

// ---------- canvas textures ----------
export function canvasTex(w, h, draw, o = {}) {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const ctx = c.getContext('2d'); draw(ctx, w, h);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8;
  if (o.repeat) { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(o.repeat[0], o.repeat[1]); }
  t.userData.canvas = c; t.userData.ctx = ctx;
  return t;
}
export function woodFloorTex(base = '#b07a4a', rep = [3, 3]) {
  return canvasTex(1024, 1024, (x, w, h) => {
    const rows = 8, ph = h / rows;
    for (let r = 0; r < rows; r++) {
      let off = (r % 2) * 300 + rnd() * 200, xx = -off;
      while (xx < w) {
        const len = 380 + rnd() * 260;
        const c = new THREE.Color(base).offsetHSL((rnd() - 0.5) * 0.02, (rnd() - 0.5) * 0.08, (rnd() - 0.5) * 0.08);
        x.fillStyle = '#' + c.getHexString(); x.fillRect(xx, r * ph, len, ph);
        x.globalAlpha = 0.08; x.strokeStyle = '#000';
        for (let k = 0; k < 6; k++) { x.beginPath(); const yy = r * ph + rnd() * ph; x.moveTo(xx, yy); x.bezierCurveTo(xx + len * 0.3, yy + 6, xx + len * 0.6, yy - 6, xx + len, yy); x.stroke(); }
        x.globalAlpha = 0.35; x.fillStyle = '#3a2412'; x.fillRect(xx, r * ph, 3, ph); x.globalAlpha = 1;
        xx += len;
      }
      x.fillStyle = 'rgba(40,20,10,0.4)'; x.fillRect(0, r * ph, w, 3);
    }
  }, { repeat: rep });
}
export function paintTex(base, rep = [2, 2], noise = 0.03) {
  return canvasTex(512, 512, (x, w, h) => {
    x.fillStyle = base; x.fillRect(0, 0, w, h);
    for (let i = 0; i < 4000; i++) { x.fillStyle = rnd() < 0.5 ? `rgba(0,0,0,${noise})` : `rgba(255,255,255,${noise})`; x.fillRect(rnd() * w, rnd() * h, 2 + rnd() * 3, 2 + rnd() * 3); }
  }, { repeat: rep });
}
export function tileTex(a, b, n = 8, rep = [4, 4]) {
  return canvasTex(512, 512, (x, w, h) => {
    const s = w / n;
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
      const c = new THREE.Color((i + j) % 2 ? a : b).offsetHSL(0, 0, (rnd() - 0.5) * 0.03);
      x.fillStyle = '#' + c.getHexString(); x.fillRect(i * s, j * s, s, s);
    }
    x.strokeStyle = 'rgba(0,0,0,0.18)'; x.lineWidth = 3;
    for (let i = 0; i <= n; i++) { x.beginPath(); x.moveTo(i * s, 0); x.lineTo(i * s, h); x.stroke(); x.beginPath(); x.moveTo(0, i * s); x.lineTo(w, i * s); x.stroke(); }
  }, { repeat: rep });
}
export function grassTex(rep = [10, 10]) {
  return canvasTex(512, 512, (x, w, h) => {
    x.fillStyle = '#5d9a3c'; x.fillRect(0, 0, w, h);
    for (let i = 0; i < 9000; i++) { const c = new THREE.Color('#5d9a3c').offsetHSL((rnd() - .5) * .05, 0, (rnd() - .5) * .16); x.fillStyle = '#' + c.getHexString(); x.fillRect(rnd() * w, rnd() * h, 2, 5); }
  }, { repeat: rep });
}
export function texMat(tex, rough = 0.85, extra = {}) { return new THREE.MeshStandardMaterial({ map: tex, roughness: rough, ...extra }); }

// text plane (signs, letters, calendars)
export function textTex(w, h, draw) { return canvasTex(w, h, draw); }
export function plane(w, h, material) { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), material); m.receiveShadow = true; return m; }

// gradient sky
export function skyTex(top, bottom) {
  return canvasTex(16, 512, (x, w, h) => { const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, top); g.addColorStop(1, bottom); x.fillStyle = g; x.fillRect(0, 0, w, h); });
}

// ---------- room shell ----------
export function room({ w = 8, d = 7, h = 3.2, wall = '#efe2cc', floorTex, sideWall, ceiling = false, wallTex }) {
  const g = new THREE.Group();
  const fl = plane(w, d, texMat(floorTex || woodFloorTex(), 0.6)); fl.rotation.x = -Math.PI / 2; g.add(fl);
  const wm = texMat(wallTex || paintTex(wall), 0.95);
  const back = plane(w, h, wm); back.position.set(0, h / 2, -d / 2); g.add(back);
  const swm = sideWall ? texMat(paintTex(sideWall), 0.95) : wm;
  const l = plane(d, h, swm); l.rotation.y = Math.PI / 2; l.position.set(-w / 2, h / 2, 0); g.add(l);
  const r = plane(d, h, swm); r.rotation.y = -Math.PI / 2; r.position.set(w / 2, h / 2, 0); g.add(r);
  // skirting
  const sk = box(w, 0.1, 0.03, '#f6f1e8', { r: 0.005 }); sk.position.set(0, 0.05, -d / 2 + 0.015); g.add(sk);
  if (ceiling) { const c = plane(w, d, mat('#f3ede4', 1)); c.rotation.x = Math.PI / 2; c.position.y = h; g.add(c); }
  return g;
}

// ---------- props ----------
export function sofa(color = '#4f7a3a', w = 2.2) {
  const g = new THREE.Group();
  const base = box(w, 0.38, 0.9, color, { r: 0.08, rough: 0.95 }); base.position.set(0, 0.25, 0); g.add(base);
  const back = box(w, 0.6, 0.25, color, { r: 0.1, rough: 0.95 }); back.position.set(0, 0.62, -0.34); g.add(back);
  for (const s of [-1, 1]) { const a = box(0.22, 0.5, 0.9, color, { r: 0.1, rough: 0.95 }); a.position.set(s * (w / 2 - 0.11), 0.42, 0); g.add(a); }
  const n = 2; const cw = (w - 0.5) / n;
  for (let i = 0; i < n; i++) { const c = box(cw - 0.03, 0.14, 0.62, color, { r: 0.06, rough: 1 }); c.position.set(-w / 2 + 0.25 + cw * (i + 0.5), 0.5, 0.08); g.add(c); }
  for (const s of [-1, 1]) for (const t of [-1, 1]) { const l = cyl(0.025, 0.02, 0.08, '#2a1d14'); l.position.set(s * (w / 2 - 0.12), 0.03, t * 0.36); g.add(l); }
  return g;
}
export function cushion(color) { const c = box(0.42, 0.38, 0.14, color, { r: 0.07, rough: 1 }); c.rotation.x = -0.25; return c; }
export function coffeeTable(color = '#6e4a2e', round = true) {
  const g = new THREE.Group();
  const top = round ? cyl(0.5, 0.5, 0.05, color, { rough: 0.45 }) : box(1.1, 0.05, 0.6, color, { rough: 0.45 });
  top.position.y = 0.42; g.add(top);
  if (round) { const p = cyl(0.06, 0.08, 0.4, '#3a2a1c'); p.position.y = 0.2; g.add(p); const b = cyl(0.3, 0.32, 0.03, '#3a2a1c'); b.position.y = 0.015; g.add(b); }
  else for (const s of [-1, 1]) for (const t of [-1, 1]) { const l = cyl(0.025, 0.025, 0.4, '#3a2a1c'); l.position.set(s * 0.5, 0.2, t * 0.25); g.add(l); }
  return g;
}
export function floorLamp(on = true, color = 0xffd9a0, intensity = 6) {
  const g = new THREE.Group();
  const b = cyl(0.16, 0.18, 0.03, '#222'); b.position.y = 0.015; g.add(b);
  const p = cyl(0.015, 0.015, 1.45, '#222'); p.position.y = 0.74; g.add(p);
  const shadeM = new THREE.MeshStandardMaterial({ color: 0xfff1d6, emissive: on ? color : 0x000000, emissiveIntensity: on ? 1.2 : 0, roughness: 1, side: THREE.DoubleSide });
  const s = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.25, 0.32, 40, 1, true), shadeM); s.position.y = 1.5; g.add(s);
  if (on) { const L = new THREE.PointLight(color, intensity, 7, 1.6); L.position.y = 1.45; L.castShadow = true; L.shadow.mapSize.set(1024, 1024); L.shadow.bias = -0.002; L.shadow.radius = 6; g.add(L); g.userData.light = L; }
  return g;
}
export function tableLamp(color = 0xffd9a0, intensity = 3) {
  const g = new THREE.Group();
  const b = cyl(0.07, 0.09, 0.22, '#c9b089', { rough: 0.4, metal: 0.3 }); b.position.y = 0.11; g.add(b);
  const sm = new THREE.MeshStandardMaterial({ color: 0xfff1d6, emissive: color, emissiveIntensity: 1.1, roughness: 1, side: THREE.DoubleSide });
  const s = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.16, 0.2, 32, 1, true), sm); s.position.y = 0.3; g.add(s);
  const L = new THREE.PointLight(color, intensity, 5, 1.6); L.position.y = 0.3; L.castShadow = true; L.shadow.mapSize.set(1024, 1024); L.shadow.bias = -0.002; L.shadow.radius = 5; g.add(L);
  return g;
}
export function pendant(color = 0xffcf7a, intensity = 5, cast = true) {
  const g = new THREE.Group();
  const cord = cyl(0.006, 0.006, 0.9, '#111'); cord.position.y = 0.45; g.add(cord);
  const sm = new THREE.MeshStandardMaterial({ color: 0xffd27a, emissive: color, emissiveIntensity: 1.6, roughness: 0.3, metalness: 0.2 });
  const s = new THREE.Mesh(new THREE.SphereGeometry(0.16, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), sm); g.add(s);
  const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.06, 16, 12), new THREE.MeshBasicMaterial({ color: 0xfff4d0 })); bulb.position.y = -0.02; g.add(bulb);
  const L = new THREE.PointLight(color, intensity, 6, 1.5); L.position.y = -0.1; if (cast) { L.castShadow = true; L.shadow.mapSize.set(1024, 1024); L.shadow.bias = -0.002; L.shadow.radius = 6; } g.add(L);
  return g;
}
export function frame(w, h, draw, frameColor = '#5a3b22') {
  const g = new THREE.Group();
  const f = box(w + 0.08, h + 0.08, 0.04, frameColor, { r: 0.01 }); g.add(f);
  const art = plane(w, h, texMat(canvasTex(256, Math.round(256 * h / w), draw), 0.9)); art.position.z = 0.022; g.add(art);
  return g;
}
export const artLeaf = (x, w, h) => { x.fillStyle = '#f4efe3'; x.fillRect(0, 0, w, h); x.fillStyle = '#5c9a49'; x.beginPath(); x.ellipse(w / 2, h * 0.45, w * 0.22, h * 0.3, 0, 0, 7); x.fill(); x.strokeStyle = '#3b6a2e'; x.lineWidth = 5; x.beginPath(); x.moveTo(w / 2, h * 0.2); x.lineTo(w / 2, h * 0.85); x.stroke(); };
export const artSun = (x, w, h) => { const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#f6d6a8'); g.addColorStop(1, '#e8a87c'); x.fillStyle = g; x.fillRect(0, 0, w, h); x.fillStyle = '#fff3c4'; x.beginPath(); x.arc(w / 2, h * 0.55, w * 0.2, 0, 7); x.fill(); x.fillStyle = '#c0794f'; x.fillRect(0, h * 0.7, w, h * 0.3); };
export const artCaligraphy = (x, w, h) => { x.fillStyle = '#163a2c'; x.fillRect(0, 0, w, h); x.strokeStyle = '#d8b65c'; x.lineWidth = 6; x.beginPath(); x.moveTo(w * 0.15, h * 0.6); x.bezierCurveTo(w * 0.3, h * 0.2, w * 0.5, h * 0.8, w * 0.65, h * 0.35); x.bezierCurveTo(w * 0.75, h * 0.2, w * 0.9, h * 0.5, w * 0.8, h * 0.6); x.stroke(); x.fillStyle = '#d8b65c'; x.beginPath(); x.arc(w * 0.4, h * 0.3, 6, 0, 7); x.fill(); };
export function plant(h = 1.0, pot = '#d9cbb5') {
  const g = new THREE.Group();
  const p = cyl(0.17, 0.13, 0.32, pot, { rough: 0.6 }); p.position.y = 0.16; g.add(p);
  const soil = cyl(0.16, 0.16, 0.02, '#3b2a1a'); soil.position.y = 0.31; g.add(soil);
  const lm = mat('#3f8a3a', 0.6);
  for (let i = 0; i < 9; i++) {
    const leaf = new THREE.Mesh(new THREE.ConeGeometry(0.045, h * (0.55 + rnd() * 0.45), 6), lm); leaf.castShadow = true;
    const a = i / 9 * Math.PI * 2; leaf.position.set(Math.cos(a) * 0.05, 0.32 + h * 0.3, Math.sin(a) * 0.05);
    leaf.rotation.set(Math.sin(a) * 0.4, 0, -Math.cos(a) * 0.4); g.add(leaf);
  }
  return g;
}
export function bushPlant(r = 0.35, pot = '#e8e0d2') {
  const g = new THREE.Group();
  const p = cyl(0.2, 0.15, 0.36, pot, { rough: 0.6 }); p.position.y = 0.18; g.add(p);
  for (let i = 0; i < 7; i++) { const s = sph(r * (0.5 + rnd() * 0.3), '#4c8f3e'); s.position.set((rnd() - .5) * r, 0.4 + r * 0.5 + rnd() * r * 0.6, (rnd() - .5) * r); g.add(s); }
  return g;
}
export function tvSet(screenDraw) {
  const g = new THREE.Group();
  const cab = box(1.8, 0.45, 0.42, '#5b3d27', { rough: 0.5 }); cab.position.y = 0.225; g.add(cab);
  const t = box(1.3, 0.76, 0.06, '#111', { r: 0.02, rough: 0.3 }); t.position.y = 0.45 + 0.5; g.add(t);
  const st = box(0.3, 0.05, 0.2, '#111'); st.position.y = 0.475; g.add(st);
  const scr = plane(1.24, 0.7, new THREE.MeshBasicMaterial({ map: canvasTex(512, 290, screenDraw || ((x, w, h) => { const gg = x.createLinearGradient(0, 0, w, h); gg.addColorStop(0, '#26466e'); gg.addColorStop(1, '#4fa0c9'); x.fillStyle = gg; x.fillRect(0, 0, w, h); })) }));
  scr.position.set(0, 0.95, 0.032); g.add(scr);
  return g;
}
export function windowPane(w, h, draw) {
  const g = new THREE.Group();
  const glass = plane(w, h, new THREE.MeshBasicMaterial({ map: canvasTex(256, Math.round(256 * h / w), draw) })); g.add(glass);
  const fm = '#f4f1ea';
  const t = box(w + 0.1, 0.07, 0.08, fm); t.position.y = h / 2; g.add(t);
  const b = box(w + 0.2, 0.07, 0.16, fm); b.position.set(0, -h / 2, 0.04); g.add(b);
  for (const s of [-1, 0, 1]) { const v = box(0.06, h, 0.08, fm); v.position.x = s * w / 2; g.add(v); }
  return g;
}
export const nightSky = (x, w, h) => { const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#0d1a3a'); g.addColorStop(1, '#24406e'); x.fillStyle = g; x.fillRect(0, 0, w, h); x.fillStyle = '#fff'; for (let i = 0; i < 40; i++) { x.globalAlpha = 0.3 + rnd() * 0.7; x.fillRect(rnd() * w, rnd() * h * 0.7, 2, 2); } x.globalAlpha = 1; x.fillStyle = '#f7f0d0'; x.beginPath(); x.arc(w * 0.75, h * 0.2, 16, 0, 7); x.fill(); };
export const daySky = (x, w, h) => { const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#8fc6f0'); g.addColorStop(1, '#e8f4fb'); x.fillStyle = g; x.fillRect(0, 0, w, h); x.fillStyle = 'rgba(255,255,255,0.9)'; for (const [cx, cy] of [[0.3, 0.3], [0.7, 0.45]]) { for (let i = 0; i < 4; i++) { x.beginPath(); x.arc(w * cx + i * 18 - 27, h * cy + (i % 2) * -8, 20, 0, 7); x.fill(); } } x.fillStyle = '#7cae5c'; x.fillRect(0, h * 0.82, w, h * 0.18); };
export function chair(color = '#c79a5c', seat = 0.45) {
  const g = new THREE.Group();
  const s = box(0.46, 0.05, 0.44, color, { rough: 0.5 }); s.position.y = seat; g.add(s);
  const b = box(0.46, 0.5, 0.05, color, { rough: 0.5 }); b.position.set(0, seat + 0.27, -0.2); g.add(b);
  for (const a of [-1, 1]) for (const c of [-1, 1]) { const l = cyl(0.02, 0.02, seat, '#3a2a1c'); l.position.set(a * 0.2, seat / 2, c * 0.19); g.add(l); }
  return g;
}
export function goldBar(scale = 1) {
  const g = new THREE.Group();
  const geo = new RoundedBoxGeometry(0.12 * scale, 0.025 * scale, 0.065 * scale, 2, 0.006 * scale);
  const m = new THREE.Mesh(geo, goldMat); m.castShadow = true; m.receiveShadow = true; g.add(m);
  return g;
}
export function goldBox() { // open wooden keepsake box
  const g = new THREE.Group();
  const wood = '#6b3f22';
  const base = box(0.5, 0.03, 0.34, wood, { r: 0.01, rough: 0.5 }); base.position.y = 0.015; g.add(base);
  const velvet = plane(0.46, 0.3, mat('#7a1a2a', 1)); velvet.rotation.x = -Math.PI / 2; velvet.position.y = 0.032; g.add(velvet);
  for (const [w, d, x, z] of [[0.5, 0.02, 0, 0.16], [0.5, 0.02, 0, -0.16], [0.02, 0.34, 0.24, 0], [0.02, 0.34, -0.24, 0]]) { const s = box(w, 0.12, d, wood, { r: 0.005, rough: 0.5 }); s.position.set(x, 0.06, z); g.add(s); }
  const lid = new THREE.Group(); const lb = box(0.5, 0.03, 0.34, wood, { r: 0.01, rough: 0.5 }); lb.position.set(0, 0, -0.17); lid.add(lb);
  lid.position.set(0, 0.12, -0.17); lid.rotation.x = -1.9; g.add(lid);
  g.userData.slots = [];
  for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) g.userData.slots.push([-0.19 + c * 0.075, 0.045 + Math.floor(r / 2) * 0.026, -0.08 + (r % 2) * 0.13]);
  return g;
}
export function paper(w = 0.21, h = 0.29, draw) { const p = plane(w, h, texMat(canvasTex(256, Math.round(256 * h / w), draw), 0.9, { side: THREE.DoubleSide })); p.castShadow = true; return p; }
export function tree(h = 3) {
  const g = new THREE.Group();
  const t = cyl(0.08, 0.13, h * 0.5, '#6b4a2e'); t.position.y = h * 0.25; g.add(t);
  for (let i = 0; i < 6; i++) { const s = sph(h * (0.17 + rnd() * 0.08), '#4f8f3f', { rough: 0.9 }); s.position.set((rnd() - .5) * h * 0.35, h * (0.55 + rnd() * 0.25), (rnd() - .5) * h * 0.35); g.add(s); }
  return g;
}

// ---------- Character ----------
const SKIN = '#f6e7d2';
function drawFace(x, w, h, st) {
  x.clearRect(0, 0, w, h);
  const ex = [w * 0.385, w * 0.615], ey = h * 0.47, e = st.expr;
  // blush
  if (['happy', 'laugh', 'proud', 'smile'].includes(e)) { x.fillStyle = 'rgba(240,120,120,0.28)'; for (const cx of [w * 0.31, w * 0.69]) { x.beginPath(); x.ellipse(cx, h * 0.6, 26, 14, 0, 0, 7); x.fill(); } }
  x.fillStyle = '#1d1512'; x.strokeStyle = '#1d1512'; x.lineCap = 'round';
  const blink = st.blink;
  for (let i = 0; i < 2; i++) {
    const cx = ex[i];
    if (e === 'laugh' || (e === 'happy' && !st.talk)) { x.lineWidth = 9; x.beginPath(); x.arc(cx, ey + 10, 17, Math.PI * 1.15, Math.PI * 1.85); x.stroke(); continue; }
    if (blink > 0.5 || e === 'closed') { x.lineWidth = 8; x.beginPath(); x.moveTo(cx - 15, ey + 4); x.quadraticCurveTo(cx, ey + 12, cx + 15, ey + 4); x.stroke(); continue; }
    const ry = (e === 'surprised' ? 26 : 22) * (1 - blink);
    x.beginPath(); x.ellipse(cx, ey, 15, ry, 0, 0, 7); x.fill();
    x.fillStyle = '#fff'; x.beginPath(); x.arc(cx + 5, ey - 8, 5, 0, 7); x.fill(); x.fillStyle = '#1d1512';
    if (e === 'smirk' || e === 'skeptic') { x.fillStyle = SKIN; x.fillRect(cx - 18, ey - 30, 36, 18); x.fillStyle = '#1d1512'; }
  }
  // brows
  x.lineWidth = 8;
  const browY = h * 0.33;
  const tilt = { sad: -1, worried: -1, angry: 1, determined: 0.8, skeptic: 0.4, surprised: -0.2 }[e] || 0;
  for (let i = 0; i < 2; i++) {
    const s = i === 0 ? 1 : -1, cx = ex[i];
    const lift = e === 'surprised' ? -14 : 0;
    x.beginPath(); x.moveTo(cx - 20 * s, browY + lift - tilt * 7 * -1 * 0 - (tilt < 0 ? 0 : 0));
    // inner end is at cx+20*s*-1 ... keep explicit:
    const outer = [cx - 22 * s, browY + lift + (tilt < 0 ? 6 : -2) * Math.abs(tilt)];
    const inner = [cx + 18 * s, browY + lift + (tilt < 0 ? -9 : 9) * Math.abs(tilt)];
    if (e === 'skeptic' && i === 1) { outer[1] -= 10; inner[1] -= 8; }
    x.beginPath(); x.moveTo(outer[0], outer[1]); x.lineTo(inner[0], inner[1]); x.stroke();
  }
  // moustache
  if (st.misai) { x.fillStyle = st.misaiColor || '#241a14'; x.beginPath(); x.ellipse(w * 0.465, h * 0.665, 30, 9, 0.15, 0, 7); x.ellipse(w * 0.535, h * 0.665, 30, 9, -0.15, 0, 7); x.fill(); x.fillStyle = '#1d1512'; }
  // mouth
  const mx = w / 2, my = h * 0.71;
  x.lineWidth = 8;
  if (st.talk && st.mouthOpen > 0.05) {
    const o = st.mouthOpen;
    x.fillStyle = '#5a1f1c'; x.beginPath(); x.ellipse(mx, my + 2, 17 + o * 6, 5 + o * 15, 0, 0, 7); x.fill();
    x.fillStyle = '#e07a74'; x.beginPath(); x.ellipse(mx, my + 6 + o * 8, 10, 3 + o * 4, 0, 0, Math.PI); x.fill();
    return;
  }
  x.beginPath();
  switch (e) {
    case 'happy': case 'proud': case 'smile': x.arc(mx, my - 18, 26, Math.PI * 0.2, Math.PI * 0.8); x.stroke(); break;
    case 'laugh': x.fillStyle = '#5a1f1c'; x.moveTo(mx - 30, my - 6); x.quadraticCurveTo(mx, my + 44, mx + 30, my - 6); x.closePath(); x.fill(); x.fillStyle = '#fff'; x.fillRect(mx - 22, my - 6, 44, 7); break;
    case 'sad': case 'worried': x.arc(mx, my + 20, 22, Math.PI * 1.22, Math.PI * 1.78); x.stroke(); break;
    case 'surprised': x.fillStyle = '#5a1f1c'; x.ellipse(mx, my, 11, 15, 0, 0, 7); x.fill(); break;
    case 'smirk': case 'skeptic': x.moveTo(mx - 20, my + 2); x.quadraticCurveTo(mx + 6, my + 6, mx + 24, my - 8); x.stroke(); break;
    case 'determined': x.moveTo(mx - 18, my); x.lineTo(mx + 18, my - 2); x.stroke(); break;
    default: x.moveTo(mx - 16, my); x.quadraticCurveTo(mx, my + 7, mx + 16, my); x.stroke();
  }
}

export class Character {
  // type: 'man' | 'woman' | 'boy' | 'teen'
  constructor(o = {}) {
    this.o = o; this.g = new THREE.Group(); this.root = new THREE.Group(); this.g.add(this.root);
    const S = o.scale || 1; this.root.scale.setScalar(S);
    const isW = o.type === 'woman';
    this.state = { expr: o.expr || 'neutral', talk: false, mouthOpen: 0, blink: 0, misai: !!o.misai, misaiColor: o.misaiColor };
    const darkLimb = mat('#1f1b1a', 0.6);
    // legs
    this.hipY = 0.42;
    this.legs = [];
    if (!isW) {
      for (const s of [-1, 1]) {
        const pivot = new THREE.Group(); pivot.position.set(s * 0.075, this.hipY, 0);
        const leg = new THREE.Mesh(new THREE.CapsuleGeometry(0.03, this.hipY - 0.06, 6, 12), mat(o.pants || '#2b2b2b', 0.8)); leg.castShadow = true; leg.position.y = -this.hipY / 2 + 0.02; pivot.add(leg);
        const shoe = new THREE.Mesh(new THREE.SphereGeometry(0.055, 24, 16), mat(o.shoes || '#1a1a1a', 0.5)); shoe.scale.set(0.9, 0.55, 1.4); shoe.position.set(0, -this.hipY + 0.03, 0.03); shoe.castShadow = true; pivot.add(shoe);
        this.root.add(pivot); this.legs.push(pivot);
      }
    }
    // torso
    const torsoGroup = new THREE.Group(); this.root.add(torsoGroup); this.torso = torsoGroup;
    if (isW) {
      const pts = []; const hgt = 0.98;
      for (let i = 0; i <= 20; i++) { const t = i / 20; const r = 0.215 - 0.06 * t + 0.025 * Math.sin(t * Math.PI) ; pts.push(new THREE.Vector2(Math.max(0.01, i === 20 ? 0.01 : r), t * hgt)); }
      const robe = new THREE.Mesh(new THREE.LatheGeometry(pts, 48), mat(o.robe || '#8a2c3a', 0.9)); robe.castShadow = true; robe.receiveShadow = true; torsoGroup.add(robe); this.robe = robe;
      // hem ring + buttons
      const hem = new THREE.Mesh(new THREE.TorusGeometry(0.212, 0.012, 8, 48), mat(o.robeDark || '#5e1c26', 0.9)); hem.rotation.x = Math.PI / 2; hem.position.y = 0.01; torsoGroup.add(hem);
    } else {
      const top = o.type === 'boy' ? 0.78 : 0.86;
      const shirt = new THREE.Mesh(new THREE.CapsuleGeometry(0.155, top - this.hipY - 0.12, 8, 32), mat(o.shirt || '#2d4f8a', 0.85));
      shirt.scale.set(1, 1, 0.82); shirt.position.y = (top + this.hipY) / 2; shirt.castShadow = true; torsoGroup.add(shirt); this.shirt = shirt;
      const belt = new THREE.Mesh(new THREE.CylinderGeometry(0.152, 0.152, 0.07, 32), mat(o.pants || '#2b2b2b', 0.8)); belt.scale.z = 0.82; belt.position.y = this.hipY + 0.03; torsoGroup.add(belt);
      if (o.vest) { // white shirt panel like reference
        const p = box(0.12, top - this.hipY - 0.08, 0.02, '#f2efe8', { r: 0.008 }); p.position.set(0, (top + this.hipY) / 2 + 0.02, 0.128); torsoGroup.add(p);
        const bt = sph(0.018, '#e2572b', { rough: 0.4 }); bt.position.set(0, (top + this.hipY) / 2 - 0.02, 0.14); torsoGroup.add(bt);
      }
      if (o.stripe) { const st = new THREE.Mesh(new THREE.CylinderGeometry(0.157, 0.157, 0.05, 32), mat(o.stripe, 0.85)); st.scale.z = 0.82; st.position.y = (top + this.hipY) / 2 + 0.03; torsoGroup.add(st); }
      if (o.backpack) { const bp = box(0.24, 0.3, 0.12, o.backpack, { r: 0.05 }); bp.position.set(0, (top + this.hipY) / 2 + 0.03, -0.16); torsoGroup.add(bp); }
      this.shoulderY = top - 0.06;
    }
    if (isW) this.shoulderY = 0.84;
    // arms
    this.arms = [];
    for (const s of [-1, 1]) {
      const pivot = new THREE.Group(); pivot.position.set(s * (isW ? 0.175 : 0.165), this.shoulderY, 0.0);
      const armM = isW ? mat(o.robe || '#8a2c3a', 0.9) : (o.longSleeve ? mat(o.shirt, 0.85) : darkLimb);
      const arm = new THREE.Mesh(new THREE.CapsuleGeometry(isW ? 0.04 : 0.026, 0.24, 6, 12), armM); arm.position.y = -0.14; arm.castShadow = true; pivot.add(arm);
      const hand = new THREE.Mesh(new THREE.SphereGeometry(isW ? 0.042 : 0.036, 16, 12), mat(SKIN, 0.6)); hand.position.y = -0.29; hand.castShadow = true; pivot.add(hand);
      pivot.rotation.z = s * 0.18; this.root.add(pivot); this.arms.push(pivot);
      pivot.userData.hand = hand;
    }
    // head
    const headY = isW ? 1.2 : (o.type === 'boy' ? 1.08 : 1.16);
    this.head = new THREE.Group(); this.head.position.y = headY; this.root.add(this.head);
    const R = 0.28; this.R = R;
    const skull = new THREE.Mesh(new THREE.SphereGeometry(R, 64, 48), mat(SKIN, 0.55)); skull.scale.set(1, 0.97, 0.95); skull.castShadow = true; this.head.add(skull);
    // face decal
    this.faceTex = canvasTex(512, 512, () => { });
    const span = 2.3, tS = 0.62, tL = 1.85;
    const face = new THREE.Mesh(new THREE.SphereGeometry(R * 1.004, 64, 48, Math.PI / 2 - span / 2, span, tS, tL), new THREE.MeshStandardMaterial({ map: this.faceTex, transparent: true, roughness: 0.6, depthWrite: false }));
    face.scale.copy(skull.scale); face.renderOrder = 2; this.head.add(face);
    this._faceKey = '';
    if (isW) {
      const hm = mat(o.hijab || '#9a3040', 0.95);
      const open = 1.95; // radians opening for face
      const shell = new THREE.Mesh(new THREE.SphereGeometry(R * 1.1, 64, 48, Math.PI / 2 + open / 2, Math.PI * 2 - open, 0, Math.PI * 0.86), hm);
      shell.material.side = THREE.DoubleSide; shell.scale.set(1, 1.04, 1); shell.castShadow = true; this.head.add(shell);
      // top cover over opening
      const cap = new THREE.Mesh(new THREE.SphereGeometry(R * 1.1, 64, 24, 0, Math.PI * 2, 0, 0.48), hm); cap.scale.set(1, 1.04, 1); cap.castShadow = true; this.head.add(cap);
      // chin wrap
      const chin = new THREE.Mesh(new THREE.TorusGeometry(R * 0.86, 0.06, 16, 48, Math.PI * 0.9), hm); chin.rotation.set(0, 0, Math.PI * 1.05); chin.scale.set(1, 1, 0.9); chin.position.set(0, -0.02, 0.07); this.head.add(chin);
      // drape over shoulders
      const pts = []; for (let i = 0; i <= 12; i++) { const t = i / 12; pts.push(new THREE.Vector2(0.15 + 0.17 * Math.pow(t, 0.8), -t * 0.42)); }
      const drape = new THREE.Mesh(new THREE.LatheGeometry(pts, 48), hm); drape.material.side = THREE.DoubleSide; drape.position.y = -0.17; drape.castShadow = true; this.head.add(drape);
      // inner underscarf band
      const band = new THREE.Mesh(new THREE.TorusGeometry(R * 1.02, 0.018, 10, 60, Math.PI), mat(o.inner || '#f1e6d6', 0.9)); band.rotation.set(-0.35, 0, 0); band.position.set(0, 0.04, 0.0); band.scale.set(0.98, 1, 1);
    } else {
      const hairC = o.hair || '#0f0c0b';
      const hm = mat(hairC, 0.75);
      const cap = new THREE.Mesh(new THREE.SphereGeometry(R * 1.04, 64, 32, 0, Math.PI * 2, 0, Math.PI * 0.42), hm); cap.scale.set(1.0, 0.98, 0.98); cap.rotation.x = -0.18; cap.castShadow = true; this.head.add(cap);
      const backHair = new THREE.Mesh(new THREE.SphereGeometry(R * 1.03, 48, 32, Math.PI * 1.1, Math.PI * 0.8, 0.3, 1.0), hm); this.head.add(backHair);
      if (o.style === 'bun') { const b = sph(0.09, hairC); b.position.set(0, R * 1.0, -0.05); this.head.add(b); }
      if (o.style === 'quiff') { const q = sph(0.11, hairC); q.scale.set(1.5, 0.7, 0.9); q.position.set(0.03, R * 0.92, 0.1); this.head.add(q); }
      if (o.style === 'kid') { for (let i = 0; i < 5; i++) { const q = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.1, 10), hm); q.position.set(-0.12 + i * 0.06, R * 0.93, 0.08); q.rotation.x = 0.5; this.head.add(q); } }
      if (o.grey) { // grey temples
        for (const s of [-1, 1]) { const gt = new THREE.Mesh(new THREE.SphereGeometry(R * 1.045, 24, 16, s > 0 ? -0.2 : Math.PI - 0.6, 0.8, 0.95, 0.35), mat('#b8b4ae', 0.8)); this.head.add(gt); }
      }
      if (o.songkok) { const sk = cyl(R * 0.92, R * 0.95, 0.16, '#151515', { rough: 0.9 }); sk.position.y = R * 0.82; this.head.add(sk); }
    }
    if (o.glasses) {
      const gm = mat('#222', 0.4);
      for (const s of [-1, 1]) { const r = new THREE.Mesh(new THREE.TorusGeometry(0.055, 0.009, 8, 24), gm); r.position.set(s * 0.065, 0.01, R * 0.94); this.head.add(r); }
    }
    this.t = 0; this.blinkSeed = rnd() * 10;
    this.pose = { sit: false, walk: 0, armL: 0, armR: 0, wave: 0, bob: 1, lookY: 0, lookX: 0, hug: 0, celebrate: 0 };
    this.updateFace();
  }
  setExpr(e) { this.state.expr = e; }
  updateFace() {
    const st = this.state;
    const key = st.expr + '|' + st.talk + '|' + st.mouthOpen.toFixed(1) + '|' + st.blink.toFixed(1);
    if (key === this._faceKey) return;
    this._faceKey = key;
    const c = this.faceTex.userData.canvas; drawFace(this.faceTex.userData.ctx, c.width, c.height, st);
    this.faceTex.needsUpdate = true;
  }
  // t: global time in seconds
  update(t) {
    const p = this.pose, st = this.state;
    // blink
    const bp = (t + this.blinkSeed) % 3.7; st.blink = bp < 0.12 ? Math.sin(bp / 0.12 * Math.PI) : 0;
    // talk
    st.mouthOpen = st.talk ? Math.max(0, Math.sin(t * 17 + this.blinkSeed) * 0.5 + Math.sin(t * 9.3) * 0.5) : 0;
    this.updateFace();
    // breathing / bob
    const br = Math.sin(t * 2.2 + this.blinkSeed) * 0.012 * p.bob;
    this.torso.scale.y = 1 + br * 0.5;
    this.head.position.y = (this.o.type === 'woman' ? 1.2 : this.o.type === 'boy' ? 1.08 : 1.16) + br * 0.6 + (st.talk ? Math.sin(t * 6) * 0.006 : 0);
    this.head.rotation.y = p.lookY + (st.talk ? Math.sin(t * 2.3) * 0.05 : 0);
    this.head.rotation.x = p.lookX + (st.talk ? Math.sin(t * 3.1) * 0.03 : 0);
    this.head.rotation.z = (st.expr === 'laugh' ? Math.sin(t * 9) * 0.06 : 0);
    // walking
    const w = p.walk;
    const ph = t * 8;
    this.legs.forEach((l, i) => { l.rotation.x = p.sit ? -Math.PI / 2 : Math.sin(ph + i * Math.PI) * 0.45 * w; });
    this.root.position.y = (p.sit ? 0 : Math.abs(Math.sin(ph)) * 0.035 * w) + (p.celebrate ? Math.abs(Math.sin(t * 7)) * 0.08 * p.celebrate : 0);
    if (this.robe) this.robe.rotation.z = Math.sin(ph) * 0.03 * w;
    this.root.rotation.z = Math.sin(ph) * 0.04 * w;
    // arms
    const [L, R] = this.arms;
    L.rotation.x = Math.sin(ph + Math.PI) * 0.5 * w + p.armL;
    R.rotation.x = Math.sin(ph) * 0.5 * w + p.armR;
    L.rotation.z = -0.18 - p.hug * 0.6; R.rotation.z = 0.18 + p.hug * 0.6;
    if (p.wave) { R.rotation.z = 0.18 + 2.4 * p.wave; R.rotation.x = Math.sin(t * 10) * 0.35 * p.wave; }
    if (p.celebrate) { L.rotation.z = -0.18 - 2.5 * p.celebrate; R.rotation.z = 0.18 + 2.5 * p.celebrate; }
    if (p.laughShake) this.root.rotation.x = Math.sin(t * 14) * 0.04;
  }
}

// convenience: build lights
export function hemi(sky, ground, i) { return new THREE.HemisphereLight(sky, ground, i); }
export function sun(color, i, pos, target = [0, 0, 0], size = 6) {
  const d = new THREE.DirectionalLight(color, i); d.position.set(...pos); d.target.position.set(...target);
  d.castShadow = true; d.shadow.mapSize.set(2048, 2048); const c = d.shadow.camera; c.left = -size; c.right = size; c.top = size; c.bottom = -size; c.near = 0.5; c.far = 40; d.shadow.bias = -0.0005; d.shadow.normalBias = 0.02; d.shadow.radius = 4;
  return d;
}
