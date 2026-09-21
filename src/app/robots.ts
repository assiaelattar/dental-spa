import type { MetadataRoute } from 'next';
import { indexable, siteOrigin } from '@/lib/site';
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      ...(indexable
        ? { allow: '/', disallow: ['/results/case-preview', '/contact-or-consultation'] }
        : { disallow: '/' }),
    },
    ...(indexable && siteOrigin ? { sitemap: `${siteOrigin}/sitemap.xml` } : {}),
  };
}
