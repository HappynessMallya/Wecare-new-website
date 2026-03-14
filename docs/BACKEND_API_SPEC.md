# WeCare Foundation — Backend API Specification (CMS)

This document describes the APIs the backend must provide so that **all website content** can be managed from the admin dashboard. The frontend will consume these APIs and the admin dashboard will create/update/delete content via them.

---

## 1. Base URL & Conventions

- **Base URL:** `https://api.wecare.or.tz` (or your API origin)
- **Auth:** All write/update/delete endpoints require authentication (e.g. Bearer token or session). Read endpoints for the public site may be unauthenticated.
- **Content-Type:** `application/json` for request and response bodies.
- **Image uploads:** Either return a URL after upload (e.g. to S3/Cloudinary) or accept base64 for small assets; recommend **multipart/form-data** or **presigned URL** flow for logo/slides/photos.

---

## 2. Authentication (Admin)

Used by the dashboard only.

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Body: `{ "email", "password" }` → returns `{ "token", "user" }` |
| POST | `/api/auth/logout` | Invalidate session/token |
| GET | `/api/auth/me` | Return current admin user (for session check) |
| POST | `/api/auth/forgot-password` | Body: `{ "email" }` — trigger reset email |

---

## 3. Settings (Site-wide)

Single resource: one “settings” document that holds contact, social, and global options. Used by **navbar, footer, contact section, WhatsApp float, logo**.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/settings` | Return current site settings (public or admin) |
| PUT | `/api/settings` | Update settings (admin only) |

**Response/body shape:**

```json
{
  "id": "settings",
  "siteName": "WeCare Foundation",
  "tagline": "Enriching Children's Lives",
  "logoUrl": "/logo.png",
  "contactPhone": "+255 768 257 970",
  "whatsappUrl": "https://wa.me/255768257970",
  "contactEmail": "Wecarefoundation025@gmail.com",
  "officeLocation": "Mbeya, Tanzania",
  "regionsActive": "Mbeya Region & Mara Region, Tanzania",
  "socialInstagram": "https://www.instagram.com/wecarefoundationtz...",
  "socialFacebook": "https://www.facebook.com/share/...",
  "socialLinkedIn": "https://www.linkedin.com/in/elizabeth-maginga-...",
  "donateCtaUrl": "https://wa.me/255768257970",
  "foundedYear": "2022"
}
```

---

## 4. Hero Section

Slides for the main hero carousel.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/hero/slides` | List all slides (ordered) |
| POST | `/api/hero/slides` | Create slide (admin) |
| PUT | `/api/hero/slides/:id` | Update slide |
| DELETE | `/api/hero/slides/:id` | Delete slide |
| PATCH | `/api/hero/slides/reorder` | Body: `{ "order": ["id1", "id2", ...] }` — set order |

**Slide model:**

```json
{
  "id": "uuid",
  "imageUrl": "/parent-clinic.jpg",
  "alt": "Parent clinic sessions Tanzania",
  "title": "Parent Clinic Sessions",
  "subtitle": "Responsive caregiving & nutrition",
  "order": 1
}
```

---

## 5. SDG Ticker (below hero)

Horizontal scrolling ticker items (text + optional color).

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/ticker/items` | List items (ordered) |
| POST | `/api/ticker/items` | Create item |
| PUT | `/api/ticker/items/:id` | Update item |
| DELETE | `/api/ticker/items/:id` | Delete item |
| PATCH | `/api/ticker/items/reorder` | Body: `{ "order": ["id1", "id2", ...] }` |

**Item model:**

```json
{
  "id": "uuid",
  "label": "5,000+ Parents & caregivers reached",
  "colorKey": "blue",
  "order": 1
}
```

`colorKey`: one of `blue`, `rose`, `orange`, `azure` (maps to site CSS vars).

---

## 6. About (Who We Are)

Single block: intro, mission, vision, pillars (value cards). Left column has **images** (main + small) and **regions badge**; right column has **text + mission/vision**.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/about` | Get about content |
| PUT | `/api/about` | Update about (admin) |

