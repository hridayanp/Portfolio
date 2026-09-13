import { useEffect, useRef, useState } from "react"
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  type MotionValue,
} from "motion/react"
import { ArrowUpRight, GithubLogo, X } from "@phosphor-icons/react"
import { projects, type Project } from "@/content"
import { ProjectField } from "@/components/decor/ProjectField"
import { StickyScene } from "@/components/primitives/StickyScene"
import { Tag } from "@/components/primitives/Tag"
import { ease } from "@/lib/motion"
import { cn } from "@/lib/utils"

/**
 * Projects — Pattern A, and the section that carries the largest scroll
 * budget on the page.
 *
 * Spec §10 / §21: the source template spends 47.6% of its scroll on Services
 * and 10.3% on Projects because it sells services. "Keep the technique; move
 * the weight." So the per-item sticky narrative — the page's premium
 * mechanism — is spent here, on the work, one viewport per project.
 *
 * The card anatomy is the source's, preserved exactly: Photo / Category /
 * Title / Overlay (opacity 0 → 1 on hover) / Link, with the whole card as a
 * single large hit area.
 */
export function Projects() {
  const [openId, setOpenId] = useState<string | null>(null)
  const reduced = useReducedMotion()
  const open = projects.find((p) => p.id === openId) ?? null

  return (
    <>
      {/* Spec §15: the reduced-motion path shows every project, because a
          collapsed scene has no scroll progress to step through and would
          otherwise present one card as the whole portfolio. */}
      {reduced ? (
        <section id="work" aria-label="Projects" className="w-full gutter section-y">
          <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-lg">
            <span className="eyebrow flex items-center gap-sm">
              <span aria-hidden className="bg-a1 inline-block size-[6px] rounded-full" />
              Projects
            </span>
            <h2 className="text-h2 text-black max-w-[20ch]">
              Platforms built for people who have to decide something.
            </h2>
            <ul className="grid gap-lg lg:grid-cols-2">
              {projects.map((project) => (
                <li key={project.id}>
                  <ProjectCard project={project} onOpen={() => setOpenId(project.id)} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : (
        <StickyScene id="work" vh={projects.length + 1} label="Projects">
          {(progress) => <ProjectsScene progress={progress} onOpen={setOpenId} />}
        </StickyScene>
      )}

      <AnimatePresence>
        {open && <ProjectDetail project={open} onClose={() => setOpenId(null)} />}
      </AnimatePresence>
    </>
  )
}

function ProjectsScene({
  progress,
  onOpen,
}: {
  progress: MotionValue<number>
  onOpen: (id: string) => void
}) {
  const [index, setIndex] = useState(0)

  useMotionValueEvent(progress, "change", (v) => {
    const next = Math.min(projects.length - 1, Math.max(0, Math.floor(v * projects.length)))
    setIndex((prev) => (prev === next ? prev : next))
  })

  const project = projects[index]

  return (
    <div className="flex h-full w-full flex-col justify-center gutter pt-[96px] pb-md">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-md">
        <div className="flex items-baseline justify-between">
          <span className="eyebrow flex items-center gap-sm">
            <span aria-hidden className="bg-a1 inline-block size-[6px] rounded-full" />
            Projects
          </span>
          <h2 className="sr-only">Projects</h2>
          <span className="eyebrow" aria-live="polite">
            {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </span>
        </div>

        <div className="grid gap-lg lg:grid-cols-[1fr_300px] lg:items-start">
          <AnimatePresence mode="wait">
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: ease.out }}
            >
              <ProjectCard project={project} onOpen={() => onOpen(project.id)} />
            </motion.div>
          </AnimatePresence>

          {/* Index rail. Doubles as the keyboard path through the section —
              the scroll narrative is never the only way in (spec §15). */}
          <nav aria-label="All projects" className="hidden lg:block">
            <ol className="flex flex-col">
              {projects.map((p, i) => (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => onOpen(p.id)}
                    data-cursor="view"
                    className={cn(
                      "border-hairline flex w-full items-center gap-md border-t py-sm text-left transition-colors duration-300",
                      i === index ? "text-black" : "text-ink-3 hover:text-ink-2"
                    )}
                  >
                    <span
                      aria-hidden
                      className="size-2 shrink-0 rounded-full transition-colors duration-300"
                      style={{ backgroundColor: i === index ? p.fill : "var(--c-hairline)" }}
                    />
                    <span className="text-body-s flex-1 leading-tight">{p.title}</span>
                    <span className="text-label text-ink-3">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </nav>
        </div>

        <div className="bg-hairline h-px w-full">
          <motion.div className="bg-black h-px origin-left" style={{ scaleX: progress }} />
        </div>
      </div>
    </div>
  )
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const [hovered, setHovered] = useState(false)
  const reduced = useReducedMotion()

  return (
    <article className="card-surface group overflow-hidden">
      <button
        type="button"
        onClick={onOpen}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        data-cursor="view"
        aria-label={`Open case study: ${project.title}`}
        className="block w-full text-left"
      >
        {/* Photo area, ≈3:2 as measured (spec §5). */}
        <div className="relative aspect-[3/2] max-h-[46svh] overflow-hidden">
          <motion.div
            className="absolute inset-0"
            animate={{ scale: hovered && !reduced ? 1.04 : 1 }}
            transition={{ duration: 0.4, ease: ease.out }}
          >
            <ProjectField project={project} hovered={hovered} />
          </motion.div>

          {/* Overlay: 0 → 1 on hover, exactly as the source. */}
          <motion.div
            aria-hidden
            className="absolute inset-0 flex items-center justify-center bg-black/45"
            initial={false}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3, ease: ease.out }}
          >
            <span className="text-btn text-ground inline-flex items-center gap-sm rounded-pill border border-white/40 px-lg py-sm">
              Read the case study <ArrowUpRight size={16} weight="bold" />
            </span>
          </motion.div>
        </div>

        <div className="flex flex-col gap-sm p-md">
          <div className="flex flex-wrap items-center gap-sm">
            <Tag>{project.category}</Tag>
            {project.client && <Tag>{project.client}</Tag>}
            {project.year && <Tag>{project.year}</Tag>}
          </div>
          <h3 className="text-card text-black">{project.title}</h3>
          <p className="text-body-s text-ink-2 max-w-[62ch]">{project.description}</p>
          <ul className="flex flex-wrap gap-sm">
            {project.technologies.map((t) => (
              <li key={t}>
                <Tag>{t}</Tag>
              </li>
            ))}
          </ul>
        </div>
      </button>

      {/* Persistent affordances. The source hides its CTA behind hover, which
          keyboard and touch users never see (spec §15) — so the same call to
          action also lives here, at rest. Links render only when the data
          carries a real URL: absent data removes the affordance (spec §8). */}
      <div className="border-hairline flex flex-wrap items-center gap-md border-t px-md py-sm">
        <button
          type="button"
          onClick={onOpen}
          className="text-label text-black inline-flex items-center gap-xs normal-case tracking-normal underline-offset-4 hover:underline"
        >
          Read the case study <ArrowUpRight size={13} weight="bold" />
        </button>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="link"
            className="text-label text-ink-2 hover:text-black inline-flex items-center gap-xs normal-case tracking-normal underline-offset-4 hover:underline"
          >
            Live site <ArrowUpRight size={13} weight="bold" />
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="link"
            className="text-label text-ink-2 hover:text-black inline-flex items-center gap-xs normal-case tracking-normal underline-offset-4 hover:underline"
          >
            <GithubLogo size={14} weight="bold" /> Source
          </a>
        )}
      </div>
    </article>
  )
}

/**
 * The detail view. Spec §8: the card and the detail are two VIEWS of one
 * record — every field here reads from the same project object, so a URL
 * changed once changes everywhere.
 */
function ProjectDetail({ project, onClose }: { project: Project; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener("keydown", onKey)
    }
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center sm:p-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <button
        type="button"
        aria-label="Close case study"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-black/55 backdrop-blur-sm"
      />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby={`project-${project.id}-title`}
        initial={{ y: 32, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.35, ease: ease.out }}
        className="bg-ground relative max-h-[92svh] w-full max-w-[900px] overflow-y-auto rounded-t-xl sm:rounded-xl"
      >
        <div className="relative aspect-[3/2] max-h-[40svh] overflow-hidden">
          <ProjectField project={project} />
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            data-cursor="link"
            className="absolute top-md right-md grid size-11 place-items-center rounded-pill bg-black/45 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
          >
            <X size={18} weight="bold" />
          </button>
        </div>

        <div className="flex flex-col gap-md p-md sm:p-lg">
          <div className="flex flex-wrap gap-sm">
            <Tag>{project.category}</Tag>
            {project.client && <Tag>{project.client}</Tag>}
            {project.year && <Tag>{project.year}</Tag>}
          </div>

          <h3 id={`project-${project.id}-title`} className="text-h2 text-black">
            {project.title}
          </h3>

          <p className="text-lead text-ink-2">{project.detail}</p>

          <div className="bg-hairline h-px w-full" />

          <div className="flex flex-col gap-sm">
            <span className="eyebrow">Built with</span>
            <ul className="flex flex-wrap gap-sm">
              {project.technologies.map((t) => (
                <li key={t}>
                  <Tag>{t}</Tag>
                </li>
              ))}
            </ul>
          </div>

          {(project.liveUrl || project.githubUrl) && (
            <div className="flex flex-wrap gap-md">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-btn bg-black text-ground inline-flex items-center gap-sm rounded-pill px-lg py-sm"
                >
                  Visit live site <ArrowUpRight size={15} weight="bold" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-btn border-hairline text-ink inline-flex items-center gap-sm rounded-pill border px-lg py-sm"
                >
                  <GithubLogo size={16} weight="bold" /> View source
                </a>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
