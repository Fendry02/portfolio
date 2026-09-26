// Offline, deterministic soundtrack for the reel.
// 120 BPM · 15 bars · 30.000s · C major (C–G–Am–F). Every hit shares the visual beat grid.
// Usage: node scripts/synth.mjs  → assets/audio/reel-raw.wav
import { writeFileSync } from "node:fs";

const SR = 44100;
const DUR = 30.0;
const N = Math.round(SR * DUR);
const BPM = 120;
const B = 60 / BPM; // beat 0.46875
const BAR = B * 4; // 1.875
const L = new Float32Array(N);
const R = new Float32Array(N);

// seeded PRNG (mulberry32) — same bytes every run
let seed = 0x5eed1e;
const rnd = () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
const noise = () => rnd() * 2 - 1;
const mtof = (m) => 440 * Math.pow(2, (m - 69) / 12);
const idx = (t) => Math.round(t * SR);

function add(t0, buf, gain = 1, pan = 0) {
  const s = idx(t0);
  const gl = gain * Math.cos(((pan + 1) * Math.PI) / 4) * Math.SQRT2;
  const gr = gain * Math.sin(((pan + 1) * Math.PI) / 4) * Math.SQRT2;
  for (let i = 0; i < buf.length; i++) {
    const j = s + i;
    if (j < 0 || j >= N) continue;
    L[j] += buf[i] * gl;
    R[j] += buf[i] * gr;
  }
}
function lp(buf, cutoff) {
  // one-pole lowpass; cutoff may be a function of sample index
  let y = 0;
  for (let i = 0; i < buf.length; i++) {
    const fc = typeof cutoff === "function" ? cutoff(i) : cutoff;
    const a = 1 - Math.exp((-2 * Math.PI * fc) / SR);
    y += a * (buf[i] - y);
    buf[i] = y;
  }
  return buf;
}
function hp(buf, cutoff) {
  let y = 0;
  let x1 = 0;
  const rc = 1 / (2 * Math.PI * cutoff);
  const a = rc / (rc + 1 / SR);
  for (let i = 0; i < buf.length; i++) {
    const x = buf[i];
    y = a * (y + x - x1);
    x1 = x;
    buf[i] = y;
  }
  return buf;
}
const saw = (ph) => 2 * (ph - Math.floor(ph + 0.5));

