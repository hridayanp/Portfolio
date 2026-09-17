# Hridayan Phukan — Interview Bio & Talking Points

_Built from your resume, project history, and the Tier 1/Tier 2 role matches. Read this out loud a few times rather than memorizing it silently — it needs to sound like you talking, not a script you're reciting._

---

## 1. The 30-Second Pitch (memorize this one word-for-word)

> "I'm a frontend software engineer with about four years of experience, most of it spent building React-based data platforms — specifically geospatial and climate-intelligence dashboards for UNDP and enterprise clients at a company called mistEO. I work mainly in ReactJS, TypeScript, and Tailwind, with mapping libraries like Leaflet and MapLibreGL for anything geospatial. Before that I was at Accubits, working across the stack on cross-functional product teams. I'm currently finishing an M.Tech in Cloud Computing at IIT Patna, and I'm looking for a [frontend engineering / React / geospatial software] role where I can keep building interfaces that make complex data usable."

Swap the bracketed part depending on which job you're interviewing for. This is your answer to "tell me about yourself" if they want it short, and your opening line if they want it long (see Section 2).

---

## 2. The 2-Minute Walkthrough ("Tell me about yourself")

Structure: **Present → Past → Why this role.** Don't go chronological from college — start with what you do now.

> "Right now I'm a frontend engineer at mistEO, where I've spent the last three years leading development on climate intelligence platforms — mostly for UNDP, but also enterprise clients like Maruti Suzuki. The common thread across my projects is taking messy, complex data — satellite imagery, air quality readings, climate risk datasets — and turning it into something a non-technical stakeholder can actually look at and make a decision from. I do that with ReactJS, Tailwind, and geospatial libraries like Leaflet and MapLibreGL.
>
> Before mistEO, I was at Accubits for about a year and a half, working in smaller cross-functional teams, which is where I got comfortable owning a feature end-to-end and working directly with product and design.
>
> Alongside all of this, I've been doing an M.Tech in Cloud Computing at IIT Patna, which is where a lot of my Docker/Kubernetes exposure comes from — I wanted formal grounding in the infrastructure side even though my day job is frontend-heavy.
>
> What I'm looking for now is [a role like this one] — I liked what I read about [one specific thing from the job posting], and it lines up with the kind of dashboard/data-visualization work I already enjoy doing."

**Before every interview:** fill in that last bracket with one real detail from the job posting. Interviewers notice when this line is generic.

---

## 3. Company & Role Deep-Dive (so you don't freeze on follow-ups)

### mistEO Pvt. Ltd. — Software Engineer, Frontend (Mar 2023 – Jul 2026)

- **What the company does:** builds climate intelligence / geospatial data platforms, with UNDP as a major client plus enterprise clients like Maruti Suzuki.
- **Your role:** owned frontend development end-to-end on multiple platforms — not just building screens, but deciding component architecture, integrating mapping libraries, and optimizing performance for large datasets.
- **If asked "what was your biggest technical challenge here":** talk about rendering large raster/vector datasets performantly in the Geospatial Dashboard Portal — the real story is state management and modular components to keep the UI responsive while handling satellite-derived data layers. Be ready to explain _why_ that's hard (large payloads, re-render cost, layer toggling) even if you don't remember exact numbers.
- **If asked "did you work alone or with a team":** be honest — say you led frontend delivery and collaborated with backend/data teams and UNDP stakeholders, rather than claiming a large team you managed if you didn't. If you didn't manage people, say "led frontend delivery" or "owned the frontend," not "led a team."

### Accubits Technologies Pvt. Ltd. — Software Engineer (Sept 2021 – Feb 2023)

- **What to say:** smaller, faster-paced environment, cross-functional teams, and the "25% ahead of deadlines" line refers to consistent on-time/early delivery across sprints — have one concrete example ready of a feature you shipped early or under a tight deadline, in case they ask "give me a specific example," not just the stat.

### The M.Tech (Cloud Computing, IIT Patna, concurrent with your job)

- **Likely question: "How did you manage a full-time job and a Master's at the same time?"**
  Have a real, calm answer ready — e.g., it was a part-time/executive-format program, or you managed time in evenings/weekends. Don't get defensive about this; it's a strength (initiative), not something to over-explain.
- **Likely question: "Why Cloud Computing when your job is frontend?"**
  Honest answer: you wanted a formal foundation in the infrastructure and deployment side since your team used Docker/Kubernetes, and you wanted to be able to reason about the full stack, not just the UI layer.

