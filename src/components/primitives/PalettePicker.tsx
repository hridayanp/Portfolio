import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Check, Moon, Sun } from "@phosphor-icons/react"
import { useTheme } from "@/hooks/useTheme"
import { ease } from "@/lib/motion"
import { cn } from "@/lib/utils"

export function PalettePicker({ className }: { className?: string }) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const { appearance, toggleAppearance, accentId, activeTheme, setAccent, themes } = useTheme()
  const isDark = appearance === "dark"

  // Close when clicking outside
  useEffect(() => {
    if (!open) return
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false)
        triggerRef.current?.focus()
      }
    }
    document.addEventListener("mousedown", onPointerDown)
    document.addEventListener("touchstart", onPointerDown)
    window.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("mousedown", onPointerDown)
      document.removeEventListener("touchstart", onPointerDown)
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [open])

  const currentColor = isDark ? activeTheme.dark : activeTheme.light

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {/* Compact Trigger Button (matches exact size-11 footprint of previous toggle) */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={`Accent color palette: ${activeTheme.name} (${appearance} mode). Click to change.`}
        data-cursor="link"
        className={cn(
          "relative grid size-11 place-items-center overflow-hidden rounded-pill border border-hairline bg-surface text-ink transition-all duration-200 hover:border-black active:scale-95 focus-visible:ring-2 focus-visible:ring-a1 focus-visible:outline-none",
          open && "border-black shadow-[var(--shadow-soft)]"
        )}
      >
        <span
          className="size-4.5 rounded-full border border-black/10 shadow-xs transition-colors duration-300 dark:border-white/20"
          style={{ backgroundColor: currentColor }}
          aria-hidden="true"
        />
      </button>

      {/* Popover */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Select accent theme"
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.96 }}
            transition={{ duration: 0.2, ease: ease.out }}
            className="border-hairline absolute top-[calc(100%+8px)] right-0 z-[120] w-[290px] rounded-xl border bg-[color-mix(in_oklab,var(--c-surface)_92%,transparent)] p-3 shadow-2xl backdrop-blur-xl sm:w-[320px]"
          >
            {/* Popover Header */}
            <div className="mb-2.5 flex items-center justify-between px-1">
              <div>
                <span className="eyebrow block text-[11px]">Accent Palette</span>
                <span className="text-[12px] font-medium text-ink">
                  {activeTheme.name}
                </span>
              </div>

              {/* Unobtrusive Appearance (Light / Dark) switcher */}
              <button
                type="button"
                onClick={toggleAppearance}
                data-cursor="link"
                aria-label={`Switch to ${isDark ? "light" : "dark"} appearance`}
                className="border-hairline bg-surface hover:border-black text-ink inline-flex items-center gap-1.5 rounded-pill border px-2.5 py-1 text-[11px] font-medium transition-all duration-200 active:scale-95 focus-visible:ring-2 focus-visible:ring-a1 focus-visible:outline-none"
              >
                {isDark ? (
                  <>
                    <Sun size={13} weight="bold" />
                    <span>Dark</span>
                  </>
                ) : (
                  <>
                    <Moon size={13} weight="bold" />
                    <span>Light</span>
                  </>
                )}
              </button>
            </div>

            {/* Accent Theme Grid */}
            <div
              role="radiogroup"
              aria-label="Color themes"
              className="grid max-h-[300px] grid-cols-2 gap-1 overflow-y-auto pr-0.5 [scrollbar-width:thin]"
              onKeyDown={(e) => {
                const currentIndex = themes.findIndex((t) => t.id === accentId)
                if (e.key === "ArrowDown" || e.key === "ArrowRight") {
                  e.preventDefault()
                  const nextIndex = (currentIndex + 1) % themes.length
                  setAccent(themes[nextIndex].id)
                } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
                  e.preventDefault()
                  const prevIndex = (currentIndex - 1 + themes.length) % themes.length
                  setAccent(themes[prevIndex].id)
                }
              }}
            >
              {themes.map((t) => {
                const isSelected = t.id === accentId
                const swatchColor = isDark ? t.dark : t.light

                return (
                  <button
                    key={t.id}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    aria-label={`${t.name} accent color: ${t.character}`}
                    title={`${t.name} — ${t.character}`}
                    onClick={() => {
                      setAccent(t.id)
                    }}
                    className={cn(
                      "group flex items-center gap-2 rounded-lg px-2 py-1.5 text-left transition-all duration-150 focus-visible:ring-2 focus-visible:ring-a1 focus-visible:outline-none",
                      isSelected
                        ? "bg-black/10 font-semibold text-black dark:bg-white/15"
                        : "text-ink-2 hover:bg-black/5 hover:text-black dark:hover:bg-white/8"
                    )}
                  >
                    <span
                      className="relative flex size-3.5 shrink-0 items-center justify-center rounded-full border border-black/10 shadow-xs dark:border-white/20"
                      style={{ backgroundColor: swatchColor }}
                      aria-hidden="true"
                    >
                      {isSelected && (
                        <Check
                          size={10}
                          weight="bold"
                          className="text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]"
                        />
                      )}
                    </span>
                    <span className="truncate text-[12px] leading-tight select-none">
                      {t.name}
                    </span>
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
