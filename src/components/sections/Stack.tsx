import { useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import { stackGroups } from "@/content"
import { Section } from "@/components/primitives/Section"
import { SectionHeading } from "@/components/primitives/SectionHeading"
import { ease } from "@/lib/motion"

/**
 * Stack cards — spec §5, §7, §11.
 *
 * 384×400 at radius 48 on the 5% accent tint, flipping on Y between a
 * "logo" face and a description face. Flipping hides prose until it is asked
 * for and keeps the grid scannable as a set of names.
 *
 * Under reduced motion the card never turns, so the note is rendered on the
 * front instead of behind a hidden face (spec §15).
 */
export function Stack() {
  const cards = stackGroups.flatMap((g) =>
    g.items.map((item) => ({ ...item, group: g.label }))
  )

  return (
    <Section id="stack" label="Stack">
      <div className="flex flex-col gap-xl">
        <SectionHeading
          eyebrow="Stack"
          title="The tools, and what I'd actually say about each one."
          lede="Grouped by where it sits in the stack. Flip a card for the honest version — including where my depth stops."
        />

        <ul className="grid grid-cols-2 gap-md sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {cards.map((tech) => (
            <StackCard key={tech.name} {...tech} />
          ))}
        </ul>
      </div>
    </Section>
  )
}

function StackCard({ name, note, group }: { name: string; note: string; group: string }) {
  const [flipped, setFlipped] = useState(false)
  const reduced = useReducedMotion()

  return (
    <li className="flip-scene aspect-[384/400]">
      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        onFocus={() => setFlipped(true)}
        onBlur={() => setFlipped(false)}
        onPointerEnter={() => setFlipped(true)}
        onPointerLeave={() => setFlipped(false)}
        aria-label={`${name} — ${note}`}
        data-cursor="flip"
        className="relative block size-full rounded-lg text-left focus-visible:ring-2 focus-visible:ring-a1 focus-visible:outline-none"
      >
        <motion.div
          className="relative size-full"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: flipped && !reduced ? 180 : 0 }}
          transition={{ duration: 0.35, ease: ease.out }}
        >
          {/* Front — the 5% tint doing the work (spec §3). */}
          <div className="flip-face card-surface tinted absolute inset-0 flex flex-col justify-between overflow-hidden rounded-lg p-md">
            <span
              aria-hidden
              className="text-a1 pointer-events-none absolute right-2 bottom-1 text-[3rem] leading-none font-black opacity-20 select-none"
            >
              {name.slice(0, 2)}
            </span>
            <span aria-hidden className="bg-a1 size-2 rounded-full" />
            <div className="relative flex flex-col gap-xs">
              <span className="text-body-s text-black leading-tight font-semibold">{name}</span>
              <span className="text-label text-ink-2 normal-case tracking-normal">
                {reduced ? note : group}
              </span>
            </div>
          </div>

          {/* Back */}
          <div
            className="flip-face bg-black border-hairline absolute inset-0 flex items-end overflow-hidden rounded-lg border p-md"
            style={{ transform: "rotateY(180deg)" }}
          >
            <p className="text-label text-ground normal-case tracking-normal">{note}</p>
          </div>
        </motion.div>
      </button>
    </li>
  )
}
