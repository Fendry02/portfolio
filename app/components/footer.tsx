import Image from 'next/image'

import logo from '@/public/logo-white.webp'
import github from '@/public/socials/github.svg'
import linkedin from '@/public/socials/linkedin.svg'
import facebook from '@/public/socials/facebook.svg'
import { LINKS } from '../constants'
import { FadeIn } from './ui'

const SOCIALS = [
  { href: LINKS.GITHUB, icon: github, alt: "GitHub profile - View Benoit's code repositories and projects" },
  { href: LINKS.FACEBOOK, icon: facebook, alt: 'Facebook profile - Connect with Benoit on Facebook' },
  { href: LINKS.LINKEDIN, icon: linkedin, alt: 'LinkedIn profile - Connect with Benoit on LinkedIn for professional networking' },
] as const

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer footer-center p-16 pt-32 max-sm:pt-40 bg-primary text-primary-content gap-y-6">
      <FadeIn>
        <Image src={logo} alt="Benoit logo" width={60} />
        <p className="font-bold">Handcrafted by me</p>
      </FadeIn>
      <FadeIn delay={200}>
        <div className="grid grid-flow-col gap-4">
          {SOCIALS.map((social) => (
            <a
              key={social.href}
              className="cursor-pointer"
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={social.icon}
                alt={social.alt}
                width={24}
                className="opacity-90"
              />
            </a>
          ))}
        </div>
        <p>Copyright © {currentYear} - All right reserved</p>
      </FadeIn>
    </footer>
  )
}
