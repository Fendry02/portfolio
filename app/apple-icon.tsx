import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background:
            'linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #0ea5e9 100%)',
          color: '#fff',
          fontSize: 110,
          fontWeight: 800,
          fontFamily: 'sans-serif',
        }}
      >
        B
      </div>
    ),
    { ...size },
  )
}
