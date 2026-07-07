import Image from 'next/image'

import BrandLogo from './brand-logo'
import github from '@/public/socials/github.svg'
import linkedin from '@/public/socials/linkedin.svg'
import facebook from '@/public/socials/facebook.svg'

const currentYear = 2026

const socials = [
  {
    href: 'https://github.com/Fendry02',
    src: github,
    alt: 'GitHub - Benoit Bruynbroeck',
  },
  {
    href: 'https://www.linkedin.com/in/benoit-bruynbroeck-a21214b4/',
    src: linkedin,
    alt: 'LinkedIn - Benoit Bruynbroeck',
  },
  {
    href: 'https://www.facebook.com/benoit.bruynbroeck/',
    src: facebook,
    alt: 'Facebook - Benoit Bruynbroeck',
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-base-300">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 py-10 sm:flex-row sm:items-center lg:px-10">
        <div className="flex items-center gap-4">
          <BrandLogo size="sm" />
          <p className="text-sm text-base-content/55">
            Conçu et développé par mes soins.
          </p>
        </div>

        <div className="flex items-center gap-5">
          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="interactive opacity-50 hover:opacity-100"
                aria-label={s.alt}
              >
                <Image
                  src={s.src}
                  alt=""
                  width={16}
                  height={16}
                  className="h-4 w-4"
                />
              </a>
            ))}
          </div>
          <p className="text-xs text-base-content/45">© {currentYear}</p>
        </div>
      </div>
    </footer>
  )
}
