import { LINKS, OPTIONAL_LINKS } from '../constants'
import { FadeIn } from './ui'

interface CTA {
  href: string
  label: string
  hint: string
  primary?: boolean
  external?: boolean
}

const CTAS: CTA[] = [
  {
    href: LINKS.LINKEDIN,
    label: 'LinkedIn',
    hint: 'Reach out',
    primary: true,
    external: true,
  },
  ...(OPTIONAL_LINKS.CALENDLY
    ? [
        {
          href: OPTIONAL_LINKS.CALENDLY,
          label: 'Book 30 min',
          hint: 'Calendly',
          external: true,
        } as CTA,
      ]
    : []),
  { href: LINKS.EMAIL, label: 'bruy.benoit@gmail.com', hint: 'Email' },
  ...(OPTIONAL_LINKS.CV
    ? [{ href: OPTIONAL_LINKS.CV, label: 'Download CV', hint: 'PDF' } as CTA]
    : []),
  {
    href: LINKS.GITHUB,
    label: 'GitHub',
    hint: '@Fendry02',
    external: true,
  },
]

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative px-6 md:px-12 py-[var(--space-section)] bg-ink-2/40 border-y border-line accent-glow overflow-hidden"
    >
      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-end">
        <FadeIn className="lg:col-span-8">
          <p className="font-mono text-[11px] text-paper-mute tracking-widest uppercase mb-6">
            08 — Let&apos;s talk
          </p>
          <h2 className="font-display text-paper text-[length:var(--text-display-lg)] leading-[0.95]">
            Have a project worth
            <br />
            <span className="italic text-accent">building well</span>?
          </h2>
        </FadeIn>

        <FadeIn delay={200} className="lg:col-span-4 flex flex-col gap-3">
          {CTAS.map((cta) => (
            <a
              key={cta.href}
              href={cta.href}
              target={cta.external ? '_blank' : undefined}
              rel={cta.external ? 'noopener noreferrer' : undefined}
              className={
                cta.primary
                  ? 'group flex items-center justify-between gap-4 bg-accent text-ink rounded-full px-6 py-4 hover:bg-paper transition-colors'
                  : 'group flex items-center justify-between gap-4 border border-line text-paper rounded-full px-6 py-4 hover:border-paper transition-colors'
              }
            >
              <span className="font-medium">{cta.label}</span>
              <span
                aria-hidden="true"
                className={
                  cta.primary
                    ? 'font-mono text-xs uppercase tracking-widest opacity-70 group-hover:opacity-100'
                    : 'font-mono text-xs uppercase tracking-widest text-paper-mute group-hover:text-paper'
                }
              >
                {cta.hint} →
              </span>
            </a>
          ))}
        </FadeIn>
      </div>
    </section>
  )
}
