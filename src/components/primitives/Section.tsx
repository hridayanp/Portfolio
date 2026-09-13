import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

/**
 * The ONLY element allowed to own page gutters and section rhythm (spec §5).
 * No max-width: the source layout is fluid to the viewport with a single
 * 24px gutter (16px on phone), and vertical isolation — not a measure —
 * carries the hierarchy.
 */
export function Section({
  id,
  children,
  className,
  label,
  /** `none` for sections whose rhythm is owned by a StickyScene. */
  rhythm = "default",
  as: Tag = "section",
}: {
  id?: string
  children: ReactNode
  className?: string
  label?: string
  rhythm?: "default" | "none"
  as?: "section" | "div" | "footer"
}) {
  return (
    <Tag
      id={id}
      aria-label={label}
      className={cn("relative w-full gutter", rhythm === "default" && "section-y", className)}
    >
      {children}
    </Tag>
  )
}
