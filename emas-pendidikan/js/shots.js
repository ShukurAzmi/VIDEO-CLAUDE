// Shot direction: camera moves + acting, per shot. f = 0..1 progress in shot, lt = local seconds, t = global seconds.
import { THREE, lerp, ease, easeOut, seg, clamp, goldBar } from './world.js';

const V = new THREE.Vector3(), V2 = new THREE.Vector3();
export function camPath(cam, keys, f, t) {
  let i = 0; while (i < keys.length - 2 && f > keys[i + 1].f) i++;
  const a = keys[i], b = keys[i + 1] || a;
  const k = b === a ? 0 : ease(clamp((f - a.f) / (b.f - a.f)));
  V.set(lerp(a.p[0], b.p[0], k), lerp(a.p[1], b.p[1], k), lerp(a.p[2], b.p[2], k));
  V2.set(lerp(a.l[0], b.l[0], k), lerp(a.l[1], b.l[1], k), lerp(a.l[2], b.l[2], k));
  // subtle handheld drift
  V.x += Math.sin(t * 0.7) * 0.012; V.y += Math.sin(t * 0.9 + 1) * 0.008;
  cam.position.copy(V); cam.lookAt(V2);
  cam.fov = lerp(a.fov || 40, b.fov || 40, k); cam.updateProjectionMatrix();
}
function place(ch, x, y, z, ry = 0) { ch.g.position.set(x, y, z); ch.g.rotation.y = ry; }
function resetPose(ch) { Object.assign(ch.pose, { sit: false, walk: 0, armL: 0, armR: 0, wave: 0, lookY: 0, lookX: 0, hug: 0, celebrate: 0, laughShake: false }); ch.state.talk = false; }
const talking = (ctx, who) => ctx.talk.some(s => s.who === who && ctx.t >= s.start && ctx.t <= s.end);

