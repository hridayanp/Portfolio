import { useEffect, useState } from "react"

/**
 * True only for devices with a precise pointer (mouse/trackpad) that can hover.
 * Used to gate desktop-only affordances such as the custom cursor and magnetic
 * buttons so touch devices never pay for them.
 */
export function usePointerFine(): boolean {
  const [fine, setFine] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine) and (hover: hover)")
    const update = () => setFine(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  return fine
}
