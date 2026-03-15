# Public site data flow and performance

## 1. How dashboard changes show on the public website

### Current situation (before wiring)

- **Admin dashboard** saves all content to the **backend** (CMS API). When you edit Hero, About, Programs, etc. and click Save, the data is stored via the API.
- **Public website** (the site visitors see) was **not** reading from that backend. It used **hardcoded data** inside components (e.g. `HERO_SLIDES` in `Hero.tsx`, static text in `HomeAbout.tsx`, `lib/constants.ts` for contact/social). So changes in the dashboard did **not** appear on the public site.

### Procedure (after wiring)

1. **You edit in the dashboard** (e.g. change hero slides, about text, logo, contact).
2. **You click Save** → the frontend calls the backend API (e.g. `PUT /api/hero/slides/:id`, `PUT /api/about`, `PUT /api/settings`). Data is stored in the backend.
3. **Public pages load data from the same backend** on each request (or on a schedule). The server fetches e.g. `GET /api/hero/slides`, `GET /api/about`, `GET /api/settings`, and passes that data into the public components.
4. **Visitors see the updated content** the next time the page is generated or revalidated (see “Caching” below).

So the flow is: **Dashboard (save) → Backend (store) → Public site (fetch) → Visitor sees changes.**

### Backend requirement

The backend must allow **unauthenticated GET** (or provide public read routes) for the content used by the public site. If your API currently requires a login token for all routes (including `/api/hero/slides`, `/api/about`, etc.), you need either:

- Public read endpoints (e.g. `GET /api/hero/slides` for public, `GET /api/hero/slides/admin` for admin), or  
- Unauthenticated read access for those CMS GET endpoints.

The frontend is wired to call the same API base URL (`NEXT_PUBLIC_API_URL`); no auth is sent when the **server** fetches data for the public page.

---

## 2. Performance and optimization

### What is in place

- **Admin is separate from the public site**  
  Admin lives under `/admin/*`. Only when a user goes to the dashboard do they load admin code and the API client. The public homepage does not bundle admin logic.

- **Server-side data loading for the public site**  
  The main layout and homepage fetch CMS data on the server. That avoids loading the full API client and making many client-side requests for the first paint.

- **Caching (ISR)**  
  Server fetches use Next.js `fetch` with `next: { revalidate: 60 }` (or similar). So:
  - Content is cached for a short period (e.g. 60 seconds).
  - After you save in the dashboard, the public site will show the new content within that revalidation window, without a full redeploy.
  - You can change `revalidate` (e.g. to 300 for 5 minutes) in `lib/public-api.ts` to balance freshness vs load on the backend.

- **Images**  
  Where possible, the public site uses the Next.js `<Image>` component (sizes, lazy loading, modern formats). Uploaded CMS images that are on your backend domain should be allowed in `next.config.js` `images.remotePatterns` so they can be optimized by Next.

- **No heavy admin scripts on the public page**  
  Login, dashboard, and form logic are only loaded on `/admin/*` routes.

### Recommended practices (images and video)

- **Images**  
  - Use the Next.js `<Image>` component with sensible `sizes` so the browser gets appropriately sized assets.  
  - Add your media (upload) domain to `images.remotePatterns` in `next.config.js` if images are served from a different host.

- **Video**  
  - Prefer **lazy loading** (`loading="lazy"`).  
  - Use a **poster** image so the page doesn’t depend on the video file for initial layout.  
  - Avoid **autoplay with sound**; if you use autoplay, keep it muted to reduce data and improve perceived performance.

### Optional next steps

- **Bundle analysis**  
  Run `npm run build` and, if you add a bundle analyzer, check that large libraries are not pulled into the public page by mistake.

- **Core Web Vitals**  
  Monitor LCP, FID/INP, CLS in production (e.g. Vercel Analytics, or other RUM) and optimize the largest images and any layout shifts.

- **CDN / caching**  
  In production, serve the site (and API if you control it) from a CDN and set cache headers for static assets and, where appropriate, for API responses that the public site uses.

---

## Summary

| Question | Answer |
|----------|--------|
| Is the current public site data from the backend? | **No.** It was hardcoded. After wiring, the public site fetches from the same backend the dashboard uses. |
| How do dashboard changes show on the public site? | You save in the dashboard → data is stored in the backend → the public site fetches that data on the server (with revalidation) → visitors see updates within the revalidate window. |
| How is performance kept in check? | Admin code is only loaded on `/admin`. Public data is fetched on the server with caching (revalidate). Images use Next/Image where possible; video should be lazy and use a poster. |
