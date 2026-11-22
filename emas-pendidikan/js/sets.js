// The 3D sets (locations). Each returns { scene, c: characters, p: props }.
import {
  THREE, envTex, mat, box, cyl, sph, at, plane, texMat, canvasTex, woodFloorTex, paintTex, tileTex, grassTex, skyTex,
  room, sofa, cushion, coffeeTable, floorLamp, tableLamp, pendant, frame, artLeaf, artSun, artCaligraphy, plant, bushPlant,
  windowPane, nightSky, daySky, chair, goldBar, goldBox, paper, tree, Character, hemi, sun, goldMat, rnd, setSeed
} from './world.js';

function base(bg, envI = 0.35) {
  const s = new THREE.Scene();
  s.background = bg instanceof THREE.Texture ? bg : new THREE.Color(bg);
  s.environment = envTex; s.environmentIntensity = envI;
  return s;
}

// ---- cast ----
export const cast = {
  ayahYoung: () => new Character({ type: 'man', shirt: '#2f5d8c', pants: '#2b2b33', style: 'bun', misai: true, vest: true }),
  ayahOld: () => new Character({ type: 'man', shirt: '#2f5d8c', pants: '#2b2b33', style: 'bun', misai: true, misaiColor: '#6d6a66', grey: true, vest: true }),
  ibu: () => new Character({ type: 'woman', robe: '#8e2f3e', hijab: '#a33648', robeDark: '#5e1c26' }),
  kid: () => new Character({ type: 'boy', shirt: '#f2b134', stripe: '#d9572b', pants: '#3b5f9a', style: 'kid', scale: 0.72 }),
  teen: () => new Character({ type: 'teen', shirt: '#f2efe8', pants: '#2a3550', style: 'quiff', backpack: '#2f4a6b', longSleeve: true }),
  teenNoBag: () => new Character({ type: 'teen', shirt: '#f2efe8', pants: '#2a3550', style: 'quiff', longSleeve: true }),
  friend1: () => new Character({ type: 'man', shirt: '#d9762b', pants: '#3a3a3a', style: 'short' }),
  friend2: () => new Character({ type: 'man', shirt: '#3d8a5a', pants: '#2b2b2b', style: 'short', songkok: true, glasses: true }),
  extra: (shirt, w) => w ? new Character({ type: 'woman', robe: shirt, hijab: shirt }) : new Character({ type: 'teen', shirt, pants: '#2a2a35', style: 'short', backpack: '#555' }),
};

function letterhead(title, sub, colour = '#7a1d2a') {
  return (x, w, h) => {
    x.fillStyle = '#fbfaf6'; x.fillRect(0, 0, w, h);
    x.fillStyle = colour; x.fillRect(0, 0, w, 30);
    x.fillStyle = '#c9a43a'; x.beginPath(); x.arc(w / 2, 62, 20, 0, 7); x.fill();
    x.fillStyle = '#222'; x.font = 'bold 18px Poppins'; x.textAlign = 'center'; x.fillText(title, w / 2, 112);
    x.font = '12px Poppins'; x.fillText(sub, w / 2, 134);
    x.fillStyle = '#999'; for (let i = 0; i < 9; i++) x.fillRect(30, 160 + i * 18, w - 60 - (i % 3) * 30, 5);
  };
}

