function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum)
}

type ScrollDocument = Pick<
  HTMLElement,
  'clientHeight' | 'scrollHeight' | 'scrollTop'
>

type ScrollStoryRect = Pick<DOMRect, 'height' | 'top'>

export function getPageScrollProgress(documentElement: ScrollDocument) {
  const scrollableHeight =
    documentElement.scrollHeight - documentElement.clientHeight

  if (scrollableHeight <= 0) return 0

  return Number(
    clamp(documentElement.scrollTop / scrollableHeight, 0, 1).toFixed(4),
  )
}

export function getScrollStoryProgress(
  story: ScrollStoryRect,
  viewportHeight: number,
) {
  const scrollDistance = Math.max(story.height - viewportHeight, 1)

  return Number(clamp(-story.top / scrollDistance, 0, 1).toFixed(4))
}

export function getScrollStoryStep(progress: number, stepCount: number) {
  const safeStepCount = Math.max(Math.floor(stepCount), 1)
  const boundedProgress = clamp(progress, 0, 1)

  return Math.min(
    Math.floor(boundedProgress * safeStepCount),
    safeStepCount - 1,
  )
}
