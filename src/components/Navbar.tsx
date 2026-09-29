import { useEffect, useMemo, useState } from "react"
import { contact, identity, navItems } from "@/content"
import { useActiveSection } from "@/hooks/useActiveSection"
import { ThemeToggle } from "./ThemeToggle"

/**
 * Scroll to a section by id without pushing a hash into the URL.
 * Keeps the address bar clean while honouring scroll-padding-top.
 */
function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: "smooth", block: "start" })
}

interface HeaderProps {
  isSolid?: boolean
}

export function Navbar({ isSolid = false }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [smaller, setSmaller] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const sectionIds = useMemo(() => navItems.map((n) => n.id), [])
  const active = useActiveSection(sectionIds)

  // Sticky "smaller" header on scroll (desktop) — mirrors designesia's scrolling()
  useEffect(() => {
    const onScroll = () => {
      const y = window.pageYOffset || document.documentElement.scrollTop
      setSmaller(y > 0)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Mobile breakpoint (matches 993px)
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 993px)")
    const apply = () => {
      setIsMobile(mq.matches)
      if (!mq.matches) setMenuOpen(false)
    }
    apply()
    mq.addEventListener("change", apply)
    return () => mq.removeEventListener("change", apply)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen && isMobile) {
      const prev = document.body.style.overflow
      document.body.style.overflow = "hidden"
      const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false)
      window.addEventListener("keydown", onKey)
      return () => {
        document.body.style.overflow = prev
        window.removeEventListener("keydown", onKey)
      }
    }
  }, [menuOpen, isMobile])

  const className = [
    "site-header",
    isSolid ? "solid-blue-header" : "transparent",
    smaller && !isMobile ? "smaller" : "",
    isMobile ? "header-mobile" : "",
    menuOpen ? "menu-open" : "",
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <>
      <a
        href="#main"
        className="sr-only rounded-pill bg-[var(--ds-accent)] px-md py-sm text-[var(--ds-text-inverse)] focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[110]"
      >
        Skip to content
      </a>

      <header
        className={className}
        style={menuOpen ? { height: "100vh" } : undefined}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="de-flex sm-pt10">
                <div className="de-flex-col">
                  {/* logo begin */}
                  <div
                    id="logo"
                    style={{ display: "flex", alignItems: "center", gap: "6px" }}
                  >
                    <a
                      href="/"
                      onClick={(e) => {
                        e.preventDefault()
                        scrollToSection("home")
                        setMenuOpen(false)
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        textDecoration: "none",
                      }}
                      data-cursor="link"
                    >
                      <span
                        aria-hidden
                        className="inline-block size-2.5 shrink-0 rounded-full bg-[var(--ds-accent)] shadow-[var(--ds-brand-glow)]"
                      />
                      <span className="font-display text-[17px] font-bold tracking-tight text-[var(--ds-text-primary)]">
                        {identity.firstName}
                      </span>
                      <span className="font-display text-[17px] font-medium tracking-tight text-[var(--ds-text-muted)]">
                        {identity.lastName}
                      </span>
                    </a>
                  </div>
                  {/* logo end */}
                </div>

                <div className="de-flex-col header-col-mid">
                  {/* main menu begin */}
                  <ul
                    id="mainmenu"
                    onClick={(e) => {
                      if ((e.target as HTMLElement).closest("a")) {
                        setMenuOpen(false)
                      }
                    }}
                  >
                    {navItems.map((item) => (
                      <li key={item.id}>
                        <a
                          className={`menu-item ${active === item.id ? "active" : ""}`}
                          href="/"
                          data-cursor="link"
                          aria-current={active === item.id ? "page" : undefined}
                          onClick={(e) => {
                            e.preventDefault()
                            scrollToSection(item.id)
                            setMenuOpen(false)
                          }}
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                  {/* main menu end */}
                </div>

                <div className="de-flex-col">
                  <div className="menu_side_area d-flex align-items-center gap-3">
                    <ThemeToggle />

                    <a
                      href={contact.email ? `mailto:${contact.email}` : "#contact"}
                      data-cursor="link"
                      className="hidden rounded-pill bg-[var(--ds-accent)] px-4 py-2 font-display text-xs font-semibold tracking-normal text-[var(--ds-text-inverse)] shadow-[0_4px_14px_rgba(37,99,235,0.3)] transition-all duration-200 hover:bg-[var(--ds-accent-hover)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.4)] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[var(--ds-border-accent)] focus-visible:outline-none sm:inline-flex"
                    >
                      Get in touch
                    </a>

                    {/* hamburger menu button */}
                    <span
                      id="menu-btn"
                      className={menuOpen ? "menu-open" : ""}
                      aria-label="Toggle menu"
                      role="button"
                      tabIndex={0}
                      onClick={() => setMenuOpen((o) => !o)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault()
                          setMenuOpen((o) => !o)
                        }
                      }}
                    >
                      <span />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export const Header = Navbar
export default Navbar
