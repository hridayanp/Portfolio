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
      "A map-centric dashboard letting policy stakeholders explore satellite-derived climate data without GIS software.",
    detail:
      "UNDP needed non-technical policy stakeholders to explore satellite-derived climate data without GIS software. I built a map-centric dashboard that toggles raster and vector layers, applies spatial filters and drills into time-series data. The hard part was performance — large geospatial payloads make re-renders expensive — so the work centred on efficient state management and modular components that keep the UI responsive.",
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
      "Near-real-time regional air quality visibility, built for retrieval speed above all else.",
    detail:
      "Air quality data loses its value fast if it isn't near-real-time. I built the React frontend and the automated pipelines feeding it, using Leaflet and MapLibreGL for the geospatial layer, with the interface pared back so retrieval speed and clarity came first.",
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
      "Real-time geospatial monitoring paired with weather early-warning alerts for driver and fleet safety.",
    detail:
      "An enterprise connected-car dashboard combining real-time geospatial monitoring with weather early-warning alerts. I worked on the data pipeline and API layer so alerts arrived with minimal latency, alongside the visualisation itself.",
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
      "Visual orchestration for scheduling, running and tracking Python scripts across environments.",
    detail:
      "Developers needed a way to schedule, run and track Python scripts across environments without doing it by hand. I built the frontend in React with React Flow for visual workflow chaining, plus real-time logging so execution status was visible live instead of after the fact.",
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
      "Interactive charts and real-time parameter tracking for feedlot decisions, with Stripe on the commercial side.",
    detail:
      "Built for Australian agricultural users making feedlot decisions — interactive charts and real-time parameter tracking with ChartJS and React-Table. I revamped the API integrations, cutting downtime and analysis time, and the product carried a Stripe-integrated commercial layer.",
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
      "Climate resilience datasets made legible to people who aren't GIS specialists.",
    detail:
      "The goal was making climate resilience datasets accessible to non-specialists. I built the geospatial portal with Leaflet and Georaster, focusing on UI components intuitive enough that the complexity of the underlying raster data stayed invisible to the end user.",
    technologies: ["ReactJS", "Leaflet", "Georaster", "Web GIS"],
    fill: "#fef2f2",
    color: "#dc2626",
    hue: "red",
    shape: "star",
  },
]

export const featuredProjects = projects.filter((p) => p.featured)
