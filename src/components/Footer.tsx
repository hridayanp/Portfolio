import { activeSocials, contact, heroFooter, identity, navItems } from "@/content"
import { Marquee } from "./primitives/Marquee"

/**
 * Footer — spec §6: padding 192 / 24 / 0, with the wordmark ticker.
 * The wordmark is the page's only sub-1 line-height (0.9), because at that
 * size it is a graphic rather than text (spec §4).
 */
export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-hairline bg-sunk relative w-full border-t">
      <div className="overflow-hidden pt-xl">
        <Marquee
          speed={40}
          ariaLabel={identity.fullName}
          trackClassName="items-center"
        >
          <span className="text-wordmark text-black pr-[0.1em] font-medium whitespace-nowrap opacity-[0.05]">
            {identity.fullName}
          </span>
          <span className="text-wordmark pr-[0.1em] font-medium whitespace-nowrap text-[var(--ds-text-disabled)] opacity-60">
            ·
          </span>
        </Marquee>
      </div>

      <div className="gutter pt-xl pb-xl">
        <div className="mx-auto grid w-full max-w-[1400px] gap-lg md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="flex flex-col gap-sm">
            <p className="text-h3 text-black">{identity.fullName}</p>
            <p className="text-body-s text-ink-2 max-w-[34ch]">
              {identity.role} · {identity.engagementModel}
            </p>
            <p className="text-label text-ink-3 normal-case tracking-normal">
              {contact.location}
            </p>
          </div>

          <nav className="flex flex-col gap-sm" aria-label="Footer">
            <p className="eyebrow">Navigate</p>
            <ul className="flex flex-col gap-xs">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    data-cursor="link"
                    className="text-body-s text-ink-2 hover:text-black transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-sm">
            <p className="eyebrow">Elsewhere</p>
            <ul className="flex flex-col gap-xs">
              {contact.email && (
                <li>
                  <a
                    href={`mailto:${contact.email}`}
                    data-cursor="link"
                    className="text-body-s text-[var(--ds-link)] hover:text-[var(--ds-link)] hover:brightness-125 transition-colors"
                  >
                    {contact.email}
                  </a>
                </li>
              )}
              {activeSocials.map((s) => (
                <li key={s.id}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="link"
                    className="text-body-s text-[var(--ds-link)] hover:text-[var(--ds-link)] hover:brightness-125 transition-colors"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
              {contact.resumeUrl && (
                <li>
                  <a
                    href={contact.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="link"
                    className="text-body-s text-[var(--ds-link)] hover:text-[var(--ds-link)] hover:brightness-125 transition-colors"
                  >
                    Résumé
                  </a>
                </li>
              )}
              {!contact.email && activeSocials.length === 0 && !contact.resumeUrl && (
                <li className="text-body-s text-ink-3">Links coming soon</li>
              )}
            </ul>
          </div>
        </div>

        <div className="bg-hairline mx-auto mt-xl h-px w-full max-w-[1400px]" />

        <div className="mx-auto mt-md flex w-full max-w-[1400px] flex-col gap-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="text-label text-ink-3 normal-case tracking-normal">
            {heroFooter.credit} © {year}
          </p>
          <p className="text-label text-ink-3 normal-case tracking-normal">
            Built with React, TypeScript and Framer Motion
          </p>
        </div>
      </div>
    </footer>
  )
}
