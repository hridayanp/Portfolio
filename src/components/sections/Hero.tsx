import { motion, useReducedMotion, useTransform, type MotionValue } from "motion/react"
import { ArrowDown, ArrowUpRight } from "@phosphor-icons/react"
import { contact, identity } from "@/content"
import { FloatingShapes, type FloatingShape } from "@/components/decor/FloatingShapes"
import { MagneticButton } from "@/components/primitives/MagneticButton"
import { Marquee } from "@/components/primitives/Marquee"
import { MaskedText } from "@/components/primitives/MaskedText"
import { StickyScene } from "@/components/primitives/StickyScene"
import { ease } from "@/lib/motion"

/**
 * Six solids in a 1100×700 frame, absolutely placed around the centred card —
 * spec §2, "decoration that obeys the content": they occupy the perimeter of a
 * very open composition so the emptiness reads as authored rather than
 * unfinished. None is interactive; removing them leaves the layout correct.
 *
 * Colour arrives on the page almost entirely through these (spec §13).
 */
const shapes: FloatingShape[] = [
  { kind: "cone", color: "#3157FF", size: 160, top: "8%", left: "4%", depth: 0.8, rotate: 14, desktopOnly: true },
  { kind: "sphere", color: "#FF5A5F", size: 140, top: "12%", left: "82%", depth: 1, desktopOnly: true },
  { kind: "cylinder", color: "#06B6D4", size: 150, top: "62%", left: "88%", depth: 0.65, rotate: -12, desktopOnly: true },
  { kind: "star", color: "#F97316", size: 110, top: "70%", left: "8%", depth: 0.9, desktopOnly: true },
  { kind: "cube", color: "#7C3AED", size: 96, top: "70%", left: "26%", depth: 0.45, rotate: -8, desktopOnly: true },
  { kind: "torus", color: "#84CC16", size: 104, top: "6%", left: "58%", depth: 0.55, rotate: 20, desktopOnly: true },
  /* Phone keeps two, in gutters the text never occupies. */
  { kind: "sphere", color: "#007AFF", size: 72, top: "6%", left: "72%", depth: 0.8, mobileOnly: true },
  { kind: "cone", color: "#D946EF", size: 56, top: "78%", left: "78%", depth: 0.6, rotate: 12, mobileOnly: true },
]

export function Hero() {
  return (
    <StickyScene id="home" vh={2} label="Introduction">
      {(progress) => <HeroScene progress={progress} />}
    </StickyScene>
  )
}

function HeroScene({ progress }: { progress: MotionValue<number> }) {
  const reduced = useReducedMotion()

  /* Scroll-bound, progress-linear, no easing — the scroll is the curve
     (spec §9, narrative tier). */
  const lift = useTransform(progress, [0, 1], ["0%", reduced ? "0%" : "-14%"])
  const fade = useTransform(progress, [0, 0.85], [1, reduced ? 1 : 0])
  const tickerShift = useTransform(progress, [0, 1], ["0%", reduced ? "0%" : "-8%"])

  return (
    <div className="relative flex h-full w-full flex-col justify-between overflow-hidden pt-20 sm:pt-[96px] pb-4 sm:pb-md">
      <FloatingShapes shapes={shapes} />

      {/* The name ticker runs edge to edge BEHIND the composition. Spec §5:
          tickers are the single full-bleed exception, used only for motion,
          and crossing an otherwise inset page is what makes the hero feel
          wider than it is. */}
      <motion.div
        style={{ x: tickerShift }}
        className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2"
        aria-hidden
      >
        <Marquee speed={60} trackClassName="items-center">
          <span className="text-display text-black pr-[0.12em] font-medium whitespace-nowrap opacity-[0.06]">
            {identity.fullName.toUpperCase()}
          </span>
          <span className="text-display pr-[0.12em] font-medium whitespace-nowrap text-[var(--ds-text-disabled)] opacity-70">
            ·
          </span>
        </Marquee>
      </motion.div>

      <motion.div
        style={{ y: lift, opacity: fade }}
        className="relative flex flex-1 flex-col justify-center gutter py-2 sm:py-0"
      >
        <div className="mx-auto flex w-full max-w-[1100px] flex-col items-center gap-3 sm:gap-4 md:gap-5 text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: ease.out, delay: 0.15 }}
            className="border-hairline bg-surface flex items-center gap-sm rounded-pill border py-xs pr-md pl-sm"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-[var(--ds-success)] opacity-70" />
              <span className="relative inline-flex size-2 rounded-full bg-[var(--ds-success)]" />
            </span>
            <span className="eyebrow">{identity.availabilityShort}</span>
          </motion.span>

          {/* 48px greeting line — spec §4's local display step. */}
          <h1 className="sr-only">
            {identity.fullName} — {identity.role}
          </h1>
          <MaskedText
            as="div"
            trigger="mount"
            delay={0.25}
            text={identity.headline}
            className="text-h1 text-black max-w-[16ch]"
          />

          {/* Centre-anchored card, at the composition's optical centre.
              No photograph exists in this project, so the card carries the
              identity typographically rather than holding a placeholder. */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: ease.out, delay: 0.35 }}
            className="card-surface tinted flex size-[200px] sm:size-[220px] md:size-[240px] shrink-0 flex-col justify-between p-4 sm:p-md text-left shadow-[var(--shadow-soft)]"
          >
            <span className="eyebrow">{identity.role}</span>
            <div className="flex flex-col gap-xs">
              <span className="text-h3 text-black leading-none font-semibold">
                {identity.firstName}
              </span>
              <span className="text-h3 text-ink-3 leading-none font-semibold">
                {identity.lastName}
              </span>
            </div>
            <span className="text-label text-ink-2 normal-case tracking-normal">
              {contact.location}
            </span>
          </motion.div>

          <p className="text-body text-ink-2 max-w-[52ch]">{identity.summary}</p>

          {/* Discipline badges — the equivalent of the source's expertise row,
              populated from real content. */}
          <ul className="flex flex-wrap items-center justify-center gap-xs sm:gap-sm">
            {identity.disciplines.map((d) => (
              <li
                key={d}
                className="text-label border-hairline bg-surface text-ink-2 rounded-pill border px-3 sm:px-md py-1 sm:py-sm normal-case tracking-normal"
              >
                {d}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center justify-center gap-sm pt-1">
            <MagneticButton href="#work">
              See the work
              <ArrowUpRight size={16} weight="bold" />
            </MagneticButton>
            <MagneticButton
              href={contact.email ? `mailto:${contact.email}` : "#contact"}
              variant="outline"
            >
              Get in touch
            </MagneticButton>
            {contact.resumeUrl && (
              <MagneticButton href={contact.resumeUrl} variant="ghost" external>
                Read my CV
              </MagneticButton>
            )}
          </div>
        </div>
      </motion.div>

      <div className="text-ink-3 relative flex items-center gap-sm gutter">
        <motion.span
          animate={reduced ? undefined : { y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={14} weight="bold" />
        </motion.span>
        <span className="eyebrow">Scroll</span>
      </div>
    </div>
  )
}
