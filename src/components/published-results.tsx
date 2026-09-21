'use client';
import { useState } from 'react';
import { Arrow } from './ui';
export function PublishedResults({ compact = false }: { compact?: boolean }) {
  const [active, setActive] = useState(1);
  const id = String(active).padStart(2, '0');
  return (
    <div className={`published-results ${compact ? 'published-results--compact' : ''}`}>
      <div
        className="published-pair"
        aria-live="polite"
        aria-label={`Published smile comparison ${active}`}
      >
        {(['before', 'after'] as const).map((stage) => (
          <figure key={`${active}-${stage}`}>
            <img
              src={`/images/dentalspa/desktop/case-${id}-${stage}-960.webp`}
              srcSet={`/images/dentalspa/mobile/case-${id}-${stage}-480.webp 480w, /images/dentalspa/desktop/case-${id}-${stage}-960.webp 960w, /images/dentalspa/desktop/case-${id}-${stage}-1600.webp 1600w`}
              sizes="(max-width:700px) 90vw, 45vw"
              width="2499"
              height="1500"
              loading="lazy"
              alt={`Smile comparison ${active}, ${stage}, as published by Dental Spa`}
            />
            <figcaption>{stage === 'before' ? 'Before' : 'After'}</figcaption>
          </figure>
        ))}
      </div>
      <div className="published-result-controls">
        <span>From the Dental Spa gallery</span>
        <div
          className="case-selector"
          role="group"
          aria-label="Select a published smile comparison"
        >
          {[1, 2, 3].map((number) => (
            <button
              key={number}
              onClick={() => setActive(number)}
              aria-label={`View smile comparison ${number}`}
              aria-pressed={active === number}
            >
              0{number}
            </button>
          ))}
          <Arrow />
        </div>
      </div>
      <p className="clinical-caption">
        Original website photographs, with no clinical retouching. Individual results vary; lighting
        and framing differ between photographs.{' '}
        <a
          href="https://spadentaire.ma/galerie-des-sourires/"
          target="_blank"
          rel="noopener noreferrer"
        >
          View source gallery<span className="sr-only"> (opens a new tab)</span>
        </a>
      </p>
    </div>
  );
}
