import { ImageResponse } from 'next/og';
export const alt = 'Dental Spa — Dr Amina El Omrani, Casablanca, Morocco';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: '#FAF9F6',
        color: '#503D50',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: 80,
        justifyContent: 'space-between',
      }}
    >
      <div style={{ display: 'flex', fontSize: 32 }}>Dental Spa / Spa Dentaire</div>
      <div style={{ fontSize: 78, display: 'flex', maxWidth: 900, lineHeight: 1.1 }}>
        A considered approach. A smile that’s yours.
      </div>
      <div style={{ display: 'flex', fontSize: 25 }}>Dr Amina El Omrani · Casablanca, Morocco</div>
    </div>,
    size,
  );
}