**Body/response:**

```json
{
  "id": "about",
  "eyebrow": "Who We Are",
  "title": "Tanzania's Community-Led ECD Foundation",
  "titleHighlight": "ECD Foundation",
  "tagline": "Enriching Children's Lives — One Family at a Time",
  "introParagraph1": "WeCare Foundation (WeF) is a Non-Governmental Organization founded in **2022 in Tanzania**...",
  "introParagraph2": "**Our focus areas:** Child good health, Adequate nutrition...",
  "missionTitle": "Our Mission",
  "missionBody": "To contribute towards attainment of quality early childhood development...",
  "visionTitle": "Our Vision",
  "visionBody": "To provide access to the best start of life for all children...",
  "mainImageUrl": "/parentclinic.jpg",
  "secondaryImageUrl": "/kids-at-work.jpg",
  "regionsBadgeNumber": "2",
  "regionsBadgeLabel": "Regions\nMbeya & Mara",
  "pillars": [
    {
      "id": "uuid",
      "title": "Collaborative Approach",
      "description": "We engage community and stakeholders...",
      "iconEmoji": "🤝",
      "colorKey": "r"
    },
    {
      "id": "uuid",
      "title": "Community-Led",
      "description": "Programs are designed with communities...",
      "iconEmoji": "🏘️",
      "colorKey": "b"
    },
    {
      "id": "uuid",
      "title": "Parent-Centered",
      "description": "Working parents and caregivers...",
      "iconEmoji": "👨‍👩‍👧",
      "colorKey": "a"
    }
  ]
}
```

`colorKey`: `r` (rose), `b` (blue), `a` (azure), `o` (orange).

---

## 7. Impact Bar (stats strip)

Four (or variable) impact statistics.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/impact/bar` | List impact bar items |
| PUT | `/api/impact/bar` | Replace full list (body: array of items) |

**Item model:**

```json
{
  "id": "uuid",
  "iconEmoji": "👨‍👩‍👧",
  "number": "5000",
  "suffix": "+",
  "label": "Parents & Caregivers",
  "subtitle": "Reached with ECD info",
  "order": 1
}
```

If `suffix` is empty, display raw number (e.g. "1" for Market Centre).

---

## 8. Programs

Four (or more) program cards: image, tag, title, subtitle, body, bullet list, footer stat, link.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/programs` | List programs (ordered) |
| POST | `/api/programs` | Create program |
| GET | `/api/programs/:id` | Get one |
| PUT | `/api/programs/:id` | Update |
| DELETE | `/api/programs/:id` | Delete |
| PATCH | `/api/programs/reorder` | Body: `{ "order": ["id1", ...] }` |

**Section header (shared):**

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/programs/section` | Get eyebrow, title, intro paragraph |
| PUT | `/api/programs/section` | Update section header |

**Program model:**

```json
{
  "id": "uuid",
  "imageUrl": "/parentclinic.jpg",
  "imageAlt": "Early childhood development program Tanzania",
  "tagLabel": "Ages 0 – 5",
  "tagType": "t1",
  "regionBadge": "📍 Mbeya & Mara Regions",
  "title": "Early Childhood Development",
  "subtitle": "Investing in achieving child optimal development",
  "body": "WeCare implements programs that address the five components...",
  "outcomes": [
    "ECD health promotion during pregnancy and after birth",
    "Parent Clinic Sessions with caregivers",
    "Digital health promotion via social networks",
    "Education on nurturing care — food types & cooking demos"
  ],
  "footerStat": "5,000+",
  "footerStatLabel": "Parents & caregivers reached",
  "ctaLabel": "Learn more",
  "ctaHref": "#contact",
  "order": 1
}
```

`tagType`: `t1`|`t2`|`t3`|`t4` (style class).

---

## 9. Gallery

List of images for the horizontal scrolling gallery strip.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/gallery` | List items (ordered) |
| POST | `/api/gallery` | Add item |
| PUT | `/api/gallery/:id` | Update item |
| DELETE | `/api/gallery/:id` | Delete item |
| PATCH | `/api/gallery/reorder` | Body: `{ "order": ["id1", ...] }` |

