export const navigation = [
  ['Your smile', '/your-smile'],
  ['Treatments', '/treatments'],
  ['Results', '/results'],
  ['The experience', '/experience'],
  ['Technology', '/technology'],
  ['International patients', '/international-patients'],
  ['Dr El Omrani', '/doctor'],
] as const;

export const concerns = [
  {
    id: 'aesthetics',
    title: 'I want to improve my smile',
    label: 'A smile that feels like you',
    description:
      'Start with what you would like to change. Explore the colour, shape and balance of your smile, with room to ask every question.',
    treatment: 'aesthetic-dentistry',
  },
  {
    id: 'restoration',
    title: 'I have missing or damaged teeth',
    label: 'Let’s talk about function, too',
    description:
      'A consultation is a place to discuss comfort, everyday function and the options for restoring your teeth.',
    treatment: 'restorative-dentistry',
  },
  {
    id: 'discomfort',
    title: 'I have a dental concern or pain',
    label: 'Your concern deserves attention',
    description:
      'Speak with a dentist about what is troubling you. This website cannot assess symptoms or arrange emergency care.',
    treatment: 'general-dentistry',
  },
  {
    id: 'alignment',
    title: 'I want straighter teeth',
    label: 'Explore a different alignment',
    description:
      'Learn about orthodontic care and the questions to bring to an assessment. Your dentist can explain which options may suit you.',
    treatment: 'orthodontics',
  },
  {
    id: 'smile-design',
    title: 'I’m considering a smile transformation',
    label: 'Begin with the bigger picture',
    description:
      'Share your goals and explore how a considered plan could bring them together. Every decision begins with a clinical assessment.',
    treatment: 'smile-design',
  },
  {
    id: 'international',
    title: 'I’m travelling to Morocco for care',
    label: 'A conversation before the journey',
    description:
      'Prepare your questions, share your travel intentions and understand what needs to be confirmed before making plans.',
    treatment: 'international',
  },
] as const;

export type Treatment = {
  slug: string;
  title: string;
  category: string;
  short: string;
  intro: string;
  focus: string[];
  discussion: string;
  questions: { question: string; answer: string }[];
  tone: 'sage' | 'stone' | 'plum';
};

export const treatments: Treatment[] = [
  {
    slug: 'aesthetic-dentistry',
    title: 'Aesthetic dentistry',
    category: 'Expression & balance',
    short: 'A considered approach to colour, shape and the details that make a smile yours.',
    intro: 'Small details. A personal perspective.',
    focus: [
      'What you would like to change',
      'Your oral health and starting point',
      'The options, their limits and maintenance',
    ],
    discussion:
      'Aesthetic dentistry explores the appearance of teeth. Your consultation is an opportunity to discuss your goals alongside the health of your teeth and gums. Suitability and any proposed care need an individual assessment.',
    tone: 'sage',
    questions: [
      {
        question: 'How do I know which treatment to ask about?',
        answer:
          'You do not need to choose a treatment in advance. Describe what you would like to change and ask the dentist to explain the available options.',
      },
      {
        question: 'Can I discuss a natural-looking result?',
        answer:
          'Yes. Bring the details that matter to you, including what you would like to preserve. An outcome cannot be promised before assessment.',
      },
    ],
  },
  {
    slug: 'restorative-dentistry',
    title: 'Restorative dentistry',
    category: 'Comfort & function',
    short: 'Explore options for damaged or missing teeth, with everyday life in mind.',
    intro: 'For the moments you don’t want to think about your teeth.',
    focus: [
      'Comfort and everyday function',
      'The condition of the remaining teeth',
      'Options, stages and ongoing care',
    ],
    discussion:
      'Restorative care addresses damaged or missing teeth. Depending on the individual situation, a dentist may discuss fillings, crowns, bridges or other approaches. Available services and suitability must be confirmed with the clinic.',
    tone: 'stone',
    questions: [
      {
        question: 'Are all missing teeth treated in the same way?',
        answer:
          'No. The choice depends on a clinical assessment, the surrounding teeth and your goals. Ask about the alternatives and their trade-offs.',
      },
      {
        question: 'Will I need more than one appointment?',
        answer:
          'The number and spacing of appointments depend on the proposed treatment. Ask for a written plan before making arrangements.',
      },
    ],
  },
  {
    slug: 'orthodontics',
    title: 'Orthodontics',
    category: 'Alignment & movement',
    short: 'A closer look at alignment, your bite and the possibilities for your smile.',
    intro: 'A different direction for your smile.',
    focus: [
      'Your alignment and bite',
      'Which options may be appropriate',
      'The commitment and follow-up involved',
    ],
    discussion:
      'Orthodontic treatment moves teeth to change their position. The appropriate approach depends on an assessment of your teeth and bite. Ask the clinic to confirm the options available and who will oversee your care.',
    tone: 'plum',
    questions: [
      {
        question: 'Can adults discuss orthodontic care?',
        answer:
          'Adults can seek an orthodontic assessment. Age alone does not determine suitability; an individual dental assessment is needed.',
      },
      {
        question: 'How long would treatment take?',
        answer:
          'A meaningful estimate requires an assessment and a proposed treatment plan. No timeline is promised on this website.',
      },
    ],
  },
  {
    slug: 'smile-design',
    title: 'Smile design',
    category: 'The complete picture',
    short: 'A conversation about your goals, brought together in a considered plan.',
    intro: 'Your features. Your expression. Your smile.',
    focus: [
      'What feels important to you',
      'The relationship between health and appearance',
      'A staged plan you can understand',
    ],
    discussion:
      'Smile design is a planning conversation about your smile as a whole. It can bring together aesthetic and functional questions. Any visual planning tools and proposed treatments should be explained and confirmed at your consultation.',
    tone: 'sage',
    questions: [
      {
        question: 'Do I need to know exactly what I want?',
        answer:
          'No. Start with what you notice, what you like and what you are unsure about. The consultation is the place to explore those questions.',
      },
      {
        question: 'Does a simulation guarantee a result?',
        answer:
          'No. Planning visuals are discussion tools. Ask your dentist to explain their limits and what can realistically be assessed.',
      },
    ],
  },
  {
    slug: 'same-day-dentistry',
    title: 'Same-day dentistry',
    category: 'Digital possibilities',
    short: 'Understand CEREC and the possibilities of a digital restoration workflow.',
    intro: 'A closer connection between planning and making.',
    focus: [
      'Whether the workflow is available',
      'Whether your case is suitable',
      'The appointment plan and alternatives',
    ],
    discussion:
      'CEREC is a digital workflow that can support designing and making certain dental restorations in a single visit. This does not apply to every case. Dental Spa’s equipment, service availability and your suitability require confirmation.',
    tone: 'stone',
    questions: [
      {
        question: 'Can every restoration be completed in one day?',
        answer:
          'No. A single-visit approach depends on the clinical situation, equipment and proposed restoration. Confirm an individual plan with the clinic.',
      },
      {
        question: 'Is CEREC availability confirmed at Dental Spa?',
        answer:
          'The clinic’s equipment details are awaiting verification. Ask the team to confirm the current technology and applicable services.',
      },
    ],
  },
  {
    slug: 'general-dentistry',
    title: 'General dental care',
    category: 'Health & reassurance',
    short: 'A starting point for routine care, questions and concerns about your teeth.',
    intro: 'Start with what’s on your mind.',
    focus: [
      'Your current concern',
      'Your dental history, discussed in person',
      'Next steps following an examination',
    ],
    discussion:
      'A dental consultation provides a place to raise concerns and understand the next steps after examination. The website does not assess symptoms, diagnose conditions or provide an emergency response.',
    tone: 'sage',
    questions: [
      {
        question: 'Can I use this website for urgent care?',
        answer:
          'No. Online enquiries are not monitored for emergencies and do not arrange urgent care. Contact a local dental or emergency service if you need urgent assistance.',
      },
      {
        question: 'What should I prepare for the consultation?',
        answer:
          'Bring your questions. Confirm with the clinic whether any existing dental records are needed; do not send sensitive records through this website.',
      },
    ],
  },
];

