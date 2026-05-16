import Link from 'next/link'

import BrandLogo from './brand-logo'

export default function Header() {
  return (
    <header>
      <div className="navbar p-4">
        <div className="flex-1">
          <BrandLogo />
        </div>
        <div className="flex flex-none items-center gap-2">
          <Link href="/jobs" className="btn btn-ghost">
            Parcours
          </Link>
          <a
            href="https://www.linkedin.com/in/benoit-bruynbroeck-a21214b4/"
            target="_blank"
          >
            <button className="btn btn-primary">Me contacter</button>
          </a>
        </div>
      </div>
    </header>
  )
}
