import Image from 'next/image'

import logo from '@/public/logo-white.png'
import github from '@/public/socials/github.svg'
import linkedin from '@/public/socials/linkedin.svg'
import facebook from '@/public/socials/facebook.svg'

export default function Footer() {
  return (
    <footer className="footer footer-center p-10 bg-primary text-primary-content gap-y-6">
      <div>
        <Image src={logo} alt="Benoit logo" width={60} priority={true} />
        <p className="font-bold">Handcrafted by me</p>
      </div>
      <div>
        <div className="grid grid-flow-col gap-4">
          <a
            className="cursor-pointer"
            href="https://github.com/Fendry02"
            target="_blank"
          >
            <Image
              src={github}
              alt="github"
              width={24}
              priority={true}
              className="opacity-90"
            />
          </a>
          <a
            className="cursor-pointer"
            href="https://www.facebook.com/benoit.bruynbroeck/"
            target="_blank"
          >
            <Image
              src={facebook}
              alt="facebook"
              width={24}
              priority={true}
              className="opacity-90"
            />
          </a>
          <a
            className="cursor-pointer"
            href="https://www.linkedin.com/in/benoit-bruynbroeck-a21214b4/"
            target="_blank"
          >
            <Image
              src={linkedin}
              alt="linkedin"
              width={24}
              priority={true}
              className="opacity-90"
            />
          </a>
        </div>
        <p>Copyright © 2025 - All right reserved</p>
      </div>
    </footer>
  )
}
