import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

import { ImageResponse } from 'next/og'
import sharp from 'sharp'

import { truncateForCard } from './og-text'

export const ogImageSize = { width: 1200, height: 630 }

type OgCardInput = {
  eyebrow: string
  title: string
  subtitle: string
  footer: string
  /** Path under `public/` of a screenshot shown on the right of the card. */
  screenshot?: string
}

// Satori only decodes PNG and JPEG, so screenshots (often WebP) are converted.
// Desktop captures keep a landscape frame; phone captures a portrait one.
async function loadScreenshot(path: string) {
  const source = await readFile(join(process.cwd(), 'public', path))
  const { width = 1, height = 1 } = await sharp(source).metadata()
  const frame =
    width > height ? { width: 460, height: 288 } : { width: 336, height: 460 }
  const png = await sharp(source)
    .resize({
      width: frame.width * 2,
      height: frame.height * 2,
      fit: 'cover',
      position: 'top',
    })
    .png()
    .toBuffer()

  return { src: `data:image/png;base64,${png.toString('base64')}`, ...frame }
}

export async function renderOgCard({
  eyebrow,
  title,
  subtitle,
  footer,
  screenshot,
}: OgCardInput) {
  const shot = screenshot ? await loadScreenshot(screenshot) : null

  return new ImageResponse(
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        background: '#0b1220',
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '68px 64px 68px 76px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: '#60a5fa',
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
          {truncateForCard(eyebrow, 48)}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: shot ? 60 : 68,
              fontWeight: 700,
              color: '#f8fafc',
              lineHeight: 1.08,
              letterSpacing: -1.5,
            }}
          >
            {truncateForCard(title, 80)}
          </div>
          <div
            style={{
              marginTop: 26,
              fontSize: 27,
              color: '#cbd5e1',
              lineHeight: 1.4,
            }}
          >
            {truncateForCard(subtitle, shot ? 120 : 150)}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            fontSize: 26,
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
          {footer}
        </div>
      </div>

      {shot ? (
        <div
          style={{
            width: shot.width + 64,
            display: 'flex',
            alignItems: shot.width > shot.height ? 'center' : 'flex-start',
            paddingTop: shot.width > shot.height ? 0 : 68,
            paddingRight: 64,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- rendered by Satori, not the browser */}
          <img
            src={shot.src}
            alt=""
            width={shot.width}
            height={shot.height}
            style={{
              borderRadius: 18,
              border: '1px solid rgba(248, 250, 252, 0.18)',
              objectFit: 'cover',
            }}
          />
        </div>
      ) : null}
    </div>,
    ogImageSize,
  )
}