---

## 4. Project Talking Points (STAR format, one per project)

Keep each to 45–60 seconds unless they ask you to go deeper. Situation → Task → Action → Result.

**UNDP Geospatial Dashboard Portal**

> "UNDP needed a way for non-technical policy stakeholders to explore satellite-derived climate data without needing GIS software. I built a map-centric dashboard in ReactJS with Leaflet and MapLibreGL that let users toggle raster and vector layers, apply spatial filters, and drill into time-series data. The tricky part was performance — these are large geospatial payloads — so I focused on efficient state management and modular components to keep it responsive. The result was a tool policy and technical stakeholders could actually use without training."

**UNDP Air Quality Portal**

> "This one was about giving stakeholders real-time visibility into air quality across regions. I built the React frontend and automated data pipelines feeding into it, with Leaflet and MapLibreGL for the geospatial visualization layer. The focus was retrieval speed and a streamlined interface, since the value of air quality data drops fast if it's not near-real-time."

**Maruti Suzuki — Connected Car / Weather Early Warning**

> "This was an enterprise client project — a connected car dashboard that combined real-time geospatial monitoring with weather early-warning alerts, aimed at driver and fleet safety. I worked on the data pipeline and API layer to make sure alerts arrived with minimal latency, alongside the visualization itself."

**DataFlow — Internal Orchestration Tool**

> "This was an internal tool, not client-facing — developers needed a way to schedule, run, and track Python scripts across different environments without doing it manually. I built the frontend in ReactJS with React Flow for the visual workflow chaining, plus real-time logging so people could see execution status live instead of checking logs after the fact."

**Climate Decision Intelligence Feedlot Dashboard (Stripe-integrated)**

> "This was for Australian agricultural users making feedlot decisions — I built interactive charts and real-time parameter tracking with ChartJS and React-Table, and revamped the API integrations, which cut downtime and analysis time. This one also had Stripe integrated for the commercial side of the product."

**UNDP Climate Resilience Agriculture Portal**

> "The goal was making climate resilience datasets accessible to people who aren't GIS specialists — I built the geospatial portal using Leaflet and Georaster, focused on intuitive UI components so the underlying complexity of the raster data was invisible to the end user."

---

## 5. How to Talk About Your Skills (don't just list them)

Interviewers are more convinced by _how_ you use a tool than by hearing you name it. A few ready lines:

- **On React/state management:** "I default to keeping state as local as possible and lifting it only when needed — on the geospatial dashboards this mattered a lot because unnecessary re-renders on large datasets get expensive fast."
- **On Leaflet/MapLibreGL:** "I've used both — Leaflet when the need is simpler layered maps, MapLibreGL when I need vector tiles and better performance at scale."
- **On Docker/Kubernetes (be honest about depth):** "My hands-on production experience is more on the frontend side of deployment — building and shipping containerized frontend apps — and I've deepened the orchestration/infrastructure side through my M.Tech coursework. I'm confident with the concepts and comfortable working in a containerized environment, but I wouldn't call myself a DevOps specialist."
- **On React Native:** "My production experience is strongest in React — my React Native/Expo knowledge is real but I haven't shipped a dedicated mobile app end-to-end yet. I'd want to be upfront about that rather than overstate it."

Don't over-claim in interviews anywhere your resume already draws an honest line (DevOps, backend, React Native) — recruiters and technical interviewers will probe exactly these spots, and a confident, honest "here's exactly what I have and haven't done" lands far better than getting caught overselling.

---

## 6. Tailoring Your Pitch by Role Tier

**If interviewing for a Tier 1 role (Frontend Engineer, React Developer, GIS/Geospatial Engineer, Full Stack Developer, UI/Dashboard Developer):**
Lead with the UNDP geospatial work and ReactJS depth. These interviewers want to hear fluency in component architecture, performance, and — for GIS-flavored roles — real specifics about Leaflet/MapLibreGL/raster-vector handling.

**If interviewing for a Tier 2 role:**

