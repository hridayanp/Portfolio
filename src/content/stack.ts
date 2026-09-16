export type Tech = {
  name: string
  /** Shown on the reverse of the flip card. */
  note: string
}

/** Filter buckets exposed by the stack grid's control row. */
export type StackFilterId =
  | "all"
  | "frontend"
  | "geospatial"
  | "visualisation"
  | "backend"

export type StackGroup = {
  id: string
  label: string
  blurb: string
  /** Monospaced bracket tag printed on each card — `[ FRONTEND ]` etc. */
  tag: string
  /** Which control-row filter this group answers to. */
  filter: Exclude<StackFilterId, "all">
  items: Tech[]
}

/**
 * Only technologies actually evidenced in MYSELF.md appear here.
 * Depth is described honestly — `note` is what I'd say about it out loud.
 */
export const stackGroups: StackGroup[] = [
  {
    id: "frontend",
    label: "Frontend",
    blurb: "Where most of my production time has gone.",
    tag: "FRONTEND",
    filter: "frontend",
    items: [
      {
        name: "ReactJS",
        note: "Primary tool for four years across production data platforms.",
      },
      {
        name: "TypeScript",
        note: "Default for anything that will outlive the sprint.",
      },
      {
        name: "JavaScript (ES6+)",
        note: "The foundation under everything else here.",
      },
      {
        name: "Redux Toolkit",
        note: "Reached for when state genuinely outgrows local and context.",
      },
      {
        name: "Next.js",
        note: "Used where routing and rendering strategy matter.",
      },
      { name: "Tailwind CSS", note: "Styling system on recent platform work." },
    ],
  },
  {
    id: "geospatial",
    label: "Geospatial",
    blurb: "Web GIS — browser-based, not desktop GIS.",
    tag: "GEOSPATIAL",
    filter: "geospatial",
    items: [
      {
        name: "Leaflet",
        note: "For simpler layered maps where the API surface stays small.",
      },
      {
        name: "MapLibreGL",
        note: "For vector tiles and better performance at scale.",
      },
      {
        name: "Georaster",
        note: "Raster handling on the climate resilience portal.",
      },
      {
        name: "Geospatial APIs",
        note: "Layer services, tiling and spatial filtering.",
      },
      { name: "Web GIS", note: "JS-based throughout — not ArcGIS or QGIS." },
    ],
  },
  {
    id: "visualisation",
    label: "Visualisation",
    blurb: "Turning datasets into something decision-grade.",
    tag: "VISUALISATION",
    filter: "visualisation",
    items: [
      {
        name: "ChartJS",
        note: "Interactive charting on the feedlot dashboard.",
      },
      {
        name: "React-Table",
        note: "Dense tabular data with real-time parameter tracking.",
      },
      { name: "React Flow", note: "Visual workflow chaining in DataFlow." },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    blurb: "Real exposure, not my core specialty.",
    tag: "BACKEND",
    filter: "backend",
    items: [
      {
        name: "Node.js",
        note: "API and pipeline work adjacent to the frontends I own.",
      },
      {
        name: "Express.js",
        note: "Service layer on internal and client tooling.",
      },
      {
        name: "REST APIs",
        note: "Designing and consuming them across every project here.",
      },
    ],
  },
  {
    id: "data",
    label: "Databases",
    blurb: "Comfortable reading and shaping the data layer.",
    tag: "DATABASES",
    filter: "backend",
    items: [
      { name: "PostgreSQL", note: "Relational work behind platform features." },
      { name: "MySQL", note: "Used across earlier product teams." },
      { name: "MongoDB", note: "Document storage where the shape was fluid." },
    ],
  },
  {
    id: "platform",
    label: "Cloud & Delivery",
    blurb: "Frontend-adjacent in production, deepened through my M.Tech.",
    tag: "CLOUD & DELIVERY",
    filter: "backend",
    items: [
      {
        name: "Docker",
        note: "Building and shipping containerised frontend apps.",
      },
      {
        name: "Kubernetes",
        note: "Concepts and coursework depth — not a DevOps specialist.",
      },
      {
        name: "Skaffold",
        note: "Part of the containerised dev loop on platform work.",
      },
    ],
  },
]

/** Flat list used by the hero ticker and the tools row. */
export const allTech = stackGroups.flatMap((g) => g.items.map((i) => i.name))

/** Control-row labels. Counts are derived, never written down twice. */
export const stackFilters: { id: StackFilterId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "frontend", label: "Frontend & UI" },
  { id: "geospatial", label: "Geospatial & WebGIS" },
  { id: "visualisation", label: "Data Visualisation" },
  { id: "backend", label: "Backend & Cloud" },
]

/**
 * Section copy. Kept here so the eyebrow, index and callout read from the
 * same source as the rest of the site rather than living in JSX.
 */
export const stackSection = {
  eyebrow: "Stack & Production Tooling",
  index: "04",
  total: "06",
  title: "The tools, and what I'd actually say about each one.",
  lede:
    "Grouped by where it sits in the stack. Flip a card for the honest version — including where my depth stops, production war stories, and real architectural trade-offs.",
  calloutBadge: "Honesty > Buzzword stuffing",
  callout:
    "If I haven't debugged it under production fire at 2 AM, it doesn't get listed on this grid. Every technology chosen is grounded in measurable stability and speed.",
  scrollHint: "SCROLL TO EXPERTISE & PROJECTS",
  flipLabel: "Flip",
  flipHint: "Click to flip",
}
