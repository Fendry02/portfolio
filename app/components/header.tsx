'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import BrandLogo from './brand-logo'

export default function Header() {
  const pathname = usePathname()
  const onJobs = pathname?.startsWith('/jobs') ?? false

  return (
    <header>
      <div className="navbar p-4">
        <div className="flex-1">
          <BrandLogo />
        </div>
        <div className="flex flex-none items-center gap-2">
          <Link href={onJobs ? '/' : '/jobs'} className="btn btn-ghost">
            {onJobs ? 'Accueil' : 'Parcours'}
          </Link>
          <a
            href="https://www.linkedin.com/in/benoit-bruynbroeck-a21214b4/"
            target="_blank"
            rel="noreferrer"
          >
            <button className="btn btn-primary">Me contacter</button>
          </a>
        </div>
      </div>
    </header>
  )
}
