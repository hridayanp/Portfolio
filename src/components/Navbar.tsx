import { useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react"
import { List, X } from "@phosphor-icons/react"
import { contact, identity, navItems } from "@/content"
import { useActiveSection } from "@/hooks/useActiveSection"
import { NavLink } from "./NavLink"
import { ThemeToggle } from "./ThemeToggle"
import { ease } from "@/lib/motion"
import { cn } from "@/lib/utils"

/**
 * Global floating capsule header, fixed at top.
 *
 * The capsule is frosted at every scroll position rather than fading in —
 * it is the page's persistent chrome, and it has to stay legible over the
 * dot-grid canvas from the first pixel. Scrolling only deepens its shadow,
 * which reads as lift rather than as the bar appearing from nowhere.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()

  const sectionIds = useMemo(() => navItems.map((n) => n.id), [])
  const active = useActiveSection(sectionIds)

  useMotionValueEvent(scrollY, "change", (v) => {
    const next = v > 24
    setScrolled((prev) => (prev === next ? prev : next))
  })

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener("keydown", onKey)
    }
  }, [open])

  return (
    <>
      <a
        href="#main"
        className="sr-only rounded-pill bg-[var(--ds-accent)] px-md py-sm text-[var(--ds-text-inverse)] focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[110]"
      >
        Skip to content
      </a>

      <header className="fixed inset-x-0 top-0 z-50 gutter pt-md">
        <nav
          data-raised={scrolled}
          className="floating-nav mx-auto flex h-[72px] items-center justify-between gap-md rounded-pill px-5 transition-all duration-300 sm:px-7"
        >
          <a
            href="#home"
            data-cursor="link"
            className="text-label group flex shrink-0 items-center gap-2.5 whitespace-nowrap tracking-normal normal-case"
          >
            <span
              aria-hidden
              className="inline-block size-2.5 shrink-0 rounded-full bg-[var(--ds-accent)] shadow-[var(--ds-brand-glow)] transition-transform duration-200 group-hover:scale-125"
            />
            <span className="font-semibold text-[var(--ds-text-primary)]">{identity.firstName}</span>
            <span className="text-[var(--ds-text-muted)]">{identity.lastName}</span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <li key={item.id}>
                <NavLink label={item.label} href={item.href} isActive={active === item.id} />
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-sm">
            <ThemeToggle />
            <a
              href={contact.email ? `mailto:${contact.email}` : "#contact"}
              data-cursor="link"
              className="text-label hidden rounded-pill bg-[var(--ds-accent)] px-5 py-2.5 font-semibold tracking-normal normal-case text-[var(--ds-text-inverse)] shadow-[0_4px_14px_rgba(37,99,235,0.3)] transition-all duration-200 hover:bg-[var(--ds-accent-hover)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.4)] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[var(--ds-border-accent)] focus-visible:outline-none sm:inline-flex"
            >
              Get in touch
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="grid size-11 place-items-center rounded-pill border border-[var(--ds-border)] bg-[var(--ds-surface)] text-[var(--ds-text-primary)] shadow-[var(--shadow-xs)] transition-all hover:border-[var(--ds-accent-light)] hover:text-[var(--ds-accent)] active:scale-[0.95] focus-visible:ring-2 focus-visible:ring-[var(--ds-border-accent)] focus-visible:outline-none lg:hidden"
            >
              <List size={18} weight="bold" />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && <MobileMenu active={active} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  )
}

function MobileMenu({ active, onClose }: { active: string; onClose: () => void }) {
  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[70] lg:hidden"
    >
      <motion.div
        initial={{ clipPath: "inset(0 0 100% 0)" }}
        animate={{ clipPath: "inset(0 0 0% 0)" }}
        exit={{ clipPath: "inset(0 0 100% 0)" }}
        transition={{ duration: 0.4, ease: ease.out }}
        className="bg-mesh absolute inset-0 bg-[var(--ds-bg)]"
      />

      <div className="relative flex h-full flex-col gutter pt-md pb-xl">
        <div className="flex h-[72px] items-center justify-between">
          <span className="eyebrow">Menu</span>
          <div className="flex items-center gap-sm">
            <ThemeToggle />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              autoFocus
              className="grid size-11 place-items-center rounded-pill border border-[var(--ds-border)] bg-[var(--ds-surface)] text-[var(--ds-text-primary)] shadow-[var(--shadow-xs)] transition-all hover:border-[var(--ds-accent-light)] hover:text-[var(--ds-accent)] active:scale-[0.95] focus-visible:ring-2 focus-visible:ring-[var(--ds-border-accent)] focus-visible:outline-none"
            >
              <X size={18} weight="bold" />
            </button>
          </div>
        </div>

        <ul className="mt-xl flex flex-1 flex-col">
          {navItems.map((item, i) => (
            <li key={item.id}>
              <a
                href={item.href}
                onClick={onClose}
                className={cn(
                  "text-h3 flex items-baseline justify-between border-b border-[var(--ds-border)] py-md transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[var(--ds-border-accent)] focus-visible:outline-none",
                  active === item.id
                    ? "font-semibold text-[var(--ds-accent)]"
                    : "text-[var(--ds-text-secondary)] hover:text-[var(--ds-accent)]"
                )}
              >
                {item.label}
                <span className="text-label font-mono text-[var(--ds-text-faint)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <p className="text-label text-[var(--ds-text-muted)] tracking-normal normal-case">
          {identity.availability}
        </p>
      </div>
    </motion.div>
  )
}
