---
name: Synthetic Precision
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1b1b1b'
  surface-container: '#1f1f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353535'
  on-surface: '#e2e2e2'
  on-surface-variant: '#b9cbb9'
  inverse-surface: '#e2e2e2'
  inverse-on-surface: '#303030'
  outline: '#849585'
  outline-variant: '#3b4b3d'
  surface-tint: '#00e479'
  primary: '#f1ffef'
  on-primary: '#003919'
  primary-container: '#00ff88'
  on-primary-container: '#007139'
  inverse-primary: '#006d37'
  secondary: '#ecb2ff'
  on-secondary: '#520071'
  secondary-container: '#cf5cff'
  on-secondary-container: '#480063'
  tertiary: '#fffaf7'
  on-tertiary: '#3d2f00'
  tertiary-container: '#ffdb79'
  on-tertiary-container: '#795f01'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#60ff99'
  primary-fixed-dim: '#00e479'
  on-primary-fixed: '#00210c'
  on-primary-fixed-variant: '#005228'
  secondary-fixed: '#f8d8ff'
  secondary-fixed-dim: '#ecb2ff'
  on-secondary-fixed: '#320047'
  on-secondary-fixed-variant: '#74009f'
  tertiary-fixed: '#ffe08d'
  tertiary-fixed-dim: '#e5c364'
  on-tertiary-fixed: '#241a00'
  on-tertiary-fixed-variant: '#584400'
  background: '#131313'
  on-background: '#e2e2e2'
  surface-variant: '#353535'
typography:
  display-lg:
    fontFamily: Geist
    fontSize: 64px
    fontWeight: '700'
    lineHeight: 72px
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.02em
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  container-max: 1200px
---

## Brand & Style

This design system is engineered for the high-end developer space, merging the utility of professional build tools with the aesthetic polish of premium consumer software. The brand personality is technical, precise, and authoritative, yet retains an experimental edge through geospatial-inspired accents.

The style is a synthesis of **Minimalism** and **Subtle Glassmorphism**. It prioritizes information density and structural clarity. Key visual drivers include:
- **Optical Precision:** Ultra-thin 1px borders and monospaced accents to evoke a "code-editor" feel.
- **Luminous Depth:** Controlled use of "God-rays" and subtle backlighting to guide focus in a dark environment.
- **Tactile Digitalism:** Elements should feel like high-end hardware interfaces—responsive, low-latency, and substantial.

## Colors

The palette is rooted in true black (`#000000`) to maximize OLED contrast and depth. 

- **Basals:** Use `#000000` for the primary background. Layer with `#111111` for primary containers and `#1A1A1A` for elevated surfaces like hover states or tooltips.
- **Accents:** "Geospatial Green" (`#00FF88`) is the primary action color. Use it for success states, active indicators, and high-priority call-to-actions.
- **Gradients:** Use a sophisticated linear gradient from `#00FF88` to `#BD00FF` (at 135 degrees) exclusively for special display elements, such as feature headlines or "Hero" button borders.
- **Text Hierarchy:** Pure white (`#FFFFFF`) for primary headings, Gray-400 (`#A1A1A1`) for body text, and Gray-600 (`#525252`) for disabled or placeholder content.

## Typography

The typography system relies on **Geist** for its distinct technical apertures and neutral balance. **JetBrains Mono** is introduced as a secondary functional face for metadata, labels, and code snippets to reinforce the developer-centric narrative.

- **Tracking:** Apply tight tracking (`-0.02em` to `-0.04em`) on large display type to create a "locked-in" editorial look.
- **Weight:** Avoid weights below 400. Use Bold (700) sparingly for emphasis and SemiBold (600) for sub-headers.
- **Readability:** Maintain a generous line-height for body text (1.5x) to ensure legibility against the dark background.

## Layout & Spacing

This design system utilizes a **Bento Grid** philosophy. Content is organized into modular tiles of varying sizes that snap to a strict 12-column underlying grid.

- **Grid:** Use a 12-column fluid grid on desktop with 24px gutters.
- **Bento Modules:** Components should prefer `aspect-ratio` based sizing (e.g., 1:1, 2:1) to maintain a cohesive masonry-style layout.
- **Padding:** Internal module padding should be consistent (typically 24px or 32px) to create a rhythmic "breath" between technical data points.
- **Adaptation:** On mobile, the 12-column grid collapses to a single column. Margin reduces to 20px, and bento tiles stack vertically while maintaining their internal aspect ratios where possible.

## Elevation & Depth

Depth is achieved through **Tonal Layering** and **Luminescence** rather than traditional drop shadows.

- **Borders:** Every container must have a 1px solid border (`#262626`). On hover, this border should transition to a subtle white or primary accent glow.
- **Glassmorphism:** Use a `backdrop-filter: blur(12px)` with a slightly translucent background (`rgba(17, 17, 17, 0.7)`) for navigation bars and floating modals.
- **Spotlight Effect:** Implement a mouse-following radial gradient overlay on cards. As the user hovers, a subtle light (`rgba(255, 255, 255, 0.05)`) should follow the cursor, "illuminating" the borders and background.
- **Inner Glows:** For primary buttons or active states, use a subtle `inset` shadow to simulate a back-lit keyboard effect.

## Shapes

The shape language is "Soft-Industrial." It avoids the overly "bubbly" feel of consumer social apps in favor of a precision-engineered look.

- **Base Radius:** Use `6px` (`rounded-md` in most frameworks) as the standard for all cards, buttons, and inputs. 
- **Small Elements:** Tooltips and tags should use a `4px` radius.
- **Strictness:** Avoid fully rounded "pill" shapes unless used for status indicators (e.g., "Online" dots).

## Components

### Buttons
- **Primary:** Background `#FFFFFF`, text `#000000`. No shadow. On hover, apply a magnetic pull effect (slight translation toward cursor).
- **Secondary:** Transparent background, 1px border `#262626`. On hover, border becomes `#FFFFFF`.
- **Special:** "Geospatial" buttons use the Cyan-Purple gradient as a thin 1px border only.

### Cards (Bento Tiles)
- Background `#111111`. 1px border `#262626`. 
- Incorporate a "Noise" texture overlay at 2% opacity to break up flat digital blacks.

### Inputs
- Background `#000000`. 1px border `#262626`. 
- Focus state: Border transitions to `#00FF88` with a 2px outer glow (`0 0 8px rgba(0, 255, 136, 0.3)`).
- Use JetBrains Mono for input text.

### Spotlight Hover
- Components should react to cursor proximity. Use a CSS `mask-image` or a dynamic `radial-gradient` to reveal a brighter border color when the mouse is nearby.

### Command Menu (Raycast Style)
- A centered modal with heavy backdrop blur. Use a 1px "separator" line between search and results using `#262626`.