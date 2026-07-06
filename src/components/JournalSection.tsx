import { SpotlightCard } from "./SpotlightCard"
import { ArrowRight, ArrowUpRight, Cpu } from "@phosphor-icons/react"

interface ProjectItem {
  title: string
  desc: string
  imgUrl: string
  tags: string[]
  colSpan: string
  linkText?: string
}

interface ArticleItem {
  title: string
  desc: string
  tags: string[]
  icon: string
  readTime?: string
  imgUrl?: string
  colSpan: string
}

export function JournalSection() {
  const projects: ProjectItem[] = [
    {
      title: "AI Business Dashboard",
      desc: "End-to-end predictive logistics platform with automated forecasting and outlier diagnostics.",
      imgUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBvX6H5eC5-23jhDpxt_L3jSefgBiPZJfkLf3AaDIH61gi598j6DuzpcFv3hWIKWuPngIpEK90xO9kG7u7RGIf1gwg9f1XOxYxWtDdPsEE2vVdQNjCsT6uCu2FaJeqc6Qwh2LELtGbYMDjP2057Lc3L-2Itp2z121vgRih09X9z7-LfcT2nJAsN8YC1xwBeOyM4V4oXTvC2p-RLBDG7BOfv_e3QC3ULlZPge8eXfYYQp5dDsSky_mZ3",
      tags: ["React", "PyTorch", "AWS"],
      colSpan: "lg:col-span-8",
      linkText: "VIEW CASE STUDY",
    },
    {
      title: "Geospatial Pipeline",
      desc: "High-frequency spatial event mapping processor syncing 10M+ coordinates daily.",
      imgUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBojMfQzvWapVEio5O71Y_Xb0HyTd3gcmU5ipduTsfGQzoXFgRYf0F1sobgJrOSJCUBkK9JSkY62wp6aPefWxAaLJdZrF6rpgg3T_YobMDYUlfGHFWUUAldRZvNsikid5s8URCHhsfYWc0CboOJcO8pX4h_pkH-CL_Jy9d1hTqjaWv3WXW4Vi94qkLuFxZM-WLK2hPDLIE65YPyFWRl-XzwPb2pU6qhoW-eibL6jMmOkJ0vWeCNiDLN",
      tags: ["PostGIS", "Airflow"],
      colSpan: "lg:col-span-4",
    },
    {
      title: "Satellite Intelligence",
      desc: "Convolutional neural network for segmented classification of multi-spectral landsat streams.",
      imgUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDPOKstGq4P9F-BFAKSiqsoQUokcRN8Q0TrpYiM4cmEcpgqQwdFoaakQBgdWPApK17H3SgJoax6nes9QrLSqhsVtJw_2RlLZWm9r92irTNpfaK0uuSazkVKiHNmULQw6maDlLK7JGFEnb_PsuJ50-YFAwa5WtVGUvvjlWtudamPDDJEVgUNt_ZfC6qDsuZFs0uJipUvwFAYPsXdzbfF7EAU6qDtpEJIJbrgKysO2ScwpbqyRqFgVS_d",
      tags: ["CV", "Python"],
      colSpan: "lg:col-span-4",
    },
    {
      title: "Real-Time GPS Dashboard",
      desc: "Ultra low-latency dispatch screen tracking logistics endpoints via active MQTT channels.",
      imgUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB2ud6TrnKYXudn7cUawvQlBQQDzdoLJ_QKjaIL6LvEzYxFDUmnisITEQudnLJrceZzNzWoxsfmEGY41Sbe85qaYeCvCMH1-i47Nlh3TsttZX3Qv-2Mt61cfVwWUJIX64xZvr5hu8RHAe8Dve-HMaByzEm3nywUJsIOpEyQ8HPrNDrf29AYAZUDR0xJbfyWgBdsDkf4yAEvnrGAkPm3jznkUDZ7iV6oO3-qOxj2IuFn8mAo4D4KdXtA",
      tags: ["MQTT", "Node.js"],
      colSpan: "lg:col-span-8",
      linkText: "EXPLORE DEMO",
    },
  ]

  const articles: ArticleItem[] = [
    {
      title: "Mastering Server Components in Next.js 14",
      desc: "Deep dive into data hydration protocols, cache lifetimes, and streaming rendering paths using React Server Components.",
      tags: ["React", "Next.js"],
      readTime: "12 min read",
      imgUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA90nS8h60yg7OpHh_eJPe0NBWqa5fqJZxukRoCaGlvu4L8cEJJ62JoWtdxJ3_4CUZF3Q8Xrec0gRmK_RpgSebljcfR5Cwv4CVDi8KcAa2-mJafXFHkKc2ZwtLK_A_rLKpim6P3l-vW8UTZUunLveJ_upcKPYdrvUTGPbao4R67BOloKZGDU-Sb66EVq2s0e8JNY1rOmIXVYQ1Re0r1fQgRBx9TmY4CSwt_Oe5FGyyIlmnVdmR-mfb7",
      colSpan: "lg:col-span-8 lg:row-span-2",
      icon: "article",
    },
    {
      title: "The Future of Local LLMs",
      desc: "How local execution engines are transforming backend code analysis and developers' offline pipelines.",
      tags: ["AI", "Edge"],
      colSpan: "lg:col-span-4",
      icon: "cpu",
    },
    {
      title: "Visualizing Urban Growth",
      desc: "Constructing complex 3D maps using vector shapes overlayed on Three.js tiles.",
      tags: ["GIS", "Three.js"],
      colSpan: "lg:col-span-4",
      icon: "globe",
    },
  ]

  return (
    <section id="work" className="py-24 max-w-[1200px] mx-auto px-6 md:px-16 w-full select-none">
      {/* Featured Projects Block */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
        <div>
          <h2 className="font-sans text-4xl md:text-5xl font-bold mb-3">Featured Projects</h2>
          <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.25em]">
            Selected Works / 2024-2025
          </p>
        </div>
        <div className="hidden md:block">
          <span className="font-mono text-xs text-muted-foreground/60">04 Total Cases</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-32">
        {projects.map((proj, idx) => (
          <SpotlightCard
            key={idx}
            glowColor="rgba(0, 228, 121, 0.08)"
            className={proj.colSpan}
          >
            {/* Visualizer Image wrapper */}
            <div className="aspect-[16/9] w-full overflow-hidden rounded-xl mb-8 relative border border-outline-variant/20 bg-background">
              <img
                src={proj.imgUrl}
                alt={`Screenshot representation of project ${proj.title}`}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.03] pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 flex gap-2">
                {proj.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="font-mono text-[9px] uppercase tracking-wider bg-black/60 backdrop-blur-md px-3 py-1 rounded border border-outline-variant/30 text-primary-container"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <h3 className="font-sans text-2xl font-bold mb-3">{proj.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
              {proj.desc}
            </p>

            {proj.linkText && (
              <button className="mt-auto inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-primary-container hover:text-white transition-all cursor-pointer font-semibold group/btn">
                {proj.linkText}
                <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1.5" />
              </button>
            )}
          </SpotlightCard>
        ))}
      </div>

      {/* Technical Journal Section */}
      <div className="flex items-center gap-4 mb-14">
        <div className="h-[1px] w-12 bg-outline-variant/30" />
        <h2 className="font-mono text-[10px] uppercase tracking-widest text-primary-container">
          Technical Journal
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 auto-rows-[300px]">
        {articles.map((art, idx) => {
          const isFeatured = art.imgUrl !== undefined

          if (isFeatured) {
            return (
              <div
                key={idx}
                className={`${art.colSpan} relative rounded-2xl overflow-hidden group border border-outline-variant/30`}
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-[1.03] opacity-50"
                  style={{ backgroundImage: `url('${art.imgUrl}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent z-10" />

                <div className="relative p-10 z-20 h-full flex flex-col justify-end">
                  <div className="flex gap-2.5 mb-5">
                    <span className="bg-primary-container text-background text-[9px] font-mono font-bold px-3 py-1 rounded uppercase tracking-wider">
                      {art.tags[0]}
                    </span>
                    {art.readTime && (
                      <span className="bg-card/40 backdrop-blur-md text-white text-[9px] font-mono font-semibold px-3 py-1 rounded uppercase tracking-wider border border-outline-variant/20">
                        {art.readTime}
                      </span>
                    )}
                  </div>
                  <h3 className="font-sans text-3xl text-foreground font-bold mb-4 tracking-tight leading-tight">
                    {art.title}
                  </h3>
                  <p className="text-muted-foreground text-sm max-w-xl mb-6 leading-relaxed">
                    {art.desc}
                  </p>
                  <button className="text-primary-container font-mono text-[10px] uppercase tracking-widest font-semibold flex items-center gap-2 hover:text-white transition-colors cursor-pointer group/art">
                    Read Insight
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/art:translate-x-1.5" />
                  </button>
                </div>
              </div>
            )
          }

          // Secondary grid articles
          return (
            <SpotlightCard
              key={idx}
              glowColor="rgba(207, 92, 255, 0.08)"
              className={`${art.colSpan} flex flex-col justify-between`}
            >
              <div>
                <div className="h-10 w-10 rounded-lg bg-card border border-outline-variant/35 flex items-center justify-center mb-5 text-secondary">
                  <Cpu className="h-5 w-5" />
                </div>
                <h3 className="font-sans text-xl font-bold text-foreground mb-3">{art.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{art.desc}</p>
              </div>

              <a
                href="#"
                className="text-secondary font-mono text-[9px] uppercase tracking-widest font-bold flex items-center gap-1.5 mt-6 hover:text-white transition-colors cursor-pointer"
              >
                View Article
                <ArrowUpRight className="h-4.5 w-4.5" />
              </a>
            </SpotlightCard>
          )
        })}
      </div>
    </section>
  )
}
