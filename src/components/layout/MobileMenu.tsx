'use client'

import { useEffect, useRef, useCallback, type RefObject } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { href: '#about', label: 'ABOUT' },
  { href: '#services', label: 'SERVICES' },
  { href: '/projects', label: 'PROJECTS' },
  { href: '#team', label: 'TEAM' },
  { href: '#contact', label: 'CONTACT' },
]

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
}

const linkVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.15 + i * 0.1,
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
  exit: { opacity: 0, x: 20, transition: { duration: 0.2 } },
}

const glitchVariants = {
  hidden: { opacity: 0, x: -10, skewX: -5 },
  visible: {
    opacity: 1,
    x: 0,
    skewX: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
  exit: { opacity: 0, x: 10, skewX: 5, transition: { duration: 0.2 } },
}

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  triggerRef?: RefObject<HTMLButtonElement | null>
}

export default function MobileMenu({ isOpen, onClose, triggerRef }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  // Focus trap + keyboard handling
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }

      if (e.key === 'Tab') {
        const menu = menuRef.current
        if (!menu) return

        const focusable = Array.from(
          menu.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
        )
        if (focusable.length === 0) return

        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        if (e.shiftKey) {
          // Shift+Tab: wrap from first to last
          if (document.activeElement === first) {
            e.preventDefault()
            last.focus()
          }
        } else {
          // Tab: wrap from last to first
          if (document.activeElement === last) {
            e.preventDefault()
            first.focus()
          }
        }
      }
    },
    [onClose]
  )

  useEffect(() => {
    if (isOpen) {
      // Focus close button when menu opens
      // Use requestAnimationFrame to wait for Framer Motion render
      const raf = requestAnimationFrame(() => {
        closeButtonRef.current?.focus()
      })

      document.addEventListener('keydown', handleKeyDown)

      return () => {
        cancelAnimationFrame(raf)
        document.removeEventListener('keydown', handleKeyDown)
      }
    } else {
      // Return focus to the trigger (hamburger button) when menu closes
      triggerRef?.current?.focus()
    }
  }, [isOpen, handleKeyDown, triggerRef])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={menuRef}
          id="mobile-nav-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="fixed inset-0 z-50 bg-cyber-bg/98 backdrop-blur-xl scanlines"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3 }}
        >
          {/* Corner accents (decorative) */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-cyber-faint/30" aria-hidden="true" />
          <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-cyber-faint/30" aria-hidden="true" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-cyber-faint/30" aria-hidden="true" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-cyber-faint/30" aria-hidden="true" />

          {/* Close button */}
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-cyber-muted hover:text-cyber-heading transition-colors z-10"
            aria-label="Close navigation menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Navigation links */}
          <nav className="flex flex-col items-center justify-center h-full gap-0 relative z-10" aria-label="Mobile navigation">
            {/* System label (decorative) */}
            <motion.span
              className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyber-faint mb-10"
              variants={glitchVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              aria-hidden="true"
            >
              SYSTEM.NAV
            </motion.span>

            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                custom={i}
                variants={linkVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-full max-w-xs"
              >
                {/* Cyan separator line above each link (except first) */}
                {i > 0 && (
                  <div className="w-full h-px bg-cyber-cyan/10 mb-6" aria-hidden="true" />
                )}
                <a
                  href={link.href}
                  onClick={onClose}
                  className="block text-center font-mono text-xl xs:text-2xl uppercase tracking-[0.25em] text-cyber-body hover:text-cyber-heading hover:neon-glow transition-all duration-300 py-3 glitch-hover"
                >
                  <span className="text-cyber-faint" aria-hidden="true">[</span>
                  {link.label}
                  <span className="text-cyber-faint" aria-hidden="true">]</span>
                </a>
              </motion.div>
            ))}

            {/* Brand accent line (decorative) */}
            <motion.div
              className="w-12 h-px mt-10"
              aria-hidden="true"
              style={{
                background: 'linear-gradient(90deg, transparent, #8000FF, #00ffff, transparent)',
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            />
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
