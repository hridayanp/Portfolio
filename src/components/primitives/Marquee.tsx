import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react"
import { motion, useAnimationFrame, useMotionValue, useReducedMotion } from "motion/react"
import { TICKER_SPEED } from "@/lib/motion"
import { cn } from "@/lib/utils"

type MarqueeProps = {
  children: ReactNode
  /** Pixels per second. Negative reverses. Spec §9: the source runs 60 px/s. */
  speed?: number
  className?: string
  trackClassName?: string
  pauseOnHover?: boolean
  ariaLabel?: string
}

/**
 * Seamless ticker, built to the spec's measured mechanics (§9):
 *
 *  – Duplication is required, and the copy count is DYNAMIC: enough copies
 *    that the track always overflows the clip window at any breakpoint.
 *    The source holds 4 copies of an 1815px frame in a 1425px window.
 *  – Seamlessness comes from modulo wrapping by exactly one copy width, so
 *    the jump lands on identical pixels and is invisible.
 *  – Velocity is width-independent: driving px/second rather than a fixed
 *    animation-duration means the ticker reads at the same speed on a 5K
 *    display and a phone. A CSS keyframe would race on narrow screens.
 *  – Linear, never eased. An eased marquee implies a start and stop that
 *    never comes; linear reads as a mechanism running.
 *
 * The copies are generated here, not duplicated by hand in JSX.
 */
export function Marquee({
  children,
  speed = TICKER_SPEED,
  className,
  trackClassName,
  pauseOnHover = false,
  ariaLabel,
}: MarqueeProps) {
  const reduced = useReducedMotion()
  const windowRef = useRef<HTMLDivElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)

  const [copyWidth, setCopyWidth] = useState(0)
  const [copies, setCopies] = useState(2)

  const x = useMotionValue(0)
  const paused = useRef(false)

  // Measure one copy and derive how many are needed to cover the window.
  useLayoutEffect(() => {
    const win = windowRef.current
    const copy = copyRef.current
    if (!win || !copy) return

    const measure = () => {
      const cw = copy.getBoundingClientRect().width
      const ww = win.getBoundingClientRect().width
      if (cw > 0) {
        setCopyWidth(cw)
        setCopies(Math.max(2, Math.ceil(ww / cw) + 1))
      }
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(win)
    ro.observe(copy)
    return () => ro.disconnect()
  }, [children])

  useEffect(() => {
    if (reduced) x.set(0)
  }, [reduced, x])

  useAnimationFrame((_, delta) => {
    if (reduced || paused.current || copyWidth === 0) return
    let next = x.get() - (speed * delta) / 1000
    // Modulo wrap by exactly one copy width.
    if (next <= -copyWidth) next += copyWidth
    if (next > 0) next -= copyWidth
    x.set(next)
  })

  return (
    <div
      ref={windowRef}
      className={cn("relative w-full overflow-hidden", className)}
      aria-label={ariaLabel}
      role={ariaLabel ? "img" : undefined}
      onPointerEnter={pauseOnHover ? () => (paused.current = true) : undefined}
      onPointerLeave={pauseOnHover ? () => (paused.current = false) : undefined}
    >
      <motion.div className="flex w-max flex-nowrap will-change-transform" style={{ x }}>
        {Array.from({ length: copies }, (_, i) => (
          <div
            key={i}
            ref={i === 0 ? copyRef : undefined}
            aria-hidden={i > 0 || Boolean(ariaLabel)}
            className={cn("flex shrink-0 flex-nowrap items-center", trackClassName)}
          >
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  )
}
