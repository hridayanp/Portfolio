import { Fragment } from "react"
import { motion, useReducedMotion } from "motion/react"
import { ease, viewportOnce } from "@/lib/motion"
import { cn } from "@/lib/utils"

/**
 * Spec §4, "Typography in motion":
 *   – translate, don't fade (type that fades reads as a loading state)
 *   – clip, don't reveal (every reveal on the source page is really a clip)
 *   – word-level, never per-character
 *
 * Screen readers get the whole string via aria-label; under reduced motion it
 * renders as plain text.
 */
export function MaskedText({
  text,
  className,
  as = "span",
  stagger = 0.04,
  delay = 0,
  /** `view` fires once on scroll-in; `mount` fires immediately (hero only). */
  trigger = "view",
}: {
  text: string
  className?: string
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div"
  stagger?: number
  delay?: number
  trigger?: "view" | "mount"
}) {
  const reduced = useReducedMotion()
  const Tag = motion[as]
  const words = text.split(" ")

  if (reduced) return <Tag className={className}>{text}</Tag>

  const parentProps =
    trigger === "mount"
      ? { initial: "hidden" as const, animate: "visible" as const }
      : { initial: "hidden" as const, whileInView: "visible" as const, viewport: viewportOnce }

  return (
    <Tag
      className={cn(className)}
      aria-label={text}
      {...parentProps}
      variants={{
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span
            aria-hidden
            className="inline-block overflow-hidden align-bottom"
            style={{ paddingBottom: "0.1em", marginBottom: "-0.1em" }}
          >
            <motion.span
              className="inline-block"
              variants={{
                hidden: { y: "110%" },
                visible: { y: "0%", transition: { duration: 0.7, ease: ease.soft } },
              }}
            >
              {word}
            </motion.span>
          </span>
          {/* Separator is a real text node between the masks — never a margin
              and never inside a mask — so the gap is the font's own space. */}
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  )
}

/**
 * A single line that rolls behind a mask edge when its key changes.
 * Used by the expertise numeral (spec §4: the 336×146 clipped numeral box).
 */
export function RollingLine({
  value,
  className,
  direction = 1,
}: {
  value: string
  className?: string
  direction?: 1 | -1
}) {
  const reduced = useReducedMotion()

  if (reduced) return <span className={className}>{value}</span>

  return (
    <span className={cn("relative inline-block overflow-hidden align-bottom", className)}>
      {/* Invisible sizer holds the box open so nothing reflows on change. */}
      <span aria-hidden className="invisible block">
        {value}
      </span>
      <motion.span
        key={value}
        className="absolute inset-0 block"
        initial={{ y: `${110 * direction}%` }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.5, ease: ease.soft }}
      >
        {value}
      </motion.span>
    </span>
  )
}
