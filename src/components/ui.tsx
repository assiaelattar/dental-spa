import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';
import { siteOrigin } from '@/lib/site';
import { visualAssets, visualSources } from '@/lib/visuals';

export function Arrow({
  diagonal = false,
  className = '',
}: {
  diagonal?: boolean;
  className?: string;
}) {
  return (
    <svg
      className={`arrow ${className}`}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={diagonal ? 'M6 18 18 6M6 6h12v12' : 'M4 12h15m-6-6 6 6-6 6'}
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ButtonLink({
  href,
  children,
  variant = 'primary',
  className = '',
}: {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'light';
  className?: string;
}) {
  return (
    <Link href={href} className={`button button--${variant} ${className}`}>
      {children}
      <Arrow />
    </Link>
  );
}

export function TextLink({
  href,
  children,
  className = '',
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link className={`text-link ${className}`} href={href}>
      <span>{children}</span>
      <Arrow />
    </Link>
  );
}

type PhotoProps = {
  id: string;
  label: string;
  ratio?: string;
  tone?: 'sage' | 'stone' | 'plum';
  className?: string;
  priority?: boolean;
  mobileRatio?: string;
  image?: { src: string; alt: string; sizes: string };
};
export function Photo({
  id,
  label,
  ratio = '4/5',
  tone = 'stone',
  className = '',
  priority = false,
  mobileRatio,
  image,
}: PhotoProps) {
  const asset = image ? undefined : visualAssets[id];
  return (
    <figure
      className={`photo photo--${tone} ${image || asset ? 'photo--real' : ''} ${asset?.contain ? 'photo--contain' : ''} ${className}`}
      style={
        {
          aspectRatio: ratio,
          '--photo-mobile-ratio': mobileRatio || ratio,
          '--photo-position': asset?.position || '50% 50%',
          '--photo-mobile-position': asset?.mobilePosition || asset?.position || '50% 50%',
        } as CSSProperties
      }
      data-image-slot={id}
    >
      {asset ? (
        <>
          <picture>
            <source
              media="(max-width: 700px)"
              srcSet={visualSources(asset, 'mobile')}
              sizes="100vw"
            />
            <img
              src={`/images/dentalspa/desktop/${asset.name}-${Math.min(asset.maxWidth || 1600, 1600)}.webp`}
              srcSet={visualSources(asset, 'desktop')}
              sizes={id === 'hero' ? '100vw' : '(max-width: 700px) 100vw, 60vw'}
              alt={asset.alt}
              loading={priority ? 'eager' : 'lazy'}
              fetchPriority={priority ? 'high' : 'auto'}
              decoding="async"
            />
          </picture>
          {asset.caption && <figcaption className="source-caption">{asset.caption}</figcaption>}
        </>
      ) : image ? (
        <Image src={image.src} alt={image.alt} fill sizes={image.sizes} priority={priority} />
      ) : (
        <>
          <div className="photo-aperture" aria-hidden="true">
            <div />
            <span />
          </div>
          <span className="photo-corner" aria-hidden="true">
            DS / {id === 'hero' ? 'CASABLANCA' : 'PERSPECTIVES'}
          </span>
          <figcaption>
            <span>{label}</span>
            <span>Photography to come</span>
          </figcaption>
        </>
      )}
    </figure>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <div className="section-header">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        {description && <p className="section-description">{description}</p>}
      </div>
      {children}
    </div>
  );
}

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  const all = [{ label: 'Home', href: '/' }, ...items];
  const schema = siteOrigin
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: all.map((item, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: item.label,
          ...(item.href ? { item: new URL(item.href, siteOrigin).href } : {}),
        })),
      }
    : null;
  return (
    <>
      <nav aria-label="Breadcrumb" className="breadcrumb">
        {all.map((item, i) => (
          <span key={item.label}>
            {i > 0 && (
              <span className="breadcrumb-divider" aria-hidden="true">
                /
              </span>
            )}
            {item.href ? (
              <Link href={item.href}>{item.label}</Link>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
          </span>
        ))}
      </nav>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}
        />
      )}
    </>
  );
}

export function PageIntro({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  description: string;
  children?: ReactNode;
}) {
  return (
    <header className="page-intro">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p className="intro-description">{description}</p>
      {children}
    </header>
  );
}

export function Faq({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <div className="faq">
      {items.map((item) => (
        <details key={item.question}>
          <summary>
            {item.question}
            <span aria-hidden="true">+</span>
          </summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}

export function ConsultationCTA({ international = false }: { international?: boolean }) {
  return (
    <section className="consultation-cta">
      <div className="container cta-layout">
        <div>
          <p className="eyebrow">A good place to begin</p>
          <h2>
            Let’s make room
            <br />
            for <em>your questions.</em>
          </h2>
        </div>
        <div className="cta-actions">
          <p>
            You don’t need to know the treatment.
            <br />
            Start with what matters to you.
          </p>
          <ButtonLink
            href={`/contact-or-consultation${international ? '?international=1' : ''}`}
            variant="light"
          >
            {international ? 'International patient consultation' : 'Book a consultation'}
          </ButtonLink>
          <span className="cta-note">Casablanca, Morocco · Dr Amina El Omrani</span>
        </div>
      </div>
    </section>
  );
}
