# Design Concept & UI Specification: Hridayan Phukan Portfolio

> **Target Platform**: Google Stitch & Modern Web UI  
> **Aesthetic Archetype**: Dark Minimalist Terminal / Architectural High-Craft  
> **Design Language**: Achilles Design System  
> **Author**: Hridayan Phukan (Frontend Software Engineer)

---

## 1. Executive Concept & Visual Direction

This application is a high-craft, developer-first portfolio designed with an architectural IBM Carbon UI dark-mode aesthetic. It combines extreme typographical precision, subtle hairline grid borders, high-contrast curated accent pairings, interactive 3D geometric floating solids, and scroll-driven sticky viewport transitions.

### Core Visual Principles
1. **Carbon Charcoal Canvas**: Refined Carbon dark canvas backgrounds (`#161616`) with elevated layers (`#222222` / `#262626`) and 10% white hairline borders (`rgba(255, 255, 255, 0.10)`).
2. **Curated 16-Color Visual Dynamic**: No two consecutive icons or 3D floating solids share the same hue. Every card, 3D element, and badge draws randomly from a curated palette of 16 high-contrast pairs.
3. **Monospace & Architectural Type**: Monospace headers and telemetry labels (Geist Mono & JetBrains Mono) paired with high-legibility Inter body copy.
4. **Content-Aware 3D Accents**: Non-interactive abstract 3D solids (spheres, cubes, toruses, cones, cylinders, stars) framed along viewport perimeters with vivid non-consecutive palette colors.
5. **Sticky Viewport Narrative**: Sections use scroll-driven pinning, stacking cards, and horizontal marquee tickers to create cinematic pacing.

---

## 2. Design System Tokens (Stitch Specification)

### 2.1 Color Palette

```json
{
  "foundations": {
    "background_default": "#161616",
    "background_elevated": "#262626",
    "surface_primary": "#222222",
    "surface_secondary": "#2D2D2D",
    "surface_terminal": "#121212"
  },
  "curated_accent_palette": [
    { "name": "Electric Cobalt", "main": "#3157FF", "light": "#6B83FF" },
    { "name": "Vivid Azure", "main": "#007AFF", "light": "#4DA3FF" },
    { "name": "Deep Indigo", "main": "#5146E5", "light": "#8B83FF" },
    { "name": "Hyper Violet", "main": "#7C3AED", "light": "#A78BFA" },
    { "name": "Electric Magenta", "main": "#D946EF", "light": "#F472E8" },
    { "name": "Hot Coral", "main": "#FF5A5F", "light": "#FF7A7F" },
    { "name": "Vibrant Tangerine", "main": "#F97316", "light": "#FF9A52" },
    { "name": "Amber", "main": "#F59E0B", "light": "#FFC857" },
    { "name": "Acid Lime", "main": "#84CC16", "light": "#A3E635" },
    { "name": "Emerald", "main": "#10B981", "light": "#34D399" },
    { "name": "Teal", "main": "#0D9488", "light": "#2DD4BF" },
    { "name": "Cyan", "main": "#06B6D4", "light": "#22D3EE" },
    { "name": "Sky Blue", "main": "#0284C7", "light": "#38BDF8" },
    { "name": "Electric Red", "main": "#EF4444", "light": "#FF6B6B" },
    { "name": "Crimson", "main": "#DC2626", "light": "#FF5757" },
    { "name": "Rose", "main": "#E11D48", "light": "#FB7185" }
  ],
  "typography_colors": {
    "text_primary": "#F4F4F4",
    "text_secondary": "#C6C6C6",
    "text_muted": "#8D8D8D",
    "text_disabled": "#525252",
    "text_placeholder": "#6F6F6F",
    "text_inverse": "#FFFFFF"
  },
  "borders": {
    "border_hairline": "rgba(255, 255, 255, 0.10)",
    "border_subtle": "rgba(255, 255, 255, 0.06)",
    "border_strong": "rgba(255, 255, 255, 0.20)",
    "border_hover": "rgba(255, 255, 255, 0.30)",
    "border_accent": "rgba(49, 87, 255, 0.40)"
  }
}
```

### 2.2 Typography Scale & Rules

- **Display & Headings Font**: `Geist Mono`, monospace, `-0.04em` tracking, line-height `1.2`.
- **Body Copy Font**: `Inter`, sans-serif, regular weight (400), line-height `1.2`–`1.3`.
- **Labels, Eyebrows & Code Font**: `JetBrains Mono`, monospace, medium weight (500), tracking `0em` to `+0.02em`.

