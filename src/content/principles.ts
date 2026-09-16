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
      "Keep state as local as possible and lift it only when necessary. On geospatial dashboards, unnecessary re-renders over large datasets get expensive fast.",
    context: "On React and state management",
  },
  {
    id: "tools",
    quote:
      "I use Leaflet for simple layered maps, and MapLibreGL when I need vector tiles and high performance at scale. Picking the right tool for the job matters more than brand names.",
    context: "On choosing mapping libraries",
  },
  {
    id: "honesty",
    quote:
      "Being clear about what I know and where my limits lie is always better than overpromising. My core day-to-day strength is React frontend engineering, supported by formal training in cloud infrastructure.",
    context: "On scope and self-assessment",
  },
  {
    id: "translation",
    quote:
      "The common thread in everything I've built is taking messy data like satellite imagery, air quality readings, and climate risk, and turning it into something people can easily act on.",
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
