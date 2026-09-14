import { motion, useScroll, useSpring } from "motion/react"
import { spring } from "@/lib/motion"

/**
 * Hairline reading-progress bar. Amber, because §3 assigns the progress
 * token to exactly this: in-flight completion ("step 4 of 6", "80%").
 *
 * Hairline reading-progress bar. On a 20+ viewport-height page this is
 * position feedback, not decoration (cf. spec §11 on the active nav item).
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, spring.scroll)

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[80] h-[2px] origin-left bg-[var(--ds-progress)]"
    />
  )
}
