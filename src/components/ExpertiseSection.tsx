
import { SpotlightCard } from "./SpotlightCard"
import { TechMarquee } from "./TechMarquee"
import {
  Code,
  Brain,
  Globe,
  Database,
  Archive,
} from "@phosphor-icons/react"

export function ExpertiseSection() {
  return (
    <section id="expertise" className="py-24 max-w-[1200px] mx-auto px-6 md:px-16 w-full select-none">
      {/* Section Header */}
      <header className="mb-20">
        <h2 className="font-sans text-5xl md:text-6xl font-bold text-foreground mb-6">
          Expertise <span className="text-primary-container font-light">&amp;</span> Skills
        </h2>
        <p className="font-sans text-base text-muted-foreground max-w-2xl leading-relaxed">
          Architecting complete cloud architectures, AI pipelines, and spatial mapping layers with type safety and pixel precision.
        </p>
      </header>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 auto-rows-[320px]">
        
        {/* Card 1: Full Stack Systems */}
        <SpotlightCard
          glowColor="rgba(0, 228, 121, 0.12)"
          className="lg:col-span-8 flex flex-col justify-between group"
        >
          <div className="flex justify-between items-start">
            <div>
              <div className="font-mono text-[10px] text-primary-container mb-3 uppercase tracking-widest flex items-center gap-2">
                <Code className="h-4.5 w-4.5" />
                Capability 01
              </div>
              <h3 className="font-sans text-2xl font-bold text-foreground">Full Stack Systems</h3>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1 rounded-full border border-outline-variant/30 bg-muted/20 text-[9px] font-mono tracking-wider">
                NEXT.JS
              </span>
              <span className="px-3 py-1 rounded-full border border-outline-variant/30 bg-muted/20 text-[9px] font-mono tracking-wider">
                REACT
              </span>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: "99%", desc: "Performance" },
              { title: "SSR", desc: "Optimization" },
              { title: "TS", desc: "Type Safety" },
              { title: "WCAG", desc: "A11y" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="p-4 border border-outline-variant/20 bg-background/30 rounded-xl hover:border-primary-container/30 transition-all duration-300"
              >
                <div className="text-2xl font-bold text-foreground">{stat.title}</div>
                <div className="text-[9px] text-muted-foreground font-mono uppercase tracking-wider mt-0.5">
                  {stat.desc}
                </div>
              </div>
            ))}
          </div>
        </SpotlightCard>

        {/* Card 2: AI & Automation */}
        <SpotlightCard
          glowColor="rgba(207, 92, 255, 0.12)"
          className="lg:col-span-4 flex flex-col justify-between group"
        >
          <div>
            <div className="font-mono text-[10px] text-secondary mb-3 uppercase tracking-widest flex items-center gap-2">
              <Brain className="h-4.5 w-4.5" />
              Capability 02
            </div>
            <h3 className="font-sans text-2xl font-bold text-foreground mb-4">AI &amp; Automation</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Embedding generative LLM nodes, vector indexing architectures, and agentic task runners in cloud apps.
            </p>
          </div>

          <div className="space-y-4 mt-6">
            <div>
              <div className="flex justify-between text-[9px] font-mono mb-1.5 uppercase tracking-wider text-muted-foreground">
                <span>Agent Pipelines</span>
                <span className="text-secondary font-bold">95%</span>
              </div>
              <div className="h-1.5 bg-muted/20 w-full rounded-full overflow-hidden">
                <div className="h-full bg-secondary w-[95%] shadow-[0_0_8px_rgba(207,92,255,0.4)]" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[9px] font-mono mb-1.5 uppercase tracking-wider text-muted-foreground">
                <span>Vector Embeddings</span>
                <span className="text-secondary font-bold">88%</span>
              </div>
              <div className="h-1.5 bg-muted/20 w-full rounded-full overflow-hidden">
                <div className="h-full bg-secondary w-[88%] shadow-[0_0_8px_rgba(207,92,255,0.4)]" />
              </div>
            </div>
          </div>
        </SpotlightCard>

        {/* Card 3: Geospatial Systems */}
        <div className="relative lg:col-span-7 lg:row-span-2 rounded-2xl border border-outline-variant/30 overflow-hidden group select-none">
          {/* Spotlight Glow Overlay */}
          <div className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-1000 scale-[1.03] group-hover:scale-100 opacity-30 pointer-events-none"
            style={{
              backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCzzhQYc5VRjpTIvKUB1SajZi7vovSWaI0Dn8A3UJ7V6gX43n9xuqvOsWcINKQobJnn_ZTb6jkxDJC6C5B4vchZjc2CD2r8MU_0QslyaCt3kgWlY56q_UcJPiyKktXzF9UBD9UBNZWCmX7a6K59Dro-6HrMuAb0biseX-sq6v7AF0Maum8vRab5Ey3WgSy9M8oSHqbRlD-hXCZtPQeu_D1v2Ovi8v8U4BNHweGl__3YdjJTq9ANNo6W')"
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent pointer-events-none" />

          <div className="relative z-10 p-10 h-full flex flex-col justify-between">
            <div>
              <div className="font-mono text-[10px] text-primary-container mb-3 uppercase tracking-widest flex items-center gap-2">
                <Globe className="h-4.5 w-4.5" />
                Capability 03
              </div>
              <h3 className="font-sans text-2xl font-bold text-foreground mb-3">Geospatial Systems</h3>
              <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
                Analyzing raster satellite grids, rendering dynamic maps, and storing geospatial structures using PostGIS.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="bg-card/75 backdrop-blur-xl p-5 rounded-xl border border-outline-variant/20 group-hover:border-primary-container/30 transition-colors">
                <div className="font-mono text-[9px] text-primary-container mb-3 uppercase tracking-wider font-bold">
                  GIS Stack
                </div>
                <ul className="text-xs font-mono space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-primary-container" /> PostGIS
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-primary-container" /> GeoPandas
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-primary-container" /> RasterIO
                  </li>
                </ul>
              </div>
              <div className="bg-card/75 backdrop-blur-xl p-5 rounded-xl border border-outline-variant/20 group-hover:border-primary-container/30 transition-colors">
                <div className="font-mono text-[9px] text-primary-container mb-3 uppercase tracking-wider font-bold">
                  Analysis
                </div>
                <ul className="text-xs font-mono space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-primary-container" /> NDVI Scaling
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-primary-container" /> Spatial Joins
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-primary-container" /> Clustering
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Card 4: Backend & Infrastructure */}
        <SpotlightCard
          glowColor="rgba(132, 149, 133, 0.12)"
          className="lg:col-span-5 flex flex-col justify-between group"
        >
          <div>
            <div className="font-mono text-[10px] text-muted-foreground mb-3 uppercase tracking-widest flex items-center gap-2">
              <Database className="h-4.5 w-4.5" />
              Capability 04
            </div>
            <h3 className="font-sans text-2xl font-bold text-foreground">Backend &amp; Infrastructure</h3>
          </div>

          {/* Spikes / Stats SVG Chart */}
          <div className="flex-grow flex items-end justify-between gap-1.5 h-16 my-4 px-2" aria-hidden="true">
            {[60, 95, 45, 80, 55].map((val, idx) => (
              <div
                key={idx}
                className="w-full bg-outline-variant/20 rounded-t-sm transition-all duration-700 ease-out"
                style={{ height: `${val}%` }}
              />
            ))}
          </div>

          <div className="grid grid-cols-3 gap-2.5 text-center font-mono text-[10px] text-muted-foreground mt-4">
            <div className="py-2 border border-outline-variant/20 rounded-lg bg-background/25 hover:bg-muted/10 transition-colors">
              PYTHON
            </div>
            <div className="py-2 border border-outline-variant/20 rounded-lg bg-background/25 hover:bg-muted/10 transition-colors">
              DOCKER
            </div>
            <div className="py-2 border border-outline-variant/20 rounded-lg bg-background/25 hover:bg-muted/10 transition-colors">
              POSTGRES
            </div>
          </div>
        </SpotlightCard>

        {/* Card 5: Project statistics count */}
        <SpotlightCard
          glowColor="rgba(0, 228, 121, 0.08)"
          className="lg:col-span-5 flex flex-col justify-center items-center group overflow-hidden"
        >
          <div className="text-center z-10">
            <div className="text-6xl md:text-7xl font-sans font-bold text-foreground tracking-tighter leading-none mb-2">
              50+
            </div>
            <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.25em]">
              Projects Shipped
            </div>
          </div>
          <Archive
            className="absolute -right-6 -bottom-6 h-40 w-40 text-muted-foreground/5 group-hover:text-muted-foreground/10 group-hover:scale-105 transition-all duration-700 pointer-events-none"
            weight="fill"
          />
        </SpotlightCard>
        
      </div>

      {/* Ticker marquee */}
      <TechMarquee />
    </section>
  )
}
