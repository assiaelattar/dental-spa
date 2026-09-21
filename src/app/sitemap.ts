import type { MetadataRoute } from 'next';
import { publicRoutes } from '@/lib/content';
import { indexable, siteOrigin } from '@/lib/site';
export default function sitemap(): MetadataRoute.Sitemap {
  return indexable && siteOrigin
    ? publicRoutes.map((path) => ({ url: new URL(path, siteOrigin).href }))
    : [];
}
