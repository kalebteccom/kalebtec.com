'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import MobileMenu from './MobileMenu';
import ThemeToggle from '@/components/ui/ThemeToggle';

const navLinks = [
  { href: '/#about', label: 'ABOUT' },
  { href: '/#services', label: 'SERVICES' },
  { href: '/projects', label: 'PROJECTS' },
  { href: '/#team', label: 'TEAM' },
  { href: '/#contact', label: 'CONTACT' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 20);
  });

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <motion.header
        role="banner"
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-cyber-bg/90 backdrop-blur-lg border-b border-cyber-border'
            : 'bg-transparent border-b border-transparent',
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
        }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo + Brand */}
            <Link href="/" className="flex items-center gap-3 group">
              <Image
                src="/logo.svg"
                alt="Kalebtec logo"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="hidden sm:inline font-display text-sm uppercase tracking-widest text-cyber-heading group-hover:text-cyber-heading transition-colors duration-300">
                KALEBTEC
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group font-mono text-xs uppercase tracking-[0.2em] text-cyber-muted hover:text-brand-light transition-all duration-300"
                >
                  <span className="text-cyber-faint group-hover:text-cyber-muted transition-colors duration-300">
                    [
                  </span>
                  <span className="group-hover:neon-glow">{link.label}</span>
                  <span className="text-cyber-faint group-hover:text-cyber-muted transition-colors duration-300">
                    ]
                  </span>
                </Link>
              ))}
            </nav>

            {/* Theme Toggle + Mobile Hamburger */}
            <div className="flex items-center gap-3">
              <ThemeToggle />

              {/* Mobile Hamburger — angular staggered lines */}
              <button
                ref={hamburgerRef}
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden p-2 text-cyber-muted hover:text-cyber-heading transition-colors"
                aria-label="Open navigation menu"
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-nav-menu"
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
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="6" y1="12" x2="20" y2="12" />
                  <line x1="8" y1="17" x2="20" y2="17" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        triggerRef={hamburgerRef}
      />
    </>
  );
}
