'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
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
  const { onClick: handleLogoMultiClick, triggered: logoFlash } = useMultiClickTrigger({
    count: 5,
    window: 2000,
    cooldown: 500,
    preventDefaultOnTrigger: true,
  });

  // When the user clicks the logo from the homepage, treat it as a
  // "back to top" action: scroll to the hero smoothly and strip any
  // hash / query string from the URL so the address bar stays clean.
  // Off-homepage, fall through to next-intl's normal Link navigation.
  const handleLogoClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      handleLogoMultiClick(e);
      if (e.defaultPrevented) return; // 5-click easter egg fired

      const isHome = pathname === '/' || pathname === '';
      if (!isHome) return;

      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (window.location.hash || window.location.search) {
        window.history.replaceState(null, '', window.location.pathname);
      }
    },
    [handleLogoMultiClick, pathname],
  );

  // Desktop nav: Contactar lives on the right side as the primary CTA,
  // so we deliberately drop /#contact from the link list to avoid the
  // duplicate. The mobile drawer (MobileMenu) keeps the full list since
  // the CTA isn't visible there at the same time.
  const navLinks = [
    { href: '/#about', label: t('about') },
    { href: '/#services', label: t('services') },
    { href: '/projects', label: t('projects') },
    { href: '/#team', label: t('team') },
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

            {/* RIGHT — utility pill.
                - lg+: language + theme switchers as a stacked pill.
                - <lg: a single labeled "Menu" pill that opens the
                  mobile drawer. We deliberately do NOT duplicate the
                  hero's primary CTA here; one above-the-fold call to
                  action is enough. */}
            <div className="flex items-center shrink-0">
              {/* lg+ utility pill — lang + theme */}
              <StackedPill className="hidden lg:inline-flex">
                <LanguageSwitcher />
                <ThemeToggle />
              </StackedPill>

              {/* <lg — labeled menu trigger as a single pill */}
              <button
                ref={hamburgerRef}
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="nav-pill lg:hidden inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 text-base font-medium text-paper-soft transition-colors hover:brightness-110"
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
                  strokeWidth="1.75"
                  aria-hidden="true"
                  className="shrink-0"
                >
                  <line x1="3" y1="7" x2="17" y2="7" />
                  <line x1="3" y1="13" x2="17" y2="13" />
                </svg>
                <span>{t('menu')}</span>
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
