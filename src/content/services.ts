export type Service = {
  id: string
  index: string
  title: string
  description: string
  detail?: string
  /** Signals which capabilities back the claim. */
  tags: string[]
}

/**
 * Derived strictly from real experience — nothing here is aspirational.
 */
export const services: Service[] = [
  {
    id: "frontend-engineering",
    index: "01",
    title: "Frontend Engineering",
    description:
      "Building maintainable React applications with clean component boundaries, clear state patterns, and code that is easy for the next engineer to understand.",
    detail:
      "Focused on modular UI architectures, strict TypeScript typing, and clean code conventions that prevent technical debt as applications scale.",
    tags: ["ReactJS", "TypeScript", "Tailwind CSS", "Next.js", "Redux Toolkit"],
  },
  {
    id: "geospatial",
    index: "02",
    title: "Geospatial Web Applications",
    description:
      "Map-centric interfaces for raster and vector data, supporting layer toggles, spatial filters, and time-series drilldowns that stay fast under heavy loads.",
    detail:
      "Built and shipped web GIS platforms for UNDP, featuring raster analytics, GeoJSON rendering, and interactive spatial queries.",
    tags: ["Leaflet", "MapLibreGL", "Georaster", "Web GIS", "Spatial Filtering"],
  },
  {
    id: "dataviz",
    index: "03",
    title: "Data Visualisation & Dashboards",
    description:
      "Charts, tables, and live parameter tracking designed so non-technical stakeholders can easily review data and take informed action.",
    detail:
      "Interactive time-series telemetry, climate risk indicators, and operational dashboards with multi-parameter filtering and fast rendering.",
    tags: ["ChartJS", "React-Table", "React Flow", "Time-series", "Real-time Metrics"],
  },
  {
    id: "performance",
    index: "04",
    title: "Performance Engineering",
    description:
      "Diagnosing and fixing bottlenecks in data-heavy React apps, including re-render costs, payload size, map clustering, and list virtualization.",
    detail:
      "Eliminating redundant renders, virtualizing thousands of data points, and isolating local state under real-time data streams.",
    tags: ["Profiling", "State Optimization", "Clustering", "Virtualisation", "Payload Reduction"],
  },
  {
    id: "integration",
    index: "05",
    title: "API & Data Pipeline Integration",
    description:
      "Connecting frontends to backend services, automated data pipelines, and low-latency alert feeds where timely data delivery is critical.",
    detail:
      "Working with RESTful endpoints, weather early-warning data streams, and internal orchestration tools for dependable data synchronization.",
    tags: ["REST APIs", "Node.js", "Express.js", "Pipeline Chaining", "Low Latency"],
  },
  {
    id: "delivery",
    index: "06",
    title: "Containerised Delivery",
    description:
      "Building and running containerized web applications within modern cloud environments alongside platform and DevOps teams.",
    detail:
      "Supported by an M.Tech in Cloud Computing from IIT Patna, bringing practical understanding across Docker containers, orchestration, and CI/CD workflows.",
    tags: ["Docker", "Kubernetes", "Skaffold", "Cloud Architecture", "CI/CD Workflows"],
  },
]
