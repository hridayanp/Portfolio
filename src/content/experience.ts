export type Role = {
  id: string
  company: string
  title: string
  start: string
  end: string
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
    company: "mistEO Pvt. Ltd.",
    title: "Software Engineer, Frontend",
    start: "Mar 2023",
    end: "Jul 2026",
    period: "Mar 2023 - Jul 2026",
    summary:
      "Built climate intelligence and geospatial platforms for UNDP and enterprise clients, keeping complex map interfaces fast and responsive.",
    highlights: [
      "Led frontend development on climate intelligence platforms for UNDP and enterprise clients",
      "Architected component and state structures that keep large raster and vector map layers responsive",
      "Collaborated directly with backend, data, and UNDP stakeholder teams",
    ],
    clients: ["UNDP", "Maruti Suzuki"],
  },
  {
    id: "accubits",
    company: "Accubits Technologies Pvt. Ltd.",
    title: "Software Engineer",
    start: "Sept 2021",
    end: "Feb 2023",
    period: "Sept 2021 - Feb 2023",
    summary:
      "Developed and shipped product features end-to-end within agile cross-functional teams.",
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
    note: "Completed while working full-time, building a strong foundation in infrastructure, distributed systems, and deployment.",
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

