# IDIAS Global Conferences - React rebuild

A Vite + React + Tailwind rebuild of **idias.org**, reconstructed from the WordPress backup in
`X:\Idias backup\public_html`. Same brand, same content, same photography - rewritten as modern
components with no WordPress, no PHP and no database.

---

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
```

```bash
npm run build    # -> dist/
npm run preview  # serve the built site locally
```

Node 18+ required (Node 20 recommended).

---

## Structure

```
idias-conferences/
├── index.html              # entry, loads Raleway + Roboto
├── netlify.toml            # build command + SPA redirect
├── tailwind.config.js      # brand colours, fonts, keyframes
├── public/img/             # 212 optimised images from wp-content/uploads
└── src/
    ├── App.jsx             # routes
    ├── index.css           # design system: buttons, type scale, reveal, noise, orbs
    ├── data/content.json   # ALL site content - single source of truth
    ├── hooks/useMotion.js  # reveal, parallax, scroll, count-up
    ├── lib/events.js       # event lookup, date parsing, agenda grouping
    ├── components/         # Header, Footer, Hero, Img, Reveal, Parallax, Marquee...
    └── pages/              # 10 nav pages + EventDetail, Legal, 404
```

### Routes

| Route | Page |
|---|---|
| `/` | Home |
| `/events` | Conference listing - search, city filter, year filter |
| `/events/:slug` | **Event detail page** - one per congress (23 of them) |
| `/speakers` | 79 speakers, searchable, role filter, paginated |
| `/gallery` | 103 photos, mosaic + lightbox, paginated |
| `/speaker-blueprints` | How to become a speaker |
| `/speaker-services` | Author & book spotlights |
| `/testimonials` | Empty state - see note below |
| `/about-us` | About i-DIAS |
| `/contact` | Contact details + Netlify form |
| `/faq` | 11 Q&As, accordion |
| `/privacy-policy`, `/terms-and-conditions` | Legal |

---

## Event detail pages

Each of the 23 congresses has its own page at `/events/<slug>`, built from data scraped out of the
cached WordPress pages. What's on them:

- Parallax banner with the congress title, dates, venue and timezone
- **Live countdown** to the first day
- Full description (the real copy from the site)
- **Day-tabbed agenda** with a session timeline - 621 sessions across all events, with speaker
  names pulled out of titles like "Keynote Speaker / Jane Doe"
- Open speaking slots are highlighted with a "claim this slot" link
- **Sticky ticket sidebar** with every published tier and price
- Venue card with a maps link
- Co-located congresses (same city, same dates)

### How complete is the data

| | Count |
|---|---|
| Events total | 23 |
| With full description | 10 |
| With a published agenda | 9 own + 2 shared = 11 |
| With ticket pricing | 12 own + 7 shared = 19 |

The gaps are real gaps in the backup, not omissions. Only 10 event pages were in the WordPress
page cache; the rest existed only as cards on the listing page, so all that survived is title,
date, city and banner image. Those pages show the real facts they have and an honest
"full brief available on request" panel instead of invented copy.

**Shared programmes.** i-DIAS runs several congresses side by side at the same venue on the same
dates, and the cached pages confirm they publish one joint agenda across them (the Dubai congresses
on 25-27 Nov 2026 share an identical 58-session programme, as do the Paris ones in March 2027).
Where an event had no agenda of its own but a co-located event did, the shared programme is
displayed **with a visible notice naming the source event**. Same for ticket pricing. If you would
rather these were blank, delete the `sharedProgrammeFrom` / `sharedTicketsFrom` blocks from
`content.json`.

---

## Design & motion

Brand tokens are sampled from your own files, not invented:

| Token | Value | Source |
|---|---|---|
| `brand.purple` | `#3b1d82` | Elementor global kit, 18 uses |
| `brand.violet` | `#af0387` | Elementor global kit |
| `brand.pink` | `#ff007a` | Elementor global kit, 8 uses |
| `brand.magenta` | `#e7015e` | Exhibz `master.css`, 85 uses |
| `ink` | `#1c1c24` | Exhibz `master.css` |
| Display / body font | Raleway / Roboto | Google Fonts link in the live page `<head>` |

