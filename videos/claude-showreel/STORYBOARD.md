---
title: "Claude — Motion Reel 2026"
message: "Claude is a motion designer with real range — and every frame is a decision"
mode: autonomous
canvas: 1920x1080
fps: 60
duration: 30
music: "original 128 BPM synth track, A minor, Am–F–C–G, drop at 3.75s, finale at 26.25s"
---

# Storyboard

Grid: 128 BPM · beat 0.46875s · bar 1.875s · every scene = 2 bars (3.75s).
Palette: ink `#0E0C0A` · paper `#F3EEE5` · signal `#FF5A1F`. Type: Archivo Black (statements),
Instrument Serif italic (voice), JetBrains Mono (reel chrome / data).
Persistent HUD over everything: crop marks, running timecode, frame counter, scene index.

## Frame 1

- id: s1-bounce
- status: outline
- src: compositions/s1-bounce.html
- start: 0 · duration: 3.75
- rules: spring-pop-entrance, motion-blur-streak (echo trail), sine-wave-loop
- beat: A cream ball drops into a dark frame and bounces on a hairline floor, with squash and stretch
  on every impact. The five impacts sit on the soundtrack's plucks and speed up. On the drop it
  squashes flat, then bursts into an orange circle wipe that fills the frame.

## Frame 2

- id: s2-title
- status: outline
- src: compositions/s2-title.html
- start: 3.75 · duration: 3.75
- rules: kinetic-beat-slam, waterfall-entry, 3d-text-depth-layers
- beat: On orange, "MOTION" slams in letter by letter and fills the width, extruded in 3D layers,
  then "REEL" snaps in from the side. The line "by Claude" is revealed through a mask in serif
  italic, and a mono subtitle appears. On the exit the letters scatter upward.

## Frame 3

- id: s3-kinetic
- status: outline
- src: compositions/s3-kinetic.html
- start: 7.5 · duration: 3.75
- rules: kinetic-beat-slam, hacker-flip-3d, css-marker-patterns
- beat: The manifesto plays one word per beat on dark: EVERY / FRAME / IS A / DECISION. Each word
  enters differently. FRAME gets crop brackets, and DECISION decodes glyph by glyph before a
  zoom-through exits into the next scene.

## Frame 4

- id: s4-easing
- status: outline
- src: compositions/s4-easing.html
- start: 11.25 · duration: 3.75
- rules: svg-path-draw, control-target-sync, chart-scrub-readout
- beat: A graph editor. The curve is sampled from real GSAP eases and morphs
  linear → expo.out → back.out → power4.inOut. A playhead dot rides the curve while an orange square
  on a track moves with the same ease. A mono readout shows the ease name. On the exit the square
  scales up into a grid tile (match cut).

## Frame 5

- id: s5-grid
- status: outline
- src: compositions/s5-grid.html
- start: 15 · duration: 3.75
- rules: center-outward-expansion, stat-bars-and-fills, sine-wave-loop
- beat: A 16×9 tile field waves in from the centre. Rotation waves ripple across it on the beats,
  corners go round, and the tiles light up into an 8-spoke burst mark. The tiles then flip away
  into depth.

## Frame 6

- id: s6-depth
- status: outline
- src: compositions/s6-depth.html
- start: 18.75 · duration: 3.75
- rules: 3d-camera-flight, depth-of-field-blur, motion-blur-streak
- beat: A perspective camera flies through a corridor of frames labelled with the crafts (TYPE,
  EASE, RHYTHM, DEPTH, DATA, STORY), passing one frame per beat and swaying on its roll. It ends
  head-on with the last frame, which flashes white.

## Frame 7

- id: s7-range
- status: outline
- src: compositions/s7-range.html
- start: 22.5 · duration: 3.75
- rules: chromatic-glitch, particle-burst, stat-bars-and-fills, counting-dynamic-scale
- beat: A range burst with one micro-scene per beat: bar chart pop, RGB-split glitch word,
  particle burst, progress ring and counter, diagonal stripe sweep, and a marquee "LOOP". Over a
  snare roll the ball returns and zooms toward the lens.

## Frame 8

- id: s8-endcard
- status: outline
- src: compositions/s8-endcard.html
- start: 26.25 · duration: 3.75
- rules: logo-assemble-lockup (blueprint), svg-path-draw, spring-pop-entrance
- beat: On the finale impact the ball lands, and its trail draws a "C" arc mark. The lockup reads
  CLAUDE, then "Motion Designer" in serif italic, then mono "SHOWREEL 2026 · AVAILABLE FOR HIRE".
  The last tink lands on the tagline, then a fade.