// ================= UNIVERSITY (day exterior) =================
export function setUni() {
  setSeed(11);
  const s = base(skyTex('#6fb3ea', '#e9f3f8'), 0.5);
  s.fog = new THREE.Fog(0xdcebf3, 22, 60);
  s.add(hemi(0xcfe6ff, 0x6a8a4a, 1.1));
  const S = sun(0xfff0d6, 3.2, [8, 14, 10], [0, 0, -4], 14); s.add(S, S.target);
  const g = plane(120, 120, texMat(grassTex([30, 30]), 1)); g.rotation.x = -Math.PI / 2; s.add(g);
  const path = plane(4, 30, texMat(tileTex('#d8d2c6', '#cfc8bb', 4, [2, 14]), 0.8)); path.rotation.x = -Math.PI / 2; path.position.set(0, 0.005, 4); s.add(path);
  const plaza = plane(18, 6, texMat(tileTex('#ddd6ca', '#d2cabd', 8, [6, 2]), 0.8)); plaza.rotation.x = -Math.PI / 2; plaza.position.set(0, 0.006, -9); s.add(plaza);
  // building
  const bld = new THREE.Group(); bld.position.z = -14; s.add(bld);
  const main = box(18, 7, 5, '#efe4cf', { r: 0.05, rough: 0.9 }); main.position.y = 3.5; bld.add(main);
  for (let i = 0; i < 8; i++) for (let j = 0; j < 2; j++) { if (i === 3 || i === 4) continue; const wdw = box(1.1, 1.3, 0.1, '#4a6f8f', { r: 0.02, rough: 0.2, metal: 0.4 }); wdw.position.set(-7.7 + i * 2.2, 2.4 + j * 2.6, 2.52); bld.add(wdw); }
  const roof = box(19, 0.5, 6, '#7a2a2a', { r: 0.05 }); roof.position.y = 7.2; bld.add(roof);
  const ped = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 4.2, 2.2, 3), mat('#7a2a2a', 0.8)); ped.rotation.y = Math.PI / 2; ped.scale.z = 0.6; ped.position.set(0, 8.4, 2.4); ped.castShadow = true; bld.add(ped);
  const portico = box(7, 0.4, 3, '#f5ecdb', { r: 0.03 }); portico.position.set(0, 5.4, 3.6); bld.add(portico);
  for (let i = 0; i < 6; i++) { const c = cyl(0.22, 0.25, 5.2, '#f8f2e6', { rough: 0.6 }); c.position.set(-3 + i * 1.2, 2.6, 4.8); bld.add(c); }
  for (let i = 0; i < 4; i++) { const st = box(8 - i * 0.2, 0.16, 1.6 - i * 0.35, '#e7e0d3', { r: 0.01 }); st.position.set(0, 0.08 + i * 0.16, 5.6 - i * 0.18); bld.add(st); }
  const door = box(2.2, 3, 0.1, '#5a3a22', { r: 0.02 }); door.position.set(0, 1.5, 2.55); bld.add(door);
  const sign = plane(6.2, 0.9, new THREE.MeshStandardMaterial({ map: canvasTex(1240, 180, (x, w, h) => { x.fillStyle = '#7a1d2a'; x.fillRect(0, 0, w, h); x.strokeStyle = '#d9b44a'; x.lineWidth = 6; x.strokeRect(8, 8, w - 16, h - 16); x.fillStyle = '#f3d47a'; x.font = '800 92px Poppins'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('UNIVERSITI', w / 2, h / 2 + 4); }), roughness: 0.6 }));
  sign.position.set(0, 4.9, 5.12); bld.add(sign);
  // banner
  const ban = plane(3.2, 1.1, new THREE.MeshStandardMaterial({ map: canvasTex(640, 220, (x, w, h) => { x.fillStyle = '#f7f3ea'; x.fillRect(0, 0, w, h); x.fillStyle = '#1f4e7a'; x.fillRect(0, 0, w, 46); x.fillStyle = '#fff'; x.font = '700 30px Poppins'; x.textAlign = 'center'; x.fillText('SELAMAT DATANG', w / 2, 34); x.fillStyle = '#1f4e7a'; x.font = '800 44px Poppins'; x.fillText('PENDAFTARAN', w / 2, 120); x.font = '600 32px Poppins'; x.fillText('Pelajar Baharu 2026', w / 2, 178); }), roughness: 0.8, side: THREE.DoubleSide }));
  ban.castShadow = true; const banG = new THREE.Group(); banG.add(ban); ban.position.y = 1.9;
  for (const sx of [-1.6, 1.6]) { const p = cyl(0.04, 0.04, 2.5, '#888', { metal: 0.6, rough: 0.4 }); p.position.set(sx, 1.25, 0); banG.add(p); }
  banG.position.set(-3.6, 0, -4.5); banG.rotation.y = 0.35; s.add(banG);
  for (const [x, z, h] of [[-7, -6, 4.2], [7.5, -5, 4.6], [-9, 2, 3.8], [9, 3, 4], [-6, 8, 3.5], [6.5, 9, 3.9]]) s.add(at(tree(h), x, 0, z));
  for (let i = 0; i < 6; i++) { const b = sph(0.5, '#4d8a3c', { rough: 0.95 }); b.scale.y = 0.7; b.position.set(-4.5 + (i % 3) * 0.9 - (i > 2 ? -6.3 : 0), 0.3, -10.4); s.add(b); }
  // lamp posts
  for (const x of [-2.4, 2.4]) for (const z of [-1, 5]) { const p = cyl(0.05, 0.06, 3.2, '#333'); p.position.set(x, 1.6, z); s.add(p); const l = sph(0.15, '#fff', { mat: new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xfff3d0, emissiveIntensity: 0.4 }) }); l.position.set(x, 3.25, z); s.add(l); }
  const c = { ayah: cast.ayahOld(), ibu: cast.ibu(), aiman: cast.teen(), x1: cast.extra('#c94c4c', false), x2: cast.extra('#3f6fa8', true), x3: cast.extra('#4f9a6a', false) };
  Object.values(c).forEach(ch => s.add(ch.g));
  return { scene: s, c };
}

