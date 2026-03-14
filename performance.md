# Performance

- **Target:** Lighthouse score 95+
- **Approach:** Server components by default, client components only for interactivity (navbar, forms, carousel, counters). Next/Image with priority for hero, lazy loading elsewhere. Optimized fonts via next/font (Playfair Display, Inter). Minimal JS bundle; Framer Motion used sparingly for fade-in and number animations.

## Image optimization (production)

- **Next/Image** is used for all main images: Hero slides, About (photos + background logo), Gallery, Impact Stories testimonials, Partners logos. Next.js automatically:
  - Serves **AVIF/WebP** when the browser supports it (via `images.formats` in `next.config.js`).
  - Generates **responsive sizes** from `sizes` and `deviceSizes` so the right resolution is loaded.
  - **Lazy-loads** images (except the first Hero slide, which uses `priority`).
- **Tip:** Keep originals in `/public` at a reasonable resolution (e.g. 1200–2000px wide for full-bleed). Next will generate smaller variants; avoid uploading huge originals.
