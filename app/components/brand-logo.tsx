import Image from 'next/image'
import Link from 'next/link'

import logo from '@/public/logo.webp'

type BrandLogoProps = {
  className?: string
  imageClassName?: string
  priority?: boolean
}

export default function BrandLogo({
  className = '',
  imageClassName = '',
  priority = false,
}: BrandLogoProps) {
  return (
    <Link
      href="/#home"
      className={`brand-logo inline-flex items-center ${className}`}
      aria-label="Retour à l'accueil"
    >
      <span className="brand-logo-mark inline-flex rounded-lg bg-base-100 p-2 shadow-sm ring-1 ring-base-300">
        <Image
          src={logo}
          alt="Logo B/B Benoit Bruynbroeck"
          width={84}
          height={84}
          priority={priority}
          className={`h-auto w-16 md:w-[72px] ${imageClassName}`}
        />
      </span>
    </Link>
  )
}