// ================= LIVING ROOM (night 2016 / day 2026) =================
export function setLiving(day) {
  setSeed(day ? 21 : 22);
  const s = base(day ? '#cfe4f0' : '#0c1222', day ? 0.45 : 0.18);
  const R = room({ w: 9, d: 8, h: 3.3, wall: day ? '#efe2c8' : '#e3cfae', sideWall: day ? '#e7d6b8' : '#d9c29e' }); s.add(R);
  // rug
  const rug = plane(3.2, 2.2, texMat(canvasTex(512, 352, (x, w, h) => { x.fillStyle = '#b9614a'; x.fillRect(0, 0, w, h); x.strokeStyle = '#efd9b4'; x.lineWidth = 10; x.strokeRect(20, 20, w - 40, h - 40); x.lineWidth = 4; x.strokeRect(44, 44, w - 88, h - 88); x.fillStyle = '#efd9b4'; for (let i = 0; i < 5; i++) { x.save(); x.translate(w / 2, h / 2); x.rotate(i * Math.PI / 5); x.fillRect(-60, -6, 120, 12); x.restore(); } }), 1)); rug.rotation.x = -Math.PI / 2; rug.position.set(0, 0.006, -1.2); s.add(rug);
  const so = sofa('#4f7d3d', 2.4); so.position.set(0, 0, -3.35); s.add(so);
  const cu1 = cushion('#e8d29a'); cu1.position.set(-0.85, 0.66, -3.4); cu1.rotation.y = 0.2; s.add(cu1);
  const cu2 = cushion('#c96f4a'); cu2.position.set(0.85, 0.66, -3.4); cu2.rotation.y = -0.2; s.add(cu2);
  const ct = coffeeTable('#7a4f2e', false); ct.position.set(0, 0, -1.7); s.add(ct);
  const f1 = frame(0.6, 0.75, artLeaf); f1.position.set(-0.7, 1.95, -3.98); s.add(f1);
  const f2 = frame(0.6, 0.75, artCaligraphy); f2.position.set(0.15, 1.95, -3.98); s.add(f2);
  const f3 = frame(0.5, 0.5, artSun); f3.position.set(0.9, 1.85, -3.98); s.add(f3);
  const wnd = windowPane(1.4, 1.6, day ? daySky : nightSky); wnd.position.set(2.85, 1.65, -3.97); s.add(wnd);
  // curtains
  for (const sx of [-0.95, 0.95]) { const cur = box(0.35, 2.2, 0.06, day ? '#d9c08a' : '#a98a55', { r: 0.03, rough: 1 }); cur.position.set(2.85 + sx, 1.6, -3.9); s.add(cur); }
  s.add(at(plant(1.1), -2.0, 0, -3.5));
  s.add(at(bushPlant(0.3), 3.8, 0, -3.3));
  const shelf = box(0.9, 1.8, 0.4, '#6b4a2e', { r: 0.02, rough: 0.6 }); shelf.position.set(-3.6, 0.9, -3.75); s.add(shelf);
  for (let i = 0; i < 3; i++) for (let k = 0; k < 4; k++) { const bk = box(0.07, 0.24 + rnd() * 0.06, 0.25, ['#a33', '#36a', '#da3', '#3a6', '#eee'][(i + k) % 5], { r: 0.005 }); bk.position.set(-3.88 + k * 0.1, 0.48 + i * 0.55, -3.7); s.add(bk); }
  if (day) {
    s.add(hemi(0xfff6e8, 0x8a7458, 1.2));
    const S = sun(0xfff1d8, 3.0, [5, 7, 3], [0, 0, -2], 6); s.add(S, S.target);
    const L = floorLamp(false); L.position.set(1.75, 0, -3.5); s.add(L);
    const fill = new THREE.PointLight(0xffe6c4, 6, 10, 1.5); fill.position.set(0, 2.6, 0.5); s.add(fill);
  } else {
    s.add(hemi(0x3d4f80, 0x2a2018, 0.45));
    const L = floorLamp(true, 0xffc98a, 9); L.position.set(1.75, 0, -3.5); s.add(L);
    const pd = pendant(0xffc27a, 7); pd.position.set(0, 2.5, -1.4); s.add(pd);
    const moon = new THREE.DirectionalLight(0x6f8fd0, 0.4); moon.position.set(3, 5, 4); s.add(moon);
  }
  const p = {};
  const c = {};
  if (day) {
    c.ayah = cast.ayahOld(); c.ibu = cast.ibu(); c.aiman = cast.teenNoBag();
    p.box = goldBox(); p.box.position.set(0, 0.445, -1.7); s.add(p.box);
    p.bars = p.box.userData.slots.map(sl => { const b = goldBar(1); b.position.set(...sl); p.box.add(b); return b; });
    p.letter = paper(0.21, 0.29, letterhead('TAWARAN KEMASUKAN', 'Ijazah Sarjana Muda 2026')); c.aiman.arms[1].userData.hand.add(p.letter); p.letter.position.set(-0.05, -0.08, 0.1); p.letter.rotation.set(-0.3, 0, 0);
    p.sparkle = new THREE.PointLight(0xffd27a, 0, 1.5, 2); p.sparkle.position.set(0, 0.75, -1.5); s.add(p.sparkle);
  } else {
    c.ayah = cast.ayahYoung(); c.kid = cast.kid();
    p.slip = paper(0.21, 0.29, (x, w, h) => { x.fillStyle = '#fff'; x.fillRect(0, 0, w, h); x.fillStyle = '#244'; x.font = 'bold 20px Poppins'; x.fillText('SLIP GAJI', 20, 36); x.font = '14px Poppins'; x.fillText('Gaji Pokok', 20, 80); x.fillText('RM 3,000', 150, 80); x.fillStyle = '#aaa'; for (let i = 0; i < 8; i++) x.fillRect(20, 110 + i * 22, 200, 5); });
    c.ayah.arms[1].userData.hand.add(p.slip); p.slip.position.set(-0.07, 0.02, 0.12); p.slip.rotation.set(-0.6, 0.2, 0);
    // toy car
    const car = new THREE.Group(); const cb = box(0.22, 0.08, 0.12, '#d63a2e', { r: 0.03, rough: 0.3 }); cb.position.y = 0.06; car.add(cb); const ctop = box(0.12, 0.06, 0.1, '#d63a2e', { r: 0.02, rough: 0.3 }); ctop.position.set(-0.01, 0.12, 0); car.add(ctop);
    for (const a of [-1, 1]) for (const b of [-1, 1]) { const wh = cyl(0.03, 0.03, 0.02, '#111'); wh.rotation.x = Math.PI / 2; wh.position.set(a * 0.07, 0.03, b * 0.065); car.add(wh); }
    p.car = car; s.add(car);
  }
  Object.values(c).forEach(ch => s.add(ch.g));
  return { scene: s, c, p };
}

