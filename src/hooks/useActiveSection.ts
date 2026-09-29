import { useEffect, useState } from "react"

/**
 * Tracks which section is currently in view accurately and efficiently.
 * Handles top of page (always activates the first item), bottom of page (always activates the last item),
 * and mid-page transitions with optimized requestAnimationFrame scroll calculation.
 */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string>(ids[0] ?? "")

  useEffect(() => {
    if (ids.length === 0) return

    const getElements = () =>
      ids
        .map((id) => ({ id, el: document.getElementById(id) }))
        .filter((item): item is { id: string; el: HTMLElement } => Boolean(item.el))

    let elements = getElements()

    const updateActive = () => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop
      const viewportHeight = window.innerHeight
      const scrollHeight = document.documentElement.scrollHeight

      // 1. Top boundary check: when at or near top of the page, always select the first item ('home')
      if (scrollY < 120) {
        setActive(ids[0])
        return
      }

      // 2. Bottom boundary check: when at the bottom of the page, select the last item
      if (scrollY + viewportHeight >= scrollHeight - 50) {
        setActive(ids[ids.length - 1])
        return
      }

      // Refresh elements if DOM wasn't ready during initialization
      if (elements.length !== ids.length) {
        elements = getElements()
      }

      // 3. Find the section currently in view below the header offset
      const headerOffset = 160
      let currentActive = ids[0]

      for (const { id, el } of elements) {
        const rect = el.getBoundingClientRect()
        // If the top of the section has reached the header offset area
        if (rect.top <= headerOffset) {
          currentActive = id
        }
      }

      setActive((prev) => (prev !== currentActive ? currentActive : prev))
    }

    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActive()
          ticking = false
        })
        ticking = true
      }
    }

    // Initial check
    updateActive()

    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [ids])

  return active
}
