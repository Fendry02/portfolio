import { LINKS } from '../constants'
import { AnimatedTitle, FadeIn } from './ui'

export default function Contact() {
  return (
    <section id="contact" className="px-32 max-sm:px-8 shadow-lg">
      <FadeIn className="bg-neutral rounded-xl text-white text-center p-8 relative top-16 max-sm:top-32">
        <div className="flex w-full flex-col lg:flex-row">
          <div className="card grid flex-grow place-items-center flex-1">
            <AnimatedTitle level={3} delay={100} className="text-2xl font-bold">
              Start a project
            </AnimatedTitle>
          </div>
          <div className="divider lg:divider-horizontal divider-primary"></div>
          <FadeIn
            delay={200}
            className="card grid flex-grow place-items-center flex-1"
          >
            Interested in working together? <br /> We should queue up a time to
            chat.
          </FadeIn>
          <div className="divider lg:divider-horizontal divider-primary"></div>
          <FadeIn
            delay={300}
            className="card grid flex-grow place-items-center flex-1"
          >
            <div className="flex flex-col gap-4">
              <a
                href={LINKS.LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-lg btn-secondary"
              >
                LinkedIn
              </a>
              <a
                href={LINKS.EMAIL}
                className="btn btn-lg btn-outline btn-secondary"
              >
                Email Me
              </a>
              <a
                href={LINKS.GITHUB}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-lg btn-outline btn-secondary"
              >
                GitHub
              </a>
            </div>
          </FadeIn>
        </div>
      </FadeIn>
    </section>
  )
}
