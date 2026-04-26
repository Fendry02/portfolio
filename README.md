# Portfolio — Benoit Bruynbroeck

Personal site of Benoit Bruynbroeck — JavaScript Tech Lead & Full Stack Developer.

🌐 [bbenoit.fr](https://bbenoit.fr)

## Stack

- **Framework**: Next.js 15 (App Router, RSC) · React 19 · TypeScript
- **Styling**: Tailwind CSS 4 (custom theme, no UI kit)
- **Typography**: Instrument Serif (display) · Inter (sans) · JetBrains Mono
- **Animations**: native CSS scroll-driven anims (`animation-timeline: view()`)
- **Tooling**: Prettier · ESLint · GitHub Actions CI

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command            | What it does                          |
| ------------------ | ------------------------------------- |
| `npm run dev`      | Local dev server                      |
| `npm run build`    | Production build                      |
| `npm run start`    | Run production build                  |
| `npm run lint`     | ESLint                                |
| `npm run format`   | Prettier check                        |
| `npm run analyze`  | Production build with bundle analyzer |

## Project layout

```
app/
├── components/         # UI sections + design primitives
│   └── ui/             # FadeIn, Surface, Eyebrow, SectionHeader
├── data/               # Typed content (skills, works, timeline, …)
├── styles/global.css   # Design tokens (colors, type, motion)
├── icon.tsx            # Generated favicon (32×32)
├── apple-icon.tsx      # Generated Apple touch icon (180×180)
├── opengraph-image.tsx # Generated OG image (1200×630)
├── manifest.ts         # PWA manifest
├── robots.ts           # robots.txt
├── sitemap.ts          # sitemap.xml
├── layout.tsx          # Root layout (metadata, fonts, skip-link, grain)
├── page.tsx            # Home page
├── error.tsx           # Error boundary UI
├── loading.tsx         # Loading state
└── not-found.tsx       # 404 page
public/                 # Static assets (webp images, svg icons)
.github/workflows/ci.yml
```

## Design system

**Palette** — `oklch()` ink scale + warm paper, electric blue accent  
**Type** — fluid `clamp()` scales, serif italics for emphasis  
**Surfaces** — single `<Surface>` primitive, hairline borders, no shadows  
**Motion** — view-timeline based fades, no JS animation libraries  
**A11y** — skip-link, focus-visible accent ring, modal focus trap, reduced-motion respected

## Content TODO

A few placeholders are wired but empty until you add real content:

- `app/data/testimonials.ts` — 2–3 quotes (LinkedIn recos, ex-colleagues, mentees)
- `app/constants/index.ts › OPTIONAL_LINKS.CV` — set to `'/cv.pdf'` after dropping a PDF in `public/`
- `app/constants/index.ts › OPTIONAL_LINKS.CALENDLY` — set your booking URL

## Deployment

Hosted on Vercel. CI runs on every push (format / lint / typecheck / build).

## Contact

- LinkedIn — [benoit-bruynbroeck](https://www.linkedin.com/in/benoit-bruynbroeck-a21214b4/)
- GitHub — [@Fendry02](https://github.com/Fendry02)
- Email — [bruy.benoit@gmail.com](mailto:bruy.benoit@gmail.com)
