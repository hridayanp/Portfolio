import type { ReactNode } from "react"
import { services } from "@/content"
import { StackScene } from "@/components/primitives/StickyScene"
import { Shape3D, type ShapeKind } from "@/components/decor/Shape3D"
import { Tag } from "@/components/primitives/Tag"
import { cn } from "@/lib/utils"

const visuals: { kind: ShapeKind; color: string }[] = [
  { kind: "cube", color: "#3157FF" },
  { kind: "sphere", color: "#FF5A5F" },
  { kind: "cylinder", color: "#10B981" },
  { kind: "cone", color: "#F97316" },
  { kind: "torus", color: "#7C3AED" },
  { kind: "capsule", color: "#06B6D4" },
]

export function Expertise() {
  return (
    <StackScene id="services" label="Expertise" tilt={true}>
      {services.map((service, i) => {
        const v = visuals[i % visuals.length]
        return (
          <ExpertiseCard
            key={service.id}
            index={service.index}
            eyebrow="Expertise"
            title={service.title}
            description={service.description}
            tags={service.tags}
            shape={<Shape3D kind={v.kind} color={v.color} size={220} />}
          />
        )
      })}
    </StackScene>
  )
}

function ExpertiseCard({
  index,
  eyebrow,
  title,
  description,
  tags,
  shape,
  className,
}: {
  index: string
  eyebrow: string
  title: string
  description: string
  tags: string[]
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
            <span className="text-label text-ink-3">{index} / 06</span>
          </div>
          <h2 className="text-h2 text-black max-w-[20ch]">{title}</h2>
          <p className="text-lead text-ink-2 max-w-[50ch]">{description}</p>
          <ul className="flex flex-wrap gap-xs sm:gap-sm pt-xs">
            {tags.map((t) => (
              <li key={t}>
                <Tag>{t}</Tag>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </div>
  )
}
