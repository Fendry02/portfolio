import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt =
  'Benoit Bruynbroeck — JavaScript Tech Lead & Full Stack Developer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const INK = '#10131c'
const PAPER = '#f4f0e6'
const ACCENT = '#5fa6f5'
const PAPER_DIM = '#9a9b8e'

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          padding: '72px',
          background: INK,
          color: PAPER,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          fontFamily: 'serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 18,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: PAPER_DIM,
          }}
        >
          <span>Benoit Bruynbroeck</span>
          <span>BBenoit.fr · 2026</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <span
            style={{
              fontSize: 16,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: ACCENT,
            }}
          >
            JavaScript Tech Lead
          </span>
          <span
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              fontSize: 110,
              lineHeight: 1.02,
              fontWeight: 400,
              maxWidth: 1000,
            }}
          >
            Engineering at the speed{' '}
            <span
              style={{ fontStyle: 'italic', color: ACCENT, marginLeft: 14 }}
            >
              of intent.
            </span>
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 18,
            color: PAPER_DIM,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
          }}
        >
          <span>TypeScript · Vue · Next · Node · PostgreSQL · AWS</span>
          <span style={{ color: ACCENT }}>↗</span>
        </div>
      </div>
    ),
    { ...size },
  )
}
