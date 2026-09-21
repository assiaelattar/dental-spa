import Link from 'next/link';
import { navigation } from '@/lib/content';
import { TextLink } from './ui';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <Link href="/" className="footer-wordmark">
              <img
                src="/images/dentalspa/mobile/original-logo-480.webp"
                width="200"
                height="55"
                alt="Dental Spa By New Smile"
              />
            </Link>
            <p>A considered approach to your smile.</p>
            <span>
              Dr Amina El Omrani
              <br />
              Casablanca, Morocco
            </span>
          </div>
          <div className="footer-links">
            <p className="eyebrow">Explore</p>
            {navigation.slice(0, 4).map(([label, href]) => (
              <Link key={href} href={href}>
                {label}
              </Link>
            ))}
          </div>
          <div className="footer-links">
            <p className="eyebrow">Get to know us</p>
            {navigation.slice(4).map(([label, href]) => (
              <Link key={href} href={href}>
                {label}
              </Link>
            ))}
            <Link href="/contact-or-consultation">Consultation</Link>
          </div>
          <div className="footer-visit">
            <p className="eyebrow">Your visit</p>
            <p>
              Thoughtfully planned.
              <br />
              Beginning with you.
            </p>
            <TextLink href="/contact-or-consultation">Prepare your enquiry</TextLink>
            <small>
              Address and opening hours
              <br />
              will be added once confirmed.
            </small>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Dental Spa / Spa Dentaire</span>
          <span>Casablanca · Morocco</span>
          <Link href="/privacy">Your information & privacy</Link>
        </div>
      </div>
    </footer>
  );
}
