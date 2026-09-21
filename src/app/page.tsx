import { Home } from '@/components/home';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata(
  'Dental Spa | Dr Amina El Omrani · Casablanca',
  'Explore Dental Spa / Spa Dentaire with Dr Amina El Omrani in Casablanca. Thoughtful dental care, clear options and a personal consultation journey.',
  '/',
);
export default function Page() {
  return <Home />;
}
