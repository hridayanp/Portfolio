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
    blurb: "Where I spend most of my development time.",
    tag: "FRONTEND",
    filter: "frontend",
    items: [
      {
        name: "ReactJS",
        note: "Primary library for four years across production data platforms.",
      },
      {
        name: "TypeScript",
        note: "My default for reliable, typed frontend code.",
      },
      {
        name: "JavaScript (ES6+)",
        note: "Core language foundation for modern web engineering.",
      },
      {
        name: "Redux Toolkit",
        note: "Used when state complexity goes beyond local state and Context.",
      },
      {
        name: "Next.js",
        note: "Used for server-rendered or statically optimized React apps.",
      },
      { name: "Tailwind CSS", note: "Utility-first styling for modular interface design." },
    ],
  },
  {
    id: "geospatial",
    label: "Geospatial",
    blurb: "Browser-based web mapping rather than desktop GIS.",
    tag: "GEOSPATIAL",
    filter: "geospatial",
    items: [
      {
        name: "Leaflet",
        note: "For simple, lightweight layered maps.",
      },
      {
        name: "MapLibreGL",
        note: "For vector tiles and high-performance WebGL rendering at scale.",
      },
      {
        name: "Georaster",
        note: "Client-side raster analytics on satellite data portals.",
      },
      {
        name: "Geospatial APIs",
        note: "Tile services, spatial queries, and bounding-box filtering.",
      },
      { name: "Web GIS", note: "Focused on browser JavaScript, not desktop GIS." },
    ],
  },
  {
    id: "visualisation",
    label: "Visualisation",
    blurb: "Turning complex data into clear, interactive visuals.",
    tag: "VISUALISATION",
    filter: "visualisation",
    items: [
      {
        name: "ChartJS",
        note: "Interactive charting for live time-series parameters.",
      },
      {
        name: "React-Table",
        note: "Dense tabular data views with sorting and filtering.",
      },
      { name: "React Flow", note: "Node-based visual workflow chaining in DataFlow." },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    blurb: "Practical experience connecting services to frontend apps.",
    tag: "BACKEND",
    filter: "backend",
    items: [
      {
        name: "Node.js",
        note: "API and data pipeline work supporting frontend applications.",
      },
      {
        name: "Express.js",
        note: "Lightweight service layer for internal and client tools.",
      },
      {
        name: "REST APIs",
        note: "Designing and integrating endpoints across all projects.",
      },
    ],
  },
  {
    id: "data",
    label: "Databases",
    blurb: "Working with relational and document data stores.",
    tag: "DATABASES",
    filter: "backend",
    items: [
      { name: "PostgreSQL", note: "Relational data modeling for platform features." },
      { name: "MySQL", note: "Database work across earlier web projects." },
      { name: "MongoDB", note: "Document storage for flexible and evolving schemas." },
    ],
  },
  {
    id: "platform",
    label: "Cloud & Delivery",
    blurb: "Containerized environments and deployment workflows.",
    tag: "CLOUD & DELIVERY",
    filter: "backend",
    items: [
      {
        name: "Docker",
        note: "Containerizing frontend apps and local development services.",
      },
      {
        name: "Kubernetes",
        note: "Strong conceptual understanding and coursework experience from IIT Patna.",
      },
      {
        name: "Skaffold",
        note: "Iterative container development workflow on platform projects.",
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
  title: "The tools I use and how I work with them.",
  lede:
    "Grouped by layer in the stack. Hover over any card for a straightforward note on how I use it and where my experience lies.",
  calloutBadge: "Practical Experience",
  callout:
    "I list technologies I have used on real projects with real users. Each tool is chosen for reliability, team maintainability, and performance.",
  scrollHint: "SCROLL TO EXPERTISE",
  flipLabel: "Flip",
  flipHint: "Click to flip",
}
