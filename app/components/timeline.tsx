import { TIMELINE } from '../data/timeline'
import { AnimatedTitle, FadeIn } from './ui'

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export default function Timeline() {
  return (
    <section className="p-16 max-sm:p-8">
      <AnimatedTitle level={1} className="text-center">
        Timeline
      </AnimatedTitle>
      <FadeIn
        as="ul"
        delay={200}
        className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical pt-8"
      >
        {TIMELINE.map((entry, idx) => (
          <li key={entry.period}>
            {idx > 0 && <hr />}
            <div className="timeline-middle">
              <CheckIcon />
            </div>
            <div
              className={
                entry.side === 'start'
                  ? 'timeline-start mb-10 md:text-end'
                  : 'timeline-end md:mb-10'
              }
            >
              <time className="font-mono italic">{entry.period}</time>
              <div className="text-lg font-black">{entry.title}</div>
              {entry.role}
              {entry.detail && (
                <>
                  <br />
                  <span className="text-sm text-secondary">{entry.detail}</span>
                </>
              )}
            </div>
            {idx < TIMELINE.length - 1 && <hr />}
          </li>
        ))}
      </FadeIn>
    </section>
  )
}
