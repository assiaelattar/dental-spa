import type { Metadata } from 'next';

function verifiedOrigin() {
  try {
    const value = process.env.NEXT_PUBLIC_SITE_URL;
    if (!value) return undefined;
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.origin : undefined;
  } catch {
    return undefined;
  }
}

export const siteOrigin = verifiedOrigin();
export const indexable = Boolean(siteOrigin) && process.env.NEXT_PUBLIC_INDEXABLE === 'true';
export const clinicEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
  process.env.NEXT_PUBLIC_CLINIC_EMAIL || '',
)
  ? process.env.NEXT_PUBLIC_CLINIC_EMAIL
  : undefined;

export function pageMetadata(
  title: string,
  description: string,
  path: string,
  noindex = false,
): Metadata {
  return {
    title,
    description,
    alternates: siteOrigin ? { canonical: new URL(path, siteOrigin).href } : undefined,
    openGraph: {
      title: `${title} | Dental Spa`,
      description,
      siteName: 'Dental Spa',
      locale: 'en_GB',
      type: 'website',
      ...(siteOrigin ? { url: new URL(path, siteOrigin).href } : {}),
    },
    twitter: { card: 'summary_large_image', title: `${title} | Dental Spa`, description },
    robots: { index: indexable && !noindex, follow: !noindex },
  };
}
