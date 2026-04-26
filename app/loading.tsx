export default function Loading() {
  return (
    <main
      id="main"
      className="min-h-[80vh] grid place-items-center px-6 md:px-12"
      aria-busy="true"
      aria-live="polite"
    >
      <div className="flex items-center gap-4 text-paper-mute font-mono text-xs tracking-widest uppercase">
        <span className="size-2 rounded-full bg-accent animate-pulse" />
        Loading
      </div>
    </main>
  )
}
