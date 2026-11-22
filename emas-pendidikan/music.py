# Procedural background score: soft piano + string pad, 70 BPM, follows the story's arc.
# Usage: python3 music.py out.wav DURATION
import sys, numpy as np, wave
SR = 44100
OUT, DUR = sys.argv[1], float(sys.argv[2])
rng = np.random.default_rng(7)
N = int(SR * (DUR + 3))
L = np.zeros(N); R = np.zeros(N)
BPM = 70; BEAT = 60 / BPM; BAR = 4 * BEAT
mid = lambda m: 440 * 2 ** ((m - 69) / 12)

# chords as midi notes (root position-ish voicings around middle C)
CH = {'C': [48, 55, 60, 64, 67], 'G/B': [47, 55, 59, 62, 67], 'Am': [45, 52, 57, 60, 64], 'F': [41, 53, 57, 60, 65],
      'Em': [40, 52, 55, 59, 64], 'Dm': [38, 53, 57, 62, 65], 'G': [43, 55, 59, 62, 67], 'Fmaj7': [41, 52, 57, 60, 64]}
# intro (tender) / flashback (wistful) / build / reveal (warm) / ending
INTRO = ['C', 'G/B', 'Am', 'F']
FLASH = ['Am', 'F', 'C', 'G', 'Am', 'Em', 'F', 'G']
WARM = ['F', 'G', 'Em', 'Am', 'Dm', 'G', 'C', 'C']
def chord_at(bar, t):
    if t < 12.5: return INTRO[bar % 4]
    if t < 58.3: return FLASH[bar % 8]
    return WARM[bar % 8]
def intensity(t):  # 0..1 arc of the story
    pts = [(0, .35), (12.5, .4), (32, .5), (43.8, .6), (58.3, .8), (67.5, 1.0), (76.8, .9), (DUR - 3, .7), (DUR, .0)]
    for (a, va), (b, vb) in zip(pts, pts[1:]):
        if a <= t <= b: return va + (vb - va) * (t - a) / max(1e-6, b - a)
    return 0

def add(sig, start, pan, gain):
    i = int(start * SR); j = min(N, i + len(sig))
    if j <= i: return
    s = sig[:j - i] * gain
    L[i:j] += s * np.cos(pan * np.pi / 2); R[i:j] += s * np.sin(pan * np.pi / 2)

def piano(m, dur, vel):
    f = mid(m); n = int(SR * dur); t = np.arange(n) / SR
    out = np.zeros(n)
    for k in range(1, 9):
        fk = f * k * np.sqrt(1 + 0.0004 * k * k)
        if fk > 15000: break
        amp = vel / k ** 1.4 * (1.0 if k < 3 else 0.7)
        dec = np.exp(-t * (1.2 + 0.9 * k) * (0.6 + f / 900))
        out += amp * np.sin(2 * np.pi * fk * t + rng.random() * 6.28) * dec
    att = np.minimum(1, t / 0.004); rel = np.minimum(1, (dur - t) / 0.25).clip(0, 1)
    return out * att * rel

def pad(m, dur):
    f = mid(m); n = int(SR * dur); t = np.arange(n) / SR
    out = np.zeros(n)
    for det in (-0.12, 0.0, 0.11):
        fd = f * 2 ** (det / 12)
        vib = 0.0025 * np.sin(2 * np.pi * 5.2 * t + rng.random() * 6)
        ph = 2 * np.pi * fd * t * (1 + vib)
        for k in range(1, 10):
            if fd * k > 6000: break
            out += np.sin(k * ph) / k * np.exp(-k * 0.25)
    env = np.minimum(1, t / 1.2) * np.minimum(1, (dur - t) / 1.2).clip(0, 1)
    return out * env / 3

nbars = int(np.ceil(DUR / BAR)) + 1
for b in range(nbars):
    t0 = b * BAR
    if t0 >= DUR - 1: break
    c = chord_at(b, t0); notes = CH[c]; I = intensity(t0)
    # piano arpeggio (eighth notes), pattern rises then falls
    patt = [0, 2, 3, 4, 3, 2, 3, 4] if I < .75 else [0, 2, 3, 4, 2, 3, 4, 3]
    for k, p in enumerate(patt):
        st = t0 + k * BEAT / 2 + rng.normal(0, .006)
        m = notes[p] + (12 if (I > .85 and k % 4 == 3) else 0)
        vel = (0.30 + 0.25 * I) * (1.15 if k == 0 else 0.85 + 0.15 * rng.random())
        add(piano(m, BEAT * 2.2, vel), st, 0.35 + 0.3 * (p / 4), 1.0)
    # bass note
    add(piano(notes[0] - 12, BAR, 0.35 + 0.2 * I), t0, 0.5, 0.9)
    # string pad from the flashback onwards, swelling with intensity
    if t0 >= 10:
        for p in notes[1:]:
            add(pad(p + 12, BAR + 1.3), t0 - 0.3, 0.2 + 0.6 * rng.random(), 0.045 * I)
    # simple melody in the warm section
    if t0 >= 58.3:
        mel = [notes[4] + 12, notes[3] + 12] if b % 2 == 0 else [notes[3] + 12, notes[2] + 12]
        add(piano(mel[0], BEAT * 2.5, 0.42 * I), t0, 0.55, 1.0)
        add(piano(mel[1], BEAT * 2.5, 0.36 * I), t0 + 2 * BEAT, 0.55, 1.0)

# final resolving C chord
end = max(0, DUR - 4.0)
for m in CH['C']: add(piano(m, 4.5, .4), end, 0.5, 1.0)
for m in CH['C'][1:]: add(pad(m + 12, 4.5), end - .2, .5, .05)

mix = np.stack([L, R], 1)[:int(SR * DUR)]
fade = np.ones(len(mix)); fo = int(SR * 2.5); fade[-fo:] = np.linspace(1, 0, fo); fade[:int(SR * .8)] = np.linspace(0, 1, int(SR * .8))
mix *= fade[:, None]
mix /= np.abs(mix).max() * 1.12
with wave.open(OUT, 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((mix * 32767).astype('<i2').tobytes())
print('ok', OUT, len(mix) / SR)
