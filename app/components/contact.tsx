export default function Contact() {
  return (
    <section id="contact" className="px-32 max-sm:px-8 shadow-lg">
      <div className="bg-neutral rounded-xl text-white text-center p-8 relative top-16 max-sm:top-32">
        <div className="flex w-full flex-col lg:flex-row">
          <div className="card grid flex-grow place-items-center flex-1">
            <h3 className="text-2xl font-bold">Start a project</h3>
          </div>
          <div className="divider lg:divider-horizontal divider-primary"></div>
          <div className="card grid flex-grow place-items-center flex-1">
            Interested in working together? <br /> We should queue up a time to
            chat.
          </div>
          <div className="divider lg:divider-horizontal divider-primary"></div>
          <div className="card grid flex-grow place-items-center flex-1">
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
