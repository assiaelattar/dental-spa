import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import sharp from 'sharp';
const root = 'assets/dentalspa';
const inventory = JSON.parse(await readFile(`${root}/research/inventory.json`, 'utf8'));
const selections = [
  {
    id: 40,
    name: 'reception',
    category: 'clinic',
    subject: 'Reception desk, timber slats and original illuminated Dental Spa signage',
    use: 'Immersive homepage hero and experience',
    quality: 'Good 2560px source; dim foreground is part of original lighting',
    action: 'Use with responsive crop',
    fidelity: 'Preserve signage, desk geometry, monitor and timber arrangement',
    mobilePosition: '65% 50%',
    position: '55% 50%',
  },
  {
    id: 41,
    name: 'dr-amina',
    category: 'doctor',
    subject:
      'Dr Amina El Omrani, identified by the source doctor biography; black jacket, glasses, clinic background',
    use: 'Hero portrait inset and doctor editorial profile',
    quality: '1708px screenshot; soft detail, dim exposure, small playback strip at bottom',
    action: 'Crop playback strip; future reference-based enhancement candidate',
    fidelity:
      'Preserve face, age, skin, glasses, hairstyle, clothes and visible clinic architecture',
    position: '50% 40%',
    mobilePosition: '50% 38%',
  },
  {
    id: 38,
    name: 'clinic-lounge',
    category: 'clinic',
    subject: 'Waiting area with green chairs, mirrors, timber and reception',
    use: 'Full-width experience story',
    quality: 'Good dimensions; green cast and blown ceiling highlights',
    action: 'Use source; future restrained exposure correction',
    fidelity: 'Preserve room proportions, chairs, mirrors, desk, lighting and signage',
    position: '50% 50%',
    mobilePosition: '45% 50%',
  },
  {
    id: 39,
    name: 'botanical-wall',
    category: 'clinic',
    subject: 'Timber passage with raised white leaf forms and green plant inserts',
    use: 'Architectural documentary detail',
    quality: 'Good 2560px landscape',
    action: 'Use/crop',
    fidelity: 'Preserve door, leaf shapes, plants, timber spacing and floor',
    position: '65% 50%',
    mobilePosition: '70% 50%',
  },
  {
    id: 4,
    name: 'clinic-corridor',
    category: 'clinic',
    subject: 'Clinic corridor, sink and forest wall image',
    use: 'General care and restorative detail context',
    quality: 'Good dimensions; perspective and uneven light',
    action: 'Use source with contextual caption',
    fidelity: 'Preserve architecture, cabinetry, sink, doors and wall art',
    position: '55% 50%',
    mobilePosition: '65% 50%',
  },
  {
    id: 43,
    name: 'cerec-workflow',
    category: 'technology',
    subject: 'CEREC digital restoration workstation pictured on the technology page',
    use: 'Technology and same-day dentistry',
    quality: '2088px website graphic; soft and high-key',
    action: 'Use as clearly labelled technology illustration',
    fidelity:
      'Preserve device geometry, components, screen and brand; do not claim this is clinic equipment',
    position: '45% 50%',
    mobilePosition: '35% 50%',
  },
  {
    id: 47,
    name: 'digital-imaging',
    category: 'technology',
    subject: 'Scanner and diagnostic screen illustration from the technology page',
    use: 'Secondary technology content',
    quality: 'Clean graphic on white, 2500px',
    action: 'Use as illustration with contain fit',
    fidelity: 'Preserve device and displayed data; do not infer patient or installed device',
    position: '50% 50%',
    mobilePosition: '50% 50%',
  },
  {
    id: 22,
    name: 'aligner-detail',
    category: 'treatments',
    subject: 'Clear aligner demonstration published on the clinic homepage',
    use: 'Orthodontic treatment discovery',
    quality: 'Clean close-up; original authorship/patient identity unverified',
    action: 'Use as representative treatment image with caption',
    fidelity: 'Do not identify the person as a Dental Spa patient or modify teeth',
    position: '50% 50%',
    mobilePosition: '50% 50%',
  },
  {
    id: 30,
    name: 'smile-planning',
    category: 'treatments',
    subject: 'Smile-design diagram with existing measurement overlays',
    use: 'Smile-design educational context',
    quality: '1572px educational graphic',
    action: 'Use intact, contain fit; no new clinical interpretation',
    fidelity: 'Preserve all teeth, gum anatomy, measurement marks and overlays',
    position: '50% 50%',
    mobilePosition: '50% 50%',
  },
  {
    id: 117,
    name: 'casablanca',
    category: 'miscellaneous',
    subject: 'Casablanca city image published on international-patient page',
    use: 'International patient journey',
    quality: '1920px source, inspect travel photo',
    action: 'Use/crop as city context',
    fidelity: 'Preserve visible city landmarks; not a clinic interior',
    position: '50% 50%',
    mobilePosition: '60% 50%',
  },
  {
    id: 1,
    name: 'original-logo',
    category: 'miscellaneous',
    subject: 'Original Dental Spa By New Smile gold/white script on black',
    use: 'Header and footer brand',
    quality: '606×166 raster; usable at small display size',
    action: 'Use as-is, request original vector later',
    fidelity: 'No redraw, recolouring, rearrangement or generated text',
    position: '50% 50%',
    mobilePosition: '50% 50%',
  },
  ...[
    [0, '01-before'],
    [8, '01-after'],
    [9, '02-before'],
    [10, '02-after'],
    [11, '03-before'],
    [12, '03-after'],
  ].map(([id, name]) => ({
    id,
    name: `case-${name}`,
    category: 'results',
    subject: `Published clinical gallery image ${name}`,
    use: 'Before/after gallery',
    quality: '2499×1500 website export; framing/lighting differ between captures',
    action: 'Use full frame; lossless web encoding only; no AI regeneration',
    fidelity: 'Every tooth, gum, shade, shape and clinical detail immutable; preserve originals',
    position: '50% 50%',
    mobilePosition: '50% 50%',
  })),
];
const assets = [];
for (const item of selections) {
  const original = inventory.find((x) => x.id === item.id);
  if (!original || original.error) throw Error(`Missing ${item.id}`);
  const extension = original.format === 'jpeg' ? 'jpg' : original.format;
  const download = `${root}/research/downloads/source-${String(item.id).padStart(3, '0')}.${extension}`;
  const destination = `${root}/originals/${item.category}/${item.name}.${extension}`;
  await mkdir(`${root}/originals/${item.category}`, { recursive: true });
  await copyFile(download, destination);
  const derivatives = [];
  for (const variant of ['desktop', 'mobile']) {
    const widths = variant === 'desktop' ? [960, 1600, 1920] : [480, 768];
    await mkdir(`public/images/dentalspa/${variant}`, { recursive: true });
    for (const width of widths.filter((w) => w <= original.width || w === 480)) {
      const path = `/images/dentalspa/${variant}/${item.name}-${width}.webp`;
      let pipeline = sharp(download);
      if (item.name === 'dr-amina')
        pipeline = pipeline.extract({
          left: 0,
          top: 0,
          width: original.width,
          height: original.height - 14,
        });
      pipeline = pipeline.resize({ width, withoutEnlargement: true });
      await pipeline
        .webp(item.category === 'results' ? { lossless: true } : { quality: 86, effort: 5 })
        .toFile(`public${path}`);
      const metadata = await sharp(`public${path}`).metadata();
      derivatives.push({ variant, path, width: metadata.width, height: metadata.height });
    }
  }
  assets.push({
    ...item,
    sourceUrl: original.fetchedUrl,
    sourcePages: original.pages,
    original: destination,
    sha256: createHash('sha256')
      .update(await readFile(download))
      .digest('hex'),
    width: original.width,
    height: original.height,
    orientation: original.width > original.height ? 'landscape' : 'portrait',
    sourceType:
      item.category === 'results'
        ? 'published-clinical-evidence'
        : item.category === 'technology' || item.category === 'treatments'
          ? 'website-illustrative-media'
          : 'official-website-photography',
    generationAllowed: item.category !== 'results' && item.name !== 'original-logo',
    status: 'integrated-in-local-preview',
    derivatives,
  });
}
for (const folder of ['enhanced', 'generated-from-reference', 'web/desktop', 'web/mobile'])
  await mkdir(`${root}/${folder}`, { recursive: true });
await writeFile(
  `${root}/manifest.json`,
  JSON.stringify(
    {
      source: 'https://spadentaire.ma/',
      retrieved: new Date().toISOString(),
      policy:
        'Original bytes preserved; no AI-generated images in this revision. Technology/educational illustrations are not evidence of clinic-owned equipment. Clinical pairs retain complete frames with no retouching.',
      assets,
    },
    null,
    2,
  ),
);
console.log(
  `Prepared ${assets.length} assets and ${assets.reduce((n, a) => n + a.derivatives.length, 0)} responsive derivatives.`,
);
