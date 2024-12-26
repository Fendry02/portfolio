import Image from 'next/image'

import citizenplane from '@/public/works/citizenplane.png'
import businessDecision from '@/public/works/business-decision.png'
import openclassrooms from '@/public/works/openclassrooms.png'

export default function Works() {
  return (
    <section className="text-center pb-16 px-16 max-sm:px-8">
      <h1 className="text-5xl font-bold">Works</h1>
      <p className="text-xl p-8">
        Here are projects I have worked on. Want to see more?{' '}
        <a
          className="text-secondary cursor-pointer hover:underline hover:underline-offset-4"
          href="mailto:bruy.benoit@gmail.com"
        >
          Email me.
        </a>
      </p>
      <div className="flex flex-wrap mx-auto justify-center	gap-8">
        <div className="flex-1 group/caption shadow-lg hover:bg-slate-900 ease-in duration-300 rounded-2xl max-w-[300px] max-h-[300px]">
          <a
            href="https://citizenplane.com/"
            target="_blank"
            className="cursor-pointer"
          >
            <figure className="relative">
              <Image
                src={citizenplane}
                alt="citizenplane"
                priority={true}
                className="rounded-2xl group-hover/caption:opacity-0 ease-in duration-300 w-full"
              />
              <figcaption className="ease-in duration-300 flex flex-col justify-center absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2  opacity-0 group-hover/caption:opacity-100 text-white">
                <h1 className="text-xl md:text-4xl font-bold">CitizenPlane</h1>
                <p className="text-base	md:text-2xl pt-2">Tech lead</p>
              </figcaption>
            </figure>
          </a>
        </div>
        <div className="flex-1 group/caption shadow-lg hover:bg-slate-900 ease-in duration-300 rounded-2xl max-w-[300px] max-h-[300px]">
          <a
            href="https://www.businessdecision.com/fr-fr"
            target="_blank"
            className="cursor-pointer"
          >
            <figure className="relative">
              <Image
                src={businessDecision}
                alt="businessDecision"
                priority={true}
                className="rounded-2xl group-hover/caption:opacity-0 ease-in duration-300 w-full"
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
          </a>
        </div>
        <div className="flex-1 group/caption shadow-lg hover:bg-slate-900 ease-in duration-300 rounded-2xl max-w-[300px] max-h-[300px]">
          <a
            href="https://openclassrooms.com/fr/"
            target="_blank"
            className="cursor-pointer"
          >
            <figure className="relative">
              <Image
                src={openclassrooms}
                alt="openclassrooms"
                priority={true}
                className="rounded-2xl group-hover/caption:opacity-0 ease-in duration-300 w-full"
              />
              <figcaption className="ease-in duration-300 flex flex-col justify-center absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 opacity-0 group-hover/caption:opacity-100 text-white">
                <h1 className="text-xl md:text-4xl font-bold">
                  Openclassrooms
                </h1>
                <p className="hidden sm:block sm:text-base	md:text-2xl pt-2">
                  Mentor for Web Development
                </p>
              </figcaption>
            </figure>
          </a>
        </div>
      </div>
    </section>
  )
}
