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
    period: "Mar 2023 — Jul 2026",
    summary:
      "Owned frontend delivery end-to-end across climate-intelligence and geospatial data platforms — component architecture, mapping integration and performance for large datasets.",
    highlights: [
      "Led frontend development on climate intelligence platforms for UNDP and enterprise clients",
      "Architected component and state structures that keep large raster/vector map layers responsive",
      "Collaborated directly with backend, data and UNDP stakeholder teams",
    ],
    clients: ["UNDP", "Maruti Suzuki"],
  },
  {
    id: "accubits",
    company: "Accubits Technologies Pvt. Ltd.",
    title: "Software Engineer",
    start: "Sept 2021",
    end: "Feb 2023",
    period: "Sept 2021 — Feb 2023",
    summary:
      "Worked across the stack in small, fast-moving cross-functional teams, owning features end-to-end alongside product and design.",
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
    period: "2024 — 2026",
    completed: "Jun 2026",
    note: "Taken concurrently with full-time work — formal grounding in the infrastructure, distributed systems, and deployment side of the stack.",
    highlights: ["Cloud Architecture", "Distributed Systems", "Docker & Kubernetes"],
  },
  {
    id: "smit",
    institution: "Sikkim Manipal Institute of Technology",
    qualification: "B.Tech",
    field: "Computer Science & Engineering",
    period: "2017 — 2021",
    completed: "Jul 2021",
    note: "Comprehensive foundation in computer science fundamentals, data structures, algorithms, and modular software engineering.",
    highlights: ["Data Structures & Algorithms", "System Architecture", "Web Technologies"],
  },
]

