'use client'

import Link from 'next/link'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main
      id="main"
      className="min-h-[80vh] grid place-items-center px-6 md:px-12 relative overflow-hidden"
    >
      <div className="relative max-w-2xl text-center">
        <p className="font-mono text-[11px] text-paper-mute tracking-widest uppercase">
          Unexpected error
        </p>
        <h1 className="mt-6 font-display text-paper text-[length:var(--text-display-lg)] leading-[0.95]">
          Something <span className="italic text-accent">slipped</span>.
        </h1>
        <p className="mt-6 text-paper-dim text-lg leading-relaxed">
          The page failed to render. You can retry, or head back to safety.
        </p>
        {error.digest && (
          <p className="mt-4 font-mono text-xs text-paper-mute">
            ref: {error.digest}
          </p>
        )}
        <div className="mt-10 flex justify-center gap-3 flex-wrap">
          <button
            type="button"
            onClick={reset}
            className="group inline-flex items-center gap-2 bg-accent text-ink font-medium px-5 py-3 rounded-full hover:bg-paper transition-colors"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-paper border border-line hover:border-paper px-5 py-3 rounded-full transition-colors"
          >
            Back home
          </Link>
        </div>
      </div>
    </main>
  )
}
