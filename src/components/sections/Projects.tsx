import { useCallback, useEffect, useRef, useState } from "react"
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  type MotionValue,
} from "motion/react"
import { ArrowDown, ArrowUpRight, GithubLogo, X } from "@phosphor-icons/react"
import { projects, type Project } from "@/content"
import { Shape3D } from "@/components/decor/Shape3D"
import { StickyScene } from "@/components/primitives/StickyScene"
import { ease } from "@/lib/motion"
import { cn } from "@/lib/utils"

/**
 * Projects — the section carrying the largest scroll budget on the page.
 *
 * The scroll-driven mechanism is unchanged: one viewport of scroll per
 * project, with progress selecting which record the featured card shows.
 * What changed is the presentation — it now reads as a showcase card beside
 * a vertical project directory, matching the rest of the site's mono-bracket
 * taxonomy and glass-over-dot-grid surface language.
 *
 * Card and modal remain two VIEWS of one record: every field reads from the
 * same project object, so a URL changed once changes everywhere, and an
 * absent URL removes the affordance rather than rendering a dead link.
 */
export function Projects() {
  const [openId, setOpenId] = useState<string | null>(null)
  const reduced = useReducedMotion()
  const open = projects.find((p) => p.id === openId) ?? null

  return (
    <>
      {/* A collapsed scene has no scroll progress to step through, so under
          reduced motion every project is rendered at once instead of one
          card standing in for the whole portfolio. */}
      {reduced ? (
        <section id="work" aria-label="Projects" className="w-full gutter section-y">
          <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-lg">
            <SectionMeta index={0} />
            <ul className="grid gap-lg lg:grid-cols-2">
              {projects.map((project) => (
                <li key={project.id}>
                  <ShowcaseCard project={project} onOpen={() => setOpenId(project.id)} />
                </li>
              ))}
            </ul>
            <SceneFooter />
          </div>
        </section>
      ) : (
        <StickyScene id="work" vh={projects.length + 1} label="Projects">
          {(progress) => <ProjectsScene progress={progress} onOpen={setOpenId} />}
        </StickyScene>
      )}

      <AnimatePresence>
        {open && <CaseStudy project={open} onClose={() => setOpenId(null)} />}
      </AnimatePresence>
    </>
  )
}

/* -------------------------------------------------------------------------
   Scene
   ---------------------------------------------------------------------- */

