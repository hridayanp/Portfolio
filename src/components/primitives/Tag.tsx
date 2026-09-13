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
        "text-label inline-flex items-center rounded-sm border px-sm py-xs leading-none whitespace-nowrap",
        tone === "default"
          ? "border-hairline bg-surface text-ink-2"
          : "border-white/30 bg-white/10 text-white",
        className
      )}
    >
      {children}
    </span>
  )
}
