import { useRef, type ReactNode } from "react"
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react"
import { usePointerFine } from "@/hooks/usePointerFine"
import { spring } from "@/lib/motion"
import { cn } from "@/lib/utils"

/**
 * Pointer-attracted button. The transform lives entirely in MotionValues, so
 * moving the mouse never triggers a React render (spec §16, §19).
 * Gated on (pointer: fine) and reduced-motion.
 *
 * Type is the 18/36 button step from the spec's preset table (§4).
 */
export function MagneticButton({
  children,
  href,
  onClick,
  className,
  variant = "solid",
  strength = 12,
  external,
  ariaLabel,
}: {
  children: ReactNode
  href?: string
  onClick?: () => void
  className?: string
  variant?: "solid" | "outline" | "ghost"
  strength?: number
  external?: boolean
  ariaLabel?: string
}) {
  const ref = useRef<HTMLElement>(null)
  const fine = usePointerFine()
  const reduced = useReducedMotion()
  const active = fine && !reduced

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, spring.magnet)
  const y = useSpring(my, spring.magnet)

  const handleMove = (e: React.PointerEvent) => {
    if (!active || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    mx.set(((e.clientX - (r.left + r.width / 2)) / (r.width / 2)) * strength)
    my.set(((e.clientY - (r.top + r.height / 2)) / (r.height / 2)) * strength)
  }

  const reset = () => {
    mx.set(0)
    my.set(0)
  }

  const base =
    "text-btn font-mono relative inline-flex items-center justify-center gap-sm rounded-none px-md py-sm transition-colors duration-200 select-none focus-visible:ring-2 focus-visible:ring-[var(--ds-border-accent)] focus-visible:outline-none"

  /**
   * Achilles §11: the primary CTA INVERTS the palette — a light fill on a dark
   * page — because that is the only way to get an unmistakable action button
   * without introducing a saturated brand hue. Secondary actions rely on a
   * border rather than a fill, matching the border-over-shadow surface
   * philosophy (§12). Hover brightens the fill or the border and never
   * introduces a new hue (§14).
   */
  const variants = {
    solid:
      "bg-[var(--ds-accent)] text-[var(--ds-text-inverse)] hover:bg-[var(--ds-accent-hover)] active:bg-[var(--ds-accent-active)]",
    outline:
      "border border-[var(--ds-border-strong)] bg-transparent text-ink hover:border-[var(--ds-border-hover)] hover:bg-[var(--ds-accent-subtle)] hover:text-[var(--ds-accent-hover)]",
    ghost: "text-ink-2 hover:bg-[var(--ds-accent-subtle)] hover:text-ink",
  } as const

  const shared = {
    className: cn(base, variants[variant], className),
    style: { x, y },
    onPointerMove: handleMove,
    onPointerLeave: reset,
    whileTap: { scale: 0.97 },
    "data-cursor": "link" as const,
    "aria-label": ariaLabel,
  }

  if (href) {
    return (
      <motion.a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        {...shared}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      type="button"
      onClick={onClick}
      {...shared}
    >
      {children}
    </motion.button>
  )
}