// ================= DINING (night) =================
export function setDining() {
  setSeed(31);
  const s = base('#0c1222', 0.2);
  const R = room({ w: 8, d: 7, h: 3.2, wall: '#ecdcc0', floorTex: tileTex('#d9cdb8', '#d2c5ae', 6, [6, 6]) }); s.add(R);
  // kitchen cabinets on back wall
  const cab = box(3.6, 0.9, 0.6, '#f3efe6', { r: 0.02, rough: 0.5 }); cab.position.set(1.2, 0.45, -3.2); s.add(cab);
  const top = box(3.65, 0.05, 0.64, '#5b4636', { r: 0.01, rough: 0.3 }); top.position.set(1.2, 0.92, -3.2); s.add(top);
  const back = plane(3.6, 0.6, texMat(tileTex('#e9f0ef', '#dfe8e6', 12, [2, 1]), 0.3)); back.position.set(1.2, 1.25, -3.49); s.add(back);
  const upper = box(3.6, 0.7, 0.35, '#f3efe6', { r: 0.02, rough: 0.5 }); upper.position.set(1.2, 2.1, -3.32); s.add(upper);
  for (let i = 0; i < 4; i++) { const h = box(0.02, 0.12, 0.02, '#999', { metal: 0.8, rough: 0.3 }); h.position.set(-0.3 + i * 1, 0.7, -2.88); s.add(h); }
  const kettle = cyl(0.09, 0.12, 0.22, '#c9c9c9', { metal: 0.9, rough: 0.25 }); kettle.position.set(2.2, 1.06, -3.2); s.add(kettle);
  const clock = cyl(0.25, 0.25, 0.04, '#fff', { rough: 0.4 }); clock.rotation.x = Math.PI / 2; clock.position.set(-1.6, 2.2, -3.47); s.add(clock);
  const clockFace = plane(0.44, 0.44, new THREE.MeshStandardMaterial({ map: canvasTex(128, 128, (x, w, h) => { x.fillStyle = '#fff'; x.fillRect(0, 0, w, h); x.strokeStyle = '#222'; x.lineWidth = 5; x.beginPath(); x.moveTo(64, 64); x.lineTo(64, 24); x.moveTo(64, 64); x.lineTo(92, 70); x.stroke(); }), transparent: true })); clockFace.position.set(-1.6, 2.2, -3.44); s.add(clockFace);
  s.add(at(plant(0.9), -3.2, 0, -3.0));
  // table
  const tbl = new THREE.Group(); const tt = box(1.8, 0.06, 1.0, '#8a5a34', { r: 0.02, rough: 0.4 }); tt.position.y = 0.76; tbl.add(tt);
  for (const a of [-1, 1]) for (const b of [-1, 1]) { const l = box(0.06, 0.74, 0.06, '#5b3a22', { r: 0.01 }); l.position.set(a * 0.8, 0.37, b * 0.42); tbl.add(l); }
  tbl.position.set(0, 0, -0.9); s.add(tbl);
  const ch1 = chair('#b8874e', 0.48); ch1.position.set(-0.35, 0, -1.6); s.add(ch1);
  const ch2 = chair('#b8874e', 0.48); ch2.position.set(1.15, 0, -0.9); ch2.rotation.y = -Math.PI / 2; s.add(ch2);
  // props on table
  const calc = new THREE.Group(); const cbx = box(0.16, 0.025, 0.24, '#2c2c2c', { r: 0.01, rough: 0.4 }); calc.add(cbx);
  const cs = plane(0.13, 0.2, new THREE.MeshBasicMaterial({ map: canvasTex(130, 200, (x, w, h) => { x.fillStyle = '#2c2c2c'; x.fillRect(0, 0, w, h); x.fillStyle = '#b8c9a8'; x.fillRect(8, 8, w - 16, 44); x.fillStyle = '#111'; x.font = 'bold 30px monospace'; x.textAlign = 'right'; x.fillText('40000', w - 14, 42); x.fillStyle = '#ddd'; for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { x.fillRect(12 + i * 28, 64 + j * 32, 22, 24); } }) }));
  cs.rotation.x = -Math.PI / 2; cs.position.y = 0.014; calc.add(cs); calc.position.set(-0.05, 0.8, -0.65); calc.rotation.y = 0.3; s.add(calc);
  const bills = [];
  for (let i = 0; i < 3; i++) { const b = paper(0.21, 0.29, (x, w, h) => { x.fillStyle = '#fff'; x.fillRect(0, 0, w, h); x.fillStyle = ['#c0392b', '#2471a3', '#1e8449'][i]; x.fillRect(0, 0, w, 34); x.fillStyle = '#333'; x.font = 'bold 18px Poppins'; x.fillText(['BIL', 'YURAN', 'KOS'][i], 16, 70); x.fillStyle = '#aaa'; for (let k = 0; k < 8; k++) x.fillRect(16, 96 + k * 20, 180, 5); }); b.rotation.x = -Math.PI / 2; b.rotation.z = (i - 1) * 0.35; b.position.set(-0.55 + i * 0.2, 0.795 + i * 0.002, -0.75 + (i % 2) * 0.1); s.add(b); bills.push(b); }
  const mug = cyl(0.045, 0.04, 0.1, '#e8e2d6', { rough: 0.3 }); mug.position.set(0.55, 0.84, -0.7); s.add(mug);
  const pd = pendant(0xffc58a, 8); pd.position.set(0, 2.2, -0.9); s.add(pd);
  s.add(hemi(0x40507c, 0x2b2118, 0.5));
  const fill = new THREE.PointLight(0xffd9b0, 2.5, 8, 1.6); fill.position.set(0, 1.8, 2.5); s.add(fill);
  const c = { ayah: cast.ayahYoung(), ibu: cast.ibu() };
  Object.values(c).forEach(ch => s.add(ch.g));
  return { scene: s, c, p: { calc } };
}

