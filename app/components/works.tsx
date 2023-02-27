import Image from 'next/image'

import citizenplane from '@/public/citizenplane.png'
import businessDecision from '@/public/business-decision.png'

export default function Works() {
  return (
    <section className="bg-base-100 text-center  pb-16">
      <h1 className="text-5xl font-bold">Works</h1>
      <p className="text-xl p-8">
        Here are projects I have worked on. Want to see more?{' '}
        <a
          className="text-secondary"
          href="mailto:bruy.benoit@gmail.com"
          cursor-pointer
        >
          Email me.
        </a>
      </p>
      <div className="flex flex-wrap max-w-[90%] mx-auto justify-center	gap-8">
        <div className="flex-1 group/caption hover:bg-slate-900 ease-in duration-300 rounded-lg max-w-[300px] max-h-[300px]">
          <figure className="relative">
            <Image
              src={citizenplane}
              alt="citizenplane"
              priority={true}
              className="rounded-lg group-hover/caption:opacity-0 ease-in duration-300 w-full"
            />
            <figcaption className="ease-in duration-300 flex flex-col justify-center absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2  opacity-0 group-hover/caption:opacity-100 text-white">
              <h1 className="text-xl md:text-4xl font-bold">CitizenPlane</h1>
              <p className="text-base	md:text-2xl pt-2">Fullstack developer</p>
            </figcaption>
          </figure>
        </div>
        <div className="flex-1 group/caption hover:bg-slate-900 ease-in duration-300 rounded-lg max-w-[300px] max-h-[300px]">
          <figure className="relative">
            <Image
              src={businessDecision}
              alt="businessDecision"
              priority={true}
              className="rounded-lg group-hover/caption:opacity-0 ease-in duration-300 w-full"
            />
            <figcaption className="ease-in duration-300 flex flex-col justify-center absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 opacity-0 group-hover/caption:opacity-100 text-white">
              <h1 className="text-xl md:text-4xl font-bold">
                Business & Decision
              </h1>
              <p className="hidden sm:block sm:text-base	md:text-2xl pt-2">
                Consultant for Accor Hotels
              </p>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