// ── instruments ────────────────────────────────────────────────────────────
function kick(gain = 1) {
  const len = idx(0.42);
  const b = new Float32Array(len);
  let ph = 0;
  for (let i = 0; i < len; i++) {
    const t = i / SR;
    const f = 45 + 125 * Math.exp(-t / 0.028);
    ph += f / SR;
    const env = Math.exp(-t / 0.16);
    b[i] = Math.tanh(1.6 * Math.sin(2 * Math.PI * ph) * env) + (t < 0.004 ? noise() * 0.4 * (1 - t / 0.004) : 0);
  }
  return b.map((v) => v * gain);
}
function clap(gain = 1) {
  const len = idx(0.3);
  const b = new Float32Array(len);
  for (let i = 0; i < len; i++) {
    const t = i / SR;
    let env = Math.exp(-t / 0.09);
    for (const o of [0, 0.011, 0.022]) if (t >= o && t < o + 0.01) env = Math.max(env, 1.1 * Math.exp(-(t - o) / 0.004));
    b[i] = noise() * env;
  }
  hp(b, 900);
  lp(b, 5200);
  return b.map((v) => v * gain);
}
function hat(open = false, gain = 1) {
  const len = idx(open ? 0.25 : 0.06);
  const b = new Float32Array(len);
  for (let i = 0; i < len; i++) b[i] = noise() * Math.exp(-(i / SR) / (open ? 0.08 : 0.014));
  hp(b, 7000);
  hp(b, 7000);
  return b.map((v) => v * gain);
}
function pluck(midi, dur = 0.35, gain = 1, bright = 4200) {
  const len = idx(dur + 0.3);
  const b = new Float32Array(len);
  const f = mtof(midi);
  let p1 = 0;
  let p2 = 0.3;
  for (let i = 0; i < len; i++) {
    const t = i / SR;
    p1 += f / SR;
    p2 += (f * 1.005) / SR;
    const env = Math.exp(-t / (dur * 0.45));
    b[i] = (saw(p1) + saw(p2) * 0.7 + Math.sin(2 * Math.PI * p1 * 2) * 0.3) * env;
  }
  lp(b, (i) => 300 + bright * Math.exp(-(i / SR) / 0.09));
  return b.map((v) => v * gain);
}
function bassNote(midi, dur, gain = 1) {
  const len = idx(dur);
  const b = new Float32Array(len);
  const f = mtof(midi);
  let ph = 0;
  for (let i = 0; i < len; i++) {
    const t = i / SR;
    ph += f / SR;
    const env = Math.min(1, t / 0.004) * Math.exp(-t / 0.22) * Math.min(1, (dur - t) / 0.01);
    b[i] = (saw(ph) * 0.6 + Math.sin(2 * Math.PI * ph) * 0.9) * env;
  }
  lp(b, (i) => 180 + 1400 * Math.exp(-(i / SR) / 0.06));
  return b.map((v) => Math.tanh(v * 1.4) * gain);
}
function padChord(midis, dur, gain = 1, cutoff = 1600, attack = 0.25) {
  const len = idx(dur + 0.6);
  const b = new Float32Array(len);
  const ph = midis.flatMap(() => [rnd(), rnd()]);
  for (let i = 0; i < len; i++) {
    const t = i / SR;
    const env = Math.min(1, t / attack) * (t > dur ? Math.exp(-(t - dur) / 0.2) : 1);
    let s = 0;
    midis.forEach((m, k) => {
      const f = mtof(m);
      ph[2 * k] += (f * 0.996) / SR;
      ph[2 * k + 1] += (f * 1.004) / SR;
      s += saw(ph[2 * k]) + saw(ph[2 * k + 1]);
    });
    b[i] = (s / midis.length) * env;
  }
  lp(b, typeof cutoff === "function" ? cutoff : cutoff);
  lp(b, typeof cutoff === "function" ? cutoff : cutoff);
  return b.map((v) => v * gain);
}
function riser(dur, gain = 1) {
  const len = idx(dur);
  const b = new Float32Array(len);
  let ph = 0;
  for (let i = 0; i < len; i++) {
    const t = i / SR;
    const k = t / dur;
    ph += (220 + 1800 * k * k) / SR;
    b[i] = (noise() * 0.8 + Math.sin(2 * Math.PI * ph) * 0.25) * Math.pow(k, 2.2);
  }
  lp(b, (i) => 400 + 9000 * Math.pow(i / len, 2));
  return b.map((v) => v * gain);
}
function whoosh(dur = 0.5, gain = 1, reverse = false) {
  const len = idx(dur);
  const b = new Float32Array(len);
  for (let i = 0; i < len; i++) {
    const k = i / len;
    const env = reverse ? Math.pow(k, 2) : Math.sin(Math.PI * Math.pow(k, 0.6));
    b[i] = noise() * env;
  }
  lp(b, (i) => {
    const k = i / len;
    return reverse ? 500 + 8000 * k * k : 600 + 7000 * Math.sin(Math.PI * k);
  });
  hp(b, 250);
  return b.map((v) => v * gain);
}
function impact(gain = 1, len_s = 1.8) {
  const len = idx(len_s);
  const b = new Float32Array(len);
  let ph = 0;
  for (let i = 0; i < len; i++) {
    const t = i / SR;
    const f = 32 + 70 * Math.exp(-t / 0.08);
    ph += f / SR;
    b[i] = Math.tanh(2 * Math.sin(2 * Math.PI * ph)) * Math.exp(-t / 0.55) + noise() * 0.5 * Math.exp(-t / 0.05);
  }
  lp(b, 3000);
  return b.map((v) => v * gain);
}
function crash(gain = 1) {
  const len = idx(1.6);
  const b = new Float32Array(len);
  for (let i = 0; i < len; i++) b[i] = noise() * Math.exp(-(i / SR) / 0.45);
  hp(b, 3500);
  return b.map((v) => v * gain);
}

