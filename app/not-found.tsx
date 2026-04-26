import Link from 'next/link'

export default function NotFound() {
  return (
    <main
      id="main"
      className="min-h-[80vh] grid place-items-center px-6 md:px-12 accent-glow relative overflow-hidden"
    >
      <div className="relative max-w-2xl text-center">
        <p className="font-mono text-[11px] text-paper-mute tracking-widest uppercase">
          Error · 404
        </p>
        <h1 className="mt-6 font-display text-paper text-[length:var(--text-display-lg)] leading-[0.95]">
          Lost in <span className="italic text-accent">transit</span>.
        </h1>
        <p className="mt-6 text-paper-dim text-lg leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist — maybe it never
          did, maybe it moved. Either way, let&apos;s get you back home.
        </p>
        <Link
          href="/"
          className="group mt-10 inline-flex items-center gap-2 bg-accent text-ink font-medium px-5 py-3 rounded-full hover:bg-paper transition-colors"
        >
          Back home
          <span
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-0.5"
          >
            →
          </span>
        </Link>
      </div>
    </main>
  )
}
