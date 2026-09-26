export const showreelVideo = {
  src: '/video/bbenoit-showreel.mp4',
  poster: '/video/showreel-poster.jpg',
  // 4:5 cut for phones: same timing, layout rebuilt so the text stays readable
  portraitSrc: '/video/bbenoit-showreel-4x5.mp4',
  portraitPoster: '/video/showreel-poster-4x5.jpg',
  portraitQuery: '(max-width: 40rem)',
  title: 'Benoit Bruynbroeck, développeur web freelance à Lyon, en 30 secondes',
  description:
    'Sites web vitrines, applications web et mobile, automatisations n8n et formation IA : un aperçu en 30 secondes de ce que je construis pour les entreprises.',
  duration: 30,
  uploadDate: '2026-09-26',
} as const

export type ShowreelChapter = {
  start: number
  timestamp: string
  label: string
}

export const showreelChapters: readonly ShowreelChapter[] = [
  { start: 0, timestamp: '0:00', label: 'L’approche' },
  { start: 8, timestamp: '0:08', label: 'Les offres' },
  { start: 16, timestamp: '0:16', label: 'Les références' },
  { start: 22, timestamp: '0:22', label: 'Parlons-en' },
]

// Silent in-view autoplay is skipped for people who asked for less motion
// or less data; they keep the poster and the play button.
export function canAutoplayShowreel({
  reducedMotion,
  saveData,
}: {
  reducedMotion: boolean
  saveData: boolean
}): boolean {
  return !reducedMotion && !saveData
}

export function getShowreelChapterIndex(currentTime: number): number {
  let index = 0
  showreelChapters.forEach((chapter, i) => {
    if (currentTime >= chapter.start) index = i
  })
  return index
}

type ToAbsoluteUrl = (path: string) => string

// Pure builder: page.tsx passes the site's absoluteUrl, so this module stays dependency-free.
export function createShowreelVideoJsonLd(
  absoluteUrl: ToAbsoluteUrl,
  inLanguage: string,
): Record<string, unknown> {
  return {
    '@type': 'VideoObject',
    '@id': absoluteUrl('/#showreel'),
    name: showreelVideo.title,
    description: showreelVideo.description,
    thumbnailUrl: absoluteUrl(showreelVideo.poster),
    contentUrl: absoluteUrl(showreelVideo.src),
    uploadDate: showreelVideo.uploadDate,
    duration: `PT${showreelVideo.duration}S`,
    inLanguage,
    author: { '@id': absoluteUrl('/#person') },
    hasPart: showreelChapters.map((chapter, index) => ({
      '@type': 'Clip',
      name: chapter.label,
      startOffset: chapter.start,
      endOffset: showreelChapters[index + 1]?.start ?? showreelVideo.duration,
      url: absoluteUrl('/#video'),
    })),
  }
}