// ================= MAMAK (night) =================
export function setMamak() {
  setSeed(41);
  const s = base('#070a14', 0.2);
  s.fog = new THREE.Fog(0x0a0f1c, 9, 22);
  const fl = plane(30, 30, texMat(tileTex('#8f8a82', '#858078', 10, [8, 8]), 0.7)); fl.rotation.x = -Math.PI / 2; s.add(fl);
  const wall = plane(14, 4, texMat(paintTex('#e7e2d2'), 0.9)); wall.position.set(0, 2, -4); s.add(wall);
  const sign = plane(7, 1.0, new THREE.MeshStandardMaterial({ map: canvasTex(1400, 200, (x, w, h) => { x.fillStyle = '#1d7a3a'; x.fillRect(0, 0, w, h); x.fillStyle = '#ffd43a'; x.font = '900 96px Poppins'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('RESTORAN SELERA KITA', w / 2, h / 2 - 10); x.fillStyle = '#fff'; x.font = '700 34px Poppins'; x.fillText('ROTI CANAI • TEH TARIK • 24 JAM', w / 2, h - 26); }), emissive: 0xffffff, emissiveMap: null, emissiveIntensity: 0, roughness: 0.6 }));
  sign.position.set(0, 3.2, -3.95); s.add(sign);
  // counter / stall
  const ctr = box(4, 1.0, 0.7, '#c8cfd6', { r: 0.02, metal: 0.5, rough: 0.35 }); ctr.position.set(-2.5, 0.5, -3.4); s.add(ctr);
  const glass = box(1.6, 0.6, 0.5, '#bfe0f0', { mat: new THREE.MeshPhysicalMaterial({ color: 0xcfe8f5, transparent: true, opacity: 0.35, roughness: 0.05 }) }); glass.position.set(-3, 1.3, -3.4); s.add(glass);
  for (let i = 0; i < 4; i++) { const tube = cyl(0.03, 0.03, 1.4, '#fff', { mat: new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xe8f6ff, emissiveIntensity: 2 }) }); tube.rotation.z = Math.PI / 2; tube.position.set(-4.5 + i * 3, 3.85, -2.5); s.add(tube); }
  for (let i = 0; i < 3; i++) { const L = new THREE.PointLight(0xe6f2ff, 7, 8, 1.4); L.position.set(-3 + i * 3, 3.6, -1.5); if (i === 1) { L.castShadow = true; L.shadow.mapSize.set(1024, 1024); L.shadow.radius = 5; L.shadow.bias = -0.002; } s.add(L); }
  s.add(hemi(0x5868a0, 0x2a2622, 0.6));
  const warm = new THREE.PointLight(0xffb070, 3, 6, 1.5); warm.position.set(2.5, 2, 1.5); s.add(warm);
  function table(x, z, col = '#f2f2f2') {
    const g = new THREE.Group(); const t = cyl(0.55, 0.55, 0.04, col, { rough: 0.4 }); t.position.y = 0.74; g.add(t);
    const p = cyl(0.05, 0.05, 0.72, '#999', { metal: 0.6, rough: 0.4 }); p.position.y = 0.37; g.add(p);
    g.position.set(x, 0, z); s.add(g); return g;
  }
  function stool(x, z, col = '#c0392b') { const g = new THREE.Group(); const st = cyl(0.17, 0.15, 0.04, col, { rough: 0.4 }); st.position.y = 0.45; g.add(st); for (let i = 0; i < 4; i++) { const l = cyl(0.015, 0.02, 0.45, col); const a = i * Math.PI / 2 + 0.78; l.position.set(Math.cos(a) * 0.1, 0.22, Math.sin(a) * 0.1); g.add(l); } g.position.set(x, 0, z); s.add(g); }
  table(0, -0.6);
  table(-3.2, -0.2, '#2e7bc4'); table(3.3, -1.2, '#2e7bc4'); table(-2.5, 2.5); table(3.8, 2.4);
  stool(-0.8, -0.6); stool(0.8, -0.6); stool(0, -1.4, '#2e7bc4');
  for (const [x, z] of [[-3.9, -0.2], [-2.5, -0.2], [2.6, -1.2], [4, -1.2]]) stool(x, z, '#e0a020');
  const tea = (x, z) => { const g = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.038, 0.13, 24), new THREE.MeshPhysicalMaterial({ color: 0xc8874c, roughness: 0.15, transmission: 0.2, thickness: 0.05 })); g.position.set(x, 0.825, z); g.castShadow = true; s.add(g); const foam = cyl(0.044, 0.044, 0.01, '#f3e3c6'); foam.position.set(x, 0.89, z); s.add(foam); };
  tea(-0.25, -0.35); tea(0.3, -0.4); tea(0.05, -0.85);
  const roti = cyl(0.14, 0.14, 0.015, '#e3b672', { rough: 0.8 }); roti.position.set(0, 0.77, -0.5); s.add(roti);
  const plateM = cyl(0.17, 0.15, 0.012, '#fff', { rough: 0.3 }); plateM.position.set(0, 0.765, -0.5); s.add(plateM);
  const c = { ayah: cast.ayahYoung(), f1: cast.friend1(), f2: cast.friend2() };
  Object.values(c).forEach(ch => s.add(ch.g));
  return { scene: s, c };
}

