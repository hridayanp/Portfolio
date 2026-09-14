import { useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react"
import { List, X } from "@phosphor-icons/react"
import { contact, identity, navItems } from "@/content"
import { useActiveSection } from "@/hooks/useActiveSection"
import { NavLink } from "./NavLink"
import { ease } from "@/lib/motion"
import { cn } from "@/lib/utils"

/**
 * Fixed at top, 72px tall — spec §6.
 * The active item is scroll-driven (spec §11): on a 20+ viewport page this is
 * position feedback, not decoration.
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
        className="bg-black text-ground sr-only rounded-pill px-md py-sm focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[110]"
      >
        Skip to content
      </a>

      <header className="fixed inset-x-0 top-0 z-50 gutter pt-md">
        <nav
          className={cn(
            "mx-auto flex h-[72px] items-center justify-between gap-md rounded-pill border px-md transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500",
            scrolled
              ? "border-hairline bg-[var(--ds-bg-elevated)]"
              : "border-transparent bg-transparent"
          )}
        >
          <a
            href="#home"
            data-cursor="link"
            className="text-label flex items-center gap-sm px-sm tracking-normal normal-case"
          >
            <span aria-hidden className="bg-a1 inline-block size-2 rounded-full" />
            <span className="text-black font-semibold">{identity.firstName}</span>
            <span className="text-ink-3">{identity.lastName}</span>
          </a>

          <ul className="hidden items-center lg:flex">
            {navItems.map((item) => (
              <li key={item.id}>
                <NavLink label={item.label} href={item.href} isActive={active === item.id} />
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-sm">
            <a
              href={contact.email ? `mailto:${contact.email}` : "#contact"}
              data-cursor="link"
              className="text-label font-mono hidden rounded-none bg-[var(--ds-accent)] px-md py-sm normal-case tracking-normal text-[var(--ds-text-inverse)] transition-colors duration-200 hover:bg-[var(--ds-accent-hover)] active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-[var(--ds-border-accent)] focus-visible:outline-none sm:inline-flex"
            >
              Get in touch
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="border-hairline bg-surface text-ink hover:border-black active:scale-[0.95] grid size-11 place-items-center rounded-pill border transition-all focus-visible:ring-2 focus-visible:ring-a1 focus-visible:outline-none lg:hidden"
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
        className="bg-ground absolute inset-0"
      />

      <div className="relative flex h-full flex-col gutter pt-md pb-xl">
        <div className="flex h-[72px] items-center justify-between">
          <span className="eyebrow">Menu</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            autoFocus
            className="border-hairline text-ink hover:border-black active:scale-[0.95] grid size-11 place-items-center rounded-pill border transition-all focus-visible:ring-2 focus-visible:ring-a1 focus-visible:outline-none"
          >
            <X size={18} weight="bold" />
          </button>
        </div>

        <ul className="mt-xl flex flex-1 flex-col">
          {navItems.map((item, i) => (
            <li key={item.id}>
              <a
                href={item.href}
                onClick={onClose}
                className={cn(
                  "border-hairline text-h3 flex items-baseline justify-between border-b py-md transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-a1 focus-visible:outline-none",
                  active === item.id ? "text-black font-semibold" : "text-ink-3 hover:text-black"
                )}
              >
                {item.label}
                <span className="text-label text-ink-3">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <p className="text-label text-ink-2 normal-case tracking-normal">
          {identity.availability}
        </p>
      </div>
    </motion.div>
  )
}
