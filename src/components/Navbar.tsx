import React, { useState, useEffect } from "react"
import { useTheme } from "@/components/theme-provider"
import { Sun, Moon, Terminal } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

export function Navbar() {
  const { theme, setTheme } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isNavVisible, setIsNavVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Change background opacity / padding on scroll
      if (currentScrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }

      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setIsNavVisible(false)
      } else {
        setIsNavVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  // Smooth scroll helper
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header
      className={cn(
        "fixed left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-[1200px] transition-all duration-500",
        isScrolled ? "top-4" : "top-6",
        isNavVisible ? "translate-y-0 opacity-100" : "-translate-y-24 opacity-0 pointer-events-none"
      )}
    >
      <nav
        className={cn(
          "flex items-center justify-between px-6 md:px-8 py-3 w-full rounded-full border transition-all duration-500",
          isScrolled
            ? "bg-card/75 border-outline-variant/35 shadow-2xl backdrop-blur-2xl py-3"
            : "bg-card/45 border-outline-variant/15 shadow-lg backdrop-blur-xl py-4"
        )}
      >
        {/* Title / Logo */}
        <a
          href="#"
          className="font-sans text-xl md:text-2xl font-bold tracking-tighter text-foreground hover:opacity-85 transition-opacity"
        >
          Hridayan
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-10 text-xs font-mono uppercase tracking-[0.15em]">
          <a
            onClick={(e) => handleScrollTo(e, "work")}
            href="#work"
            className="text-on-surface-variant hover:text-foreground transition-colors min-h-[44px] flex items-center"
          >
            Work
          </a>
          <a
            onClick={(e) => handleScrollTo(e, "expertise")}
            href="#expertise"
            className="text-on-surface-variant hover:text-foreground transition-colors min-h-[44px] flex items-center"
          >
            Expertise
          </a>
          <a
            onClick={(e) => handleScrollTo(e, "experience")}
            href="#experience"
            className="text-on-surface-variant hover:text-foreground transition-colors min-h-[44px] flex items-center"
          >
            Experience
          </a>
          <a
            onClick={(e) => handleScrollTo(e, "contact")}
            href="#contact"
            className="text-on-surface-variant hover:text-foreground transition-colors min-h-[44px] flex items-center"
          >
            Contact
          </a>
        </div>

        {/* CTAs */}
        <div className="flex items-center gap-4">
          {/* Quick terminal indicator link */}
          <button
            onClick={() => {
              const termInput = document.querySelector("input[aria-label='Terminal input prompt']") as HTMLInputElement
              if (termInput) {
                termInput.scrollIntoView({ behavior: "smooth", block: "center" })
                setTimeout(() => termInput.focus(), 800)
              }
            }}
            className="text-on-surface-variant hover:text-primary-container p-2 rounded-full hover:bg-muted/10 transition-all cursor-pointer"
            aria-label="Scroll to Terminal Console"
          >
            <Terminal className="h-5 w-5" />
          </button>

          {/* Theme Switcher Toggle */}
          <button
            onClick={toggleTheme}
            className="text-on-surface-variant hover:text-primary-container p-2 rounded-full hover:bg-muted/10 transition-all cursor-pointer"
            aria-label={`Toggle theme: current is ${theme}`}
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          {/* Resume CTA */}
          <a
            href="#"
            className="bg-foreground text-background font-mono text-xs font-bold px-5 py-2 rounded-full hover:scale-105 active:scale-95 transition-transform shadow-md hover:shadow-lg"
          >
            Resume
          </a>
        </div>
      </nav>
    </header>
  )
}
