// Optional local performance audit. Pass the installed lighthouse module URL as argv[2].
// Connecting to Playwright-owned Chrome avoids chrome-launcher's Windows temp-lock issue.
import { chromium } from '@playwright/test';
import { writeFile } from 'node:fs/promises';
const { default: lighthouse } = await import(process.argv[2] || 'lighthouse');
const browser = await chromium.launch({
  channel: 'chrome',
  args: ['--remote-debugging-port=9224'],
});
try {
  const result = await lighthouse(process.env.QA_ORIGIN || 'http://127.0.0.1:3000', {
    port: 9224,
    output: 'json',
    logLevel: 'error',
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
  });
  await writeFile('qa/lighthouse-home.json', result.report);
  console.log(
    JSON.stringify(
      {
        scores: Object.fromEntries(
          Object.entries(result.lhr.categories).map(([key, value]) => [key, value.score * 100]),
        ),
        metrics: Object.fromEntries(
          [
            'first-contentful-paint',
            'largest-contentful-paint',
            'total-blocking-time',
            'cumulative-layout-shift',
            'speed-index',
          ].map((key) => [key, result.lhr.audits[key].displayValue]),
        ),
        failed: Object.values(result.lhr.audits)
          .filter((a) => a.score !== null && a.score < 0.9)
          .map((a) => ({ id: a.id, title: a.title, value: a.displayValue })),
      },
      null,
      2,
    ),
  );
} finally {
  await browser.close();
}