// ================= STUDY (montage, night) =================
export function setStudy() {
  setSeed(51);
  const s = base('#0c1222', 0.18);
  const R = room({ w: 7, d: 6, h: 3.1, wall: '#2f4a5e', sideWall: '#2a4255' }); s.add(R);
  const desk = new THREE.Group(); const dt = box(1.6, 0.05, 0.7, '#7a4f2e', { r: 0.01, rough: 0.45 }); dt.position.y = 0.76; desk.add(dt);
  const drw = box(0.45, 0.7, 0.65, '#6b4428', { r: 0.01 }); drw.position.set(0.55, 0.37, 0); desk.add(drw); const modesty = box(1.5, 0.45, 0.03, '#6b4428', { r: 0.005 }); modesty.position.set(0, 0.5, 0.3); desk.add(modesty);
  const lg = box(0.05, 0.74, 0.6, '#6b4428'); lg.position.set(-0.75, 0.37, 0); desk.add(lg);
  desk.position.set(0, 0, -1.9); s.add(desk);
  const lamp = tableLamp(0xffc98a, 5); lamp.position.set(-0.6, 0.785, -2.05); s.add(lamp);
  const box1 = goldBox(); box1.position.set(0.05, 0.785, -1.8); s.add(box1);
  const bars = box1.userData.slots.map(sl => { const b = goldBar(1); b.position.set(...sl); b.visible = false; box1.add(b); return b; });
  const handBar = goldBar(1); s.add(handBar); handBar.visible = false;
  // calendar
  const calTex = canvasTex(256, 320, () => { });
  const cal = plane(0.5, 0.62, texMat(calTex, 0.9)); cal.position.set(0.55, 2.05, -2.98); s.add(cal);
  const drawCal = (year, month) => { const x = calTex.userData.ctx, w = 256, h = 320; x.fillStyle = '#fbf8f0'; x.fillRect(0, 0, w, h); x.fillStyle = '#b23a2e'; x.fillRect(0, 0, w, 90); x.fillStyle = '#fff'; x.font = '800 62px Poppins'; x.textAlign = 'center'; x.fillText(String(year), w / 2, 70); x.fillStyle = '#333'; x.font = '700 26px Poppins'; x.fillText(['JAN', 'FEB', 'MAC', 'APR', 'MEI', 'JUN', 'JUL', 'OGO', 'SEP', 'OKT', 'NOV', 'DIS'][month], w / 2, 128); x.fillStyle = '#bbb'; for (let i = 0; i < 5; i++) for (let j = 0; j < 7; j++) x.fillRect(22 + j * 31, 150 + i * 32, 22, 22); x.fillStyle = '#d4a017'; x.beginPath(); x.arc(22 + 11, 150 + 11, 14, 0, 7); x.fill(); calTex.needsUpdate = true; };
  drawCal(2016, 0);
  const wnd = windowPane(1.0, 1.2, nightSky); wnd.position.set(-1.7, 1.7, -2.97); s.add(wnd);
  const fr = frame(0.4, 0.5, (x, w, h) => { x.fillStyle = '#f0e6d2'; x.fillRect(0, 0, w, h); x.fillStyle = '#f2b134'; x.beginPath(); x.arc(w / 2, h * 0.4, 38, 0, 7); x.fill(); x.fillStyle = '#f6e7d2'; x.beginPath(); x.arc(w / 2, h * 0.38, 30, 0, 7); x.fill(); x.fillStyle = '#222'; x.fillRect(w / 2 - 12, h * 0.36, 6, 8); x.fillRect(w / 2 + 6, h * 0.36, 6, 8); x.font = '700 24px Poppins'; x.textAlign = 'center'; x.fillText('Aiman', w / 2, h * 0.85); }, '#c9a43a');
  fr.position.set(-0.45, 2.0, -2.97); s.add(fr);
  const ch = chair('#5b3a22', 0.48); ch.position.set(0, 0, -2.55); s.add(ch);
  s.add(hemi(0x3a4f78, 0x1d1712, 0.5));
  const fill = new THREE.PointLight(0xffd0a0, 2.2, 7, 1.6); fill.position.set(1.5, 2, 0.5); s.add(fill);
  const c = { ayah: cast.ayahYoung() };
  s.add(c.ayah.g);
  return { scene: s, c, p: { bars, handBar, box: box1, drawCal } };
}

