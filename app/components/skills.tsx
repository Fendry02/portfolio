import Image from 'next/image'

import frontend from '@/public/front-end.webp'
import portable from '@/public/portable.webp'
import server from '@/public/server.webp'

export default function Skills() {
  const imageSize = 72

  return (
    <section id="skills" className="text-center px-16 max-sm:px-8">
      <div className="mx-auto columns-1 lg:columns-3 gap-x-8">
        <div className="relative rounded-t-xl border-0 lg:rounded-xl bg-base-100 shadow-lg -top-16 transition-transform duration-300 hover:scale-102">
          <figure>
            <Image
              src={frontend}
              alt="Benoit avatar"
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
            <p className="text-secondary">Experience I have</p>
            <ul className="list-none">
              <li>VueJS</li>
              <li>NextJS</li>
              <li>Tailwind</li>
              <li>daisyUI</li>
              <li>Figma</li>
            </ul>
          </div>
        </div>
        <div className="relative overflow-auto border-t lg:border-0 lg:rounded-xl bg-base-100 shadow-lg -top-16 transition-transform duration-300 hover:scale-102">
          <figure>
            <Image
              src={portable}
              alt="Benoit avatar"
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
            <p className="text-secondary">Experience I have</p>
            <ul className="list-none">
              <li>NodeJS</li>
              <li>Typescript</li>
              <li>AWS</li>
              <li>RabbitMQ</li>
              <li>Datadog</li>
            </ul>
          </div>
        </div>
        <div className="relative overflow-auto border-t lg:border-0 rounded-b-xl lg:rounded-xl bg-base-100 shadow-lg -top-16 transition-transform duration-300 hover:scale-102">
          <figure>
            <Image
              src={server}
              alt="Benoit avatar"
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
            <p className="text-secondary">Experience I have</p>
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
