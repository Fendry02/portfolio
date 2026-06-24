import type { ComponentType } from 'react'

import SiteWebVisual from './SiteWebVisual'
import AppVisual from './AppVisual'
import AiAuditVisual from './AiAuditVisual'
import FormationVisual from './FormationVisual'

export { step } from './step'

/** Index-aligned with the `offers` array in app/page.tsx. */
export const OFFER_VISUALS: readonly ComponentType[] = [
  SiteWebVisual,
  AppVisual,
  AiAuditVisual,
  FormationVisual,
]
