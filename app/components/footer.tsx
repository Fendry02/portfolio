'use client'

import Image from 'next/image'

import logo from '@/public/logo-white.webp'
import github from '@/public/socials/github.svg'
import linkedin from '@/public/socials/linkedin.svg'
import facebook from '@/public/socials/facebook.svg'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

export default function Footer() {
  const currentYear = 2025
  const { ref: logoRef, isVisible: logoVisible } =
    useScrollAnimation<HTMLDivElement>()
  const { ref: socialsRef, isVisible: socialsVisible } =
    useScrollAnimation<HTMLDivElement>()

  return (
    <footer className="footer footer-center p-16 pt-32 max-sm:pt-40 bg-primary text-primary-content gap-y-6">
      <div
        ref={logoRef}
        className={`transition-all duration-700 ${
          logoVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <Image src={logo} alt="Benoit logo" width={60} />
        <p className="font-bold">Handcrafted by me</p>
      </div>
      <div
        ref={socialsRef}
        className={`transition-all duration-700 delay-200 ${
          socialsVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="grid grid-flow-col gap-4">
          <a
            className="cursor-pointer"
            href="https://github.com/Fendry02"
            target="_blank"
          >
            <Image
              src={github}
              alt="GitHub profile - View Benoit's code repositories and projects"
              width={24}
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
              alt="Facebook profile - Connect with Benoit on Facebook"
              width={24}
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
              alt="LinkedIn profile - Connect with Benoit on LinkedIn for professional networking"
              width={24}
              className="opacity-90"
            />
          </a>
        </div>
        <p>Copyright © {currentYear} - All right reserved</p>
      </div>
    </footer>
  )
}
