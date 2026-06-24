import { step } from './step'

// Ascending steps + progress chevron.
export default function FormationVisual() {
  return (
    <svg
      viewBox="0 0 120 80"
      fill="none"
      aria-hidden="true"
      className="qclay-offer-visual"
    >
      <rect
        className="qov-shape"
        style={step(0)}
        x="20"
        y="52"
        width="18"
        height="16"
        rx="3"
        fill="currentColor"
        opacity="0.45"
      />
      <rect
        className="qov-shape"
        style={step(1)}
        x="44"
        y="40"
        width="18"
        height="28"
        rx="3"
        fill="currentColor"
        opacity="0.65"
      />
      <rect
        className="qov-shape"
        style={step(2)}
        x="68"
        y="26"
        width="18"
        height="42"
        rx="3"
        fill="currentColor"
        opacity="0.85"
      />
      <path
        className="qov-shape"
        style={step(3)}
        d="M22 30 L52 20 L82 10"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="qov-shape"
        style={step(4)}
        d="M74 10 L84 9 L83 19"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
