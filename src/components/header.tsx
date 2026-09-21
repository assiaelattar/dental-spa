'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { navigation } from '@/lib/content';
import { Arrow } from './ui';

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  useEffect(() => {
    if (open) {
      dialog.current?.showModal();
      document.body.style.overflow = 'hidden';
    } else {
      dialog.current?.close();
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);
  function close() {
    setOpen(false);
    toggle.current?.focus();
  }
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header className="site-header">
        <div className="header-inner">
          <Link href="/" className="wordmark">
            <img
              src="/images/dentalspa/mobile/original-logo-480.webp"
              width="180"
              height="49"
              alt="Dental Spa By New Smile — home"
            />
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            {navigation.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                aria-current={
                  pathname === href || pathname.startsWith(`${href}/`) ? 'page' : undefined
                }
              >
                {label}
              </Link>
            ))}
          </nav>
          <Link href="/contact-or-consultation" className="header-book">
            Book a consultation
            <Arrow diagonal />
          </Link>
          <button
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label="Open navigation"
            ref={toggle}
            onClick={() => setOpen(true)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>
      <dialog
        ref={dialog}
        id="mobile-navigation"
        className="mobile-dialog"
        aria-label="Main navigation"
        onCancel={close}
        onKeyDown={(event) => {
          if (event.key !== 'Tab') return;
          const controls = event.currentTarget.querySelectorAll<
            HTMLAnchorElement | HTMLButtonElement
          >('a[href], button:not([disabled])');
          const first = controls[0];
          const last = controls[controls.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }}
        onClick={(e) => {
          if (e.target === dialog.current) close();
        }}
      >
        <div className="mobile-panel">
          <div className="mobile-top">
            <span className="mobile-brand">Dental Spa</span>
            <button onClick={close} className="close-button" aria-label="Close navigation">
              ×
            </button>
          </div>
          <nav>
            {navigation.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={close}
                aria-current={pathname === href ? 'page' : undefined}
              >
                {label}
                <Arrow />
              </Link>
            ))}
          </nav>
          <Link className="button button--primary" onClick={close} href="/contact-or-consultation">
            Book a consultation
            <Arrow />
          </Link>
          <p className="eyebrow">Casablanca, Morocco</p>
        </div>
      </dialog>
      {pathname !== '/contact-or-consultation' && (
        <div className="mobile-booking">
          <span>Start with a conversation</span>
          <Link href="/contact-or-consultation">
            Book a consultation
            <Arrow />
          </Link>
        </div>
      )}
    </>
  );
}
