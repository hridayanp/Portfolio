import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

/**
 * tailwind-merge has to be taught the custom type scale from the spec.
 * Without this it classifies `text-h2` as unknown and a later `text-<colour>`
 * in the same call silently drops the font size.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "label",
            "body-s",
            "btn",
            "body",
            "lead",
            "h3",
            "h2",
            "h1",
            "numeral",
            "wordmark",
            "display",
          ],
        },
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
