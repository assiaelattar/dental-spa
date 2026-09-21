import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import './visual-direction.css';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { indexable, siteOrigin } from '@/lib/site';

const displayFont = localFont({
  src: [
    {
      path: '../../node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-500-normal.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-500-italic.woff2',
      weight: '500',
      style: 'italic',
    },
  ],
  variable: '--font-display',
  display: 'swap',
  preload: true,
  fallback: ['Georgia'],
});
const bodyFont = localFont({
  src: [
    {
      path: '../../node_modules/@fontsource/dm-sans/files/dm-sans-latin-400-normal.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../node_modules/@fontsource/dm-sans/files/dm-sans-latin-500-normal.woff2',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-body',
  display: 'swap',
  preload: true,
  fallback: ['Arial'],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin || 'http://localhost:3000'),
  title: { default: 'Dental Spa | Dr Amina El Omrani · Casablanca', template: '%s | Dental Spa' },
  description:
    'A considered approach to your smile. Explore Dental Spa / Spa Dentaire with Dr Amina El Omrani in Casablanca, Morocco.',
  robots: { index: indexable, follow: true },
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#FAF9F6' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body>
        <Header />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
