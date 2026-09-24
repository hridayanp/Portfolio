import { ArrowUpRight } from "@phosphor-icons/react"
import { activeSocials, contact, identity } from "@/content"
import { FloatingShapes, type FloatingShape } from "@/components/decor/FloatingShapes"
import { MagneticButton } from "@/components/primitives/MagneticButton"
import { MaskedText } from "@/components/primitives/MaskedText"
import { Section } from "@/components/primitives/Section"

const shapes: FloatingShape[] = [
  { kind: "sphere", hue: "blue", size: 120, top: "10%", left: "84%", depth: 0.8, desktopOnly: true },
  { kind: "torus", hue: "violet", size: 96, top: "64%", left: "6%", depth: 0.6, rotate: 18, desktopOnly: true },
  { kind: "star", hue: "orange", size: 72, top: "18%", left: "8%", depth: 1, desktopOnly: true },
]

export function Contact() {
  const hasChannels = Boolean(contact.email) || activeSocials.length > 0

  return (
    <Section id="contact" label="Contact" className="overflow-hidden">
      <FloatingShapes shapes={shapes} />

      <div className="relative mx-auto flex max-w-[1100px] flex-col items-center gap-lg text-center">
        <span className="eyebrow">Contact</span>

        <MaskedText
          as="h2"
          text="Let's build something great together."
          className="text-h1 text-black max-w-[16ch]"
        />

        <p className="text-lead text-ink-2 max-w-[46ch]">
          {identity.availability}. If you are building data-heavy interfaces for geospatial,
          climate, or analytics platforms, send over the brief and I will tell you honestly
          whether I am the right person for it.
        </p>

        {contact.email && (
          <a
            href={`mailto:${contact.email}`}
            data-cursor="link"
            className="text-h2 inline-block text-[var(--ds-link)] underline decoration-[var(--ds-border-strong)] decoration-2 underline-offset-[0.18em] transition-colors hover:decoration-[var(--ds-link)]"
          >
            {contact.email}
          </a>
        )}

        <div className="flex flex-wrap items-center justify-center gap-sm">
          {contact.email && (
            <MagneticButton href={`mailto:${contact.email}`}>
              Start a conversation
              <ArrowUpRight size={16} weight="bold" />
            </MagneticButton>
          )}
          {contact.resumeUrl && (
            <MagneticButton href={contact.resumeUrl} variant="outline" external>
              Read my CV
            </MagneticButton>
          )}
          {activeSocials.map((s) => (
            <MagneticButton key={s.id} href={s.href} variant="ghost" external>
              {s.label}
            </MagneticButton>
          ))}
        </div>

        {!hasChannels && (
          <p className="text-body-s border-hairline text-ink-3 rounded-lg border border-dashed px-md py-sm">
            Contact links are being updated and will appear here shortly.
          </p>
        )}

        <dl className="mt-md grid w-full max-w-[760px] gap-md sm:grid-cols-3">
          {[
            { label: "Based in", value: `${contact.location} \u00b7 ${identity.timezone}` },
            { label: "How I work", value: contact.engagementModel },
            { label: "Focus", value: identity.role },
          ].map((item) => (
            <div key={item.label} className="card-surface tinted px-md py-md text-left">
              <dt className="eyebrow">{item.label}</dt>
              <dd className="text-body-s text-black mt-sm font-semibold">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  )
}
