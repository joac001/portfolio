import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Joaquín Ordóñez — Software Developer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const interFont = fetch(
    new URL('https://fonts.googleapis.com/css2?family=Inter:wght@700&display=swap')
  ).then(res => res.arrayBuffer()).catch(() => null);

  const jetbrainsFont = fetch(
    new URL('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400&display=swap')
  ).then(res => res.arrayBuffer()).catch(() => null);

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          backgroundColor: '#09090b',
          padding: '80px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative branch lines */}
        <svg
          width="400"
          height="630"
          viewBox="0 0 400 630"
          style={{ position: 'absolute', left: 0, top: 0, opacity: 0.15 }}
        >
          <line x1="40" y1="0" x2="40" y2="630" stroke="#71717a" strokeWidth="2" />
          <path d="M 40 120 C 40 144, 120 144, 120 168" stroke="#0ea5e9" strokeWidth="2" fill="none" />
          <line x1="120" y1="168" x2="120" y2="320" stroke="#0ea5e9" strokeWidth="2" />
          <path d="M 120 320 C 120 344, 40 344, 40 368" stroke="#0ea5e9" strokeWidth="2" fill="none" />
          <path d="M 40 280 C 40 304, 200 304, 200 328" stroke="#9333ea" strokeWidth="2" fill="none" />
          <line x1="200" y1="328" x2="200" y2="500" stroke="#9333ea" strokeWidth="2" />
          <path d="M 40 440 C 40 464, 160 464, 160 488" stroke="#16a34a" strokeWidth="2" fill="none" />
          <line x1="160" y1="488" x2="160" y2="630" stroke="#16a34a" strokeWidth="2" strokeDasharray="6 4" />
          <circle cx="40" cy="120" r="5" fill="#0ea5e9" />
          <circle cx="120" cy="168" r="5" fill="#0ea5e9" />
          <circle cx="40" cy="280" r="5" fill="#9333ea" />
          <circle cx="200" cy="328" r="5" fill="#9333ea" />
          <circle cx="40" cy="368" r="5" fill="#0ea5e9" />
          <circle cx="40" cy="440" r="5" fill="#16a34a" />
          <circle cx="160" cy="488" r="5" fill="#16a34a" />
        </svg>

        {/* Content */}
        <div style={{ display: 'flex', flexDirection: 'column', zIndex: 1 }}>
          <span
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 20,
              color: '#71717a',
              marginBottom: 12,
              letterSpacing: '0.05em',
            }}
          >
            SOFTWARE ENGINEER
          </span>
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 72,
              fontWeight: 700,
              color: '#fafafa',
              lineHeight: 1.1,
              marginBottom: 24,
            }}
          >
            Joaquín Ordóñez
          </span>
          <span
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 22,
              color: '#a1a1aa',
              lineHeight: 1.6,
              maxWidth: 700,
            }}
          >
            Full-stack engineer building production web applications with React, Next.js, TypeScript & Python.
          </span>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            position: 'absolute',
            bottom: 48,
            left: 80,
          }}
        >
          <span
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 16,
              color: '#52525b',
            }}
          >
            joaquinordonez.dev
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