| Role | Font Family | Size | Weight | Line Height | Tracking | Purpose |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Display Wordmark** | Geist Mono | 240px / 160px | 500 | 0.9–1.2 | -0.04em | Background tickers & colophon |
| **H1 Hero / Section** | Geist Mono | 40px (Desktop) / 28px (Mobile) | 500 | 1.2 | -0.04em | Main statements & section titles |
| **H2 Section Title** | Geist Mono | 32px / 24px | 400 | 1.2 | -0.04em | Section headings & project headers |
| **H3 Card Title** | Inter | 20px / 18px | 600 | 1.2 | -0.04em | Sub-headings & card titles |
| **Lead Paragraph** | Inter | 20px / 18px | 500 | 1.2 | Normal | High-priority lead descriptions |
| **Body Default** | Inter | 16px / 16px | 400 | 1.2 | Normal | Standard narrative text |
| **Body Small** | Inter | 14px / 14px | 400 | 1.3 | Normal | Role metadata, card notes |
| **Button Text** | JetBrains Mono | 16px | 500 | 1.2 | -0.04em | CTAs & navigation items |
| **Eyebrow / Badge** | JetBrains Mono | 12px | 500 | 1.3 | +0.02em | Section indicators, tags, status |

### 2.3 Geometry, Spacing & Surfaces

- **Spacing Grid**:
  - `xs`: 6px
  - `sm`: 10px
  - `md`: 24px
  - `lg`: 48px
  - `xl`: 96px
  - `2xl`: 192px
  - `gutter`: 24px (desktop) / 16px (mobile)
- **Border Radii**:
  - `pill`: 100px (Navbar, CTA buttons, status badges, discipline chips)
  - `panel`: 16px (Cards, modal dialogs, preview containers)
  - `chip`: 4px (Inline code chips, micro status tags)
- **Surfaces**:
  - Dark layered cards (`#111111`) with 1px border `rgba(255, 255, 255, 0.08)`.
  - Glassmorphic navigation header (`backdrop-blur-md`, `bg-[#0a0908]/80`).

---

## 3. Screen & Section Architecture

### 3.1 Global Header Navigation
- **Positioning**: Fixed at top (`z-50`), floating pill container with `72px` height, centered within page gutter.
- **Components**:
  - Left: Brand Logo / Wordmark button linking to `#home`.
  - Center: Nav links (`Home`, `About`, `Stack`, `Expertise`, `Projects`, `Contact`) with subtle hover highlight and scroll-spy active indicator dot.
  - Right: "Get in touch" CTA button or Mobile Menu trigger icon (`List` / `X`).
  - Scroll Reaction: Transparent at top, converts to blurred elevated surface (`#0A0908` + border) on scroll > 24px.

---

### 3.2 Hero Section (Sticky Viewport Hold)
- **Layout**: `100svh` pinned sticky scene with balanced vertical flex alignment.
- **Background Layer**:
  - Edge-to-edge slow marquee ticker running in background: `HRIDAYAN PHUKAN · HRIDAYAN PHUKAN ·` at 6% opacity.
  - Floating 3D solids on periphery: emerald sphere (`top: 12%, left: 82%`), muted cone (`top: 8%, left: 4%`), cylinder (`top: 62%, left: 88%`), active star (`top: 70%, left: 8%`).
- **Foreground Stack (Centered Column)**:
  1. **Status Pill**: Pill badge with live pulsing neon emerald dot (`#00FF88`) + text `Open to new roles`.
  2. **Headline**: Masked text reveal `I build interfaces that make complex data usable.` (Geist Mono, 40px).
  3. **Optical Center Card**: `240px × 240px` dark surface card with hairline border:
     - Top: Eyebrow `Frontend Software Engineer`
     - Center: Large split name: `Hridayan` (white `#F0F0F0`) / `Phukan` (grey `#888888`)
     - Bottom: Location `India`
  4. **Summary Paragraph**: `Frontend engineer with 4+ years building React data platforms — geospatial and climate-intelligence dashboards for UNDP and enterprise clients.` (Max width 52ch).
  5. **Discipline Badges**: Row of pill tags: `React Engineering`, `Geospatial Interfaces`, `Data Visualisation`, `TypeScript`, `Climate Intelligence`, `Design Systems`, `Performance`.
  6. **Call To Action Group**:
     - Primary Button: `See the work ↗` (Solid `#00FF88` fill, black text `#080808`, magnetic hover).
     - Secondary Button: `Get in touch` (Outline with strong hairline border, hover emerald tint).
     - Ghost Button: `Read my CV` (Monospace text with hover background).
  7. **Scroll Indicator**: Bottom anchored row with bouncing arrow down icon + eyebrow `Scroll`.

---

### 3.3 About Section (Pattern B: Sticky Stacking Cards)
Three layered cards that stack on top of each other during vertical scroll:

- **Card 01 (About & Problem Solving)**:
  - Eyebrow: `01 / About`
  - Title: `Taking messy data and making it something someone can decide from.`
  - Content: 2-paragraph lead detailing satellite imagery, air quality readings, and UNDP geospatial dashboards.
  - Visual: 3D Geometric Emerald Cube (`#00FF88`, size 220px).
- **Card 02 (Experience & Delivery)**:
  - Eyebrow: `02 / Experience`
  - Title: `Owning frontend delivery end to end.`
  - Content: Timeline of roles with company names, periods, role descriptions, and client tags (UNDP, Maruti Suzuki).
  - Visual: 3D Geometric Slate Cylinder (`#888888`, size 220px).
- **Card 03 (Education & Foundation)**:
  - Eyebrow: `03 / Education`
  - Title: `Formal grounding in the infrastructure side, not just the UI layer.`
  - Content: M.Tech in Cloud Computing from IIT Patna, foundational notes on distributed systems & containerization.
  - Visual: 3D Geometric Torus (`#888888`, size 220px).

---

### 3.4 Technology Stack Section
- **Header**: Eyebrow `02 / STACK`, Heading `Technologies I work with daily.`
- **Grid Categories**:
  1. **Frontend**: ReactJS, TypeScript, JavaScript (ES6+), Redux Toolkit, Next.js, Tailwind CSS.
  2. **Geospatial & Web GIS**: Leaflet, MapLibreGL, Georaster, Geospatial APIs, Web GIS.
  3. **Data Visualisation**: ChartJS, React-Table, React Flow.
  4. **Backend & APIs**: Node.js, Express.js, REST APIs.
  5. **Databases**: PostgreSQL, MySQL, MongoDB.
  6. **Cloud & Delivery**: Docker, Kubernetes, Skaffold.
- **Interactive Component**: Flip-card / Detail-card inspection displaying honest engineering commentary for each tool.

---

### 3.5 Expertise & Services (Pattern A: Discrete Sticky Hold)
- **Header**: Eyebrow `03 / EXPERTISE`, Heading `What I bring to teams and platforms.`
- **6 Discrete Services (Pinned sequence with changing 3D wireframe visuals)**:
  1. `01 / Frontend Engineering`: Production React applications built to survive their second year. (Tags: ReactJS, TypeScript, Tailwind CSS).
  2. `02 / Geospatial Web Applications`: Map-centric interfaces over raster and vector data. (Tags: Leaflet, MapLibreGL, Georaster).
  3. `03 / Data Visualisation & Dashboards`: Charts, tables, and real-time parameter tracking. (Tags: ChartJS, React-Table, Time-series).
  4. `04 / Performance Engineering`: Diagnosing and fixing re-render costs, payload size, map clustering. (Tags: Profiling, State design, Virtualisation).
  5. `05 / API & Data Pipeline Integration`: Connecting frontends to backend pipelines and alerting systems. (Tags: REST APIs, Node.js, Express.js).
  6. `06 / Containerised Delivery`: Building and shipping containerised applications. (Tags: Docker, Kubernetes, Skaffold).

---

### 3.6 Featured Projects Showcase
- **Header**: Eyebrow `04 / WORK`, Heading `Selected platforms & production builds.`
- **Project Cards**:
  - **UNDP Geospatial Dashboard Portal** (2024):
    - Category: `Geospatial Platform` | Client: `UNDP`
    - Description: Map-centric dashboard allowing non-technical policy stakeholders to explore satellite-derived climate data without GIS software.
    - Tags: `ReactJS`, `Leaflet`, `MapLibreGL`, `TypeScript`, `Tailwind CSS`.
  - **UNDP Air Quality Portal** (2024):
    - Category: `Real-time Monitoring` | Client: `UNDP`
    - Description: Near-real-time regional air quality visibility with low latency pipelines.
    - Tags: `ReactJS`, `Leaflet`, `MapLibreGL`, `Data Pipelines`, `REST APIs`.
  - **Connected Car & Weather Early Warning** (2023):
    - Category: `Enterprise Platform` | Client: `Maruti Suzuki`
    - Description: Real-time geospatial monitoring paired with weather alerts for driver and fleet safety.
    - Tags: `ReactJS`, `Geospatial APIs`, `Node.js`, `REST APIs`.
  - **DataFlow** (2024):
    - Category: `Developer Tooling` | Client: `Internal`
    - Description: Node-based visual data pipeline builder with interactive canvas.
    - Tags: `ReactJS`, `React Flow`, `TypeScript`.

---

