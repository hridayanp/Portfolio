import { Navbar } from "@/components/Navbar"
import { CustomCursor } from "@/components/CustomCursor"
import { ScrollProgress } from "@/components/primitives/ScrollProgress"
import { Hero } from "@/components/sections/Hero"
import { About } from "@/components/sections/About"
import { Stack } from "@/components/sections/Stack"
import { Expertise } from "@/components/sections/Expertise"
import { Projects } from "@/components/sections/Projects"
import { Principles } from "@/components/sections/Principles"
import { Contact } from "@/components/sections/Contact"
import { Footer } from "@/components/Footer"

/**
 * Scroll budget, in viewport-heights (spec §10). The source spends 47.6% on
 * Services and 10.3% on Projects; §21 says to keep the technique and move the
 * weight, so Projects carries the largest budget here.
 *
 *   Hero        2.0    sticky hold
 *   About       3.5    sticky stacking, 3 cards + lead-in
 *   Stack       ~1.5   normal flow
 *   Expertise   6.5    sticky hold, one viewport per service
 *   Projects    7.0    sticky hold, one viewport per project  ← the weight
 *   Principles  ~1.5   normal flow
 *   Contact     ~1.5   normal flow
 *   Footer      ~1.0
 */
export function App() {
  return (
    // Deliberately transparent: the dot-grid canvas and the ambient vignette
    // are painted on <body>, so an opaque shell here would hide them.
    <div className="text-ink relative min-h-screen w-full">
      <ScrollProgress />
      <CustomCursor />
      <Navbar />

      <main id="main">
        <Hero />
        <About />
        <Stack />
        <Expertise />
        <Projects />
        <Principles />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}

export default App
