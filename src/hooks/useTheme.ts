import { useEffect, useState } from "react"

export type Theme = "light" | "dark" | "system"

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") return "system"
    return (localStorage.getItem("theme") as Theme) || "system"
  })

  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light"
    const stored = localStorage.getItem("theme") as Theme
    if (stored === "dark" || stored === "light") return stored
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  })

  useEffect(() => {
    const root = document.documentElement
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

    const applyTheme = () => {
      const isDark =
        theme === "dark" || (theme === "system" && mediaQuery.matches)

      const newResolved = isDark ? "dark" : "light"
      setResolvedTheme(newResolved)

      if (isDark) {
        root.classList.add("dark")
        document.querySelector('meta[name="theme-color"]')?.setAttribute("content", "#090d16")
        document.querySelector('meta[name="color-scheme"]')?.setAttribute("content", "dark")
      } else {
        root.classList.remove("dark")
        document.querySelector('meta[name="theme-color"]')?.setAttribute("content", "#fafbfd")
        document.querySelector('meta[name="color-scheme"]')?.setAttribute("content", "light")
      }
    }

    applyTheme()

    if (theme === "system") {
      localStorage.removeItem("theme")
    } else {
      localStorage.setItem("theme", theme)
    }

    const handleChange = () => {
      if (theme === "system") {
        applyTheme()
      }
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [theme])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
  }

  const toggleTheme = () => {
    setThemeState((prev) => {
      const current = prev === "system" ? resolvedTheme : prev
      return current === "dark" ? "light" : "dark"
    })
  }

  return {
    theme,
    resolvedTheme,
    setTheme,
    toggleTheme,
  }
}