function bell(midi, dur = 0.8, gain = 1) {
  // soft marimba/bell: sine partials with fast decay — friendly, not aggressive
  const len = idx(dur + 0.2);
  const b = new Float32Array(len);
  const f = mtof(midi);
  for (let i = 0; i < len; i++) {
    const t = i / SR;
    const env = Math.min(1, t / 0.003) * Math.exp(-t / (dur * 0.35));
    b[i] = (Math.sin(2 * Math.PI * f * t) + 0.35 * Math.sin(2 * Math.PI * f * 4 * t) * Math.exp(-t / 0.05) + 0.2 * Math.sin(2 * Math.PI * f * 2 * t)) * env;
  }
  return b.map((v) => v * gain);
}
function wobble(midi, dur = 0.5, gain = 1) {
  // deliberately "approximate" note: drifting pitch that never settles
  const len = idx(dur);
  const b = new Float32Array(len);
  let ph = 0;
  for (let i = 0; i < len; i++) {
    const t = i / SR;
    const f = mtof(midi + 0.7 * Math.sin(t * 22) * Math.exp(-t / 0.4) - 0.4);
    ph += f / SR;
    b[i] = (saw(ph) * 0.4 + Math.sin(2 * Math.PI * ph)) * Math.exp(-t / (dur * 0.5));
  }
  lp(b, 2200);
  return b.map((v) => v * gain);
}
function tick(gain = 1) {
  const len = idx(0.03);
  const b = new Float32Array(len);
  for (let i = 0; i < len; i++) b[i] = noise() * Math.exp(-(i / SR) / 0.004);
  hp(b, 2500);
  return b.map((v) => v * gain);
}

// ── arrangement ────────────────────────────────────────────────────────────
const PROG = [
  { root: 36, chord: [60, 64, 67, 72] }, // C
  { root: 31, chord: [59, 62, 67, 71] }, // G
  { root: 33, chord: [60, 64, 69, 72] }, // Am
  { root: 29, chord: [60, 65, 69, 72] }, // F
];
const chordAt = (t) => PROG[Math.floor(Math.max(0, t) / BAR) % 4];
const GROOVE_IN = 4;
const BREAK_AT = 20;
const CTA = 22;
const END_HIT = 28;

// intro: airy pad + a rising bell motif under the word reveals
add(0, padChord([60, 64, 67], 4, 0.12, (i) => 300 + (1500 * i) / (SR * 4), 0.8));
[
  [0.25, 72],
  [0.5, 76],
  [0.75, 79],
].forEach(([t, m]) => add(t, bell(m, 0.9, 0.22), 1, -0.2));
// "l'à-peu-près": wobbly, not-quite-right notes…
[1.25, 1.75, 2.25, 2.62].forEach((t, i) => add(t, wobble([67, 69, 65, 71][i], 0.45, 0.16), 1, i % 2 ? 0.4 : -0.4));
// …then the snap: a crisp tick and a clean major chord, exactly on beat 7
add(3.0, tick(0.6));
[60, 64, 67, 72, 76].forEach((m, q) => add(3.0, pluck(m, 0.5, 0.07, 4200), 1, (q - 2) * 0.25));
add(3.0, riser(1.0, 0.22));
add(GROOVE_IN - 0.35, whoosh(0.35, 0.22, true));

