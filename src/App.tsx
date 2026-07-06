import { useEffect, useState } from "react"
import { ShaderBackground } from "@/components/ShaderBackground"
import { Navbar } from "@/components/Navbar"
import { HeroSection } from "@/components/HeroSection"
import { ExpertiseSection } from "@/components/ExpertiseSection"
import { JournalSection } from "@/components/JournalSection"
import { ExperienceSection } from "@/components/ExperienceSection"
import { ContactSection } from "@/components/ContactSection"
import { Footer } from "@/components/Footer"

export function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Use requestAnimationFrame for high performance rendering updates
      window.requestAnimationFrame(() => {
        setMousePos({ x: e.clientX, y: e.clientY })
      })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="relative min-h-screen w-full bg-background text-foreground transition-colors duration-500 overflow-x-hidden">
      {/* Noise background overlay texture */}
      <div className="noise-overlay" />

      {/* Dynamic interactive global cursor glow */}
      <div
        className="pointer-events-none fixed inset-0 z-0 h-screen w-screen select-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 255, 136, 0.045), transparent 70%)`,
        }}
      />

      {/* WebGL aurora aurora backdrop */}
      <ShaderBackground />

      {/* Site Navigation */}
      <Navbar />

      {/* Main content layouts */}
      <main className="relative z-10 w-full flex flex-col items-center">
        {/* Section 1: Hero landing */}
        <HeroSection />

        {/* Section 2: Core capabilities */}
        <ExpertiseSection />

        {/* Section 3: Timeline roadmap */}
        <ExperienceSection />

        {/* Section 4: Projects & journal */}
        <JournalSection />

        {/* Section 5: Form collaborations */}
        <ContactSection />
      </main>

      {/* Site Footer */}
      <Footer />
    </div>
  )
}

export default App
