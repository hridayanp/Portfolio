import { useId } from "react"
import { cn } from "@/lib/utils"

export type ShapeKind =
  | "sphere"
  | "torus"
  | "cylinder"
  | "cone"
  | "cube"
  | "capsule"
  | "star"

/** Named hue presets. Each carries a full light→shadow ramp so the solid reads
 *  as a lit object rather than a flat silhouette. */
export type ShapeHue = "blue" | "green" | "red" | "orange" | "violet" | "cyan"

type Ramp = {
  /** specular highlight → body → core → shadow */
  stops: [string, string, string, string]
  /** flat faces for the isometric cube: top / left / right */
  faces: [string, string, string]
}

const RAMPS: Record<ShapeHue, Ramp> = {
  blue: {
    stops: ["#93c5fd", "#3b82f6", "#1d4ed8", "#0f172a"],
    faces: ["#93c5fd", "#3b82f6", "#1d4ed8"],
  },
  green: {
    stops: ["#bbf7d0", "#4ade80", "#15803d", "#14532d"],
    faces: ["#bbf7d0", "#4ade80", "#15803d"],
  },
  red: {
    stops: ["#fecaca", "#f87171", "#dc2626", "#7f1d1d"],
    faces: ["#fecaca", "#f87171", "#dc2626"],
  },
  orange: {
    stops: ["#fed7aa", "#fb923c", "#ea580c", "#9a3412"],
    faces: ["#fed7aa", "#fb923c", "#ea580c"],
  },
  violet: {
    stops: ["#ddd6fe", "#a78bfa", "#7c3aed", "#4c1d95"],
    faces: ["#c4b5fd", "#8b5cf6", "#6d28d9"],
  },
  cyan: {
    stops: ["#67e8f9", "#06b6d4", "#0e7490", "#0f172a"],
    faces: ["#67e8f9", "#06b6d4", "#0e7490"],
  },
}

type Shape3DProps = {
  kind: ShapeKind
  /** Preferred: a named hue ramp. */
  hue?: ShapeHue
  /** Legacy single-colour API — shaded from this one value. */
  color?: string
  size?: number
  className?: string
}

/**
 * Decorative 3D solids, drawn as SVG.
 *
 * Deliberately not WebGL: this is static geometry lit from one direction, and
 * a multi-stop gradient reproduces the look at a fraction of the cost. Nothing
 * here ships a runtime beyond the DOM.
 */
