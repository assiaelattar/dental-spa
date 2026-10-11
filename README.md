# Dental Spa V3 — Next.js / Vercel-compatible deployment

This repository serves the approved **Dental Spa V3** experience (**Clinical Precision × Spa Comfort**, Sculpted Enamel identity) through a minimal Next.js App Router shell, compatible with the existing Vercel **Next.js** project settings.

## Why the compatibility shell exists

The V3 site was designed as a standalone HTML/CSS/JavaScript experience. The original replacement removed the Next.js `app` directory, causing Vercel's Next.js build to fail with `Couldn't find any pages or app directory`.

- `src/app/layout.tsx` and `src/app/page.tsx` restore a valid Next.js application.
- `next.config.ts` rewrites **`/` to `/index.html`**. The actual website is served as static content from `public/`, with its existing markup, styling, images, animations, navigation and booking demo intact.
- `npm run vercel-build` runs `next build`, matching the Vercel project build command.

## Run locally

```sh
npm ci
npm run dev
```

Visit http://localhost:3000/ for the V3 website. Direct static preview: http://localhost:3000/index.html.

For Vercel, keep the framework preset **Next.js**, root directory `./`, and build command `npm run vercel-build` (or use the default `next build`). The Node.js version must support the Next.js version in `package.json`.

## V3 contents

- `public/index.html`: website shell and all five page views
- `public/styles.css`: brand and responsive styles, animations, transitions
- `public/app.js`: navigation, interactive treatment workflow and demo appointment steps
- `public/assets/`: Dr Amina photography and dental illustrations
- `DESIGN_SYSTEM.md`: brand and design-system documentation

## Important boundaries before launch

**This is still a design prototype**, not a connected clinical booking system. Dates and time slots are illustrative; no form submits patient information or confirms a real appointment. The site contains noindex directives and a restrictive `robots.txt` to prevent indexing while the medical copy, personal details, privacy requirements and booking integrations remain under review.

Production launch requires verifying medical credentials, clinic contact details, photo usage rights, actual clinical services, and connecting appointments to Dental OS. No live website publication is implied by the GitHub push.

## Backups

- Original Next.js site: `backup/pre-v3-nextjs-2026-10-11`
- Standalone V3 root before compatibility fix: `backup/pre-vercel-fix-v3-2026-10-11`

## Mobile V4 UX enhancements

The mobile-only `public/mobile-v4.css` and `public/mobile-v4.js` improve the phone/tablet experience without replacing desktop styles or the existing booking logic: compact hero with Dr Amina and dental visualization, full-screen accessible menu, persistent booking/call action, touch-friendly swipeable clinical cards, horizontally selectable digital workflow stages, and a streamlined one-column appointment demo. Reduced-motion and safe-area support are included.

Visual/interaction checks passed at 320, 390, 430, 768 and 1440 px, including zero document-level horizontal overflow and the no-submission demo booking flow. Live Vercel build/deployment still needs verification.
