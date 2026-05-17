import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'

import profile from '@/public/profile.webp'
import citizenplane from '@/public/works/citizenplane.webp'
import businessDecision from '@/public/works/business-decision.webp'
import openclassrooms from '@/public/works/openclassrooms.webp'

export const metadata: Metadata = {
  title: 'About | Benoit Bruynbroeck — JavaScript Tech Lead',
  description:
    'JavaScript Tech Lead and full-stack developer. Background, skills, roles and approach to building maintainable web products.',
  alternates: {
    canonical: 'https://bbenoit.fr/jobs',
  },
}

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
    period: '2019 — now',
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
    period: '2020 — now',
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
    period: '2017 — 2019',
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
    period: '2016 — 2017',
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
    period: '2011 — 2016',
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
    text: 'Claude Code, Cursor and Copilot are part of my daily workflow — for scaffolding, refactoring, exploring unfamiliar codebases and reviewing my own work.',
  },
  {
    title: 'Shipping AI features in production',
    text: 'Hands-on with the OpenAI and Anthropic SDKs: prompt engineering, function calling, RAG pipelines and agentic patterns — built for real users, not just demos.',
  },
  {
    title: 'Quality goes up, not down',
    text: 'AI catches the obvious bugs early and frees me up for the architecture decisions, edge cases and product trade-offs that actually require a human.',
  },
  {
    title: 'Staying current is the job',
    text: 'I track new models, tools and protocols — MCP, agentic workflows, eval frameworks — so the teams I work with always have the right tool for the right problem.',
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
    text: 'Architecture decisions should support load, new features and team growth — without rewriting the foundations every year.',
  },
]

