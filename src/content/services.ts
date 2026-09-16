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
      "Production React applications built to survive their second year — component architecture, state boundaries and a codebase the next engineer can read.",
    detail:
      "Focused on modular UI architectures, strict TypeScript typing, and scalable code conventions that prevent tech debt as projects grow.",
    tags: ["ReactJS", "TypeScript", "Tailwind CSS", "Next.js", "Redux Toolkit"],
  },
  {
    id: "geospatial",
    index: "02",
    title: "Geospatial Web Applications",
    description:
      "Map-centric interfaces over raster and vector data: layer toggling, spatial filtering and time-series drill-downs that stay responsive under large payloads.",
    detail:
      "Built and shipped GIS portals for UNDP with raster analytics, geoJSON rendering, and interactive spatial queries.",
    tags: ["Leaflet", "MapLibreGL", "Georaster", "Web GIS", "Spatial Filtering"],
  },
  {
    id: "dataviz",
    index: "03",
    title: "Data Visualisation & Dashboards",
    description:
      "Charts, tables and real-time parameter tracking designed so a non-technical stakeholder can look at the screen and make a decision from it.",
    detail:
      "Interactive time-series telemetry, climate risk metrics, and commercial dashboards with multi-parameter filtering and fast data rendering.",
    tags: ["ChartJS", "React-Table", "React Flow", "Time-series", "Real-time Metrics"],
  },
  {
    id: "performance",
    index: "04",
    title: "Performance Engineering",
    description:
      "Diagnosing and fixing what makes a data-heavy React app feel slow — re-render cost, payload size, clustering and virtualisation at map scale.",
    detail:
      "Eliminating unnecessary re-renders, virtualization for 10,000+ data points, and efficient local state isolation under streaming data.",
    tags: ["Profiling", "State Optimization", "Clustering", "Virtualisation", "Payload Reduction"],
  },
  {
    id: "integration",
    index: "05",
    title: "API & Data Pipeline Integration",
    description:
      "Wiring frontends to the services behind them, including automated pipelines and low-latency alerting where the data's value decays quickly.",
    detail:
      "Seamless RESTful endpoints, weather early-warning data pipelines, and internal orchestration tools for continuous real-time sync.",
    tags: ["REST APIs", "Node.js", "Express.js", "Pipeline Chaining", "Low Latency"],
  },
  {
    id: "delivery",
    index: "06",
    title: "Containerised Delivery",
    description:
      "Building and shipping containerised frontend applications, and working comfortably inside an orchestrated environment alongside platform teams.",
    detail:
      "Formal grounding through M.Tech in Cloud Computing at IIT Patna — reasoning across the full stack from Docker containers to deployment pipelines.",
    tags: ["Docker", "Kubernetes", "Skaffold", "Cloud Architecture", "CI/CD Workflows"],
  },
]
