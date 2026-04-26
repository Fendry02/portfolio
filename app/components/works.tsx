'use client'

import Image from 'next/image'

import { WORKS, type Work } from '../data/works'
import { AnimatedTitle, FadeIn } from './ui'

const DELAYS = [0, 200, 400] as const

export default function Works() {
  const openModal = (id: string) => {
    ;(document.getElementById(`${id}Modal`) as HTMLDialogElement | null)?.showModal()
  }

  return (
    <section id="works" className="text-center pb-16 px-16 max-sm:px-8">
      <AnimatedTitle level={1}>Works</AnimatedTitle>
      <FadeIn as="p" delay={200} className="text-xl p-8">
        Here are projects I have worked on. Want to see more?{' '}
        <a
          className="text-secondary cursor-pointer hover:underline hover:underline-offset-4"
          href="mailto:bruy.benoit@gmail.com"
        >
          Email me.
        </a>
      </FadeIn>
      <div className="flex w-full flex-col lg:flex-row justify-center lg:gap-32 gap-4 items-center">
        {WORKS.map((work, idx) => (
          <FadeIn
            key={work.id}
            delay={DELAYS[idx]}
            className="flex-1 cursor-pointer group/caption shadow-lg hover:bg-slate-900 rounded-2xl max-w-[300px] max-h-[300px] hover:scale-105"
            onClick={() => openModal(work.id)}
          >
            <figure className="relative">
              <Image
                src={work.image}
                alt={work.imageAlt}
                className="rounded-2xl group-hover/caption:opacity-0 transition-opacity duration-300 ease-in-out w-[300px] h-[300px]"
              />
              <figcaption className="transition-opacity duration-300 ease-in-out flex flex-col justify-center absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 opacity-0 group-hover/caption:opacity-100 text-white">
                <AnimatedTitle level={1} className="text-xl md:text-4xl">
                  {work.title}
                </AnimatedTitle>
                <p className="hidden sm:block sm:text-base md:text-2xl pt-2">
                  {work.role}
                </p>
              </figcaption>
            </figure>
          </FadeIn>
        ))}
      </div>
      {WORKS.map((work) => (
        <WorkModal key={work.id} work={work} />
      ))}
    </section>
  )
}

function WorkModal({ work }: { work: Work }) {
  return (
    <dialog
      id={`${work.id}Modal`}
      className="modal modal-bottom sm:modal-middle cursor-default"
    >
      <div className="modal-box">
        <div className="flex items-center gap-4">
          <Image
            src={work.image}
            alt={`${work.title} project logo`}
            className="rounded-2xl w-[50px] h-[50px]"
          />
          <h3 className="font-bold text-lg">{work.title}</h3>
        </div>
        <p className="py-4 text-start">{work.description}</p>
        <p className="text-start">
          <b>Key Achievements:</b> {work.achievements}
        </p>
        <p className="text-start">
          <b>Stack:</b> {work.stack}
        </p>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  )
}
