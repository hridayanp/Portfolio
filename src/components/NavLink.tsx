import { motion } from "motion/react"
import { ease } from "@/lib/motion"
import { cn } from "@/lib/utils"

/**
 * The masked label swap — spec §11, measured exactly on the source:
 *
 *   <a overflow:hidden> containing TWO copies of the word. One sits in flow
 *   (reserving the box so nothing reflows), the other is offset by one
 *   line-height. On hover the pair slides.
 *
 * The in-flow duplicate is what makes the swap reflow-free, and it is the
 * detail most hand-built versions of this effect get wrong.
 *
 * One fix over the source: the duplicate is aria-hidden here. The original
 * leaves it exposed, so screen readers announce every nav item twice
 * (spec §15).
 */
export function NavLink({
  label,
  href,
  isActive,
  onClick,
  className,
}: {
  label: string
  href: string
  isActive?: boolean
  onClick?: () => void
  className?: string
}) {
  return (
    <motion.a
      href={href}
      onClick={onClick}
      data-cursor="link"
      aria-current={isActive ? "page" : undefined}
      initial="rest"
      whileHover="hover"
      whileFocus="hover"
      className={cn(
        "text-label relative inline-flex items-center rounded-pill px-md py-sm align-bottom normal-case tracking-normal transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-[var(--ds-border-accent)] focus-visible:outline-none",
        isActive
          ? "font-semibold text-[var(--ds-accent)]"
          : "text-[var(--ds-text-secondary)] hover:text-[var(--ds-accent)]",
        className
      )}
    >
      {/* Active marker: a 4px dot centred beneath the label, as the design
          specifies — it sits outside the masked box so the hover slide
          never clips it. */}
      {isActive && (
        <span
          aria-hidden
          className="absolute bottom-1 left-1/2 size-1 -translate-x-1/2 rounded-full bg-[var(--ds-accent)]"
        />
      )}

      <span className="relative block h-[1.4em] overflow-hidden leading-[1.4em]">
        <motion.span
          className="flex flex-col"
          variants={{ rest: { y: "0%" }, hover: { y: "-50%" } }}
          transition={{ duration: 0.25, ease: ease.out }}
        >
          <span className="block h-[1.4em] leading-[1.4em] select-none">
            {label}
          </span>
          <span aria-hidden className="block h-[1.4em] leading-[1.4em] select-none">
            {label}
          </span>
        </motion.span>
      </span>
    </motion.a>
  )
}
