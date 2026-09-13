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

type Shape3DProps = {
  kind: ShapeKind
  /** CSS colour — pass a token var, e.g. "var(--accent-violet)". */
  color: string
  size?: number
  className?: string
}

/**
 * Decorative "3D" primitives.
 *
 * Deliberately SVG rather than a WebGL/Three.js dependency: these are static
 * geometry lit from one direction, and a shaded gradient reproduces the look at
 * a fraction of the cost. Nothing here ships a runtime beyond the DOM.
 */
export function Shape3D({ kind, color, size = 120, className }: Shape3DProps) {
  const id = useId().replace(/:/g, "")
  const lit = `lit-${id}`
  const body = `body-${id}`
  const shade = `shade-${id}`

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      aria-hidden
      focusable="false"
      className={cn("overflow-visible", className)}
      style={{ color }}
    >
      <defs>
        {/* Spherical light for round bodies */}
        <radialGradient id={lit} cx="34%" cy="28%" r="78%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.92" />
          <stop offset="38%" stopColor="currentColor" stopOpacity="1" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.42" />
        </radialGradient>
        {/* Directional light for flat faces */}
        <linearGradient id={body} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="35%" stopColor="currentColor" stopOpacity="1" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id={shade} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.5" />
        </linearGradient>
      </defs>

      {kind === "sphere" && (
        <circle cx="50" cy="50" r="42" fill={`url(#${lit})`} />
      )}

      {kind === "torus" && (
        <g fill={`url(#${lit})`}>
          <path
            d="M50 8a42 42 0 1 0 0 84 42 42 0 0 0 0-84Zm0 26a16 16 0 1 1 0 32 16 16 0 0 1 0-32Z"
            fillRule="evenodd"
          />
        </g>
      )}

      {kind === "cylinder" && (
        <g>
          <path d="M18 26h64v48a32 12 0 0 1-64 0Z" fill={`url(#${shade})`} />
          <ellipse cx="50" cy="26" rx="32" ry="12" fill={`url(#${body})`} />
        </g>
      )}

      {kind === "cone" && (
        <g>
          <path d="M50 6 84 78H16Z" fill={`url(#${body})`} />
          <ellipse cx="50" cy="78" rx="34" ry="12" fill={`url(#${shade})`} />
        </g>
      )}

      {kind === "cube" && (
        <g>
          <path
            d="M50 8 88 30 50 52 12 30Z"
            fill="currentColor"
            opacity="0.95"
          />
          <path
            d="M12 30 50 52v40L12 70Z"
            fill={`url(#${shade})`}
            opacity="0.8"
          />
          <path d="M88 30 50 52v40l38-22Z" fill="#000" opacity="0.35" />
          <path d="M50 8 88 30 50 52 12 30Z" fill="#fff" opacity="0.35" />
        </g>
      )}

      {kind === "capsule" && (
        <rect
          x="28"
          y="8"
          width="44"
          height="84"
          rx="22"
          fill={`url(#${lit})`}
        />
      )}

      {kind === "star" && (
        <path
          d="M50 4c4 26 16 38 42 42-26 4-38 16-42 42-4-26-16-38-42-42 26-4 38-16 42-42Z"
          fill={`url(#${lit})`}
        />
      )}
    </svg>
  )
}
