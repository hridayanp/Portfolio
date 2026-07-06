import React, { useState } from "react"
import { cn } from "@/lib/utils"

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  glowColor?: string // e.g. "rgba(0, 228, 121, 0.1)" for Geospatial Green or "rgba(207, 92, 255, 0.1)" for AI Purple
  className?: string
}

export function SpotlightCard({
  children,
  glowColor = "rgba(0, 228, 121, 0.1)",
  className,
  ...props
}: SpotlightCardProps) {
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-outline-variant/30 bg-card/60 p-8 backdrop-blur-xl transition-all duration-300 hover:border-on-background/25 hover:shadow-2xl",
        className
      )}
      {...props}
    >
      {/* Spotlight Glow Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(500px circle at ${coords.x}px ${coords.y}px, ${glowColor}, transparent 70%)`,
        }}
      />
      <div className="relative z-10 h-full flex flex-col">{children}</div>
    </div>
  )
}
