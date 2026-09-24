/**
 * Delivery track record.
 *
 * Framed by what was built and who it was for, rather than by job titles and
 * employment dates — a client hiring for a project cares about the work and
 * the domain, not an org chart. Every fact here is the same fact as before,
 * only the framing changed.
 */
export type Role = {
  id: string
  /** Where the work was delivered. */
  company: string
  /** What the engagement was, in delivery terms. */
  title: string
  start: string
  end: string
  /** Span of the work. */
  period: string
  summary: string
  highlights: string[]
  clients?: string[]
}

export type Education = {
  id: string
  institution: string
  qualification: string
  field: string
  period: string
  completed: string
  note?: string
  highlights?: string[]
}

export const roles: Role[] = [
  {
    id: "misteo",
    company: "mistEO Pvt. Ltd. \u00b7 UNDP programmes",
    title: "Climate Intelligence & Geospatial Platforms",
    start: "2023",
    end: "2026",
    period: "2023 \u2014 2026",
    summary:
      "Delivered climate intelligence and geospatial platforms for UNDP and enterprise clients, keeping complex map interfaces fast and responsive.",
    highlights: [
      "Led frontend delivery on climate intelligence platforms for UNDP and enterprise clients",
      "Architected component and state structures that keep large raster and vector map layers responsive",
      "Worked directly with backend, data, and UNDP stakeholder teams",
    ],
    clients: ["UNDP", "Maruti Suzuki"],
  },
  {
    id: "accubits",
    company: "Accubits Technologies Pvt. Ltd.",
    title: "Product Feature Delivery",
    start: "2021",
    end: "2023",
    period: "2021 \u2014 2023",
    summary:
      "Shipped product features end-to-end inside agile cross-functional teams.",
    highlights: [
      "Shipped features end-to-end in cross-functional product teams",
      "Consistent on-time and ahead-of-deadline sprint delivery",
    ],
  },
]

export const education: Education[] = [
  {
    id: "iitp",
    institution: "IIT Patna",
    qualification: "M.Tech",
    field: "Cloud Computing",
    period: "2024 - 2026",
    completed: "Jun 2026",
    note: "A strong foundation in infrastructure, distributed systems, and deployment \u2014 useful whenever a build has to ship, not just run locally.",
    highlights: ["Cloud Architecture", "Distributed Systems", "Docker & Kubernetes"],
  },
  {
    id: "smit",
    institution: "Sikkim Manipal Institute of Technology",
    qualification: "B.Tech",
    field: "Computer Science & Engineering",
    period: "2017 - 2021",
    completed: "Jul 2021",
    note: "Core grounding in computer science fundamentals, data structures, algorithms, and modular software engineering.",
    highlights: ["Data Structures & Algorithms", "System Architecture", "Web Technologies"],
  },
]

