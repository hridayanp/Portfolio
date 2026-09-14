import { motion } from "motion/react"
import { Moon, Sun } from "@phosphor-icons/react"
import { useTheme } from "@/hooks/useTheme"
import { cn } from "@/lib/utils"

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme, isDark } = useTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      data-cursor="link"
      className={cn(
        "relative flex size-10 items-center justify-center rounded-pill border border-[var(--ds-border)] bg-[var(--ds-surface)] text-[var(--ds-text-primary)] transition-all duration-300 hover:border-[var(--ds-border-hover)] hover:bg-[var(--ds-surface-2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-border-accent)]",
        className
      )}
    >
      <motion.div
        key={theme}
        initial={{ rotate: -90, scale: 0.6, opacity: 0 }}
        animate={{ rotate: 0, scale: 1, opacity: 1 }}
        exit={{ rotate: 90, scale: 0.6, opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="flex items-center justify-center"
      >
        {isDark ? (
          <Sun size={18} weight="bold" className="text-[var(--ds-text-primary)]" />
        ) : (
          <Moon size={18} weight="bold" className="text-[var(--ds-text-primary)]" />
        )}
      </motion.div>
    </button>
  )
}
