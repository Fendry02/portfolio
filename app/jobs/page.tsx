import Image from 'next/image'
import Link from 'next/link'

import profile from '@/public/profile.jpg'
import citizenplane from '@/public/works/citizenplane.webp'
import businessDecision from '@/public/works/business-decision.webp'
import openclassrooms from '@/public/works/openclassrooms.webp'
import QClayMotion from '../components/qclay-motion'
import JsonLd from '../components/json-ld'
import {
  buildPageMetadata,
  createBreadcrumbJsonLd,
  createJsonLdGraph,
  createProfilePageJsonLd,
  jobsOpenGraphImage,
} from '../lib/seo'

const jobsTitle = 'JavaScript Tech Lead and full-stack developer'
const jobsDescription =
  'Background, skills, roles and engineering approach of Benoit Bruynbroeck, JavaScript Tech Lead and full-stack developer building maintainable web products.'

export const metadata = buildPageMetadata({
  title: jobsTitle,
  description: jobsDescription,
  path: '/jobs',
  image: jobsOpenGraphImage,
  locale: 'en_US',
  keywords: [
    'JavaScript Tech Lead',
    'full-stack developer',
    'TypeScript',
    'Node.js',
    'React',
    'Next.js',
    'Vue.js',
    'software architecture',
    'AI-augmented developer',
  ],
})

const jobsJsonLd = createJsonLdGraph([
  createProfilePageJsonLd({
    path: '/jobs',
    name: jobsTitle,
    description: jobsDescription,
  }),
  createBreadcrumbJsonLd([
    { name: 'Accueil', path: '/' },
    { name: 'Parcours', path: '/jobs' },
  ]),
])

const stats = [
  { value: '6+', label: 'years Node.js' },
  { value: '5+', label: 'years TypeScript' },
  { value: '50+', label: 'developers mentored' },
]

const skills = [
  {
    title: 'Frontend',
    pitch:
      'Crafting interfaces that are fast, accessible and easy to live with.',
    items: [
      { name: 'Vue.js', detail: '2+ years' },
      { name: 'React / Next.js', detail: '2+ years' },
      { name: 'TypeScript', detail: '5+ years' },
      { name: 'Tailwind CSS', detail: '2+ years' },
      { name: 'Figma', detail: '3+ years' },
    ],
  },
  {
    title: 'Backend',
    pitch: 'Clean RESTful APIs and well-structured services.',
    items: [
      { name: 'Node.js', detail: '6+ years' },
      { name: 'NestJS', detail: '2+ years' },
      { name: 'AWS', detail: '4+ years' },
      { name: 'RabbitMQ', detail: '4+ years' },
      { name: 'Datadog', detail: '3+ years' },
    ],
  },
  {
    title: 'Data',
    pitch: 'Modelling, querying and keeping the database honest.',
    items: [
      { name: 'PostgreSQL', detail: '6+ years' },
      { name: 'Objection.js', detail: '6+ years' },
      { name: 'Redis', detail: '3+ years' },
      { name: 'MongoDB', detail: '3+ years' },
      { name: 'Oracle', detail: '3+ years' },
    ],
  },
]

type Role = {
  period: string
  company: string
  title: string
  summary: string
  highlights: string[]
  stack: string[]
  href?: string
  image?: typeof citizenplane
}

const roles: Role[] = [
  {
    period: '2019 - now',
    company: 'CitizenPlane',
    title: 'Tech Lead JavaScript',
    summary:
      'Technical lead on a B2B SaaS distribution platform for airlines and travel sellers.',
    highlights: [
      'Leading a team of 4+ developers',
      'Front-end rebuild and product flow ownership',
      'API scalability, CI/CD and code-review standards',
    ],
    stack: ['Vue.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker', 'AWS'],
    href: 'https://citizenplane.com',
    image: citizenplane,
  },
  {
    period: '2020 - now',
    company: 'OpenClassrooms',
    title: 'Mentor & Reviewer',
    summary:
      'Mentoring full-stack JavaScript students through their final projects, from architecture to production.',
    highlights: [
      '50+ students mentored across React and Node tracks',
      'Code reviews, project evaluation, career guidance',
      'Curriculum feedback and tooling recommendations',
    ],
    stack: ['React', 'JavaScript', 'Node.js', 'Git', 'HTML', 'CSS'],
    href: 'https://openclassrooms.com',
    image: openclassrooms,
  },
  {
    period: '2017 - 2019',
    company: 'Business & Decision',
    title: 'CRM Consultant',
    summary:
      'Consulting on CRM and data-driven projects for enterprise accounts including Accor Hotels and Norauto.',
    highlights: [
      'Designed ETL pipelines and data-integration flows',
      'Worked with marketing and IT teams on campaign tooling',
      'First exposure to demanding production environments',
    ],
    stack: ['Adobe Campaign', 'Talend', 'Oracle SQL', 'PL/SQL', 'ETL'],
    href: 'https://www.businessdecision.com/',
    image: businessDecision,
  },
  {
    period: '2016 - 2017',
    company: 'PrixLibre',
    title: 'Junior Developer',
    summary:
      'First professional role on an early-stage e-commerce platform in a startup environment.',
    highlights: [
      'Feature work on the public storefront',
      'Worked across stack on a small product team',
    ],
    stack: ['PHP', 'AngularJS', 'MySQL'],
  },
  {
    period: '2011 - 2016',
    company: 'ESIEE Amiens',
    title: 'Computer Science Engineer',
    summary:
      'Engineering degree with a focus on software engineering and database systems.',
    highlights: [],
    stack: [],
  },
]

