# CMS API Gaps — Backend Handoff

> **Backend team (separate codebase):** deliver the following specifications only; implementation is out of scope for this Next.js repository.

This document lists every missing or incomplete REST endpoint needed for the frontend CMS to function fully. The frontend has been wired to call these endpoints with graceful fallbacks when they are unavailable.

---

## Content Matrix

| Public Page / Section | Fields | GET (public) | GET (admin) | PUT/POST (admin) | Admin Page |
|---|---|---|---|---|---|
| **Homepage — Hero** | slides, headline | `/api/hero/slides` | `/api/hero/slides/admin` | POST/PUT/DELETE `/api/hero/slides` | `/admin/hero` |
| **Homepage — About** | eyebrow, title, mission, vision, pillars, images | `/api/about` | `/api/about` | PUT `/api/about` | `/admin/about` |
| **Homepage — Leadership** | name, bio, photo, email | `/api/leadership` | `/api/leadership` | PUT `/api/leadership` | `/admin/leadership` |
| **Homepage — Programs** | section header + program cards | `/api/programs/section`, `/api/programs/admin` | `/api/programs/admin` | CRUD `/api/programs` | `/admin/programs` |
| **Homepage — Impact** | stat items | `/api/impact/bar` | `/api/impact/bar` | PUT `/api/impact/bar` | `/admin/impact` |
| **Homepage — Partners** | section header + partner list | `/api/partners/section`, `/api/partners/admin` | `/api/partners/admin` | CRUD `/api/partners` | `/admin/partners` |
| **Homepage — Contact** | form labels, section copy | `/api/contact/section` | `/api/contact/section` | PUT `/api/contact/section` | `/admin/contact` |
| **Homepage — Gallery** | gallery items | `/api/gallery/admin` | `/api/gallery/admin` | CRUD `/api/gallery` | `/admin/gallery` |
| **Nav** | links | `/api/nav` | `/api/nav` | PUT `/api/nav` | `/admin/navigation` |
| **Footer** | copy + link groups | `/api/footer`, `/api/footer/links` | same | PUT `/api/footer`, PUT `/api/footer/links` | `/admin/footer` |
| **Settings** | site name, social, contact info | `/api/settings` | `/api/settings` | PUT `/api/settings` | `/admin/settings` |
| **Team page** | section copy + team members | **NEW** | **NEW** | **NEW** | `/admin/team` |
| **Program detail** | hero, challenge, activities, impact, testimonials | **NEW** | **NEW** | **NEW** | `/admin/programs` (detail tab) |

---

## 1. Team Members — NEW endpoints

### `GET /api/team/members` (public, unauthenticated)

