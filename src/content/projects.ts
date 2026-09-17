import type { ShapeHue, ShapeKind } from "@/components/decor/Shape3D"

/* ---------------------------------------------------------------------------
   Case-study prose.

   Imported as RAW markdown straight from `docs/`. The documents are authored,
   verified and vetted by hand, so they are never transcribed, summarised or
   re-typed into this file — importing the source guarantees what renders is
   byte-identical to what is on disk. Editing a document in `docs/` is the
   only way to change what the dialog shows.
   ------------------------------------------------------------------------ */
import dicraMd from "../../docs/case_study_geospatial.md?raw"
import airQualityMd from "../../docs/case_study_air_quality.md?raw"
import dataflowMd from "../../docs/case_study_dataflow.md?raw"
import hyperlocalMd from "../../docs/case_study_Hyperlocal forecast for thunderstorm and surface wind.md?raw"
import unfpaMd from "../../docs/case_study_unfpa_population.md?raw"

/* Artwork. `_banner` is the landing card; `_full` is the dialog masthead. */
import dicraBanner from "@/assets/images/projects/geospatial_banner.png"
import dicraFull from "@/assets/images/projects/geospatial_full.png"
import airQualityBanner from "@/assets/images/projects/air-quality-banner.png"
import airQualityFull from "@/assets/images/projects/air_quality-full.png"
import dataflowBanner from "@/assets/images/projects/dataflow_banner.png"
import dataflowFull from "@/assets/images/projects/dataflow_full.png"
import hyperlocalBanner from "@/assets/images/projects/hyperlocal_banner.png"
import hyperlocalFull from "@/assets/images/projects/hyperlocal_full.png"
import unfpaBanner from "@/assets/images/projects/unfpa_banner.png"
import unfpaFull from "@/assets/images/projects/unfpa_full.png"

export type Project = {
  id: string
  title: string
  client?: string
  category: string
  year?: string
  /** One-line card description. */
  description: string
  technologies: string[]
  /** Full case study, raw markdown, exactly as authored in `docs/`. */
  caseStudy: string
  /** Landing-card artwork, shown when `USE_ASSET_IMAGES` is on. */
  bannerImage: string
  /** Dialog masthead artwork, shown when `USE_ASSET_IMAGES` is on. */
  fullImage: string
  /** Deterministic colour field used by the fallback artboard. */
  fill: string
  /** Decorative solid that sits in the field — one per project, stable. */
  shape: ShapeKind
  /** Single word set as the giant watermark behind the artboard solid. */
  watermark: string
  /** Distinct palette accent color for the badge / label. */
  color: string
  /** Gradient ramp used by the decorative solid. */
  hue: ShapeHue
  liveUrl?: string
  githubUrl?: string
  featured?: boolean
}

/**
 * One entry per case study in `docs/` — the documents ARE the portfolio, so
 * nothing without a document appears here. Add a document, add an entry.
 *
 * Titles are the documents' own H1s. `client` is set only where a document
 * names the commissioning organisation, and `year` is omitted throughout
 * rather than guessed. Links are omitted entirely unless a real URL exists.
 */
export const projects: Project[] = [
  {
    id: "dicra",
    title: "Data in Climate Resilient Agriculture (DiCRA)",
    client: "UNDP",
    category: "Geospatial Intelligence Platform",
    description:
      "A digital public good integrating Earth observation and socioeconomic datasets into interactive geospatial analytics across 36 Indian states and union territories.",
    technologies: [
      "React",
      "TypeScript",
      "MapLibre GL",
      "PMTiles",
      "Cloud Optimized GeoTIFF",
      "Redux Toolkit",
    ],
    caseStudy: dicraMd,
    bannerImage: dicraBanner,
    fullImage: dicraFull,
    fill: "#eff6ff",
    color: "#2563eb",
    hue: "blue",
    shape: "sphere",
    watermark: "DiCRA",
    featured: true,
  },
  {
    id: "air-quality",
    title: "Uzbekistan Air Quality and Health Risk Geospatial System",
    category: "Environmental Analytics",
    description:
      "Transforms ground-level observations and satellite atmospheric measurements into continuous spatial rasters and a composite health-risk index across thirteen administrative regions.",
    technologies: [
      "React",
      "TypeScript",
      "MapLibre GL",
      "Pyodide (WASM)",
      "NumPy",
      "Tailwind CSS",
    ],
    caseStudy: airQualityMd,
    bannerImage: airQualityBanner,
    fullImage: airQualityFull,
    fill: "#ecfeff",
    color: "#0891b2",
    hue: "cyan",
    shape: "torus",
    watermark: "AirQuality",
    featured: true,
  },
  {
    id: "hyperlocal",
    title: "Hyperlocal Meteorological Operations and Decision Intelligence",
    category: "Operational Meteorology",
    description:
      "Convective thunderstorm and strong surface wind forecasting for high-consequence environments — aerodrome management and defence aviation.",
    technologies: [
      "React 19",
      "TypeScript",
      "MapLibre GL",
      "Deck.gl",
      "geotiff.js",
      "Redux Toolkit",
    ],
    caseStudy: hyperlocalMd,
    bannerImage: hyperlocalBanner,
    fullImage: hyperlocalFull,
    fill: "#fff7ed",
    color: "#ea580c",
    hue: "orange",
    shape: "cone",
    watermark: "MetOps",
    featured: true,
  },
  {
    id: "unfpa-population",
    title: "Demographic Intelligence and High-Resolution Landscape Dynamics",
    client: "UNFPA",
    category: "Spatial Demography",
    description:
      "Satellite-based population estimation and land-use change attribution for Odisha, closing the information deficit left by a postponed decennial census.",
    technologies: [
      "React",
      "TypeScript",
      "MapLibre GL",
      "LightGBM",
      "Google Earth Engine",
      "PMTiles",
    ],
    caseStudy: unfpaMd,
    bannerImage: unfpaBanner,
    fullImage: unfpaFull,
    fill: "#f5f3ff",
    color: "#7c3aed",
    hue: "violet",
    shape: "cylinder",
    watermark: "Odisha",
  },
  {
    id: "dataflow",
    title: "Serverless Automation Pipeline Builder",
    category: "Developer Tooling",
    description:
      "Event-driven workflow orchestration without long-running clusters — a visual DAG builder dispatching sandboxed tasks across ephemeral serverless compute.",
    technologies: [
      "React 19",
      "TypeScript",
      "React Flow",
      "Redux Toolkit",
      "AWS Lambda",
      "Node.js",
    ],
    caseStudy: dataflowMd,
    bannerImage: dataflowBanner,
    fullImage: dataflowFull,
    fill: "#ecfdf5",
    color: "#059669",
    hue: "green",
    shape: "cube",
    watermark: "DataFlow",
  },
]

export const featuredProjects = projects.filter((p) => p.featured)
