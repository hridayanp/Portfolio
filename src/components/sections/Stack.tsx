import { useMemo, useState } from "react"
import { AnimatePresence, motion, useReducedMotion, type Variants } from "motion/react"
import { ArrowDown } from "@phosphor-icons/react"
import {
  heroFooter,
  stackFilters,
  stackGroups,
  stackSection,
  type StackFilterId,
} from "@/content"
import { Section } from "@/components/primitives/Section"
import { Shape3D } from "@/components/decor/Shape3D"
import { MaskedText } from "@/components/primitives/MaskedText"
import { ease } from "@/lib/motion"
import { cn } from "@/lib/utils"

/**
 * Stack & production tooling.
 *
 * Harmonised with About / Expertise: the same monospaced bracket eyebrow and
 * `NN / NN` index, the same family of 3D solids anchoring the composition,
 * and the same editorial transition dot that paces the scroll between
 * chapters. The cards stay what they are — a scannable grid of tools — but
 * their category tag now speaks the site's mono-bracket dialect, and the
 * reverse carries the candid production note.
 *
 * Nothing here is written in JSX: every string comes from `content/stack.ts`.
 */

/**
 * Status-pip ramp. The watermark behind each card is the same hue at low
 * alpha rather than a baked-in tint, so the grid keeps its colour in dark
 * mode instead of turning into pale smudges.
 */
const PIPS = [
  "#3b82f6",
  "#f43f5e",
  "#10b981",
  "#e11d48",
  "#a855f7",
  "#14b8a6",
  "#ef4444",
  "#8b5cf6",
  "#f97316",
  "#818cf8",
  "#f59e0b",
  "#06b6d4",
] as const

const containerVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.035,
      delayChildren: 0.02,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.02,
      staggerDirection: -1,
      duration: 0.18,
    },
  },
}

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 24,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.32,
      ease: ease.out,
    },
  },
  exit: {
    opacity: 0,
    x: -24,
    scale: 0.98,
    transition: {
      duration: 0.2,
      ease: ease.out,
    },
  },
}

type Card = {
  name: string
  note: string
  tag: string
  filter: Exclude<StackFilterId, "all">
}

