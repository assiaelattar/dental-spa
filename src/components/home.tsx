import { ConcernExplorer, TreatmentExplorer } from './explorers';
import { PublishedResults } from './published-results';
import { ButtonLink, ConsultationCTA, Photo, SectionHeader, TextLink } from './ui';

export function Home() {
  return (
    <>
      <section className="visual-opening">
        <Photo
          id="hero"
          label="Inside Dental Spa"
          ratio="16/9"
          mobileRatio="4/5"
          className="opening-background"
          priority
        />
        <div className="opening-shade" aria-hidden="true" />
        <div className="container opening-content">
          <div className="opening-copy">
            <p className="eyebrow">Dental Spa · Casablanca</p>
            <h1>
              Your smile.
              <br />
              Your story.
              <br />
              <em>Our attention.</em>
            </h1>
            <p>
              Thoughtful dentistry, in a place
              <br />
              that takes the time to understand you.
            </p>
            <div className="opening-actions">
              <ButtonLink href="/contact-or-consultation" variant="light">
                Book a consultation
              </ButtonLink>
              <TextLink href="/your-smile">Tell us about your smile</TextLink>
            </div>
          </div>
          <div className="opening-doctor">
            <Photo id="doctor" label="Dr Amina El Omrani" ratio="4/5" priority />
            <div>
              <span>Dr Amina El Omrani</span>
              <TextLink href="/doctor">The person behind your care</TextLink>
            </div>
          </div>
        </div>
        <div className="opening-bottom container">
          <span>Real people. A personal approach.</span>
          <a href="#your-smile">
            Discover Dental Spa <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>
      <section className="section container smile-chapter" id="your-smile">
        <SectionHeader
          eyebrow="Your smile, your starting point"
          title={
            <>
              Let’s start <em>with you.</em>
            </>
          }
          description="What would you like to change, feel or understand? You don’t need to know the name of a treatment."
        />
        <ConcernExplorer />
      </section>
      <section className="section visual-results">
        <div className="container">
          <SectionHeader
            eyebrow="The difference, in perspective"
            title={
              <>
                Every smile has
                <br />
                <em>a before.</em>
              </>
            }
          >
            <TextLink href="/results">Explore the smile gallery</TextLink>
          </SectionHeader>
          <PublishedResults compact />
        </div>
      </section>
      <section className="experience-chapter">
        <div className="container experience-introduction">
          <p className="eyebrow">Inside Dental Spa</p>
          <h2>
            A space to exhale.
            <br />
            <em>A moment to be heard.</em>
          </h2>
          <p>
            Natural textures, a quiet welcome and room for a conversation. Take a closer look at the
            place behind your care.
          </p>
        </div>
        <div className="experience-photographs">
          <Photo
            id="experience"
            label="The Dental Spa waiting area"
            ratio="16/9"
            mobileRatio="4/3"
          />
          <Photo
            id="detail"
            label="A detail from the clinic"
            ratio="4/5"
            mobileRatio="4/3"
            className="experience-inset"
          />
        </div>
        <div className="container experience-caption">
          <span>The reception and architectural details of Dental Spa, Casablanca.</span>
          <TextLink href="/experience">Step inside the experience</TextLink>
        </div>
      </section>
      <section className="section container treatment-chapter">
        <SectionHeader
          eyebrow="Your care, considered"
          title={
            <>
              Possibilities.
              <br />
              <em>With a personal perspective.</em>
            </>
          }
        >
          <p className="header-aside">
            Understand your options.
            <br />
            Find a place to begin.
          </p>
        </SectionHeader>
        <TreatmentExplorer />
      </section>
      <section className="technology-chapter">
        <div className="container technology-story">
          <div className="editorial-copy">
            <p className="eyebrow">The thinking behind the technology</p>
            <h2>
              A clearer picture.
              <br />
              <em>A considered plan.</em>
            </h2>
            <p>
              Explore how digital imaging and restoration workflows can help make dental care easier
              to understand.
            </p>
            <TextLink href="/technology">Technology, explained</TextLink>
          </div>
          <Photo id="technology" label="Digital dental workflows" ratio="5/4" mobileRatio="4/3" />
        </div>
      </section>
      <section className="section container portrait-story">
        <div className="portrait-story-image">
          <Photo id="doctor" label="Dr Amina El Omrani" ratio="4/5" />
          <span>Dr Amina El Omrani · at Dental Spa</span>
        </div>
        <div className="editorial-copy">
          <p className="eyebrow">The person behind your care</p>
          <h2>
            Dr Amina
            <br />
            <em>El Omrani.</em>
          </h2>
          <p>
            A face, a name, a conversation. Meet the doctor behind Dental Spa and bring the
            questions that matter to you.
          </p>
          <TextLink href="/doctor">Meet Dr El Omrani</TextLink>
          <div className="portrait-detail">
            <Photo id="detail" label="Dental Spa architectural detail" ratio="16/9" />
            <span>A glimpse of the place she has created.</span>
          </div>
        </div>
      </section>
      <section className="international-chapter">
        <Photo id="international" label="Casablanca" ratio="21/9" mobileRatio="4/3" />
        <div className="container international-story">
          <div>
            <p className="eyebrow">For our international patients</p>
            <h2>
              Before Casablanca,
              <br />
              <em>a conversation.</em>
            </h2>
          </div>
          <div>
            <p>
              Considering dental care while visiting Morocco? Understand the proposed steps and plan
              your visit with the right information.
            </p>
            <TextLink href="/international-patients">Plan your patient journey</TextLink>
          </div>
        </div>
      </section>
      <ConsultationCTA />
    </>
  );
}
