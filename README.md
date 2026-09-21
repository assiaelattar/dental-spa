# Dental Spa — Layer 1

A deployable Next.js App Router frontend for Dental Spa / Spa Dentaire, Dr Amina El Omrani, Casablanca. TypeScript, React, CSS design tokens, self-hosted fonts, static content pages and small interactive components. No external UI or motion framework.

## Run

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:3000 on the development computer. The local server listens on all interfaces, so a phone on the same Wi-Fi can use the computer's LAN address, for example `http://192.168.x.x:3000`. For production: `npm run build` then `npm start`. Deploy to a host supporting Next.js / Node.js. Requires Node.js 20.9 or newer. No live deployment was requested or performed.

## Validate

```sh
npm run build
npm run typecheck
# With the production server running and Chrome installed:
npm run qa
node scripts/qa-focus.mjs
node scripts/qa-images.mjs
```

Browser QA uses Playwright and axe, visits every route at desktop/mobile sizes, saves screenshots in `qa/screenshots`, and tests navigation, enquiry validation/context/export, staging SEO and 404 behavior. Set `QA_ORIGIN` to test another local instance. Browser screenshots and machine reports are ignored by Git.

## Configuration

Copy `.env.example` to `.env.local` as needed. With no configuration the site runs as a staging frontend: indexing disabled, no invented canonical domain, no live enquiry submission. Set `NEXT_PUBLIC_SITE_URL` to the verified origin for absolute metadata. Set `NEXT_PUBLIC_CLINIC_EMAIL` only to a verified address to enable a user-controlled email draft. Set `NEXT_PUBLIC_INDEXABLE=true` only after content approval. Public environment values are baked in at build time: rebuild when changing them.

## Structure

- `src/lib/content.ts`: navigation, treatments, concerns, route metadata and CTA context helper.
- `src/lib/site.ts`: verified deployment origin and SEO configuration.
- `src/lib/visuals.ts`: responsive image mappings, focal points and illustrative-image captions.
- `assets/dentalspa/manifest.json`: source URLs, canonical originals, checksums and derivative inventory.
- `public/images/dentalspa`: responsive WebP assets served locally.
- `src/components`: shared UI, navigation, discovery, homepage, page templates, enquiry and clinical evidence components.
- `src/app`: statically generated routes, metadata, robots, sitemap, 404 and OpenGraph image.
- `docs`: design direction, content provenance, image manifest and future integration contracts.

## Content and integration boundaries

The user-supplied [clinic website](https://spadentaire.ma/) provides the original logo, real clinic interiors, doctor portrait and three published before/after pairs. The local build uses 17 selected assets with preserved originals and responsive WebP derivatives. See [the visual audit](docs/dentalspa-visual-assets-audit.md) and [image manifest](docs/dentalspa-image-manifest.md). Technology graphics and the aligner image are explicitly illustrative; their presence does not establish installed equipment or an actual clinic patient. No external stock or AI imagery was needed. Future reference-based generation briefs are in `visual-generation/`.

No review, credential, price, case history or installed equipment is fabricated. Published clinical photographs preserve their full frames and receive no clinical retouching. A separate noindex case template demonstrates the future content structure without inventing a patient story.

The enquiry flow prepares a draft, preserves treatment/concern/travel context, validates contact details and allows a user-controlled text-file download. It never claims to transmit an enquiry or confirm an appointment. There is no CRM, chatbot, document upload, analytics, tracking or persistent personal-data storage. Connect a backend only in a later authorized layer.

Before public launch: confirm original branding, practice contact information, service/equipment details, clinical copy, doctor profile, patient evidence, photography permissions, hosting privacy terms and the public domain. Missing clinic-owned information is a content dependency, not something the frontend can verify on its own.
