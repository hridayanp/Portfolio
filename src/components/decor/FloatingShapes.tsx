import { useRef } from "react"
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react"
import { Shape3D, type ShapeKind } from "./Shape3D"
import { usePointerFine } from "@/hooks/usePointerFine"
import { cn } from "@/lib/utils"

export type FloatingShape = {
  kind: ShapeKind
  color: string
  size: number
  /** Percentage position within the container. */
  top: string
  left: string
  /** Parallax depth: 0 = pinned, 1 = full travel. */
  depth: number
  rotate?: number
  /** Hidden below md so mobile stays uncluttered. */
  desktopOnly?: boolean
  /** Shown only below md — lets a shape sit somewhere safe on small screens. */
  mobileOnly?: boolean
}

/**
 * A field of decorative shapes with two motion inputs: a slow idle float, and
 * pointer/scroll parallax driven purely through MotionValues (no re-renders).
 */
export function FloatingShapes({
  shapes,
  className,
  parallaxRange = 140,
}: {
  shapes: FloatingShape[]
  className?: string
  parallaxRange?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const fine = usePointerFine()

  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const px = useSpring(pointerX, { stiffness: 60, damping: 20 })
  const py = useSpring(pointerY, { stiffness: 60, damping: 20 })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const handleMove = (e: React.PointerEvent) => {
    if (!fine || reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    pointerX.set((e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2))
    pointerY.set((e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2))
  }

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={() => {
        pointerX.set(0)
        pointerY.set(0)
      }}
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-visible",
        className
      )}
    >
      {shapes.map((shape, i) => (
        <ShapeLayer
          key={`${shape.kind}-${i}`}
          shape={shape}
          index={i}
          px={px}
          py={py}
          progress={scrollYProgress}
          reduced={Boolean(reduced)}
          parallaxRange={parallaxRange}
        />
      ))}
    </div>
  )
}

function ShapeLayer({
  shape,
  index,
  px,
  py,
  progress,
  reduced,
  parallaxRange,
}: {
  shape: FloatingShape
  index: number
  px: ReturnType<typeof useMotionValue<number>>
  py: ReturnType<typeof useMotionValue<number>>
  progress: ReturnType<typeof useScroll>["scrollYProgress"]
  reduced: boolean
  parallaxRange: number
}) {
  const travel = parallaxRange * shape.depth
  const scrollY = useTransform(progress, [0, 1], [travel * 0.6, -travel])
  const x = useTransform(px, (v) => v * 26 * shape.depth)
  const yFromPointer = useTransform(py, (v) => v * 26 * shape.depth)
  const y = useTransform(
    [scrollY, yFromPointer],
    ([a, b]) => (a as number) + (b as number)
  )

  return (
    <motion.div
      className={cn(
        "absolute",
        shape.desktopOnly && "hidden md:block",
        shape.mobileOnly && "md:hidden"
      )}
      style={{
        top: shape.top,
        left: shape.left,
        x: reduced ? 0 : x,
        y: reduced ? 0 : y,
        rotate: shape.rotate ?? 0,
      }}
      animate={
        reduced
          ? undefined
          : {
              translateY: [0, -14, 0],
              rotate: [
                shape.rotate ?? 0,
                (shape.rotate ?? 0) + 8,
                shape.rotate ?? 0,
              ],
            }
      }
      transition={{
        duration: 7 + index * 1.3,
        repeat: Infinity,
        ease: "easeInOut",
        delay: index * 0.4,
      }}
    >
      <Shape3D kind={shape.kind} color={shape.color} size={shape.size} />
    </motion.div>
  )
}
