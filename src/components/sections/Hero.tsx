import type { ReactNode } from "react"
import { motion, useReducedMotion } from "motion/react"
import { ArrowDown, ArrowUpRight } from "@phosphor-icons/react"
import { contact, heroFooter, heroMetrics, identity } from "@/content"
import { Shape3D } from "@/components/decor/Shape3D"
import { ease } from "@/lib/motion"
import { cn } from "@/lib/utils"

/**
 * Hero.
 *
 * Layout and composition follow the supplied design: a full-viewport,
 * centre-stacked editorial hero over an ambient light field, with colourful
 * 3D solids at the perimeter, a giant typographic watermark behind, and a
 * glass signature card at the optical centre.
 *
 * All copy is read from `content/` — nothing is written into this file.
 */
export function Hero() {
  const reduced = useReducedMotion()

  /* The headline's final word carries the gradient. Derived rather than
     hard-coded so editing `identity.headline` keeps working. */
  const words = identity.headline.trim().split(" ")
  const lead = words.slice(0, -1).join(" ")
  const accentWord = words[words.length - 1]

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduced ? 0 : 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: ease.out, delay: reduced ? 0 : delay },
  })

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] w-full flex-col justify-between overflow-hidden pt-[88px]"
    >
      {/* ---- Ambient field: light orbs + dot mesh ---- */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="animate-pulse-glow absolute top-12 left-1/4 size-[500px] rounded-full blur-[120px]"
          style={{ backgroundColor: "var(--ds-orb-blue)" }}
        />
        <div
          className="animate-pulse-glow absolute top-1/3 right-1/4 size-[450px] rounded-full blur-[100px]"
          style={{ backgroundColor: "var(--ds-orb-emerald)", animationDelay: "2s" }}
        />
      </div>

      {/* ---- Giant typographic watermark ---- */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden select-none"
      >
        <span
          className="text-display font-display font-extrabold whitespace-nowrap uppercase"
          style={{ color: "var(--ds-watermark)" }}
        >
          {identity.fullName}
        </span>
      </div>

      {/* ---- Floating 3D accents ---- */}
      <Float className="top-[92px] left-6 md:left-14 lg:left-24" dur={7}>
        <Shape3D kind="cone" hue="blue" size={96} className="md:hidden" />
        <Shape3D kind="cone" hue="blue" size={144} className="hidden md:block" />
      </Float>

      <Float className="top-[54px] right-[24%] hidden sm:block md:right-[30%] lg:right-[34%]" dur={8.5} delay={0.8} reverse>
        <Shape3D kind="torus" hue="green" size={80} className="md:hidden" />
        <Shape3D kind="torus" hue="green" size={112} className="hidden md:block" />
      </Float>

      <Float className="top-[96px] right-6 md:right-16 lg:right-24" dur={9} delay={1.5}>
        <Shape3D kind="sphere" hue="red" size={96} className="md:hidden" />
        <Shape3D kind="sphere" hue="red" size={144} className="hidden md:block" />
      </Float>

      <Float className="bottom-28 left-6 md:left-20 lg:left-36" dur={7.5} delay={2} reverse>
        <Shape3D kind="star" hue="orange" size={64} className="md:hidden" />
        <Shape3D kind="star" hue="orange" size={96} className="hidden md:block" />
      </Float>

      <Float className="bottom-32 left-[28%] hidden sm:block md:left-[26%]" dur={6.5} delay={0.5}>
        <Shape3D kind="cube" hue="violet" size={64} className="md:hidden" />
        <Shape3D kind="cube" hue="violet" size={96} className="hidden md:block" />
      </Float>

      <Float className="right-6 bottom-20 md:right-16 lg:right-28" dur={7}>
        <Shape3D kind="cylinder" hue="cyan" size={92} className="md:hidden" />
        <Shape3D kind="cylinder" hue="cyan" size={124} className="hidden md:block" />
      </Float>

      <Float className="top-[48%] right-[18%] hidden lg:block md:right-[22%]" dur={9} delay={1.5}>
        <span className="block size-4 rounded-full bg-slate-800/80 shadow-md" />
      </Float>

      {/* ---- Centre stack ---- */}
      <main className="relative z-20 mx-auto flex w-full max-w-[1120px] flex-grow flex-col items-center justify-center gutter text-center">
        {/* Availability badge */}
        <motion.div
          {...rise(0.05)}
          className="border-hairline mb-6 inline-flex items-center gap-2.5 rounded-pill border bg-[var(--ds-surface)]/90 px-4 py-1.5 shadow-[var(--shadow-xs)] backdrop-blur-md transition-colors hover:border-emerald-300"
        >
          <span className="relative flex size-2">
            {!reduced && (
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-[var(--ds-success-light)] opacity-75" />
            )}
            <span className="relative inline-flex size-2 rounded-full bg-[var(--ds-success)]" />
          </span>
          <span className="eyebrow text-[11px] tracking-wider text-[var(--ds-text-primary)]">
            {identity.availabilityShort}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...rise(0.12)}
          className="text-h1 mb-6 max-w-[900px] text-[var(--ds-text-primary)]"
        >
          {lead}{" "}
          <span className="bg-gradient-to-r from-[var(--ds-accent)] via-[var(--ds-indigo)] to-[var(--ds-accent-light)] bg-clip-text text-transparent">
            {accentWord}
          </span>
        </motion.h1>

        {/* Signature card */}
        <motion.section
          {...rise(0.2)}
          className="group mx-auto mb-7 w-full max-w-[460px] transition-transform duration-300 hover:-translate-y-1"
        >
          <div className="framer-card-wrapper">
            <div className="framer-card-inner relative overflow-hidden p-6 text-left">
              <div
                aria-hidden
                className="pointer-events-none absolute -top-16 -right-16 size-36 rounded-full bg-blue-400/15 blur-2xl"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-16 -left-16 size-36 rounded-full bg-emerald-400/15 blur-2xl"
              />

              <div className="mb-4 flex items-center justify-between gap-3">
                <span className="font-mono rounded-md border border-[var(--ds-accent-border)] bg-[var(--ds-accent-subtle)] px-2.5 py-1 text-[11px] font-semibold tracking-wider text-[var(--ds-accent)] uppercase">
                  [ {identity.role} ]
                </span>
                <span
                  className="font-mono flex shrink-0 items-center gap-1.5 text-[11px] text-[var(--ds-text-muted)]"
                  title="Active timezone"
                >
                  <span className="size-1.5 rounded-full bg-[var(--ds-success)]" />
                  {identity.timezone}
                </span>
              </div>

              <div className="mb-4">
                <h2 className="text-h3 leading-snug text-[var(--ds-text-primary)]">
                  {identity.fullName}
                </h2>
                <div className="text-body-s mt-1 flex flex-wrap items-center gap-2 font-medium text-[var(--ds-text-muted)]">
                  <span>
                    {identity.location} {identity.locationFlag}
                  </span>
                  <span className="text-[var(--ds-text-disabled)]">•</span>
                  <span>{identity.remoteAvailability}</span>
                </div>
              </div>

              <dl className="border-hairline grid grid-cols-3 gap-2 border-t pt-3.5 text-center">
                {heroMetrics.map((m) => (
                  <div
                    key={m.label}
                    className="rounded-lg border border-[var(--ds-border-subtle)] bg-[var(--ds-surface-2)]/70 p-2"
                  >
                    <dt
                      className={cn(
                        "text-body-s block font-bold",
                        m.tone === "accent" && "text-[var(--ds-accent)]",
                        m.tone === "success" && "text-[var(--ds-success-deep)]",
                        m.tone === "ink" && "text-[var(--ds-text-primary)]"
                      )}
                    >
                      {m.value}
                    </dt>
                    <dd className="font-mono mt-0.5 block text-[10px] tracking-tight text-[var(--ds-text-muted)] uppercase">
                      {m.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </motion.section>

        {/* Bio */}
        <motion.p
          {...rise(0.28)}
          className="text-lead mb-6 max-w-[680px] text-[var(--ds-text-secondary)]"
        >
          {identity.summary}
        </motion.p>

        {/* Discipline pills */}
        <motion.ul
          {...rise(0.34)}
          className="mb-7 flex max-w-[860px] flex-wrap items-center justify-center gap-2 sm:gap-2.5"
        >
          {identity.disciplines.map((d) => (
            <li
              key={d}
              className="border-hairline text-body-s cursor-default rounded-pill border bg-[var(--ds-surface)]/95 px-3.5 py-1.5 font-medium text-[var(--ds-text-secondary)] shadow-[var(--shadow-xs)] transition-all hover:scale-105 hover:border-[var(--ds-accent-light)] hover:text-[var(--ds-accent)]"
            >
              {d}
            </li>
          ))}
        </motion.ul>

        {/* CTAs */}
        <motion.div
          {...rise(0.4)}
          className="flex w-full flex-col items-center gap-3 pb-4 sm:w-auto sm:flex-row"
        >
          <a
            href="#work"
            data-cursor="link"
            className="btn-electric text-btn group flex w-full items-center justify-center gap-2 rounded-lg px-7 py-3 active:scale-95 sm:w-auto"
          >
            See the work
            <ArrowUpRight
              size={16}
              weight="bold"
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
          <a
            href={contact.email ? `mailto:${contact.email}` : "#contact"}
            data-cursor="link"
            className="text-btn border-[var(--ds-border)] flex w-full items-center justify-center rounded-lg border bg-[var(--ds-surface)]/80 px-7 py-3 text-[var(--ds-text-primary)] shadow-[var(--shadow-xs)] transition-all hover:border-[var(--ds-border-hover)] hover:bg-[var(--ds-surface)] active:scale-95 sm:w-auto"
          >
            Get in touch
          </a>
        </motion.div>
      </main>

      {/* ---- Bottom indicator bar ---- */}
      <div className="font-mono relative z-20 mx-auto flex w-full max-w-[1400px] items-center justify-between gutter py-6 text-[var(--ds-text-faint)]">
        <span className="flex items-center gap-2 tracking-wider select-none">
          <motion.span
            animate={reduced ? undefined : { y: [0, 5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="text-[var(--ds-text-secondary)]"
          >
            <ArrowDown size={14} weight="bold" />
          </motion.span>
          <span className="text-mono">[ {heroFooter.scrollLabel} ]</span>
        </span>
        <span className="hidden text-[11px] sm:block">
          {heroFooter.credit} © {new Date().getFullYear()}
        </span>
      </div>
    </section>
  )
}

/** Absolutely-placed decorative solid with a slow idle float. */
function Float({
  children,
  className,
  dur,
  delay = 0,
  reverse = false,
}: {
  children: ReactNode
  className?: string
  dur: number
  delay?: number
  reverse?: boolean
}) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      aria-hidden
      className={cn("pointer-events-none absolute z-10 select-none", className)}
      animate={
        reduced
          ? undefined
          : {
              y: reverse ? [0, 14, 0] : [0, -16, 0],
              rotate: reverse ? [0, -3, 0] : [0, 2, 0],
            }
      }
      transition={{ duration: dur, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  )
}
