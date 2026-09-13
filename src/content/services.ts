export type Service = {
  id: string
  index: string
  title: string
  description: string
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
    tags: ["ReactJS", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "geospatial",
    index: "02",
    title: "Geospatial Web Applications",
    description:
      "Map-centric interfaces over raster and vector data: layer toggling, spatial filtering and time-series drill-downs that stay responsive under large payloads.",
    tags: ["Leaflet", "MapLibreGL", "Georaster"],
  },
  {
    id: "dataviz",
    index: "03",
    title: "Data Visualisation & Dashboards",
    description:
      "Charts, tables and real-time parameter tracking designed so a non-technical stakeholder can look at the screen and make a decision from it.",
    tags: ["ChartJS", "React-Table", "Time-series"],
  },
  {
    id: "performance",
    index: "04",
    title: "Performance Engineering",
    description:
      "Diagnosing and fixing what makes a data-heavy React app feel slow — re-render cost, payload size, clustering and virtualisation at map scale.",
    tags: ["Profiling", "State design", "Virtualisation"],
  },
  {
    id: "integration",
    index: "05",
    title: "API & Data Pipeline Integration",
    description:
      "Wiring frontends to the services behind them, including automated pipelines and low-latency alerting where the data's value decays quickly.",
    tags: ["REST APIs", "Node.js", "Express.js"],
  },
  {
    id: "delivery",
    index: "06",
    title: "Containerised Delivery",
    description:
      "Building and shipping containerised frontend applications, and working comfortably inside an orchestrated environment alongside platform teams.",
    tags: ["Docker", "Kubernetes", "Skaffold"],
  },
]
