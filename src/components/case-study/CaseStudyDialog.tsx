import { useEffect, useRef, useState } from "react"
import { motion } from "motion/react"
import { ArrowUpRight, GithubLogo, X } from "@phosphor-icons/react"
import type { Project } from "@/content"
import { Shape3D } from "@/components/decor/Shape3D"
import { ease } from "@/lib/motion"
import { cn } from "@/lib/utils"
import { CaseStudyMarkdown } from "./CaseStudyMarkdown"
import { caseStudySections } from "./caseStudyDoc"

/**
 * The expanded case study — one reusable shell for every project.
 *
 * Every document in `docs/` shares the same numbered-section format, so the
 * shell is built once: masthead, metadata header, a section rail derived
 * from the document's own `##` headings, and the rendered body. Adding a
 * project adds a document; nothing here changes.
 *
 * Sized to 95% of the viewport in both axes, per the design.
 */
export function CaseStudyDialog({
  project,
  onClose,
  useAssetImage = false,
}: {
  project: Project
  onClose: () => void
  /** Defaults to false for the clean generative artboard header. */
  useAssetImage?: boolean
}) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const isJumpingRef = useRef(false)
  const jumpTimeoutRef = useRef<number | null>(null)
  const rafIdRef = useRef<number | null>(null)
  const [activeSection, setActiveSection] = useState<string | null>(null)

  const sections = caseStudySections(project.caseStudy)

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener("keydown", onKey)
      if (jumpTimeoutRef.current) clearTimeout(jumpTimeoutRef.current)
      if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current)
    }
  }, [onClose])

  /* Track the active heading smoothly as the reader scrolls the body container. */
  useEffect(() => {
    const root = bodyRef.current
    if (!root || sections.length === 0) return

    const handleScroll = () => {
      if (isJumpingRef.current) return
      if (rafIdRef.current !== null) return

      rafIdRef.current = requestAnimationFrame(() => {
        rafIdRef.current = null
        if (!root) return

        const rootRect = root.getBoundingClientRect()
        const isAtBottom = root.scrollTop + root.clientHeight >= root.scrollHeight - 30

        if (isAtBottom) {
          setActiveSection(sections[sections.length - 1].id)
          return
        }

        const headingElements = sections
          .map((s) => ({ id: s.id, el: root.querySelector(`#${CSS.escape(s.id)}`) }))
          .filter((item): item is { id: string; el: HTMLElement } => item.el instanceof HTMLElement)

        if (headingElements.length === 0) return

        let currentId = headingElements[0].id
        const threshold = rootRect.top + 60

        for (const h of headingElements) {
          const rect = h.el.getBoundingClientRect()
          if (rect.top <= threshold) {
            currentId = h.id
          } else {
            break
          }
        }
        setActiveSection(currentId)
      })
    }

    handleScroll()
    root.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      root.removeEventListener("scroll", handleScroll)
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current)
        rafIdRef.current = null
      }
    }
  }, [sections])

  /* Automatically and smoothly keep the active navigation item visible within the left rail without thrashing. */
  useEffect(() => {
    if (!activeSection || !navRef.current) return
    const nav = navRef.current
    const activeBtn = nav.querySelector(
      `[data-section-id="${CSS.escape(activeSection)}"]`
    ) as HTMLElement | null

    if (activeBtn) {
      const navRect = nav.getBoundingClientRect()
      const btnRect = activeBtn.getBoundingClientRect()
      const margin = 48 // comfortable margin from top/bottom bounds

      const isAbove = btnRect.top < navRect.top + margin
      const isBelow = btnRect.bottom > navRect.bottom - margin

      if (isAbove || isBelow) {
        const targetScroll =
          nav.scrollTop +
          (btnRect.top - navRect.top) -
          nav.clientHeight / 2 +
          btnRect.height / 2

        nav.scrollTo({
          top: Math.max(0, targetScroll),
          behavior: "smooth",
        })
      }
    }
  }, [activeSection])

  const jump = (id: string) => {
    const root = bodyRef.current
    const el = root?.querySelector(`#${CSS.escape(id)}`)
    if (el instanceof HTMLElement && root) {
      isJumpingRef.current = true
      if (jumpTimeoutRef.current) clearTimeout(jumpTimeoutRef.current)

      const rootRect = root.getBoundingClientRect()
      const elRect = el.getBoundingClientRect()
      const offset = elRect.top - rootRect.top + root.scrollTop
      root.scrollTo({ top: offset, behavior: "smooth" })
      setActiveSection(id)

      jumpTimeoutRef.current = window.setTimeout(() => {
        isJumpingRef.current = false
      }, 500)
    }
  }

  const meta = [project.category, project.client].filter(Boolean) as string[]

  return (
    <motion.div
      className="fixed inset-0 z-[2000] flex items-center justify-center p-2 sm:p-3"
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
        className="absolute inset-0 cursor-default bg-[color-mix(in_srgb,var(--ds-text-primary)_45%,transparent)] backdrop-blur-md"
      />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby={`case-${project.id}-title`}
        initial={{ scale: 0.96, y: 14, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.97, y: 8, opacity: 0 }}
        transition={{ duration: 0.3, ease: ease.out }}
        className="relative flex h-[95vh] max-h-[95vh] w-[95vw] max-w-[95vw] flex-col overflow-hidden rounded-3xl border border-[var(--ds-border)] bg-[var(--ds-surface)] shadow-[var(--shadow-card)]"
      >
        {/* ---- Masthead ---- */}
        <header className="relative shrink-0 border-b border-[var(--ds-border-subtle)]">
          <div className="relative h-[28vh] max-h-[260px] min-h-[150px] w-full overflow-hidden bg-gradient-to-b from-[var(--ds-surface-2)] via-[var(--ds-surface-sunken)]/60 to-[var(--ds-surface)]">
            {useAssetImage ? (
              <img
                src={project.fullImage}
                alt=""
                aria-hidden
                loading="lazy"
                className="size-full object-cover object-top"
              />
            ) : (
              <>
                <span
                  aria-hidden
                  className="absolute bottom-0 left-4 translate-y-[12%] leading-[0.85] font-extrabold tracking-[-0.04em] whitespace-nowrap select-none"
                  style={{
                    fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                    color: "var(--ds-text-faint)",
                    opacity: 0.22,
                  }}
                >
                  {project.watermark}
                </span>
                <div className="absolute top-6 right-[16%]">
                  <Shape3D kind={project.shape} hue={project.hue} size={116} />
                </div>
              </>
            )}

            {/* Scrim: the masthead screenshot is arbitrary artwork, so the
                close control needs its own contrast rather than relying on
                whatever happens to be under it. */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/20 to-transparent"
            />

            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close case study"
              data-cursor="link"
              className="absolute top-4 right-4 z-10 grid size-10 place-items-center rounded-pill border border-[var(--ds-border-strong)] bg-[var(--ds-surface)]/95 text-[var(--ds-text-primary)] shadow-[var(--shadow-md)] backdrop-blur-md transition-all hover:border-[var(--ds-accent-light)] hover:text-[var(--ds-accent)] active:scale-95 focus-visible:ring-2 focus-visible:ring-[var(--ds-border-accent)] focus-visible:outline-none"
            >
              <X size={16} weight="bold" />
            </button>
          </div>

          <div className="flex flex-wrap items-end justify-between gap-4 px-5 py-4 sm:px-7">
            <div className="min-w-0">
              <p className="font-mono text-[11px] font-semibold tracking-widest text-[var(--ds-text-muted)] uppercase">
                {project.category}
              </p>
              <h2
                id={`case-${project.id}-title`}
                className="text-h3 mt-1 font-extrabold tracking-tight text-[var(--ds-text-primary)]"
              >
                {project.title}
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {meta.map((m) => (
                <span
                  key={m}
                  className="text-label inline-flex items-center rounded-pill border border-[var(--ds-border)] bg-[var(--ds-surface)]/90 px-3 py-1 font-medium tracking-normal normal-case text-[var(--ds-text-body)] shadow-[var(--shadow-xs)]"
                >
                  {m}
                </span>
              ))}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-label inline-flex items-center gap-1 rounded-pill bg-[var(--ds-accent)] px-3.5 py-1.5 font-semibold tracking-normal normal-case text-[var(--ds-text-inverse)] shadow-[var(--shadow-electric)] transition-all hover:bg-[var(--ds-accent-hover)]"
                >
                  Live site <ArrowUpRight size={12} weight="bold" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-label inline-flex items-center gap-1 rounded-pill border border-[var(--ds-border)] bg-[var(--ds-surface)] px-3.5 py-1.5 font-semibold tracking-normal normal-case text-[var(--ds-text-primary)] shadow-[var(--shadow-xs)] transition-all hover:border-[var(--ds-accent-light)] hover:text-[var(--ds-accent)]"
                >
                  <GithubLogo size={13} weight="bold" /> Source
                </a>
              )}
            </div>
          </div>
        </header>

        {/* ---- Rail + body ---- */}
        <div className="flex min-h-0 flex-1">
          <nav
            ref={navRef}
            aria-label="Case study sections"
            className="hidden w-[280px] shrink-0 overflow-y-auto border-e border-[var(--ds-border-subtle)] bg-[var(--ds-surface-2)]/50 p-4 lg:block"
          >
            <p className="font-mono mb-3 px-2 text-[11px] tracking-wider text-[var(--ds-text-muted)]">
              [ CONTENTS ]
            </p>
            <ol className="flex flex-col gap-0.5">
              {sections.map((s) => (
                <li key={s.id}>
                  <button
                    type="button"
                    data-section-id={s.id}
                    onClick={() => jump(s.id)}
                    className={cn(
                      "text-body-s w-full rounded-lg px-2.5 py-1.5 text-left leading-snug transition-colors focus-visible:ring-2 focus-visible:ring-[var(--ds-border-accent)] focus-visible:outline-none",
                      activeSection === s.id
                        ? "bg-[var(--ds-accent-subtle)] font-semibold text-[var(--ds-accent)]"
                        : "text-[var(--ds-text-secondary)] hover:bg-[var(--ds-surface)] hover:text-[var(--ds-text-primary)]"
                    )}
                  >
                    {s.label}
                  </button>
                </li>
              ))}
            </ol>
          </nav>

          <div ref={bodyRef} className="min-w-0 flex-1 overflow-y-auto px-5 pt-0 pb-10 sm:px-8">
            <div className="mx-auto w-full max-w-[860px]">
              <CaseStudyMarkdown markdown={project.caseStudy} />

              <div className="mt-12 border-t border-[var(--ds-border)] pt-6">
                <p className="font-mono mb-3 text-[11px] font-medium tracking-wider text-[var(--ds-text-muted)]">
                  [ BUILT WITH ]
                </p>
                <ul className="flex flex-wrap gap-2.5">
                  {project.technologies.map((t) => (
                    <li key={t}>
                      <span className="text-label inline-flex items-center rounded-pill border border-[var(--ds-border)] bg-[var(--ds-surface)] px-3 py-1 font-medium tracking-normal normal-case text-[var(--ds-text-body)] shadow-[var(--shadow-xs)]">
                        {t}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
