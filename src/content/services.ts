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
 * What I take on as a freelancer.
 *
 * Every line is derived strictly from work already shipped — nothing here is
 * aspirational, and nothing is offered that I have not already built for a
 * real client.
 */
export const services: Service[] = [
  {
    id: "frontend-engineering",
    index: "01",
    title: "Frontend Engineering",
    description:
      "Maintainable React applications with clean component boundaries and clear state patterns \u2014 handed over as code your own team can pick up without me.",
    detail:
      "Focused on modular UI architectures, strict TypeScript typing, and clean code conventions that prevent technical debt as applications scale.",
    tags: ["ReactJS", "TypeScript", "Tailwind CSS", "Next.js", "Redux Toolkit"],
  },
  {
    id: "geospatial",
    index: "02",
    title: "Geospatial Web Applications",
    description:
      "Map-centric interfaces for raster and vector data \u2014 layer toggles, spatial filters and time-series drilldowns that stay fast under heavy loads.",
    detail:
      "Shipped web GIS platforms for UNDP programmes, featuring raster analytics, GeoJSON rendering, and interactive spatial queries.",
    tags: ["Leaflet", "MapLibreGL", "Georaster", "Web GIS", "Spatial Filtering"],
  },
  {
    id: "dataviz",
    index: "03",
    title: "Data Visualisation & Dashboards",
    description:
      "Charts, tables and live parameter tracking built so your non-technical stakeholders can read the data and act on it without a walkthrough.",
    detail:
      "Interactive time-series telemetry, climate risk indicators, and operational dashboards with multi-parameter filtering and fast rendering.",
    tags: ["ChartJS", "React-Table", "React Flow", "Time-series", "Real-time Metrics"],
  },
  {
    id: "performance",
    index: "04",
    title: "Performance Engineering",
    description:
      "Diagnosing and fixing bottlenecks in an existing data-heavy React app \u2014 re-render cost, payload size, map clustering and list virtualisation. Often a short, self-contained engagement.",
    detail:
      "Eliminating redundant renders, virtualizing thousands of data points, and isolating local state under real-time data streams.",
    tags: ["Profiling", "State Optimization", "Clustering", "Virtualisation", "Payload Reduction"],
  },
  {
    id: "integration",
    index: "05",
    title: "API & Data Pipeline Integration",
    description:
      "Connecting your frontend to backend services, automated data pipelines and low-latency alert feeds where timely delivery is critical.",
    detail:
      "Working with RESTful endpoints, weather early-warning data streams, and internal orchestration tools for dependable data synchronization.",
    tags: ["REST APIs", "Node.js", "Express.js", "Pipeline Chaining", "Low Latency"],
  },
  {
    id: "delivery",
    index: "06",
    title: "Containerised Delivery",
    description:
      "Getting the build shipped, not just running locally \u2014 containerised web applications in modern cloud environments, alongside your platform or DevOps team.",
    detail:
      "Supported by an M.Tech in Cloud Computing from IIT Patna, bringing practical understanding across Docker containers, orchestration, and CI/CD workflows.",
    tags: ["Docker", "Kubernetes", "Skaffold", "Cloud Architecture", "CI/CD Workflows"],
  },
]
