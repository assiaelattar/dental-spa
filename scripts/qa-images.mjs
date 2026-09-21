import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';

const origin = process.env.QA_ORIGIN || 'http://127.0.0.1:3000';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const report = [];
await mkdir('qa/screenshots', { recursive: true });
try {
  for (const width of [1440, 390]) {
    const page = await browser.newPage({
      viewport: { width, height: 1000 },
      reducedMotion: 'reduce',
    });
    for (const route of [
      '/',
      '/results',
      '/experience',
      '/doctor',
      '/technology',
      '/international-patients',
      '/treatments',
    ]) {
      await page.goto(origin + route, { waitUntil: 'networkidle' });
      for (const img of await page.locator('img').all()) {
        await img.scrollIntoViewIfNeeded();
        await img.evaluate(async (image) => {
          await image.decode();
        });
      }
      const images = await page.locator('img').evaluateAll((elements) =>
        elements.map((img) => ({
          src: img.currentSrc,
          loaded: img.complete && img.naturalWidth > 0,
          alt: img.alt,
        })),
      );
      assert(
        images.every((img) => img.loaded && img.alt),
        `Broken or unlabelled image: ${route}`,
      );
      if (route === '/') {
        const hero = await page
          .locator('.opening-background img')
          .evaluate((img) => img.currentSrc);
        assert(hero.includes(width === 390 ? '/mobile/' : '/desktop/'));
      }
      if (route === '/' || route === '/results') {
        for (const number of [2, 3, 1]) {
          const button = page.getByRole('button', { name: `View smile comparison ${number}` });
          await button.click();
          assert.equal(await button.getAttribute('aria-pressed'), 'true');
          for (const img of await page.locator('.published-pair img').all()) {
            await img.scrollIntoViewIfNeeded();
            await img.evaluate(async (image) => {
              await image.decode();
            });
            assert((await img.getAttribute('src')).includes(`case-0${number}-`));
          }
        }
      }
      if (route === '/treatments') {
        await page.getByRole('button', { name: 'Alignment & movement Orthodontics' }).click();
        const treatment = page.locator('img[src*="aligner-detail"]');
        await treatment.scrollIntoViewIfNeeded();
        await treatment.evaluate(async (image) => {
          await image.decode();
        });
      }
      await page.evaluate(() => window.scrollTo(0, 0));
      const slug = route === '/' ? 'home' : route.slice(1);
      await page.screenshot({ path: `qa/screenshots/${slug}-${width}-images.png`, fullPage: true });
      report.push({ route, width, images });
      console.log(`${width} ${route}: ${images.length} images loaded; interactive images verified`);
    }
    await page.close();
  }
} finally {
  await writeFile('qa/image-report.json', JSON.stringify(report, null, 2));
  await browser.close();
}
