import type { ReactNode } from "react"
import { education, experienceYears, identity, roles } from "@/content"
import { StackScene } from "@/components/primitives/StickyScene"
import { Shape3D } from "@/components/decor/Shape3D"
import { cn } from "@/lib/utils"

/**
 * Pattern B — sticky stacking (spec §10).
 *
 * Three sibling cards, each pinned at top:0 inside one over-tall parent, so
 * each subsequent card scrolls up and covers the previous. Pure CSS: no JS,
 * no scroll listener. The half-viewport lead-in is why the parent is 3.5
 * viewports for three cards rather than 3.0 — the first card reads fully
 * before stacking begins.
 *
 * The effect implies a single layered narrative rather than three separate
 * facts (spec §11), which is why the About copy is split this way and not
 * rendered as a list.
 */
export function About() {
  return (
    <StackScene id="about" label="About">
      {[
        <AboutCard
          key="01"
          index="01"
          eyebrow="About"
          title="Taking messy data and making it something someone can decide from."
          shape={<Shape3D kind="cube" hue="blue" size={220} />}
        >
          <p className="text-lead text-ink max-w-[44ch]">
            That's the thread running through every platform I've worked on — satellite imagery,
            air quality readings, climate risk datasets — turned into an interface a non-technical
            stakeholder can actually use.
          </p>
          <p className="text-body text-ink-2 max-w-[48ch]">
            I'm a frontend engineer with {experienceYears} years of experience, most of it spent
            building React data platforms — geospatial and climate-intelligence dashboards for UNDP
            and enterprise clients.
          </p>
        </AboutCard>,

        <AboutCard
          key="02"
          index="02"
          eyebrow="Experience"
          title="Owning frontend delivery end to end."
          shape={<Shape3D kind="cylinder" hue="orange" size={220} />}
        >
          <ul className="flex flex-col gap-md">
            {roles.map((role) => (
              <li key={role.id} className="border-hairline flex flex-col gap-xs border-t pt-md">
                <span className="eyebrow">{role.period}</span>
                <span className="text-h3 text-black">{role.title}</span>
                <span className="text-body-s text-ink-2">{role.company}</span>
                <p className="text-body-s text-ink-2 max-w-[46ch]">{role.summary}</p>
                {role.clients && (
                  <span className="text-label text-ink-3 normal-case tracking-normal">
                    Clients: {role.clients.join(", ")}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </AboutCard>,

        <AboutCard
          key="03"
          index="03"
          eyebrow="Education"
          title="Formal grounding in the infrastructure side, not just the UI layer."
          shape={<Shape3D kind="torus" hue="green" size={220} />}
        >
          <ul className="flex flex-col gap-md">
            {education.map((e) => (
              <li key={e.id} className="border-hairline flex flex-col gap-xs border-t pt-md">
                <span className="text-h3 text-black">
                  {e.qualification}, {e.field}
                </span>
                <span className="text-body-s text-ink-2">
                  {e.institution} · {e.completed}
                </span>
                {e.note && <p className="text-body-s text-ink-3 max-w-[46ch]">{e.note}</p>}
              </li>
            ))}
          </ul>
          <p className="text-label text-ink-2 mt-md normal-case tracking-normal">
            Based in {identity.location} · {identity.availability}
          </p>
        </AboutCard>,
      ]}
    </StackScene>
  )
}

function AboutCard({
  index,
  eyebrow,
  title,
  children,
  shape,
  className,
}: {
  index: string
  eyebrow: string
  title: string
  children: ReactNode
  shape: ReactNode
  className?: string
}) {
  return (
    <div className={cn("w-full gutter max-w-[1200px] mx-auto", className)}>
      <article className="card-surface relative mx-auto flex max-h-[calc(100svh-128px)] w-full flex-col justify-center overflow-hidden p-6 sm:p-8 md:p-10 shadow-[var(--shadow-lift)] rounded-2xl">
        <div className="pointer-events-none absolute -top-[6%] -right-[4%] opacity-90 md:opacity-100">
          {shape}
        </div>

        <div className="relative flex max-w-[62ch] flex-col gap-sm sm:gap-md">
          <div className="flex items-center gap-md">
            <span className="eyebrow">{eyebrow}</span>
            <span className="text-label text-ink-3">{index}</span>
          </div>
          <h2 className="text-h2 text-black max-w-[20ch]">{title}</h2>
          <div className="flex flex-col gap-sm sm:gap-md">{children}</div>
        </div>
      </article>
    </div>
  )
}
