import { AnimatePresence, motion } from "motion/react"
import { Moon, Sun } from "@phosphor-icons/react"
import { useTheme } from "@/hooks/useTheme"
import { ease } from "@/lib/motion"
import { cn } from "@/lib/utils"

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle } = useTheme()

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      data-cursor="link"
      className={cn(
        "relative grid size-11 place-items-center overflow-hidden rounded-pill border border-hairline bg-surface text-ink transition-colors hover:border-black",
        className
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: 14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -14, opacity: 0 }}
          transition={{ duration: 0.25, ease: ease.out }}
          className="absolute"
        >
          {theme === "dark" ? <Sun size={17} weight="bold" /> : <Moon size={17} weight="bold" />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
