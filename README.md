# Dental Spa — Website V3

**Selected identity:** Concept B · Sculpted Enamel  
**Design direction:** Clinical Precision × Spa-Level Comfort  
**Practice:** Dental Spa by Dr Amina El Omrani, Casablanca

This repository's `master` branch contains the **standalone V3 website prototype**, replacing the earlier Next.js implementation. It uses plain HTML, CSS, and JavaScript with local images and SVG illustrations.

## Run locally

Open `index.html` directly in Chrome, Firefox, or Safari, or serve it using a static server:

```sh
python3 -m http.server 8000
```

Visit http://localhost:8000/.

## Pages and behavior

Page navigation is client-side, using hash routes: `#accueil`, `#expertises`, `#technologies`, `#docteur`, and `#reservation`.

- Mobile-first responsive menu and page layouts
- Scroll-based motion and reduced-motion support
- Interactive dental planning visualization (illustrative, not a clinical scan)
- Expertise cards, practitioner profile, and patient journey
- Multi-step appointment **demonstration** with illustrative date/time choices and local validation

## Important: demonstration, not a live clinical service

- No backend, live booking availability, CRM connection, or patient-data submission is implemented.
- The visible appointment confirmation is a **UI preview**, not an actual scheduled consultation.
- Images of clinical technology and dental diagrams are illustrative; installed equipment and clinical details must be verified by the practice.
- Contact information, professional credentials, medical content, photo permissions, privacy/cookie policies, and medical advertising compliance require review before going live.
- The site includes `<meta name="robots" content="noindex,nofollow,noarchive">` and `robots.txt` set to disallow crawling while it is a design preview. Remove these only after approval and production validation.

## Deployment

Use **static hosting** with `index.html` as the entrypoint and the `assets/` directory served unchanged. A deployment previously configured for **Next.js** must be reconfigured as a static project. Pushing this repository alone does not publish a live website.

## Documentation and history

See [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) for visual design tokens and component rules.

The earlier Next.js implementation was backed up in branch `backup/pre-v3-nextjs-2026-10-11` before replacing the repository root. The earlier V3 design-review branch remains available as `design/website-v3-clinical-spa`.
