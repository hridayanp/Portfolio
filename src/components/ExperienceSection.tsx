
import { SpotlightCard } from "./SpotlightCard"

interface Milestone {
  year: string
  title: string
  desc: string
  side: "left" | "right"
  color: "primary" | "secondary"
}

export function ExperienceSection() {
  const milestones: Milestone[] = [
    {
      year: "2019 — 2020",
      title: "The Foundation",
      desc: "Deep dive into Computer Science fundamentals and competitive programming. Mastered C++, Python, and core data structures through rigorous algorithmic challenges.",
      side: "left",
      color: "primary",
    },
    {
      year: "2020 — 2022",
      title: "Market Expansion",
      desc: "Built and deployed complex full-stack web applications for global clients. Specialized in React architecture and high-performance serverless cloud infrastructure.",
      side: "right",
      color: "secondary",
    },
    {
      year: "2022 — 2023",
      title: "AI & Prediction",
      desc: "Strategic pivot to Machine Learning. Developed custom LLM orchestration and computer vision models for specialized industrial datasets and predictive logic.",
      side: "left",
      color: "primary",
    },
    {
      year: "2023 — Present",
      title: "Spatial Engineering",
      desc: "Engineering advanced geospatial data lakes and real-time mapping platforms. Seamlessly integrating satellite intelligence with core enterprise business logic.",
      side: "right",
      color: "secondary",
    },
  ]

  return (
    <section id="experience" className="py-24 max-w-[1000px] mx-auto px-6 md:px-16 w-full select-none">
      <h2 className="text-4xl md:text-5xl font-bold mb-24 text-center">Professional Journey</h2>

      <div className="relative w-full">
        {/* Central Vertical Timeline Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary-container via-secondary to-transparent opacity-20 -translate-x-1/2" />

        <div className="space-y-16">
          {milestones.map((milestone, idx) => (
            <div
              key={idx}
              className={`relative flex flex-col md:flex-row items-stretch w-full ${
                milestone.side === "right" ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Content Card Side */}
              <div className="w-full md:w-[45%] pl-10 md:pl-0">
                <SpotlightCard
                  glowColor={
                    milestone.color === "primary"
                      ? "rgba(0, 228, 121, 0.08)"
                      : "rgba(207, 92, 255, 0.08)"
                  }
                  className={`p-6 border border-outline-variant/20 bg-card/45 backdrop-blur-xl ${
                    milestone.side === "left" ? "md:text-right" : "md:text-left"
                  }`}
                >
                  <span
                    className={`font-mono text-xs font-bold mb-2 block uppercase tracking-widest ${
                      milestone.color === "primary" ? "text-primary-container" : "text-secondary"
                    }`}
                  >
                    {milestone.year}
                  </span>
                  <h4 className="text-xl font-sans font-bold text-foreground mb-3">
                    {milestone.title}
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {milestone.desc}
                  </p>
                </SpotlightCard>
              </div>

              {/* Central Dot Marker */}
              <div className="absolute left-4 md:left-1/2 top-10 md:top-1/2 -translate-y-1/2 -translate-x-1/2 z-10">
                <div
                  className={`w-3.5 h-3.5 rounded-full border-4 border-background transition-all duration-500 ${
                    milestone.color === "primary"
                      ? "bg-primary-container shadow-[0_0_15px_rgba(0,255,136,0.6)]"
                      : "bg-secondary shadow-[0_0_15px_rgba(207,92,255,0.6)]"
                  }`}
                />
              </div>

              {/* Empty Spacer Side for desktop grid layouts */}
              <div className="hidden md:block w-[45%]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
