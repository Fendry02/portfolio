import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt =
  'Benoit Bruynbroeck - JavaScript Tech Lead & Full Stack Developer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '96px',
          background:
            'linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #0ea5e9 100%)',
          color: '#fff',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 28,
            color: '#94a3b8',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: 24,
          }}
        >
          bbenoit.fr
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 88,
            fontWeight: 800,
            lineHeight: 1.05,
            marginBottom: 24,
          }}
        >
          Benoit Bruynbroeck
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 40,
            fontWeight: 500,
            color: '#e2e8f0',
            lineHeight: 1.2,
            maxWidth: 1000,
          }}
        >
          JavaScript Tech Lead & Full Stack Developer
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 64,
            gap: 24,
            fontSize: 24,
            color: '#bae6fd',
          }}
        >
          <span>Vue.js</span>
          <span>·</span>
          <span>Next.js</span>
          <span>·</span>
          <span>Node.js</span>
          <span>·</span>
          <span>PostgreSQL</span>
          <span>·</span>
          <span>AWS</span>
        </div>
      </div>
    ),
    { ...size },
  )
}
