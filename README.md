# Yenai Dairy Farm — Website Skeleton

A 3-page skeleton for the Yenai Dairy Farm website: **Home**, **About Us**, and **Our Farm**.
Plain HTML/CSS/JS — no build step, no framework. Open any `.html` file in a browser,
or serve the folder locally, to preview.

## Structure

```
index.html          Home page (hero, certifications, TV features, team, partners)
about.html           Our story, values, mission, why the farm exists
our-farm.html         Overview, facilities, cattle, products, gallery, contact
assets/css/style.css   All styling (colors, layout, components)
assets/js/main.js       Mobile nav toggle + contact form handler
```

## Theme

- **Colors**: navy `#0a3d62`, blue `#1e6fd9`, white, with a light-blue "cow polka dot" pattern
  used as a recurring motif (nav dots, hero background, banner accents).
- **Fonts**: Fraunces (headings) + Inter (body), loaded from Google Fonts.
- All colors/fonts are defined as CSS variables at the top of `style.css` — change them
  once, and they update everywhere.

## Placeholders — what to replace

Every image slot is currently a dashed-border blue box with an icon and label
(e.g. "Team Member Name", "Gallery photo", "Breed photo"). Search for `.placeholder` in
the HTML files to find them all. To swap one in, replace:

```html
<div class="placeholder"><svg>...</svg><span>Label</span></div>
```

with:

```html
<img src="assets/img/your-photo.jpg" alt="Description" />
```

Things still needed from you (mentioned in your brief but not yet attached):
1. **Logo** — currently a placeholder circular badge with "YD". Drop the real logo file
   into `assets/img/` and swap the `.logo-badge` markup in the header/footer of all 3 pages.
2. **Watermark farm photo** — for the hero background on the home page (`.hero-watermark`
   in `style.css`, currently a dot pattern).
3. **Certification images**, **team photos**, **partner logos**, **TV channel thumbnails**,
   **gallery photos**, **breed photos**, **product photos**.
4. Real copy for anything in `[brackets]` — founding story, mission statement, farm size,
   cattle count, production numbers, breed names/feed, addresses, phone, hours.

## Recommended tools

**Design / images**
- **Canva** or **Figma** — quick logo touch-ups, social banners, certification badge layout.
- **Squoosh** (squoosh.app) or **TinyPNG** — compress photos before adding them, so the site
  stays fast (aim under ~300KB per photo).
- **remove.bg** — if you need a clean cutout of the logo or a product shot.

**Building / editing**
- **VS Code** — free code editor, good for tweaking HTML/CSS directly.
- This site needs no framework, npm, or build step — it's ready to edit as-is.

**Hosting / deployment** (once content is in place)
- **GitHub Pages** — free, works directly from this repo.
- **Netlify** or **Vercel** — free tier, drag-and-drop deploy or auto-deploy from GitHub,
  and gives you a free HTTPS domain instantly.

**Contact form**
- The form in `our-farm.html` currently just shows a "thank you" message locally (see
  `main.js`) — it doesn't send email yet. When you're ready, wire it up with a free service
  like **Formspree** or **Web3Forms** (just point the form's `action` at their endpoint —
  no backend needed).

**Business/local presence**
- **Google Business Profile** — important for a physical farm; lets people find you on
  Google Maps/Search once the site is live.

## Next steps

Send over the logo, farm photos, certification badges, team photos, and partner logos, plus
the real numbers/copy for the bracketed placeholders, and the pages can be filled in section
by section.
