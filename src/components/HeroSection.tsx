import { useEffect, useState } from "react"
import { TerminalWidget } from "./TerminalWidget"
import { MapWidget } from "./MapWidget"
import { Cpu, Stack } from "@phosphor-icons/react"

export function HeroSection() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleScrollToProjects = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const target = document.getElementById("work")
    if (target) {
      target.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative min-h-screen flex items-center pt-32 lg:pt-0 overflow-hidden select-none">
      <div className="max-w-[1200px] mx-auto px-6 md:px-16 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Column: Heading Content */}
        <div className="flex flex-col gap-8 text-left z-10">
          <div className="space-y-4">
            <h1 className="font-sans text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground leading-[1.05] animate-fade-in-up">
              Hridayan <br />
              <span className="text-primary-container">Phukan</span>
            </h1>
            <p className="font-mono text-xs md:text-sm text-primary-container font-semibold tracking-[0.2em] uppercase opacity-90 animate-fade-in-up" style={{ animationDelay: "150ms" }}>
              Full Stack • AI Systems • Geospatial Data
            </p>
          </div>
          
          <p className="font-sans text-base text-muted-foreground max-w-lg leading-relaxed animate-fade-in-up" style={{ animationDelay: "300ms" }}>
            Engineering high-performance software solutions, deep learning models, and real-time geographic data pipelines. Focused on scaling spatial infrastructure and intelligence.
          </p>

          <div className="flex flex-wrap gap-4 mt-2 animate-fade-in-up" style={{ animationDelay: "450ms" }}>
            <button
              onClick={handleScrollToProjects}
              className="px-8 py-4 bg-foreground text-background font-mono text-xs uppercase tracking-widest font-bold rounded-xl hover:scale-105 active:scale-95 transition-all shadow-xl hover:shadow-2xl cursor-pointer"
            >
              View Projects
            </button>
            <a
              href="#"
              className="px-8 py-4 bg-transparent border-2 border-outline-variant/40 hover:border-foreground/40 text-foreground font-mono text-xs uppercase tracking-widest font-bold rounded-xl transition-colors text-center cursor-pointer"
            >
              Download CV
            </a>
          </div>
        </div>

        {/* Right Column: Interactive Widgets */}
        <div
          className="relative h-[500px] md:h-[600px] flex items-center justify-center lg:justify-end z-10"
          style={{ transform: `translate3d(0, ${scrollY * -0.05}px, 0)` }}
        >
          <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
            
            {/* Widget 1: Layered Glass spinner card */}
            <div className="glass-stack-card absolute w-60 h-72 rounded-2xl z-20 flex flex-col p-6 shadow-2xl overflow-hidden select-none pointer-events-none">
              <div className="flex gap-2 mb-6">
                <div className="w-3.5 h-3.5 rounded-full bg-red-500/20" />
                <div className="w-3.5 h-3.5 rounded-full bg-yellow-500/20" />
                <div className="w-3.5 h-3.5 rounded-full bg-primary-container/20" />
              </div>
              <div className="space-y-4">
                <div className="h-2 w-3/4 bg-on-surface-variant/10 rounded-full" />
                <div className="h-2 w-full bg-on-surface-variant/10 rounded-full" />
                <div className="h-2 w-1/2 bg-primary-container/10 rounded-full" />
              </div>
              <div className="mt-auto flex justify-center pb-2">
                <div
                  className="w-24 h-24 rounded-full border-4 border-primary-container/10 border-t-primary-container animate-spin"
                  style={{ animationDuration: "12s", animationTimingFunction: "linear" }}
                />
              </div>
            </div>

            {/* Widget 2: Terminal Shell Widget */}
            <div
              className="absolute -bottom-4 -left-8 w-72 h-44 z-30 transition-transform duration-500 hover:scale-[1.02] shadow-2xl"
              style={{ transform: `translate3d(0, ${scrollY * 0.03}px, 0)` }}
            >
              <TerminalWidget />
            </div>

            {/* Widget 3: Satellite Telemetry Widget */}
            <div
              className="absolute -top-12 -right-4 w-52 h-52 z-10 transition-transform duration-500 hover:scale-[1.02] shadow-2xl"
              style={{ transform: `translate3d(0, ${scrollY * -0.02}px, 0)` }}
            >
              <MapWidget />
            </div>

            {/* Floating decoration widgets (Tech badges) */}
            <div
              className="absolute top-1/4 -left-16 w-12 h-12 flex items-center justify-center rounded-xl border border-outline-variant/30 bg-card/75 backdrop-blur-xl shadow-lg z-40 animate-pulse pointer-events-none"
              style={{ animationDuration: "4s" }}
            >
              <Cpu className="h-6 w-6 text-primary-container" />
            </div>

            <div
              className="absolute bottom-1/4 -right-12 w-14 h-14 flex items-center justify-center rounded-xl border border-outline-variant/30 bg-card/75 backdrop-blur-xl shadow-lg z-40 animate-bounce pointer-events-none"
              style={{ animationDuration: "8s" }}
            >
              <Stack className="h-7 w-7 text-secondary" />
            </div>
            
          </div>
        </div>
      </div>

      {/* Hero Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-10 pointer-events-none opacity-60">
        <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-on-surface-variant/40">
          Scroll to explore
        </span>
        <div className="w-[2px] h-12 bg-gradient-to-b from-primary-container to-transparent opacity-20 rounded-full" />
      </div>
    </section>
  )
}
