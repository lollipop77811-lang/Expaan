// Tokenized easings — never write a cubic-bezier inline anywhere else.
export const easeExpoOut = 'expo.out' as const
export const easePower2Out = 'power2.out' as const
export const easePower3Out = 'power3.out' as const
export const easeExpoInOut = 'expo.inOut' as const
export const easePower2InOut = 'power2.inOut' as const
export const easeNone = 'none' as const

// Cubic bezier equivalents (for framer-motion transitions if needed)
export const bezierExpoOut: [number, number, number, number] = [0.16, 1, 0.3, 1]
export const bezierPower2Out: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]
export const bezierPower3Out: [number, number, number, number] = [0.22, 1, 0.36, 1]

// Durations — keep in lockstep with tokens.css --duration-* values.
export const DUR = {
  text: 1.2,
  image: 1.4,
  hover: 0.4,
  loader: 1.8,
  curtain: 0.9,
  menu: 1,
  cta: 0.6,
  fade: 0.4,
  wipe: 0.8,
} as const

export const STAGGER = {
  lines: 0.09,
  cards: 0.08,
  menu: 0.07,
} as const