- **React Native Developer:** Lead honestly with "React-first, React Native as a growing skill" (see Section 5). Don't try to sound like a mobile specialist.
- **SDE / Software Engineer II (generalist):** Lean on the full-stack angle — Node.js/Express work, DataFlow's backend-adjacent scheduling logic, and your CS fundamentals from the M.Tech coursework (Design & Analysis of Algorithms, Parallel Algorithms).
- **Frontend Architect/Lead:** Be a little careful here — with ~4 years of experience, don't claim you've architected systems at scale for large teams. Instead frame it as "I've made component-architecture and state-management decisions across multiple production platforms" — true and still strong, without over-claiming seniority you don't have yet.
- **Product Engineer (Climate Tech/GIS):** Lean into the UNDP stakeholder-facing angle — you're translating between policy/non-technical stakeholders and a technical build, which is the core "product engineer" skill.
- **Data Visualization Engineer:** Lead with ChartJS/React-Table (Feedlot Dashboard) and the geospatial time-series work (Geospatial Dashboard Portal).
- **Web GIS Developer:** Lead entirely geospatial — climateAg, geoDash, airQuality — and be upfront that your GIS background is web/JS-based (Leaflet/MapLibreGL), not desktop GIS (ArcGIS/QGIS/PostGIS), if that distinction comes up.

---

## 7. Likely Questions — Have an Answer Ready

**"Why are you looking to leave mistEO?"**
Have a real, non-negative answer ready. Something like wanting broader exposure, a different domain, or growth into a specific direction (be specific to the role you're interviewing for) — never bad-mouth the current employer.

**"What's your biggest weakness?"**
Pick something true and specific, tied to a fix in progress. Example direction: limited hands-on backend/DevOps ownership so far, and how you're actively closing that gap (M.Tech coursework, specific things you're learning). Avoid clichés like "I'm a perfectionist."

**"Walk me through a time you disagreed with a teammate or made a mistake."**
Prepare one real story from mistEO or Accubits — specific, honest, with what you learned. Don't improvise this live; decide now which story you'll tell.

**"Why do you want to work here?"**
This must be different for every interview. Look up one real thing about the company beforehand — a product feature, mission statement, or specific tech choice — and reference it.

**"What are your salary expectations?"**
Decide your number range _before_ the interview, not during it. A safe framing: "I'm looking for a figure in line with the market rate for this role and my experience level — happy to share a specific number once I understand the full scope of the role."

**Technical / conceptual questions to expect given your stack:**

- Explain the difference between `useState` and `useRef`, and when you'd use each.
- How do you prevent unnecessary re-renders in a large React app? (Answer with your dashboard performance work.)
- How would you render 10,000+ points on a map without freezing the browser? (Talk about clustering, tiling, virtualization — tie back to your geospatial dashboard work.)
- Redux Toolkit vs. Context API — when do you reach for which?
- REST API design basics, given your Node/Express exposure.

---

## 8. Questions to Ask Them (never skip this — always have 2–3 ready)

- "What does success in this role look like at the 3-month and 6-month mark?"
- "What's the biggest technical challenge the team is dealing with right now?"
- "How does the team decide between building something in-house versus using a third-party library or service?"
- For geospatial/climate-tech roles specifically: "What's the scale of the geospatial data you're working with — how does the team handle performance at that scale?"

---

## 9. Quick-Reference Numbers (don't fumble these live)

| Fact              | Detail                                                                                                        |
| ----------------- | ------------------------------------------------------------------------------------------------------------- |
| Total experience  | ~4+ years (Sept 2021 – present)                                                                               |
| Current employer  | mistEO Pvt. Ltd., Mar 2023 – Jul 2026                                                                         |
| Previous employer | Accubits Technologies Pvt. Ltd., Sept 2021 – Feb 2023                                                         |
| Education         | M.Tech, Cloud Computing, IIT Patna (Jun 2026); B.Tech, CSE, Sikkim Manipal Institute of Technology (Jul 2021) |
| Core stack        | ReactJS, TypeScript, JavaScript (ES6+), Redux Toolkit, Next.js, Tailwind CSS                                  |
| Geospatial stack  | Leaflet, MapLibreGL, Web GIS, Geospatial APIs, Georaster                                                      |
| Backend exposure  | Node.js, Express.js, REST APIs                                                                                |
| Databases         | MySQL, MongoDB, PostgreSQL                                                                                    |
| DevOps exposure   | Docker, Kubernetes, Skaffold (frontend-adjacent + coursework, not core specialty)                             |
| Named clients     | UNDP, Maruti Suzuki, enterprise/Australian agricultural clients (Feedlot Dashboard)                           |

---

### How to actually use this document

Don't memorize it like a script — read Sections 1 and 2 aloud until they feel natural in your own words, keep Sections 3–6 as reference for follow-up questions, and go into every interview having actually filled in the role-specific brackets in Sections 1, 2, and 7 beforehand.
