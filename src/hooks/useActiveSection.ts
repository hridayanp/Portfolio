import { useEffect, useState } from "react"

/**
 * Tracks which section is currently in view using a single IntersectionObserver
 * — no scroll listener, no per-frame React state churn.
 */
export function useActiveSection(
  ids: string[],
  rootMargin = "-45% 0px -50% 0px"
) {
  const [active, setActive] = useState<string>(ids[0] ?? "")

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin, threshold: [0, 0.25, 0.5, 1] }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids, rootMargin])

  return active
}
