import Image from 'next/image'

import technical from '@/public/benefits/technical.webp'
import methodology from '@/public/benefits/methodology.webp'
import communication from '@/public/benefits/communication.webp'

export default function Benefits() {
  return (
    <section className="text-center p-16 pt-0 max-sm:p-8 max-sm:pt-0">
      <h1 className="text-5xl font-bold">Benefits of working with me</h1>
      <div className="flex flex-wrap mx-auto justify-center	gap-8 pt-8">
        <div className="flex w-full flex-col lg:flex-row">
          <div className="card rounded-box flex-grow place-items-center p-8 shadow-lg">
            <div className="relative w-full aspect-square max-w-[200px] max-h-[200px]">
              <Image
                src={technical}
                alt="Technical expertise illustration"
                fill
                sizes="(max-width: 768px) 100vw, 300px"
                priority
                className="rounded-2xl object-contain"
              />
            </div>
            <h3 className="text-2xl font-bold py-4 text-secondary">
              Technical Expertise
            </h3>
            <p>
              Mastery of modern JavaScript, PostgreSQL, and clean coding
              practices. I deliver robust, scalable solutions tailored to your
              needs.
            </p>
          </div>
          <div className="divider lg:divider-horizontal divider-primary max-lg:hidden"></div>
          <div className="card rounded-box flex-grow place-items-center p-8 shadow-lg">
            <div className="relative w-full aspect-square max-w-[200px] max-h-[200px]">
              <Image
                src={methodology}
                alt="methodology illustration"
                fill
                sizes="(max-width: 768px) 100vw, 300px"
                priority
                className="rounded-2xl object-contain"
              />
            </div>
            <h3 className="text-2xl font-bold py-4 text-secondary">
              Efficient Methodology
            </h3>
            <p>
              I follow a structured, functional approach that ensures your
              project is completed on time and within scope, without
              compromising on quality.
            </p>
          </div>
          <div className="divider lg:divider-horizontal divider-primary max-lg:hidden"></div>
          <div className="card rounded-box flex-grow place-items-center p-8 shadow-lg">
            <div className="relative w-full aspect-square max-w-[200px] max-h-[200px]">
              <Image
                src={communication}
                alt="communication illustration"
                fill
                sizes="(max-width: 768px) 100vw, 300px"
                priority
                className="rounded-2xl object-contain"
              />
            </div>
            <h3 className="text-2xl font-bold py-4 text-secondary">
              Clear Communication
            </h3>
            <p>
              I am committed to keeping you informed and involved every step of
              the way. Transparent, timely, and effective communication is key.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
