export interface Testimonial {
  quote: string
  author: string
  role: string
  company?: string
}

/**
 * Replace these placeholders with real recommendations
 * (e.g. LinkedIn, ex-colleagues, mentees).
 * Keep this list to 2–3 entries to avoid noise.
 */
export const TESTIMONIALS: readonly Testimonial[] = []
