'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import MobileMenu from './MobileMenu';
import ThemeToggle from '@/components/ui/ThemeToggle';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';

export default function Header() {
  const t = useTranslations('nav');
  const tHero = useTranslations('hero');
  const pathname = usePathname();
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

            {/* Desktop navigation — plain text links (NR-style) */}
            <nav
              className="hidden md:flex items-center gap-7"
              aria-label={t('mainNav')}
            >
              {navLinks.map((link) => {
                const isActive =
                  link.href === '/projects' && pathname.startsWith('/projects');
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={cn(
                      'group relative text-sm font-medium transition-colors duration-200',
                      isActive ? 'text-heading' : 'text-muted hover:text-heading',
                    )}
                  >
                    <span>{link.label}</span>
                    <span
                      aria-hidden="true"
                      className={cn(
                        'absolute -bottom-1.5 left-0 right-0 h-px bg-current transition-opacity duration-200',
                        isActive
                          ? 'opacity-100'
                          : 'opacity-0 group-hover:opacity-60',
                      )}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Right side: CTA pill + language + theme + mobile hamburger */}
            <div className="flex items-center gap-2">
              {/* Bullet-style primary CTA — pill, brand purple, small */}
              <Link
                href="/#contact"
                className="hidden md:inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-brand-dark"
              >
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-white"
                />
                <span>{tHero('primaryCta')}</span>
              </Link>

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
