import type { ReactNode } from "react"
import { services } from "@/content"
import { StackScene } from "@/components/primitives/StickyScene"
import { Shape3D, type ShapeHue, type ShapeKind } from "@/components/decor/Shape3D"
import { Tag } from "@/components/primitives/Tag"
import { cn } from "@/lib/utils"

const visuals: { kind: ShapeKind; hue: ShapeHue }[] = [
  { kind: "cube", hue: "blue" },
  { kind: "sphere", hue: "red" },
  { kind: "cylinder", hue: "green" },
  { kind: "cone", hue: "orange" },
  { kind: "torus", hue: "violet" },
  { kind: "capsule", hue: "cyan" },
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
            detail={service.detail}
            tags={service.tags}
            shape={<Shape3D kind={v.kind} hue={v.hue} size={220} />}
            hasShadow={i < 3}
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
  detail,
  tags,
  shape,
  hasShadow = true,
  className,
}: {
  index: string
  eyebrow: string
  title: string
  description: string
  detail?: string
  tags: string[]
  shape: ReactNode
  hasShadow?: boolean
  className?: string
}) {
  return (
    <div className={cn("w-full gutter max-w-[1200px] mx-auto", className)}>
      <article
        className={cn(
          "card-surface relative mx-auto flex h-[480px] sm:h-[500px] md:h-[520px] max-h-[calc(100svh-128px)] w-full flex-col justify-center overflow-hidden p-6 sm:p-8 md:p-10 rounded-2xl",
          hasShadow ? "shadow-[var(--shadow-lift)]" : "shadow-none"
        )}
      >
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
          {detail && <p className="text-body-s text-ink-3 max-w-[50ch]">{detail}</p>}
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
