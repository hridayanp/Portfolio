export type Tech = {
  name: string
  /** Shown on the reverse of the flip card. */
  note: string
}

export type StackGroup = {
  id: string
  label: string
  blurb: string
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
