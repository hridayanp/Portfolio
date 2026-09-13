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
    "text-btn relative inline-flex items-center justify-center gap-sm rounded-pill px-lg py-md font-medium transition-colors duration-300 select-none"

  const variants = {
    solid: "bg-black text-ground hover:bg-a1 hover:text-white",
    outline: "border border-hairline bg-surface text-ink hover:border-black",
    ghost: "text-ink hover:bg-sunk",
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
