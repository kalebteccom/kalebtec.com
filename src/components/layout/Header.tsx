'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import MobileMenu from './MobileMenu';
import ThemeToggle from '@/components/ui/ThemeToggle';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import { ButtonLink } from '@/components/ui/Button';
import { StackedPill } from '@/components/ui/StackedPill';
import { Logo } from '@/components/ui/Logo';
import { useMultiClickTrigger } from '@/hooks/useMultiClickTrigger';

export default function Header() {
  const t = useTranslations('nav');
  const tHero = useTranslations('hero');
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  // 5-click logo easter egg — flips a class for ~500ms to play the
  // soft fade-flash keyframe defined in globals.css.
  const { onClick: handleLogoClick, triggered: logoFlash } = useMultiClickTrigger({
    count: 5,
    window: 2000,
    cooldown: 500,
    preventDefaultOnTrigger: true,
  });

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
          <div className="flex items-center justify-between gap-3 py-3">
            {/* LEFT — Logo (alone) */}
            <Link
              href="/"
              onClick={handleLogoClick}
              className={cn('shrink-0', logoFlash && 'logo-glitch-active')}
              aria-label="Kalebtec — Home"
            >
              <Logo size="md" />
            </Link>

            {/* CENTER — full stacked nav pill (lg+ only). Below lg the
                center is empty; the CTA moves to the right pill alongside
                the hamburger. */}
            <div className="hidden lg:flex items-center justify-center min-w-0">
              <StackedPill as="nav" aria-label={t('mainNav')}>
                {navLinks.map((link) => {
                  const isActive =
                    link.href === '/projects' && pathname.startsWith('/projects');
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      aria-current={isActive ? 'page' : undefined}
                      className="nav-pill-link rounded-full px-4 py-2 text-base font-medium transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  );
                })}
                <ButtonLink
                  href="/#contact"
                  variant="primary"
                  size="md"
                  bullet
                  className="ml-1"
                >
                  {tHero('primaryCta')}
                </ButtonLink>
              </StackedPill>
            </div>

            {/* RIGHT — utility pill. On lg+: lang + theme. Below lg: the
                Start a project CTA + hamburger get stacked here so the
                whole right edge reads as one pill. */}
            <div className="flex items-center shrink-0">
              {/* lg+ utility pill — lang + theme */}
              <StackedPill className="hidden lg:inline-flex">
                <LanguageSwitcher />
                <ThemeToggle />
              </StackedPill>

              {/* md and below — Start a project + hamburger as one pill */}
              <StackedPill className="lg:hidden">
                <ButtonLink href="/#contact" variant="primary" size="md" bullet>
                  <span className="hidden sm:inline">{tHero('primaryCta')}</span>
                  <span className="sm:hidden">{tHero('primaryCtaShort')}</span>
                </ButtonLink>
                <button
                  ref={hamburgerRef}
                  type="button"
                  onClick={() => setMobileMenuOpen(true)}
                  className="nav-pill-link inline-flex items-center justify-center h-9 w-9 rounded-full transition-colors"
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
              </StackedPill>
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
