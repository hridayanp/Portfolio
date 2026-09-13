import { useCallback, useRef, useState } from "react"
import { motion } from "motion/react"
import { ArrowLeft, ArrowRight, Quotes } from "@phosphor-icons/react"
import { principles } from "@/content"
import { Section } from "@/components/primitives/Section"
import { SectionHeading } from "@/components/primitives/SectionHeading"
import { ease, viewportOnce } from "@/lib/motion"
import { cn } from "@/lib/utils"

/**
 * The source template's Testimonials slider (spec §7), carrying honest
 * content: there are no client quotes to publish, so this holds how the work
 * is actually described rather than invented praise.
 *
 * The track is a native scroll-snap container — it gets touch, trackpad and
 * keyboard behaviour for free, and the arrows only call scrollBy (spec §18:
 * native snap beats a JS carousel).
 */
export function Principles() {
  const trackRef = useRef<HTMLUListElement>(null)
  const [index, setIndex] = useState(0)

  const step = useCallback((dir: -1 | 1) => {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector("li")
    const w = card ? card.getBoundingClientRect().width + 24 : track.clientWidth
    track.scrollBy({ left: w * dir, behavior: "smooth" })
  }, [])

  const onScroll = () => {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector("li")
    const w = card ? card.getBoundingClientRect().width + 24 : 1
    setIndex(Math.round(track.scrollLeft / w))
  }

  return (
    <Section id="principles" label="How I work">
      <div className="flex flex-col gap-xl">
        <SectionHeading
          eyebrow="How I work"
          title="No client quotes here — just how I talk about the work."
          lede="Principles I'd say out loud in an interview, which is a more useful signal than a testimonial I could have written myself."
          aside={
            <div className="flex gap-sm">
              <SliderButton label="Previous" onClick={() => step(-1)}>
                <ArrowLeft size={16} weight="bold" />
              </SliderButton>
              <SliderButton label="Next" onClick={() => step(1)}>
                <ArrowRight size={16} weight="bold" />
              </SliderButton>
            </div>
          }
        />

        {/* Reveal is staggered from the track, not per card: a card parked
            off-screen horizontally never intersects the viewport and would
            otherwise sit at opacity 0 until scrolled to. */}
        <motion.ul
          ref={trackRef}
          onScroll={onScroll}
          data-cursor="drag"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
          className="flex snap-x snap-mandatory gap-md overflow-x-auto scroll-smooth pb-md [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {principles.map((p) => (
            <motion.li
              key={p.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: ease.out } },
              }}
              className="w-[86%] shrink-0 snap-start sm:w-[58%] lg:w-[40%]"
            >
              <figure className="card-surface tinted flex h-full flex-col justify-between gap-lg p-lg">
                <Quotes size={28} weight="fill" aria-hidden className="text-a1" />
                <blockquote className="text-lead text-black">"{p.quote}"</blockquote>
                <figcaption className="eyebrow">{p.context}</figcaption>
              </figure>
            </motion.li>
          ))}
        </motion.ul>

        <div className="flex items-center gap-sm">
          {principles.map((p, i) => (
            <span
              key={p.id}
              aria-hidden
              className={cn(
                "h-1 rounded-pill transition-all duration-500",
                i === index ? "bg-black w-8" : "bg-hairline w-3"
              )}
            />
          ))}
          <span className="sr-only">
            Showing item {index + 1} of {principles.length}
          </span>
        </div>
      </div>
    </Section>
  )
}

function SliderButton({
  children,
  label,
  onClick,
}: {
  children: React.ReactNode
  label: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      data-cursor="link"
      className="border-hairline bg-surface text-ink hover:border-black active:scale-95 grid size-11 place-items-center rounded-pill border transition-all duration-200 focus-visible:ring-2 focus-visible:ring-a1 focus-visible:outline-none"
    >
      {children}
    </button>
  )
}
