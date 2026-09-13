# Portfolio — Hridayan Phukan

React + TypeScript + Vite + Tailwind v4, with [Motion](https://motion.dev) (Framer Motion)
driving every animation.

**The design system in this repo is an implementation of a written specification**, not a
freehand design. The spec is a measured teardown of the Framer "Cohesion" template
(computed styles, layer names and sampled transforms read off the live site). Section
numbers in code comments — `spec §10`, `spec §17` — refer to it.

```bash
npm run dev        # local dev server
npm run build      # typecheck + production build
npm run typecheck
npm run lint
npm run format
```

## The one idea

The page is a **scroll-length machine**. Scroll distance is allocated per section as a
budget, in viewport-heights, and each section is built to fill its budget. Measured:

| Section | Budget | Share | Pattern |
| --- | --- | --- | --- |
| Hero | 2.0 vh | 8% | Sticky hold |
| About | 3.5 vh | 14% | Sticky **stacking** — 3 cards + lead-in |
| Stack | 1.8 vh | 8% | Normal flow |
| Expertise | 6.5 vh | 27% | Sticky hold, one viewport per service |
| **Projects** | **7.0 vh** | **29%** | Sticky hold, one viewport per project |
| Principles | 1.4 vh | 6% | Normal flow |
| Contact | 1.2 vh | 5% | Normal flow |
| Footer | 0.9 vh | 4% | — |

The source template spends 47.6% of its scroll on *Services* and 10.3% on *Projects*,
because it sells services. The spec's own recommendation is "keep the technique; move the
weight" — so here the largest budget is on the work.

## Editing the content

**All copy, data and links live in `src/content/`. No component hard-codes any of it.**

| File | Holds |
| --- | --- |
| `content/site.ts` | Name, role, headline, disciplines, availability, **email / socials / CV**, nav |
| `content/experience.ts` | Roles and education |
| `content/projects.ts` | Every project — add, remove or reorder in this one array |
| `content/stack.ts` | Technologies, grouped, with the note shown on each card's reverse |
| `content/services.ts` | The numbered expertise sequence |
| `content/principles.ts` | Quotes and headline stats |

### ⚠️ TODOs

`content/site.ts` has `contact.email`, `contact.resumeUrl` and every `socials[].href` set to
`null`, because none appear in `MYSELF.md`. **A link with a `null` href is omitted from the
UI entirely** — nothing fake ships. Set the real values and the mailto buttons, footer links
and social buttons all appear. Project `liveUrl` / `githubUrl` behave the same way.

### Project images

Each project renders a **deterministic colour field**: a flat fill stored on the project
record, the project title set at display scale and clipped by the frame, one decorative
solid, and the category. The colour never changes between renders because it is data, not a
hash computed at paint time. The field's ink (light or dark) is derived from the stored fill
by relative luminance, so it cannot drift out of sync.

Drop a screenshot in `public/` and set `image: "/shot.png"` on that project to replace the
field — nothing else changes.

## Architecture

```
src/
  content/      single source of truth for all copy and data
  lib/motion.ts the motion language: easings, durations, springs, ticker speed
  hooks/        usePointerFine, useActiveSection, useTheme
  components/
    primitives/ StickyScene · MaskedText · Marquee · Section · SectionHeading
                MagneticButton · Reveal · Tag · ThemeToggle · ScrollProgress
    decor/      Shape3D (SVG solids) · FloatingShapes · ProjectField
    sections/   Hero · About · Stack · Expertise · Projects · Principles · Contact
    NavLink · Navbar · CustomCursor · Footer
```

### `StickyScene` — the key abstraction

Framer expresses "this animation lasts N viewports" with hand-measured spacer divs, which is
why adding a thirteenth service there means re-measuring a parent height. Here the budget is
a number:

```tsx
<StickyScene vh={7} top={-50}>
  {(progress) => <Scene progress={progress} />}
</StickyScene>
```

`StackScene` is the sibling primitive for Pattern B (cards pinned at `top: 0` inside one
parent, so each covers the previous) — pure CSS, no scroll listener.

### Design tokens

Defined once in `src/index.css`:

- **Spacing** `6 · 10 · 24 · 48 · 96 · 192` — one base unit (24), one ratio (×2). 24 is also
  the page gutter; 192 is the section rhythm.
- **Radius** `24 · 48 · 96` — the same doubling, so radius scales with object size and all
  surfaces read as one material.
- **Type** 8 functional steps `14 → 38`, then display sizes `48 · 200 · 225 · 240`. Line
  height is **1.2 everywhere**, except 1.4 at 14px and 0.9 for the wordmark. Sizes step down
  a ladder at breakpoints rather than scaling fluidly, so every size at every viewport is a
  token. The section heading (38px) and the expertise numeral (200px) are deliberately
  breakpoint-invariant.
- **Colour** 7-step neutral ramp + 3 accents. The accent is used at **5% opacity far more
  often than at full strength** — that tint is what makes the page feel coordinated without
  anything looking coloured.
- **Breakpoints** ≥1200 / 810–1199.98 / ≤809.98.

> `src/lib/utils.ts` extends `tailwind-merge` with the custom font-size class names. Without
> it, `cn("text-h2", "text-ink")` silently drops the font size.

### Motion rules

- Three registers, never mixed: **ambient** (linear, infinite — tickers, drifting shapes),
  **responsive** (200–400 ms ease-out — hover, variants), **narrative** (scroll-bound, no
  easing — the scroll is the curve).
- The ticker runs at **60 px/s, linear**, with a dynamic number of measured copies and a
  modulo wrap. Driving px/second rather than a fixed duration keeps it the same perceived
  speed on a 5K display and a phone.
- **Entrance animations are rationed.** The source page has three across 405 layers; its
  liveliness comes from continuous and scroll-bound motion, not reveal-on-enter. `Reveal` is
  for a section's opening block only — never per card or per paragraph.
- Pointer and scroll motion writes to **MotionValues, never React state**. Only discrete step
  indices cause a render.
- `position: sticky` before `useScroll`. JS only for what CSS cannot express.

### Accessibility

Four things the source template gets wrong and this build fixes:

1. The nav hover swap's in-flow duplicate is `aria-hidden`, so screen readers announce each
   item once rather than twice.
2. The project CTA exists at rest and on focus, not only on hover.
3. `prefers-reduced-motion` collapses every sticky scene to normal flow — and Expertise and
   Projects render **all** their items as static lists, because a collapsed scene has no
   scroll progress to step through and would otherwise show one item.
4. The custom cursor is gated on `(pointer: fine) and (hover: hover)` and is not mounted at
   all under reduced motion. Nothing is communicated by the cursor alone.
