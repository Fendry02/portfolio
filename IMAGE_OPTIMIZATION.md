# Image Optimization - Portfolio

This document explains how images are optimized in this portfolio to improve performance.

## 🚀 Implemented Optimizations

### 1. WebP Conversion

- **WebP Format**: All PNG images have been converted to WebP
- **Size Reduction**: 25-92% reduction depending on the image
- **Quality**: 85% for a good quality/size balance

### 2. Next.js Configuration

- **Supported Formats**: WebP and AVIF (with automatic fallback)
- **Device Sizes**: Optimization for different resolutions
- **Cache**: Minimum 60 seconds TTL
- **Secure SVG**: SVG support with security policy

### 3. Responsive Images

- **Multiple Sizes**: 640px, 768px, 1024px, 1280px, 1920px
- **Adaptive Loading**: Next.js automatically chooses the right size
- **Lazy Loading**: Deferred loading for non-priority images

## 📁 File Structure

```
public/
├── benefits/
│   ├── communication.webp
│   ├── methodology.webp
│   └── technical.webp
├── works/
│   ├── business-decision.webp
│   ├── citizenplane.webp
│   └── openclassrooms.webp
├── front-end.webp
├── logo.webp
├── logo-white.webp
├── portable.webp
├── profile.webp
└── server.webp
```

## 🛠️ Available Scripts

### Image Conversion

```bash
npm run convert-images
```

Automatically converts all PNG files to WebP.

### Responsive Image Generation

```bash
npm run generate-responsive
```

Generates different size versions for each WebP image.

## 💡 Usage in Components

### Standard Import

```tsx
import profile from '@/public/profile.webp'
;<Image
  src={profile}
  alt="Profile picture"
  priority={true}
  className="rounded-full"
/>
```

### Optimized Component (Optional)

```tsx
import OptimizedImage from '@/components/OptimizedImage'
;<OptimizedImage
  src="/images/photo.webp"
  alt="Description"
  width={300}
  height={200}
  priority={true}
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

## 📊 Optimization Results

| Image                 | Original Size | WebP Size | Reduction |
| --------------------- | ------------- | --------- | --------- |
| profile.png           | ~500KB        | ~37KB     | 92.6%     |
| business-decision.png | ~800KB        | ~70KB     | 91.2%     |
| citizenplane.png      | ~600KB        | ~107KB    | 82.1%     |
| server.png            | ~200KB        | ~77KB     | 61.4%     |
| logo-white.png        | ~150KB        | ~60KB     | 60.0%     |
| front-end.png         | ~300KB        | ~124KB    | 58.7%     |

## 🔧 Technical Configuration

### Next.js Config

```javascript
const nextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
}
```

### Sharp Configuration

```javascript
await sharp(inputPath)
  .webp({
    quality: 85, // Optimal quality
    effort: 6, // Maximum compression effort
  })
  .toFile(outputPath)
```

## 🎯 Best Practices

1. **Priority**: Use `priority={true}` for above-the-fold images
2. **Sizes**: Always specify `sizes` for responsive images
3. **Alt text**: Always provide descriptive alternative text
4. **Lazy loading**: Let Next.js handle lazy loading automatically
5. **Formats**: Prefer WebP, with automatic fallback to PNG/JPG

## 🚀 Performance

- **Core Web Vitals**: Significant improvement in LCP (Largest Contentful Paint)
- **Bandwidth**: Reduced bandwidth consumption
- **SEO**: Better PageSpeed Insights score
- **UX**: Faster loading, especially on mobile

## 📝 Maintenance

To add new images:

1. Place the PNG image in the `public/` folder
2. Run `npm run convert-images`
3. Update imports in your components
4. Test with `npm run build`

To optimize further:

1. Run `npm run generate-responsive` to create responsive versions
2. Use the `OptimizedImage` component for advanced control
3. Monitor performance metrics with DevTools