// groove
const sidechain = new Float32Array(N).fill(1);
const duck = (t) => {
  const s = idx(t);
  for (let i = 0; i < idx(0.25); i++) if (s + i < N) sidechain[s + i] = Math.min(sidechain[s + i], 0.4 + 0.6 * Math.pow(i / idx(0.25), 0.6));
};
for (let t = GROOVE_IN; t < END_HIT - 0.001; t += B) {
  const inBreak = t >= BREAK_AT && t < CTA;
  const beatN = Math.round((t - GROOVE_IN) / B);
  if (!inBreak) {
    add(t, kick(0.7));
    duck(t);
    if (beatN % 2 === 1) add(t, clap(0.3), 1, 0.05);
    add(t + B / 2, hat(t >= CTA && beatN % 2 === 1, 0.16), 1, 0.3);
  }
  add(t + B / 4, hat(false, inBreak ? 0.03 : 0.06), 1, -0.35);
  add(t + (3 * B) / 4, hat(false, inBreak ? 0.03 : 0.06), 1, -0.25);
}
// bass: bouncy 8ths, rests on the kick
const bassBus = [];
for (let t = GROOVE_IN; t < END_HIT - 0.01; t += B / 2) {
  if (t >= BREAK_AT && t < CTA) continue;
  const k = Math.round((t - GROOVE_IN) / (B / 2));
  if (k % 2 === 0 && k % 8 !== 6) continue;
  const c = chordAt(t);
  bassBus.push([t, bassNote(c.root + 12 + (k % 8 === 7 ? 12 : 0), B / 2 - 0.03, 0.34)]);
}
// pad bed per bar
const padBus = [];
for (let bar = 2; bar < 14; bar++) {
  const t = bar * BAR;
  padBus.push([t, padChord(chordAt(t).chord, BAR - 0.05, bar >= 10 && bar < 11 ? 0.12 : 0.07, 1300, 0.08)]);
}
// bell arpeggio — the melodic hook, 8ths
for (let t = 8; t < END_HIT - 0.01; t += B / 2) {
  const k = Math.round((t - 8) / (B / 2));
  const c = chordAt(t).chord;
  const m = c[[0, 1, 2, 3, 2, 1, 3, 2][k % 8]] + 12;
  const soft = t >= BREAK_AT && t < CTA ? 0.1 : 0.075;
  add(t, bell(m, 0.5, soft), 1, Math.sin(k * 0.9) * 0.5);
}
// offer changes + section seams: whoosh in, pluck chord on the downbeat
[8, 10, 12, 14, 16, 18].forEach((t) => {
  add(t - 0.3, whoosh(0.32, 0.16), 1, t % 4 ? 0.4 : -0.4);
  chordAt(t).chord.forEach((m, q) => add(t, pluck(m + 12, 0.3, 0.05, 3800), 1, (q - 1.5) * 0.3));
});
// UI sounds synced to the visuals
[9.15, 25.5].forEach((t) => add(t, tick(0.5)));
[9.35, 13.55, 15.6].forEach((t) => add(t, bell(84, 0.6, 0.12), 1, 0.3));
// breakdown → CTA
add(BREAK_AT, padChord([57, 60, 64, 69], 2, 0.1, 1800, 0.3));
add(CTA - 1.6, riser(1.6, 0.3));
add(CTA, impact(0.45, 1.6));
add(CTA, crash(0.18));
// final hit — clean C major, then ring out
add(END_HIT, kick(0.7));
add(END_HIT, impact(0.35, 1.8));
[48, 60, 64, 67, 72, 76].forEach((m, q) => add(END_HIT, pluck(m + 12, 1.6, 0.06, 3000), 1, (q - 2.5) * 0.25));
add(END_HIT, padChord([60, 64, 67, 72], 1.8, 0.12, 1600, 0.02));
add(END_HIT + 0.5, bell(84, 1.2, 0.14));

for (const [t, buf] of [...bassBus, ...padBus]) {
  const s = idx(t);
  for (let i = 0; i < buf.length; i++) {
    const j = s + i;
    if (j >= N) break;
    const v = buf[i] * sidechain[j];
    L[j] += v;
    R[j] += v;
  }
}

let peak = 0;
for (let i = 0; i < N; i++) {
  const t = i / SR;
  const fade = t > DUR - 0.8 ? Math.max(0, (DUR - t) / 0.8) : 1;
  L[i] = Math.tanh(L[i] * 1.05) * fade;
  R[i] = Math.tanh(R[i] * 1.05) * fade;
  peak = Math.max(peak, Math.abs(L[i]), Math.abs(R[i]));
}
const norm = 0.93 / peak;
const data = Buffer.alloc(N * 4);
for (let i = 0; i < N; i++) {
  data.writeInt16LE(Math.round(Math.max(-1, Math.min(1, L[i] * norm)) * 32767), i * 4);
  data.writeInt16LE(Math.round(Math.max(-1, Math.min(1, R[i] * norm)) * 32767), i * 4 + 2);
}
const h = Buffer.alloc(44);
h.write("RIFF", 0);
h.writeUInt32LE(36 + data.length, 4);
h.write("WAVE", 8);
h.write("fmt ", 12);
h.writeUInt32LE(16, 16);
h.writeUInt16LE(1, 20);
h.writeUInt16LE(2, 22);
h.writeUInt32LE(SR, 24);
h.writeUInt32LE(SR * 4, 28);
h.writeUInt16LE(4, 32);
h.writeUInt16LE(16, 34);
h.write("data", 36);
h.writeUInt32LE(data.length, 40);
writeFileSync(new URL("../assets/audio/reel-raw.wav", import.meta.url), Buffer.concat([h, data]));
console.log(`wrote reel-raw.wav · ${DUR}s · 120 BPM`);
