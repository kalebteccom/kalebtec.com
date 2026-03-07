'use client'

import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { href: '#about', label: 'ABOUT' },
  { href: '#services', label: 'SERVICES' },
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

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-cyber-bg/98 backdrop-blur-xl scanlines"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3 }}
        >
          {/* Corner accent — top left */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-brand/40" />
          {/* Corner accent — top right */}
          <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-brand/40" />
          {/* Corner accent — bottom left */}
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-brand/40" />
          {/* Corner accent — bottom right */}
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-brand/40" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-neutral-400 hover:text-brand transition-colors z-10"
            aria-label="Close menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Navigation links */}
          <nav className="flex flex-col items-center justify-center h-full gap-0 relative z-10">
            {/* System label */}
            <motion.span
              className="font-mono text-[10px] uppercase tracking-[0.3em] text-brand/40 mb-10"
              variants={glitchVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
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
                  <div className="w-full h-px bg-cyber-cyan/10 mb-6" />
                )}
                <a
                  href={link.href}
                  onClick={onClose}
                  className="block text-center font-mono text-2xl uppercase tracking-[0.25em] text-neutral-300 hover:text-brand hover:neon-glow transition-all duration-300 py-3 glitch-hover"
                >
                  <span className="text-brand/40">[</span>
                  {link.label}
                  <span className="text-brand/40">]</span>
                </a>
              </motion.div>
            ))}

            {/* Brand accent line */}
            <motion.div
              className="w-12 h-px mt-10"
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
