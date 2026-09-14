export type ColorToken = {
  id: string
  name: string
  main: string
  light: string
}

export const PALETTE: ColorToken[] = [
  { id: "electric-cobalt", name: "Electric Cobalt", main: "#3157FF", light: "#6B83FF" },
  { id: "vivid-azure", name: "Vivid Azure", main: "#007AFF", light: "#4DA3FF" },
  { id: "deep-indigo", name: "Deep Indigo", main: "#5146E5", light: "#8B83FF" },
  { id: "hyper-violet", name: "Hyper Violet", main: "#7C3AED", light: "#A78BFA" },
  { id: "electric-magenta", name: "Electric Magenta", main: "#D946EF", light: "#F472E8" },
  { id: "hot-coral", name: "Hot Coral", main: "#FF5A5F", light: "#FF7A7F" },
  { id: "vibrant-tangerine", name: "Vibrant Tangerine", main: "#F97316", light: "#FF9A52" },
  { id: "amber", name: "Amber", main: "#F59E0B", light: "#FFC857" },
  { id: "acid-lime", name: "Acid Lime", main: "#84CC16", light: "#A3E635" },
  { id: "emerald", name: "Emerald", main: "#10B981", light: "#34D399" },
  { id: "teal", name: "Teal", main: "#0D9488", light: "#2DD4BF" },
  { id: "cyan", name: "Cyan", main: "#06B6D4", light: "#22D3EE" },
  { id: "sky-blue", name: "Sky Blue", main: "#0284C7", light: "#38BDF8" },
  { id: "electric-red", name: "Electric Red", main: "#EF4444", light: "#FF6B6B" },
  { id: "crimson", name: "Crimson", main: "#DC2626", light: "#FF5757" },
  { id: "rose", name: "Rose", main: "#E11D48", light: "#FB7185" },
]

/**
 * Returns a color token from the palette for an index with a pseudo-random
 * step offset to ensure non-consecutive variety across rows and grids.
 */
export function getColorForIndex(index: number, step = 5): ColorToken {
  const i = (index * step) % PALETTE.length
  return PALETTE[i]
}
