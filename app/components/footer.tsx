import Image from 'next/image'

import github from '@/public/socials/github.svg'
import linkedin from '@/public/socials/linkedin.svg'
import facebook from '@/public/socials/facebook.svg'
import { LINKS } from '../constants'

const SOCIALS = [
  { href: LINKS.GITHUB, icon: github, label: 'GitHub' },
  { href: LINKS.LINKEDIN, icon: linkedin, label: 'LinkedIn' },
  { href: LINKS.FACEBOOK, icon: facebook, label: 'Facebook' },
] as const

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="px-6 md:px-12 py-16 border-t border-line">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-7">
            <p className="font-display text-paper text-4xl md:text-5xl leading-[1]">
              Built by hand,
              <br />
              <span className="italic text-accent">shipped with care</span>.
            </p>
          </div>
          <div className="md:col-span-5 md:text-right">
            <ul className="flex md:justify-end gap-6">
              {SOCIALS.map((social) => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="group inline-flex items-center gap-2 text-paper-dim hover:text-paper transition-colors"
                  >
                    <Image
                      src={social.icon}
                      alt=""
                      width={18}
                      className="opacity-70 group-hover:opacity-100 invert"
                    />
                    <span className="font-mono text-[11px] tracking-widest uppercase">
                      {social.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-line flex flex-col md:flex-row justify-between gap-4 font-mono text-[11px] text-paper-mute tracking-widest uppercase">
          <span>© {currentYear} Benoit Bruynbroeck</span>
          <span>Made in France · v2026</span>
        </div>
      </div>
    </footer>
  )
}
