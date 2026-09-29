import { useEffect, useRef } from "react"
import { usePointerFine } from "@/hooks/usePointerFine"

/**
 * InteractiveDotGrid
 *
 * A Canvas layer that replaces the CSS body dot-grid on fine-pointer devices
 * with an interactive version where dots subtly respond to cursor proximity,
 * creating a spatial/parallax depth effect.
 *
 * Design contract (must match CSS tokens exactly):
 *   Grid cell:   28px  (--ds-grid-size)
 *   Dot radius:  1.25px (--ds-grid-radius)
 *
 * The dot colour is read dynamically from CSS so it responds to dark mode.
 *
 * Performance contract:
 *   - Zero React re-renders on mouse movement.
 *   - Single rAF loop, cancelled on unmount.
 *   - Mouse position is spring-interpolated in the rAF loop (no Framer Motion
 *     needed; doing it in the rAF loop avoids motion value overhead for N dots).
 *   - pointer-events: none — never captures events.
 *   - Canvas GPU-composited with will-change: transform.
 *   - Not mounted at all on touch devices or when prefers-reduced-motion is set.
 */

const GRID_SIZE = 28 // px — matches --ds-grid-size
const DOT_RADIUS = 1.25 // px — matches --ds-grid-radius
const INFLUENCE_RADIUS = 180 // px — how far the cursor's field reaches
const MAX_DISPLACEMENT = 10 // px — maximum dot shift at closest distance
const MAX_SCALE = 1.6 // maximum scale of dots near cursor (subtle)
const SPRING_STIFFNESS = 0.06 // spring lerp factor (lower = more inertia)

/** Read the resolved dot colour from the CSS custom property on :root. */
function readDotColor(): string {
  return (
    getComputedStyle(document.documentElement)
      .getPropertyValue("--ds-grid-dot")
      .trim() || "rgba(148, 163, 184, 0.35)"
  )
}

export function InteractiveDotGrid() {
  const fine = usePointerFine()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!fine) return

    // Respect prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Current actual mouse position (raw)
    let mouseX = -9999
    let mouseY = -9999

    // Spring-interpolated mouse position
    let smoothX = -9999
    let smoothY = -9999

    let rafId: number
    let dotColor = readDotColor()

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.scale(dpr, dpr)
      // Refresh color on resize (dark mode may have toggled)
      dotColor = readDotColor()
    }

    const onMove = (e: PointerEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const onLeave = () => {
      mouseX = -9999
      mouseY = -9999
    }

    // Observe dark mode changes to refresh dot color
    const colorObserver = new MutationObserver(() => {
      dotColor = readDotColor()
    })
    colorObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    const draw = () => {
      rafId = requestAnimationFrame(draw)

      // Spring interpolation toward raw mouse position
      smoothX += (mouseX - smoothX) * SPRING_STIFFNESS
      smoothY += (mouseY - smoothY) * SPRING_STIFFNESS

      const w = canvas.offsetWidth
      const h = canvas.offsetHeight

      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = dotColor

      // Compute dot grid bounds — add one cell of padding to cover edges
      const cols = Math.ceil(w / GRID_SIZE) + 1
      const rows = Math.ceil(h / GRID_SIZE) + 1

      const cursorActive = smoothX > -1000

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          // Base grid position
          const baseX = col * GRID_SIZE
          const baseY = row * GRID_SIZE

          let dx = 0
          let dy = 0
          let scale = 1

          if (cursorActive) {
            // Vector from cursor to this dot
            const vx = baseX - smoothX
            const vy = baseY - smoothY
            const dist = Math.sqrt(vx * vx + vy * vy)

            if (dist < INFLUENCE_RADIUS && dist > 0) {
              // Falloff: strongest near cursor, zero at INFLUENCE_RADIUS
              const t = 1 - dist / INFLUENCE_RADIUS
              const strength = t * t // quadratic — gentler at edges

              // Displacement: dot moves *away* from cursor (push effect)
              const norm = (strength * MAX_DISPLACEMENT) / dist
              dx = vx * norm
              dy = vy * norm

              // Subtle scale — dots near cursor appear slightly larger
              scale = 1 + (MAX_SCALE - 1) * strength * 0.4
            }
          }

          const x = baseX + dx
          const y = baseY + dy
          const r = DOT_RADIUS * scale

          ctx.beginPath()
          ctx.arc(x, y, r, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    resize()
    draw()

    window.addEventListener("pointermove", onMove, { passive: true })
    document.addEventListener("pointerleave", onLeave)
    window.addEventListener("resize", resize)

    // Signal to CSS that the canvas is active so body hides its own dot grid
    document.documentElement.classList.add("interactive-dots-active")

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener("pointermove", onMove)
      document.removeEventListener("pointerleave", onLeave)
      window.removeEventListener("resize", resize)
      colorObserver.disconnect()
      document.documentElement.classList.remove("interactive-dots-active")
    }
  }, [fine])

  // Don't render on touch/coarse-pointer devices — CSS background covers them
  if (!fine) return null

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        willChange: "transform",
      }}
    />
  )
}
