/* eslint-disable react-refresh/only-export-components */
import * as React from "react"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeProviderContext = React.createContext<
  ThemeProviderState | undefined
>(undefined)

export function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps) {
  const applyTheme = React.useCallback(() => {
    const root = document.documentElement
    root.classList.remove("light")
    root.classList.add("dark")
  }, [])

  React.useEffect(() => {
    applyTheme()
  }, [applyTheme])

  const value = React.useMemo(
    () => ({
      theme: "dark" as Theme,
      setTheme: () => {},
    }),
    []
  )

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = React.useContext(ThemeProviderContext)

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }

  return context
}
