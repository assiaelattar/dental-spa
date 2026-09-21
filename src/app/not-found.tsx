import { ButtonLink } from '@/components/ui';
export default function NotFound() {
  return (
    <div className="container not-found">
      <p className="eyebrow">Page not found</p>
      <h1>
        A different
        <br />
        <em>starting point.</em>
      </h1>
      <p>This page is not available. Find your way back to Dental Spa.</p>
      <ButtonLink href="/">Return home</ButtonLink>
    </div>
  );
}