const aiPractices = [
  {
    title: 'Pair programming, every day',
    text: 'Claude Code, Cursor and Copilot are part of my daily workflow. I use them for scaffolding, refactoring, exploring unfamiliar codebases and reviewing my own work.',
  },
  {
    title: 'Shipping AI features in production',
    text: 'Hands-on with the OpenAI and Anthropic SDKs: prompt engineering, function calling, RAG pipelines and agentic patterns, built for real users, not just demos.',
  },
  {
    title: 'Quality goes up, not down',
    text: 'AI catches the obvious bugs early and frees me up for the architecture decisions, edge cases and product trade-offs that actually require a human.',
  },
  {
    title: 'Staying current is the job',
    text: 'I track new models, tools and protocols, including MCP, agentic workflows and eval frameworks, so the teams I work with always have the right tool for the right problem.',
  },
]

const principles = [
  {
    title: 'Functional first',
    text: 'Immutability, pure functions and composition over inheritance. Code that is easier to reason about, test and evolve.',
  },
  {
    title: 'Code is for humans',
    text: 'Naming, structure and clear boundaries matter more than cleverness. Code is read far more often than it is written.',
  },
  {
    title: 'Built to grow',
    text: 'Architecture decisions should support load, new features and team growth, without rewriting the foundations every year.',
  },
]

const eyebrow =
  'text-xs font-semibold uppercase tracking-[0.18em] text-base-content/55'
const heading2 =
  'text-[clamp(2.25rem,3.6vw,3.5rem)] font-semibold leading-[1.08] tracking-tight'
const accent = '#2563eb'
const btnBlue =
  'interactive qclay-button inline-flex items-center justify-center gap-2 rounded-lg bg-[#2563eb] px-5 py-3 text-sm font-medium text-white hover:bg-[#1d4ed8]'
const btnGhost =
  'interactive qclay-button inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-medium text-base-content/70 hover:bg-base-200 hover:text-base-content'

