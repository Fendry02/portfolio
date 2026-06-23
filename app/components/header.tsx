'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import BrandLogo from './brand-logo'

export default function Header() {
  const pathname = usePathname()
  const onJobs = pathname?.startsWith('/jobs') ?? false

  return (
    <header className="border-b border-base-300">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-10">
        <BrandLogo />

        <div className="flex items-center gap-1">
          <Link
            href={onJobs ? '/' : '/jobs'}
            className="interactive rounded-lg px-3 py-2 text-sm font-medium text-base-content/70 hover:bg-base-200 hover:text-base-content"
          >
            {onJobs ? 'Accueil' : 'Parcours'}
          </Link>
          <a
            href="https://www.linkedin.com/in/benoit-bruynbroeck-a21214b4/"
            target="_blank"
            rel="noreferrer"
            className="interactive ml-1 inline-flex items-center gap-2 rounded-lg bg-[#2563eb] px-4 py-2 text-sm font-medium text-white hover:bg-[#1d4ed8]"
          >
            Me contacter
          </a>
        </div>
      </div>
    </header>
  )
}
