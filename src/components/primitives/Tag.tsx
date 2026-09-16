import { cn } from "@/lib/utils"

/** Metadata chip. Radius sized to the object — spec §3. */
export function Tag({
  children,
  className,
  tone = "default",
}: {
  children: React.ReactNode
  className?: string
  tone?: "default" | "onColor"
}) {
  return (
    <span
      className={cn(
        "text-label inline-flex items-center rounded-pill border px-sm py-xs leading-none whitespace-nowrap tracking-normal normal-case",
        tone === "default"
          ? "border-[var(--ds-border)] bg-[var(--ds-surface)]/95 text-[var(--ds-text-secondary)] shadow-[var(--shadow-xs)]"
          : "border-[var(--ds-accent-border)] bg-[var(--ds-accent-subtle)] text-[var(--ds-accent)]",
        className
      )}
    >
      {children}
    </span>
  )
}
