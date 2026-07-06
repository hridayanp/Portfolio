import React, { useState } from "react"
import {
  PaperPlane,
  GithubLogo,
  LinkedinLogo,
  TwitterLogo,
  Envelope,
  MapPin,
  CheckCircle,
  Spinner,
} from "@phosphor-icons/react"

export function ContactSection() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [category, setCategory] = useState("AI Solution")
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle")
  const [errors, setErrors] = useState<{ name?: boolean; email?: boolean }>({})

  const handleCategoryChange = (cat: string) => {
    setCategory(cat)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate inputs
    const newErrors = {
      name: !name.trim(),
      email: !email.trim() || !/\S+@\S+\.\S+/.test(email),
    }

    setErrors(newErrors)

    if (newErrors.name || newErrors.email) return

    // Trigger encryption/submitting sequence
    setStatus("submitting")

    setTimeout(() => {
      setStatus("success")

      // Reset form after a delay
      setTimeout(() => {
        setName("")
        setEmail("")
        setMessage("")
        setCategory("AI Solution")
        setStatus("idle")
      }, 3000)
    }, 1800)
  }

  return (
    <section id="contact" className="py-24 max-w-[1200px] mx-auto px-6 md:px-16 w-full select-none">
      <div className="flex items-center gap-4 mb-14">
        <div className="h-[1px] w-12 bg-outline-variant/30" />
        <h2 className="font-mono text-[10px] uppercase tracking-widest text-primary-container">
          Collaboration Hub
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
        {/* Left Column: Social Hub info */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full">
          <div>
            <h2 className="font-sans text-5xl md:text-6xl font-bold text-foreground mb-8 tracking-tighter leading-[1.1]">
              Let's build <br />
              <span className="text-secondary">something.</span>
            </h2>
            <p className="font-sans text-base text-muted-foreground mb-12 max-w-sm leading-relaxed">
              Open for contract engagements, advisory consulting, or geospatial solutions development.
            </p>

            <div className="space-y-8 mb-12">
              {/* Email Entry */}
              <div className="flex items-center gap-5 group cursor-pointer">
                <div className="w-14 h-14 rounded-2xl border border-outline-variant/30 flex items-center justify-center group-hover:bg-primary-container/10 group-hover:border-primary-container transition-all">
                  <Envelope className="h-6 w-6 text-foreground group-hover:text-primary-container" />
                </div>
                <div>
                  <p className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest mb-0.5">
                    Email Transmission
                  </p>
                  <a
                    href="mailto:hello@hridayan.dev"
                    className="font-sans text-lg text-foreground font-bold hover:underline"
                  >
                    hello@hridayan.dev
                  </a>
                </div>
              </div>

              {/* Base Location */}
              <div className="flex items-center gap-5 group cursor-pointer">
                <div className="w-14 h-14 rounded-2xl border border-outline-variant/30 flex items-center justify-center group-hover:bg-secondary/10 group-hover:border-secondary transition-all">
                  <MapPin className="h-6 w-6 text-foreground group-hover:text-secondary" />
                </div>
                <div>
                  <p className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest mb-0.5">
                    Primary Base
                  </p>
                  <p className="font-sans text-lg text-foreground font-bold">
                    Guwahati, India / Remote
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Icons links */}
          <div className="flex gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Developer Profile"
              className="w-12 h-12 flex items-center justify-center rounded-xl border border-outline-variant/30 hover:border-primary-container hover:text-primary-container transition-all hover:scale-105 bg-card"
            >
              <GithubLogo className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Professional Profile"
              className="w-12 h-12 flex items-center justify-center rounded-xl border border-outline-variant/30 hover:border-secondary hover:text-secondary transition-all hover:scale-105 bg-card"
            >
              <LinkedinLogo className="h-5 w-5" />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X Profile"
              className="w-12 h-12 flex items-center justify-center rounded-xl border border-outline-variant/30 hover:border-primary-container hover:text-primary-container transition-all hover:scale-105 bg-card"
            >
              <TwitterLogo className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Right Column: Interactive Form */}
        <div className="lg:col-span-7 w-full">
          <form
            onSubmit={handleSubmit}
            className="p-8 md:p-10 bg-card/45 border border-outline-variant/30 rounded-3xl relative overflow-hidden shadow-2xl backdrop-blur-xl"
          >
            <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none select-none">
              <PaperPlane className="h-40 w-40 rotate-12" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Full Name Input */}
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest font-bold px-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value)
                    if (errors.name) setErrors((prev) => ({ ...prev, name: false }))
                  }}
                  placeholder="e.g. John Doe"
                  className={`w-full bg-background border rounded-2xl p-4 text-sm outline-none transition-all placeholder:text-muted-foreground/30 ${
                    errors.name
                      ? "border-red-500/50 focus:ring-1 focus:ring-red-500/40"
                      : "border-outline-variant/40 focus:border-primary-container focus:ring-1 focus:ring-primary-container/40"
                  }`}
                  aria-invalid={errors.name ? "true" : "false"}
                  required
                />
              </div>

              {/* Email Address Input */}
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest font-bold px-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (errors.email) setErrors((prev) => ({ ...prev, email: false }))
                  }}
                  placeholder="e.g. john@company.com"
                  className={`w-full bg-background border rounded-2xl p-4 text-sm outline-none transition-all placeholder:text-muted-foreground/30 ${
                    errors.email
                      ? "border-red-500/50 focus:ring-1 focus:ring-red-500/40"
                      : "border-outline-variant/40 focus:border-primary-container focus:ring-1 focus:ring-primary-container/40"
                  }`}
                  aria-invalid={errors.email ? "true" : "false"}
                  required
                />
              </div>
            </div>

            {/* Category Selector Buttons */}
            <div className="flex flex-col gap-2 mb-8">
              <label className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest font-bold px-1">
                Project Category
              </label>
              <div className="flex flex-wrap gap-3">
                {["AI Solution", "Web Application", "GIS Project"].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleCategoryChange(cat)}
                    className={`px-5 py-2.5 rounded-full border text-[9px] font-mono uppercase tracking-wider font-bold min-h-[44px] transition-all cursor-pointer ${
                      category === cat
                        ? "bg-primary-container text-background border-primary-container shadow-md"
                        : "border-outline-variant/35 hover:border-primary-container/50 hover:text-primary-container"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Detailed Message Textarea */}
            <div className="flex flex-col gap-2 mb-10">
              <label className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest font-bold px-1">
                Detailed Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell me about your vision and goals..."
                rows={5}
                className="w-full bg-background border border-outline-variant/40 rounded-2xl p-4 text-sm outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container/40 resize-none transition-all placeholder:text-muted-foreground/30"
                required
              />
            </div>

            {/* Submitting Status Button */}
            <button
              type="submit"
              disabled={status !== "idle"}
              className={`w-full font-sans font-bold py-5 rounded-2xl flex items-center justify-center gap-3 transition-all cursor-pointer select-none ${
                status === "success"
                  ? "bg-primary-container text-background"
                  : "bg-foreground text-background hover:scale-[1.01] hover:shadow-2xl active:scale-[0.99]"
              }`}
            >
              {status === "idle" && (
                <>
                  <span className="text-xs uppercase tracking-widest">Send Transmission</span>
                  <PaperPlane className="h-4.5 w-4.5" />
                </>
              )}
              {status === "submitting" && (
                <>
                  <Spinner className="h-5 w-5 animate-spin" />
                  <span className="text-xs uppercase tracking-widest">Encrypting...</span>
                </>
              )}
              {status === "success" && (
                <>
                  <CheckCircle className="h-5 w-5" />
                  <span className="text-xs uppercase tracking-widest">Transmission Received</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
