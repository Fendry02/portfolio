import Link from 'next/link'

type BrandLogoProps = {
  className?: string
  tone?: 'dark' | 'light'
  size?: 'sm' | 'md' | 'lg'
}

const sizeClass: Record<NonNullable<BrandLogoProps['size']>, string> = {
  sm: 'text-xl',
  md: 'text-2xl md:text-[1.75rem]',
  lg: 'text-3xl md:text-4xl',
}

export default function BrandLogo({
  className = '',
  tone = 'dark',
  size = 'md',
}: BrandLogoProps) {
  const textColor =
    tone === 'light' ? 'text-primary-content' : 'text-primary'

  return (
    <Link
      href="/#home"
      className={`brand-logo inline-flex items-baseline leading-none ${className}`}
      aria-label="Benoit Bruynbroeck — retour à l'accueil"
    >
      <span
        className={`brand-logo-mark font-extrabold tracking-tighter ${sizeClass[size]} ${textColor}`}
      >
        B
        <span className="mx-[1px] text-secondary">/</span>
        B
      </span>
    </Link>
  )
}
