import type { Project } from "@/content"
import { Shape3D } from "./Shape3D"
import { cn } from "@/lib/utils"

/**
 * The project visual.
 *
 * If a project has a real screenshot, that wins. If it does not, the fallback
 * is NOT a placeholder — it is a deliberate editorial treatment built from the
 * same primitives as the rest of the page: a flat field in the project's own
 * stored colour, the project title set at display scale and clipped by the
 * frame edge (the same wordmark treatment the source template uses in its
 * footer), and one decorative solid.
 *
 * The colour is stored on the project record, so it is deterministic — the
 * same project always gets the same field, across renders and reloads.
 */
export function ProjectField({
  project,
  className,
  /** Drives the hover transformation from the parent card. */
  hovered = false,
}: {
  project: Project
  className?: string
  hovered?: boolean
}) {
  if (project.image) {
    return (
      <img
        src={project.image}
        alt={`${project.title} interface`}
        loading="lazy"
        decoding="async"
        className={cn("h-full w-full object-cover", className)}
      />
    )
  }

  const light = isLight(project.fill)
  const onFill = light ? "#1a1a1a" : "#ffffff"

  return (
    <div
      className={cn("relative h-full w-full overflow-hidden", className)}
      style={{ backgroundColor: project.fill }}
      role="img"
      aria-label={`${project.title} — ${project.category}`}
    >
      {/* Title at display scale, clipped by the frame. Type is the subject,
          not a label sitting on top of an image. */}
      <span
        aria-hidden
        className="text-wordmark absolute -bottom-[0.18em] -left-[0.04em] font-medium whitespace-nowrap select-none"
        style={{ color: onFill, opacity: light ? 0.16 : 0.14 }}
      >
        {project.title}
      </span>

      {/* One decorative solid, placed in the open corner. */}
      <div
        className={cn(
          "absolute top-[12%] right-[8%] transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
          hovered && "-translate-y-2 rotate-6"
        )}
      >
        <Shape3D
          kind={project.shape}
          color={project.color || (light ? "#1a1a1a" : "#3157FF")}
          size={140}
          className="opacity-90"
        />
      </div>

      {/* Category, in the field's own ink. */}
      <span
        aria-hidden
        className="text-label absolute top-md left-md uppercase"
        style={{ color: onFill, opacity: 0.75 }}
      >
        {project.category}
      </span>
    </div>
  )
}

/**
 * Relative luminance, so the field's ink is chosen from the stored colour
 * rather than stored twice and allowed to drift.
 */
function isLight(hex: string) {
  const h = hex.replace("#", "")
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16) / 255)
  const lin = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b) > 0.45
}
