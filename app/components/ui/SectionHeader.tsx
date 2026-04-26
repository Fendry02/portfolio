import { FadeIn } from './FadeIn'

interface SectionHeaderProps {
  num: string
  eyebrow: string
  title: React.ReactNode
  align?: 'left' | 'center'
}

export function SectionHeader({
  num,
  eyebrow,
  title,
  align = 'left',
}: SectionHeaderProps) {
  return (
    <header
      className={`flex flex-col gap-4 ${align === 'center' ? 'items-center text-center' : ''}`}
    >
      <FadeIn className="flex items-center gap-3">
        <span className="font-mono text-[11px] text-paper-mute tracking-widest">
          {num}
        </span>
        <span className="h-px w-12 bg-line" aria-hidden="true" />
        <span className="eyebrow">{eyebrow}</span>
      </FadeIn>
      <FadeIn delay={100}>
        <h2 className="font-display text-paper text-[length:var(--text-display-md)] leading-[1.05]">
          {title}
        </h2>
      </FadeIn>
    </header>
  )
}