export const SHOTS = {
  // 1. Registration day at the university (present)
  uni: { set: 'uni', run(S, f, lt, d, cam, ctx) {
    const { ayah, ibu, aiman, x1, x2, x3 } = S.c; [ayah, ibu, aiman, x1, x2, x3].forEach(resetPose);
    const walkF = clamp(f / 0.8);
    const z = lerp(-4.5, 0.6, easeOut(walkF));
    const walking = f < 0.8 ? 1 : Math.max(0, 1 - (f - 0.8) * 10);
    place(aiman, 0, 0, z); aiman.pose.walk = walking; aiman.setExpr(f > 0.7 ? 'happy' : 'smile');
    place(ayah, -0.75, 0, z - 1.0); ayah.pose.walk = walking; ayah.setExpr('proud');
    place(ibu, 0.75, 0, z - 1.1); ibu.pose.walk = walking; ibu.setExpr('happy');
    if (f > 0.82) { aiman.g.rotation.y = lerp(0, Math.PI * 0.85, ease(seg(f, 0.82, 0.95))); aiman.pose.lookX = -0.15; ayah.pose.wave = ease(seg(f, 0.85, 0.92)); ibu.pose.wave = ease(seg(f, 0.87, 0.94)); }
    place(x1, lerp(-6, 5, f), 0, -6.5, Math.PI / 2); x1.pose.walk = 1;
    place(x2, lerp(5.5, -3, f), 0, -7.8, -Math.PI / 2); x2.pose.walk = 1;
    place(x3, 3.2, 0, -5.2, -0.6); x3.setExpr('smile');
    camPath(cam, [
      { f: 0, p: [0.5, 0.9, 7.5], l: [0, 2.2, -8], fov: 46 },
      { f: 0.7, p: [0.3, 1.05, 5.2], l: [0, 1.9, -6], fov: 44 },
      { f: 1, p: [0.0, 1.2, 4.4], l: [0, 1.9, -6], fov: 42 }], f, ctx.t);
  } },
  // 2. 2016 living room at night: payslip, kid playing
  night: { set: 'livingNight', run(S, f, lt, d, cam, ctx) {
    const { ayah, kid } = S.c; resetPose(ayah); resetPose(kid);
    place(ayah, -0.35, 0.15, -3.25); ayah.pose.sit = true; ayah.pose.armR = -1.25; ayah.pose.lookX = 0.32;
    ayah.setExpr(f < 0.55 ? 'worried' : 'smile');
    if (f >= 0.55) { ayah.pose.lookX = 0.05; ayah.pose.lookY = lerp(0, -0.55, ease(seg(f, 0.55, 0.7))); ayah.g.rotation.y = -0.15; }
    const cx = Math.sin(lt * 1.1) * 0.6 + 0.9;
    place(kid, cx - 0.25, 0, -0.6, Math.cos(lt * 1.1) > 0 ? Math.PI / 2 : -Math.PI / 2); kid.pose.armR = -0.8; kid.setExpr('happy'); kid.pose.walk = 0.5;
    S.p.car.position.set(cx + (Math.cos(lt * 1.1) > 0 ? 0.08 : -0.55), 0, -0.6); S.p.car.rotation.y = Math.cos(lt * 1.1) > 0 ? 0 : Math.PI;
    camPath(cam, [
      { f: 0, p: [0.2, 1.4, 2.6], l: [0, 0.9, -2.2], fov: 44 },
      { f: 0.55, p: [-0.1, 1.3, 0.6], l: [-0.3, 1.1, -3.0], fov: 40 },
      { f: 1, p: [0.5, 1.15, 0.9], l: [0.3, 0.7, -1.6], fov: 40 }], f, ctx.t);
  } },
  // 3. Dining table: the cost of university; Ibu worried
  dining: { set: 'dining', run(S, f, lt, d, cam, ctx) {
    const { ayah, ibu } = S.c; resetPose(ayah); resetPose(ibu);
    place(ayah, -0.35, 0.09, -1.5); ayah.pose.sit = true; ayah.pose.lookX = 0.35; ayah.pose.armR = -1.1; ayah.pose.armL = -0.9; ayah.setExpr('worried');
    place(ibu, 0.62, 0, -1.55, -0.35); ibu.pose.armL = -0.5; ibu.pose.armR = -0.5; ibu.setExpr('worried'); ibu.pose.lookX = 0.1;
    ibu.state.talk = talking(ctx, 'ibu'); if (ibu.state.talk) { ibu.pose.lookY = -0.4; ayah.pose.lookX = 0.05; ayah.pose.lookY = 0.45; }
    camPath(cam, [
      { f: 0, p: [-0.1, 1.9, 1.0], l: [0, 0.8, -0.8], fov: 40 },
      { f: 0.45, p: [0.0, 1.5, 1.4], l: [0.1, 1.0, -1.2], fov: 40 },
      { f: 1, p: [0.5, 1.45, 0.6], l: [0.55, 1.25, -1.5], fov: 38 }], f, ctx.t);
  } },
  // 4. The decision: RM100 a month into gold
  decide: { set: 'dining', run(S, f, lt, d, cam, ctx) {
    const { ayah, ibu } = S.c; resetPose(ayah); resetPose(ibu);
    if (!S.p.bar) { S.p.bar = goldBar(1.6); S.scene.add(S.p.bar); }
    place(ayah, -0.35, 0.09, -1.5); ayah.pose.sit = true;
    const up = ease(seg(f, 0.05, 0.25));
    ayah.pose.lookX = lerp(0.35, -0.05, up); ayah.setExpr(f < 0.2 ? 'worried' : f < 0.55 ? 'determined' : 'smile');
    ayah.pose.armR = lerp(-1.1, -1.4, ease(seg(f, 0.5, 0.65)));
    place(ibu, 0.62, 0, -1.55, -0.35); ibu.setExpr(f > 0.6 ? 'smile' : 'worried'); ibu.pose.lookY = -0.4;
    const bs = ease(seg(f, 0.55, 0.7)); S.p.bar.scale.setScalar(Math.max(0.001, bs)); S.p.bar.position.set(-0.3, 0.8 + 0.02 + Math.sin(lt * 2) * 0.004, -0.95); S.p.bar.rotation.y = lt * 0.6;
    camPath(cam, [
      { f: 0, p: [-0.3, 1.35, 0.15], l: [-0.35, 1.3, -1.5], fov: 34 },
      { f: 0.5, p: [-0.25, 1.38, -0.2], l: [-0.35, 1.3, -1.5], fov: 34 },
      { f: 0.75, p: [-0.15, 1.3, 0.0], l: [-0.3, 0.95, -1.1], fov: 36 },
      { f: 1, p: [-0.2, 1.25, -0.2], l: [-0.3, 0.9, -1.0], fov: 34 }], f, ctx.t);
  } },
  // 5. Mamak: friends laugh
  mamak: { set: 'mamak', run(S, f, lt, d, cam, ctx) {
    const { ayah, f1, f2 } = S.c; [ayah, f1, f2].forEach(resetPose);
    place(ayah, 0, 0.05, -1.45); ayah.pose.sit = true; ayah.setExpr(f > 0.6 ? 'smile' : 'neutral');
    place(f1, -0.55, 0.05, -0.45, Math.PI / 2 - 0.7); f1.pose.sit = true;
    place(f2, 0.55, 0.05, -0.45, -Math.PI / 2 + 0.7); f2.pose.sit = true;
    f1.state.talk = talking(ctx, 'f1');
    const laugh = !f1.state.talk;
    f1.setExpr(laugh ? 'laugh' : 'skeptic'); f1.pose.laughShake = laugh; f1.pose.armR = laugh ? -0.5 + Math.sin(lt * 9) * 0.2 : -0.8;
    f2.setExpr('laugh'); f2.pose.laughShake = true; f2.pose.armL = -0.4 + Math.sin(lt * 8) * 0.2;
    camPath(cam, [
      { f: 0, p: [0, 1.75, 3.6], l: [0, 0.95, -0.9], fov: 42 },
      { f: 1, p: [0.1, 1.5, 2.6], l: [0, 1.0, -0.9], fov: 40 }], f, ctx.t);
  } },
  // 6. Montage: years pass, bars accumulate
  montage: { set: 'study', run(S, f, lt, d, cam, ctx) {
    const { ayah } = S.c; resetPose(ayah);
    place(ayah, 0, 0.09, -2.45); ayah.pose.sit = true; ayah.setExpr('smile');
    const months = 120, m = Math.floor(f * (months - 1));
    const year = 2016 + Math.floor(m / 12);
    if (S._y !== year) { S._y = year; S.p.drawCal(year, m % 12); }
    const nVis = Math.min(24, 1 + Math.floor(f * 24));
    S.p.bars.forEach((b, i) => b.visible = i < nVis);
    const beat = (f * 24) % 1;
    ayah.pose.armR = -1.2 * Math.sin(Math.PI * clamp(beat * 1.3));
    ayah.pose.lookX = 0.35;
    camPath(cam, [
      { f: 0, p: [0.0, 1.55, 1.6], l: [0.05, 1.15, -2.2], fov: 40 },
      { f: 1, p: [0.2, 1.4, 0.3], l: [0.05, 0.95, -1.9], fov: 38 }], f, ctx.t);
  } },
  // 7. Gold price chart in 3D
  chart: { set: 'chart', run(S, f, lt, d, cam, ctx) {
    S.p.stacks.forEach((st, i) => {
      const g0 = i / S.p.stacks.length * 0.6, g1 = g0 + 0.28;
      const k = seg(f, g0, g1);
      const vis = Math.floor(easeOut(k) * st.n + 0.999 * (k > 0));
      st.bars.forEach((b, j) => { b.visible = j < vis; });
      if (st.tag) { st.tag.visible = k >= 1; st.tag.lookAt(cam.position); }
    });
    camPath(cam, [
      { f: 0, p: [-1.0, 0.7, 2.4], l: [-0.8, 0.5, 0], fov: 44 },
      { f: 0.7, p: [0.1, 1.3, 4.9], l: [0.0, 1.05, 0], fov: 44 },
      { f: 1, p: [0.15, 1.4, 5.0], l: [0.05, 1.1, 0], fov: 44 }], f, ctx.t);
  } },
  // 8. Present day: the box of gold and the offer letter
  reveal: { set: 'livingDay', run(S, f, lt, d, cam, ctx) {
    const { ayah, ibu, aiman } = S.c; [ayah, ibu, aiman].forEach(resetPose);
    place(ayah, -0.75, 0, -2.55, 0.15); ayah.setExpr('proud');
    place(ibu, 0.75, 0, -2.55, -0.15); ibu.setExpr('happy');
    place(aiman, 0.95, 0, -0.85, -0.5); aiman.setExpr(f > 0.5 ? 'surprised' : 'happy'); aiman.pose.armR = -1.4; aiman.pose.lookX = 0.3;
    if (f > 0.5) { aiman.pose.armR = -0.6; aiman.pose.lookX = 0.35; }
    if (f > 0.78) { aiman.setExpr('happy'); aiman.pose.celebrate = ease(seg(f, 0.78, 0.86)); }
    S.p.sparkle.intensity = 2 + Math.sin(lt * 6) * 1;
    camPath(cam, [
      { f: 0, p: [0.05, 1.05, -0.95], l: [0, 0.42, -1.75], fov: 38 },
      { f: 0.45, p: [0.2, 1.2, -0.6], l: [0, 0.5, -1.75], fov: 40 },
      { f: 1, p: [0.15, 1.45, 2.3], l: [0.1, 0.9, -1.6], fov: 42 }], f, ctx.t);
  } },
  // 9. Father and son
  hug: { set: 'livingDay', run(S, f, lt, d, cam, ctx) {
    const { ayah, ibu, aiman } = S.c; [ayah, ibu, aiman].forEach(resetPose);
    const close = ease(seg(f, 0.8, 0.92));
    place(ayah, lerp(-0.4, -0.27, close), 0, -0.5, 1.0);
    place(aiman, lerp(0.4, 0.27, close), 0, -0.5, -1.0);
    place(ibu, 0.9, 0, -2.6, -0.3); ibu.setExpr('happy');
    aiman.state.talk = talking(ctx, 'aiman'); ayah.state.talk = talking(ctx, 'ayah');
    aiman.setExpr(aiman.state.talk ? 'neutral' : (f > 0.8 ? 'closed' : 'smile'));
    ayah.setExpr(f > 0.8 ? 'closed' : 'proud');
    ayah.pose.lookX = 0.08; aiman.pose.lookX = -0.02;
    ayah.pose.armL = ayah.pose.armR = -1.3 * close; ayah.pose.hug = close * 0.2;
    aiman.pose.armL = aiman.pose.armR = -1.3 * close; aiman.pose.hug = close * 0.2;
    if (aiman.state.talk) aiman.pose.armL = -0.6;
    camPath(cam, [
      { f: 0, p: [0.0, 1.4, 2.0], l: [0.0, 1.05, -0.5], fov: 40 },
      { f: 0.5, p: [-0.1, 1.38, 1.7], l: [-0.05, 1.1, -0.5], fov: 40 },
      { f: 0.8, p: [0.1, 1.38, 1.7], l: [0.05, 1.1, -0.5], fov: 40 },
      { f: 1, p: [0.0, 1.5, 2.3], l: [0.0, 1.05, -0.6], fov: 42 }], f, ctx.t);
  } },
  // 10. CTA at the gold shop
  shop: { set: 'shop', run(S, f, lt, d, cam, ctx) {
    const { ayah, ibu, aiman } = S.c; [ayah, ibu, aiman].forEach(resetPose);
    place(ayah, -0.75, 0, -1.2, 0.1); ayah.setExpr('happy');
    place(aiman, 0, 0, -0.9); aiman.setExpr('happy');
    place(ibu, 0.75, 0, -1.2, -0.1); ibu.setExpr('happy');
    const w = ease(seg(f, 0.15, 0.25)) * (1 - ease(seg(f, 0.55, 0.65)));
    ayah.pose.wave = w; ibu.pose.wave = ease(seg(f, 0.2, 0.3)) * (1 - ease(seg(f, 0.6, 0.7)));
    aiman.pose.armR = -0.3 * w;
    camPath(cam, [
      { f: 0, p: [0, 1.2, 2.4], l: [0, 1.05, -1.2], fov: 42 },
      { f: 1, p: [0, 1.35, 3.6], l: [0, 1.15, -1.5], fov: 44 }], f, ctx.t);
  } },
};
