import { useCallback, useEffect, useState } from "react"
import { ACCENT_THEMES, DEFAULT_ACCENT_ID, getAccentTheme } from "@/content/theme"

export type Appearance = "light" | "dark"
export type Theme = Appearance

const APPEARANCE_KEY = "theme"
const ACCENT_KEY = "accentTheme"

function readInitialAppearance(): Appearance {
  if (typeof document === "undefined") return "light"
  return document.documentElement.classList.contains("dark") ? "dark" : "light"
}

function readInitialAccent(): string {
  if (typeof localStorage === "undefined") return DEFAULT_ACCENT_ID
  try {
    const stored = localStorage.getItem(ACCENT_KEY)
    if (stored && ACCENT_THEMES.some((t) => t.id === stored)) {
      return stored
    }
  } catch {
    /* ignore */
  }
  return DEFAULT_ACCENT_ID
}

export function useTheme() {
  const [appearance, setAppearanceState] = useState<Appearance>(readInitialAppearance)
  const [accentId, setAccentIdState] = useState<string>(readInitialAccent)

  const activeTheme = getAccentTheme(accentId)

  // Apply appearance class and CSS custom properties at runtime
  useEffect(() => {
    const isDark = appearance === "dark"
    document.documentElement.classList.toggle("dark", isDark)

    const accentColor = isDark ? activeTheme.dark : activeTheme.light
    document.documentElement.style.setProperty("--a-1", accentColor)
    document.documentElement.style.setProperty(
      "--a-tint",
      `color-mix(in srgb, ${accentColor} ${isDark ? "8%" : "5%"}, transparent)`
    )
    document.documentElement.style.setProperty(
      "--a-tint-2",
      `color-mix(in srgb, ${accentColor} ${isDark ? "15%" : "10%"}, transparent)`
    )

    try {
      localStorage.setItem(APPEARANCE_KEY, appearance)
      localStorage.setItem(ACCENT_KEY, accentId)
    } catch {
      /* storage unavailable */
    }
  }, [appearance, accentId, activeTheme])

  const toggleAppearance = useCallback(() => {
    setAppearanceState((prev) => (prev === "dark" ? "light" : "dark"))
  }, [])

  const setAccent = useCallback((id: string) => {
    setAccentIdState(id)
  }, [])

  return {
    appearance,
    setAppearance: setAppearanceState,
    toggleAppearance,
    theme: appearance, // alias for backwards compatibility
    setTheme: setAppearanceState, // alias
    toggle: toggleAppearance, // alias
    accentId,
    activeTheme,
    setAccent,
    themes: ACCENT_THEMES,
  }
}

