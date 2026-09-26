# Vidéos (HyperFrames)

Sources des vidéos du site. Les rendus (`renders/`) et l'audio généré
(`assets/audio/*.wav`) ne sont pas versionnés : ils se régénèrent.

| Projet                  | Format            | Utilisation                                   |
| ----------------------- | ----------------- | --------------------------------------------- |
| `bbenoit-reel`          | 1920×1080, 30 s   | Vidéo de l'accueil (desktop, tablette)        |
| `bbenoit-reel-vertical` | 1080×1350 (4:5)   | Vidéo de l'accueil sur mobile, LinkedIn, Insta |
| `claude-showreel`       | 1920×1080, 30 s   | Premier concept (non utilisé sur le site)     |

## Régénérer une vidéo

```bash
cd videos/bbenoit-reel            # ou bbenoit-reel-vertical
node scripts/synth.mjs            # bande-son originale → assets/audio/reel-raw.wav
ffmpeg -y -i assets/audio/reel-raw.wav -af "loudnorm=I=-15:TP=-1.0:LRA=9" -ar 44100 assets/audio/reel.wav
npx hyperframes check
npx hyperframes render --fps 60 --quality delivery -o renders/video.mp4
```

(`claude-showreel` utilise `loudnorm=I=-14`.)

## Mettre à jour le site

```bash
ffmpeg -y -i renders/video.mp4 -c:v libx264 -preset slow -crf 22 -pix_fmt yuv420p \
  -c:a aac -b:a 192k -movflags +faststart ../../public/video/bbenoit-showreel.mp4
ffmpeg -y -ss 3.52 -i renders/video.mp4 -frames:v 1 -q:v 2 ../../public/video/showreel-poster.jpg
```

Pour la version verticale : `bbenoit-showreel-4x5.mp4` et `showreel-poster-4x5.jpg`.
