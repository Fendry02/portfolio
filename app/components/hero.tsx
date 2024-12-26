'use client'

import Image from 'next/image'

import profile from '@/public/profile.png'
import tech from '@/public/tech.svg'

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content text-center flex flex-col pb-0">
        <div className="hero-body pt-16">
          <h1 className="text-4xl font-bold mb-5 max-sm:text-2xl">
            Hi, I am Benoit Bruynbroeck
          </h1>
          <h3 className="text-3xl max-sm:text-xl">
            I am a javascript tech lead full stack developer
          </h3>
          <div className="avatar max-w-[250px] max-sm:max-w-[200px] max-sm:pt-8">
            <Image
              src={profile}
              alt="profile"
              priority={true}
              className="pt-12"
            />
          </div>
        </div>
        <div className="hero-footer container">
          <Image
            src={tech}
            alt="tech"
            priority={true}
            className="mx-auto pt-12 max-w-3xl max-sm:max-w-full"
          />
        </div>
      </div>
    </section>
  )
}
