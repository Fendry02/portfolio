# Portfolio - Benoit Bruynbroeck

A modern, high-performance portfolio website built with Next.js, showcasing my expertise as a JavaScript Tech Lead and Full Stack Developer.

## 🚀 Live Demo

[View Portfolio](https://bbenoit.fr) <!-- Replace with your actual URL -->

## ✨ Features

- **Modern Tech Stack**: Next.js 16, React 19, TypeScript
- **Optimized Performance**: WebP images, responsive design, Core Web Vitals optimized
- **Beautiful UI**: TailwindCSS with DaisyUI components
- **SEO Optimized**: Meta tags, structured data, sitemap
- **Mobile First**: Fully responsive design
- **Accessibility**: WCAG compliant with proper alt texts and semantic HTML

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS + DaisyUI
- **Icons**: Custom SVG icons
- **Fonts**: Optimized Google Fonts

### Development Tools

- **Linting**: ESLint with Next.js config
- **Formatting**: Prettier
- **Image Processing**: Sharp for WebP conversion
- **Build**: Next.js optimized build

## 🚀 Getting Started

### Prerequisites

- Node.js 20.9+
- npm, yarn, or pnpm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/portfolio.git
cd portfolio
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Local SEO position tracking

The SemScraper monitor tracks the organic Google placement of the four local
offers for Lyon on desktop and mobile (8 SERPs per run). It records the
portfolio's rank and the first ten organic competitors in a local report.

1. Copy `.env.example` to `.env.local` and set `SEMSCRAPER_API_KEY` locally.
   Never commit, paste, or deploy this API key.
2. Run `npm run seo:serp`.
3. Read the dated JSON report in `reports/seo/` (ignored by Git).

Use `SEMSCRAPER_DRY_RUN=1 npm run seo:serp` to review the requests without
spending a SemScraper query.

## Google Search Console insights

The local Google Search Console connector reads the existing `bbenoit.fr`
property with Google's read-only OAuth scope. It keeps the OAuth refresh token
in `.search-console/token.json`, which is ignored by Git. Reports are written
to `reports/seo/`, also ignored by Git.

1. In [Google Cloud Console](https://console.cloud.google.com/), create or
   select a project, enable the **Google Search Console API**, configure the
   OAuth consent screen and add your Google account as a test user if the app
   is in testing.
2. Create an OAuth client of type **Desktop app**. Copy its client ID and
   client secret to `.env.local` as `GOOGLE_SEARCH_CONSOLE_CLIENT_ID` and
   `GOOGLE_SEARCH_CONSOLE_CLIENT_SECRET`. Keep them local.
3. Run `npm run seo:gsc:auth`, open the printed Google URL and approve the
   **read-only** authorization. Keep the terminal running until the confirmation
   page appears.
4. Run `npm run seo:gsc:report` to create a report over the latest complete
   28-day period. It identifies query/page pairs ranked 11–20 and visible
   results ranked 1–10 with a low click-through rate.

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── components/          # React components
│   │   ├── benefits.tsx     # Benefits section
│   │   ├── contact.tsx      # Contact form
│   │   ├── experience.tsx   # Work experience
│   │   ├── footer.tsx       # Footer component
│   │   ├── header.tsx       # Navigation header
│   │   ├── hero.tsx         # Hero section
│   │   ├── presentation.tsx # About section
│   │   ├── skills.tsx       # Skills showcase
│   │   ├── timeline.tsx     # Career timeline
│   │   └── works.tsx        # Portfolio projects
│   ├── styles/
│   │   └── global.css       # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── public/                  # Static assets
│   ├── benefits/            # Benefit icons (WebP)
│   ├── works/               # Project images (WebP)
│   ├── socials/             # Social media icons (SVG)
│   └── *.webp               # Optimized images
├── scripts/                 # Build and optimization scripts
│   ├── convert-images.js    # PNG to WebP conversion
│   └── generate-responsive-images.js # Responsive image generation
└── docs/                    # Documentation
    └── IMAGE_OPTIMIZATION.md # Image optimization guide
```

## 🖼️ Image Optimization

This portfolio implements advanced image optimization techniques for maximum performance:

### WebP Conversion

- **92.6% size reduction** on profile image (500KB → 37KB)
- **91.2% size reduction** on project images (800KB → 70KB)
- **85% quality** for optimal balance between size and visual quality

### Responsive Images

- Multiple sizes: 640px, 768px, 1024px, 1280px, 1920px
- Automatic format selection (WebP/AVIF with PNG/JPG fallback)
- Lazy loading for non-critical images

### Available Scripts

```bash
# Convert PNG images to WebP
npm run convert-images

# Generate responsive image versions
npm run generate-responsive
```

For detailed image optimization documentation, see [IMAGE_OPTIMIZATION.md](./IMAGE_OPTIMIZATION.md).

## 🎨 Design System

### Color Palette

- **Primary**: Custom brand colors
- **Secondary**: Complementary accent colors
- **Neutral**: TailwindCSS gray scale
- **Status**: Success, warning, error states

### Typography

- **Headings**: Bold, hierarchical sizing
- **Body**: Optimized readability
- **Code**: Monospace for technical content

### Components

- **Cards**: Consistent spacing and shadows
- **Buttons**: Interactive states and accessibility
- **Modals**: Project details and interactions
- **Navigation**: Responsive and accessible

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)
- **Touch Friendly**: Appropriate touch targets
- **Performance**: Optimized for slower connections

## ⚡ Performance

### Core Web Vitals

- **LCP**: < 2.5s (Largest Contentful Paint)
- **FID**: < 100ms (First Input Delay)
- **CLS**: < 0.1 (Cumulative Layout Shift)

### Optimization Techniques

- Image optimization with WebP/AVIF
- Code splitting and lazy loading
- Font optimization
- CSS purging
- Static generation where possible

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Code Quality
npm run format       # Check code formatting
npm run format:fix   # Fix code formatting

# SEO
npm run seo:audit    # Audit production SEO tags, sitemap, robots and social images

# Image Optimization
npm run convert-images        # Convert PNG to WebP
npm run generate-responsive   # Generate responsive images
```

## 🔎 SEO Routine

A weekly GitHub Action runs every Monday at 07:00 UTC and checks the production
site with `npm run seo:audit`.

The audit covers:

- homepage and `/jobs` titles, descriptions and canonicals
- Open Graph and Twitter metadata
- JSON-LD structured data
- `sitemap.xml`, `robots.txt` and `manifest.webmanifest`
- generated social images

To audit another environment locally:

```bash
SEO_AUDIT_BASE_URL=http://localhost:3000 npm run seo:audit
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

### Other Platforms

- **Netlify**: Compatible with Next.js
- **AWS Amplify**: Full-stack deployment
- **Docker**: Containerized deployment

## 📊 Performance Metrics

| Metric         | Score | Status       |
| -------------- | ----- | ------------ |
| Performance    | 95+   | ✅ Excellent |
| Accessibility  | 100   | ✅ Perfect   |
| Best Practices | 95+   | ✅ Excellent |
| SEO            | 100   | ✅ Perfect   |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Benoit Bruynbroeck**

- **Email**: [bruy.benoit@gmail.com](mailto:bruy.benoit@gmail.com)
- **LinkedIn**: [linkedin.com/in/benoit-bruynbroeck-a21214b4](https://www.linkedin.com/in/benoit-bruynbroeck-a21214b4/)
- **GitHub**: [github.com/Fendry02](https://github.com/Fendry02)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- [DaisyUI](https://daisyui.com/) - Component library
- [Sharp](https://sharp.pixelplumbing.com/) - Image processing
- [Vercel](https://vercel.com/) - Deployment platform

---

⭐ **Star this repository if you found it helpful!**
