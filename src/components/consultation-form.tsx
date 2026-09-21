'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { concerns, treatments } from '@/lib/content';
import { clinicEmail } from '@/lib/site';
import { Arrow } from './ui';

export function ConsultationForm() {
  const params = useSearchParams();
  const validConcern = concerns.find((c) => c.id === params.get('concern'))?.id || '';
  const validTreatment = treatments.find((t) => t.slug === params.get('treatment'));
  const [step, setStep] = useState(0);
  const [concern, setConcern] = useState<string>(
    validConcern === 'international' ? '' : validConcern,
  );
  const [international, setInternational] = useState(
    params.get('international') === '1' || validConcern === 'international',
  );
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState('');
  const heading = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    heading.current?.focus();
  }, [step]);
  const selectedConcern = concerns.find((c) => c.id === concern);
  const summary = [
    'Dental Spa — Consultation enquiry',
    '',
    `Name: ${name.trim()}`,
    `Email: ${email.trim()}`,
    `Concern: ${selectedConcern?.title || 'I would like some guidance'}`,
    ...(validTreatment ? [`Treatment interest: ${validTreatment.title}`] : []),
    `Travelling to Casablanca: ${international ? 'Yes' : 'No'}`,
    '',
    'I would like to discuss a consultation. Please confirm availability and the next steps.',
    'This enquiry does not confirm an appointment.',
  ].join('\n');

  function next(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (step === 1) {
      if (!name.trim()) nextErrors.name = 'Please enter the name you would like us to use.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
        nextErrors.email = 'Please enter a valid email address.';
      if (!consent)
        nextErrors.consent = 'Please confirm you have read how your information is handled.';
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      document.getElementById(Object.keys(nextErrors)[0])?.focus();
      return;
    }
    setStep(step + 1);
  }

  function download() {
    const blob = new Blob([summary], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'dental-spa-enquiry.txt';
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setStatus('Your enquiry file is ready to save. It has not been sent to the clinic.');
  }

  return (
    <div className="enquiry-form">
      <ol className="form-progress" aria-label="Enquiry progress">
        {['Your interest', 'Your details', 'Review'].map((label, i) => (
          <li
            key={label}
            aria-current={step === i ? 'step' : undefined}
            className={step >= i ? 'is-reached' : ''}
          >
            <span>{i + 1}</span>
            {label}
          </li>
        ))}
      </ol>
      {!clinicEmail && step === 0 && (
        <p className="draft-notice">
          Online requests are not open yet. You can prepare and save an enquiry here; nothing is
          sent to the clinic.
        </p>
      )}
      <form onSubmit={next} noValidate>
        <h2 ref={heading} tabIndex={-1}>
          {step === 0
            ? 'What brings you here?'
            : step === 1
              ? 'How can we address you?'
              : 'Your enquiry, ready to review.'}
        </h2>
        {step === 0 && (
          <>
            <p className="form-intro">Choose a starting point. It’s okay if you’re not sure yet.</p>
            {validTreatment && (
              <div className="context-pill">Your interest: {validTreatment.title}</div>
            )}
            <fieldset className="form-options">
              <legend className="sr-only">Your dental interest</legend>
              {[
                ...concerns
                  .filter((c) => c.id !== 'international')
                  .map((c) => ({ id: c.id, title: c.title })),
                { id: '', title: 'I would like some guidance' },
              ].map((c) => (
                <label key={c.id} className={concern === c.id ? 'selected' : ''}>
                  <input
                    type="radio"
                    name="interest"
                    value={c.id}
                    checked={concern === c.id}
                    onChange={() => setConcern(c.id)}
                  />
                  <span>{c.title}</span>
                </label>
              ))}
            </fieldset>
            <label className="check-field">
              <input
                type="checkbox"
                checked={international}
                onChange={(e) => setInternational(e.target.checked)}
              />
              <span>I’m planning to travel to Casablanca for care.</span>
            </label>
            <button className="button button--primary" type="submit">
              Continue
              <Arrow />
            </button>
          </>
        )}
        {step === 1 && (
          <>
            <p className="form-intro">
              Only the essentials for your enquiry. Please keep clinical details for a direct
              conversation.
            </p>
            <div className="form-field">
              <label htmlFor="name">Your name</label>
              <input
                id="name"
                name="name"
                autoComplete="name"
                maxLength={100}
                value={name}
                onChange={(e) => setName(e.target.value)}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'name-error' : undefined}
                required
              />
              {errors.name && (
                <p className="field-error" id="name-error">
                  {errors.name}
                </p>
              )}
            </div>
            <div className="form-field">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                maxLength={254}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'email-error' : 'email-hint'}
                required
              />
              <small id="email-hint">
                Included in your enquiry so the clinic can reply when you share it.
              </small>
              {errors.email && (
                <p className="field-error" id="email-error">
                  {errors.email}
                </p>
              )}
            </div>
            <label className="check-field">
              <input
                id="consent"
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                aria-invalid={Boolean(errors.consent)}
                aria-describedby={errors.consent ? 'consent-error' : undefined}
                required
              />
              <span>
                I have read{' '}
                <Link href="/privacy" target="_blank">
                  how my information is handled (opens a new tab)
                </Link>
                . My enquiry is only shared when I choose to send it.
              </span>
            </label>
            {errors.consent && (
              <p className="field-error" id="consent-error">
                {errors.consent}
              </p>
            )}
            <div className="form-buttons">
              <button type="button" className="back-button" onClick={() => setStep(0)}>
                Back
              </button>
              <button className="button button--primary" type="submit">
                Review enquiry
                <Arrow />
              </button>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <p className="form-intro">
              Check the details below. This is an enquiry, not a confirmed appointment.
            </p>
            <dl className="enquiry-summary">
              <div>
                <dt>Name</dt>
                <dd>{name.trim()}</dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>{email.trim()}</dd>
              </div>
              <div>
                <dt>Your interest</dt>
                <dd>{selectedConcern?.title || 'I would like some guidance'}</dd>
              </div>
              {validTreatment && (
                <div>
                  <dt>Treatment</dt>
                  <dd>{validTreatment.title}</dd>
                </div>
              )}
              <div>
                <dt>Travelling for care</dt>
                <dd>{international ? 'Yes' : 'No'}</dd>
              </div>
            </dl>
            <div className="handoff-note">
              <strong>
                {clinicEmail ? 'Send when you’re ready.' : 'Online requests are not open yet.'}
              </strong>
              <p>
                {clinicEmail
                  ? 'Open a draft in your email app, review it and choose Send. The clinic will need to confirm availability separately.'
                  : 'The clinic’s contact channel is awaiting confirmation. You can save your enquiry to share later. Nothing has been sent and no appointment has been booked.'}
              </p>
            </div>
            <div className="review-actions">
              {clinicEmail && (
                <a
                  className="button button--primary"
                  href={`mailto:${clinicEmail}?subject=${encodeURIComponent('Consultation enquiry — Dental Spa')}&body=${encodeURIComponent(summary)}`}
                  onClick={() =>
                    setStatus(
                      'An email draft has been requested in your email app. Review and send it there; delivery is not confirmed by this website.',
                    )
                  }
                >
                  Open email draft
                  <Arrow />
                </a>
              )}
              <button
                className={`button button--${clinicEmail ? 'secondary' : 'primary'}`}
                type="button"
                onClick={download}
              >
                Save enquiry as a file
                <Arrow />
              </button>
              <button
                className="back-button"
                type="button"
                onClick={() => {
                  setStatus('');
                  setStep(1);
                }}
              >
                Edit my details
              </button>
            </div>
            <p className="form-status" role="status">
              {status}
            </p>
          </>
        )}
      </form>
      <p className="form-footnote">
        Your details stay in this page until you choose to share or save them. They are cleared when
        you leave or reload.
      </p>
    </div>
  );
}
