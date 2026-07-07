import Link from 'next/link'

type BrandLogoProps = {
  className?: string
  tone?: 'dark' | 'light'
  size?: 'sm' | 'md' | 'lg'
}

const sizeClass: Record<NonNullable<BrandLogoProps['size']>, string> = {
  sm: 'text-[1.75rem]',
  md: 'text-[2.25rem] md:text-[2.5rem]',
  lg: 'text-[2.75rem] md:text-[3.5rem]',
}

export default function BrandLogo({
  className = '',
  tone = 'dark',
  size = 'md',
}: BrandLogoProps) {
  const textColor = tone === 'light' ? 'text-primary-content' : 'text-primary'

  return (
    <Link
      href="/#home"
      className={`brand-logo inline-flex items-baseline leading-none ${className}`}
      aria-label="Benoit Bruynbroeck - retour à l'accueil"
    >
      <span
        className={`brand-logo-mark font-[family-name:var(--font-handwriting)] font-bold tracking-tight ${sizeClass[size]} ${textColor}`}
      >
        B<span className="mx-[2px] text-secondary">/</span>B
      </span>
    </Link>
  )
}
