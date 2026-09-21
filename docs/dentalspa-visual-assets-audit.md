# Dental Spa visual assets audit

Source: [spadentaire.ma](https://spadentaire.ma/), explicitly supplied by the user. Audit date: 21 September 2026.

## Findings

The repository initially contained no clinic photography. Five public source pages were inspected: home, doctor biography, technology, smile gallery and international care. 200 image references reduced to 119 distinct media URLs after normalising legacy domains and WordPress size variants. 116 were retrievable; 3 failed. All successful sources were reviewed on contact sheets. 17 assets were selected for the local website.

The real visual identity is gold script on black, timber slats, green seating and botanical details. These replace the provisional aubergine palette. The reception images and the doctor biography portrait provide a recognisable clinic opening. No external stock was necessary and no AI imagery was generated.

The website contains a mixture of clinic photography, patient outcomes, stock-style portraits, treatment collages, manufacturer graphics and diagnostic screenshots. Website presence alone does not establish that a device is installed at the clinic or that an illustrative person is a patient. These distinctions are preserved in captions and the asset manifest.

## Selected assets

Each original is preserved byte-for-byte with a SHA-256 checksum in [manifest.json](../assets/dentalspa/manifest.json). The source URLs and referring pages are recorded there. Selected source photographs are the canonical web-retrieved originals; camera-original files have not been supplied.

### reception

- Source: [published image](https://spadentaire.ma/wp-content/uploads/2022/01/39-scaled.jpg)
- Canonical file: `assets/dentalspa/originals/clinic/reception.jpg`
- Subject / person / space / equipment: Reception desk, timber slats and original illuminated Dental Spa signage.
- Treatment or context: Immersive homepage hero and experience. No additional clinical history inferred.
- Resolution and orientation: 2560 × 1440; landscape.
- Quality and weaknesses: Good 2560px source; dim foreground is part of original lighting.
- Strongest use: Immersive homepage hero and experience.
- Action: Use with responsive crop.
- Fidelity: Preserve signage, desk geometry, monitor and timber arrangement.
- Status: integrated in local preview; no AI edits performed.

### dr-amina

- Source: [published image](https://spadentaire.ma/wp-content/uploads/2022/01/Capture-de%CC%81cran-2022-01-12-a%CC%80-00.42.38.png)
- Canonical file: `assets/dentalspa/originals/doctor/dr-amina.png`
- Subject / person / space / equipment: Dr Amina El Omrani, identified by the source doctor biography; black jacket, glasses, clinic background.
- Treatment or context: Hero portrait inset and doctor editorial profile. No additional clinical history inferred.
- Resolution and orientation: 1708 × 1466; landscape.
- Quality and weaknesses: 1708px screenshot; soft detail, dim exposure, small playback strip at bottom.
- Strongest use: Hero portrait inset and doctor editorial profile.
- Action: Crop playback strip; future reference-based enhancement candidate.
- Fidelity: Preserve face, age, skin, glasses, hairstyle, clothes and visible clinic architecture.
- Status: integrated in local preview; no AI edits performed.

### clinic-lounge

- Source: [published image](https://spadentaire.ma/wp-content/uploads/2020/12/8A3349-copie-copie.jpg)
- Canonical file: `assets/dentalspa/originals/clinic/clinic-lounge.jpg`
- Subject / person / space / equipment: Waiting area with green chairs, mirrors, timber and reception.
- Treatment or context: Full-width experience story. No additional clinical history inferred.
- Resolution and orientation: 2499 × 1500; landscape.
- Quality and weaknesses: Good dimensions; green cast and blown ceiling highlights.
- Strongest use: Full-width experience story.
- Action: Use source; future restrained exposure correction.
- Fidelity: Preserve room proportions, chairs, mirrors, desk, lighting and signage.
- Status: integrated in local preview; no AI edits performed.

### botanical-wall

- Source: [published image](https://spadentaire.ma/wp-content/uploads/2022/01/5-scaled.jpg)
- Canonical file: `assets/dentalspa/originals/clinic/botanical-wall.jpg`
- Subject / person / space / equipment: Timber passage with raised white leaf forms and green plant inserts.
- Treatment or context: Architectural documentary detail. No additional clinical history inferred.
- Resolution and orientation: 2560 × 1440; landscape.
- Quality and weaknesses: Good 2560px landscape.
- Strongest use: Architectural documentary detail.
- Action: Use/crop.
- Fidelity: Preserve door, leaf shapes, plants, timber spacing and floor.
- Status: integrated in local preview; no AI edits performed.

### clinic-corridor

- Source: [published image](https://spadentaire.ma/wp-content/uploads/2021/06/3.jpg)
- Canonical file: `assets/dentalspa/originals/clinic/clinic-corridor.jpg`
- Subject / person / space / equipment: Clinic corridor, sink and forest wall image.
- Treatment or context: General care and restorative detail context. No additional clinical history inferred.
- Resolution and orientation: 2499 × 1500; landscape.
- Quality and weaknesses: Good dimensions; perspective and uneven light.
- Strongest use: General care and restorative detail context.
- Action: Use source with contextual caption.
- Fidelity: Preserve architecture, cabinetry, sink, doors and wall art.
- Status: integrated in local preview; no AI edits performed.

### cerec-workflow

- Source: [published image](https://spadentaire.ma/wp-content/uploads/2022/01/cerec.png)
- Canonical file: `assets/dentalspa/originals/technology/cerec-workflow.png`
- Subject / person / space / equipment: CEREC digital restoration workstation pictured on the technology page.
- Treatment or context: Technology and same-day dentistry. No additional clinical history inferred.
- Resolution and orientation: 2088 × 1304; landscape.
- Quality and weaknesses: 2088px website graphic; soft and high-key.
- Strongest use: Technology and same-day dentistry.
- Action: Use as clearly labelled technology illustration.
- Fidelity: Preserve device geometry, components, screen and brand; do not claim this is clinic equipment.
- Status: integrated in local preview; no AI edits performed.

### digital-imaging

- Source: [published image](https://spadentaire.ma/wp-content/uploads/2021/06/radio-3d.jpeg)
- Canonical file: `assets/dentalspa/originals/technology/digital-imaging.jpg`
- Subject / person / space / equipment: Scanner and diagnostic screen illustration from the technology page.
- Treatment or context: Secondary technology content. No additional clinical history inferred.
- Resolution and orientation: 2500 × 1500; landscape.
- Quality and weaknesses: Clean graphic on white, 2500px.
- Strongest use: Secondary technology content.
- Action: Use as illustration with contain fit.
- Fidelity: Preserve device and displayed data; do not infer patient or installed device.
- Status: integrated in local preview; no AI edits performed.

### aligner-detail

- Source: [published image](https://spadentaire.ma/wp-content/uploads/2021/06/Gouttier-3.jpeg)
- Canonical file: `assets/dentalspa/originals/treatments/aligner-detail.jpg`
- Subject / person / space / equipment: Clear aligner demonstration published on the clinic homepage.
- Treatment or context: Orthodontic treatment discovery. No additional clinical history inferred.
- Resolution and orientation: 2499 × 1500; landscape.
- Quality and weaknesses: Clean close-up; original authorship/patient identity unverified.
- Strongest use: Orthodontic treatment discovery.
- Action: Use as representative treatment image with caption.
- Fidelity: Do not identify the person as a Dental Spa patient or modify teeth.
- Status: integrated in local preview; no AI edits performed.

### smile-planning

- Source: [published image](https://spadentaire.ma/wp-content/uploads/2020/12/smile-dsign-copie-1.jpg)
- Canonical file: `assets/dentalspa/originals/treatments/smile-planning.jpg`
- Subject / person / space / equipment: Smile-design diagram with existing measurement overlays.
- Treatment or context: Smile-design educational context. No additional clinical history inferred.
- Resolution and orientation: 1572 × 846; landscape.
- Quality and weaknesses: 1572px educational graphic.
- Strongest use: Smile-design educational context.
- Action: Use intact, contain fit; no new clinical interpretation.
- Fidelity: Preserve all teeth, gum anatomy, measurement marks and overlays.
- Status: integrated in local preview; no AI edits performed.

### casablanca

- Source: [published image](https://spadentaire.ma/wp-content/uploads/2021/01/casablanca.jpg)
- Canonical file: `assets/dentalspa/originals/miscellaneous/casablanca.jpg`
- Subject / person / space / equipment: Casablanca city image published on international-patient page.
- Treatment or context: International patient journey. No additional clinical history inferred.
- Resolution and orientation: 1920 × 1080; landscape.
- Quality and weaknesses: 1920px source, inspect travel photo.
- Strongest use: International patient journey.
- Action: Use/crop as city context.
- Fidelity: Preserve visible city landmarks; not a clinic interior.
- Status: integrated in local preview; no AI edits performed.

### original-logo

- Source: [published image](https://spadentaire.ma/wp-content/uploads/2021/01/cropped-Capture-de%CC%81cran-2021-01-09-a%CC%80-17.33.57.png)
- Canonical file: `assets/dentalspa/originals/miscellaneous/original-logo.png`
- Subject / person / space / equipment: Original Dental Spa By New Smile gold/white script on black.
- Treatment or context: Header and footer brand. No additional clinical history inferred.
- Resolution and orientation: 606 × 166; landscape.
- Quality and weaknesses: 606×166 raster; usable at small display size.
- Strongest use: Header and footer brand.
- Action: Use as-is, request original vector later.
- Fidelity: No redraw, recolouring, rearrangement or generated text.
- Status: integrated in local preview; original branding retained.

### case-01-before

- Source: [published image](https://spadentaire.ma/wp-content/uploads/2021/06/maya-05.jpeg)
- Canonical file: `assets/dentalspa/originals/results/case-01-before.jpg`
- Subject / person / space / equipment: Published clinical gallery image 01-before.
- Treatment or context: Before/after gallery. No additional clinical history inferred.
- Resolution and orientation: 2499 × 1500; landscape.
- Quality and weaknesses: 2499×1500 website export; framing/lighting differ between captures.
- Strongest use: Before/after gallery.
- Action: Use full frame; lossless web encoding only; no AI regeneration.
- Fidelity: Every tooth, gum, shade, shape and clinical detail immutable; preserve originals.
- Status: integrated in local preview; AI regeneration prohibited.

### case-01-after

- Source: [published image](https://spadentaire.ma/wp-content/uploads/2021/06/maya-face-apres.jpeg)
- Canonical file: `assets/dentalspa/originals/results/case-01-after.jpg`
- Subject / person / space / equipment: Published clinical gallery image 01-after.
- Treatment or context: Before/after gallery. No additional clinical history inferred.
- Resolution and orientation: 2499 × 1500; landscape.
- Quality and weaknesses: 2499×1500 website export; framing/lighting differ between captures.
- Strongest use: Before/after gallery.
- Action: Use full frame; lossless web encoding only; no AI regeneration.
- Fidelity: Every tooth, gum, shade, shape and clinical detail immutable; preserve originals.
- Status: integrated in local preview; AI regeneration prohibited.

### case-02-before

- Source: [published image](https://spadentaire.ma/wp-content/uploads/2021/06/jalila-face-av.jpeg)
- Canonical file: `assets/dentalspa/originals/results/case-02-before.jpg`
- Subject / person / space / equipment: Published clinical gallery image 02-before.
- Treatment or context: Before/after gallery. No additional clinical history inferred.
- Resolution and orientation: 2499 × 1500; landscape.
- Quality and weaknesses: 2499×1500 website export; framing/lighting differ between captures.
- Strongest use: Before/after gallery.
- Action: Use full frame; lossless web encoding only; no AI regeneration.
- Fidelity: Every tooth, gum, shade, shape and clinical detail immutable; preserve originals.
- Status: integrated in local preview; AI regeneration prohibited.

### case-02-after

- Source: [published image](https://spadentaire.ma/wp-content/uploads/2021/06/jalila-face-ap.jpeg)
- Canonical file: `assets/dentalspa/originals/results/case-02-after.jpg`
- Subject / person / space / equipment: Published clinical gallery image 02-after.
- Treatment or context: Before/after gallery. No additional clinical history inferred.
- Resolution and orientation: 2499 × 1500; landscape.
- Quality and weaknesses: 2499×1500 website export; framing/lighting differ between captures.
- Strongest use: Before/after gallery.
- Action: Use full frame; lossless web encoding only; no AI regeneration.
- Fidelity: Every tooth, gum, shade, shape and clinical detail immutable; preserve originals.
- Status: integrated in local preview; AI regeneration prohibited.

### case-03-before

- Source: [published image](https://spadentaire.ma/wp-content/uploads/2021/06/zack-av.jpeg)
- Canonical file: `assets/dentalspa/originals/results/case-03-before.jpg`
- Subject / person / space / equipment: Published clinical gallery image 03-before.
- Treatment or context: Before/after gallery. No additional clinical history inferred.
- Resolution and orientation: 2499 × 1500; landscape.
- Quality and weaknesses: 2499×1500 website export; framing/lighting differ between captures.
- Strongest use: Before/after gallery.
- Action: Use full frame; lossless web encoding only; no AI regeneration.
- Fidelity: Every tooth, gum, shade, shape and clinical detail immutable; preserve originals.
- Status: integrated in local preview; AI regeneration prohibited.

### case-03-after

- Source: [published image](https://spadentaire.ma/wp-content/uploads/2021/06/zack-ap.jpeg)
- Canonical file: `assets/dentalspa/originals/results/case-03-after.jpg`
- Subject / person / space / equipment: Published clinical gallery image 03-after.
- Treatment or context: Before/after gallery. No additional clinical history inferred.
- Resolution and orientation: 2499 × 1500; landscape.
- Quality and weaknesses: 2499×1500 website export; framing/lighting differ between captures.
- Strongest use: Before/after gallery.
- Action: Use full frame; lossless web encoding only; no AI regeneration.
- Fidelity: Every tooth, gum, shade, shape and clinical detail immutable; preserve originals.
- Status: integrated in local preview; AI regeneration prohibited.

## Excluded material

Clinical collages with promotional text, device render montages, generic implant renders, low-resolution screenshots and stock-style portraits were not promoted as authentic clinic documentation. Most published clinical pairs remain in the research inventory; the current gallery uses only three pairs to establish the system. No names are exposed in the public case labels. Detailed treatment stories remain a separate content-verification step.

The original site includes several conflicting phone numbers; this visual pass does not select one arbitrarily or change the contact workflow. Patient reuse/consent records, original photo licensing and device availability should be checked for a public release. This is a publication dependency, not a claim that the retrieved site provides those records.

## Failed downloads

- https://spadentaire.ma/wp-content/uploads/2021/02/boukyouti-ap-face-copie.jpg: fetch failed
- https://spadentaire.ma/wp-content/uploads/2021/02/sofia-av-copie-1.jpg: fetch failed
- https://spadentaire.ma/wp-content/uploads/2020/12/4.png: fetch failed

## Technical treatment

Web derivatives use responsive WebP widths of 480/768 mobile and 960/1600/1920 desktop, without upscaling. Portrait only: remove the 14px bottom playback strip. Clinical imagery: complete frame, proportional resize and lossless WebP, no colour correction or anatomical edits. Original clinic/portrait photographs have no colour manipulation. Responsive focal points differ by viewport; source identity and architecture are unchanged.

The image pipeline writes served derivatives to `public/images/dentalspa/{desktop,mobile}`. `assets/dentalspa/web` records this mapping. Heavy research downloads and contact sheets are local audit material ignored by Git; the selected canonical sources and manifest are retained.
