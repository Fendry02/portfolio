import Image from 'next/image'

import logo from '@/public/logo.png'

export default function Header() {
  return (
    <header>
      <div className="navbar p-4 bg-base-100">
        <div className="flex-1">
          <Image src={logo} alt="Benoit logo" width={60} priority={true} />
        </div>
        <div className="flex-none">
          <button className="btn btn-secondary">Say Hello</button>
        </div>
      </div>
    </header>
  )
}
