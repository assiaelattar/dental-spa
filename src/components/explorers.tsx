'use client';

import { useState } from 'react';
import Link from 'next/link';
import { concerns, consultationHref, treatments } from '@/lib/content';
import { Arrow, ButtonLink, Photo, TextLink } from './ui';

export function ConcernExplorer() {
  const [selected, setSelected] = useState<string>(concerns[0].id);
  const concern = concerns.find((item) => item.id === selected)!;
  return (
    <div className="concern-explorer">
      <fieldset className="concern-list">
        <legend className="sr-only">What brings you here?</legend>
        {concerns.map((item) => (
          <label
            key={item.id}
            className={`concern-option ${selected === item.id ? 'is-selected' : ''}`}
          >
            <input
              type="radio"
              name="smile-concern"
              value={item.id}
              checked={selected === item.id}
              onChange={() => setSelected(item.id)}
            />
            <span>{item.title}</span>
            <Arrow />
          </label>
        ))}
      </fieldset>
      <div className="concern-detail" aria-live="polite" aria-atomic="true">
        <span className="concern-mark" aria-hidden="true">
          “
        </span>
        <p className="eyebrow">Your starting point</p>
        <h3>{concern.label}</h3>
        <p>{concern.description}</p>
        <ButtonLink
          href={consultationHref({
            concern: concern.id,
            international: concern.id === 'international',
          })}
        >
          Tell us about your smile
        </ButtonLink>
        <TextLink
          href={
            concern.treatment === 'international'
              ? '/international-patients'
              : `/treatments/${concern.treatment}`
          }
        >
          Explore {concern.treatment === 'international' ? 'the patient journey' : 'relevant care'}
        </TextLink>
      </div>
    </div>
  );
}

export function TreatmentExplorer({ full = false }: { full?: boolean }) {
  const [active, setActive] = useState(treatments[0].slug);
  const selected = treatments.find((t) => t.slug === active)!;
  const options = full ? treatments : treatments.slice(0, 4);
  return (
    <div className="treatment-explorer">
      <div className="treatment-feature">
        <Photo
          id={`treatment-${selected.slug}`}
          label={selected.title}
          ratio="4/3"
          tone={selected.tone}
        />
        <div className="treatment-feature-copy" aria-live="polite">
          <p className="eyebrow">{selected.category}</p>
          <h3>{selected.title}</h3>
          <p>{selected.short}</p>
          <TextLink href={`/treatments/${selected.slug}`}>
            Explore {selected.title.toLowerCase()}
          </TextLink>
        </div>
      </div>
      <div className="treatment-index">
        <p className="eyebrow">A closer look at your care</p>
        <div className="treatment-options" role="group" aria-label="Explore treatment categories">
          {options.map((t) => (
            <button key={t.slug} aria-pressed={active === t.slug} onClick={() => setActive(t.slug)}>
              <span>
                <small>{t.category}</small>
                {t.title}
              </span>
              <Arrow diagonal />
            </button>
          ))}
        </div>
        {!full && (
          <Link className="text-link all-treatments" href="/treatments">
            <span>View all treatments</span>
            <Arrow />
          </Link>
        )}
        <p className="fine-print">
          The right approach begins with an assessment.
          <br />
          Service availability is confirmed by the clinic.
        </p>
      </div>
    </div>
  );
}
