'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import MobileMenu from './MobileMenu';
import ThemeToggle from '@/components/ui/ThemeToggle';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';

export default function Header() {
  const t = useTranslations('nav');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoFlash, setLogoFlash] = useState(false);
  const { scrollY } = useScroll();
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const logoClicksRef = useRef<number[]>([]);
  const logoRef = useRef<HTMLAnchorElement>(null);

  const handleLogoClick = (e: React.MouseEvent) => {
    const now = Date.now();
    logoClicksRef.current.push(now);
    logoClicksRef.current = logoClicksRef.current.filter((t) => now - t < 2000);

    if (logoClicksRef.current.length >= 5) {
      logoClicksRef.current = [];

      const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (motionQuery.matches) return;

      e.preventDefault();
      setLogoFlash(true);
      setTimeout(() => setLogoFlash(false), 500);
    }
  };

  const navLinks = [
    { href: '/#about', label: t('about') },
    { href: '/#services', label: t('services') },
    { href: '/projects', label: t('projects') },
    { href: '/#team', label: t('team') },
    { href: '/#contact', label: t('contact') },
  ];

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 20);
  });

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
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-colors duration-300',
          scrolled
            ? 'bg-bg/85 backdrop-blur-lg border-b border-border'
            : 'bg-transparent border-b border-transparent',
        )}
        initial={{ y: -64 }}
        animate={{ y: 0 }}
        transition={{
          duration: 0.5,
          ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
        }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo + wordmark */}
            <Link
              href="/"
              ref={logoRef}
              onClick={handleLogoClick}
              className={cn(
                'flex items-center gap-2.5 group',
                logoFlash && 'logo-glitch-active',
              )}
            >
              <Image
                src="/logo.svg"
                alt="Kalebtec logo"
                width={28}
                height={28}
                className="w-7 h-7"
              />
              <span className="hidden sm:inline font-display text-base font-semibold tracking-tight text-heading">
                Kalebtec
              </span>
            </Link>

            {/* Desktop navigation — sentence case, no brackets */}
            <nav
              className="hidden md:flex items-center gap-8"
              aria-label={t('mainNav')}
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative text-sm font-medium text-muted hover:text-heading transition-colors duration-200"
                >
                  <span>{link.label}</span>
                  <span
                    aria-hidden="true"
                    className="absolute left-0 right-0 -bottom-1 h-px bg-current opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  />
                </Link>
              ))}
            </nav>

            {/* Right side: language + theme + mobile hamburger */}
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <ThemeToggle />

              <button
                ref={hamburgerRef}
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden inline-flex items-center justify-center min-h-[44px] min-w-[44px] p-2.5 text-muted hover:text-heading transition-colors"
                aria-label={t('openMenu')}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-nav-menu"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <line x1="3" y1="6" x2="17" y2="6" />
                  <line x1="3" y1="14" x2="17" y2="14" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        triggerRef={hamburgerRef}
      />
    </>
  );
}
