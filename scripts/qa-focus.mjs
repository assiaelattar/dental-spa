import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';

const browser = await chromium.launch({ channel: 'chrome' });
try {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  const origin = process.env.QA_ORIGIN || 'http://127.0.0.1:3000';
  await page.goto(origin);
  const audit = await new AxeBuilder({ page }).withRules(['label-content-name-mismatch']).analyze();
  assert.equal(audit.violations.length, 0);
  await page.getByRole('button', { name: 'Open navigation' }).click();
  for (const key of ['Tab', 'Shift+Tab']) {
    for (let i = 0; i < 14; i++) {
      await page.keyboard.press(key);
      assert(
        await page.evaluate(() =>
          document.querySelector('dialog').contains(document.activeElement),
        ),
      );
    }
  }
  await page.keyboard.press('Escape');
  assert(
    await page
      .getByRole('button', { name: 'Open navigation' })
      .evaluate((el) => el === document.activeElement),
  );
  await page.goto(`${origin}/contact-or-consultation`);
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.getByLabel('Your name', { exact: true }).fill('QA Visitor');
  await page.locator('footer').getByRole('link', { name: 'Your information & privacy' }).click();
  await page.goBack();
  await page.getByRole('button', { name: 'Continue', exact: true }).waitFor();
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  assert.equal(await page.getByLabel('Your name', { exact: true }).inputValue(), '');
  console.log(
    'PASS: matching visible labels, forward/backward modal focus wrapping, Escape focus return, draft cleared after leaving and returning.',
  );
} finally {
  await browser.close();
}
