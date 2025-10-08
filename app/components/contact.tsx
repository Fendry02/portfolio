'use client'

import { useScrollAnimation } from '../hooks/useScrollAnimation'

export default function Contact() {
  const { ref: containerRef, isVisible: containerVisible } =
    useScrollAnimation<HTMLDivElement>()
  const { ref: titleRef, isVisible: titleVisible } =
    useScrollAnimation<HTMLHeadingElement>()
  const { ref: descriptionRef, isVisible: descriptionVisible } =
    useScrollAnimation<HTMLDivElement>()
  const { ref: buttonRef, isVisible: buttonVisible } =
    useScrollAnimation<HTMLDivElement>()

  return (
    <section id="contact" className="px-32 max-sm:px-8 shadow-lg">
      <div
        ref={containerRef}
        className={`bg-neutral rounded-xl text-white text-center p-8 relative top-16 max-sm:top-32 transition-all duration-700 ${
          containerVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="flex w-full flex-col lg:flex-row">
          <div
            ref={titleRef}
            className={`card grid flex-grow place-items-center flex-1 transition-all duration-700 delay-100 ${
              titleVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <h3 className="text-2xl font-bold">Start a project</h3>
          </div>
          <div className="divider lg:divider-horizontal divider-primary"></div>
          <div
            ref={descriptionRef}
            className={`card grid flex-grow place-items-center flex-1 transition-all duration-700 delay-200 ${
              descriptionVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            Interested in working together? <br /> We should queue up a time to
            chat.
          </div>
          <div className="divider lg:divider-horizontal divider-primary"></div>
          <div
            ref={buttonRef}
            className={`card grid flex-grow place-items-center flex-1 transition-all duration-700 delay-300 ${
              buttonVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex-none">
              <a
                href="https://www.linkedin.com/in/benoit-bruynbroeck-a21214b4/"
                target="_blank"
              >
                <button className="btn btn-lg btn-secondary">Say Hello</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
