import { motion } from "motion/react"
import { Moon, Sun } from "@phosphor-icons/react"
import { useTheme } from "@/hooks/useTheme"
import { cn } from "@/lib/utils"

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, toggleTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      data-cursor="link"
      className={cn(
        "relative grid size-11 place-items-center rounded-pill border border-[var(--ds-border)] bg-[var(--ds-surface)] text-[var(--ds-text-primary)] shadow-[var(--shadow-xs)] transition-all duration-200 hover:border-[var(--ds-accent-light)] hover:text-[var(--ds-accent)] active:scale-95 focus-visible:ring-2 focus-visible:ring-[var(--ds-border-accent)] focus-visible:outline-none",
        className
      )}
    >
      <motion.div
        key={isDark ? "dark" : "light"}
        initial={{ rotate: -45, opacity: 0, scale: 0.7 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        exit={{ rotate: 45, opacity: 0, scale: 0.7 }}
        transition={{ duration: 0.2 }}
        className="grid place-items-center"
      >
        {isDark ? (
          <Sun size={18} weight="bold" className="text-amber-400" />
        ) : (
          <Moon size={18} weight="bold" className="text-[var(--ds-text-primary)]" />
        )}
      </motion.div>
    </button>
  )
}