function ProjectsScene({
  progress,
  onOpen,
}: {
  progress: MotionValue<number>
  onOpen: (id: string) => void
}) {
  const [index, setIndex] = useState(0)
  const reduced = useReducedMotion()
  /* A click in the directory wins until the next scroll tick moves past it,
     so the list stays usable without fighting the scroll narrative. */
  const pinned = useRef<number | null>(null)

  useMotionValueEvent(progress, "change", (v) => {
    const next = Math.min(projects.length - 1, Math.max(0, Math.floor(v * projects.length)))
    if (pinned.current !== null) {
      if (pinned.current === next) pinned.current = null
      else return
    }
    setIndex((prev) => (prev === next ? prev : next))
  })

  const select = useCallback((i: number) => {
    pinned.current = i
    setIndex(i)
  }, [])

  const project = projects[index]
  const initialTilt = index % 2 === 0 ? -5 : 5

  return (
    <div className="relative flex h-full max-h-[100svh] w-full flex-col justify-between gutter overflow-hidden pt-[104px] pb-5">
      {/* Ambient field, matching the hero and stack chapters. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="animate-pulse-glow absolute top-8 left-1/4 size-[420px] -translate-x-1/2 rounded-full bg-[var(--ds-orb-blue)] blur-[110px]" />
        <div className="absolute top-1/3 right-6 size-[480px] rounded-full bg-[var(--ds-orb-emerald)] blur-[120px]" />
        <div className="bg-mesh absolute inset-0 opacity-70" />
      </div>

      <div className="mx-auto my-auto flex w-full max-w-[1400px] flex-col gap-4">
        <SectionMeta index={index} />

        <div className="grid items-start gap-6 lg:grid-cols-12">
          <motion.div
            key={project.id}
            initial={{
              opacity: reduced ? 0 : 0.7,
              scale: reduced ? 1 : 0.94,
              rotate: reduced ? 0 : initialTilt,
              y: reduced ? 0 : 12,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: 0,
              y: 0,
            }}
            transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ transformOrigin: "center center" }}
            className="lg:col-span-8"
          >
            <ShowcaseCard project={project} onOpen={() => onOpen(project.id)} />
          </motion.div>

          {/* Vertical directory. Also the keyboard path through the section —
              the scroll narrative is never the only way in. */}
          <nav aria-label="All projects" className="hidden lg:col-span-4 lg:block">
            <div className="relative py-2 ps-6">
              <span
                aria-hidden
                className="absolute top-5 bottom-5 left-2.5 w-px bg-[var(--ds-border)]"
              />
              <ol className="flex flex-col gap-2">
                {projects.map((p, i) => {
                  const on = i === index
                  return (
                    <li key={p.id} className="relative">
                      <button
                        type="button"
                        onClick={() => select(i)}
                        onDoubleClick={() => onOpen(p.id)}
                        aria-current={on ? "true" : undefined}
                        data-cursor="link"
                        className={cn(
                          "flex w-full cursor-pointer items-center justify-between gap-3 rounded-md px-3 py-2 text-left transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[var(--ds-border-accent)] focus-visible:outline-none",
                          on
                            ? "border border-[var(--ds-border)] bg-[var(--ds-surface)]/70 shadow-[var(--shadow-xs)]"
                            : "border border-transparent hover:bg-[var(--ds-surface)]/60"
                        )}
                      >
                        <span
                          aria-hidden
                          className={cn(
                            "absolute top-1/2 -translate-y-1/2 rounded-full transition-all duration-300",
                            on
                              ? "-left-[22px] size-3 ring-4 ring-[var(--ds-accent-tint)]"
                              : "-left-[20px] size-2"
                          )}
                          style={{
                            backgroundColor: on ? "var(--ds-accent)" : "var(--ds-border-strong)",
                          }}
                        />
                        <span
                          className={cn(
                            "text-body-s flex-1 leading-tight transition-colors",
                            on
                              ? "font-bold tracking-tight text-[var(--ds-text-primary)]"
                              : "font-medium text-[var(--ds-text-secondary)]"
                          )}
                        >
                          {p.title}
                        </span>
                        <span className="font-mono text-[11px] text-[var(--ds-text-faint)]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ol>
            </div>
          </nav>
        </div>

        <div className="h-px w-full bg-[var(--ds-border)]">
          <motion.div
            className="h-px origin-left bg-[var(--ds-accent)]"
            style={{ scaleX: progress }}
          />
        </div>
      </div>

      <SceneFooter />
    </div>
  )
}

/** `[ ● PROJECTS ]` … `[ 01 / 06 ]` — the site's shared section taxonomy. */
function SectionMeta({ index }: { index: number }) {
  return (
    <div className="font-mono flex items-center justify-between px-1 text-[11px] tracking-wider text-[var(--ds-text-muted)]">
      <span className="flex items-center gap-2">
        [
        <span
          aria-hidden
          className="inline-block size-1.5 animate-pulse rounded-full bg-[var(--ds-accent)]"
        />
        <span className="font-medium text-[var(--ds-text-secondary)] uppercase">Projects</span>]
      </span>
      <h2 className="sr-only">Projects</h2>
      <span className="flex items-center gap-1" aria-live="polite">
        [<span className="font-semibold text-[var(--ds-accent)]">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="text-[var(--ds-text-faint)]">/</span>
        <span>{String(projects.length).padStart(2, "0")}</span>]
      </span>
    </div>
  )
}

function SceneFooter() {
  return (
    <div className="font-mono mx-auto flex w-full max-w-[1400px] items-center justify-start border-t border-[var(--ds-border)] pt-4 text-[11px] text-[var(--ds-text-muted)]">
      <a
        href="#contact"
        data-cursor="link"
        className="inline-flex items-center gap-1.5 transition-colors hover:text-[var(--ds-accent)]"
      >
        <ArrowDown size={12} weight="bold" />
        [ SCROLL TO CONTACT ]
      </a>
    </div>
  )
}

/* -------------------------------------------------------------------------
   Showcase card
   ---------------------------------------------------------------------- */

function ShowcaseCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-[var(--ds-border)] bg-gradient-to-b from-[var(--ds-surface)]/80 via-[var(--ds-surface-2)]/50 to-[var(--ds-surface-sunken)]/40 p-5 shadow-[var(--shadow-card)] backdrop-blur-md transition-all duration-300 hover:border-[var(--ds-border-strong)] sm:p-7">
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Open case study: ${project.title}`}
        data-cursor="view"
        className="block w-full text-left focus-visible:ring-2 focus-visible:ring-[var(--ds-border-accent)] focus-visible:outline-none"
      >
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] font-semibold tracking-widest text-[var(--ds-text-muted)] uppercase">
            {project.category}
          </span>
          <span className="font-mono text-[11px] text-[var(--ds-text-faint)] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            Click to expand ↗
          </span>
        </div>

        <Artboard project={project} />

        <ul className="mt-3 flex flex-wrap gap-2">
          {[project.category, project.client, project.year]
            .filter(Boolean)
            .map((meta) => (
              <li key={meta as string}>
                <Pill>{meta}</Pill>
              </li>
            ))}
        </ul>

        <h3 className="text-h3 mt-3 font-extrabold tracking-tight text-[var(--ds-text-primary)] transition-colors group-hover:text-[var(--ds-accent)]">
          {project.title}
        </h3>

        <p className="text-body-s mt-2 max-w-[640px] leading-relaxed text-[var(--ds-text-secondary)]">
          {project.description}
        </p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {project.technologies.map((t) => (
            <li key={t}>
              <Pill muted>{t}</Pill>
            </li>
          ))}
        </ul>
      </button>

      {/* Persistent affordances: the hover hint above is decoration, this row
          is the actual, always-reachable call to action. */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--ds-border)] pt-4">
        <div className="flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={onOpen}
            className="text-body-s inline-flex items-center gap-1 rounded-sm font-semibold text-[var(--ds-accent)] transition-colors hover:text-[var(--ds-accent-hover)] focus-visible:ring-2 focus-visible:ring-[var(--ds-border-accent)] focus-visible:outline-none"
          >
            Read the case study
            <ArrowUpRight
              size={14}
              weight="bold"
              className="transition-transform group-hover:translate-x-0.5"
            />
          </button>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
              className="text-label inline-flex items-center gap-1 rounded-sm tracking-normal normal-case text-[var(--ds-link)] underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-[var(--ds-border-accent)] focus-visible:outline-none"
            >
              Live site <ArrowUpRight size={12} weight="bold" />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
              className="text-label inline-flex items-center gap-1 rounded-sm tracking-normal normal-case text-[var(--ds-link)] underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-[var(--ds-border-accent)] focus-visible:outline-none"
            >
              <GithubLogo size={13} weight="bold" /> Source
            </a>
          )}
        </div>
        <span className="font-mono hidden text-[11px] text-[var(--ds-text-faint)] sm:inline">
          Expanded Case Study
        </span>
      </div>
    </article>
  )
}

/** Watermark word + the project's signature solid, floating over it. */
function Artboard({ project, compact = false }: { project: Project; compact?: boolean }) {
  const reduced = useReducedMotion()

  return (
    <div
      aria-hidden
      className={cn(
        "relative my-2 w-full overflow-hidden rounded-2xl",
        compact ? "h-40 sm:h-48" : "h-48 sm:h-60"
      )}
    >
      <span
        className="absolute bottom-0 left-0 translate-y-[12%] leading-[0.85] font-extrabold tracking-[-0.04em] whitespace-nowrap select-none"
        style={{
          fontSize: compact ? "clamp(2.5rem, 6vw, 4.5rem)" : "clamp(3rem, 7.5vw, 6rem)",
          color: "var(--ds-text-faint)",
          opacity: 0.22,
        }}
      >
        {project.watermark}
      </span>

      <motion.div
        className="absolute top-4 right-[12%] sm:top-6"
        animate={reduced ? undefined : { y: [0, -12, 0], rotate: [0, 3, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <Shape3D kind={project.shape} hue={project.hue} size={compact ? 116 : 140} />
      </motion.div>

      <motion.span
        className="absolute right-[34%] bottom-8 hidden size-3 rounded-full bg-[var(--ds-text-primary)]/80 shadow-md sm:block"
        animate={reduced ? undefined : { y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  )
}

function Pill({ children, muted = false }: { children: React.ReactNode; muted?: boolean }) {
  return (
    <span
      className={cn(
        "text-label inline-flex items-center rounded-pill border px-3 py-1 font-medium tracking-normal normal-case whitespace-nowrap",
        muted
          ? "border-[var(--ds-border)] bg-[var(--ds-surface)]/80 text-[var(--ds-text-secondary)]"
          : "border-[var(--ds-border)] bg-[var(--ds-surface)]/90 text-[var(--ds-text-body)] shadow-[var(--shadow-xs)]"
      )}
    >
      {children}
    </span>
  )
}

/* -------------------------------------------------------------------------
   Expanded case study
   ---------------------------------------------------------------------- */

function CaseStudy({ project, onClose }: { project: Project; onClose: () => void }) {
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
      className="fixed inset-0 z-[90] flex items-end justify-center p-0 sm:items-center sm:p-6"
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
        className="absolute inset-0 cursor-default bg-[color-mix(in_srgb,var(--ds-text-primary)_40%,transparent)] backdrop-blur-md"
      />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby={`project-${project.id}-title`}
        initial={{ scale: 0.95, y: 16, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.97, y: 8, opacity: 0 }}
        transition={{ duration: 0.3, ease: ease.out }}
        className="relative max-h-[92svh] w-full max-w-[860px] overflow-hidden rounded-t-3xl border border-[var(--ds-border)] bg-[var(--ds-surface)] shadow-[var(--shadow-card)] sm:rounded-3xl"
      >
        {/* Top artboard */}
        <div className="border-b border-[var(--ds-border-subtle)] bg-gradient-to-b from-[var(--ds-surface-2)] via-[var(--ds-surface-sunken)]/60 to-[var(--ds-surface)] px-6 pt-5 pb-3 sm:px-8">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] font-semibold tracking-widest text-[var(--ds-text-muted)] uppercase">
              {project.category}
            </span>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close case study"
              data-cursor="link"
              className="grid size-10 place-items-center rounded-pill border border-[var(--ds-border-strong)] bg-[var(--ds-surface)]/90 text-[var(--ds-text-secondary)] shadow-[var(--shadow-xs)] transition-all hover:border-[var(--ds-accent-light)] hover:text-[var(--ds-accent)] active:scale-95 focus-visible:ring-2 focus-visible:ring-[var(--ds-border-accent)] focus-visible:outline-none"
            >
              <X size={16} weight="bold" />
            </button>
          </div>

          <Artboard project={project} compact />
        </div>

        {/* Body */}
        <div className="max-h-[60svh] space-y-5 overflow-y-auto p-6 sm:p-8">
          <ul className="flex flex-wrap gap-2">
            {[project.category, project.client, project.year]
              .filter(Boolean)
              .map((meta) => (
                <li key={meta as string}>
                  <Pill>{meta}</Pill>
                </li>
              ))}
          </ul>

          <h3
            id={`project-${project.id}-title`}
            className="text-h2 font-extrabold tracking-tight text-[var(--ds-text-primary)]"
          >
            {project.title}
          </h3>

          <p className="text-body leading-relaxed text-[var(--ds-text-secondary)]">
            {project.detail}
          </p>

          <div className="border-t border-[var(--ds-border-subtle)] pt-5">
            <p className="font-mono mb-3 text-[11px] font-medium tracking-wider text-[var(--ds-text-muted)]">
              [ BUILT WITH ]
            </p>
            <ul className="flex flex-wrap gap-2.5">
              {project.technologies.map((t) => (
                <li key={t}>
                  <Pill>{t}</Pill>
                </li>
              ))}
            </ul>
          </div>

          {(project.liveUrl || project.githubUrl) && (
            <div className="flex flex-wrap gap-3 pt-1">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-btn inline-flex items-center gap-2 rounded-xl bg-[var(--ds-accent)] px-5 py-2.5 font-semibold text-[var(--ds-text-inverse)] shadow-[var(--shadow-electric)] transition-all hover:-translate-y-0.5 hover:bg-[var(--ds-accent-hover)] hover:shadow-[var(--shadow-electric-hover)] active:translate-y-0 focus-visible:ring-2 focus-visible:ring-[var(--ds-border-accent)] focus-visible:outline-none"
                >
                  Visit live site <ArrowUpRight size={15} weight="bold" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-btn inline-flex items-center gap-2 rounded-xl border border-[var(--ds-border)] bg-[var(--ds-surface)] px-5 py-2.5 font-semibold text-[var(--ds-text-primary)] shadow-[var(--shadow-xs)] transition-all hover:-translate-y-0.5 hover:border-[var(--ds-accent-light)] hover:text-[var(--ds-accent)] hover:shadow-[var(--shadow-md)] active:translate-y-0 focus-visible:ring-2 focus-visible:ring-[var(--ds-border-accent)] focus-visible:outline-none"
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
