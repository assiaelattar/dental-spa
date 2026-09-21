# Dental Spa — Layer 1 design direction

## Repository audit

The workspace initially contained an empty Git repository. The subsequent user-supplied clinic website provided the visual source: 116 images reviewed, 17 selected, original logo retained. Canonical originals, source URLs and checksums are preserved. No existing functionality was removed. See the visual audit and image manifest for provenance.

## Direction and critique

Dental care through the lens of personal attention: a quiet, spacious editorial experience, with a patient-concern index as the signature interaction. The first concept used equal treatment cards; this was rejected because it made medical terminology the entrance to the experience. The implemented concept gives patient language priority and uses an asymmetric treatment feature with progressive disclosure.

Palette: porcelain #FAF9F5, soft stone #EEECE4, ink #302D30, forest #3F493E, sage #586146, gold #D7BE77 and night #181C19. The clinic's real timber, green seating, botanical details and gold script on black determine this direction. The original logo appears in the dark header and footer. `visual-direction.css` layers this revision over the original layout system.

Type: locally hosted Cormorant Garamond medium for display and italic emphasis; locally hosted DM Sans regular/medium for body and controls. Responsive headings use clamp. Base body is 16px; short supporting copy uses 14–15px, form inputs remain 16px to avoid mobile zoom. Compact captions and identity labels use smaller sizes with audited contrast. Serif is reserved for short headlines.

Layout: 1320px outer container; 760px reading width; 12-column conceptual desktop grid; 24px minimum gutters; 6–8rem desktop section spacing. At 1250px the header becomes a menu; at 700px features stack and consultation actions move into thumb reach. Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px. Corner rules: 2px media, 4px controls. No generic icon-card wallpaper.

Home wireframe:

```
original logo / navigation / consultation
full reception photograph + thesis + separate real doctor portrait
patient concern index | relevant next step
three published clinical comparisons
large clinic experience photograph + botanical inset
featured treatment | treatment index
illustrated technology / real doctor portrait / Casablanca
consultation / footer
```

Primary buttons are forest green, with a pale gold hero action; secondary buttons are outlined. Contextual links use an arrow and underline on hover. Main controls have a 44px minimum target. Forms have persistent labels, inline errors and a review step. Menus support Escape and keyboard operation. Focus is clearly outlined. Native details provide progressive disclosure. Motion uses short opacity/transform transitions; reduced-motion disables them. No scroll hijacking or animation library.

## UX flows

1. Browse by concern → related treatment → consultation with context preselected.
2. Browse treatment index → treatment detail → contextual enquiry.
3. Results → three published before/after pairs with source and clinical context → consultation. A separate noindex case-story template remains available.
4. International → preparation/process → international enquiry context.
5. Consultation → choose a topic → minimal contact details → review → user-controlled export/email draft. No success screen claims submission.

## Launch gate

Deployable frontend is distinct from a clinically approved public launch. Indexing is off until explicitly configured. Verify practice identity, original branding, equipment, clinical content, address, email, opening hours, privacy terms and case consent. Integrations and generated photography are outside Layer 1. Run `npm run build`, `npm run typecheck`, and `npm run qa`; inspect the captured desktop/mobile views. See the QA document for actual results.
