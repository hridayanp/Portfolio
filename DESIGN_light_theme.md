---
name: Synthetic Intelligence Interface
colors:
  surface: '#f5faf8'
  surface-dim: '#d6dbd9'
  surface-bright: '#f5faf8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f5f2'
  surface-container: '#eaefed'
  surface-container-high: '#e4e9e7'
  surface-container-highest: '#dee4e1'
  on-surface: '#171d1c'
  on-surface-variant: '#3d4947'
  inverse-surface: '#2c3130'
  inverse-on-surface: '#edf2f0'
  outline: '#6d7a77'
  outline-variant: '#bcc9c6'
  surface-tint: '#006a61'
  primary: '#00685f'
  on-primary: '#ffffff'
  primary-container: '#008378'
  on-primary-container: '#f4fffc'
  inverse-primary: '#6bd8cb'
  secondary: '#4953bc'
  on-secondary: '#ffffff'
  secondary-container: '#8792fe'
  on-secondary-container: '#17228f'
  tertiary: '#924628'
  on-tertiary: '#ffffff'
  tertiary-container: '#b05e3d'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#89f5e7'
  primary-fixed-dim: '#6bd8cb'
  on-primary-fixed: '#00201d'
  on-primary-fixed-variant: '#005049'
  secondary-fixed: '#e0e0ff'
  secondary-fixed-dim: '#bdc2ff'
  on-secondary-fixed: '#000767'
  on-secondary-fixed-variant: '#2f3aa3'
  tertiary-fixed: '#ffdbce'
  tertiary-fixed-dim: '#ffb59a'
  on-tertiary-fixed: '#370e00'
  on-tertiary-fixed-variant: '#773215'
  background: '#f5faf8'
  on-background: '#171d1c'
  surface-variant: '#dee4e1'
typography:
  display-lg:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
  code-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 32px
  max-width: 1440px
---

## Brand & Style

The brand identity centers on the intersection of high-precision geospatial data and advanced artificial intelligence. It targets professional analysts and developers who require a workspace that feels both technically sophisticated and visually breathable.

The design style is **Corporate Modern with a Technical Edge**. It utilizes the clarity of Minimalism—heavy whitespace and systematic alignment—but injects "Synthetic" energy through vibrant accents and glassmorphic overlays. The interface should evoke a sense of "Clean Room" precision: sterile but high-performance, calm but highly reactive. Use subtle motion and translucent layering to signify the depth of data processing beneath the surface.

## Colors

The palette transitions the dark, energetic tones of the shader into a professional, high-legibility light environment.

- **Primary (Geospatial Teal):** Used for primary actions, active states, and branding. It provides a grounded, professional anchor.
- **Secondary (Quantum Lavender):** Used for auxiliary data visualizations, information callouts, and secondary UI elements to provide a subtle "AI-driven" glow.
- **Accent (Neon Matrix):** Reserved for small-scale status indicators, success states, or "data pulse" animations to maintain a visual link with the dark shader highlights.
- **Surface & Background:** An off-white with a cool teal bias ensures the screen remains easy on the eyes during long sessions while maintaining a modern, "tech-literate" atmosphere.
- **Neutral/Text:** High-contrast slate for maximum legibility of complex data strings.

## Typography

This design system uses a tri-font hierarchy to distinguish between interface structure, content, and data.

- **Headlines:** Uses a technical sans-serif for a precise, modern look. Large displays use tight tracking for a high-impact, editorial feel.
- **Body:** A highly systematic sans-serif ensures maximum readability across dense documentation and dashboards.
- **Labels & Data:** A monospaced font is used for all metadata, coordinates, and technical labels. This reinforces the "Developer/Analyst Tool" aesthetic and ensures numerical data aligns perfectly in lists and tables.

## Layout & Spacing

The layout follows a **Fluid Grid** model with a hard 4px baseline rhythm. 

- **Grid:** Use a 12-column grid for desktop and a 4-column grid for mobile.
- **Logic:** Padding and margins should always be multiples of 4px. Use generous whitespace (32px+) between major content sections to prevent the UI from feeling cluttered despite the dense technical data.
- **Reflow:** On mobile, sidebars collapse into a bottom-sheet or full-screen overlay to prioritize the geospatial canvas/map view.

## Elevation & Depth

Depth is achieved through **Tonal Layers** and **Glassmorphism**, moving away from traditional heavy shadows.

- **Surfaces:** Use background blurs (12px - 20px) on navigation bars and floating panels to let the background shader peek through subtly.
- **Hierarchy:** 
  - Level 0: Main background (#f8fafc).
  - Level 1: Content cards/panels with a subtle 1px border (#e2e8f0).
  - Level 2: Floating modals or dropdowns with a very soft, diffused teal-tinted shadow (0 10px 25px -5px rgba(13, 148, 136, 0.1)).
- **Interaction:** Hover states should involve a slight "lift" effect using a more pronounced teal border rather than a larger shadow.

## Shapes

The shape language is **Soft and Geometric**. 

By utilizing a consistent 0.25rem (4px) base radius, the UI feels engineered and sturdy. Larger components like cards use 0.5rem (8px), while main container wrappers use 0.75rem (12px). Avoid fully rounded "pill" shapes for buttons to maintain the technical, professional tone; instead, use slightly rounded rectangles to reflect a "module" or "component" feel.

## Components

- **Buttons:** Primary buttons use a solid Geospatial Teal background with white text. Secondary buttons use a transparent background with a 1px teal border. Ghost buttons use JetBrains Mono labels.
- **Chips/Badges:** Use Quantum Lavender backgrounds at 10% opacity with solid lavender text for tagging. Use Neon Green accents only for "Live" or "Active" indicators.
- **Input Fields:** Use a subtle cool-grey background (#f1f5f9) with a 1px border that turns Geospatial Teal on focus. Use Monospaced font for input values.
- **Cards:** Flat design with a 1px border (#e2e8f0). Header sections within cards should have a subtle horizontal rule to separate metadata from the main content.
- **Lists:** High-density rows with 8px vertical padding. Use "hover-reveal" actions to keep the interface clean until interaction.
- **Status Indicators:** Small, circular dots. Use the Neon Matrix green (#00ff88) for healthy/active status to maintain a direct visual link to the system's core "engine."