**Item model:**

```json
{
  "id": "uuid",
  "imageUrl": "/parent-clinic.jpg",
  "alt": "WeCare parent clinic",
  "label": "Parent Clinic",
  "order": 1
}
```

---

## 10. Impact Stories (Testimonials)

Rotating testimonial cards (name, role, quote, image).

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/stories` | List testimonials (ordered) |
| POST | `/api/stories` | Create |
| GET | `/api/stories/:id` | Get one |
| PUT | `/api/stories/:id` | Update |
| DELETE | `/api/stories/:id` | Delete |
| PATCH | `/api/stories/reorder` | Body: `{ "order": ["id1", ...] }` |

**Section header:**

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/stories/section` | Eyebrow, title, intro, SDG tags, “Our Approach” block |
| PUT | `/api/stories/section` | Update |

**Testimonial model:**

```json
{
  "id": "uuid",
  "name": "Mama Zawadi",
  "role": "Market Vendor & Parent · Mbeya",
  "quote": "Since WeCare opened its daycare near Mwanjelwa market...",
  "imageUrl": "/parentclinic.jpg",
  "imageAlt": "Parent testimonial",
  "order": 1
}
```

**Section model (stories/section):**

```json
{
  "eyebrow": "Impact Stories",
  "title": "Real Change in Real Communities",
  "titleHighlight": "Real Communities",
  "introItalic": "Our school readiness program is a success story...",
  "introParagraph": "WeCare's impact goes beyond statistics...",
  "sdgTags": [
    { "label": "SDG 4: Education", "icon": "🎯", "class": "st1" },
    { "label": "SDG 3: Health", "icon": "💗", "class": "st2" },
    { "label": "SDG 1: No Poverty", "icon": "⚡", "class": "st3" },
    { "label": "SDG 17: Partnerships", "icon": "🌊", "class": "st4" }
  ],
  "approachTitle": "Our Approach to Impact",
  "approachBody": "WeCare uses a collaborative approach..."
}
```

---

## 11. Partners

Trusted partners: logo image + name, or text-only (e.g. “Parents”).

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/partners` | List partners (ordered) |
| POST | `/api/partners` | Add partner |
| PUT | `/api/partners/:id` | Update |
| DELETE | `/api/partners/:id` | Delete |
| PATCH | `/api/partners/reorder` | Body: `{ "order": ["id1", ...] }` |

**Partner model:**

```json
{
  "id": "uuid",
  "name": "Government of Tanzania",
  "logoUrl": "/GOVERNMENT.svg",
  "logoAlt": "Government of Tanzania",
  "textOnly": false,
  "order": 1
}
```

If `textOnly: true`, `logoUrl` and `logoAlt` can be null; frontend shows name only.

**Section header:**

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/partners/section` | Eyebrow, title, subtitle |
| PUT | `/api/partners/section` | Update |

---

## 12. Leadership (CEO / single leader)

Single “founder & CEO” block: photo, badge, name, title, bio paragraphs, email.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/leadership` | Get leadership content |
| PUT | `/api/leadership` | Update (admin) |

**Model:**

```json
{
  "id": "leadership",
  "sectionEyebrow": "Our Leadership",
  "sectionTitle": "Meet the Founder & CEO",
  "sectionTitleHighlight": "Founder & CEO",
  "photoUrl": "/ceo.png",
  "photoAlt": "Elizabeth Maginga Thobias – CEO WeCare Foundation",
  "badgeTitle": "WeCare\nFoundation",
  "badgeSubtitle": "CEO & Founder",
  "eyebrow": "Founder & Chief Executive Officer",
  "name": "Elizabeth Maginga Thobias",
  "nameHighlight": "Maginga Thobias",
  "paragraphs": [
    "Elizabeth Maginga Thobias is the visionary founder and CEO...",
    "Under her leadership, WeCare has grown from a community initiative...",
    "Elizabeth leads WeCare's four core programs..."
  ],
  "email": "Wecarefoundation025@gmail.com"
}
```

---

## 13. Get Involved (CTA cards)

Three cards: Donate, Partner, Volunteer (icon, title, body, CTA link).

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cta/involved` | List cards + section header |
| PUT | `/api/cta/involved` | Replace section header + cards (body: full object) |