Motion, all hand-rolled with IntersectionObserver and `requestAnimationFrame` - no animation
library, nothing extra in the bundle:

- **Parallax** on every hero and several image collages (`useParallax`, `<Parallax>`)
- **Scroll reveals** with stagger (`useReveal`, `<Reveal variant delay>`)
- **Count-up stats** that fire when scrolled into view
- **Infinite logo marquee**, pauses on hover
- Layered backgrounds: gradient meshes, blurred orbs, SVG grain, faint grid, curved section edges
- Sticky header that shrinks on scroll, with a reading-progress bar

**Every animation is disabled under `prefers-reduced-motion: reduce`**, both in CSS and in the JS
hooks.

### Image handling

All images go through `<Img>`, which wraps them in a fixed aspect-ratio frame with a shimmer
placeholder. That means **no layout shift** and nothing ever stretches - each context gets a
deliberate ratio (4:5 speaker portraits, 16:10 event cards, mixed ratios in the gallery mosaic).

Originals came from `wp-content/uploads`. Speaker portraits capped at 480px, everything else at
1200px, progressive JPEG at quality 76-80. 42 MB of originals down to 18 MB. Your backup is
untouched.

---

## Editing content

Nearly everything lives in **`src/data/content.json`**.

```jsonc
{
  "logo": "/img/2022_11_Main-Logo.png",
  "hero": ["/img/...jpg"],
  "events": [{
    "slug": "nextgen-wups",
    "title": "...",
    "image": "/img/...jpg",
    "date": "20 Jul 2026 - 23 Jul 2026",
    "location": "New York, USA.",
    "time": "08:00 - 18:00",
    "timezone": "America/New_York",
    "description": ["paragraph", "..."],
    "tickets": [{ "name": "Speaker Registration", "price": "$799.00" }],
    "days": ["20 Jul New York Event Day-1", "..."],
    "sessions": [{ "time": "07:30 - 08:00", "title": "Opening Ceremony" }]
  }],
  "speakers": [{ "name", "role", "image" }],
  "gallery": ["/img/...jpg"],
  "faq": [{ "q", "a" }],
  "contact": { "org", "address", "phone", "emails": [] }
}
```

Adding an event: append an object with at least `slug`, `title`, `image`, `date`, `location`.
The detail page, the listing card and the routing all pick it up automatically.

Adding an image: drop it in `public/img/`, reference it as `/img/filename.jpg`.

---

## Known gaps

**Testimonials is empty on purpose.** The database had a "Speaker Testimonials" heading but no
quotes, names or videos - the section was rendered by a plugin whose data was not in the backup.
Rather than invent them, the page ships with an honest empty state. Add real ones to the
`TESTIMONIALS` array at the top of `src/pages/Testimonials.jsx` and the empty state disappears.

**The contact and newsletter forms use Netlify Forms.** They work automatically once deployed to
Netlify - submissions appear in your Netlify dashboard. Locally they show a confirmation state so
you can see the flow. To use another provider, change the `<form>` attributes in
`src/pages/Contact.jsx` and `src/components/Footer.jsx`.

**No e-commerce.** WordPress ran WooCommerce with Stripe and PayPal for ticket sales. A static
React site cannot process payments. The ticket tiers are displayed and every CTA routes to the
contact form with the congress pre-filled. To take money: Stripe Payment Links (fastest), Stripe
Checkout via a Netlify Function, or an external platform such as Eventbrite.

**13 events have thin detail pages.** See the completeness table above. If you can export
`wp_postmeta` from the live database, the full descriptions, agendas and pricing for those can be
dropped straight into `content.json`.

---

## Deploying

`netlify.toml` is configured (`npm run build` → `dist`, with an SPA redirect so deep links like
`/events/nextgen-wups` work on refresh).

A Netlify project already exists for this site: **idias-conferences-preview**. To upload and build
it, run this inside the project folder:

```bash
npx -y @netlify/mcp@latest --site-id a84cd943-871a-4d62-b6c3-2bf41a1f970e
```

Anywhere else: `npm run build` and upload `dist/`. Works on Vercel, Cloudflare Pages, GitHub Pages
or your existing Hostinger account - just add a rewrite so all routes serve `index.html`.