Returns active team members sorted by `order`.

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "name": "Jane Doe",
      "role": "Programme Officer",
      "region": "Mbeya Region",
      "bio": "Leads community programs...",
      "photoUrl": "https://cdn.example.com/jane.jpg",
      "photoAlt": "Jane Doe headshot",
      "email": "jane@wecare.or.tz",
      "linkedInUrl": "https://linkedin.com/in/jane",
      "category": "programme_leader",
      "order": 0
    }
  ]
}
```

**Field notes:**
- `category` enum: `founder`, `programme_leader`, `staff`, `volunteer`
- Public endpoint should filter `isActive = true` and sort by `order ASC`

### `GET /api/team/members/admin` (authenticated)

Same shape as public but returns ALL members (including inactive).

### `POST /api/team/members` (authenticated)

**Request body:**
```json
{
  "name": "Jane Doe",
  "role": "Programme Officer",
  "region": "Mbeya Region",
  "bio": "...",
  "photoUrl": "https://...",
  "photoAlt": "...",
  "email": "jane@wecare.or.tz",
  "linkedInUrl": "https://...",
  "category": "programme_leader",
  "order": 0,
  "isActive": true
}
```

**Response:** `{ "data": { ...createdMember } }`

### `PUT /api/team/members/:id` (authenticated)

Partial update. Same fields as POST.

### `DELETE /api/team/members/:id` (authenticated)

Soft-delete. Returns 204.

### `PATCH /api/team/members/reorder` (authenticated)

**Request:** `{ "order": ["id1", "id2", ...] }`
**Response:** `{ "data": [...reorderedMembers] }`

---

## 2. Team Page Section Copy — NEW endpoints

### `GET /api/team/section` (public, unauthenticated)

Returns section-level text for the team page.

**Response:**
```json
{
  "data": {
    "heroEyebrow": "The People Behind the Mission",
    "heroTitle": "Meet Our",
    "heroTitleHighlight": "Team",
    "heroSubtitle": "Dedicated leaders...",
    "foundersEyebrow": "Leadership",
    "foundersTitle": "Founder & Director",
    "leadersEyebrow": "On the Ground",
    "leadersTitle": "Programme Leaders",
    "leadersSubtitle": "Our regional leaders...",
    "staffEyebrow": "Our People",
    "staffTitle": "Staff & Volunteers",
    "joinEyebrow": "Join Us",
    "joinTitle": "Passionate about",
    "joinTitleHighlight": "children's futures?",
    "joinSubtitle": "We're always looking...",
    "joinPrimaryLabel": "View Open Roles",
    "joinPrimaryHref": "/#contact",
    "joinSecondaryLabel": "Volunteer With Us",
    "joinSecondaryHref": "/#contact"
  }
}
```

### `PUT /api/team/section` (authenticated)

Partial update. Same fields. Returns updated section.

---

## 3. Program Detail — NEW endpoints

Each program card already exists via `/api/programs`. These new endpoints store the **detail page** content (challenge, activities, testimonials, sidebar facts, etc.).

### `GET /api/programs/:programId/detail` (public, unauthenticated)

**Response:**
```json
{
  "data": {
    "id": "uuid",
    "programId": "ecd",
    "heroTitle": "Early Childhood Development",
    "heroSubtitle": "Holistic support for Tanzania's youngest children...",
    "heroImageUrl": "https://...",
    "chips": ["Mbeya & Mara", "Ages 0–8", "5,000+ families"],
    "challengeEyebrow": "The Challenge",
    "challengeTitle": "Why this program exists",
    "challengeParagraphs": [
      "In Tanzania, many children under 8 lack access...",
      "WeCare Foundation works directly with families..."
    ],
    "activitiesEyebrow": "What We Do",
    "activitiesTitle": "Program Activities",
    "activities": [
      {
        "title": "Activity Focus",
        "items": ["Parent clinic sessions...", "Home and community ECD..."]
      }
    ],
    "targetCommunities": ["Pregnant women and partners", "Caregivers of children aged 0-5"],
    "impactNumbers": [
      { "value": "5,000+", "label": "Parents and caregivers reached" },
      { "value": "2", "label": "Core regions covered" }
    ],
    "testimonials": [
      {
        "quote": "The parent sessions changed how we feed and care for our baby.",
        "name": "Parent participant",
        "role": "Mbeya"
      }
    ],
    "partners": ["Local government health teams", "Community health workers"],
    "galleryImages": ["https://cdn.example.com/img1.jpg"],
    "sidebarQuickFacts": [
      { "label": "Target Age", "value": "0-8" },
      { "label": "Regions", "value": "Mbeya & Mara" }
    ]
  }
}
```

**Notes:**
- If no detail record exists for a programId, return 404 (frontend falls back to hardcoded content).
- `programId` is the same ID used in `/api/programs` (e.g. `ecd`, `quality-early-childhood-education`).

### `PUT /api/programs/:programId/detail` (authenticated)

Creates or updates the detail record for the given programId (upsert behavior).

**Request body:** Same fields as GET response `data` (partial update supported).

**Response:** `{ "data": { ...updatedDetail } }`

---

## 4. Existing Endpoints — Missing Public Routes

Several existing endpoints only have an `/admin` variant. The public site currently falls back to calling admin endpoints unauthenticated. Dedicated public endpoints would be cleaner:

| Resource | Current public path | Recommended public path |
|---|---|---|
| Programs list | `/api/programs/admin` (no auth check) | `/api/programs` (public, filters `isActive`) |
| Gallery items | `/api/gallery/admin` | `/api/gallery` (public, filters `isActive`) |
| Stories | `/api/stories/admin` | `/api/stories` (public, filters `isActive`) |
| Partners | `/api/partners/admin` | `/api/partners` (public, filters `isActive`) |
| Hero slides | `/api/hero/slides/admin` fallback | `/api/hero/slides` already exists but may 401 |

**Recommendation:** Each of these should have a public GET that filters `isActive = true` and sorts by `order ASC`. The `/admin` variant returns all records for the dashboard.

---

## 5. Field Gaps on Existing Resources

### Programs (`/api/programs`)
The `Program` type currently lacks detail-page fields. Rather than bloating the programs table, we recommend the separate `/api/programs/:id/detail` approach above. However, if a single-table approach is preferred:

- Add: `heroTitle`, `heroSubtitle`, `heroImageUrl`, `chips` (JSON array), `challengeParagraphs` (JSON array), `activitiesTitle`, `activities` (JSON array of `{title, items[]}`), `targetCommunities` (JSON array), `impactNumbers` (JSON array of `{value, label}`), `testimonials` (JSON array of `{quote, name, role}`), `partners` (JSON array), `galleryImages` (JSON array), `sidebarQuickFacts` (JSON array of `{label, value}`)

### Leadership (`/api/leadership`)
- Currently single-record. Team page reuses this for the CEO card. No changes needed unless multiple leadership profiles are desired.

### Settings (`/api/settings`)
- Consider adding: `socialX` (Twitter/X URL) — the reference HTML shows an X social icon.

---

## 6. Caching & Revalidation Strategy

The frontend uses Next.js ISR with:
- **30-second revalidate** in production (`next: { revalidate: 30, tags: [...] }`)
- **No-store** in development for instant updates
- **Tag-based revalidation**: After any admin save, `revalidateTag('public-site')` clears all caches
- **Section-specific tags**: `settings`, `hero`, `about`, `impact`, `programs`, `gallery`, `stories`, `partners`, `leadership`, `cta`, `newsletter`, `contact`, `nav`, `footer`, `team`

Backend does not need to implement cache busting. The Next.js app handles it client-side via `revalidatePublicSite()` called after every admin mutation.

---

## 7. Authentication Notes

- All `GET` public endpoints must be accessible **without authentication**.
- All mutating endpoints (`POST`, `PUT`, `PATCH`, `DELETE`) require a valid Bearer token.
- The admin client automatically refreshes tokens on 401 via `/api/auth/refresh`.

---

## Summary of New Work

| Priority | Endpoint Group | Methods | Estimated Effort |
|---|---|---|---|
| **P0** | Team members CRUD | GET/POST/PUT/DELETE + reorder | Medium |
| **P0** | Team section copy | GET/PUT | Small |
| **P0** | Program detail | GET/PUT (upsert) | Medium |
| **P1** | Public list endpoints (programs, gallery, stories, partners) | GET | Small |
| **P2** | Settings — socialX field | PUT | Trivial |
