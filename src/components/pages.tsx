import { Suspense } from 'react';
import { type Treatment, consultationHref } from '@/lib/content';
import { ConsultationForm } from './consultation-form';
import { BeforeAfter, PatientVoices } from './evidence';
import { PublishedResults } from './published-results';
import { ConcernExplorer, TreatmentExplorer } from './explorers';
import {
  Breadcrumb,
  ButtonLink,
  ConsultationCTA,
  Faq,
  PageIntro,
  Photo,
  SectionHeader,
  TextLink,
} from './ui';

export function YourSmilePage() {
  return (
    <>
      <div className="container">
        <Breadcrumb items={[{ label: 'Your smile' }]} />
        <PageIntro
          eyebrow="Your smile"
          title={
            <>
              The right place to start
              <br />
              is <em>with you.</em>
            </>
          }
          description="A concern, a question or simply a possibility. Find a starting point that sounds like you."
        />
        <div className="page-body">
          <ConcernExplorer />
        </div>
        <div className="quiet-note">
          <span className="eyebrow">Not sure where to begin?</span>
          <p>
            You can start a consultation enquiry without choosing a treatment. The clinical
            conversation comes first.
          </p>
          <TextLink href="/contact-or-consultation">Let’s start with a question</TextLink>
        </div>
      </div>
      <ConsultationCTA />
    </>
  );
}

export function TreatmentsPage() {
  return (
    <>
      <div className="container">
        <Breadcrumb items={[{ label: 'Treatments' }]} />
        <PageIntro
          eyebrow="Your care, considered"
          title={
            <>
              Possibilities for
              <br />
              <em>your kind of smile.</em>
            </>
          }
          description="An introduction to the areas of care you may wish to discuss. A clear plan begins with understanding your individual needs."
        />
        <div className="page-body">
          <TreatmentExplorer full />
        </div>
        <section className="section compact-section">
          <SectionHeader
            eyebrow="Before choosing a treatment"
            title={
              <>
                Good questions.
                <br />
                <em>Better-informed decisions.</em>
              </>
            }
          />
          <Faq
            items={[
              {
                question: 'Do I have to choose a treatment before booking?',
                answer:
                  'No. You can describe your concern or simply ask for an initial conversation. Treatment suitability is assessed by a dentist.',
              },
              {
                question: 'Where can I find fees and appointment times?',
                answer:
                  'Fees, availability and timings need to be confirmed directly with the clinic. We do not publish estimates that have not been verified.',
              },
              {
                question: 'Are all the services listed currently available?',
                answer:
                  'These pages introduce the areas of care in the project brief. The clinic will need to confirm its current services and the options appropriate to your situation.',
              },
            ]}
          />
        </section>
      </div>
      <ConsultationCTA />
    </>
  );
}

export function TreatmentPage({ treatment }: { treatment: Treatment }) {
  return (
    <>
      <div className="container">
        <Breadcrumb
          items={[{ label: 'Treatments', href: '/treatments' }, { label: treatment.title }]}
        />
        <section className="treatment-hero">
          <div>
            <p className="eyebrow">{treatment.category}</p>
            <h1>{treatment.title}</h1>
            <p className="treatment-deck">{treatment.intro}</p>
            <p>{treatment.short}</p>
            <ButtonLink href={consultationHref({ treatment: treatment.slug })}>
              Ask about this treatment
            </ButtonLink>
          </div>
          <Photo
            id={`treatment-${treatment.slug}`}
            label={treatment.title}
            ratio="4/3"
            tone={treatment.tone}
          />
        </section>
        <section className="section article-split">
          <div>
            <p className="eyebrow">Understanding the approach</p>
            <h2>
              Clarity before
              <br />
              <em>any decision.</em>
            </h2>
          </div>
          <div>
            <p className="large-copy">{treatment.discussion}</p>
            <p className="verification-note">
              General information for your consultation. The clinic must confirm available services
              and any individual treatment plan.
            </p>
          </div>
        </section>
        <section className="discussion-block">
          <p className="eyebrow">Your consultation</p>
          <h2>Make space to discuss.</h2>
          <div className="discussion-topics">
            {treatment.focus.map((item, i) => (
              <div key={item}>
                <span className="process-number">0{i + 1}</span>
                <h3>{item}</h3>
              </div>
            ))}
          </div>
        </section>
        <section className="section article-split">
          <div>
            <p className="eyebrow">Questions, welcomed</p>
            <h2>
              A little more
              <br />
              <em>understanding.</em>
            </h2>
          </div>
          <Faq items={treatment.questions} />
        </section>
        <div className="back-to-index">
          <TextLink href="/treatments">Explore all treatments</TextLink>
          <TextLink href="/your-smile">Start with your concern</TextLink>
        </div>
      </div>
      <ConsultationCTA />
    </>
  );
}

