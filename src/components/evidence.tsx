'use client';

import { useId, useState } from 'react';
import Image from 'next/image';

export type ApprovedCaseImages = {
  before: { src: string; alt: string };
  after: { src: string; alt: string };
};

export function BeforeAfter({ images }: { images?: ApprovedCaseImages }) {
  const [position, setPosition] = useState(50);
  const id = useId();
  if (!images)
    return (
      <div className="comparison-empty">
        <div>
          <span className="eyebrow">Before</span>
          <span>
            Approved clinical image
            <br />
            awaiting publication
          </span>
        </div>
        <div>
          <span className="eyebrow">After</span>
          <span>
            Approved clinical image
            <br />
            awaiting publication
          </span>
        </div>
        <p>No patient images or treatment outcomes are shown.</p>
      </div>
    );
  return (
    <div className="before-after">
      <div className="comparison-images">
        <Image
          src={images.after.src}
          alt={images.after.alt}
          fill
          sizes="(max-width: 700px) 100vw, 70vw"
        />
        <div className="comparison-before" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <Image
            src={images.before.src}
            alt={images.before.alt}
            fill
            sizes="(max-width: 700px) 100vw, 70vw"
          />
        </div>
        <span className="comparison-line" style={{ left: `${position}%` }} aria-hidden="true" />
        <span className="before-label">Before</span>
        <span className="after-label">After</span>
      </div>
      <label htmlFor={id}>Compare before and after</label>
      <input
        id={id}
        type="range"
        min="0"
        max="100"
        value={position}
        onChange={(e) => setPosition(Number(e.target.value))}
        aria-valuetext={`${position}% before image visible`}
      />
    </div>
  );
}

export type ApprovedTestimonial = { quote: string; attribution: string; sourceUrl?: string };
export function PatientVoices({ testimonials = [] }: { testimonials?: ApprovedTestimonial[] }) {
  return (
    <section className="patient-voices container">
      <p className="eyebrow">Patient perspectives</p>
      {testimonials.length ? (
        testimonials.map((t) => (
          <figure key={t.attribution}>
            <blockquote>{t.quote}</blockquote>
            <figcaption>
              {t.attribution}
              {t.sourceUrl && (
                <a href={t.sourceUrl} rel="noopener noreferrer" target="_blank">
                  Read the original review
                </a>
              )}
            </figcaption>
          </figure>
        ))
      ) : (
        <>
          <h2>
            Trust is personal.
            <br />
            <em>So are the stories behind it.</em>
          </h2>
          <p>
            Verified patient perspectives will be shared here, with permission.
            <br className="desktop-break" /> Until then, bring your questions to a conversation with
            the clinic.
          </p>
        </>
      )}
    </section>
  );
}
