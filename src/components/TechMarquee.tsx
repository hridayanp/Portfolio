import { type ReactNode } from "react"
import {
  Code,
  Globe,
  Database,
  Cpu,
  Cloud,
  Stack,
  MapPin,
  Flame,
} from "@phosphor-icons/react"

interface MarqueeItem {
  icon: ReactNode
  label: string
}

export function TechMarquee() {
  const items: MarqueeItem[] = [
    { icon: <Code className="h-5 w-5" />, label: "TypeScript" },
    { icon: <Globe className="h-5 w-5" />, label: "Docker" },
    { icon: <Stack className="h-5 w-5" />, label: "Tailwind CSS" },
    { icon: <Database className="h-5 w-5" />, label: "PostgreSQL" },
    { icon: <Cpu className="h-5 w-5" />, label: "GraphQL" },
    { icon: <Cloud className="h-5 w-5" />, label: "AWS Cloud" },
    { icon: <Flame className="h-5 w-5" />, label: "PyTorch" },
    { icon: <MapPin className="h-5 w-5" />, label: "MapLibre" },
  ]

  // Duplicate items to ensure seamless visual loop
  const marqueeItems = [...items, ...items, ...items]

  return (
    <section className="mt-32 w-full select-none overflow-hidden" aria-label="Technical Ecosystem">
      <style>{`
        @keyframes marquee-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        .animate-marquee {
          animation: marquee-scroll 25s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
      
      <h3 className="text-center font-mono text-[10px] uppercase tracking-[0.4em] text-on-surface-variant/50 mb-12">
        The Tech Ecosystem
      </h3>
      
      <div className="relative py-8 border-y border-outline-variant/10 bg-background/20 backdrop-blur-sm overflow-hidden flex">
        <div className="flex gap-16 animate-marquee whitespace-nowrap">
          {marqueeItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 text-sm font-mono text-on-surface hover:text-primary-container transition-colors duration-300"
            >
              <span className="text-primary-container">{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
