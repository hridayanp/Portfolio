import type { ReactNode } from "react"
import { MaskedText } from "./MaskedText"
import { cn } from "@/lib/utils"

/**
 * Eyebrow + 38px anchor heading + optional lede.
 * The heading size is breakpoint-invariant by design (spec §14): holding it
 * while everything around it steps down increases the scale ratio on mobile,
 * compensating for the halved whitespace.
 */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  aside,
  align = "left",
  className,
  as = "h2",
}: {
  eyebrow?: string
  title: string
  lede?: string
  aside?: ReactNode
  align?: "left" | "center"
  className?: string
  as?: "h2" | "h3"
}) {
  const centered = align === "center"

  return (
    <div className={cn("flex flex-col gap-md", centered && "items-center text-center", className)}>
      {(eyebrow || aside) && (
        <div
          className={cn(
            "flex w-full items-center gap-md",
            centered ? "justify-center" : "justify-between"
          )}
        >
          {eyebrow && (
            <span className="eyebrow flex items-center gap-sm">
              <span aria-hidden className="inline-block size-[6px] rounded-full bg-a1" />
              {eyebrow}
            </span>
          )}
          {aside && <div className="hidden md:block">{aside}</div>}
        </div>
      )}

      <MaskedText
        as={as}
        text={title}
        className={cn("text-h2 text-black", centered ? "max-w-[20ch]" : "max-w-[22ch]")}
      />

      {lede && (
        <p className={cn("text-lead text-ink-2 max-w-[46ch]", centered && "mx-auto")}>{lede}</p>
      )}
    </div>
  )
}
