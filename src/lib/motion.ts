import type { Transition, Variants } from "motion/react"

/**
 * THE MOTION LANGUAGE — implemented from spec §9.
 *
 * Three registers, never mixed:
 *   ambient    → linear, infinite (tickers, drifting shapes)
 *   responsive → 200–400ms ease-out (hover, variants)
 *   narrative  → scroll-bound, no easing (the scroll IS the curve)
 * plus the cursor, which is spring rather than duration.
 */

export const ease = {
  /** Responsive tier. Damped, never overshooting — spec §9: "mechanical". */
  out: [0.22, 1, 0.36, 1],
  /** For masked type settling. */
  soft: [0.16, 1, 0.3, 1],
  inOut: [0.65, 0, 0.35, 1],
} as const

export const duration = {
  micro: 0.15,
  fast: 0.2,
  base: 0.3,
  slow: 0.4,
  reveal: 0.5,
} as const

export const spring = {
  /** Spec §12: ~500 / ~40 for the small dot. */
  cursor: { stiffness: 500, damping: 40, mass: 0.5 },
  /** Larger, labelled cursor states feel heavier. */
  cursorLarge: { stiffness: 320, damping: 34, mass: 0.7 },
  magnet: { stiffness: 260, damping: 18, mass: 0.6 },
  /** Only where scroll jitter is actually visible — spec §18. */
  scroll: { stiffness: 90, damping: 26, restDelta: 0.001 },
} as const

/** The responsive-tier default. */
export const transition: Transition = {
  duration: duration.base,
  ease: ease.out,
}

/**
 * Spec §9: only three entrance animations exist on the whole source page.
 * This variant is deliberately rationed — see components/primitives/Reveal.
 */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: ease.out } },
}

export const viewportOnce = { once: true, amount: 0.3 } as const

/** Ambient tier: px per second, never a fixed duration (spec §9). */
export const TICKER_SPEED = 60
