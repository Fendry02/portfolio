'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import BrandLogo from './brand-logo'

type NavItem = {
  label: string
  href: string
  key: 'home' | 'services' | 'jobs' | 'contact'
  primary?: boolean
}

const navItems: NavItem[] = [
  { label: 'Accueil', href: '/', key: 'home' },
  { label: 'Services', href: '/#offres', key: 'services' },
  { label: 'Parcours', href: '/jobs', key: 'jobs' },
  {
    label: 'Discuter de mon projet',
    href: '/#contact',
    key: 'contact',
    primary: true,
  },
]

export default function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const updateHeaderState = () => {
      setIsScrolled(window.scrollY > 8)
    }

    updateHeaderState()
    window.addEventListener('scroll', updateHeaderState, { passive: true })

    return () => window.removeEventListener('scroll', updateHeaderState)
  }, [])

  const activeKey =
    pathname === '/'
      ? 'home'
      : pathname?.startsWith('/services')
        ? 'services'
        : pathname?.startsWith('/jobs')
          ? 'jobs'
          : undefined

  return (
    <header className={`qclay-site-header ${isScrolled ? 'is-scrolled' : ''}`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-10">
        <BrandLogo />

        <nav
          aria-label="Navigation principale"
          className="hidden items-center gap-1 sm:flex"
        >
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              aria-current={activeKey === item.key ? 'page' : undefined}
              className={
                item.primary
                  ? 'interactive ml-1 inline-flex items-center gap-2 rounded-lg bg-[color:var(--brand-blue)] px-4 py-2 text-sm font-medium text-white hover:bg-[color:var(--brand-blue-strong)]'
                  : 'interactive rounded-lg px-3 py-2 text-sm font-medium text-base-content/70 hover:bg-base-200 hover:text-base-content aria-[current=page]:bg-base-200 aria-[current=page]:text-base-content'
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
          className="interactive inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-base-300 bg-base-100/80 sm:hidden"
        >
          <span className="sr-only">
            {menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          </span>
          <span
            aria-hidden="true"
            className={`relative block h-4 w-5 text-base-content transition-transform duration-300 ease-[var(--ease-qclay)] motion-reduce:transition-none ${
              menuOpen ? 'rotate-90' : 'rotate-0'
            }`}
          >
            <span
              className={`absolute left-0 top-0 h-0.5 w-5 origin-center rounded-full bg-current transition-[transform,width] duration-300 ease-[var(--ease-qclay)] motion-reduce:transition-none ${
                menuOpen ? 'w-5 translate-y-[7px] rotate-45' : 'w-5'
              }`}
            />
            <span
              className={`absolute left-0 top-[7px] h-0.5 rounded-full bg-current transition-[opacity,transform,width] duration-200 ease-[var(--ease-qclay)] motion-reduce:transition-none ${
                menuOpen
                  ? 'w-2 translate-x-3 opacity-0'
                  : 'w-5 translate-x-0 opacity-100'
              }`}
            />
            <span
              className={`absolute bottom-0 left-0 h-0.5 w-5 origin-center rounded-full bg-current transition-transform duration-300 ease-[var(--ease-qclay)] motion-reduce:transition-none ${
                menuOpen ? '-translate-y-[7px] -rotate-45' : ''
              }`}
            />
          </span>
        </button>
      </div>

      <nav
        id="mobile-navigation"
        aria-label="Navigation mobile"
        aria-hidden={!menuOpen}
        className={`qclay-mobile-nav grid overflow-hidden px-4 transition-[grid-template-rows,opacity,transform] duration-300 ease-[var(--ease-qclay)] motion-reduce:transition-none sm:hidden ${
          menuOpen
            ? 'grid-rows-[1fr] translate-y-0 opacity-100'
            : 'pointer-events-none grid-rows-[0fr] -translate-y-2 opacity-0'
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="grid gap-1 pb-4 pt-3">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                tabIndex={menuOpen ? undefined : -1}
                aria-current={activeKey === item.key ? 'page' : undefined}
                className={
                  item.primary
                    ? 'interactive mt-2 inline-flex items-center justify-center rounded-lg bg-[color:var(--brand-blue)] px-4 py-3 text-sm font-medium text-white hover:bg-[color:var(--brand-blue-strong)]'
                    : 'interactive rounded-lg px-3 py-3 text-sm font-medium text-base-content/70 hover:bg-base-200 hover:text-base-content aria-[current=page]:bg-base-200 aria-[current=page]:text-base-content'
                }
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  )
}
