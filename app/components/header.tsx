import Image from 'next/image'

import logo from '@/public/logo.webp'

export default function Header() {
  return (
    <header>
      <div className="navbar p-4">
        <div className="flex-1">
          <a href="#home" className="cursor-pointer">
            <Image src={logo} alt="Benoit logo" width={60} priority={true} />
          </a>
        </div>
        <div className="flex-none">
          <a
            href="https://www.linkedin.com/in/benoit-bruynbroeck-a21214b4/"
            target="_blank"
          >
            <button className="btn btn-secondary">Say Hello</button>
          </a>
        </div>
      </div>
    </header>
  )
}