export const publicRoutes = [
  '/',
  '/your-smile',
  '/treatments',
  ...treatments.map((t) => `/treatments/${t.slug}`),
  '/results',
  '/experience',
  '/technology',
  '/international-patients',
  '/doctor',
];

export const pageInfo: Record<string, { title: string; description: string }> = {
  'your-smile': {
    title: 'Your smile, your starting point',
    description:
      'Explore dental care from your own concerns, from smile aesthetics to alignment, restoration and travelling to Casablanca.',
  },
  treatments: {
    title: 'Explore dental treatments',
    description:
      'A clear introduction to aesthetic dentistry, restorative care, orthodontics and digital dental workflows at Dental Spa.',
  },
  results: {
    title: 'The story behind a smile',
    description:
      'Our approach to presenting documented dental cases, with context, care and transparent information.',
  },
  experience: {
    title: 'The Dental Spa experience',
    description:
      'Explore a considered consultation journey with Dental Spa in Casablanca, from your first questions to an informed next step.',
  },
  technology: {
    title: 'Technology with a human purpose',
    description:
      'Understand digital dental imaging, CEREC and smile planning, including the questions to ask about your care.',
  },
  'international-patients': {
    title: 'Your care, before your journey',
    description:
      'Prepare a dental enquiry before travelling to Casablanca. Explore questions about consultation, treatment planning and follow-up.',
  },
  doctor: {
    title: 'Dr Amina El Omrani',
    description:
      'Meet the medical identity behind Dental Spa / Spa Dentaire in Casablanca: Dr Amina El Omrani.',
  },
  'contact-or-consultation': {
    title: 'Begin a conversation',
    description:
      'Prepare your consultation enquiry for Dental Spa, with a simple step-by-step journey.',
  },
  privacy: {
    title: 'Your information',
    description:
      'How the Dental Spa website handles the information you enter in the consultation enquiry.',
  },
  'results/case-preview': {
    title: 'Clinical case format — preview',
    description:
      'A clearly labelled preview of the future Dental Spa case-study format. No patient case or treatment outcome is presented.',
  },
};

export function consultationHref(
  context: { concern?: string; treatment?: string; international?: boolean } = {},
) {
  const params = new URLSearchParams();
  if (context.concern) params.set('concern', context.concern);
  if (context.treatment) params.set('treatment', context.treatment);
  if (context.international) params.set('international', '1');
  return `/contact-or-consultation${params.size ? `?${params.toString()}` : ''}`;
}
