# Dental Spa / Brand-Website System V3
**Theme:** Clinical Precision × Spa-Level Comfort  
**Owner:** Dental Spa — Dr Amina El Omrani · Casablanca  
**Brand selected:** Concept B / The Sculpted Enamel  
**Status:** Design & interaction prototype, not a deployed clinical system

## 1. Positioning

A clinic led by a trained dental professional—not a lifestyle brand masquerading as healthcare. Clinical competence is established first through the practitioner's documented qualifications, exam-based decision making and coherent digital treatment-planning workflow. Spa-like comfort appears in the interaction language, calm visual environment, clear patient explanations and thoughtful appointments.

**Primary brand line:** La précision du soin. La sérénité en plus.

## 2. Art direction

- Rich mineral green for clinical confidence, sober technology panels, footer and primary buttons.
- Warm ivory and structured white for a welcoming, clean, naturally lit clinical environment.
- Champagne gold only as a premium structural accent, not as an ornamental border everywhere.
- Diagnostic illustrations are technical/pedagogical, not diagnosis or patient data.
- Photography: original photos of Dr Amina wherever she appears. No fictional doctors, patients, quotes or results.
- Smile/enamel signal: stylized tooth and a flowing enamel contour. Avoid children's tooth mascot, flower-spa clip art or generic medical cross as the core brand.

## 3. Color tokens

| Token | Value | Application |
|---|---|---|
| Ink / primary forest | `#17352F` | Main text, interactive controls |
| Ink / deep | `#0F2C26` | Footer, dark clinical UI |
| Deep green | `#12372F` | Science modules, experience band |
| Warm ivory | `#F8F6F0` | Main page background |
| Off white | `#FFFEFA` | Cards and forms |
| Light paper | `#F0EEE6` | Quiet surface contrast |
| Champagne gold | `#B49366` | Technical accents, indicators |
| Sage | `#82988D` | Soft support surfaces / inflections |
| Muted text | `#68766D` | Explanatory supporting text |
| Divider | `#DEDED4` | Separators and card borders |

## 4. Typography

**Editorial:** EB Garamond for major brand headlines and clinical story typography. Large but controlled, never used for dense form labels.  
**Interface:** Inter for body copy, metadata, forms, buttons, medical labels and navigation.  
Do not introduce decorative cursive signature styles across every section.

## 5. Layout system

- Content max width 1520 CSS px with fluid side margins.
- Desktop hero uses 46/54 split; second side further subdivided into real doctor photo + technological visualization.
- Expertise cards are a three-column grid, with responsive two-column/tablet and one-column/mobile transformations.
- UI density comes from functionally meaningful information blocks: an acknowledged medical process, equipment visual and clinical consultation choices—not filler copy.
- Mobile booking must remain one decision per step, with large tap areas and a clear next action.

## 6. Motion system

| Motion | UX purpose | Implementation |
|---|---|---|
| Page entrance | Context change | 450 ms ease-out |
| Hero stagger | Guide visual hierarchy | 650–850 ms, 100 ms offsets |
| Scroll reveal | Introduce sections as read | IntersectionObserver, 800 ms |
| Enamel scan line | Express precise scan workflow | 6.2 seconds loop; illustrative |
| Teeth model float | Add controlled depth | 8 seconds ease-in-out |
| Technology mode switch | Show stages of planning | Tabs with 700 ms model transform |
| Treatment card hover | Indicate exploration | Raise 7 px + minimal illustration scale |
| Patient journey stepper | Reveal care narrative | Step selection + animated active surface |
| Booking progress | Keep task orientation | 400 ms progress width transition |

Reduced-motion users get static, instant content through `prefers-reduced-motion`.

## 7. Pages in the prototype

1. **Accueil:** clinical hero, credentials, services, interactive digital pathway, patient comfort, founder story, journey, conversion.
2. **Expertises:** orthodontics, aesthetic dentistry, rehabilitation, prevention.
3. **Technologies:** explained scan / imaging / planning process with illustrative scan.
4. **Dr Amina:** portrait and reported qualifications (verify exact diplomas with clinic before public publication).
5. **Réservation:** responsive three-step demo flow, client-side validation, illustrative slots and explicit no-submission notice.

## 8. Production checklist

- Approve a final vector master for Concept B (SVG/AI/EPS), plus small optical lockups and monochrome variants.
- Organize a photo session with Dr Amina; replace low-resolution supplied images without changing her identity or creating misleading scenes.
- Verify practitioner qualifications and actual offered procedures with Dr Amina.
- Obtain informed patient consent and medically accurate approval before showing any case studies or testimonials.
- Connect reservations to Dental OS live slots; disable unsafe double bookings and support opening hours, rescheduling, reminders and admin governance.
- Perform privacy/security review of any intake forms and photo upload; never send patient images to generative services without appropriate consent/legal basis.
- Complete WCAG-oriented keyboard review, proper analytics consent, on-page SEO, content proofreading and performance optimization.
- The calendar and visual models here are **demonstrations**, not medical or booking services.