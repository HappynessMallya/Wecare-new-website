# WeCARE Foundation — Website

Single-page website for WeCARE Foundation, an NGO focused on early childhood development in Tanzania.

## Tech stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Forms:** React Hook Form + Zod
- **Deployment:** Vercel-ready

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Project structure

- `app/` — App Router layout and page
- `components/` — Navbar, Hero, About, Programs, ImpactStats, Testimonials, Partners, GetInvolved, News, Contact, ContactForm, Footer, StructuredData
- `components/ui/` — Button, Input, Select, Textarea
- `lib/` — utils, validations (contact schema)
- `styles/` — design tokens
- `public/` — static assets

## Design

- **Primary:** Egyptian Blue `#0A3487`
- **Secondary:** Maya Blue `#80BFEC`
- **CTA:** Spicey Paprika `#DF4917`
- **Fonts:** Playfair Display (headings), Inter (body)

## Performance

Target: Lighthouse 95+. Uses server components where possible, next/image for images, minimal client JS, and semantic HTML with accessibility in mind.
