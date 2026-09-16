import type { ShapeHue, ShapeKind } from "@/components/decor/Shape3D"

export type Project = {
  id: string
  title: string
  client?: string
  category: string
  year?: string
  /** One-line card description. */
  description: string
  /** Longer narrative used in the expanded view. */
  detail: string
  technologies: string[]
  /** Optional real screenshot — drop a file in /public and set the path. */
  image?: string
  /**
   * Deterministic colour field used when no `image` exists.
   */
  fill: string
  /** Decorative solid that sits in the field — one per project, stable. */
  shape: ShapeKind
  /** Distinct palette accent color for the badge / label. */
  color: string
  /** Gradient ramp used by the decorative solid. */
  hue: ShapeHue
  liveUrl?: string
  githubUrl?: string
  featured?: boolean
}

/**
 * Projects are declared once, here. Add / remove / reorder in this array and
 * every surface in the site follows. Links are omitted entirely unless a real
 * URL exists.
 */
export const projects: Project[] = [
  {
    id: "geodash",
    title: "Geospatial Dashboard Portal",
    client: "UNDP",
    category: "Geospatial Platform",
    year: "2024",
    description:
      "A map dashboard that helps policy teams explore satellite climate data without desktop GIS software.",
    detail:
      "UNDP needed a way for policy teams to explore satellite-derived climate data without specialized GIS software. I built a web map dashboard to toggle raster and vector layers, apply spatial filters, and inspect time-series charts. Because large geospatial datasets can easily degrade UI performance, I focused on careful state management and modular React architecture to keep map interactions fast.",
    technologies: [
      "ReactJS",
      "Leaflet",
      "MapLibreGL",
      "TypeScript",
      "Tailwind CSS",
    ],
    fill: "#eff6ff",
    color: "#2563eb",
    hue: "blue",
    shape: "sphere",
    featured: true,
  },
  {
    id: "airquality",
    title: "Air Quality Portal",
    client: "UNDP",
    category: "Real-time Monitoring",
    year: "2024",
    description:
      "A monitoring dashboard for regional air quality, designed for fast data retrieval and clear readability.",
    detail:
      "Air quality data is only useful when it is current. I built the React interface and the automated data pipelines feeding it, using Leaflet and MapLibreGL for map rendering, keeping the layout focused on fast data retrieval and clear visual cues.",
    technologies: [
      "ReactJS",
      "Leaflet",
      "MapLibreGL",
      "Data Pipelines",
      "REST APIs",
    ],
    fill: "#ecfeff",
    color: "#0891b2",
    hue: "cyan",
    shape: "torus",
    featured: true,
  },
  {
    id: "connected-car",
    title: "Connected Car & Weather Early Warning",
    client: "Maruti Suzuki",
    category: "Enterprise Platform",
    year: "2023",
    description:
      "Live geospatial tracking and weather hazard alerts for driver and fleet safety.",
    detail:
      "An enterprise fleet dashboard combining live vehicle tracking with severe weather early warnings. I worked on the data ingestion and API layer to deliver alerts with low latency, as well as the frontend map interface.",
    technologies: ["ReactJS", "Geospatial APIs", "Node.js", "REST APIs"],
    fill: "#fff7ed",
    color: "#ea580c",
    hue: "orange",
    shape: "cone",
    featured: true,
  },
  {
    id: "dataflow",
    title: "DataFlow",
    client: "Internal",
    category: "Developer Tooling",
    year: "2024",
    description:
      "A visual interface for scheduling, running, and monitoring Python scripts across environments.",
    detail:
      "Developers needed an easier way to schedule, run, and track Python workflows across environments. I built the React frontend using React Flow for node-based pipeline building, adding live WebSocket logging so teams could follow job progress in real time.",
    technologies: ["ReactJS", "React Flow", "TypeScript", "WebSockets"],
    fill: "#ecfdf5",
    color: "#059669",
    hue: "green",
    shape: "cube",
  },
  {
    id: "feedlot",
    title: "Climate Decision Intelligence Feedlot Dashboard",
    client: "Australian agricultural client",
    category: "Data Visualisation",
    year: "2023",
    description:
      "Interactive charts and environmental parameter tracking for livestock operations, including Stripe billing integration.",
    detail:
      "Built for Australian agricultural operators to track environmental and animal well-being parameters using interactive Chart.js graphs and React tables. I overhauled the API integrations to reduce latency and downtime, and integrated Stripe for subscription payments.",
    technologies: ["ReactJS", "ChartJS", "React-Table", "Stripe", "REST APIs"],
    fill: "#f5f3ff",
    color: "#7c3aed",
    hue: "violet",
    shape: "cylinder",
  },
  {
    id: "climateag",
    title: "Climate Resilience Agriculture Portal",
    client: "UNDP",
    category: "Geospatial Platform",
    year: "2023",
    description:
      "A web portal translating complex climate resilience data into clear, accessible maps for non-specialists.",
    detail:
      "Built to help agricultural and policy stakeholders review climate resilience datasets. I developed the web GIS portal using Leaflet and Georaster, focusing on straightforward controls so users could explore raster data layers without needing a GIS background.",
    technologies: ["ReactJS", "Leaflet", "Georaster", "Web GIS"],
    fill: "#fef2f2",
    color: "#dc2626",
    hue: "red",
    shape: "star",
  },
]

export const featuredProjects = projects.filter((p) => p.featured)