export default function Jobs() {
  return (
    <main className="bg-base-100 text-base-content">
      <JsonLd data={jobsJsonLd} />
      <QClayMotion />
      {/* ─────────────────────────── HERO ─────────────────────────── */}
      <section
        id="home"
        aria-labelledby="jobs-hero-heading"
        className="qclay-hero relative overflow-hidden"
      >
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 pb-16 pt-8 sm:gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20 lg:px-10 lg:pb-28 lg:pt-16">
          <div className="qclay-reveal-stack flex flex-col justify-center">
            <h1
              id="jobs-hero-heading"
              className="text-[clamp(2.25rem,6vw,4.25rem)] font-semibold leading-[1.05] tracking-tight"
            >
              Hi, I’m Benoit.{' '}
              <span className="text-base-content/55">
                JavaScript Tech Lead, full-stack developer and{' '}
                <span style={{ color: accent }}>AI-augmented</span> builder.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-base-content/65 md:text-lg md:leading-8">
              I turn complex product ideas into scalable web platforms, from the
              database up to the interface. I care about clean code, sane
              architecture and shipping things that actually get used.
            </p>

            <div className="mt-8 flex flex-col gap-2.5 sm:flex-row sm:items-center">
              <Link href="/#offres" className={btnBlue}>
                See what I build
                <span aria-hidden="true">→</span>
              </Link>
              <a href="mailto:bruy.benoit@gmail.com" className={btnGhost}>
                Get in touch
              </a>
            </div>

            <dl className="qclay-metrics mt-12 grid max-w-md grid-cols-3 gap-x-6 border-t border-base-300 pt-6">
              {stats.map((s) => (
                <div key={s.label} className="qclay-metric">
                  <dt className={eyebrow}>{s.label}</dt>
                  <dd className="mt-1.5 text-xl font-semibold tracking-tight">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="qclay-portrait-wrap relative mx-auto flex w-full max-w-xs flex-col items-center sm:max-w-md lg:max-w-none lg:self-start">
            <div className="qclay-orbit hidden lg:block" aria-hidden="true" />
            <div
              className="qclay-orbit qclay-orbit-secondary hidden lg:block"
              aria-hidden="true"
            />
            <div className="qclay-portrait relative aspect-square w-full max-w-[240px] sm:max-w-[400px]">
              <Image
                src={profile}
                alt="Portrait of Benoit Bruynbroeck"
                fill
                priority
                sizes="(max-width: 640px) 320px, 400px"
                className="rounded-full object-cover object-[center_32%]"
              />

              <div className="qclay-float-badge absolute right-0 top-4 inline-flex items-center gap-1.5 rounded-md border border-base-300 bg-base-100 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-base-content/65">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 16 16"
                  className="h-3 w-3"
                  style={{ color: accent }}
                  fill="currentColor"
                >
                  <path d="M8 1.5a4.5 4.5 0 0 0-4.5 4.5c0 3.2 4.05 7.92 4.22 8.12a.36.36 0 0 0 .56 0C8.45 13.92 12.5 9.2 12.5 6A4.5 4.5 0 0 0 8 1.5Zm0 6.25A1.75 1.75 0 1 1 8 4.25a1.75 1.75 0 0 1 0 3.5Z" />
                </svg>
                Lyon · France
              </div>
            </div>

            <dl className="mt-7 flex items-center gap-3.5 rounded-2xl border border-base-300 bg-base-100 px-5 py-3.5 shadow-[0_10px_30px_oklch(20.8%_0.042_265.755/0.06)]">
              <dd
                className="text-3xl font-bold leading-none tracking-tight"
                style={{ color: accent }}
              >
                10
                <span className="align-top text-xl">+</span>
              </dd>
              <dt className="text-left text-[11px] font-semibold uppercase leading-snug tracking-[0.16em] text-base-content/55">
                years
                <br />
                experience
              </dt>
            </dl>
          </div>
        </div>
      </section>

      {/* ──────────────────── AI-AUGMENTED WORKFLOW ──────────────────── */}
      <section
        aria-labelledby="ai-heading"
        className="qclay-section qclay-scroll-reveal cv-auto px-6 py-12 lg:px-10 lg:py-16"
      >
        <div className="mx-auto max-w-6xl">
          <div className="qclay-ai-card relative overflow-hidden rounded-2xl bg-[#2563eb] p-8 text-white md:p-12">
            <div className="grid gap-10 lg:grid-cols-[0.42fr_0.58fr] lg:gap-16">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-white/75">
                  AI-augmented workflow
                </div>

                <h2
                  id="ai-heading"
                  className="mt-5 text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-[1.1] tracking-tight"
                >
                  AI is wired into how I ship.
                </h2>

                <p className="mt-5 max-w-md text-base leading-7 text-white/65">
                  I treat modern AI tools the way I treat my IDE: a permanent
                  part of the workflow. Faster shipping, fewer dumb mistakes,
                  and more headspace for the calls that actually matter.
                </p>

                <div className="mt-6 flex flex-wrap gap-1.5">
                  {[
                    'Claude Code',
                    'Cursor',
                    'Copilot',
                    'OpenAI SDK',
                    'Anthropic SDK',
                    'MCP',
                    'RAG',
                    'Agentic patterns',
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-white/15 px-2 py-0.5 text-xs font-medium text-white/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <ol className="grid gap-2">
                {aiPractices.map((p) => (
                  <li
                    key={p.title}
                    className="qclay-ai-step rounded-lg border border-white/10 p-4"
                  >
                    <h3 className="text-base font-semibold leading-tight tracking-tight">
                      {p.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-6 text-white/65">
                      {p.text}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────── APPROACH / PHILOSOPHY ──────────────────── */}
      <section
        aria-labelledby="approach-heading"
        className="qclay-section qclay-scroll-reveal cv-auto border-t border-base-300 bg-base-200/50 px-6 py-20 lg:px-10 lg:py-28"
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[0.4fr_0.6fr] lg:gap-16">
            <div>
              <p className={eyebrow}>How I work</p>
              <h2 id="approach-heading" className={`mt-3 ${heading2}`}>
                Three principles, applied consistently.
              </h2>
              <p className="mt-5 max-w-md text-sm leading-6 text-base-content/65">
                Every line of code should serve a purpose. Every architecture
                decision should be justified. Every solution should outlive the
                meeting where it was decided.
              </p>
            </div>

            <ol className="border-t border-base-300">
              {principles.map((p) => (
                <li key={p.title} className="border-b border-base-300 py-6">
                  <h3 className="text-base font-semibold tracking-tight">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-base-content/65">
                    {p.text}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ──────────────────── SKILLS ──────────────────── */}
      <section
        id="skills"
        aria-labelledby="skills-heading"
        className="qclay-section qclay-scroll-reveal cv-auto px-6 py-20 lg:px-10 lg:py-28"
      >
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className={eyebrow}>Stack</p>
            <h2 id="skills-heading" className={`mt-3 ${heading2}`}>
              From the database up to the browser.
            </h2>
          </div>

          <div className="mt-10 grid divide-y divide-base-300 lg:grid-cols-3 lg:divide-x lg:divide-y-0">
            {skills.map((group) => (
              <article
                key={group.title}
                className="flex flex-col py-8 lg:px-8 lg:first:pl-0 lg:last:pr-0"
              >
                <p className={eyebrow}>{group.title}</p>
                <p className="mt-2.5 text-sm leading-6 text-base-content/65">
                  {group.pitch}
                </p>

                <ul className="mt-5 space-y-1.5 border-t border-base-300 pt-4">
                  {group.items.map((item) => (
                    <li
                      key={item.name}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="font-medium tracking-tight">
                        {item.name}
                      </span>
                      <span className="font-mono text-xs text-base-content/50">
                        {item.detail}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────── EXPERIENCE ──────────────────── */}
      <section
        id="experience"
        aria-labelledby="experience-heading"
        className="qclay-section qclay-scroll-reveal cv-auto bg-base-200/50 px-6 py-20 lg:px-10 lg:py-28"
      >
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className={eyebrow}>Experience</p>
            <h2 id="experience-heading" className={`mt-3 ${heading2}`}>
              Roles, projects and teams I’ve worked with.
            </h2>
          </div>

          <ol className="mt-10 space-y-3">
            {roles.map((role) => (
              <li key={`${role.period}-${role.company}`}>
                <article className="qclay-subtle-card group relative grid gap-5 rounded-xl border border-base-300 bg-base-100 p-5 md:grid-cols-[160px_1fr_minmax(0,120px)] md:items-start md:gap-7 md:p-6">
                  <div className="flex items-center gap-3 md:flex-col md:items-start md:gap-2.5">
                    {role.image ? (
                      <Image
                        src={role.image}
                        alt={`${role.company} logo`}
                        width={48}
                        height={48}
                        className="h-12 w-12 shrink-0 rounded-md object-cover"
                      />
                    ) : (
                      <div
                        aria-hidden="true"
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-base-300 font-mono text-xs font-semibold text-base-content/50"
                      >
                        {role.company.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                    <time className="font-mono text-[11px] uppercase tracking-wider text-base-content/55">
                      {role.period}
                    </time>
                  </div>

                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#2563eb]">
                      {role.company}
                    </p>
                    <h3 className="mt-1 text-xl font-semibold tracking-tight">
                      {role.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-6 text-base-content/65">
                      {role.summary}
                    </p>

                    {role.highlights.length > 0 && (
                      <ul className="mt-4 space-y-1 text-sm text-base-content/70">
                        {role.highlights.map((h) => (
                          <li key={h} className="flex items-start gap-2.5">
                            <span
                              aria-hidden="true"
                              className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-base-content/30"
                            />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {role.stack.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1">
                        {role.stack.map((s) => (
                          <span
                            key={s}
                            className="rounded-md border border-base-300 px-2 py-0.5 text-xs font-medium text-base-content/65"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex md:justify-end">
                    {role.href ? (
                      <a
                        href={role.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm font-medium text-[#2563eb] hover:underline"
                      >
                        Visit ↗
                      </a>
                    ) : null}
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ──────────────────── CONTACT ──────────────────── */}
      <section
        id="contact"
        aria-labelledby="jobs-contact-heading"
        className="qclay-section qclay-scroll-reveal cv-auto border-t border-base-300 px-6 py-20 lg:px-10 lg:py-24"
      >
        <div className="qclay-reveal-stack mx-auto flex max-w-2xl flex-col items-center text-center">
          <div className="qclay-pill inline-flex items-center gap-2 rounded-full border border-base-300 px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-base-content/65">
            <span className="status-dot" aria-hidden="true" />
            Open to interesting work
          </div>

          <h2
            id="jobs-contact-heading"
            className="mt-5 text-[clamp(1.875rem,3.5vw,3rem)] font-semibold leading-[1.1] tracking-tight"
          >
            Let’s talk.
          </h2>

          <p className="mt-4 max-w-xl text-base leading-7 text-base-content/65">
            Whether you’re hiring, scoping a project or just want to chat about
            JavaScript, drop me a line.
          </p>

          <div className="mt-7 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:justify-center">
            <a href="mailto:bruy.benoit@gmail.com" className={btnBlue}>
              Get in touch
              <span aria-hidden="true">→</span>
            </a>
            <a
              href="https://www.linkedin.com/in/benoit-bruynbroeck-a21214b4/"
              target="_blank"
              rel="noreferrer"
              className={btnGhost}
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/Fendry02"
              target="_blank"
              rel="noreferrer"
              className={btnGhost}
            >
              GitHub
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
