import { useState } from "react"
import {
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
  { kind: "cube", color: "#3157FF" },
  { kind: "sphere", color: "#FF5A5F" },
  { kind: "cylinder", color: "#10B981" },
  { kind: "cone", color: "#F97316" },
  { kind: "torus", color: "#7C3AED" },
  { kind: "capsule", color: "#06B6D4" },
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
                <span className="text-h3 text-ink-3 tabular-nums">{service.index}</span>
                <div className="flex flex-1 flex-col gap-sm">
                  <h3 className="text-h3 text-black">{service.title}</h3>
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
          {/* Step counter — machine-status feedback, so it carries the
              progress token rather than the neutral ramp (§3, §14). */}
          <span
            className="eyebrow font-mono tabular"
            aria-live="polite"
            style={{ color: "var(--ds-progress)" }}
          >
            {service.index} / {String(services.length).padStart(2, "0")}
          </span>
        </div>

        <div className="grid items-center gap-lg lg:grid-cols-[auto_1fr_auto]">
          {/* The numeral: 200px, breakpoint-invariant, rolling behind a mask
              edge rather than appearing from nowhere (spec §4). */}
          <div className="text-numeral text-black tabular overflow-hidden font-medium">
            <RollingLine value={service.index} />
          </div>

          <div className="flex flex-col gap-md">
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, ease: ease.out }}
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
          </div>

          <div className="hidden lg:block">
            <motion.div
              key={service.id}
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, ease: ease.out }}
            >
              <Shape3D kind={visual.kind} color={visual.color} size={260} />
            </motion.div>
          </div>
        </div>

        {/* Progress rail — scroll-bound, and the only thing on the page that
            reports position within a section. */}
        <div className="bg-hairline h-px w-full">
          <motion.div
            className="h-px origin-left bg-[var(--ds-progress)]"
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
