export default function Summary() {
  return (
    <section className="text-center p-16 max-sm:p-8">
      <h1 className="text-5xl font-bold">Benefits of working with me</h1>
      <div className="flex flex-wrap mx-auto justify-center	gap-8 pt-8">
        <div className="flex w-full flex-col lg:flex-row">
          <div className="card rounded-box flex-grow place-items-center p-8 shadow-lg">
            <h3 className="text-2xl font-bold pb-4 text-secondary">
              Technical Expertise
            </h3>
            <p>
              Mastery of modern JavaScript, PostgreSQL, and clean coding
              practices. I deliver robust, scalable solutions tailored to your
              needs.
            </p>
          </div>
          <div className="divider lg:divider-horizontal divider-primary"></div>
          <div className="card rounded-box flex-grow place-items-center p-8 shadow-lg">
            <h3 className="text-2xl font-bold pb-4 text-secondary">
              Efficient Methodology
            </h3>
            <p>
              I follow a structured, functional approach that ensures your
              project is completed on time and within scope, without
              compromising on quality.
            </p>
          </div>
          <div className="divider lg:divider-horizontal divider-primary"></div>
          <div className="card rounded-box flex-grow place-items-center p-8 shadow-lg">
            <h3 className="text-2xl font-bold pb-4 text-secondary">
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
