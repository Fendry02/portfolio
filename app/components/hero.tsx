import Image from 'next/image'

import profile from '@/public/profile.png'
import tech from '@/public/tech.svg'

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content text-center flex flex-col pb-0">
        <div className="hero-body pt-16">
          <h1 className="text-5xl font-bold">Hi, I am Benoit Bruynbroeck,</h1>
          <h1 className="text-5xl">I am a Full Stack Developer</h1>
          <div className="avatar max-w-[250px]">
            <Image
              src={profile}
              alt="profile"
              priority={true}
              className="py-8"
            />
          </div>
        </div>
        <div className="hero-footer container">
          <Image
            src={tech}
            alt="tech"
            priority={true}
            className="mx-auto pt-6"
          />
        </div>
      </div>
    </section>
  )
}
