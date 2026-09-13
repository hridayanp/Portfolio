import { useState } from "react"
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  type MotionValue,
} from "motion/react"
import { services } from "@/content"
import { Shape3D, type ShapeKind } from "@/components/decor/Shape3D"
import { RollingLine } from "@/components/primitives/MaskedText"
import { StickyScene } from "@/components/primitives/StickyScene"
import { Tag } from "@/components/primitives/Tag"
import { ease } from "@/lib/motion"

/**
 * Pattern A — sticky hold with internal transform (spec §10).
 *
 * The parent is one viewport per service plus a lead-in; the scene is pinned
 * for the whole range and its CONTENTS swap on step boundaries. That converts
 * a list into a sequence with a sense of progress — the reader cannot skim it,
 * which is exactly the source template's intent for this section.
 *
 * The sticky offset is negative, as the source's is, so the pinned content
 * bleeds past the viewport top rather than sitting flush.
 *
 * Step state is discrete: one state change per boundary crossed, not a
 * continuous transform (spec §18) — twelve steps of continuous work would be
 * wasted when only the index is read.
 */
const visuals: { kind: ShapeKind; color: string }[] = [
  { kind: "cube", color: "var(--a-1)" },
  { kind: "sphere", color: "var(--a-2d)" },
  { kind: "cylinder", color: "var(--a-3)" },
  { kind: "cone", color: "var(--a-1)" },
  { kind: "torus", color: "var(--a-2d)" },
  { kind: "capsule", color: "var(--a-3)" },
]

export function Expertise() {
  const reduced = useReducedMotion()

  /* Spec §15: the reduced-motion path must be an equivalent, not a
     truncation. Without this the collapsed scene would show only the first
     service, because there is no scroll progress to step through. */
  if (reduced) return <ExpertiseList />

  return (
    <StickyScene id="services" vh={services.length + 0.5} top={-50} label="Expertise">
      {(progress) => <ExpertiseScene progress={progress} />}
    </StickyScene>
  )
}

function ExpertiseList() {
  return (
    <section id="services" aria-label="Expertise" className="w-full gutter section-y">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-lg">
        <span className="eyebrow flex items-center gap-sm">
          <span aria-hidden className="bg-a1 inline-block size-[6px] rounded-full" />
          Expertise
        </span>
        <h2 className="text-h2 text-black max-w-[18ch]">What I'm actually hired to do.</h2>
        <ol className="flex flex-col">
          {services.map((service, i) => {
            const v = visuals[i % visuals.length]
            return (
              <li
                key={service.id}
                className="border-hairline flex items-start gap-md border-t py-lg sm:gap-lg"
              >
                <span className="text-card text-ink-3 tabular-nums">{service.index}</span>
                <div className="flex flex-1 flex-col gap-sm">
                  <h3 className="text-card text-black">{service.title}</h3>
                  <p className="text-body-s text-ink-2 max-w-[54ch]">{service.description}</p>
                  <ul className="flex flex-wrap gap-sm">
                    {service.tags.map((t) => (
                      <li key={t}>
                        <Tag>{t}</Tag>
                      </li>
                    ))}
                  </ul>
                </div>
                <span className="hidden shrink-0 sm:block">
                  <Shape3D kind={v.kind} color={v.color} size={64} />
                </span>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

function ExpertiseScene({ progress }: { progress: MotionValue<number> }) {
  const [index, setIndex] = useState(0)

  useMotionValueEvent(progress, "change", (v) => {
    const next = Math.min(services.length - 1, Math.max(0, Math.floor(v * services.length)))
    setIndex((prev) => (prev === next ? prev : next))
  })

  const service = services[index]
  const visual = visuals[index % visuals.length]

  return (
    <div className="flex h-full w-full flex-col justify-center gutter pt-[96px] pb-md">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-lg">
        <div className="flex items-center justify-between">
          <span className="eyebrow flex items-center gap-sm">
            <span aria-hidden className="bg-a1 inline-block size-[6px] rounded-full" />
            Expertise
          </span>
          <h2 className="sr-only">Expertise</h2>
          <span className="eyebrow" aria-live="polite">
            {service.index} / {String(services.length).padStart(2, "0")}
          </span>
        </div>

        <div className="grid items-center gap-lg lg:grid-cols-[auto_1fr_auto]">
          {/* The numeral: 200px, breakpoint-invariant, rolling behind a mask
              edge rather than appearing from nowhere (spec §4). */}
          <div className="text-numeral text-black overflow-hidden font-extrabold tabular-nums">
            <RollingLine value={service.index} />
          </div>

          <div className="flex flex-col gap-md">
            <AnimatePresence mode="wait">
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3, ease: ease.out }}
                className="flex flex-col gap-md"
              >
                <h3 className="text-h2 text-black max-w-[18ch]">{service.title}</h3>
                <p className="text-lead text-ink-2 max-w-[48ch]">{service.description}</p>
                <ul className="flex flex-wrap gap-sm">
                  {service.tags.map((t) => (
                    <li key={t}>
                      <Tag>{t}</Tag>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="hidden lg:block">
            <AnimatePresence mode="wait">
              <motion.div
                key={service.id}
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
                transition={{ duration: 0.35, ease: ease.out }}
              >
                <Shape3D kind={visual.kind} color={visual.color} size={260} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Progress rail — scroll-bound, and the only thing on the page that
            reports position within a section. */}
        <div className="bg-hairline h-px w-full">
          <motion.div
            className="bg-black h-px origin-left"
            style={{ scaleX: progress }}
          />
        </div>

        {/* Keyboard- and screen-reader-reachable equivalent of the scroll
            narrative: the whole list, always in the DOM (spec §15). */}
        <ol className="sr-only">
          {services.map((s) => (
            <li key={s.id}>
              {s.index}. {s.title} — {s.description}
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
