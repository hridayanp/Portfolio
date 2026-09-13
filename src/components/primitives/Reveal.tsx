import type { ReactNode } from "react"
import { motion, useReducedMotion } from "motion/react"
import { ease, viewportOnce } from "@/lib/motion"
import { cn } from "@/lib/utils"

/**
 * Entrance animation — DELIBERATELY RATIONED.
 *
 * Spec §9: the source page carries only three entrance animations across 405
 * named layers. Its sense of liveliness comes from continuous motion
 * (tickers, drifting shapes) and scroll-bound motion (sticky scenes), not
 * from reveal-on-enter, because reveals delay content and read as a plugin.
 *
 * Use this for a section's opening block only. Never per card, per list item
 * or per paragraph.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 20,
  as = "div",
}: {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  as?: "div" | "li" | "span" | "p"
}) {
  const reduced = useReducedMotion()
  const Tag = motion[as]

  return (
    <Tag
      className={cn(className)}
      initial={{ opacity: 0, y: reduced ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: reduced ? 0.15 : 0.5, ease: ease.out, delay: reduced ? 0 : delay }}
    >
      {children}
    </Tag>
  )
}
