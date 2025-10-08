// Animation constants
export const ANIMATION_DURATION = {
  FAST: 300,
  NORMAL: 700,
  SLOW: 1000,
} as const

export const ANIMATION_DELAY = {
  NONE: 0,
  SHORT: 100,
  MEDIUM: 200,
  LONG: 300,
  EXTRA_LONG: 400,
  MAX: 500,
} as const

// Image dimensions
export const IMAGE_SIZES = {
  AVATAR: {
    MOBILE: 200,
    DESKTOP: 250,
  },
  SKILL_ICON: 72,
  PROJECT_CARD: 300,
  PROJECT_MODAL: 50,
  SOCIAL_ICON: 24,
  LOGO: 60,
} as const

// URLs and links
export const LINKS = {
  LINKEDIN: 'https://www.linkedin.com/in/benoit-bruynbroeck-a21214b4/',
  GITHUB: 'https://github.com/Fendry02',
  FACEBOOK: 'https://www.facebook.com/benoit.bruynbroeck/',
  EMAIL: 'mailto:bruy.benoit@gmail.com',
  PORTFOLIO: 'https://bbenoit.fr',
  CITIZENPLANE: 'https://citizenplane.com',
} as const

// Spacing and layout
export const SPACING = {
  SECTION_PADDING: 'p-16 max-sm:p-8',
  SECTION_PADDING_TOP: 'pt-32 max-sm:pt-16',
  SECTION_PADDING_BOTTOM: 'pb-40 max-sm:pb-20',
  CARD_PADDING: 'p-8',
  CONTAINER_PADDING: 'px-16 max-sm:px-8',
  CONTAINER_PADDING_LARGE: 'px-32 max-sm:px-8',
} as const

// Common CSS classes
export const CSS_CLASSES = {
  FADE_IN_UP: 'transition-all duration-700',
  FADE_IN_UP_VISIBLE: 'opacity-100 translate-y-0',
  FADE_IN_UP_HIDDEN: 'opacity-0 translate-y-8',

  SECTION_CENTER: 'text-center',
  SECTION_PRIMARY: 'bg-primary text-white',

  CARD_BASE: 'card rounded-box flex-grow place-items-center shadow-lg',
  CARD_SKILL:
    'relative rounded-t-xl border-0 lg:rounded-xl bg-base-100 shadow-lg -top-16 transition-all duration-700 hover:scale-105',
  CARD_PROJECT:
    'flex-1 cursor-pointer group/caption shadow-lg hover:bg-slate-900 ease-in-out duration-300 rounded-2xl max-w-[300px] max-h-[300px] transition-all duration-700 hover:scale-105',

  BUTTON_PRIMARY: 'btn btn-lg btn-secondary',
  BUTTON_GHOST: 'btn btn-ghost btn-sm',

  IMAGE_ROUNDED: 'rounded-2xl',
  IMAGE_OPACITY: 'opacity-90',

  FLEX_CENTER: 'flex w-full flex-col lg:flex-row justify-center items-center',
  GRID_SOCIAL: 'grid grid-flow-col gap-4',
} as const

// Animation delay helpers
export const getAnimationDelay = (index: number) => {
  const delays = [
    ANIMATION_DELAY.NONE,
    ANIMATION_DELAY.SHORT,
    ANIMATION_DELAY.MEDIUM,
    ANIMATION_DELAY.LONG,
    ANIMATION_DELAY.EXTRA_LONG,
  ]

  return delays[index] || ANIMATION_DELAY.MAX
}

// Responsive breakpoints
export const BREAKPOINTS = {
  SM: 'max-sm:',
  MD: 'max-md:',
  LG: 'lg:',
} as const