export function ResultsPage() {
  return (
    <>
      <div className="container">
        <Breadcrumb items={[{ label: 'Results' }]} />
        <PageIntro
          eyebrow="Results & patient stories"
          title={
            <>
              A smile has a story.
              <br />
              <em>Context matters.</em>
            </>
          }
          description="A before-and-after image is only part of the picture. We believe clinical stories should explain the starting point, the approach and the decisions along the way."
        />
        <section className="results-page-gallery">
          <PublishedResults />
          <div className="results-context">
            <h2>
              Real people.
              <br />
              <em>Documented with care.</em>
            </h2>
            <div>
              <p>
                These comparisons come from the clinic’s published gallery. The photographs are
                presented as published, without changes to teeth, gums or facial anatomy. Detailed
                treatment histories and timelines are not provided here.
              </p>
              <TextLink href="/results/case-preview">Explore the case-story format</TextLink>
            </div>
          </div>
        </section>
        <section className="section">
          <SectionHeader
            eyebrow="What a useful case should tell you"
            title={
              <>
                The detail
                <br />
                <em>behind the difference.</em>
              </>
            }
          />
          <div className="evidence-grid">
            {[
              ['The starting point', 'The patient’s concern and relevant clinical context.'],
              [
                'The considered approach',
                'The treatments discussed, the decisions and the stages of care.',
              ],
              [
                'The outcome, in context',
                'Approved images, a verified timeline and the limits of the individual result.',
              ],
            ].map(([title, body]) => (
              <div key={title}>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
      <PatientVoices />
      <ConsultationCTA />
    </>
  );
}

export function CasePreviewPage() {
  return (
    <>
      <div className="container">
        <Breadcrumb
          items={[{ label: 'Results', href: '/results' }, { label: 'Case format preview' }]}
        />
        <PageIntro
          eyebrow="Format preview · not a patient case"
          title={
            <>
              The full story,
              <br />
              <em>thoughtfully presented.</em>
            </>
          }
          description="This page demonstrates how approved cases will be documented. No real patient, treatment, timeline or outcome is represented."
        />
        <BeforeAfter />
        <section className="section case-detail-grid">
          <aside>
            <p className="eyebrow">Case overview</p>
            <dl className="case-facts">
              <div>
                <dt>Concern</dt>
                <dd>Awaiting approved case</dd>
              </div>
              <div>
                <dt>Treatment</dt>
                <dd>To be clinically verified</dd>
              </div>
              <div>
                <dt>Timeline</dt>
                <dd>To be clinically verified</dd>
              </div>
              <div>
                <dt>Consent</dt>
                <dd>Required before publication</dd>
              </div>
            </dl>
          </aside>
          <div className="case-narrative">
            {[
              [
                'The starting point',
                'The patient’s own concern and relevant clinical context will be explained here.',
              ],
              [
                'The approach',
                'This section will document the agreed plan, alternatives considered and stages of treatment.',
              ],
              [
                'The result',
                'Only a verified individual outcome will appear here, alongside approved images and any relevant limitations.',
              ],
            ].map(([title, text]) => (
              <section key={title}>
                <h2>{title}</h2>
                <p>{text}</p>
              </section>
            ))}
            <ButtonLink href="/contact-or-consultation">Discuss your own goals</ButtonLink>
          </div>
        </section>
      </div>
    </>
  );
}

export function ExperiencePage() {
  return (
    <>
      <div className="container">
        <Breadcrumb items={[{ label: 'The experience' }]} />
        <PageIntro
          eyebrow="The Dental Spa experience"
          title={
            <>
              Care begins with
              <br />
              <em>feeling understood.</em>
            </>
          }
          description="A considered dental experience leaves space for your questions, your preferences and the decisions that follow."
        />
        <section className="editorial-split page-body">
          <Photo id="experience" label="The space, the light, the human details" tone="stone" />
          <div className="editorial-copy">
            <p className="eyebrow">More than an appointment</p>
            <h2>
              A calmer way
              <br />
              <em>to begin.</em>
            </h2>
            <p>
              It might be your first visit. It might be a question you have been putting off. Start
              with what matters to you, including anything that makes dental care feel difficult.
            </p>
            <div className="inline-values">
              <span>Room to ask</span>
              <span>Time to consider</span>
            </div>
            <TextLink href="/contact-or-consultation">Prepare your first conversation</TextLink>
          </div>
        </section>
        <section className="section">
          <SectionHeader
            eyebrow="A considered consultation journey"
            title={
              <>
                From a first question
                <br />
                <em>to a clearer next step.</em>
              </>
            }
          />
          <div className="process-list">
            {[
              [
                'Share your starting point',
                'Choose a concern or simply ask for guidance. You do not need to arrive with a treatment in mind.',
              ],
              [
                'Understand the possibilities',
                'Discuss your goals and ask how the dentist will assess your individual needs.',
              ],
              [
                'Consider the plan',
                'Ask about the proposed approach, alternatives, fees and follow-up before agreeing to care.',
              ],
            ].map(([title, body], i) => (
              <div key={title}>
                <span className="process-number">0{i + 1}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="article-split bottom-section">
          <div>
            <p className="eyebrow">At your pace</p>
            <h2>
              Your questions
              <br />
              <em>belong here.</em>
            </h2>
          </div>
          <Faq
            items={[
              {
                question: 'I feel anxious about dental appointments. Can I mention this?',
                answer:
                  'Yes. Share that concern directly with the clinic before your visit and ask what support or adjustments can be discussed. Specific comfort measures need to be confirmed.',
              },
              {
                question: 'What happens after I prepare an online enquiry?',
                answer:
                  'You review your details, then choose whether to save the enquiry or open an email draft if a verified clinic email is available. This website does not confirm appointments.',
              },
            ]}
          />
        </section>
      </div>
      <ConsultationCTA />
    </>
  );
}

export function TechnologyPage() {
  return (
    <>
      <div className="container">
        <Breadcrumb items={[{ label: 'Technology' }]} />
        <PageIntro
          eyebrow="Technology, explained"
          title={
            <>
              A clearer picture.
              <br />
              <em>A more informed you.</em>
            </>
          }
          description="Technology matters when its purpose is understood. Explore how digital tools can support dental planning and the questions to bring to your consultation."
        />
        <div className="verification-banner">
          <span className="status-dot" />
          Technology overview · Dental Spa’s equipment and capabilities are awaiting confirmation.
        </div>
        <section className="editorial-split page-body">
          <Photo id="technology" label="Precision, seen in the details" ratio="5/4" tone="plum" />
          <div className="editorial-copy">
            <p className="eyebrow">CEREC / digital restorations</p>
            <h2>
              From a digital plan
              <br />
              <em>to a restoration.</em>
            </h2>
            <p>
              CEREC brings digital design and restoration production into a connected workflow.
              Certain restorations may be possible in a single visit, depending on the case and
              available equipment.
            </p>
            <p>
              Ask whether this approach is available and appropriate for you. A one-day result is
              never assumed.
            </p>
            <TextLink href="/treatments/same-day-dentistry">Explore same-day dentistry</TextLink>
          </div>
        </section>
        <section className="section">
          <SectionHeader
            eyebrow="Beyond the equipment"
            title={
              <>
                Ask what it means
                <br />
                <em>for your care.</em>
              </>
            }
          />
          <div className="technology-list">
            {[
              [
                'Digital imaging',
                'Understanding your starting point',
                'Ask what images are needed for your assessment, why they are useful and how they will be explained to you.',
              ],
              [
                'Digital smile workflows',
                'A shared visual conversation',
                'Ask whether planning visuals are available, what they illustrate and where their limitations lie.',
              ],
              [
                'In-house capabilities',
                'A clearer view of the process',
                'Ask which stages can take place at the clinic, which involve external partners and how this affects your appointment plan.',
              ],
            ].map(([tag, title, body]) => (
              <article key={tag}>
                <span className="eyebrow">{tag}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
      <ConsultationCTA />
    </>
  );
}

export function DoctorPage() {
  return (
    <>
      <div className="container">
        <Breadcrumb items={[{ label: 'Dr Amina El Omrani' }]} />
        <section className="doctor-page-hero">
          <div>
            <p className="eyebrow">The person behind Dental Spa</p>
            <h1>
              Dr Amina
              <br />
              <em>El Omrani.</em>
            </h1>
            <p className="doctor-subtitle">
              Dental Spa / Spa Dentaire
              <br />
              Casablanca, Morocco
            </p>
            <p>
              A considered approach begins with a conversation. Meet the medical identity at the
              centre of Dental Spa.
            </p>
            <ButtonLink href="/contact-or-consultation">Book a consultation</ButtonLink>
          </div>
          <Photo id="doctor" label="Dr Amina El Omrani at Dental Spa" tone="stone" />
        </section>
        <section className="section article-split">
          <div>
            <p className="eyebrow">An introduction</p>
            <h2>
              Expertise deserves
              <br />
              <em>clear context.</em>
            </h2>
          </div>
          <div>
            <p className="large-copy">
              The clinic’s clinical biography, qualifications and professional background will be
              published here once verified.
            </p>
            <p>
              For now, you can explore the areas of care introduced on this website and prepare the
              questions you would like to discuss directly.
            </p>
            <TextLink href="/treatments">Discover the areas of care</TextLink>
          </div>
        </section>
        <section className="doctor-conversation">
          <p className="eyebrow">An open conversation</p>
          <h2>
            What would you like
            <br />
            <em>your dentist to know?</em>
          </h2>
          <p>
            What you hope to change. What you would like to preserve.
            <br />
            The questions you have never quite found the space to ask.
          </p>
          <TextLink href="/your-smile">Tell us about your smile</TextLink>
        </section>
      </div>
      <ConsultationCTA />
    </>
  );
}

export function InternationalPage() {
  return (
    <>
      <div className="container">
        <Breadcrumb items={[{ label: 'International patients' }]} />
        <PageIntro
          eyebrow="International patients · Casablanca"
          title={
            <>
              Your journey starts
              <br />
              <em>with a conversation.</em>
            </>
          }
          description="Considering dental care in Morocco? Bring your questions into focus before making travel or treatment arrangements."
        >
          <ButtonLink href={consultationHref({ international: true })}>
            International patient consultation
          </ButtonLink>
        </PageIntro>
        <div className="international-feature">
          <Photo
            id="international"
            label="Casablanca · an editorial perspective to come"
            ratio="16/10"
            tone="sage"
          />
          <div>
            <span className="eyebrow">Before the flight, the conversation</span>
            <h2>
              Careful planning.
              <br />
              <em>Clearer expectations.</em>
            </h2>
            <p>
              Start by discussing your goals and travel intentions. The clinic needs to confirm the
              consultation options, proposed schedule and any necessary records.
            </p>
            <p>
              Remote consultations, document uploads and travel coordination are not offered through
              this website at this stage.
            </p>
          </div>
        </div>
        <section className="section">
          <SectionHeader
            eyebrow="Preparing your visit"
            title={
              <>
                One step at a time.
                <br />
                <em>Before you make plans.</em>
              </>
            }
          />
          <div className="process-list">
            {[
              [
                'Begin the conversation',
                'Choose the international patient option in your enquiry. Do not send medical documents through this website.',
              ],
              [
                'Confirm what is needed',
                'Ask about assessment options, records, treatment stages and the time you may need in Casablanca.',
              ],
              [
                'Agree the practical details',
                'Confirm appointments, fees and any follow-up before booking flights or accommodation.',
              ],
              [
                'Understand the follow-up',
                'Discuss how ongoing care and questions will be handled after you return home.',
              ],
            ].map(([title, body], i) => (
              <div key={title}>
                <span className="process-number">0{i + 1}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="article-split bottom-section">
          <div>
            <p className="eyebrow">Before you travel</p>
            <h2>
              A few things
              <br />
              <em>to clarify.</em>
            </h2>
          </div>
          <Faq
            items={[
              {
                question: 'Can I arrange a remote consultation here?',
                answer:
                  'Not through this website yet. Prepare an international enquiry and ask the clinic which consultation options are currently available.',
              },
              {
                question: 'How many days should I plan to stay?',
                answer:
                  'There is no standard duration that applies to every patient. Confirm your assessment, treatment stages and follow-up arrangements before booking travel.',
              },
              {
                question: 'Can I upload my scans or dental records?',
                answer:
                  'This website does not accept clinical documents. Ask the clinic for an approved way to share records if they are needed.',
              },
              {
                question: 'Does Dental Spa arrange flights or accommodation?',
                answer:
                  'Travel coordination services have not been confirmed. Make no assumptions about packages or included arrangements; discuss these questions with the clinic.',
              },
            ]}
          />
        </section>
      </div>
      <ConsultationCTA international />
    </>
  );
}

export function ConsultationPage() {
  return (
    <div className="container consultation-page">
      <Breadcrumb items={[{ label: 'Consultation' }]} />
      <div className="consultation-layout">
        <div className="consultation-intro">
          <p className="eyebrow">Let’s begin</p>
          <h1>
            A conversation
            <br />
            about <em>you.</em>
          </h1>
          <p>
            A question. A concern. A possibility.
            <br />
            Prepare your enquiry in a few simple steps.
          </p>
          <div className="consultation-side-note">
            <span className="eyebrow">What to expect</span>
            <p>
              Choose a starting point, add your contact details and review your enquiry before
              deciding how to share it.
            </p>
            <span className="eyebrow">Good to know</span>
            <p>
              No appointment is booked through this form. Contact details and availability need to
              be confirmed by the clinic.
            </p>
          </div>
          <span className="consultation-location">
            Dental Spa / Spa Dentaire
            <br />
            Dr Amina El Omrani · Casablanca
          </span>
        </div>
        <Suspense
          fallback={
            <div className="enquiry-form">
              <p>Preparing your enquiry form…</p>
            </div>
          }
        >
          <ConsultationForm />
        </Suspense>
      </div>
    </div>
  );
}

export function PrivacyPage() {
  return (
    <div className="container">
      <Breadcrumb items={[{ label: 'Your information' }]} />
      <PageIntro
        eyebrow="Privacy & your enquiry"
        title={
          <>
            Your information.
            <br />
            <em>Your choice.</em>
          </>
        }
        description="A clear explanation of what this website currently does with the details you enter."
      />
      <article className="prose bottom-section">
        <h2>Information on this page</h2>
        <p>
          The consultation form keeps your selected interest, name and email in your browser’s
          active page memory. These details are not submitted to a clinic server, stored in a
          database or saved in browser storage. Leaving or reloading the page clears them.
        </p>
        <h2>Saving or sharing your enquiry</h2>
        <p>
          If you choose to save the enquiry, a text file is downloaded to your device. You control
          that file. If a clinic email address has been verified and configured, an email-draft
          option may also be available. It opens your email application with the enquiry details;
          you decide whether to send it. Your email provider’s privacy terms then apply.
        </p>
        <h2>Clinical information</h2>
        <p>
          Do not enter or upload clinical documents, scans or sensitive medical history here. The
          website does not accept document uploads. Discuss any need to share records directly with
          the clinic using an agreed channel.
        </p>
        <h2>Cookies and analytics</h2>
        <p>
          The application does not set tracking cookies or include advertising or analytics tools.
          The hosting provider may process technical request information such as IP addresses and
          access logs. Its practices must be reviewed as part of the final hosting setup.
        </p>
        <h2>Before online submissions open</h2>
        <p>
          The clinic’s contact details, data controller information, retention policy and
          rights-request channel must be verified and published before a connected submission
          service is enabled. This page describes the current frontend behavior.
        </p>
        <TextLink href="/contact-or-consultation">Return to the consultation journey</TextLink>
      </article>
    </div>
  );
}
