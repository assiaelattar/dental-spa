export type VisualAsset = {
  name: string;
  alt: string;
  caption?: string;
  position?: string;
  mobilePosition?: string;
  contain?: boolean;
  maxWidth?: number;
};

export const visualAssets: Record<string, VisualAsset> = {
  hero: {
    name: 'reception',
    alt: 'Dental Spa reception with timber wall panels and the original illuminated clinic sign',
    position: '62% 50%',
    mobilePosition: '66% 50%',
  },
  doctor: {
    name: 'dr-amina',
    alt: 'Dr Amina El Omrani, pictured in her clinic on the Dental Spa biography page',
    position: '50% 38%',
    mobilePosition: '50% 36%',
    maxWidth: 1600,
  },
  experience: {
    name: 'clinic-lounge',
    alt: 'Dental Spa waiting area with green armchairs, mirrors and timber reception desk',
    position: '50% 50%',
    mobilePosition: '42% 50%',
  },
  detail: {
    name: 'botanical-wall',
    alt: 'White leaf outlines with green inserts on the timber wall at Dental Spa',
    position: '65% 50%',
    mobilePosition: '70% 50%',
  },
  technology: {
    name: 'cerec-workflow',
    alt: 'CEREC digital restoration workstation shown on the clinic technology page',
    caption: 'CEREC workflow illustration · from the clinic website',
    position: '45% 50%',
    mobilePosition: '35% 50%',
  },
  imaging: {
    name: 'digital-imaging',
    alt: 'Illustration of a dental scanner beside a diagnostic display',
    caption: 'Digital imaging illustration · from the clinic website',
    contain: true,
  },
  international: {
    name: 'casablanca',
    alt: 'Casablanca at dusk, from the clinic international-patient page',
    position: '50% 50%',
    mobilePosition: '60% 50%',
  },
  'treatment-aesthetic-dentistry': {
    name: 'clinic-lounge',
    alt: 'The waiting area at Dental Spa in Casablanca',
    caption: 'Your care begins with a consultation at Dental Spa',
  },
  'treatment-restorative-dentistry': {
    name: 'clinic-corridor',
    alt: 'A corridor and preparation space inside Dental Spa',
    caption: 'Inside Dental Spa · consultation and care',
  },
  'treatment-general-dentistry': {
    name: 'clinic-corridor',
    alt: 'A corridor and preparation space inside Dental Spa',
    caption: 'Inside Dental Spa',
  },
  'treatment-orthodontics': {
    name: 'aligner-detail',
    alt: 'Close-up demonstrating a clear dental aligner',
    caption: 'Representative aligner image from the clinic website',
  },
  'treatment-smile-design': {
    name: 'smile-planning',
    alt: 'Smile-planning image with the original dental measurement overlays',
    caption: 'Smile-planning illustration · original annotations preserved',
    contain: true,
    maxWidth: 960,
  },
  'treatment-same-day-dentistry': {
    name: 'cerec-workflow',
    alt: 'CEREC digital restoration workflow illustration',
    caption: 'Technology illustration · service availability to be confirmed',
  },
};

export function visualSources(asset: VisualAsset, variant: 'desktop' | 'mobile') {
  const widths = (variant === 'mobile' ? [480, 768] : [960, 1600, 1920]).filter(
    (width) => width <= (asset.maxWidth || 1920),
  );
  return widths
    .map((width) => `/images/dentalspa/${variant}/${asset.name}-${width}.webp ${width}w`)
    .join(', ');
}
