export type ProjectVisibility = {
  index: number
  isIntersecting: boolean
  intersectionRatio: number
}

export function getActiveProjectIndex(
  entries: readonly ProjectVisibility[],
  currentIndex: number,
) {
  const visibleEntries = entries.filter((entry) => entry.isIntersecting)

  if (visibleEntries.length === 0) {
    return currentIndex
  }

  return visibleEntries.reduce((mostVisible, entry) => {
    return entry.intersectionRatio > mostVisible.intersectionRatio
      ? entry
      : mostVisible
  }).index
}
