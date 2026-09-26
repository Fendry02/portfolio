// Offline, deterministic soundtrack for the reel.
// 128 BPM · 16 bars · 30.000s · A minor. Every hit shares the visual beat grid.
// Usage: node scripts/synth.mjs  → assets/audio/reel-raw.wav
import { writeFileSync } from "node:fs";

const SR = 44100;
const DUR = 30.0;
const N = Math.round(SR * DUR);
const BPM = 128;
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
function glitchBurst(dur, gain = 1) {
  // bit-crushed stutter of a saw — digital texture on beat-cuts
  const len = idx(dur);
  const b = new Float32Array(len);
  let ph = 0;
  for (let i = 0; i < len; i++) {
    const step = Math.floor(i / 180) % 4;
    ph += [880, 220, 1760, 440][step] / SR;
    const held = Math.floor(i / 12) * 12; // sample-and-hold
    b[i] = Math.sign(saw(ph + held * 0)) * 0.5 * Math.exp(-(i / SR) / (dur * 0.5));
  }
  lp(b, 6000);
  return b.map((v) => v * gain);
}

// ── arrangement ────────────────────────────────────────────────────────────
const DROP = BAR * 2; // 3.75 — title slam
const MONTAGE = BAR * 12; // 22.5
const FINALE = BAR * 14; // 26.25
const END_HIT = FINALE + BAR; // 28.125
// Am – F – C – G, two bars each (root midi for bass, chord tones for pad/stab)
const PROG = [
  { root: 33, chord: [57, 60, 64, 69] }, // Am
  { root: 29, chord: [53, 57, 60, 65] }, // F
  { root: 36, chord: [55, 60, 64, 67] }, // C
  { root: 31, chord: [55, 59, 62, 67] }, // G
];
const chordAt = (t) => PROG[Math.floor(Math.max(0, t) / (BAR * 2)) % 4];

// Intro: ball bounce plucks (visual impacts share these times), ascending
export const BOUNCES = [0.9375, 1.875, 2.578125, 3.046875, 3.28125];
[69, 72, 76, 79, 81].forEach((m, i) => add(BOUNCES[i], pluck(m, 0.4, 0.34, 3000 + i * 600), 1, i % 2 ? 0.25 : -0.25));
BOUNCES.forEach((t) => add(t, kick(0.35)));
// intro pad (opening filter) + soft ticks
add(0, padChord([57, 60, 64], DROP - 0.25, 0.18, (i) => 250 + (1400 * i) / (SR * 3.5), 1.2), 1, 0);
for (let t = B * 2; t < DROP - B; t += B / 2) add(t, hat(false, 0.12), 1, 0.4);
add(DROP - 1.9, riser(1.9, 0.32), 1, 0);
add(DROP - 0.42, whoosh(0.42, 0.35, true), 1, 0);