**Model:**

```json
{
  "eyebrow": "Get Involved",
  "title": "Be Part of the Change",
  "titleHighlight": "Change",
  "intro": "There are meaningful ways to join WeCare's mission...",
  "cards": [
    {
      "id": "uuid",
      "iconEmoji": "❤️",
      "title": "Donate",
      "body": "Your contribution directly funds daycare centres...",
      "ctaLabel": "Make a Donation →",
      "ctaHref": "https://wa.me/255768257970",
      "styleClass": "c1",
      "order": 1
    },
    { "iconEmoji": "🤝", "title": "Partner With Us", ... },
    { "iconEmoji": "🙋", "title": "Volunteer", ... }
  ]
}
```

`styleClass`: `c1`|`c2`|`c3` (rose/blue/orange).

---

## 14. CTA Banner (full-width strip)

Single block: background image, heading, text, two buttons.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cta/banner` | Get banner |
| PUT | `/api/cta/banner` | Update |

**Model:**

```json
{
  "id": "ctab",
  "imageUrl": "/kids.jpg",
  "imageAlt": "WeCare Foundation children Tanzania – every child deserves a strong start",
  "title": "Every Child Deserves a Strong Start in Life",
  "titleHighlight": "Strong Start",
  "body": "Join WeCare Foundation in building Tanzania's next generation...",
  "primaryButtonLabel": "❤ Donate Today",
  "primaryButtonHref": "https://wa.me/255768257970",
  "secondaryButtonLabel": "Partner With Us",
  "secondaryButtonHref": "https://wa.me/255768257970"
}
```

---

## 15. Newsletter Section

Single block: eyebrow, title, description, placeholder, button text, disclaimer.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/newsletter` | Get content |
| PUT | `/api/newsletter` | Update |

**Model:**

```json
{
  "id": "newsletter",
  "eyebrow": "Stay Connected",
  "title": "Stay Updated With Our Work",
  "description": "Receive program updates, impact stories, and ECD insights...",
  "inputPlaceholder": "Your email address",
  "buttonLabel": "Subscribe →",
  "disclaimer": "No spam. Unsubscribe anytime. We respect your privacy."
}
```

**Note:** Actual subscription (e.g. POST `/api/newsletter/subscribe` with `{ "email" }`) can be a separate endpoint that the backend implements (store in DB, send to Mailchimp, etc.).

---

## 16. Contact Section

Copy and labels for the contact block (contact details come from **Settings**).

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/contact/section` | Get section content |
| PUT | `/api/contact/section` | Update |

**Model:**

```json
{
  "id": "contact",
  "eyebrow": "Get In Touch",
  "title": "Let's Start a Conversation",
  "titleHighlight": "Conversation",
  "intro": "Whether you're a potential funder, partner, researcher, community member, or journalist — Elizabeth and the WeCare team would love to hear from you.",
  "formTitle": "Send Us a Message",
  "fullNameLabel": "Full Name *",
  "organizationLabel": "Organization",
  "emailLabel": "Email Address *",
  "inquiryTypeLabel": "Inquiry Type",
  "messageLabel": "Message *",
  "submitLabel": "Send Message →",
  "successMessage": "Your message will be delivered. For a quick response, please click the button below to reach us on WhatsApp instantly.",
  "whatsappButtonLabel": "Chat on WhatsApp — "
}
```

Phone number and WhatsApp link are from **Settings**.

---

## 17. Navigation & Footer Links

Nav items and footer link groups (organization, programs, get involved).

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/nav` | List nav items (ordered) |
| PUT | `/api/nav` | Replace list (body: array) |
| GET | `/api/footer/links` | Get all footer link groups |
| PUT | `/api/footer/links` | Replace (body: object with groups) |

