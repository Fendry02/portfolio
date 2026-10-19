/** Shortens text on a word boundary so it never overflows an OG card. */
export function truncateForCard(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text

  const cut = text.slice(0, maxLength - 1)
  const lastSpace = cut.lastIndexOf(' ')
  const kept = lastSpace > 0 ? cut.slice(0, lastSpace) : cut

  return `${kept.replace(/[\s,;:.]+$/, '')}…`
}
