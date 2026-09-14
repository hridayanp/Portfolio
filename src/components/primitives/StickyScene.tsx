import { useRef, type ReactNode } from "react"
import { useReducedMotion, useScroll, type MotionValue } from "motion/react"
import { cn } from "@/lib/utils"

type StickySceneProps = {
  id?: string
  /**
   * Scroll budget in viewport-heights. The wrapper is `vh × 100svh` tall and
   * the child is pinned at one viewport, so the surplus height becomes the
   * animation timeline. Spec §10, Pattern A.
   */
  vh?: number
  /** Sticky offset. The source template uses −50px on Services (spec §10). */
  top?: number
  className?: string
  sceneClassName?: string
  label?: string
  /** Receives scroll progress across the pinned range, 0 → 1. */
  children: ReactNode | ((progress: MotionValue<number>) => ReactNode)
}

/**
 * THE KEY ABSTRACTION (spec §21).
 *
 * Framer expresses "this animation lasts N viewports" with hand-measured
 * spacer divs (`Services-Scroll-Section-01…12`), which is why adding a
 * thirteenth item there means re-measuring a parent height. Here the budget
 * is a number, so the tax disappears.
 *
 * Under reduced motion the scene collapses to normal flow: no pin, no
 * over-tall track, content simply readable in place (spec §15).
 */
export function StickyScene({
  id,
  vh = 2,
  top = 0,
  className,
  sceneClassName,
  label,
  children,
}: StickySceneProps) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  })

  const body = typeof children === "function" ? children(scrollYProgress) : children

  if (reduced) {
    return (
      <section id={id} aria-label={label} className={cn("relative w-full", className)}>
        <div className={cn("w-full", sceneClassName)}>{body}</div>
      </section>
    )
  }

  return (
    <section
      ref={ref}
      id={id}
      aria-label={label}
      className={cn("relative w-full", className)}
      style={{ height: `${vh * 100}svh` }}
    >
      <div
        className={cn("sticky h-[100svh] w-full overflow-hidden", sceneClassName)}
        style={{ top: `${top}px` }}
      >
        {body}
      </div>
    </section>
  )
}

/**
 * Pattern B (spec §10): sibling cards each pinned at top:0 inside one parent,
 * so each subsequent card scrolls up and covers the previous. Pure CSS — no
 * scroll listener, no rAF. The lead-in is why the parent is 3.5vh for three
 * cards rather than 3.0: half a viewport so the first card reads before
 * stacking begins.
 */
export function StackScene({
  id,
  children,
  leadIn = 0.5,
  className,
  label,
}: {
  id?: string
  children: ReactNode[]
  leadIn?: number
  className?: string
  label?: string
}) {
  const reduced = useReducedMotion()

  if (reduced) {
    return (
      <section id={id} aria-label={label} className={cn("relative w-full", className)}>
        <div className="flex w-full flex-col gap-lg">{children}</div>
      </section>
    )
  }

  return (
    <section
      id={id}
      aria-label={label}
      className={cn("relative w-full", className)}
      style={{ height: `${(children.length + leadIn) * 100}svh` }}
    >
      {children.map((child, i) => (
        <div
          key={i}
          className="sticky top-0 flex h-[100svh] w-full items-center justify-center pt-[96px] pb-6 sm:pb-8"
          style={{ zIndex: i + 1 }}
        >
          {child}
        </div>
      ))}
    </section>
  )
}

