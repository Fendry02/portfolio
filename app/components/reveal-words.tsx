import { Fragment } from 'react'
import type { CSSProperties } from 'react'

export interface WordSegment {
  /** The word, including any attached punctuation (e.g. "vendent,"). */
  text: string
  /** Highlights the word (brand blue + drawn underline). */
  accent?: boolean
}

interface RevealWordsProps {
  segments: readonly WordSegment[]
  /** Delay before the first word starts revealing. */
  baseDelayMs?: number
  /** Delay added per word, producing the staggered "wave". */
  stepMs?: number
}

const DEFAULT_BASE_DELAY_MS = 100
const DEFAULT_STEP_MS = 38

/** Inline style that also carries CSS custom properties. */
type StyleWithVars = CSSProperties & Record<`--${string}`, string | number>

/**
 * Renders a heading word-by-word with a staggered blur/scale reveal.
 *
 * Server-rendered (no client JS): the words ship in the HTML, so there is no
 * layout shift and the heading stays indexable. The animation is CSS-only and
 * is disabled under `prefers-reduced-motion` via `animations.css`.
 *
 * A visually hidden copy of the full sentence is exposed to assistive tech so
 * screen readers announce one clean phrase instead of fragmented words.
 */
export default function RevealWords({
  segments,
  baseDelayMs = DEFAULT_BASE_DELAY_MS,
  stepMs = DEFAULT_STEP_MS,
}: RevealWordsProps) {
  const fullText = segments.map((segment) => segment.text).join(' ')

  const containerStyle: StyleWithVars = {
    '--qclay-words-base': `${baseDelayMs}ms`,
    '--qclay-words-step': `${stepMs}ms`,
  }

  return (
    <>
      <span className="sr-only">{fullText}</span>
      <span aria-hidden="true" className="qclay-words" style={containerStyle}>
        {segments.map((segment, index) => (
          <Fragment key={`${segment.text}-${index}`}>
            <span
              className={
                segment.accent ? 'qclay-word qclay-word-accent' : 'qclay-word'
              }
              style={{ '--word-index': index } as StyleWithVars}
            >
              {segment.text}
            </span>
            {index < segments.length - 1 ? ' ' : ''}
          </Fragment>
        ))}
      </span>
    </>
  )
}