**Nav item:**

```json
{
  "id": "uuid",
  "label": "About",
  "href": "#about",
  "order": 1
}
```

**Footer links:**

```json
{
  "orgLinks": [
    { "label": "About WeCare", "href": "#about" },
    { "label": "Our Mission & Vision", "href": "#about" },
    { "label": "Our Approach", "href": "#about" },
    { "label": "Where We Work", "href": "#contact" }
  ],
  "programLinks": [
    { "label": "Early Childhood Development", "href": "#programs" },
    ...
  ],
  "involvedLinks": [
    { "label": "Donate", "href": "https://wa.me/...", "external": true },
    { "label": "Partner With Us", "href": "https://wa.me/...", "external": true },
    { "label": "Volunteer", "href": "#involved", "external": false },
    ...
  ]
}
```

**Footer copy (blurb + copyright):**

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/footer` | Blurb, copyright text |
| PUT | `/api/footer` | Update |

```json
{
  "blurb": "A community-led NGO committed to quality early childhood development...",
  "copyright": "© 2026 WeCare Foundation. All rights reserved. Registered NGO — Tanzania."
}
```

---

## 18. Media / Uploads

Backend should expose a way for the dashboard to upload images (logo, hero slides, gallery, programs, stories, leadership, CTA banner).

**Option A — Presigned URL (recommended):**

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/media/presign` | Body: `{ "filename", "contentType" }` → returns `{ "uploadUrl", "publicUrl" }`; dashboard uploads to `uploadUrl`, then uses `publicUrl` in content. |

**Option B — Direct upload:**

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/media/upload` | `multipart/form-data` with file → returns `{ "url" }`. |

---

## 19. Summary: Endpoints Checklist

| Area | GET | PUT/POST/DELETE |
|------|-----|------------------|
| Auth | `/api/auth/me` | `/api/auth/login`, `/api/auth/logout` |
| Settings | `/api/settings` | PUT `/api/settings` |
| Hero | `/api/hero/slides` | CRUD + reorder |
| SDG Ticker | `/api/ticker/items` | CRUD + reorder |
| About | `/api/about` | PUT `/api/about` |
| Impact bar | `/api/impact/bar` | PUT `/api/impact/bar` |
| Programs | `/api/programs`, `/api/programs/section` | CRUD + reorder, PUT section |
| Gallery | `/api/gallery` | CRUD + reorder |
| Stories | `/api/stories`, `/api/stories/section` | CRUD + reorder, PUT section |
| Partners | `/api/partners`, `/api/partners/section` | CRUD + reorder, PUT section |
| Leadership | `/api/leadership` | PUT `/api/leadership` |
| CTA Involved | `/api/cta/involved` | PUT `/api/cta/involved` |
| CTA Banner | `/api/cta/banner` | PUT `/api/cta/banner` |
| Newsletter | `/api/newsletter` | PUT `/api/newsletter`, POST subscribe |
| Contact section | `/api/contact/section` | PUT `/api/contact/section` |
| Nav | `/api/nav` | PUT `/api/nav` |
| Footer | `/api/footer`, `/api/footer/links` | PUT both |
| Media | — | POST `/api/media/presign` or `/api/media/upload` |

---

## 20. Frontend Usage

- **Public site:** Fetches GET endpoints (e.g. `/api/settings`, `/api/hero/slides`, `/api/about`, …) at build time (SSG) or request time (SSR) and passes data into components. No auth.
- **Admin dashboard:** Uses GET for listing/editing and PUT/POST/DELETE for saving; sends auth token (e.g. in `Authorization: Bearer <token>`) on every mutation request.

Once these APIs are implemented, the frontend and dashboard can be wired to them so that the entire site is manageable from the CMS (dashboard) and served from the backend.
