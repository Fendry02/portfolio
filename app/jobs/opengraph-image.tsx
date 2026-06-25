import { ImageResponse } from 'next/og'

export const alt =
  'Benoit Bruynbroeck — JavaScript Tech Lead and full-stack developer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function JobsOpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: '#101418',
        padding: '76px',
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          fontSize: 24,
          fontWeight: 600,
          letterSpacing: 4,
          textTransform: 'uppercase',
          color: '#93c5fd',
        }}
      >
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: 9999,
            background: '#22c55e',
          }}
        />
        JavaScript Tech Lead
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            fontSize: 76,
            fontWeight: 700,
            color: '#f8fafc',
            lineHeight: 1.05,
            letterSpacing: -2,
          }}
        >
          Full-stack developer building maintainable web products.
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 30,
            color: '#cbd5e1',
            lineHeight: 1.35,
          }}
        >
          Vue.js · React · Next.js · Node.js · PostgreSQL · AI workflows
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          fontSize: 28,
          fontWeight: 600,
          color: '#f8fafc',
        }}
      >
        <div
          style={{
            width: 40,
            height: 6,
            borderRadius: 9999,
            background: '#2563eb',
          }}
        />
        Benoit Bruynbroeck · bbenoit.fr/jobs
      </div>
    </div>,
    { ...size },
  )
}
