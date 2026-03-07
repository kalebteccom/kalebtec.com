'use client'

import { useState, useEffect } from 'react'
import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import MobileMenu from './MobileMenu'

const navLinks = [
  { href: '#about', label: 'ABOUT' },
  { href: '#services', label: 'SERVICES' },
  { href: '#team', label: 'TEAM' },
  { href: '#contact', label: 'CONTACT' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 20)
  })

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-cyber-bg/90 backdrop-blur-lg border-b border-brand/20'
            : 'bg-transparent border-b border-transparent'
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo + Brand */}
            <a href="/" className="flex items-center gap-3 group">
              <Image
                src="/logo.svg"
                alt="Kalebtec logo"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="font-display text-sm uppercase tracking-widest text-white group-hover:text-brand group-hover:neon-glow transition-colors duration-300">
                KALEBTEC
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="group font-mono text-xs uppercase tracking-[0.2em] text-neutral-500 hover:text-white transition-all duration-300"
                >
                  <span className="text-brand/50 group-hover:text-brand transition-colors duration-300">[</span>
                  <span className="group-hover:neon-glow">{link.label}</span>
                  <span className="text-brand/50 group-hover:text-brand transition-colors duration-300">]</span>
                </a>
              ))}
            </nav>

            {/* Mobile Hamburger — angular staggered lines */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 text-neutral-400 hover:text-brand transition-colors"
              aria-label="Open menu"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="6" y1="12" x2="20" y2="12" />
                <line x1="8" y1="17" x2="20" y2="17" />
              </svg>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  )
}