export function Shape3D({ kind, hue, color, size = 120, className }: Shape3DProps) {
  const uid = useId().replace(/:/g, "")
  const ramp = hue ? RAMPS[hue] : null
  const [s0, s1, s2, s3] = ramp?.stops ?? ["#ffffff", color ?? "currentColor", color ?? "currentColor", "#000000"]
  const [f0, f1, f2] = ramp?.faces ?? [color ?? "currentColor", color ?? "currentColor", color ?? "currentColor"]

  const gGlow = `glow-${uid}`
  const gBody = `body-${uid}`
  const gCap = `cap-${uid}`

  const common = {
    width: size,
    height: size,
    "aria-hidden": true as const,
    focusable: "false" as const,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
  }

  if (kind === "cone") {
    return (
      <svg {...common} viewBox="0 0 200 200" className={cn("overflow-visible", className)}>
        <defs>
          <radialGradient id={gGlow} cx="40%" cy="30%" r="70%">
            <stop offset="0%" stopColor={s0} />
            <stop offset="35%" stopColor={s1} />
            <stop offset="75%" stopColor={s2} />
            <stop offset="100%" stopColor={s3} />
          </radialGradient>
          <linearGradient id={gBody} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={s2} />
            <stop offset="100%" stopColor={s1} />
          </linearGradient>
        </defs>
        <path d="M100 20 L40 145 C40 145 100 175 160 145 Z" fill={`url(#${gGlow})`} />
        <ellipse cx="100" cy="145" rx="60" ry="20" fill={`url(#${gBody})`} fillOpacity="0.9" />
        <ellipse cx="100" cy="145" rx="46" ry="14" fill={s2} />
      </svg>
    )
  }

  if (kind === "torus") {
    return (
      <svg {...common} viewBox="0 0 160 160" className={cn("overflow-visible", className)}>
        <defs>
          <radialGradient id={gGlow} cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor={s0} />
            <stop offset="25%" stopColor={s1} />
            <stop offset="65%" stopColor={s2} />
            <stop offset="100%" stopColor={s3} />
          </radialGradient>
        </defs>
        <circle cx="80" cy="80" r="54" stroke={`url(#${gGlow})`} strokeWidth="26" strokeLinecap="round" />
        <circle
          cx="70"
          cy="68"
          r="42"
          stroke="#ffffff"
          strokeWidth="3"
          strokeDasharray="25 45"
          opacity="0.65"
        />
      </svg>
    )
  }

  if (kind === "sphere") {
    return (
      <svg {...common} viewBox="0 0 160 160" className={cn("overflow-visible", className)}>
        <defs>
          <radialGradient id={gGlow} cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor={s0} />
            <stop offset="20%" stopColor={s1} />
            <stop offset="55%" stopColor={s2} />
            <stop offset="100%" stopColor={s3} />
          </radialGradient>
        </defs>
        <circle cx="80" cy="80" r="64" fill={`url(#${gGlow})`} />
        <ellipse
          cx="62"
          cy="55"
          rx="20"
          ry="12"
          fill="#ffffff"
          fillOpacity="0.45"
          transform="rotate(-25 62 55)"
        />
      </svg>
    )
  }

  if (kind === "star") {
    return (
      <svg {...common} viewBox="0 0 120 120" className={cn("overflow-visible", className)}>
        <defs>
          <radialGradient id={gGlow} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={s0} />
            <stop offset="35%" stopColor={s1} />
            <stop offset="70%" stopColor={s2} />
            <stop offset="100%" stopColor={s3} />
          </radialGradient>
        </defs>
        <path
          d="M60 5 Q60 60 115 60 Q60 60 60 115 Q60 60 5 60 Q60 60 60 5 Z"
          fill={`url(#${gGlow})`}
        />
      </svg>
    )
  }

  if (kind === "cube") {
    return (
      <svg {...common} viewBox="0 0 120 120" className={cn("overflow-visible", className)}>
        <polygon points="60,15 105,40 60,65 15,40" fill={f0} />
        <polygon points="15,40 60,65 60,110 15,85" fill={f1} />
        <polygon points="60,65 105,40 105,85 60,110" fill={f2} />
      </svg>
    )
  }

  if (kind === "cylinder") {
    return (
      <svg
        {...common}
        viewBox="0 0 140 180"
        width={size}
        height={size * 1.28}
        className={cn("overflow-visible", className)}
      >
        <defs>
          <linearGradient id={gBody} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={s2} />
            <stop offset="45%" stopColor={s1} />
            <stop offset="80%" stopColor={s2} />
            <stop offset="100%" stopColor={s3} />
          </linearGradient>
          <radialGradient id={gCap} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={s0} />
            <stop offset="70%" stopColor={s1} />
            <stop offset="100%" stopColor={s2} />
          </radialGradient>
        </defs>
        <path d="M18 45 L18 135 C18 152 122 152 122 135 L122 45 Z" fill={`url(#${gBody})`} />
        <ellipse cx="70" cy="135" rx="52" ry="18" fill={s3} fillOpacity="0.3" />
        <ellipse cx="70" cy="45" rx="52" ry="18" fill={`url(#${gCap})`} />
      </svg>
    )
  }

  /* capsule */
  return (
    <svg {...common} viewBox="0 0 100 100" className={cn("overflow-visible", className)}>
      <defs>
        <radialGradient id={gGlow} cx="34%" cy="28%" r="78%">
          <stop offset="0%" stopColor={s0} />
          <stop offset="38%" stopColor={s1} />
          <stop offset="75%" stopColor={s2} />
          <stop offset="100%" stopColor={s3} />
        </radialGradient>
      </defs>
      <rect x="28" y="8" width="44" height="84" rx="22" fill={`url(#${gGlow})`} />
    </svg>
  )
}
