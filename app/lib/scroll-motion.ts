function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum)
}

export type HeaderScrollState = {
  isHidden: boolean
  anchorY: number
}

const headerTopOffset = 64
const headerHideDistance = 48
const headerRevealDistance = 16

export function getHeaderScrollState(
  scrollY: number,
  state: HeaderScrollState,
): HeaderScrollState {
  const safeScrollY = Math.max(scrollY, 0)

  if (safeScrollY <= headerTopOffset) {
    return { isHidden: false, anchorY: safeScrollY }
  }

  if (state.isHidden) {
    if (safeScrollY <= state.anchorY - headerRevealDistance) {
      return { isHidden: false, anchorY: safeScrollY }
    }

    return { isHidden: true, anchorY: Math.max(state.anchorY, safeScrollY) }
  }

  const visibleAnchorY = Math.min(state.anchorY, safeScrollY)

  if (
    safeScrollY >=
    Math.max(
      headerTopOffset + headerHideDistance,
      visibleAnchorY + headerHideDistance,
    )
  ) {
    return { isHidden: true, anchorY: safeScrollY }
  }

  return { isHidden: false, anchorY: visibleAnchorY }
}

export function getScrollStoryStep(progress: number, stepCount: number) {
  const safeStepCount = Math.max(Math.floor(stepCount), 1)
  const boundedProgress = clamp(progress, 0, 1)

  return Math.min(
    Math.floor(boundedProgress * safeStepCount),
    safeStepCount - 1,
  )
}
