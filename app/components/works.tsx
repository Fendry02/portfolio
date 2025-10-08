'use client'
import Image from 'next/image'

import citizenplane from '@/public/works/citizenplane.webp'
import businessDecision from '@/public/works/business-decision.webp'
import openclassrooms from '@/public/works/openclassrooms.webp'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

export default function Works() {
  const handleClick = (elementId: string) => {
    ;(document.getElementById(elementId) as HTMLDialogElement)?.showModal()
  }

  const { ref: titleRef, isVisible: titleVisible } =
    useScrollAnimation<HTMLHeadingElement>()
  const { ref: subtitleRef, isVisible: subtitleVisible } =
    useScrollAnimation<HTMLParagraphElement>()
  const { ref: citizenplaneRef, isVisible: citizenplaneVisible } =
    useScrollAnimation<HTMLDivElement>()
  const { ref: businessRef, isVisible: businessVisible } =
    useScrollAnimation<HTMLDivElement>()
  const { ref: openclassroomsRef, isVisible: openclassroomsVisible } =
    useScrollAnimation<HTMLDivElement>()

  return (
    <section id="works" className="text-center pb-16 px-16 max-sm:px-8">
      <h1
        ref={titleRef}
        className={`text-5xl font-bold transition-all duration-700 ${
          titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        Works
      </h1>
      <p
        ref={subtitleRef}
        className={`text-xl p-8 transition-all duration-700 delay-200 ${
          subtitleVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8'
        }`}
      >
        Here are projects I have worked on. Want to see more?{' '}
        <a
          className="text-secondary cursor-pointer hover:underline hover:underline-offset-4"
          href="mailto:bruy.benoit@gmail.com"
        >
          Email me.
        </a>
      </p>
      <div className="flex w-full flex-col lg:flex-row justify-center lg:gap-32 gap-4 items-center ">
        <div
          ref={citizenplaneRef}
          className={`flex-1 cursor-pointer group/caption shadow-lg hover:bg-slate-900 ease-in-out duration-300 rounded-2xl max-w-[300px] max-h-[300px] transition-all duration-700 hover:scale-105 ${
            citizenplaneVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
          onClick={(e) => handleClick('citizenplaneModal')}
        >
          <figure className="relative">
            <Image
              src={citizenplane}
              alt="citizenplane"
              priority={true}
              className="rounded-2xl group-hover/caption:opacity-0 transition-opacity duration-300 ease-in-out w-[300px] h-[300px]"
            />
            <figcaption className="transition-opacity duration-300 ease-in-out flex flex-col justify-center absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2  opacity-0 group-hover/caption:opacity-100 text-white">
              <h1 className="text-xl md:text-4xl font-bold">CitizenPlane</h1>
              <p className="text-base	md:text-2xl pt-2">Tech lead</p>
            </figcaption>
          </figure>
          <dialog
            id="citizenplaneModal"
            className="modal modal-bottom sm:modal-middle cursor-default"
          >
            <div className="modal-box">
              <div className="flex items-center gap-4">
                <Image
                  src={citizenplane}
                  alt="citizenplane"
                  priority={true}
                  className="rounded-2xl w-[50px] h-[50px]"
                />
                <h3 className="font-bold text-lg">CitizenPlane</h3>
              </div>
              <p className="py-4 text-start">
                As a Tech Lead, I combine hands-on technical expertise with
                leadership to drive the design, development, and delivery of
                scalable software solutions. My focus is on fostering
                collaboration, guiding teams through complex technical
                challenges, and ensuring alignment with business objectives. I
                also focused on optimizing system performance, enhancing user
                experience, and aligning technical efforts with business goals.
              </p>
              <p className="text-start">
                <b>Stack:</b> VueJs, Node.js, PostgreSQL, Docker, Kubernetes,
                AWS, RabbitMQ
              </p>
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
        <div
          ref={businessRef}
          className={`flex-1 cursor-pointer group/caption shadow-lg hover:bg-slate-900 ease-in-out duration-300 rounded-2xl max-w-[300px] max-h-[300px] transition-all duration-700 delay-200 hover:scale-105 ${
            businessVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
          onClick={(e) => handleClick('businessDecisionModal')}
        >
          <figure className="relative">
            <Image
              src={businessDecision}
              alt="businessDecision"
              priority={true}
              className="rounded-2xl group-hover/caption:opacity-0 transition-opacity duration-300 ease-in-out w-[300px] h-[300px]"
            />
            <figcaption className="transition-opacity duration-300 ease-in-out flex flex-col justify-center absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 opacity-0 group-hover/caption:opacity-100 text-white">
              <h1 className="text-xl md:text-4xl font-bold">
                Business & Decision
              </h1>
              <p className="hidden sm:block sm:text-base	md:text-2xl pt-2">
                Consultant for Accor Hotels
              </p>
            </figcaption>
          </figure>
          <dialog
            id="businessDecisionModal"
            className="modal modal-bottom sm:modal-middle cursor-default"
          >
            <div className="modal-box">
              <div className="flex items-center gap-4">
                <Image
                  src={businessDecision}
                  alt="businessDecision"
                  priority={true}
                  className="rounded-2xl w-[50px] h-[50px]"
                />
                <h3 className="font-bold text-lg">Business & Decision</h3>
              </div>
              <p className="py-4 text-start">
                At Business & Decision, I worked as a CRM Consultant, managing
                multiple high-profile accounts simultaneously. My role involved
                understanding and addressing clients data management needs,
                designing tailored solutions, and supporting the software
                development program. I collaborated closely with clients to
                implement efficient CRM strategies, ensuring seamless
                integration with existing systems. Additionally, I provided
                guidance on data governance, optimized workflows, and helped
                drive the successful delivery of software projects that aligned
                with business objectives.
              </p>
              <p className="text-start">
                <b>Stack:</b> Adobe Campaign, Talend, SQL
              </p>
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
        <div
          ref={openclassroomsRef}
          className={`flex-1 cursor-pointer group/caption shadow-lg hover:bg-slate-900 ease-in-out duration-300 rounded-2xl max-w-[300px] max-h-[300px] transition-all duration-700 delay-400 hover:scale-105 ${
            openclassroomsVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
          onClick={(e) => handleClick('openclassroomsModal')}
        >
          <figure className="relative">
            <Image
              src={openclassrooms}
              alt="openclassrooms"
              priority={true}
              className="rounded-2xl group-hover/caption:opacity-0 transition-opacity duration-300 ease-in-out w-[300px] h-[300px]"
            />
            <figcaption className="transition-opacity duration-300 ease-in-out flex flex-col justify-center absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 opacity-0 group-hover/caption:opacity-100 text-white">
              <h1 className="text-xl md:text-4xl font-bold">Openclassrooms</h1>
              <p className="hidden sm:block sm:text-base	md:text-2xl pt-2">
                Mentor for Web Development
              </p>
            </figcaption>
          </figure>
          <dialog
            id="openclassroomsModal"
            className="modal modal-bottom sm:modal-middle cursor-default"
          >
            <div className="modal-box">
              <div className="flex items-center gap-4">
                <Image
                  src={openclassrooms}
                  alt="openclassrooms"
                  priority={true}
                  className="rounded-2xl w-[50px] h-[50px]"
                />
                <h3 className="font-bold text-lg">Openclassrooms</h3>
              </div>
              <p className="py-4 text-start">
                At OpenClassrooms, I mentor students enrolled in web development
                programs, particularly those focusing on React. I guide them
                through their learning journey by answering their questions,
                providing personalized lessons, and offering tailored support to
                help them succeed. My role involves reviewing their projects,
                giving constructive feedback, and ensuring they grasp key
                concepts and best practices in software development. By
                fostering a supportive learning environment, I help students
                build confidence, master technical skills, and achieve their
                educational and professional goals.
              </p>
              <p className="text-start">
                <b>Stack:</b> React, JavaScript, HTML, CSS
              </p>
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>
    </section>
  )
}
