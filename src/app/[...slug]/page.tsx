import { notFound } from 'next/navigation';
import { pageInfo, treatments } from '@/lib/content';
import { pageMetadata } from '@/lib/site';
import {
  CasePreviewPage,
  ConsultationPage,
  DoctorPage,
  ExperiencePage,
  InternationalPage,
  PrivacyPage,
  ResultsPage,
  TechnologyPage,
  TreatmentPage,
  TreatmentsPage,
  YourSmilePage,
} from '@/components/pages';

export const dynamicParams = false;
export function generateStaticParams() {
  return [...Object.keys(pageInfo), ...treatments.map((t) => `treatments/${t.slug}`)].map(
    (path) => ({ slug: path.split('/') }),
  );
}
type Props = { params: Promise<{ slug: string[] }> };
export async function generateMetadata({ params }: Props) {
  const path = (await params).slug.join('/');
  const treatment = treatments.find((t) => path === `treatments/${t.slug}`);
  const info = treatment
    ? { title: treatment.title, description: treatment.short }
    : pageInfo[path];
  if (!info) return {};
  return pageMetadata(
    info.title,
    info.description,
    `/${path}`,
    ['results/case-preview', 'contact-or-consultation', 'privacy'].includes(path),
  );
}
export default async function Page({ params }: Props) {
  const path = (await params).slug.join('/');
  const treatment = treatments.find((t) => path === `treatments/${t.slug}`);
  if (treatment) return <TreatmentPage treatment={treatment} />;
  switch (path) {
    case 'your-smile':
      return <YourSmilePage />;
    case 'treatments':
      return <TreatmentsPage />;
    case 'results':
      return <ResultsPage />;
    case 'results/case-preview':
      return <CasePreviewPage />;
    case 'experience':
      return <ExperiencePage />;
    case 'technology':
      return <TechnologyPage />;
    case 'doctor':
      return <DoctorPage />;
    case 'international-patients':
      return <InternationalPage />;
    case 'contact-or-consultation':
      return <ConsultationPage />;
    case 'privacy':
      return <PrivacyPage />;
    default:
      notFound();
  }
}
