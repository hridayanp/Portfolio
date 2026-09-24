/**
 * SITE / IDENTITY — single source of truth.
 *
 * Everything personal lives here. No component should ever hard-code a name,
 * email, URL or social handle. If a value is unknown it is left `null` and the
 * UI simply omits it rather than rendering a placeholder link.
 *
 * TODO(hridayan): fill in the real values below. Each one is marked.
 */

export type SocialLink = {
  id: string
  label: string
  /** `null` => the link is not rendered anywhere. */
  href: string | null
  handle?: string
}

export const identity = {
  firstName: "Hridayan",
  lastName: "Phukan",
  fullName: "Hridayan Phukan",
  /** Short role used in nav, footer, meta. */
  role: "Freelance Frontend Engineer",
  /** Longer positioning used in the hero. */
  headline: "I build interfaces that make complex data usable.",
  /** The one-line "what I actually do" from the 30-second pitch. */
  summary:
    "Freelance frontend engineer with 4+ years building React data platforms \u2014 geospatial, climate intelligence and analytics dashboards delivered for UNDP programmes and enterprise clients.",
  /** Disciplines, used for the hero ticker and meta description. */
  disciplines: [
    "React Engineering",
    "Geospatial Interfaces",
    "Data Visualisation",
    "TypeScript",
    "Climate Intelligence",
    "Design Systems",
    "Performance",
  ],
  location: "India",
  locationFlag: "🇮🇳",
  /** Shown in the hero signature card. */
  timezone: "IST (UTC+5:30)",
  remoteAvailability: "Available for Remote Projects Worldwide",
  careerStart: 2021,
  /** Stated experience. Deliberately the figure from MYSELF.md rather than a
   *  computed one, so the site never claims more than the source document. */
  experienceLabel: "4+",
  availability: "Available for freelance React, data visualisation and geospatial projects",
  /** Same fact, short enough for a one-line pill on a phone. */
  availabilityShort: "Available for new projects",
  /** How I work with clients — used on the contact and footer cards. */
  engagementModel: "Freelance \u00b7 Contract \u00b7 Fully remote",
  /** The kinds of engagement I take on. */
  engagementTypes: [
    "Project-based builds",
    "Ongoing retainers",
    "Short technical sprints",
  ],
} as const

export const experienceYears = identity.experienceLabel

/** The three-up micro-dashboard in the hero signature card. */
export type HeroMetric = { value: string; label: string; tone: "ink" | "accent" | "success" }

export const heroMetrics: HeroMetric[] = [
  { value: `${identity.experienceLabel} Yrs`, label: "Experience", tone: "ink" },
  { value: "UNDP", label: "Clients", tone: "accent" },
  { value: "Maps & UI", label: "Geospatial", tone: "success" },
]

/** Bottom-left scroll cue / bottom-right credit line in the hero. */
export const heroFooter = {
  scrollLabel: "SCROLL",
  credit: `Design & Code by ${identity.fullName}`,
}

export const contact = {
  // TODO(hridayan): replace with your real address, e.g. "you@domain.com"
  email: null as string | null,
  // TODO(hridayan): replace with a hosted CV URL, e.g. "/Hridayan-Phukan-CV.pdf"
  resumeUrl: null as string | null,
  location: identity.location,
  availability: identity.availability,
  engagementModel: identity.engagementModel,
}

export const socials: SocialLink[] = [
  // TODO(hridayan): set `href` to your profile URLs. Entries with a null href
  // are automatically hidden everywhere in the UI.
  { id: "github", label: "GitHub", href: null },
  { id: "linkedin", label: "LinkedIn", href: null },
  { id: "x", label: "X", href: null },
]

/** Only the socials that have a real destination. */
export const activeSocials = socials.filter(
  (s): s is SocialLink & { href: string } => Boolean(s.href)
)

export type NavItem = { id: string; label: string; href: string }

export const navItems: NavItem[] = [
  { id: "home", label: "Home", href: "#home" },
  { id: "about", label: "About", href: "#about" },
  { id: "stack", label: "Stack", href: "#stack" },
  { id: "services", label: "Expertise", href: "#services" },
  { id: "work", label: "Projects", href: "#work" },
  { id: "contact", label: "Contact", href: "#contact" },
]

export const meta = {
  title: `${identity.fullName} - ${identity.role}`,
  description: identity.summary,
}
