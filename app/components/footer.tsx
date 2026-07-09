import Image from 'next/image'
import Link from 'next/link'

import BrandLogo from './brand-logo'
import { serviceRoutes, siteConfig } from '@/app/lib/seo'
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

const navLinks = [
  { label: 'Accueil', href: '/' },
  { label: 'Services', href: serviceRoutes.websiteCreationLyon },
  { label: 'Parcours', href: '/jobs' },
  { label: 'Contact', href: '/#contact' },
]

const legalLinks = [
  { label: 'Mentions légales', href: '/mentions-legales' },
  { label: 'Confidentialité', href: '/confidentialite' },
]

const linkClass =
  'interactive text-sm text-base-content/60 hover:text-base-content'
const columnTitle =
  'text-xs font-semibold uppercase tracking-[0.16em] text-base-content/60'

export default function Footer() {
  return (
    <footer className="border-t border-base-300">
      <div className="mx-auto max-w-6xl px-6 py-14 lg:px-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div className="max-w-sm">
            <BrandLogo size="sm" />
            <p className="mt-4 text-sm leading-6 text-base-content/60">
              Sites web et applications sur mesure pour PME et indépendants, du
              cadrage à la mise en ligne.
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="interactive mt-4 inline-block text-sm font-medium text-[color:var(--brand-blue)] hover:underline"
            >
              {siteConfig.email}
            </a>
          </div>

          <nav aria-label="Navigation de pied de page">
            <p className={columnTitle}>Navigation</p>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Informations légales">
            <p className={columnTitle}>Légal</p>
            <ul className="mt-4 space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-5 border-t border-base-300 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-base-content/60">
            © {currentYear} {siteConfig.name}. Conçu et développé par mes soins.
          </p>
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
        </div>
      </div>
    </footer>
  )
}
