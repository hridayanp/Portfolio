/**
 * There are no client testimonials to quote, so this section carries
 * professional principles and verifiable highlights instead of invented praise.
 */

export type Principle = {
  id: string
  quote: string
  context: string
}

export const principles: Principle[] = [
  {
    id: "state",
    quote:
      "Keep state as local as possible and lift it only when you have to. On geospatial dashboards, unnecessary re-renders over large datasets get expensive fast.",
    context: "On React & state management",
  },
  {
    id: "tools",
    quote:
      "Leaflet when the need is simpler layered maps; MapLibreGL when I need vector tiles and real performance at scale. The choice is the work, not the logo.",
    context: "On choosing mapping libraries",
  },
  {
    id: "honesty",
    quote:
      "Being precise about where my depth ends lands better than overselling it. My production strength is React; the infrastructure side is real but coursework-deep.",
    context: "On scope and self-assessment",
  },
  {
    id: "translation",
    quote:
      "The common thread in everything I've built is taking messy data — satellite imagery, air quality readings, climate risk — and making it something someone can decide from.",
    context: "On the work itself",
  },
]

export type Highlight = { id: string; value: string; label: string }

export const highlights: Highlight[] = [
  { id: "years", value: "4+", label: "Years building production React" },
  { id: "platforms", value: "6", label: "Shipped data platforms" },
  { id: "clients", value: "UNDP", label: "Primary platform client" },
  { id: "degree", value: "M.Tech", label: "Cloud Computing, IIT Patna" },
]
