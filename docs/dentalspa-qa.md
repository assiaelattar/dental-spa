# Layer 1 verification and handoff

Verified locally on 21 September 2026 against the production Next.js build.

## Completed

- 17 content routes, including six treatment details, the case-story preview and privacy page.
- Production build, TypeScript and formatting checks pass.
- All 17 routes audited at 1440×1000 and 390×844: 34 successful HTTP responses, one H1 and unique metadata per route, no horizontal overflow, no broken internal main-content links, no browser JavaScript exceptions and zero automated axe WCAG 2 A/AA, 2.1 A/AA and 2.2 AA violations.
- Source-led revision: 17 selected assets, original branding, real clinic and doctor photographs, responsive image variants and three published clinical pairs integrated.
- Full-page desktop and mobile screenshots captured and visually reviewed for section rhythm, wrapping, photography, navigation, footer and forms. The image audit scrolls every image into view and decodes it before capture to ensure lazy images are present.
- Additional image checks across seven photography-bearing routes at 1440px and 390px pass: images decode successfully, mobile/desktop hero sources are selected correctly, all three clinical pairs switch correctly, and the treatment image changes with selection. Results are in `qa/image-report.json`.
- Additional overflow checks at 320, 768 and 1024px on the homepage, treatment index, consultation and international pages pass.
- Mobile menu open/close, explicit forward/backward Tab wrapping, Escape, focus return and navigation work. The final focused check also verifies visible-label matching and that the enquiry draft clears after leaving and returning. Reduced-motion preferences are respected.
- Concern selection carries into the enquiry. Treatment and international context are retained; unknown query values are ignored.
- Form validation, review, honest non-submission messaging, text-file export and editing existing details pass. No personal information is written to localStorage or sessionStorage.
- Treatment selection, treatment-detail navigation and FAQ disclosure pass.
- Unknown pages return HTTP 404. Staging robots disallows crawling; sitemap is empty until a verified origin and indexing flag are set.

## Performance

Historical pre-photography Lighthouse baseline: performance 93, accessibility 100, best practices 100; FCP 0.8s, LCP 2.7s, TBT 210ms, CLS 0. This baseline does not describe the new photographic revision. Responsive WebP, priority loading for the hero, reserved image geometry and lazy loading elsewhere are implemented. Clinical photos intentionally use lossless compression to preserve evidence; they are heavier than other images.

The SEO score is 63 because staging deliberately blocks indexing. The indexing audit is the only failing scored SEO audit. Do not remove the staging protection merely to improve the score. Canonicals, sitemap URLs and indexing are enabled through the verified deployment configuration after content review.

Contrast on tinted backgrounds was corrected after the first audit. Local fonts now preload through `next/font/local`. A transparent favicon reserve avoids a missing-asset error without introducing an unapproved logo. Lighthouse's default Windows browser launcher encountered a temporary-directory cleanup lock; the supplied optional `scripts/lighthouse.mjs` uses a Playwright-owned Chrome connection instead.

## Content dependencies before public launch

The original logo and published imagery are integrated. A favicon, clinic contact details/hours, verified detailed biography, clinical review of copy, installed equipment, image reuse/consent records, detailed case histories, genuine reviews and final hosting/privacy details remain public-launch dependencies. The website prepares enquiries; it does not accept live online submissions or confirm appointments. A verified email can enable an explicit, user-controlled email draft.

The case-preview route remains a noindex format preview. Published comparisons now appear on the homepage and results page; no treatment history or testimonial is fabricated. AI generation, CRM, document uploads and automated messaging have not been implemented. Future generation specs preserve source identity and architecture; clinical evidence is excluded from AI regeneration.

## Reproduce

Run `npm ci`, `npm run build`, `npm run typecheck`, `npm run format:check`, then start locally with `npm start -- --hostname 127.0.0.1`. Run `npm run qa`, `node scripts/qa-focus.mjs` and `node scripts/qa-images.mjs` with Chrome installed. Machine results and screenshots are in `qa/` and ignored by Git. Optional Lighthouse requires the `lighthouse` package available to the script, or its module URL passed as the first argument.

Browser coverage in this pass is Chromium with emulated viewport sizes, not physical iOS/Safari/Android devices. Automated audits supplement the visual and keyboard review; they do not establish full accessibility conformance. The framework logs an internal fallback message for unknown static paths while returning the correct 404 response; this is not a browser runtime error.