// Main groove: 3.75 → 26.25
const sidechain = new Float32Array(N).fill(1);
for (let t = DROP; t < FINALE - 0.001; t += B) {
  const inRoll = t >= FINALE - BAR; // last bar before finale: kick drops for the roll
  if (!inRoll || t < FINALE - BAR / 2) {
    add(t, kick(0.95));
    const s = idx(t);
    for (let i = 0; i < idx(0.3); i++) if (s + i < N) sidechain[s + i] = Math.min(sidechain[s + i], 0.25 + 0.75 * Math.pow(i / idx(0.3), 0.6));
  }
  const beatN = Math.round((t - DROP) / B);
  if (beatN % 2 === 1 && !inRoll) add(t, clap(0.42), 1, 0.05);
  add(t + B / 2, hat(beatN % 4 === 3, 0.2), 1, 0.35);
  add(t + B / 4, hat(false, 0.07), 1, -0.35);
  add(t + (3 * B) / 4, hat(false, 0.08), 1, -0.3);
}
// bass: offbeat 8ths + syncopated 16ths; follows the progression
const bassBus = [];
for (let t = DROP; t < FINALE - BAR / 2; t += B / 2) {
  const k = Math.round((t - DROP) / (B / 2));
  const c = chordAt(t);
  const pattern = [0, 1, 0, 1, 0, 1, 1, 1]; // 0 = rest on the kick, 1 = note
  if (!pattern[k % 8]) continue;
  const oct = k % 8 === 7 ? 12 : 0;
  bassBus.push([t, bassNote(c.root + oct + 12, B / 2 - 0.02, 0.42)]);
}
// stabs on scene changes + offbeat chord pumps
for (let bar = 2; bar < 14; bar++) {
  const t = bar * BAR;
  const c = chordAt(t);
  const stabs = bar % 2 === 0 ? [0, 1.5, 3] : [0.5, 2, 2.75, 3.5];
  stabs.forEach((bt, j) => {
    const tt = t + bt * B;
    c.chord.forEach((m, q) => add(tt, pluck(m + 12, 0.22, 0.075, 3600), 1, (q - 1.5) * 0.3));
    // ping-pong echo
    c.chord.forEach((m) => add(tt + B * 0.75, pluck(m + 12, 0.2, 0.03, 2400), 1, j % 2 ? 0.7 : -0.7));
  });
}
// pad bed with pumping sidechain
const padBus = [];
for (let bar = 2; bar < 14; bar += 2) {
  const t = bar * BAR;
  padBus.push([t, padChord(chordAt(t).chord, BAR * 2 - 0.05, 0.11, 1400, 0.05)]);
}
// arp in the middle section (bars 6–12)
for (let t = BAR * 6; t < MONTAGE; t += B / 4) {
  const k = Math.round((t - BAR * 6) / (B / 4));
  const c = chordAt(t).chord;
  const m = c[[0, 2, 1, 3, 2, 1, 3, 2][k % 8]] + 24;
  add(t, pluck(m, 0.12, 0.05, 5200), 1, Math.sin(k * 0.7) * 0.6);
}
// scene seams: whoosh into every bar-pair, crash + impact on the downbeat
for (let bar = 4; bar <= 12; bar += 2) {
  const t = bar * BAR;
  add(t - 0.36, whoosh(0.4, 0.28), 1, bar % 4 ? 0.4 : -0.4);
  add(t, crash(0.16), 1, 0);
}
add(DROP, impact(0.7), 1, 0);
add(DROP, crash(0.3), 1, 0);
// montage: glitch bursts on each beat-cut (bars 12–13)
for (let i = 0; i < 6; i++) add(MONTAGE + i * B, glitchBurst(0.11, 0.1), 1, i % 2 ? 0.5 : -0.5);
// snare roll build into the finale
for (let t = FINALE - BAR, k = 0; t < FINALE - 0.01; k++) {
  const step = k < 8 ? B / 2 : k < 16 ? B / 4 : B / 8;
  add(t, clap(0.32 + 0.55 * ((t - (FINALE - BAR)) / BAR)), 1, 0);
  t += step;
}
add(FINALE - BAR, riser(BAR, 0.5), 1, 0);
// finale: impact, big chord, then the end-card bounce and the button
add(FINALE, impact(0.95, 2.4), 1, 0);
add(FINALE, crash(0.34), 1, 0);
add(FINALE, padChord([45, 57, 60, 64, 69, 76], BAR * 2 - 0.2, 0.16, (i) => 3200 * Math.exp(-i / (SR * 1.4)) + 500, 0.01), 1, 0);
export const END_BOUNCES = [FINALE + B * 2, FINALE + B * 3, FINALE + B * 3.5];
END_BOUNCES.forEach((t, i) => add(t, pluck([76, 79, 81][i], 0.35, 0.26, 3400), 1, 0));
add(END_HIT, kick(0.8));
add(END_HIT, impact(0.55, 1.8), 1, 0);
[57, 64, 69, 72, 76].forEach((m, q) => add(END_HIT, pluck(m + 12, 1.4, 0.07, 2600), 1, (q - 2) * 0.3));
add(END_HIT + B * 2, pluck(81, 0.9, 0.16, 2200), 1, 0); // last "tink" as the tagline lands
add(END_HIT + B * 2, pluck(93, 0.9, 0.05, 2200), 1, 0.3);

// mix the sidechained buses
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

// master: gentle glue, soft clip, fade tail, normalize
let peak = 0;
for (let i = 0; i < N; i++) {
  const t = i / SR;
  const fade = t > DUR - 0.6 ? Math.max(0, (DUR - t) / 0.6) : 1;
  L[i] = Math.tanh(L[i] * 1.1) * fade;
  R[i] = Math.tanh(R[i] * 1.1) * fade;
  peak = Math.max(peak, Math.abs(L[i]), Math.abs(R[i]));
}
const norm = 0.93 / peak;

// write 16-bit stereo WAV
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
console.log(`wrote reel-raw.wav · ${DUR}s · peak ${peak.toFixed(2)} → normalized`);