export function Stack() {
  const [active, setActive] = useState<StackFilterId>("all")
  const reduced = useReducedMotion()

  const cards = useMemo<Card[]>(
    () =>
      stackGroups.flatMap((g) =>
        g.items.map((item) => ({
          name: item.name,
          note: item.note,
          tag: g.tag,
          filter: g.filter,
        }))
      ),
    []
  )

  /* Counts are derived so the control row can never drift from the grid. */
  const counts = useMemo(() => {
    const map = new Map<StackFilterId, number>([["all", cards.length]])
    for (const c of cards) map.set(c.filter, (map.get(c.filter) ?? 0) + 1)
    return map
  }, [cards])

  const visible = active === "all" ? cards : cards.filter((c) => c.filter === active)

  return (
    <Section id="stack" label="Stack" className="overflow-hidden">
      {/* ---- Ambient 3D continuity with About / Expertise ---- */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="animate-pulse-glow absolute top-0 right-[6%] size-[420px] rounded-full bg-[var(--ds-orb-blue)] blur-[110px]" />
        <div
          className="animate-pulse-glow absolute bottom-[12%] left-[-4%] size-[420px] rounded-full bg-[var(--ds-orb-emerald)] blur-[110px]"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <Float className="top-24 right-4 hidden sm:block md:right-10 lg:right-16" dur={7}>
        <Shape3D kind="cube" hue="blue" size={112} />
      </Float>
      <Float className="bottom-24 left-2 hidden sm:block md:left-8" dur={9} delay={2} reverse>
        <Shape3D kind="cylinder" hue="green" size={96} />
      </Float>

      <div className="relative flex flex-col gap-lg">
        {/* ---- Section header ---- */}
        <div className="mx-auto flex w-full max-w-[860px] flex-col items-center text-center">
          <span className="eyebrow mb-6 inline-flex items-center gap-2 rounded-pill border border-[var(--ds-border)] bg-[var(--ds-surface)]/80 px-3.5 py-1 tracking-wider text-[var(--ds-text-secondary)] shadow-[var(--shadow-xs)] backdrop-blur-md">
            <span
              aria-hidden
              className="size-2 shrink-0 animate-pulse rounded-full bg-[var(--ds-accent)]"
            />
            {stackSection.eyebrow}
            <span className="ms-1 border-s border-[var(--ds-border-strong)] ps-2 text-[var(--ds-text-faint)]">
              {stackSection.index} / {stackSection.total}
            </span>
          </span>

          <MaskedText
            as="h2"
            text={stackSection.title}
            className="text-h2 mx-auto max-w-[22ch] text-[var(--ds-text-primary)]"
          />

          <p className="text-lead mx-auto mt-5 max-w-[62ch] text-[var(--ds-text-secondary)]">
            {stackSection.lede}
          </p>

          {/* Editorial transition dot — the same cadence marker the sticky
              About / Expertise scenes use between chapters. */}
          <span
            aria-hidden
            className="mt-6 block size-2.5 rounded-full bg-[var(--ds-text-primary)]/80 shadow-[0_0_0_4px_var(--ds-accent-tint)]"
          />
        </div>

        {/* ---- Filter control row ---- */}
        <div
          role="tablist"
          aria-label="Filter the stack by layer"
          className="mx-auto flex flex-wrap items-center justify-center gap-2"
        >
          {stackFilters.map((f) => {
            const on = active === f.id
            const n = counts.get(f.id) ?? 0
            return (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setActive(f.id)}
                data-cursor="link"
                className={cn(
                  "text-label relative inline-flex items-center gap-1.5 rounded-pill px-4 py-1.5 tracking-normal normal-case transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[var(--ds-border-accent)] focus-visible:outline-none select-none",
                  on
                    ? "font-semibold text-[var(--ds-accent)] shadow-[var(--shadow-xs)]"
                    : "border border-[var(--ds-border)] bg-[var(--ds-surface)]/90 text-[var(--ds-text-secondary)] hover:border-[var(--ds-accent-light)] hover:text-[var(--ds-accent)]"
                )}
              >
                {on && (
                  <motion.div
                    layoutId="activeStackFilter"
                    className="absolute inset-0 rounded-pill border border-[var(--ds-accent-border)] bg-[var(--ds-accent-subtle)] -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                {on && (
                  <span aria-hidden className="relative z-10 size-1.5 rounded-full bg-[var(--ds-accent)]" />
                )}
                <span className="relative z-10">{f.label} [{n}]</span>
              </button>
            )
          })}
        </div>

        {/* ---- Card grid ---- */}
        <div className="min-h-[220px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.ul
              key={active}
              variants={reduced ? undefined : containerVariants}
              initial={reduced ? undefined : "hidden"}
              animate={reduced ? undefined : "visible"}
              exit={reduced ? undefined : "exit"}
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"
            >
              {visible.map((tech) => (
                <StackCard key={tech.name} card={tech} pip={pipFor(tech.name, cards)} />
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>

        {/* ---- Philosophy callout + transition to the next chapter ---- */}
        <div className="mx-auto mt-lg w-full max-w-[760px] border-t border-[var(--ds-border)] pt-lg text-center">
          <span className="text-label inline-flex items-center gap-2 rounded-pill border border-[var(--ds-border)] bg-[var(--ds-surface)] px-4 py-1.5 tracking-normal normal-case text-[var(--ds-text-secondary)] shadow-[var(--shadow-xs)]">
            <span aria-hidden className="size-2 rounded-full bg-[var(--ds-success)]" />
            {stackSection.calloutBadge}
          </span>

          <p className="text-body mt-4 text-[var(--ds-text-secondary)] italic">
            “{stackSection.callout}”
          </p>

          <div className="font-mono mt-8 flex flex-col items-center justify-between gap-3 border-t border-[var(--ds-border-subtle)] pt-6 text-[11px] text-[var(--ds-text-faint)] sm:flex-row">
            <a
              href="#services"
              data-cursor="link"
              className="inline-flex items-center gap-2 tracking-wider transition-colors hover:text-[var(--ds-accent)]"
            >
              <ArrowDown size={13} weight="bold" />
              [ {stackSection.scrollHint} ]
            </a>
            <span>
              {heroFooter.credit} © {new Date().getFullYear()}
            </span>
          </div>
        </div>
      </div>
    </Section>
  )
}

function StackCard({
  card,
  pip,
}: {
  card: Card
  pip: string
}) {
  const [flipped, setFlipped] = useState(false)
  const reduced = useReducedMotion()

  return (
    <motion.li
      variants={reduced ? undefined : cardVariants}
      className="h-[210px] [perspective:1000px]"
    >
      <button
        type="button"
        onPointerEnter={() => setFlipped(true)}
        onPointerLeave={() => setFlipped(false)}
        onFocus={() => setFlipped(true)}
        onBlur={() => setFlipped(false)}
        onClick={() => setFlipped((f) => !f)}
        aria-label={`${card.name}: ${card.note}`}
        aria-pressed={flipped}
        data-cursor="flip"
        className="group relative block size-full rounded-2xl text-left focus-visible:ring-2 focus-visible:ring-[var(--ds-border-accent)] focus-visible:outline-none"
      >
        <motion.div
          className="relative size-full [transform-style:preserve-3d]"
          animate={{ rotateY: flipped && !reduced ? 180 : 0 }}
          transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* Front */}
          <div className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-2xl border border-[var(--ds-border)] bg-[var(--ds-surface)]/95 p-5 shadow-[var(--shadow-card-subtle)] transition-all duration-300 [backface-visibility:hidden] group-hover:border-[var(--ds-accent)]/30 group-hover:shadow-[var(--shadow-card-hover)]">
            <span
              aria-hidden
              className="pointer-events-none absolute right-3 bottom-0 text-[3.1rem] leading-none font-extrabold tracking-tighter opacity-[0.16] select-none"
              style={{ color: pip }}
            >
              {card.name.slice(0, 2)}
            </span>

            <div className="flex items-center justify-between">
              <span
                aria-hidden
                className="size-2.5 rounded-full"
                style={{ backgroundColor: pip }}
              />
            </div>

            <div className="relative z-10">
              <h3 className="text-body leading-tight font-bold tracking-tight text-[var(--ds-text-primary)]">
                {card.name}
              </h3>
              <p className="font-mono mt-0.5 text-[11px] text-[var(--ds-text-faint)]">
                [ {card.tag} ]
              </p>
            </div>

            {/* Reduced motion never turns the card, so the note has to live
                on the front or it becomes unreachable. */}
            {reduced && (
              <p className="text-label relative z-10 tracking-normal normal-case text-[var(--ds-text-secondary)]">
                {card.note}
              </p>
            )}
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-2xl bg-[#00A3C4] p-5 text-white shadow-[var(--shadow-lift)] [backface-visibility:hidden]"
            style={{ transform: "rotateY(180deg)" }}
          >
            <p className="text-label my-auto leading-relaxed tracking-normal normal-case text-white/95">
              {card.note}
            </p>
            <p className="font-mono text-[11px] text-white/80">[ {card.tag} ]</p>
          </div>
        </motion.div>
      </button>
    </motion.li>
  )
}

/**
 * Colour is picked from the card's position in the FULL list, not the
 * filtered one, so a card keeps its pip when the grid is filtered — and
 * stepping by 5 keeps neighbours from repeating a hue.
 */
function pipFor(name: string, all: Card[]) {
  const i = all.findIndex((c) => c.name === name)
  return PIPS[((i < 0 ? 0 : i) * 5) % PIPS.length]
}

/** Local idle-float wrapper, mirroring the hero's decorative solids. */
function Float({
  children,
  className,
  dur = 7,
  delay = 0,
  reverse = false,
}: {
  children: React.ReactNode
  className?: string
  dur?: number
  delay?: number
  reverse?: boolean
}) {
  const reduced = useReducedMotion()
  const dy = reverse ? [0, 10, 0] : [0, -10, 0]

  return (
    <motion.div
      aria-hidden
      animate={reduced ? undefined : { y: dy, rotate: reverse ? [0, -1.5, 0] : [0, 1.5, 0] }}
      transition={{ duration: dur, delay, repeat: Infinity, ease: "easeInOut" }}
      className={cn("pointer-events-none absolute -z-10 select-none", className)}
    >
      {children}
    </motion.div>
  )
}
