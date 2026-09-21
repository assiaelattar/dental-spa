# Content map and provenance

## Sources

- Clinic photography and original logo: https://spadentaire.ma/, including `/a-propos/`, `/technologie/`, `/galerie-des-sourires/` and `/tourisme-dentaire/` (21 September 2026). Per-image provenance and checksums are in `assets/dentalspa/manifest.json`. Published case photos do not establish treatment details, timelines or outcomes for another patient.
- User brief: Dental Spa / Spa Dentaire, Dr Amina El Omrani, Casablanca, Morocco; desired expertise topics and experience positioning. These topics are not proof of credentials or installed equipment.
- General dental descriptions: https://www.nhs.uk/live-well/healthy-teeth-and-gums/dental-treatments/ and https://www.nhs.uk/tests-and-treatments/orthodontics/ (consulted 21 September 2026). No UK service, entitlement or regulatory claims are applied to Morocco.
- General CEREC workflow: https://www.dentsplysirona.com/en-gb/discover/discover-by-topic/by-category/digital-dentistry/single-visit-dentistry-with-cerec.html (consulted 21 September 2026). This is general technology context, not verification of this clinic's equipment or patient suitability.
- Next.js metadata architecture: https://nextjs.org/docs/app/api-reference/functions/generate-metadata.

## Routes

| Route                             | Purpose                                                | Primary conversion         |
| --------------------------------- | ------------------------------------------------------ | -------------------------- |
| /                                 | Narrative, concern discovery and practice introduction | Book a consultation        |
| /your-smile                       | Accessible concern selector                            | Tell us about your smile   |
| /treatments                       | Treatment explorer and full index                      | Ask about a treatment      |
| /treatments/aesthetic-dentistry   | Aesthetic concerns and questions                       | Contextual enquiry         |
| /treatments/restorative-dentistry | Missing/damaged teeth discussion                       | Contextual enquiry         |
| /treatments/orthodontics          | Alignment discussion                                   | Contextual enquiry         |
| /treatments/smile-design          | Goals and planning                                     | Contextual enquiry         |
| /treatments/same-day-dentistry    | General CEREC workflow, availability unverified        | Contextual enquiry         |
| /treatments/general-dentistry     | Routine care and dental concerns                       | Contextual enquiry         |
| /results                          | Three published before/after pairs, source and context | Discuss your goals         |
| /results/case-preview             | Noindex reusable case template                         | Discuss a similar concern  |
| /experience                       | Preparation, consultation and decisions                | Book a consultation        |
| /technology                       | General technology benefits and verification status    | Discuss options            |
| /international-patients           | Enquiry and travel-planning sequence                   | International consultation |
| /doctor                           | Doctor name and editorial profile, credentials pending | Meet through consultation  |
| /contact-or-consultation          | Progressive enquiry preparation                        | Review enquiry             |
| /privacy                          | Accurate current frontend data behavior                | Return to consultation     |

## Unknowns

The original logo, clinic interiors, doctor portrait and three published clinical pairs are now sourced. Address, phone, email, hours, spoken languages, detailed clinical biography, credentials, installed equipment, fees, specific service availability, reviews, publication permissions and patient case histories/timelines still require verification. Source pages contain conflicting phone numbers; none was selected arbitrarily. Copy distinguishes general education from practice-specific assertions. Credentials and detailed case/testimonial content remain pending.

## SEO

Every indexable route has its own title, description, canonical (only when a verified origin is configured), and OpenGraph metadata. Sitemap contains public content pages only when indexing is enabled; case previews, privacy and consultation are excluded. Robots defaults to disallow. Breadcrumb JSON-LD is emitted only with a configured origin. Clinic medical schema, ratings, reviews and FAQ rich-result claims remain withheld until verified. Content arrays separate presentation from future CMS data.
