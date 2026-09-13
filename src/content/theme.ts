export interface AccentTheme {
  id: string
  name: string
  light: string
  dark: string
  character: string
}

export const ACCENT_THEMES: AccentTheme[] = [
  {
    id: "electric-cobalt",
    name: "Electric Cobalt",
    light: "#3157FF",
    dark: "#6B83FF",
    character: "Premium, tech, confident",
  },
  {
    id: "vivid-azure",
    name: "Vivid Azure",
    light: "#007AFF",
    dark: "#4DA3FF",
    character: "Apple-like, clean",
  },
  {
    id: "deep-indigo",
    name: "Deep Indigo",
    light: "#5146E5",
    dark: "#8B83FF",
    character: "Creative, sophisticated",
  },
  {
    id: "hyper-violet",
    name: "Hyper Violet",
    light: "#7C3AED",
    dark: "#A78BFA",
    character: "Modern, expressive",
  },
  {
    id: "electric-magenta",
    name: "Electric Magenta",
    light: "#D946EF",
    dark: "#F472E8",
    character: "Bold, artistic",
  },
  {
    id: "hot-coral",
    name: "Hot Coral",
    light: "#FF5A5F",
    dark: "#FF7A7F",
    character: "Airbnb-esque, warm",
  },
  {
    id: "vibrant-tangerine",
    name: "Vibrant Tangerine",
    light: "#F97316",
    dark: "#FF9A52",
    character: "Energetic, friendly",
  },
  {
    id: "amber",
    name: "Amber",
    light: "#F59E0B",
    dark: "#FFC857",
    character: "Warm, premium",
  },
  {
    id: "acid-lime",
    name: "Acid Lime",
    light: "#84CC16",
    dark: "#A3E635",
    character: "Technical, energetic",
  },
  {
    id: "emerald",
    name: "Emerald",
    light: "#10B981",
    dark: "#34D399",
    character: "Natural, polished",
  },
  {
    id: "teal",
    name: "Teal",
    light: "#0D9488",
    dark: "#2DD4BF",
    character: "Calm, technical",
  },
  {
    id: "cyan",
    name: "Cyan",
    light: "#06B6D4",
    dark: "#22D3EE",
    character: "Futuristic, clean",
  },
  {
    id: "sky-blue",
    name: "Sky Blue",
    light: "#0284C7",
    dark: "#38BDF8",
    character: "Professional, airy",
  },
  {
    id: "electric-red",
    name: "Electric Red",
    light: "#EF4444",
    dark: "#FF6B6B",
    character: "Strong, attention-grabbing",
  },
  {
    id: "crimson",
    name: "Crimson",
    light: "#DC2626",
    dark: "#FF5757",
    character: "Editorial, dramatic",
  },
  {
    id: "rose",
    name: "Rose",
    light: "#E11D48",
    dark: "#FB7185",
    character: "Sophisticated, expressive",
  },
]

export const DEFAULT_ACCENT_ID = "electric-cobalt"

export function getAccentTheme(id: string): AccentTheme {
  return ACCENT_THEMES.find((t) => t.id === id) ?? ACCENT_THEMES[0]
}
