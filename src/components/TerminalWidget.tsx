import React, { useState, useRef, useEffect } from "react"

interface ConsoleLine {
  text: string
  type: "command" | "output" | "system"
}

export function TerminalWidget() {
  const [history, setHistory] = useState<ConsoleLine[]>([
    { text: "git commit -m \"feat: engine\"", type: "command" },
    { text: "[main 4a2d8f1] update engine", type: "system" },
    { text: "4 files changed, 142 insertions(+)", type: "output" },
  ])
  const [inputValue, setInputValue] = useState("")
  const containerRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault()
    const cmd = inputValue.trim()
    if (!cmd) return

    const newHistory = [...history, { text: cmd, type: "command" as const }]

    switch (cmd.toLowerCase()) {
      case "help":
        newHistory.push({
          text: "Available commands: about, skills, projects, clear, help",
          type: "system",
        })
        break
      case "about":
        newHistory.push({
          text: "Hridayan Phukan - Full Stack Developer & AI/Geospatial Specialist. Bridging satellite telemetry, web speed, and intelligence.",
          type: "output",
        })
        break
      case "skills":
        newHistory.push({
          text: "Languages: TypeScript, Python, C++, SQL, Go\nFrameworks: React, Next.js, FastAPI, Node.js\nGIS/Data: PostGIS, GeoPandas, RasterIO, Airflow",
          type: "output",
        })
        break
      case "projects":
        newHistory.push({
          text: "1. AI Business Dashboard - Demand forecasting models\n2. Geospatial ETL Pipeline - Fleet telemetry streaming\n3. Satellite Image Classifier - Land cover classification (U-Net)",
          type: "output",
        })
        break
      case "clear":
        setHistory([])
        setInputValue("")
        return
      default:
        newHistory.push({
          text: `Command not found: ${cmd}. Type 'help' for options.`,
          type: "system",
        })
    }

    setHistory(newHistory)
    setInputValue("")
  }

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [history])

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <div
      onClick={focusInput}
      className="relative flex flex-col h-full rounded-2xl border border-outline-variant/30 bg-black/85 p-5 font-mono text-xs shadow-2xl transition-all duration-300 hover:border-primary-container/40 select-text cursor-text"
      role="region"
      aria-label="Interactive Terminal Widget"
    >
      {/* Terminal Window Header */}
      <div className="flex items-center justify-between mb-4 border-b border-outline-variant/10 pb-2 pointer-events-none select-none">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-500/50" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/50" />
          <span className="h-3 w-3 rounded-full bg-primary-container/50" />
        </div>
        <span className="text-[10px] text-on-surface-variant/40 tracking-wider uppercase font-sans">
          Interactive Terminal
        </span>
      </div>

      {/* Terminal Output Area */}
      <div
        ref={containerRef}
        className="flex-grow space-y-2 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-surface-container"
        aria-live="polite"
      >
        {history.map((line, idx) => (
          <div key={idx} className="whitespace-pre-wrap leading-relaxed">
            {line.type === "command" && (
              <span className="text-on-surface-variant/60">~/portfolio $ </span>
            )}
            <span
              className={
                line.type === "command"
                  ? "text-on-background"
                  : line.type === "system"
                  ? "text-primary-container"
                  : "text-on-surface-variant"
              }
            >
              {line.text}
            </span>
          </div>
        ))}

        {/* Console Prompt Form */}
        <form onSubmit={handleCommand} className="flex items-center">
          <span className="text-on-surface-variant/60 mr-1.5 select-none">
            ~/portfolio $
          </span>
          <div className="relative flex-grow flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="absolute inset-0 w-full h-full bg-transparent text-on-background outline-none border-none focus:ring-0 p-0 text-xs font-mono caret-transparent select-text"
              aria-label="Terminal input prompt"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
            />
            {/* Custom blinking terminal cursor */}
            <span className="pointer-events-none text-on-background select-none whitespace-pre flex items-center">
              {inputValue}
              <span className="terminal-cursor ml-0.5" />
            </span>
          </div>
        </form>
      </div>
    </div>
  )
}
