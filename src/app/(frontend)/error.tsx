'use client'

import Link from 'next/link'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[KALEBTEC_ERROR]', error)
  }, [error])

  return (
    <section
      aria-label="Application error"
      className="relative min-h-[80vh] flex items-center justify-center overflow-hidden cyber-grid-bg"
    >
      {/* Background radial glow — red-tinted for error state */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(255, 0, 60, 0.05) 0%, rgba(128, 0, 255, 0.04) 40%, transparent 70%)',
        }}
      />

      {/* Decorative HUD elements */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Top-left system marker */}
        <div className="absolute top-8 left-8 font-mono text-[10px] text-red-400/50 tracking-wider">
          SYS.STATUS: CRITICAL
        </div>
        {/* Top-right */}
        <div className="absolute top-8 right-8 font-mono text-[10px] text-cyber-faint/40 tracking-wider">
          ERR_CODE: 0x1F4
        </div>
        {/* Bottom-left */}
        <div className="absolute bottom-8 left-8 font-mono text-[10px] text-cyber-faint/40 tracking-wider">
          CORE_DUMP: AVAILABLE
        </div>
        {/* Bottom-right */}
        <div className="absolute bottom-8 right-8 font-mono text-[10px] text-cyber-faint/40 tracking-wider">
          RECOVERY: STANDBY
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-2xl">
        {/* Error label */}
        <div className="flex items-center gap-2 mb-6">
          <span className="font-mono text-sm text-red-400 tracking-wider">
            [SYSTEM_FAULT]
          </span>
          <span className="font-mono text-sm text-cyber-faint/50">//</span>
          <span className="font-mono text-sm text-cyber-muted tracking-wider uppercase">
            RUNTIME_EXCEPTION
          </span>
        </div>

        {/* Glitch-style error heading */}
        <h1 className="font-display text-6xl sm:text-7xl md:text-8xl font-bold tracking-wider text-cyber-heading neon-glow leading-none glitch-hover">
          ERROR
        </h1>

        {/* Accent line */}
        <div className="mt-6 flex items-center gap-0" aria-hidden="true">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-red-500/40" />
          <div className="w-2 h-2 bg-red-500" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-red-500/40" />
        </div>

        {/* Terminal-style message */}
        <div className="mt-8 space-y-2">
          <p className="font-mono text-sm sm:text-base text-cyber-cyan tracking-wider">
            {'> UNEXPECTED_SYSTEM_FAILURE'}
          </p>
          <p className="font-mono text-sm text-cyber-muted">
            // An unhandled exception has disrupted normal operations
          </p>
        </div>

        {/* Error details block */}
        <div className="mt-8 w-full max-w-md border border-red-500/20 bg-cyber-surface p-4 text-left cyber-corners">
          <div className="font-mono text-[11px] text-cyber-faint space-y-1.5">
            <p>
              <span className="text-cyber-muted">[DIAG]</span>{' '}
              Process execution halted
            </p>
            <p>
              <span className="text-red-400">[FAIL]</span>{' '}
              {error.message || 'Unknown error encountered'}
            </p>
            {error.digest && (
              <p>
                <span className="text-cyber-muted">[HASH]</span>{' '}
                <span className="text-cyber-faint/60">{error.digest}</span>
              </p>
            )}
            <p>
              <span className="text-brand-light">[INFO]</span>{' '}
              Recovery protocol available
            </p>
            <p className="text-cyber-faint/60 typing-cursor">
              Awaiting operator action
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          {/* Retry button */}
          <button
            onClick={reset}
            className="group inline-flex items-center gap-2 border border-brand bg-brand/10 px-8 py-3.5 font-mono text-sm uppercase tracking-widest text-cyber-heading transition-all duration-300 hover:bg-brand hover:text-white hover:shadow-[0_0_30px_rgba(128,0,255,0.2)] cursor-pointer"
          >
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
              aria-hidden="true"
            >
              <path
                strokeLinecap="square"
                strokeLinejoin="miter"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.992 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182"
              />
            </svg>
            <span>[RETRY]</span>
          </button>

          {/* Home link */}
          <Link
            href="/"
            className="group inline-flex items-center gap-2 border border-cyber-muted/30 bg-transparent px-8 py-3.5 font-mono text-sm uppercase tracking-widest text-cyber-heading transition-all duration-300 hover:border-cyber-heading/50"
          >
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
              aria-hidden="true"
            >
              <path
                strokeLinecap="square"
                strokeLinejoin="miter"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
            <span>[RETURN_HOME]</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
