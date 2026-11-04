import { ImageResponse } from 'next/og';

export const alt = 'Bagoes Hutomo — Official Portfolio | Camera Assistant, Production Assistant & Gaffer';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          backgroundColor: '#0c0b0a',
          backgroundImage:
            'radial-gradient(circle at 80% 20%, rgba(139, 111, 94, 0.25) 0%, transparent 60%), radial-gradient(circle at 10% 90%, rgba(139, 111, 94, 0.15) 0%, transparent 50%)',
          color: '#EDE8E1',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Top Viewfinder HUD */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(237, 232, 225, 0.15)',
            paddingBottom: '24px',
            fontSize: '18px',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: '#A8A196',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                backgroundColor: '#dc2626',
              }}
            />
            <span style={{ color: '#EDE8E1', fontWeight: 700 }}>REC · 24 FPS</span>
            <span style={{ color: '#8B6F5E' }}>|</span>
            <span>SHUTTER 1/200</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ color: '#8B6F5E', fontWeight: 700 }}>CREW PERSPECTIVE</span>
          </div>
        </div>

        {/* Center Name & Title */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            style={{
              fontSize: '20px',
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              color: '#8B6F5E',
              fontWeight: 600,
            }}
          >
            Video Production Crew Portfolio
          </div>
          <div
            style={{
              fontSize: '84px',
              fontWeight: 900,
              letterSpacing: '-0.02em',
              lineHeight: 1.0,
              color: '#EDE8E1',
              display: 'flex',
              gap: '24px',
            }}
          >
            <span>BAGOES</span>
            <span style={{ color: '#8B6F5E' }}>HUTOMO</span>
          </div>
          <div
            style={{
              fontSize: '26px',
              color: '#A8A196',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontWeight: 500,
              marginTop: '8px',
            }}
          >
            Camera Assistant · Production Assistant · Gaffer
          </div>
        </div>

        {/* Bottom Credits & Tags */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(237, 232, 225, 0.15)',
            paddingTop: '24px',
          }}
        >
          <div style={{ display: 'flex', gap: '12px' }}>
            <div
              style={{
                padding: '8px 18px',
                borderRadius: '6px',
                backgroundColor: 'rgba(139, 111, 94, 0.18)',
                border: '1px solid rgba(139, 111, 94, 0.4)',
                fontSize: '15px',
                fontWeight: 600,
                letterSpacing: '0.1em',
                color: '#EDE8E1',
              }}
            >
              MUSIC VIDEOS
            </div>
            <div
              style={{
                padding: '8px 18px',
                borderRadius: '6px',
                backgroundColor: 'rgba(139, 111, 94, 0.18)',
                border: '1px solid rgba(139, 111, 94, 0.4)',
                fontSize: '15px',
                fontWeight: 600,
                letterSpacing: '0.1em',
                color: '#EDE8E1',
              }}
            >
              SHORT DRAMAS
            </div>
            <div
              style={{
                padding: '8px 18px',
                borderRadius: '6px',
                backgroundColor: 'rgba(139, 111, 94, 0.18)',
                border: '1px solid rgba(139, 111, 94, 0.4)',
                fontSize: '15px',
                fontWeight: 600,
                letterSpacing: '0.1em',
                color: '#EDE8E1',
              }}
            >
              DANCE COVERS
            </div>
          </div>

          <div
            style={{
              fontSize: '18px',
              color: '#A8A196',
              letterSpacing: '0.15em',
              fontWeight: 600,
            }}
          >
            EUIS.STUDIO × EFKA.PROD
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

