import { motion, useScroll, useSpring } from "motion/react"
import { spring } from "@/lib/motion"

/**
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
      className="bg-a1 fixed inset-x-0 top-0 z-[80] h-[2px] origin-left"
    />
  )
}
