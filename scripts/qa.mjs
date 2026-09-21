import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';

const origin = process.env.QA_ORIGIN || 'http://127.0.0.1:3000';
const routes = [
  '/',
  '/your-smile',
  '/treatments',
  ...[
    'aesthetic-dentistry',
    'restorative-dentistry',
    'orthodontics',
    'smile-design',
    'same-day-dentistry',
    'general-dentistry',
  ].map((s) => `/treatments/${s}`),
  '/results',
  '/results/case-preview',
  '/experience',
  '/technology',
  '/international-patients',
  '/doctor',
  '/contact-or-consultation',
  '/privacy',
];
await mkdir('qa/screenshots', { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const report = { routes: [], interactions: [], errors: [] };
try {
  for (const viewport of [
    { width: 1440, height: 1000 },
    { width: 390, height: 844 },
  ]) {
    const context = await browser.newContext({ viewport, reducedMotion: 'reduce' });
    const page = await context.newPage();
    page.on('pageerror', (error) => report.errors.push(error.message));
    for (const route of routes) {
      const response = await page.goto(origin + route, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      const slug = route === '/' ? 'home' : route.slice(1).replaceAll('/', '--');
      const metrics = await page.evaluate(() => ({
        width: document.documentElement.scrollWidth,
        client: document.documentElement.clientWidth,
        headings: document.querySelectorAll('h1').length,
        title: document.title,
        description: document.querySelector('meta[name="description"]')?.content,
        robots: document.querySelector('meta[name="robots"]')?.content,
        height: document.documentElement.scrollHeight,
      }));
      const audit = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .analyze();
      const violations = audit.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        nodes: v.nodes.map((n) => ({ target: n.target, summary: n.failureSummary })),
      }));
      const brokenLinks = await page
        .locator('main a[href]')
        .evaluateAll(
          (links, validRoutes) =>
            links
              .map((a) => a.getAttribute('href'))
              .filter(
                (href) =>
                  href?.startsWith('/') && !validRoutes.includes(href.split('?')[0].split('#')[0]),
              ),
          routes,
        );
      await page.screenshot({
        path: `qa/screenshots/${slug}-${viewport.width}.png`,
        fullPage: true,
      });
      await page.screenshot({
        path: `qa/screenshots/${slug}-${viewport.width}-top.png`,
        fullPage: false,
      });
      report.routes.push({
        route,
        viewport: viewport.width,
        status: response.status(),
        ...metrics,
        violations,
        brokenLinks,
      });
      console.log(
        `${viewport.width} ${route}: HTTP ${response.status()}, overflow ${metrics.width - metrics.client}px, axe ${violations.length}`,
      );
    }
    if (viewport.width === 390) {
      await page.goto(origin);
      const menu = page.getByRole('button', { name: 'Open navigation' });
      await menu.click();
      assert(await page.getByRole('dialog').isVisible());
      await page.keyboard.press('Escape');
      assert(!(await page.getByRole('dialog').isVisible()));
      assert(await menu.evaluate((el) => el === document.activeElement));
      await menu.click();
      await page.getByRole('dialog').getByRole('link', { name: 'Technology', exact: true }).click();
      await page.waitForURL('**/technology');
      assert(!(await page.getByRole('dialog').isVisible()));
      report.interactions.push('Mobile dialog: open, Escape, focus return, internal navigation');
    }
    await context.close();
  }

  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: 'reduce',
  });
  await page.goto(origin + '/your-smile');
  await page.getByLabel('I want straighter teeth', { exact: true }).check();
  assert(await page.getByRole('heading', { name: 'Explore a different alignment' }).isVisible());
  await page.getByRole('link', { name: 'Tell us about your smile', exact: true }).click();
  await page.waitForURL('**/contact-or-consultation?concern=alignment');
  assert(await page.getByLabel('I want straighter teeth', { exact: true }).isChecked());
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.getByRole('button', { name: 'Review enquiry' }).click();
  assert(await page.getByText('Please enter the name you would like us to use.').isVisible());
  assert(await page.getByText('Please enter a valid email address.').isVisible());
  await page.getByLabel('Your name', { exact: true }).fill('QA Visitor');
  await page.getByLabel('Email address', { exact: true }).fill('qa@example.com');
  await page.getByRole('checkbox').check();
  await page.getByRole('button', { name: 'Review enquiry' }).click();
  assert(await page.getByRole('heading', { name: 'Your enquiry, ready to review.' }).isVisible());
  assert(await page.getByText('Online requests are not open yet.').isVisible());
  await page.screenshot({ path: 'qa/screenshots/enquiry-review-1440.png', fullPage: true });
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Save enquiry as a file' }).click();
  const download = await downloadPromise;
  assert.equal(download.suggestedFilename(), 'dental-spa-enquiry.txt');
  assert(
    await page
      .getByRole('status')
      .getByText('Your enquiry file is ready to save. It has not been sent to the clinic.')
      .isVisible(),
  );
  await page.getByRole('button', { name: 'Edit my details' }).click();
  assert.equal(await page.getByLabel('Your name', { exact: true }).inputValue(), 'QA Visitor');
  report.interactions.push(
    'Concern context, inline form errors, valid review, honest handoff, file download, edit preserves values',
  );

  await page.goto(origin + '/contact-or-consultation?international=1&treatment=same-day-dentistry');
  assert(await page.getByText('Your interest: Same-day dentistry').isVisible());
  assert(await page.getByLabel('I’m planning to travel to Casablanca for care.').isChecked());
  await page.goto(origin + '/contact-or-consultation?concern=untrusted&treatment=untrusted');
  assert(await page.getByLabel('I would like some guidance', { exact: true }).isChecked());
  assert.equal(await page.locator('.context-pill').count(), 0);
  assert.equal(await page.evaluate(() => localStorage.length + sessionStorage.length), 0);
  report.interactions.push(
    'International and treatment context; invalid query rejection; no browser storage',
  );

  await page.goto(origin + '/treatments');
  await page.getByRole('button', { name: 'Alignment & movement Orthodontics' }).click();
  assert(await page.getByRole('heading', { name: 'Orthodontics', exact: true }).isVisible());
  await page.getByRole('link', { name: 'Explore orthodontics', exact: true }).click();
  await page.waitForURL('**/treatments/orthodontics');
  await page.locator('summary').filter({ hasText: 'Can adults discuss orthodontic care?' }).click();
  assert(
    await page
      .getByText('Adults can seek an orthodontic assessment.', { exact: false })
      .isVisible(),
  );
  report.interactions.push('Treatment selection, detail navigation and native FAQ disclosure');

  for (const width of [320, 768, 1024]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of [
      '/',
      '/treatments',
      '/contact-or-consultation',
      '/international-patients',
    ]) {
      await page.goto(origin + route);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
      );
      assert(!overflow, `Overflow at ${width}: ${route}`);
    }
  }
  const missing = await page.goto(origin + '/not-a-real-page');
  assert.equal(missing.status(), 404);
  const robots = await page.request.get(origin + '/robots.txt');
  assert((await robots.text()).includes('Disallow: /'));
  const sitemap = await page.request.get(origin + '/sitemap.xml');
  assert(!(await sitemap.text()).includes('<loc>'));
  report.interactions.push('320/768/1024px overflow checks, real 404, staging robots and sitemap');
  const failures = report.routes.filter(
    (r) =>
      r.status !== 200 ||
      r.width > r.client ||
      r.headings !== 1 ||
      !r.description ||
      r.violations.length ||
      r.brokenLinks.length,
  );
  assert.equal(failures.length, 0, JSON.stringify(failures, null, 2));
  assert.equal(report.errors.length, 0, JSON.stringify(report.errors));
} catch (error) {
  report.errors.push(error.stack);
  process.exitCode = 1;
} finally {
  await writeFile('qa/report.json', JSON.stringify(report, null, 2));
  await browser.close();
  console.log(
    `QA complete: ${report.routes.length} route/viewport audits, ${report.interactions.length} interaction groups, ${report.errors.length} errors. See qa/report.json.`,
  );
}