// ================= GOLD CHART (studio) =================
export function setChart() {
  setSeed(61);
  const s = base(skyTex('#141018', '#2a2030'), 0.6);
  const fl = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), new THREE.MeshStandardMaterial({ color: 0x1a1518, roughness: 0.3, metalness: 0.3 })); fl.rotation.x = -Math.PI / 2; fl.receiveShadow = true; s.add(fl);
  s.add(hemi(0x8a7a9a, 0x1a1414, 0.5));
  const sp = new THREE.SpotLight(0xffe2b0, 60, 20, 0.6, 0.6, 1.4); sp.position.set(0, 7, 4); sp.target.position.set(0, 0.5, 0); sp.castShadow = true; sp.shadow.mapSize.set(2048, 2048); sp.shadow.bias = -0.0005; s.add(sp, sp.target);
  const rim = new THREE.PointLight(0xffb060, 8, 10, 1.5); rim.position.set(-3, 2.5, -2); s.add(rim);
  const data = [[2016, 170], [2020, 250], [2023, 290], [2026, 620]];
  const stacks = [];
  data.forEach(([yr, pr], i) => {
    const g = new THREE.Group(); const x = -0.96 + i * 0.64; g.position.set(x, 0, 0); s.add(g);
    const n = Math.round(pr / 26);
    const bars = [];
    for (let k = 0; k < n; k++) { const b = goldBar(3.4); b.position.y = 0.045 + k * 0.085; b.rotation.y = (k % 2) * Math.PI / 2 * 0 + (rnd() - .5) * 0.08; g.add(b); bars.push(b); }
    const lbl = plane(0.6, 0.22, new THREE.MeshBasicMaterial({ map: canvasTex(320, 120, (cx, w, h) => { cx.fillStyle = '#f3e3b0'; cx.font = '800 72px Poppins'; cx.textAlign = 'center'; cx.textBaseline = 'middle'; cx.fillText(String(yr), w / 2, h / 2); }), transparent: true }));
    lbl.position.set(0, 0.02, 0.5); lbl.rotation.x = -Math.PI / 2 + 0.5; g.add(lbl);
    let tag = null;
    if (i === 0 || i === data.length - 1) {
      tag = plane(0.9, 0.33, new THREE.MeshBasicMaterial({ map: canvasTex(440, 160, (cx, w, h) => { cx.fillStyle = 'rgba(0,0,0,0)'; cx.clearRect(0, 0, w, h); cx.fillStyle = '#fff'; cx.font = '800 76px Poppins'; cx.textAlign = 'center'; cx.textBaseline = 'middle'; cx.fillText('±RM' + pr, w / 2, h / 2 - 8); cx.font = '600 30px Poppins'; cx.fillStyle = '#f3d47a'; cx.fillText('segram', w / 2, h - 18); }), transparent: true }));
      tag.position.set(0, 0.05 + n * 0.085 + 0.3, 0); g.add(tag);
    }
    stacks.push({ g, bars, tag, n });
  });
  return { scene: s, c: {}, p: { stacks } };
}

