import Image from 'next/image'

import frontend from '@/public/front-end.png'
import portable from '@/public/portable.png'
import server from '@/public/server.png'

export default function Skills() {
  const imageSize = 72

  return (
    <section className="text-center">
      <div className="mx-auto max-w-[90%] columns-1 sm:columns-3 gap-x-8">
        <div className="relative rounded-t-lg border-0 sm:rounded-lg bg-base-100 shadow-lg -top-16">
          <figure>
            <Image
              src={frontend}
              alt="Benoit avatar"
              priority={true}
              height={imageSize}
              width={imageSize}
              className="mx-auto pt-8"
            />
          </figure>
          <div className="card-body overflow-auto	text-center">
            <h2 className="card-title mx-auto">Frontend</h2>
            <p className="sm:h-24">
              I like to code things from scratch, and enjoy bringing ideas to
              life in the browser
            </p>
            <p className="text-secondary mt-8 sm:mt-16 md:mt-4">
              Experience I have
            </p>
            <ul className="list-none">
              <li>VueJS</li>
              <li>NuxtJS</li>
              <li>Tailwind</li>
              <li>daisyUI</li>
              <li>Figma</li>
            </ul>
          </div>
        </div>
        <div className="relative overflow-auto border-t sm:border-0 sm:rounded-lg bg-base-100 shadow-lg -top-16">
          <figure>
            <Image
              src={portable}
              alt="Benoit avatar"
              priority={true}
              height={imageSize}
              width={imageSize}
              className="mx-auto pt-8"
            />
          </figure>
          <div className="card-body text-center">
            <h2 className="card-title mx-auto">Backend</h2>
            <p className="sm:h-24">
              I enjoy develop clean and efficient RESTful API
            </p>
            <p className="text-secondary mt-8 sm:mt-16 md:mt-4">
              Experience I have
            </p>
            <ul className="list-none">
              <li>NodeJS</li>
              <li>HapiJS</li>
              <li>es6</li>
              <li>RabbitMQ</li>
              <li>Datadog</li>
            </ul>
          </div>
        </div>
        <div className="relative overflow-auto border-t sm:border-0 rounded-b-lg sm:rounded-lg bg-base-100 shadow-lg -top-16">
          <figure>
            <Image
              src={server}
              alt="Benoit avatar"
              priority={true}
              height={imageSize}
              width={imageSize}
              className="mx-auto pt-8"
            />
          </figure>
          <div className="card-body text-center">
            <h2 className="card-title mx-auto">Database</h2>
            <p className="sm:h-24">
              I genuinely care about building efficient database, and love
              helping beginners to learn it
            </p>
            <p className="text-secondary mt-8 sm:mt-16 md:mt-4">
              Experience I have
            </p>
            <ul className="list-none">
              <li>Postgres</li>
              <li>Oracle</li>
              <li>Mongo</li>
              <li>Redis</li>
              <li>Objection</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
