# Future enquiry and AI hooks

Layer 1 has no chatbot, CRM, booking service, analytics, tracking, document upload, WhatsApp or automated email. All enquiry values stay in React memory and clear on navigation/reload. A user may export a plain-text enquiry to their own device. If a verified clinic email is configured, the user can explicitly open a mailto draft. This does not mean the message was delivered or an appointment confirmed.

`ConsultationContext` consists of concern, treatment and international intent. URLs accept only known treatment/concern values. Context carries through CTAs using `/contact-or-consultation?concern=...&treatment=...&international=1`. Never put name, contact information or clinical free text in a URL, analytics event or log.

The enquiry flow separates topic selection, contact details and review. Future adapters can replace the final handoff with a consented, validated server submission. Required future controls: authenticated staff access, transport/storage security, explicit retention policy, rate limiting, idempotency, delivery/error feedback, jurisdiction-appropriate privacy review, and a real appointment-status model. These are implementation requirements for the later integration, not implemented claims.

Suggested adapter contract: `submitEnquiry({context, name, email, consent}) -> {id, status: 'received'}`. Booking is a separate contract requiring an actual slot and confirmation. AI can explain clinic-approved information and collect context, but must not diagnose, recommend treatment as medically indicated, invent availability or replace the dentist. Escalate clinical questions to qualified staff. Do not add medical-document upload until storage/access/retention are implemented.

Results content should require structured evidence: id, concern, treatment, approved narrative, clinically verified timeline, before/after image references, consent status and review date. Empty data must render an honest empty state; schema and reviews must never infer ratings from absent data.
