import { LINKS } from '../constants'

const NAV_LINKS = [
  { href: '#skills', label: 'Skills', num: '02' },
  { href: '#works', label: 'Works', num: '03' },
  { href: '#contact', label: 'Contact', num: '06' },
] as const

export default function Header() {
  return (
    <header className="sticky top-0 z-30 backdrop-blur-md bg-ink/60 border-b border-line">
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        <a
          href="#home"
          className="group flex items-center gap-3"
          aria-label="Back to top"
        >
          <span
            className="font-display text-2xl text-paper leading-none inline-flex"
            aria-hidden="true"
          >
            <span className="transition-transform duration-500 group-hover:-translate-x-0.5">
              B
            </span>
            <span className="italic text-accent transition-transform duration-500 group-hover:rotate-12">
              /
            </span>
            <span className="transition-transform duration-500 group-hover:translate-x-0.5">
              B
            </span>
          </span>
          <span className="hidden md:inline-block font-mono text-[11px] text-paper-mute tracking-widest uppercase">
            Benoit Bruynbroeck
          </span>
        </a>

        <nav
          aria-label="Primary"
          className="hidden md:flex items-center gap-6 font-mono text-[11px] tracking-widest uppercase"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-paper-dim hover:text-paper transition-colors flex items-center gap-1.5"
            >
              <span className="text-paper-mute">{link.num}</span>
              <span>{link.label}</span>
            </a>
          ))}
        </nav>

        <a
          href={LINKS.LINKEDIN}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase text-ink bg-paper hover:bg-accent transition-colors px-4 py-2 rounded-full"
        >
          Say Hello
          <span
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-0.5"
          >
            →
          </span>
        </a>
      </div>
    </header>
  )
}