### 3.7 Engineering Principles & Highlights
- **Principles Grid (4 Cards)**:
  1. *React & State*: "Keep state as local as possible and lift it only when you have to."
  2. *Mapping Tools*: "Leaflet when the need is simpler layered maps; MapLibreGL when I need vector tiles and real performance."
  3. *Self-Assessment*: "Being precise about where my depth ends lands better than overselling it."
  4. *The Mission*: "Taking messy data and making it something someone can decide from."
- **Telemetry Counter Highlights**:
  - `4+`: Years building production React
  - `6`: Shipped data platforms
  - `UNDP`: Primary platform client
  - `M.Tech`: Cloud Computing, IIT Patna

---

### 3.8 Contact & Colophon Section
- **Heading**: `Let's build something worth looking at.`
- **Action Links**:
  - Large Email Link: Clickable email with hover emerald accent line.
  - Primary Button: `Start a conversation ↗`
  - Secondary Actions: `Read my CV`, `GitHub`, `LinkedIn`, `X`.
- **Status Metadata Row**: 3 key-value summary boxes (`Based in: India`, `Focus: Frontend Software Engineer`, `Status: Open to roles`).
- **Footer**:
  - Huge reverse marquee wordmark: `HRIDAYAN PHUKAN ·`
  - 3-Column navigational links and copyright notice (`© 2025 Hridayan Phukan`).

---

## 4. Master Google Stitch Screen Prompts

Copy and paste the prompt blocks below into **Google Stitch** to generate or preview the complete UI screens.

### 4.1 Stitch Prompt: Full Desktop Homepage
```text
A world-class, developer-first portfolio website for Hridayan Phukan, a Frontend Software Engineer. 
Aesthetic: Dark Minimalist Terminal with Achilles design system.
Colors: Obsidian black canvas (#080808), elevated surfaces (#111111), ultra-subtle hairline borders (rgba(255,255,255,0.08)), and vibrant terminal neon emerald green (#00FF88) accents.
Typography: Geist Mono for headings, Inter for body copy, JetBrains Mono for badges and buttons.

Page Layout:
1. Fixed Top Navbar: Floating pill navbar with glassmorphism backdrop blur, navigation links (Home, About, Stack, Expertise, Projects, Contact), and a live pulsing green indicator for "Open to new roles".
2. Hero Section:
   - Subtle background full-bleed marquee ticker repeating "HRIDAYAN PHUKAN ·" at 6% opacity.
   - Floating minimalist 3D geometric shapes (emerald sphere, chrome cone, dark cylinder) positioned at the outer borders.
   - Centered availability badge with green ping dot: "Open to new roles".
   - Masked H1 typography: "I build interfaces that make complex data usable."
   - Central 240px dark identity card displaying role "Frontend Software Engineer", split name "Hridayan" in white and "Phukan" in muted grey, and location "India".
   - Summary paragraph and 7 rounded discipline tags (React Engineering, Geospatial Interfaces, Data Visualisation, TypeScript, Climate Intelligence, Design Systems, Performance).
   - Magnetic CTA button group: Solid emerald button "See the work ↗", outline button "Get in touch", and ghost button "Read my CV".
   - Bottom scroll down indicator with animated arrow.
3. About Section: Stack of 3 dark layered cards (01 Taking messy data, 02 Career experience with UNDP and Maruti Suzuki, 03 M.Tech at IIT Patna) each accompanied by an abstract 3D shape.
4. Technology Stack: Categorized grid of monospace pills covering Frontend, Geospatial GIS (Leaflet, MapLibreGL), Visualisation (ChartJS, React-Table), Backend, Databases, and Docker.
5. Projects Showcase: High-density dark project cards for "UNDP Geospatial Dashboard", "UNDP Air Quality Portal", and "Maruti Suzuki Connected Car" with emerald tags, metrics, and live demo links.
6. Engineering Principles: 4 quote cards detailing state management, Web GIS tools, and engineering philosophy, plus 4 highlight counter stats.
7. Contact Section: Massive heading "Let's build something worth looking at.", email CTA, social pills, and footer with oversized ticker wordmark.
```

### 4.2 Stitch Prompt: Mobile View (390px)
```text
Mobile responsive view (390px width) of the Hridayan Phukan frontend engineer portfolio.
Aesthetic: Obsidian dark background (#080808), hairline white borders, neon emerald green (#00FF88) CTAs.
Top navigation: Compact floating pill with logo and hamburger drawer menu.
Hero: Vertically centered column with "● Open to new roles" pill, 28px Geist Mono headline "I build interfaces that make complex data usable.", compact 200px typography card, discipline tag chips, and full-width stacked CTA buttons ("See the work", "Get in touch").
Cards: Single column vertical stack of cards with crisp typography, monospace tags, and emerald link arrows.
```
