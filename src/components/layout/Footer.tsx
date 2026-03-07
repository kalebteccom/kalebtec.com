import Image from 'next/image'
import Link from 'next/link'

const navLinks = [
  { href: '/#about', label: 'About' },
  { href: '/#services', label: 'Services' },
  { href: '/projects', label: 'Projects' },
  { href: '/#team', label: 'Team' },
  { href: '/#contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="bg-cyber-surface relative cyber-grid-bg">
      {/* Top gradient border line (decorative) */}
      <div
        className="h-px w-full"
        aria-hidden="true"
        style={{
          background: 'linear-gradient(90deg, transparent, #8000FF 30%, #00ffff 70%, transparent)',
        }}
      />

      {/* Main footer content */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {/* Left column: Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.svg"
                alt="Kalebtec logo"
                width={28}
                height={28}
                className="w-7 h-7"
              />
              <span className="font-display text-sm uppercase tracking-widest text-cyber-heading">
                KALEBTEC
              </span>
            </div>
            <p className="text-sm text-cyber-muted leading-relaxed max-w-xs typing-cursor">
              Building the future, one solution at a time
            </p>
            {/* Purple accent square (decorative) */}
            <div className="flex items-center gap-2 pt-2" aria-hidden="true">
              <span className="w-1.5 h-1.5 bg-brand" />
              <span className="font-mono text-[10px] text-cyber-faint uppercase tracking-wider">
                Tech Consulting
              </span>
            </div>
          </div>

          {/* Middle column: Navigation */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-cyber-faint mb-6">
              // NAVIGATION
            </h3>
            <nav className="flex flex-col gap-3" aria-label="Footer navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-mono text-sm text-cyber-muted hover:text-cyber-heading transition-colors duration-300 w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right column: Contact */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-cyber-faint mb-6">
              // CONTACT
            </h3>
            <div className="space-y-3">
              <a
                href="mailto:hello@kalebtec.com"
                className="font-mono text-sm text-cyber-muted hover:text-brand-light hover:neon-glow transition-all duration-300 block w-fit"
              >
                hello@kalebtec.com
              </a>
            </div>

            {/* Social links */}
            <div className="flex gap-4 mt-6">
              <a
                href="#"
                className="text-cyber-faint hover:text-cyber-heading transition-colors duration-300"
                aria-label="LinkedIn"
                rel="noopener noreferrer"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-cyber-faint hover:text-cyber-heading transition-colors duration-300"
                aria-label="X (Twitter)"
                rel="noopener noreferrer"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-cyber-faint hover:text-cyber-heading transition-colors duration-300"
                aria-label="GitHub"
                rel="noopener noreferrer"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-cyber-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <p className="font-mono text-xs text-cyber-faint">
              &copy; {new Date().getFullYear()} Kalebtec
            </p>
            <p className="font-mono text-xs text-cyber-faint">
              Rowin &amp; Mari Hernandez
            </p>
          </div>
          {/* HUD-style markers (decorative) */}
          <div className="flex items-center gap-4" aria-hidden="true">
            <span className="font-mono text-[10px] text-cyber-faint uppercase tracking-wider">
              SYS.VER 1.0
            </span>
            <span className="w-px h-3 bg-cyber-faint/20" />
            <span className="font-mono text-[10px] text-cyber-faint uppercase tracking-wider">
              LOCATION: REMOTE
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
