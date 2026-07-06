

export function Footer() {
  return (
    <footer className="w-full bg-card-lowest/30 border-t border-outline-variant/15 py-12 px-6 md:px-16 mt-20 backdrop-blur-sm z-10 relative">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-2 select-none">
          <div className="font-sans text-xl font-bold tracking-tighter text-foreground">
            Hridayan
          </div>
          <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
            © 2026 Hridayan Phukan. Built with precision.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 font-mono text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary-container transition-colors min-h-[44px] flex items-center"
          >
            Github
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary-container transition-colors min-h-[44px] flex items-center"
          >
            LinkedIn
          </a>
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary-container transition-colors min-h-[44px] flex items-center"
          >
            Twitter
          </a>
          <a
            href="mailto:hello@hridayan.dev"
            className="hover:text-primary-container transition-colors min-h-[44px] flex items-center"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  )
}
