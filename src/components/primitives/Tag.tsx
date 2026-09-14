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
        "text-label font-mono inline-flex items-center rounded-sm border px-sm py-xs leading-none whitespace-nowrap",
        tone === "default"
          ? "border-hairline bg-[var(--ds-surface-2)] text-ink-2"
          : "border-[var(--ds-border-strong)] bg-[var(--ds-surface-2)] text-ink",
        className
      )}
    >
      {children}
    </span>
  )
}
