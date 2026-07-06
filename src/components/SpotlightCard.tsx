import React from "react"
import { cn } from "@/lib/utils"

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  glowColor?: string
  className?: string
}

export function SpotlightCard({
  children,
  glowColor,
  className,
  ...props
}: SpotlightCardProps) {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`)
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`)
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className={cn(
        "spotlight-card p-8 rounded-2xl",
        className
      )}
      style={{
        ...props.style,
        ...(glowColor ? { "--spotlight": glowColor } as React.CSSProperties : {}),
      }}
      {...props}
    >
      <div className="relative z-10 h-full flex flex-col">{children}</div>
    </div>
  )
}
