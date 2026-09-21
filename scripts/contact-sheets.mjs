import sharp from 'sharp';
import { readdir, mkdir } from 'node:fs/promises';
await mkdir('qa/sheets', { recursive: true });
for (const width of [1440, 390]) {
  const files = (await readdir('qa/screenshots'))
    .filter((f) => f.endsWith(`-${width}.png`) && !f.startsWith('enquiry-'))
    .sort();
  for (let i = 0; i < files.length; i += 6) {
    const group = files.slice(i, i + 6);
    const tiles = await Promise.all(
      group.map(async (f) => {
        const buffer = await sharp(`qa/screenshots/${f}`)
          .resize({ width: width === 1440 ? 400 : 220 })
          .toBuffer();
        const { width: w, height: h } = await sharp(buffer).metadata();
        return { buffer, w, h, f };
      }),
    );
    const colWidth = width === 1440 ? 420 : 240;
    const maxHeight = Math.max(...tiles.map((t) => t.h));
    const composites = [];
    for (let n = 0; n < tiles.length; n++) {
      const tile = tiles[n];
      const left = (n % 3) * colWidth + 10;
      const top = Math.floor(n / 3) * (maxHeight + 40) + 30;
      composites.push({ input: tile.buffer, left, top });
      const label = `<svg width="${colWidth}" height="24"><text x="10" y="17" font-family="Arial" font-size="11" fill="#111">${tile.f}</text></svg>`;
      composites.push({ input: Buffer.from(label), left: (n % 3) * colWidth, top: top - 26 });
    }
    await sharp({
      create: {
        width: colWidth * 3,
        height: (maxHeight + 40) * Math.ceil(tiles.length / 3),
        channels: 3,
        background: '#d0d0d0',
      },
    })
      .composite(composites)
      .png()
      .toFile(`qa/sheets/routes-${width}-${i / 6 + 1}.png`);
  }
}
console.log('Created full-page contact sheets in qa/sheets.');
