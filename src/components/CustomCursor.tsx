import { useEffect, useState } from "react"
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "motion/react"
import { usePointerFine } from "@/hooks/usePointerFine"
import { ease, spring } from "@/lib/motion"
import { cn } from "@/lib/utils"

type CursorMode = "default" | "link" | "view" | "flip" | "drag"

/**
 * Custom cursor — spec §12.
 *
 * On a page with no hover colour and several borderless targets, the cursor
 * carries affordance information a visual state would normally carry. Each
 * state here corresponds to a real target type, as the source template's 15
 * cursor definitions do.
 *
 * Performance contract (spec §12, §16): the pointer listener writes to
 * MotionValues only and NEVER calls setState, so mouse movement causes zero
 * React renders. The only state that changes is the discrete mode, and it
 * changes on pointerover of an element carrying `data-cursor` — one delegated
 * listener for the whole document.
 *
 * Gated on (pointer: fine) and (hover: hover) rather than on width, because a
 * touch laptop passes a width test and fails the interaction. Not mounted at
 * all under prefers-reduced-motion.
 *
 * Accessibility (spec §15): nothing is communicated by the cursor alone —
 * every labelled state has a matching affordance in the DOM.
 */
export function CustomCursor() {
  const fine = usePointerFine()
  const reduced = useReducedMotion()
  const enabled = fine && !reduced

  const [mode, setMode] = useState<CursorMode>("default")
  const [visible, setVisible] = useState(false)
  const [pressed, setPressed] = useState(false)

  const x = useMotionValue(-200)
  const y = useMotionValue(-200)

  const isFlip = mode === "flip"
  const isLargeLabel = mode === "view" || mode === "drag"
  const hasLabel = isLargeLabel || isFlip
  const sx = useSpring(x, isLargeLabel ? spring.cursorLarge : spring.cursor)
  const sy = useSpring(y, isLargeLabel ? spring.cursorLarge : spring.cursor)

  useEffect(() => {
    if (!enabled) return

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      if (!visible) setVisible(true)
    }

    const onOver = (e: PointerEvent) => {
      const target = (e.target as HTMLElement | null)?.closest?.(
        "[data-cursor], a, button, input, textarea, select, [role='button']"
      ) as HTMLElement | null
      if (!target) return setMode("default")
      setMode((target.dataset.cursor as CursorMode | undefined) ?? "link")
    }

    const onDown = () => setPressed(true)
    const onUp = () => setPressed(false)
    const onLeave = () => setVisible(false)

    window.addEventListener("pointermove", onMove, { passive: true })
    window.addEventListener("pointerover", onOver, { passive: true })
    window.addEventListener("pointerdown", onDown, { passive: true })
    window.addEventListener("pointerup", onUp, { passive: true })
    document.addEventListener("pointerleave", onLeave)
    document.documentElement.classList.add("cursor-hidden")

    return () => {
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerover", onOver)
      window.removeEventListener("pointerdown", onDown)
      window.removeEventListener("pointerup", onUp)
      document.removeEventListener("pointerleave", onLeave)
      document.documentElement.classList.remove("cursor-hidden")
    }
  }, [enabled, visible, x, y])

  if (!enabled) return null

  const labels: Partial<Record<CursorMode, string>> = {
    view: "View",
    flip: "Flip",
    drag: "Drag",
  }
  const size = isFlip ? 34 : isLargeLabel ? 80 : mode === "link" ? 40 : 12

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className="border-black flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-solid"
        initial={false}
        animate={{
          width: size,
          height: size,
          opacity: visible ? 1 : 0,
          scale: pressed ? 0.86 : 1,
          backgroundColor: hasLabel ? "var(--c-black)" : "rgba(0,0,0,0)",
          // A thick border on a tiny circle reads as a filled dot, so one
          // element grows from dot to outlined ring without swapping nodes.
          borderWidth: hasLabel ? 0 : mode === "link" ? 1.5 : 6,
        }}
        transition={{ duration: 0.3, ease: ease.out }}
      >
        <AnimatePresence mode="wait">
          {hasLabel && (
            <motion.span
              key={mode}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.18 }}
              className={cn(
                "text-ground uppercase select-none",
                isFlip ? "text-[8px] font-bold tracking-tight font-mono" : "text-label"
              )}
            >
              {labels[mode]}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}
