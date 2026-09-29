import { useCallback, useRef, useState } from "react"
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  type MotionValue,
} from "motion/react"
import { ArrowDown, ArrowUpRight, GithubLogo } from "@phosphor-icons/react"
import { projects, type Project } from "@/content"
import { Shape3D } from "@/components/decor/Shape3D"
import { StickyScene } from "@/components/primitives/StickyScene"
import { CaseStudyDialog } from "@/components/case-study/CaseStudyDialog"
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
/**
 * Global switch for the section's artwork.
 *
 *   true  — use the `_banner` / `_full` screenshots from `assets/images/projects`
 *   false — keep the generated artboard (watermark word + 3D solid)
 *
 * Both paths are kept working; flipping this changes nothing else.
 */
export const USE_ASSET_IMAGES = true

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
        {open && (
          <CaseStudyDialog
            project={open}
            onClose={() => setOpenId(null)}
            useAssetImage={false}
          />
        )}
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

/**
 * The showcase card.
 *
 * At rest the media fills the card and carries only its category tag — the
 * screenshot is the thing worth looking at, and the directory beside it
 * already names every project. On hover the image scales and desaturates,
 * a scrim rises, and the written detail lifts in over it.
 *
 * Concentric radii: the card is `rounded-3xl` (24px) with 10px of padding,
 * so the media frame takes 14px — 24 minus the gap — and the two curves
 * stay parallel instead of fighting each other.
 */
function ShowcaseCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const meta = [project.category, project.client, project.year].filter(Boolean) as string[]

  return (
    <article className="group relative overflow-hidden rounded-3xl border border-[var(--ds-border)] bg-gradient-to-b from-[var(--ds-surface)]/80 via-[var(--ds-surface-2)]/50 to-[var(--ds-surface-sunken)]/40 p-2.5 shadow-[var(--shadow-card)] backdrop-blur-md transition-all duration-300 hover:border-[var(--ds-border-strong)]">
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Open case study: ${project.title}`}
        data-cursor="view"
        className="relative block w-full overflow-hidden rounded-3xl text-left focus-visible:ring-2 focus-visible:ring-[var(--ds-border-accent)] focus-visible:outline-none"
      >
        <Artboard project={project} />

        {/* Top chrome: category tag at rest, expand hint on hover. */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between gap-3 p-3.5">
          <span className="font-mono rounded-pill border border-[var(--ds-border)] bg-[var(--ds-surface)]/85 px-3 py-1 text-[10px] font-semibold tracking-widest text-[var(--ds-text-secondary)] uppercase shadow-[var(--shadow-xs)] backdrop-blur-md">
            {project.category}
          </span>
          <span className="font-mono rounded-pill bg-[var(--ds-text-primary)]/75 px-2.5 py-1 text-[10px] text-white opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
            Click to expand ↗
          </span>
        </div>

        {/* Glassmorphic scrim with light blue tint and soft backdrop blur */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-[#050c1e]/90 via-[#0a183d]/60 to-[#0e204d]/10 opacity-0 backdrop-blur-[3px] transition-all duration-500 ease-out group-hover:opacity-100 group-focus-within:opacity-100"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_bottom_left,rgba(37,99,235,0.28),transparent_70%)] opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 group-focus-within:opacity-100"
        />

        {/* The written detail, lifting in smoothly over the glassmorphic image. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 translate-y-2 p-4 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 sm:p-6">
          <ul className="flex flex-wrap gap-2">
            {meta.map((m) => (
              <li key={m}>
                <span className="text-label inline-flex items-center rounded-pill border border-blue-400/30 bg-blue-500/20 px-3 py-1 font-medium tracking-normal normal-case text-blue-100 shadow-[0_2px_8px_rgba(0,0,0,0.2)] backdrop-blur-md">
                  {m}
                </span>
              </li>
            ))}
          </ul>

          <h3 className="text-h3 mt-2.5 font-extrabold tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
            {project.title}
          </h3>

          <p className="text-body-s mt-2 max-w-[640px] leading-relaxed text-blue-50/90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.3)]">
            {project.description}
          </p>

          <ul className="mt-3.5 flex flex-wrap gap-2">
            {project.technologies.map((t) => (
              <li key={t}>
                <span className="text-label inline-flex items-center rounded-pill border border-white/20 bg-white/10 px-2.5 py-1 font-medium tracking-normal normal-case text-white/90 shadow-[0_2px_8px_rgba(0,0,0,0.15)] backdrop-blur-md">
                  {t}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </button>

      {/* Persistent affordances: the hover reveal is decoration, this row is
          the actual, always-reachable call to action. */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-3.5 pt-4 pb-1.5 sm:px-4">
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

/**
 * The card's visual, filling the media frame. With `USE_ASSET_IMAGES` on this
 * is the project's screenshot; with it off, the generated artboard — the
 * watermark word and the project's signature solid floating over it.
 */
function Artboard({ project }: { project: Project }) {
  const reduced = useReducedMotion()

  if (USE_ASSET_IMAGES) {
    return (
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl bg-[var(--ds-surface-2)]">
        <img
          src={project.bannerImage}
          alt={`${project.title} interface`}
          loading="lazy"
          className="size-full rounded-3xl object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04] group-focus-within:scale-[1.04]"
        />
      </div>
    )
  }

  return (
    <div
      aria-hidden
      className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl bg-[var(--ds-surface-2)]/40 transition-transform duration-700 ease-out group-hover:scale-[1.04] group-focus-within:scale-[1.04]"
    >
      <span
        className="absolute bottom-0 left-0 translate-y-[12%] leading-[0.85] font-extrabold tracking-[-0.04em] whitespace-nowrap select-none"
        style={{
          fontSize: "clamp(3rem, 7.5vw, 6rem)",
          color: "var(--ds-text-faint)",
          opacity: 0.22,
        }}
      >
        {project.watermark}
      </span>

      <motion.div
        className="absolute top-4 right-[12%] sm:top-8"
        animate={reduced ? undefined : { y: [0, -12, 0], rotate: [0, 3, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <Shape3D kind={project.shape} hue={project.hue} size={140} />
      </motion.div>

      <motion.span
        className="absolute right-[34%] bottom-10 hidden size-3 rounded-full bg-[var(--ds-text-primary)]/80 shadow-md sm:block"
        animate={reduced ? undefined : { y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  )
}

