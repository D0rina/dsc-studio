# DSC STUDIO — business website with online booking

Website for **DSC STUDIO**, a small education and services business in Rijeka, Croatia —
tutoring, state exam (matura) preparation, web design courses and writing assistance.
Built and maintained by the business owner.

🇭🇷 *Web stranica obrta DSC STUDIO (instrukcije, priprema za maturu, edukacije web dizajna, pomoć u pisanju radova) sa sustavom za online rezervaciju termina.*

🌐 **Live:** [dsc-studio.hr](https://dsc-studio.hr)

---

## Features

- **Online booking in three steps** — the client picks a service and level (primary / secondary school),
  then a date and a free time slot, then submits a request
- **Smart availability** — slots in 15-minute steps, minimum session length of 45 minutes,
  working hours configured per weekday; booked slots disappear for everyone else
- **Request workflow** — every booking starts as *pending*; the owner approves or rejects it,
  and only approved bookings block the slot
- **Password-protected admin panel** with cookie-based session for managing booking requests
- **E-mail notifications** for new booking requests and contact form messages (Formspree)
- **Price list** with separate prices per school level
- **SEO** — meta tags, sitemap and `robots.txt`; the admin area is excluded from indexing

## Tech stack

| Area | Technology |
|---|---|
| Framework | Next.js 16 (App Router), React |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Data | Upstash Redis (serverless, REST API) |
| E-mail | Formspree |
| Hosting | Netlify, deployed automatically from GitHub; custom `.hr` domain |

## How booking works

```
Client                        Website                         Owner
  │  picks service + slot  ──▶  saves request as "pending"
  │                              in Redis, sends e-mail  ──▶  gets notification
  │                                                            │
  │                              status → "confirmed"    ◀──  approves in admin panel
  │                              slot shown as taken           (or rejects → slot freed)
```

## Design

- Colours: forest green `#1F4B43` and gold `#D9A52B` on a light paper-like background
- Fonts: Fraunces (headings), Inter (body text), JetBrains Mono (prices and labels)
- Signature element: an animated "grade mark" on the home page — a school grade
  changing from 2 to 5, showing what tutoring is really about

## Running locally

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev
```

Environment variables (see `.env.example`):

| Variable | Purpose |
|---|---|
| `UPSTASH_REDIS_REST_URL` | Redis database URL |
| `UPSTASH_REDIS_REST_TOKEN` | Redis access token |
| `ADMIN_PASSWORD` | Password for the admin panel |
| `FORMSPREE_BOOKING_ENDPOINT` | Formspree form for booking notifications |

Working hours offered for booking are configured in `lib/slots.ts`.
