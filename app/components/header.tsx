import Image from 'next/image'

import logo from '@/public/logo.webp'
import { LINKS } from '../constants'

const NAV_LINKS = [
  { href: '#skills', label: 'Skills' },
  { href: '#works', label: 'Works' },
  { href: '#contact', label: 'Contact' },
] as const

export default function Header() {
  return (
    <header className="sticky top-0 z-30 bg-base-100/80 backdrop-blur supports-[backdrop-filter]:bg-base-100/60">
      <div className="navbar p-4">
        <div className="flex-1">
          <a href="#home" className="cursor-pointer" aria-label="Back to top">
            <Image src={logo} alt="Benoit logo" width={60} priority />
          </a>
        </div>
        <nav
          aria-label="Primary"
          className="hidden md:flex flex-none items-center gap-1"
        >
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="btn btn-ghost btn-sm">
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex-none ml-2">
          <a
            href={LINKS.LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            Say Hello
          </a>
        </div>
      </div>
    </header>
  )
}
