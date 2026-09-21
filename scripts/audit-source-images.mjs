import { mkdir, readFile, writeFile } from 'node:fs/promises';
import sharp from 'sharp';
const root = 'assets/dentalspa';
await mkdir(`${root}/research`, { recursive: true });
const paths = ['/', '/a-propos/', '/technologie/', '/galerie-des-sourires/', '/tourisme-dentaire/'];
const candidates = new Map();
for (const path of paths) {
  const url = `https://spadentaire.ma${path}`;
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(25000) });
    const html = await response.text();
    await writeFile(`${root}/research/${path.replaceAll('/', '') || 'home'}.html`, html);
    const decoded = html.replaceAll('\\/', '/').replaceAll('&quot;', '"').replaceAll('&amp;', '&');
    const urls = decoded.match(/https?:[^\s"'<>\\)]+/g) || [];
    for (let image of urls) {
      if (!/\.(jpg|jpeg|png|webp)(\?|$)/i.test(image) || !image.includes('/uploads/')) continue;
      image = image.split('?')[0];
      image = image.replace(/-\d+x\d+(?=\.(jpg|jpeg|png|webp)$)/i, '');
      if (!candidates.has(image)) candidates.set(image, { url: image, pages: [] });
      candidates.get(image).pages.push(url);
    }
    console.log(path, response.status, candidates.size);
  } catch (error) {
    console.log(path, error.message);
  }
}
const unique = new Map();
for (const entry of candidates.values()) {
  const url = new URL(entry.url);
  url.hostname = 'spadentaire.ma';
  url.protocol = 'https:';
  url.pathname = url.pathname
    .replace(/-\d+x\d+(?=\.(?:jpg|jpeg|png)(?:\.webp)?$)/i, '')
    .replace(/\.(jpg|jpeg|png)\.webp$/i, '.$1');
  const key = url.href;
  if (unique.has(key)) unique.get(key).pages.push(...entry.pages);
  else unique.set(key, { ...entry, url: key });
}
const list = [...unique.values()].map((entry) => ({ ...entry, pages: [...new Set(entry.pages)] }));
await writeFile(`${root}/research/candidates.json`, JSON.stringify(list, null, 2));
console.log(list.map((x, i) => `${i}: ${x.url}`).join('\n'));
await mkdir(`${root}/research/previews`, { recursive: true });
const records = [];
let cursor = 0;
async function worker() {
  while (cursor < list.length) {
    const i = cursor++;
    const entry = list[i];
    try {
      // The source HTML contains legacy dentalspa.ma URLs. Use the same media path on the user-supplied mirror.
      const url = new URL(entry.url);
      url.hostname = 'spadentaire.ma';
      url.protocol = 'https:';
      const response = await fetch(url, { signal: AbortSignal.timeout(20000) });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const buffer = Buffer.from(await response.arrayBuffer());
      const metadata = await sharp(buffer).metadata();
      const file = `${root}/research/previews/source-${String(i).padStart(3, '0')}.jpg`;
      await sharp(buffer)
        .resize({ width: 500, height: 340, fit: 'inside', withoutEnlargement: true })
        .flatten({ background: '#eee' })
        .jpeg({ quality: 85 })
        .toFile(file);
      records.push({
        id: i,
        ...entry,
        fetchedUrl: url.href,
        width: metadata.width,
        height: metadata.height,
        format: metadata.format,
        bytes: buffer.length,
        preview: file,
      });
      await mkdir(`${root}/research/downloads`, { recursive: true });
      await writeFile(
        `${root}/research/downloads/source-${String(i).padStart(3, '0')}.${metadata.format === 'jpeg' ? 'jpg' : metadata.format}`,
        buffer,
      );
    } catch (error) {
      records.push({ id: i, ...entry, error: error.message });
    }
  }
}
await Promise.all(Array.from({ length: 5 }, () => worker()));
records.sort((a, b) => a.id - b.id);
await writeFile(`${root}/research/inventory.json`, JSON.stringify(records, null, 2));
const good = records.filter((x) => !x.error);
for (let offset = 0; offset < good.length; offset += 12) {
  const group = good.slice(offset, offset + 12),
    layers = [];
  for (let i = 0; i < group.length; i++) {
    const item = group[i];
    const thumb = await sharp(item.preview)
      .resize(280, 190, { fit: 'contain', background: '#eee' })
      .toBuffer();
    const left = (i % 3) * 300,
      top = Math.floor(i / 3) * 225;
    layers.push({ input: thumb, left: left + 10, top });
    const label = Buffer.from(
      `<svg width="300" height="30"><text x="10" y="18" font-size="13" font-family="Arial">${item.id} — ${item.width} × ${item.height}</text></svg>`,
    );
    layers.push({ input: label, left, top: top + 190 });
  }
  await sharp({
    create: {
      width: 900,
      height: Math.ceil(group.length / 3) * 225,
      channels: 3,
      background: '#fff',
    },
  })
    .composite(layers)
    .png()
    .toFile(`${root}/research/sheet-${offset / 12 + 1}.png`);
}
console.log(`Downloaded ${good.length}/${list.length} source images.`);