export default function Jobs() {
  return (
    <main className="bg-base-100 text-base-content">
      {/* ─────────────────────────── HERO ─────────────────────────── */}
      <section
        id="home"
        aria-labelledby="jobs-hero-heading"
        className="relative overflow-hidden"
      >
        <div className="bg-grid-light pointer-events-none absolute inset-0 opacity-60" />
        <div className="pointer-events-none absolute -top-32 right-[-10%] h-[420px] w-[420px] rounded-full bg-secondary/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-16 px-6 pb-24 pt-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20 lg:px-16 lg:pb-32 lg:pt-20">
          <div className="flex flex-col justify-center">
            <div className="inline-flex w-fit items-center gap-2.5 rounded-full border border-base-300 bg-base-100/80 px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-base-content/70 shadow-sm backdrop-blur">
              <span className="status-dot" aria-hidden="true" />
              About · résumé
            </div>

            <h1
              id="jobs-hero-heading"
              className="mt-7 text-[clamp(2.6rem,5.6vw,5.25rem)] font-bold leading-[1.04] tracking-tight"
            >
              Hi, I’m Benoit.{' '}
              <span className="text-base-content/55">
                JavaScript Tech Lead, full-stack developer and{' '}
                <span className="text-gradient-accent inline-block px-1 py-1 italic leading-[1.18]">
                  AI-augmented
                </span>{' '}
                builder.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-base-content/70 md:text-xl">
              I turn complex product ideas into scalable web platforms — from
              the database up to the interface. I care about clean code, sane
              architecture and shipping things that actually get used.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/#services"
                className="btn btn-primary btn-lg rounded-full px-7 shadow-lg shadow-primary/20"
              >
                See what I build
                <span aria-hidden="true">→</span>
              </Link>
              <a
                href="mailto:bruy.benoit@gmail.com"
                className="btn btn-ghost btn-lg rounded-full px-6 text-base-content/80 hover:bg-base-200"
              >
                Get in touch
              </a>
            </div>

            <dl className="mt-12 grid max-w-xl grid-cols-3 gap-x-6 gap-y-2 border-t border-base-300 pt-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="text-xs uppercase tracking-wider text-base-content/50">
                    {s.label}
                  </dt>
                  <dd className="mt-1 text-2xl font-bold tracking-tight">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative mx-auto flex w-full max-w-md flex-col items-center lg:max-w-none">
            <div className="relative aspect-square w-full max-w-[420px]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-6 rounded-full bg-secondary/8 blur-3xl"
              />
              <Image
                src={profile}
                alt="Portrait of Benoit Bruynbroeck"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 420px"
                className="relative object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────── AI-AUGMENTED WORKFLOW ──────────────────── */}
      <section
        aria-labelledby="ai-heading"
        className="px-6 py-20 lg:px-16 lg:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[2rem] bg-primary p-10 text-primary-content shadow-2xl shadow-primary/20 md:p-16">
            <div className="bg-grid-soft pointer-events-none absolute inset-0 opacity-40" />
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-secondary/35 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -left-10 h-72 w-72 rounded-full bg-secondary/20 blur-3xl" />

            <div className="relative grid gap-12 lg:grid-cols-[0.42fr_0.58fr] lg:gap-20">
              <div>
                <div className="inline-flex items-center gap-2.5 rounded-full border border-primary-content/20 bg-primary-content/5 px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-primary-content/85 backdrop-blur">
                  <span className="status-dot" aria-hidden="true" />
                  AI-augmented · 2024 →
                </div>

                <h2
                  id="ai-heading"
                  className="mt-6 text-[clamp(2rem,3.6vw,3.5rem)] font-bold leading-[1.05] tracking-tight"
                >
                  AI is wired into how I ship.
                </h2>

                <p className="mt-6 max-w-md text-base leading-7 text-primary-content/75 md:text-lg">
                  I treat modern AI tools the way I treat my IDE: a permanent
                  part of the workflow. Faster shipping, fewer dumb mistakes,
                  and more headspace for the calls that actually matter.
                </p>

                <div className="mt-8 flex flex-wrap gap-2">
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
                      className="rounded-full border border-primary-content/20 bg-primary-content/5 px-3 py-1 text-xs font-medium text-primary-content/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <ol className="grid gap-3">
                {aiPractices.map((p, i) => (
                  <li
                    key={p.title}
                    className="group flex gap-5 rounded-2xl border border-primary-content/15 bg-primary-content/[0.04] p-5 transition hover:border-primary-content/30 hover:bg-primary-content/[0.07]"
                  >
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-primary-content/20 bg-primary-content/10 font-mono text-xs font-bold text-primary-content/70">
                      0{i + 1}
                    </span>
                    <div>
                      <h3 className="text-lg font-bold leading-tight tracking-tight">
                        {p.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-6 text-primary-content/70">
                        {p.text}
                      </p>
                    </div>
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
        className="border-t border-base-300 bg-base-200/40 px-6 py-24 lg:px-16 lg:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.4fr_0.6fr] lg:gap-20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
                How I work
              </p>
              <h2
                id="approach-heading"
                className="mt-4 text-[clamp(2rem,3.2vw,3rem)] font-bold leading-[1.05] tracking-tight"
              >
                Three principles, applied consistently.
              </h2>
              <p className="mt-6 max-w-md text-base leading-7 text-base-content/70">
                Every line of code should serve a purpose. Every architecture
                decision should be justified. Every solution should outlive the
                meeting where it was decided.
              </p>
            </div>

            <ol className="grid gap-4">
              {principles.map((p, i) => (
                <li
                  key={p.title}
                  className="group flex gap-5 rounded-2xl border border-base-300 bg-base-100 p-6 transition hover:border-secondary/40 hover:shadow-sm"
                >
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-base-300 bg-base-200 font-mono text-xs font-bold text-base-content/65">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold tracking-tight">
                      {p.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-6 text-base-content/70">
                      {p.text}
                    </p>
                  </div>
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
        className="px-6 py-24 lg:px-16 lg:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
              Stack
            </p>
            <h2
              id="skills-heading"
              className="mt-4 text-[clamp(2rem,3.2vw,3rem)] font-bold leading-[1.05] tracking-tight"
            >
              From the database up to the browser.
            </h2>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {skills.map((group) => (
              <article
                key={group.title}
                className="flex flex-col rounded-3xl border border-base-300 bg-base-100 p-7 transition hover:border-secondary/40 hover:shadow-lg"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
                  {group.title}
                </p>
                <p className="mt-3 text-base leading-6 text-base-content/70">
                  {group.pitch}
                </p>

                <ul className="mt-6 space-y-2 border-t border-base-300 pt-5">
                  {group.items.map((item) => (
                    <li
                      key={item.name}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="font-semibold tracking-tight">
                        {item.name}
                      </span>
                      <span className="font-mono text-xs text-base-content/55">
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

      {/* ──────────────────── EXPERIENCE (timeline + works combined) ──────────────────── */}
      <section
        id="experience"
        aria-labelledby="experience-heading"
        className="bg-base-200/40 px-6 py-24 lg:px-16 lg:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
              Experience
            </p>
            <h2
              id="experience-heading"
              className="mt-4 text-[clamp(2rem,3.2vw,3rem)] font-bold leading-[1.05] tracking-tight"
            >
              Roles, projects and teams I’ve worked with.
            </h2>
          </div>

          <ol className="mt-12 space-y-4">
            {roles.map((role) => (
              <li key={`${role.period}-${role.company}`}>
                <article className="group relative grid gap-6 rounded-3xl border border-base-300 bg-base-100 p-6 transition hover:border-secondary/40 hover:shadow-lg md:grid-cols-[180px_1fr_minmax(0,140px)] md:items-start md:gap-8 md:p-8">
                  <div className="flex items-center gap-4 md:flex-col md:items-start md:gap-3">
                    {role.image ? (
                      <Image
                        src={role.image}
                        alt={`${role.company} logo`}
                        width={56}
                        height={56}
                        className="h-14 w-14 shrink-0 rounded-xl object-cover"
                      />
                    ) : (
                      <div
                        aria-hidden="true"
                        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-base-300 bg-base-200 font-mono text-xs font-bold text-base-content/55"
                      >
                        {role.company.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                    <time className="font-mono text-xs uppercase tracking-wider text-base-content/55">
                      {role.period}
                    </time>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
                      {role.company}
                    </p>
                    <h3 className="mt-1.5 text-2xl font-bold tracking-tight">
                      {role.title}
                    </h3>
                    <p className="mt-3 text-base leading-7 text-base-content/70">
                      {role.summary}
                    </p>

                    {role.highlights.length > 0 && (
                      <ul className="mt-5 space-y-1.5 text-sm text-base-content/75">
                        {role.highlights.map((h) => (
                          <li key={h} className="flex items-start gap-2.5">
                            <span
                              aria-hidden="true"
                              className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-base-content/40"
                            />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {role.stack.length > 0 && (
                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {role.stack.map((s) => (
                          <span
                            key={s}
                            className="rounded-full border border-base-300 bg-base-200/60 px-2.5 py-0.5 text-xs font-medium text-base-content/70"
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
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-secondary transition hover:underline"
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
        className="border-t border-base-300 px-6 py-24 lg:px-16 lg:py-28"
      >
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-base-300 bg-base-100 px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-base-content/70 shadow-sm">
            <span className="status-dot" aria-hidden="true" />
            Open to interesting work
          </div>

          <h2
            id="jobs-contact-heading"
            className="mt-6 text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] tracking-tight"
          >
            Let’s talk.
          </h2>

          <p className="mt-5 max-w-xl text-base leading-7 text-base-content/70 md:text-lg">
            Whether you’re hiring, scoping a project or just want to chat about
            JavaScript, drop me a line.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
            <a
              href="mailto:bruy.benoit@gmail.com"
              className="btn btn-primary btn-lg rounded-full px-7 shadow-lg shadow-primary/20"
            >
              Email me
              <span aria-hidden="true">→</span>
            </a>
            <a
              href="https://www.linkedin.com/in/benoit-bruynbroeck-a21214b4/"
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost btn-lg rounded-full px-6 text-base-content/80 hover:bg-base-200"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/Fendry02"
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost btn-lg rounded-full px-6 text-base-content/80 hover:bg-base-200"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