// ================= GOLD SHOP (CTA) =================
export function setShop() {
  setSeed(71);
  const s = base('#f0e6d6', 0.5);
  const fl = plane(20, 20, texMat(tileTex('#efe9df', '#e6dfd2', 4, [6, 6]), 0.25)); fl.rotation.x = -Math.PI / 2; s.add(fl);
  const wall = plane(12, 4, texMat(paintTex('#f3ece0'), 0.9)); wall.position.set(0, 2, -3.5); s.add(wall);
  for (let i = 0; i < 26; i++) { const sl = box(0.12, 3.2, 0.08, i % 2 ? '#9a6a3a' : '#8a5c30', { r: 0.01, rough: 0.6 }); sl.position.set(-4.3 + i * 0.18, 1.6, -3.42); if (Math.abs(-4.3 + i * 0.18) < 1.5) continue; s.add(sl); }
  const signBoard = box(3.0, 1.0, 0.08, '#f7f2e8', { r: 0.02 }); signBoard.position.set(0, 1.95, -3.4); s.add(signBoard);
  const signTxt = plane(2.9, 0.9, new THREE.MeshStandardMaterial({ map: canvasTex(900, 280, (x, w, h) => { x.clearRect(0, 0, w, h); x.fillStyle = '#c1121f'; x.font = '700 120px Lora'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('PUBLIC GOLD', w / 2, h / 2 - 10); x.fillStyle = '#9a7a2a'; x.font = '600 38px Poppins'; x.fillText('Simpanan Emas', w / 2, h - 34); }), transparent: true, roughness: 0.7 }));
  signTxt.position.set(0, 1.95, -3.35); s.add(signTxt);
  // counter
  const ctr = box(3.4, 0.95, 0.7, '#1c1c1c', { r: 0.02, rough: 0.3 }); ctr.position.set(0, 0.475, -2.3); s.add(ctr);
  const strip = box(3.42, 0.03, 0.02, '#fff', { mat: new THREE.MeshStandardMaterial({ color: 0xffd060, emissive: 0xffc030, emissiveIntensity: 3 }) }); strip.position.set(0, 0.06, -1.94); s.add(strip);
  const glassTop = box(3.4, 0.35, 0.7, '#fff', { mat: new THREE.MeshPhysicalMaterial({ color: 0xffffff, transparent: true, opacity: 0.18, roughness: 0.02, metalness: 0 }), r: 0.01 }); glassTop.position.set(0, 1.13, -2.3); s.add(glassTop);
  for (let i = 0; i < 10; i++) { const b = goldBar(1.6); b.position.set(-1.4 + i * 0.31, 0.975, -2.3 + (i % 2) * 0.12); b.rotation.y = 0.2; s.add(b); }
  for (let i = 0; i < 4; i++) { const sp = pendant(0xffd9a0, 3, i === 1); sp.position.set(-1.5 + i * 1, 3.2, -1.8); s.add(sp); }
  s.add(at(bushPlant(0.32), -2.6, 0, -2.6)); s.add(at(bushPlant(0.32), 2.6, 0, -2.6));
  s.add(hemi(0xfff4e6, 0x9a8670, 1.1));
  const key = sun(0xfff0dc, 1.8, [2, 6, 5], [0, 0.5, -1], 5); s.add(key, key.target);
  const c = { ayah: cast.ayahOld(), ibu: cast.ibu(), aiman: cast.teenNoBag() };
  Object.values(c).forEach(ch => s.add(ch.g));
  return { scene: s, c };
}
